import { NextResponse } from "next/server";
import { getDemoAdmin } from "@/lib/demo-admin-auth";
import {
  getDemoProfile,
  listDemoProfiles,
  removeDemoProfile,
  setDemoProfile,
  type DemoProfile,
} from "@/lib/demo-store";

export const dynamic = "force-dynamic";

function noStore<T>(body: T, status = 200) {
  return NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

function sanitize(profile: DemoProfile) {
  // パスワードはレスポンスに含めない
  const { password, ...rest } = profile;
  return { ...rest, has_password: Boolean(password) };
}

export async function GET(req: Request) {
  if (!getDemoAdmin(req)) {
    return noStore({ error: "権限がありません" }, 403);
  }
  const users = listDemoProfiles().map(sanitize);
  return noStore({ users });
}

export async function POST(req: Request) {
  if (!getDemoAdmin(req)) {
    return noStore({ error: "権限がありません" }, 403);
  }
  const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;
  const email = String(body.email ?? "").trim().toLowerCase();
  const password = String(body.password ?? "").trim();
  if (!email) return noStore({ error: "メールアドレスは必須です" }, 400);
  if (!password) return noStore({ error: "パスワードは必須です" }, 400);
  if (getDemoProfile(email)) {
    return noStore({ error: "このメールアドレスは既に登録されています" }, 409);
  }

  const profile: DemoProfile = {
    email,
    password,
    company_name: String(body.company_name ?? ""),
    contact_name: String(body.contact_name ?? ""),
    role: body.role === "admin" ? "admin" : "member",
    program_genres: [],
    needed_roles: [],
    user_type: body.user_type !== undefined ? String(body.user_type) || null : null,
    interested_categories: [],
    phone: body.phone !== undefined ? String(body.phone) || null : null,
    birthdate: null,
  };
  setDemoProfile(email, profile);
  return noStore({ ok: true, user: sanitize(profile) }, 201);
}

export async function PATCH(req: Request) {
  const admin = getDemoAdmin(req);
  if (!admin) {
    return noStore({ error: "権限がありません" }, 403);
  }
  const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;
  const email = String(body.email ?? "").trim().toLowerCase();
  if (!email) return noStore({ error: "メールアドレスは必須です" }, 400);

  const existing = getDemoProfile(email);
  if (!existing) return noStore({ error: "アカウントが見つかりません" }, 404);

  // 自分自身の管理者権限を誤って外してロックアウトするのを防ぐ
  if (email === admin.email.toLowerCase() && body.role && body.role !== "admin") {
    return noStore({ error: "自分自身の管理者権限は変更できません" }, 400);
  }

  const next: DemoProfile = {
    ...existing,
    company_name:
      body.company_name !== undefined ? String(body.company_name) : existing.company_name,
    contact_name:
      body.contact_name !== undefined ? String(body.contact_name) : existing.contact_name,
    role: body.role === "admin" || body.role === "member" ? body.role : existing.role,
    phone: body.phone !== undefined ? String(body.phone) || null : existing.phone,
    user_type: body.user_type !== undefined ? String(body.user_type) || null : existing.user_type,
  };
  if (typeof body.password === "string" && body.password.trim()) {
    next.password = body.password.trim();
  }

  setDemoProfile(email, next);
  const { password, ...rest } = next;
  return noStore({ ok: true, user: { ...rest, has_password: Boolean(next.password) } });
}

export async function DELETE(req: Request) {
  const admin = getDemoAdmin(req);
  if (!admin) {
    return noStore({ error: "権限がありません" }, 403);
  }
  const url = new URL(req.url);
  const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;
  const email = String(body.email ?? url.searchParams.get("email") ?? "")
    .trim()
    .toLowerCase();
  if (!email) return noStore({ error: "メールアドレスは必須です" }, 400);

  if (email === admin.email.toLowerCase()) {
    return noStore({ error: "ログイン中のアカウントは削除できません" }, 400);
  }

  const ok = removeDemoProfile(email);
  if (!ok) return noStore({ error: "アカウントが見つかりません" }, 404);
  return noStore({ ok: true });
}
