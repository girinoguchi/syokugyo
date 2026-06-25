import { NextResponse } from "next/server";
import { getDemoProfile, setDemoProfile } from "@/lib/demo-store";
import { createDemoSessionPayload, demoSessionCookieOptions, encodeDemoSessionCookie } from "@/lib/demo-session";

export async function POST(req: Request) {
  const body = await req.json();
  const email = String(body.email ?? "").trim().toLowerCase();
  const password = String(body.password ?? "");

  if (!email || !password) {
    return NextResponse.json({ error: "メールアドレスとパスワードは必須です" }, { status: 400 });
  }

  const existing = getDemoProfile(email);
  if (existing) {
    return NextResponse.json({ error: "このメールアドレスは既に登録されています。ログインしてください。" }, { status: 409 });
  }

  const {
    company_name,
    contact_name,
    program_genres,
    needed_roles,
    birthdate,
    phone,
    user_type,
    interested_categories,
  } = body;

  const profile = {
    email,
    password,
    company_name: company_name || "",
    contact_name: contact_name || "",
    role: "member" as const,
    program_genres: program_genres || [],
    needed_roles: needed_roles || [],
    user_type: user_type || null,
    interested_categories: interested_categories || [],
    phone: phone || null,
    birthdate: birthdate || null,
  };

  setDemoProfile(email, profile);

  const session = createDemoSessionPayload(profile);
  const response = NextResponse.json({ ok: true, session });
  response.cookies.set("demo_session", encodeDemoSessionCookie(session), demoSessionCookieOptions(req));
  return response;
}
