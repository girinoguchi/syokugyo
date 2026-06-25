import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { setDemoProfile } from "@/lib/demo-store";

export async function POST(req: Request) {
  const body = await req.json();
  const { email, password, company_name, contact_name, program_genres, needed_roles } = body;
  if (!email || !password) {
    return NextResponse.json({ error: "メールアドレスとパスワードは必須です" }, { status: 400 });
  }
  const id = `demo-${Date.now()}-${Math.random().toString(36).slice(2)}`;
  setDemoProfile(email, {
    email,
    password,
    company_name: company_name || "",
    contact_name: contact_name || "",
    role: "member",
    program_genres: program_genres || [],
    needed_roles: needed_roles || [],
  });
  const cookieStore = await cookies();
  const profile = {
    id,
    email,
    company_name: company_name || null,
    contact_name: contact_name || null,
    role: "member" as const,
  };
  cookieStore.set("demo_session", Buffer.from(JSON.stringify(profile), "utf8").toString("base64url"), {
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30,
  });
  return NextResponse.json({ ok: true });
}
