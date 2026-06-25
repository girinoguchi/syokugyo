import Link from "next/link";
import { notFound } from "next/navigation";
import { getCurrentUser, getCurrentProfile } from "@/lib/auth";
import { getTalentById, getSimilarTalents } from "@/lib/talents";
import { RequestButton } from "../RequestButton";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default async function TalentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = await getCurrentUser();
  const profile = await getCurrentProfile();
  const talent = await getTalentById(id);
  if (!talent) notFound();
  const similar = await getSimilarTalents(talent, 3);

  return (
    <div className="min-h-screen flex flex-col bg-telecareer-surface">
      <Header user={user ?? undefined} profile={profile ?? undefined} />

      <main className="mx-auto max-w-3xl px-4 py-8 flex-1">
        <Link href="/talents" className="text-sm link-accent mb-5 inline-block">
          ← 名簿一覧へ
        </Link>

        <article className="tc-card p-6 md:p-8">
          <div className="flex flex-wrap gap-6 items-start">
            <div className="shrink-0 w-24 h-24 rounded-3xl overflow-hidden bg-telecareer-yellow/20 border-2 border-ink flex items-center justify-center">
              {talent.image_url ? (
                <img
                  src={talent.image_url}
                  alt={talent.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <svg className="w-12 h-12 text-ink/40" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl md:text-3xl font-black text-telecareer-ink">{talent.name}</h1>
              <span className={`tag-pill mt-2 ${talent.role === "AD" ? "role-AD" : talent.role === "D" ? "role-D" : talent.role === "P" ? "role-P" : "tag-plain"}`}>
                {talent.role}
              </span>
              {user && <div className="mt-3"><RequestButton talentId={talent.id} talentName={talent.name} /></div>}
            </div>
          </div>

          <dl className="mt-7 grid gap-4 border-t-2 border-dashed border-ink/15 pt-6">
            {talent.age != null && (
              <div><dt className="text-sm text-gray-500">年齢</dt><dd>{talent.age}歳</dd></div>
            )}
            {talent.gender && (
              <div><dt className="text-sm text-gray-500">性別</dt><dd>{talent.gender}</dd></div>
            )}
            {talent.company && (
              <div><dt className="text-sm text-gray-500">所属</dt><dd>{talent.company}</dd></div>
            )}
            {talent.bio && (
              <div><dt className="text-sm text-gray-500">経歴概要</dt><dd className="whitespace-pre-wrap">{talent.bio}</dd></div>
            )}
            {talent.experience_programs?.length ? (
              <div>
                <dt className="text-sm text-gray-500">経験番組</dt>
                <dd><ul className="list-disc pl-5">{talent.experience_programs.map((p, i) => <li key={i}>{p}</li>)}</ul></dd>
              </div>
            ) : null}
            {talent.genres?.length ? (
              <div><dt className="text-sm text-gray-500">経験ジャンル</dt><dd>{talent.genres.join("、")}</dd></div>
            ) : null}
            {talent.skills?.length ? (
              <div><dt className="text-sm text-gray-500">経験業務</dt><dd>{talent.skills.join("、")}</dd></div>
            ) : null}
            {talent.specialties?.length ? (
              <div><dt className="text-sm text-gray-500">特技</dt><dd>{talent.specialties.join("、")}</dd></div>
            ) : null}
            {talent.qualifications?.length ? (
              <div><dt className="text-sm text-gray-500">資格</dt><dd>{talent.qualifications.join("、")}</dd></div>
            ) : null}
            {talent.hashtags?.length ? (
              <div>
                <dt className="text-sm font-bold text-ink/60">ハッシュタグ</dt>
                <dd className="flex flex-wrap gap-1.5 mt-1">{talent.hashtags.map((h) => (
                  <span key={h} className="tag-pill tag-plain">#{h}</span>
                ))}</dd>
              </div>
            ) : null}
          </dl>
        </article>

        {similar.length > 0 && (
          <section className="mt-12">
            <h2 className="text-xl font-black text-telecareer-ink mb-5 tc-section-heading">
              この人に近いおすすめ人材_Similar_
            </h2>
            <ul className="space-y-3">
              {similar.map((t) => (
                <li key={t.id}>
                  <Link href={`/talents/${t.id}`} className="tc-card tc-card-hover block p-4">
                    <span className="font-bold text-telecareer-ink">{t.name}</span>
                    <span className={`tag-pill ml-2 ${t.role === "AD" ? "role-AD" : t.role === "D" ? "role-D" : t.role === "P" ? "role-P" : "tag-plain"}`}>{t.role}</span>
                    {t.genres?.length ? <span className="text-gray-600 text-sm ml-2">{t.genres.join("、")}</span> : null}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
