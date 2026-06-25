import { NextResponse } from "next/server";
import { getDemoAdmin } from "@/lib/demo-admin-auth";
import {
  deleteDemoJob,
  getDemoJobById,
  parseJobInput,
  updateDemoJob,
} from "@/lib/demo-jobs-persist";

export const dynamic = "force-dynamic";

function noStore<T>(body: T, status = 200) {
  return NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!getDemoAdmin(req)) {
    return noStore({ error: "権限がありません" }, 403);
  }
  const { id } = await params;
  const job = getDemoJobById(id);
  if (!job) return noStore({ error: "求人が見つかりません" }, 404);
  return noStore({ job });
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!getDemoAdmin(req)) {
    return noStore({ error: "権限がありません" }, 403);
  }
  const { id } = await params;
  const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;
  const parsed = parseJobInput(body);
  if ("error" in parsed) {
    return noStore({ error: parsed.error }, 400);
  }
  const job = updateDemoJob(id, parsed);
  if (!job) return noStore({ error: "求人が見つかりません" }, 404);
  return noStore({ ok: true, job });
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!getDemoAdmin(req)) {
    return noStore({ error: "権限がありません" }, 403);
  }
  const { id } = await params;
  const ok = deleteDemoJob(id);
  if (!ok) return noStore({ error: "求人が見つかりません" }, 404);
  return noStore({ ok: true });
}
