import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/auth";

export async function POST(req: Request) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  const supabase = await createClient();
  const { error } = await supabase.from("talents").insert({
    name: body.name,
    image_url: body.image_url ?? null,
    age: body.age,
    gender: body.gender,
    role: body.role,
    company: body.company,
    bio: body.bio,
    experience_programs: body.experience_programs ?? [],
    genres: body.genres ?? [],
    skills: body.skills ?? [],
    specialties: body.specialties ?? [],
    qualifications: body.qualifications ?? [],
    hashtags: body.hashtags ?? [],
    is_active: body.is_active ?? true,
  });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
