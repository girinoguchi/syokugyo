import { NextResponse } from "next/server";
import { addDemoApplication } from "@/lib/demo-store";

export async function POST(req: Request) {
  const body = await req.json();
  const { job_id, job_title, applicant_name, email, age, gender, address, phone, message } = body;

  if (!job_id || !applicant_name?.trim() || !email?.trim() || !age || !gender || !address?.trim() || !phone?.trim()) {
    return NextResponse.json({ error: "年齢・住所・電話番号・性別・氏名はすべて必須です。" }, { status: 400 });
  }

  addDemoApplication({
    job_id: String(job_id),
    job_title: String(job_title ?? ""),
    applicant_name: String(applicant_name).trim(),
    email: String(email).trim(),
    age: String(age),
    gender: String(gender),
    address: String(address).trim(),
    phone: String(phone).trim(),
    message: String(message ?? "").trim(),
  });

  return NextResponse.json({ ok: true });
}
