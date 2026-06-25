import { NextResponse } from "next/server";
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
  if (!stored) {
    return NextResponse.json(
      { error: "このメールアドレスは登録されていません。会員登録からお試しください。" },
      { status: 401 }
    );
  }
  if (stored.password !== password) {
    return NextResponse.json({ error: "パスワードが正しくありません" }, { status: 401 });
  }

  const session = createDemoSessionPayload(stored);
  const response = NextResponse.json({ ok: true });
  response.cookies.set("demo_session", encodeDemoSessionCookie(session), demoSessionCookieOptions(req));
  return response;
}
