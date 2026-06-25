import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getDemoProfile } from "@/lib/demo-store";
import { createDemoSessionPayload, demoSessionCookieOptions, encodeDemoSessionCookie } from "@/lib/demo-session";

export async function POST(req: Request) {
  const body = await req.json();
  const email = String(body.email ?? "").trim().toLowerCase();
  const password = String(body.password ?? "");

  if (!email || !password) {
    return NextResponse.json({ error: "メールアドレスとパスワードは必須です" }, { status: 400 });
  }

  const stored = getDemoProfile(email);
  if (!stored || stored.password !== password) {
    return NextResponse.json({ error: "メールアドレスまたはパスワードが正しくありません" }, { status: 401 });
  }

  const session = createDemoSessionPayload(stored);
  const cookieStore = await cookies();
  cookieStore.set("demo_session", encodeDemoSessionCookie(session), demoSessionCookieOptions(req));

  return NextResponse.json({ ok: true });
}
