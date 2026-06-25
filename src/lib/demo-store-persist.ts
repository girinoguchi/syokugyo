import { existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from "fs";
import { join } from "path";
import type { DemoProfile } from "./demo-store";

export type DemoUsersFile = {
  users: DemoProfile[];
};

const SEED_PATH = join(process.cwd(), "wordpress/seed/demo-users.json");
const DATA_PATH = join(process.cwd(), ".data/demo-users.json");

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
    map.set(user.email.toLowerCase(), user);
  }
  return Array.from(map.values());
}

export function loadDemoUsers(): DemoProfile[] {
  try {
    const seedMtime = existsSync(SEED_PATH) ? statSync(SEED_PATH).mtimeMs : 0;
    const dataMtime = existsSync(DATA_PATH) ? statSync(DATA_PATH).mtimeMs : 0;

    if (!cachedUsers || seedMtime !== cachedSeedMtime || dataMtime !== cachedDataMtime) {
      const seed = readUsersFile(SEED_PATH);
      const runtime = readUsersFile(DATA_PATH);
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
  mkdirSync(join(process.cwd(), ".data"), { recursive: true });
  const payload: DemoUsersFile = { users };
  writeFileSync(DATA_PATH, JSON.stringify(payload, null, 2), "utf8");
  cachedUsers = users;
  try {
    cachedDataMtime = statSync(DATA_PATH).mtimeMs;
  } catch {
    cachedDataMtime = Date.now();
  }
}

export function findDemoUser(email: string): DemoProfile | undefined {
  const normalized = email.trim().toLowerCase();
  return loadDemoUsers().find((u) => u.email.toLowerCase() === normalized);
}

export function upsertDemoUser(profile: DemoProfile): void {
  const normalized = profile.email.trim().toLowerCase();
  const seed = readUsersFile(SEED_PATH);
  const runtime = readUsersFile(DATA_PATH).filter((u) => u.email.toLowerCase() !== normalized);
  runtime.push({ ...profile, email: normalized });
  const merged = mergeUsers(seed, runtime);
  saveDemoUsers(runtime);
  cachedUsers = merged;
}
