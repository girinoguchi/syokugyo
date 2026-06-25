import { NextResponse } from "next/server";
import { addDemoInquiry } from "@/lib/demo-store";

export async function POST(req: Request) {
  const body = await req.json();
  const { contact_name, email, phone, message } = body;

  if (!contact_name?.trim() || !email?.trim() || !message?.trim()) {
    return NextResponse.json({ error: "お名前・メールアドレス・お問い合わせ内容は必須です。" }, { status: 400 });
  }

  addDemoInquiry({
    contact_name: String(contact_name).trim(),
    email: String(email).trim(),
    phone: String(phone ?? "").trim(),
    message: String(message).trim(),
  });

  return NextResponse.json({ ok: true });
}
