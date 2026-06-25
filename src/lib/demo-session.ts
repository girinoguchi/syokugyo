import type { DemoSession } from "./demo-auth";

export function createDemoSessionPayload(stored: {
  email: string;
  company_name: string;
  contact_name: string;
  role: "member" | "admin";
  user_type?: string | null;
  interested_categories?: string[];
  phone?: string | null;
  birthdate?: string | null;
}): DemoSession {
  return {
    id: `demo-${stored.email}-${Date.now()}`,
    email: stored.email,
    company_name: stored.company_name || null,
    contact_name: stored.contact_name || null,
    role: stored.role || "member",
    user_type: stored.user_type ?? null,
    interested_categories: stored.interested_categories ?? [],
    phone: stored.phone ?? null,
    birthdate: stored.birthdate ?? null,
  };
}

export function demoSessionCookieOptions(req: Request) {
  const proto = req.headers.get("x-forwarded-proto");
  const secure = proto === "https" || process.env.NODE_ENV === "production";
  return {
    path: "/",
    httpOnly: true,
    sameSite: "lax" as const,
    secure,
    maxAge: 60 * 60 * 24 * 30,
  };
}

export function encodeDemoSessionCookie(session: DemoSession): string {
  return Buffer.from(JSON.stringify(session), "utf8").toString("base64url");
}
