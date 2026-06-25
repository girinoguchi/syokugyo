import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { parseDemoCookie } from "@/lib/demo-auth";

const requests: Array<{ talent_id: string; memo: string; company: string; contact: string; email: string }> = [];

export async function POST(req: Request) {
  const cookieStore = await cookies();
  const cookie = cookieStore.get("demo_session")?.value;
  if (!cookie) {
    return NextResponse.json({ error: "ログインしてください" }, { status: 401 });
  }
  try {
    const session = JSON.parse(Buffer.from(cookie, "base64url").toString("utf8"));
    const body = await req.json();
    requests.push({
      talent_id: body.talent_id,
      memo: body.memo || "",
      company: session.company_name || "",
      contact: session.contact_name || "",
      email: session.email || "",
    });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "セッションが無効です" }, { status: 401 });
  }
}
