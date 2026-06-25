import { NextResponse } from "next/server";
import { getDemoAdmin } from "@/lib/demo-admin-auth";
import { createDemoJob, loadDemoJobs, parseJobInput } from "@/lib/demo-jobs-persist";

export const dynamic = "force-dynamic";

function noStore<T>(body: T, status = 200) {
  return NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

export async function GET(req: Request) {
  if (!getDemoAdmin(req)) {
    return noStore({ error: "権限がありません" }, 403);
  }
  return noStore({ jobs: loadDemoJobs() });
}

export async function POST(req: Request) {
  if (!getDemoAdmin(req)) {
    return noStore({ error: "権限がありません" }, 403);
  }
  const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;
  const parsed = parseJobInput(body);
  if ("error" in parsed) {
    return noStore({ error: parsed.error }, 400);
  }
  const job = createDemoJob(parsed);
  return noStore({ ok: true, job }, 201);
}
