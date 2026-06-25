import { readFileSync, statSync } from "fs";
import { join } from "path";
import type { Job } from "@/lib/types";

let cachedSeedJobs: Job[] | null = null;
let cachedSeedMtime = 0;

export function loadSeedJobs(): Job[] {
  const seedPath = join(process.cwd(), "wordpress/seed/jobs.json");

  try {
    const { mtimeMs } = statSync(seedPath);
    if (!cachedSeedJobs || mtimeMs !== cachedSeedMtime) {
      const raw = readFileSync(seedPath, "utf8");
      cachedSeedJobs = JSON.parse(raw) as Job[];
      cachedSeedMtime = mtimeMs;
    }
    return cachedSeedJobs;
  } catch {
    return [];
  }
}
