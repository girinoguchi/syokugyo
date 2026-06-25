import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { TalentForm } from "../../TalentForm";

export default async function AdminTalentEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: talent, error } = await supabase.from("talents").select("*").eq("id", id).single();
  if (error || !talent) notFound();

  const formData = {
    name: talent.name ?? "",
    image_url: talent.image_url ?? "",
    age: talent.age != null ? String(talent.age) : "",
    gender: talent.gender ?? "",
    role: talent.role ?? "AD",
    company: talent.company ?? "",
    bio: talent.bio ?? "",
    experience_programs: (talent.experience_programs ?? []).join("\n"),
    genres: talent.genres ?? [],
    skills: (talent.skills ?? []).join("\n"),
    specialties: (talent.specialties ?? []).join("\n"),
    qualifications: (talent.qualifications ?? []).join("\n"),
    hashtags: (talent.hashtags ?? []).join(" "),
    is_active: talent.is_active ?? true,
  };

  return (
    <div>
      <Link href="/admin" className="text-sm link-accent mb-4 inline-block">← ダッシュボード</Link>
      <span className="tc-eyebrow bg-white">EDIT</span>
      <h1 className="mt-3 text-2xl md:text-3xl font-black text-telecareer-ink mb-5 tc-section-heading">
        人材を編集
      </h1>
      <TalentForm talent={formData} actionUrl={`/api/admin/talents/${id}`} method="PUT" />
    </div>
  );
}
