import { NextResponse } from "next/server";
import { getDemoProfile, setDemoProfile } from "@/lib/demo-store";
import {
  createDemoSessionPayload,
  demoSessionCookieOptions,
  encodeDemoSessionCookie,
} from "@/lib/demo-session";

function redirectResponse(location: string): NextResponse {
  const res = new NextResponse(null, { status: 303 });
  res.headers.set("Location", location);
  res.headers.set("Cache-Control", "no-store");
  return res;
}

export async function POST(req: Request) {
  const form = await req.formData();
  const email = String(form.get("email") ?? "").trim().toLowerCase();
  const password = String(form.get("password") ?? "");
  const contact_name = String(form.get("contact_name") ?? "").trim();
  const birthdate = String(form.get("birthdate") ?? "").trim();
  const phone = String(form.get("phone") ?? "").trim();
  const user_type = String(form.get("user_type") ?? "").trim();
  const interested_categories = form
    .getAll("interested_categories")
    .map((v) => String(v))
    .filter(Boolean);
  const agree = String(form.get("agree_terms") ?? "");

  if (!email || !password) {
    return redirectResponse("/signup?error=empty");
  }
  if (password.length < 6) {
    return redirectResponse("/signup?error=short");
  }
  if (!agree) {
    return redirectResponse("/signup?error=terms");
  }

  const existing = getDemoProfile(email);
  if (existing) {
    return redirectResponse("/signup?error=exists");
  }

  const profile = {
    email,
    password,
    company_name: "",
    contact_name: contact_name || "",
    role: "member" as const,
    program_genres: [] as string[],
    needed_roles: [] as string[],
    user_type: user_type || null,
    interested_categories,
    phone: phone || null,
    birthdate: birthdate || null,
  };
  setDemoProfile(email, profile);

  const session = createDemoSessionPayload(profile);
  const options = demoSessionCookieOptions(req);
  const res = redirectResponse("/mypage");
  res.cookies.set("demo_session", encodeDemoSessionCookie(session), options);
  return res;
}
