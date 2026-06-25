import { existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from "fs";
import { join } from "path";
import { getProjectRoot } from "./project-root";
import type { Job } from "@/lib/types";

type DemoJobsFile = {
  // 新規作成・既存編集された求人（id をキーに seed を上書き）
  overrides: Job[];
  // 削除された seed 求人の id
  deleted: string[];
};

function getSeedPath(): string {
  return join(getProjectRoot(), "wordpress/seed/jobs.json");
}

function getDataDir(): string {
  return join(getProjectRoot(), ".data");
}

function getDataPath(): string {
  return join(getDataDir(), "demo-jobs.json");
}

let cachedJobs: Job[] | null = null;
let cachedSeedMtime = 0;
let cachedDataMtime = 0;

function readSeedJobs(): Job[] {
  const path = getSeedPath();
  if (!existsSync(path)) return [];
  try {
    return JSON.parse(readFileSync(path, "utf8")) as Job[];
  } catch {
    return [];
  }
}

function readRuntime(): DemoJobsFile {
  const path = getDataPath();
  if (!existsSync(path)) return { overrides: [], deleted: [] };
  try {
    const parsed = JSON.parse(readFileSync(path, "utf8")) as Partial<DemoJobsFile>;
    return {
      overrides: Array.isArray(parsed.overrides) ? parsed.overrides : [],
      deleted: Array.isArray(parsed.deleted) ? parsed.deleted : [],
    };
  } catch {
    return { overrides: [], deleted: [] };
  }
}

function writeRuntime(data: DemoJobsFile): void {
  mkdirSync(getDataDir(), { recursive: true });
  writeFileSync(getDataPath(), JSON.stringify(data, null, 2), "utf8");
}

function mergeJobs(seed: Job[], runtime: DemoJobsFile): Job[] {
  const map = new Map<string, Job>();
  for (const job of seed) {
    map.set(job.id, job);
  }
  for (const job of runtime.overrides) {
    map.set(job.id, job);
  }
  for (const id of runtime.deleted) {
    map.delete(id);
  }
  return Array.from(map.values()).sort((a, b) =>
    String(b.created_at).localeCompare(String(a.created_at))
  );
}

/**
 * デモ用の求人一覧。seed 求人に、管理画面で作成・編集・削除した内容を反映する。
 * 公開ページ・管理ページ双方から参照される。
 */
export function loadDemoJobs(): Job[] {
  try {
    const seedPath = getSeedPath();
    const dataPath = getDataPath();
    const seedMtime = existsSync(seedPath) ? statSync(seedPath).mtimeMs : 0;
    const dataMtime = existsSync(dataPath) ? statSync(dataPath).mtimeMs : 0;

    if (!cachedJobs || seedMtime !== cachedSeedMtime || dataMtime !== cachedDataMtime) {
      cachedJobs = mergeJobs(readSeedJobs(), readRuntime());
      cachedSeedMtime = seedMtime;
      cachedDataMtime = dataMtime;
    }
    return cachedJobs;
  } catch {
    return readSeedJobs();
  }
}

export function getDemoJobById(id: string): Job | null {
  return loadDemoJobs().find((job) => job.id === id) ?? null;
}

function slugify(title: string): string {
  return (
    title
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[\/\\?#]+/g, "")
      .slice(0, 80) || `job-${Date.now()}`
  );
}

export type JobInput = Omit<Job, "id" | "slug" | "created_at"> & {
  slug?: string;
  created_at?: string;
};

export function parseJobInput(
  body: Record<string, unknown>
): JobInput | { error: string } {
  const title = String(body.title ?? "").trim();
  if (!title) return { error: "求人タイトルは必須です" };

  const toStr = (v: unknown): string | null => {
    const s = v == null ? "" : String(v).trim();
    return s ? s : null;
  };
  const toNum = (v: unknown): number | null => {
    if (v == null || v === "") return null;
    const n = Number(v);
    return Number.isNaN(n) ? null : n;
  };
  const tags = Array.isArray(body.tags)
    ? body.tags.map((t) => String(t).trim()).filter(Boolean)
    : String(body.tags ?? "")
        .split(/[,\s]+/)
        .map((t) => t.replace(/^#/, "").trim())
        .filter(Boolean);

  return {
    title,
    category: toStr(body.category) || "その他",
    job_type: toStr(body.job_type) || "単発",
    body: toStr(body.body) || "",
    location: toStr(body.location),
    pay: toStr(body.pay),
    pay_type: toStr(body.pay_type),
    wage_min: toNum(body.wage_min),
    work_period: toStr(body.work_period),
    headcount: toNum(body.headcount),
    deadline: toStr(body.deadline),
    tags,
    is_active: body.is_active === undefined ? true : Boolean(body.is_active),
  } satisfies JobInput;
}

export function createDemoJob(input: JobInput): Job {
  const runtime = readRuntime();
  const id = `d-${Date.now()}`;
  const job: Job = {
    ...input,
    id,
    slug: input.slug?.trim() || slugify(input.title),
    created_at: input.created_at || new Date().toISOString(),
  };
  runtime.overrides = runtime.overrides.filter((j) => j.id !== id);
  runtime.overrides.push(job);
  writeRuntime(runtime);
  cachedJobs = null;
  return job;
}

export function updateDemoJob(id: string, input: JobInput): Job | null {
  const existing = getDemoJobById(id);
  if (!existing) return null;
  const runtime = readRuntime();
  const job: Job = {
    ...existing,
    ...input,
    id,
    slug: input.slug?.trim() || existing.slug || slugify(input.title),
    created_at: existing.created_at,
  };
  runtime.overrides = runtime.overrides.filter((j) => j.id !== id);
  runtime.overrides.push(job);
  writeRuntime(runtime);
  cachedJobs = null;
  return job;
}

export function deleteDemoJob(id: string): boolean {
  const existing = getDemoJobById(id);
  if (!existing) return false;
  const runtime = readRuntime();
  runtime.overrides = runtime.overrides.filter((j) => j.id !== id);
  if (!runtime.deleted.includes(id)) {
    runtime.deleted.push(id);
  }
  writeRuntime(runtime);
  cachedJobs = null;
  return true;
}
