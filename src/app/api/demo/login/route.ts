import { NextResponse } from "next/server";
import { appendFileSync, mkdirSync } from "fs";
import { join } from "path";
import { getDemoProfile } from "@/lib/demo-store";
import { getProjectRoot } from "@/lib/project-root";
import { createDemoSessionPayload, demoSessionCookieOptions, encodeDemoSessionCookie } from "@/lib/demo-session";

function debugLog(event: string, req: Request, extra: Record<string, unknown> = {}) {
  if (process.env.DEMO_DEBUG !== "1") return;
  try {
    const dir = join(getProjectRoot(), ".data");
    mkdirSync(dir, { recursive: true });
    const headers: Record<string, string> = {};
    for (const key of [
      "x-forwarded-proto",
      "x-forwarded-protocol",
      "x-forwarded-ssl",
      "forwarded",
      "host",
      "x-forwarded-host",
      "origin",
      "referer",
      "user-agent",
    ]) {
      const v = req.headers.get(key);
      if (v) headers[key] = v;
    }
    appendFileSync(
      join(dir, "login-debug.log"),
      JSON.stringify({ t: new Date().toISOString(), event, url: req.url, headers, ...extra }) + "\n",
      "utf8"
    );
  } catch {
    // ignore
  }
}

export async function POST(req: Request) {
  const body = await req.json();
  const email = String(body.email ?? "").trim().toLowerCase();
  const password = String(body.password ?? "");

  if (!email || !password) {
    return NextResponse.json({ error: "メールアドレスとパスワードは必須です" }, { status: 400 });
  }

  const stored = getDemoProfile(email);
  if (!stored) {
    debugLog("login_not_found", req, { email });
    return NextResponse.json(
      { error: "このメールアドレスは登録されていません。会員登録からお試しください。" },
      { status: 401 }
    );
  }
  if (stored.password !== password) {
    debugLog("login_bad_password", req, { email });
    return NextResponse.json({ error: "パスワードが正しくありません" }, { status: 401 });
  }

  const session = createDemoSessionPayload(stored);
  const options = demoSessionCookieOptions(req);
  debugLog("login_ok", req, { email, cookieSecure: options.secure, cookieSameSite: options.sameSite });
  const response = NextResponse.json({ ok: true });
  response.cookies.set("demo_session", encodeDemoSessionCookie(session), options);
  return response;
}
