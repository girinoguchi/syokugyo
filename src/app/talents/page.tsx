import Link from "next/link";
import { getCurrentUser, getCurrentProfile } from "@/lib/auth";
import { getTalents } from "@/lib/talents";
import { TalentsSearchForm } from "./TalentsSearchForm";
import { TalentCard } from "./TalentCard";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default async function TalentsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; role?: string; genre?: string; tag?: string; sort?: string }>;
}) {
  const user = await getCurrentUser();
  const profile = await getCurrentProfile();
  const params = await searchParams;
  const sort = params.sort === "recommend" ? "recommend" : "created_at";

  const talents = await getTalents({
    q: params.q,
    role: params.role,
    genre: params.genre,
    tag: params.tag,
    sort,
    profile: profile ? { program_genres: profile.program_genres ?? [], needed_roles: profile.needed_roles ?? [] } : null,
  });

  return (
    <div className="min-h-screen flex flex-col bg-telecareer-surface">
      <Header user={user ?? undefined} profile={profile ?? undefined} />

      <main className="mx-auto max-w-6xl px-4 py-8 flex-1">
        <div className="flex items-end justify-between flex-wrap gap-3 mb-6">
          <h1 className="text-2xl md:text-3xl font-black text-telecareer-ink tc-section-heading">
            人材名簿_Talent Roster_
          </h1>
          {talents.length > 0 && (
            <span className="text-sm font-semibold text-gray-500">{talents.length}件の人材</span>
          )}
        </div>

        <TalentsSearchForm
          defaultQ={params.q}
          defaultRole={params.role}
          defaultGenre={params.genre}
          defaultTag={params.tag}
          defaultSort={sort}
          isLoggedIn={!!user}
        />

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {talents.length === 0 ? (
            <div className="col-span-full tc-card-soft p-10 text-center text-gray-500">
              {user ? "該当する人材がいません。条件を変えてお試しください。" : "ログインすると名簿が表示されます。"}
            </div>
          ) : (
            talents.map((t) => (
              <TalentCard key={t.id} talent={t} canRequest={!!user} />
            ))
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
