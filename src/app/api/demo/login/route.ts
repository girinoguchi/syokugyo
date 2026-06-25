import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getDemoProfile } from "@/lib/demo-store";

export async function POST(req: Request) {
  const body = await req.json();
  const { email, password } = body;
  if (!email || !password) {
    return NextResponse.json({ error: "メールアドレスとパスワードは必須です" }, { status: 400 });
  }
  const stored = getDemoProfile(email);
  if (!stored || stored.password !== password) {
    return NextResponse.json({ error: "メールアドレスまたはパスワードが正しくありません" }, { status: 401 });
  }
  const id = `demo-${email}-${Date.now()}`;
  const profile = {
    id,
    email: stored.email,
    company_name: stored.company_name || null,
    contact_name: stored.contact_name || null,
    role: stored.role || "member",
    user_type: stored.user_type ?? null,
    interested_categories: stored.interested_categories ?? [],
    phone: stored.phone ?? null,
    birthdate: stored.birthdate ?? null,
  };
  const cookieStore = await cookies();
  cookieStore.set("demo_session", Buffer.from(JSON.stringify(profile), "utf8").toString("base64url"), {
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30,
  });
  return NextResponse.json({ ok: true });
}
