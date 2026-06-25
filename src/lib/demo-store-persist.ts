import { existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from "fs";
import { join } from "path";
import { getProjectRoot } from "./project-root";
import type { DemoProfile } from "./demo-store";

export type DemoUsersFile = {
  users: DemoProfile[];
};

function getSeedPath(): string {
  return join(getProjectRoot(), "wordpress/seed/demo-users.json");
}

function getDataDir(): string {
  return join(getProjectRoot(), ".data");
}

function getDataPath(): string {
  return join(getDataDir(), "demo-users.json");
}

let cachedUsers: DemoProfile[] | null = null;
let cachedSeedMtime = 0;
let cachedDataMtime = 0;

function readUsersFile(path: string): DemoProfile[] {
  if (!existsSync(path)) return [];
  try {
    const raw = readFileSync(path, "utf8");
    const parsed = JSON.parse(raw) as DemoUsersFile;
    return Array.isArray(parsed.users) ? parsed.users : [];
  } catch {
    return [];
  }
}

function mergeUsers(seed: DemoProfile[], runtime: DemoProfile[]): DemoProfile[] {
  const map = new Map<string, DemoProfile>();
  for (const user of seed) {
    map.set(user.email.toLowerCase(), user);
  }
  for (const user of runtime) {
    if ((user as DemoProfile & { __deleted?: boolean }).__deleted) {
      map.delete(user.email.toLowerCase());
      continue;
    }
    map.set(user.email.toLowerCase(), user);
  }
  return Array.from(map.values());
}

export function loadDemoUsers(): DemoProfile[] {
  try {
    const seedPath = getSeedPath();
    const dataPath = getDataPath();
    const seedMtime = existsSync(seedPath) ? statSync(seedPath).mtimeMs : 0;
    const dataMtime = existsSync(dataPath) ? statSync(dataPath).mtimeMs : 0;

    if (!cachedUsers || seedMtime !== cachedSeedMtime || dataMtime !== cachedDataMtime) {
      const seed = readUsersFile(seedPath);
      const runtime = readUsersFile(dataPath);
      cachedUsers = mergeUsers(seed, runtime);
      cachedSeedMtime = seedMtime;
      cachedDataMtime = dataMtime;
    }
    return cachedUsers;
  } catch {
    return [];
  }
}

export function saveDemoUsers(users: DemoProfile[]): void {
  const dataDir = getDataDir();
  const dataPath = getDataPath();
  mkdirSync(dataDir, { recursive: true });
  const payload: DemoUsersFile = { users };
  writeFileSync(dataPath, JSON.stringify(payload, null, 2), "utf8");
  cachedUsers = users;
  try {
    cachedDataMtime = statSync(dataPath).mtimeMs;
  } catch {
    cachedDataMtime = Date.now();
  }
}

export function findDemoUser(email: string): DemoProfile | undefined {
  const normalized = email.trim().toLowerCase();
  return loadDemoUsers().find((u) => u.email.toLowerCase() === normalized);
}

export function deleteDemoUser(email: string): boolean {
  const normalized = email.trim().toLowerCase();
  const seedPath = getSeedPath();
  const dataPath = getDataPath();
  const seed = readUsersFile(seedPath);
  const runtime = readUsersFile(dataPath);
  const existed =
    seed.some((u) => u.email.toLowerCase() === normalized) ||
    runtime.some((u) => u.email.toLowerCase() === normalized);
  if (!existed) return false;
  // seed 由来のユーザーも runtime に「削除済み」を表現できないため、
  // runtime から除外したうえで seed にも存在する場合は tombstone を残す。
  const nextRuntime = runtime.filter((u) => u.email.toLowerCase() !== normalized);
  if (seed.some((u) => u.email.toLowerCase() === normalized)) {
    nextRuntime.push({
      email: normalized,
      password: "",
      company_name: "",
      contact_name: "",
      role: "member",
      program_genres: [],
      needed_roles: [],
      __deleted: true,
    } as DemoProfile & { __deleted: true });
  }
  saveDemoUsers(nextRuntime);
  cachedUsers = null;
  return true;
}

export function upsertDemoUser(profile: DemoProfile): void {
  const normalized = profile.email.trim().toLowerCase();
  const seedPath = getSeedPath();
  const dataPath = getDataPath();
  const seed = readUsersFile(seedPath);
  const runtime = readUsersFile(dataPath).filter((u) => u.email.toLowerCase() !== normalized);
  runtime.push({ ...profile, email: normalized });
  const merged = mergeUsers(seed, runtime);
  saveDemoUsers(runtime);
  cachedUsers = merged;
}
