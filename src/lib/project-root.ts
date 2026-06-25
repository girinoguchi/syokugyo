import { existsSync } from "fs";
import { resolve, dirname } from "path";

let cachedRoot: string | null = null;

/**
 * Resolves the repository root even when Next.js standalone runs from `.next/standalone`.
 */
export function getProjectRoot(): string {
  if (cachedRoot) return cachedRoot;

  const envRoot = process.env.TELECAREER_PROJECT_ROOT;
  if (envRoot) {
    cachedRoot = resolve(envRoot);
    return cachedRoot;
  }

  let dir = process.cwd();
  for (let depth = 0; depth < 6; depth += 1) {
    if (existsSync(resolve(dir, "package.json"))) {
      cachedRoot = dir;
      return cachedRoot;
    }
    const parent = dirname(dir);
    if (parent === dir) break;
    dir = parent;
  }

  cachedRoot = process.cwd();
  return cachedRoot;
}
