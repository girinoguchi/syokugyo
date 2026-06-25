import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  const cookieStore = await cookies();
  cookieStore.delete("demo_session");
  return NextResponse.redirect(new URL("/", process.env.VERCEL_URL || "http://localhost:3000"));
}
