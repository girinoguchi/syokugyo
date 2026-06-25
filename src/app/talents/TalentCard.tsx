import Link from "next/link";
import type { Talent } from "@/lib/types";
import { RequestButton } from "./RequestButton";

function roleClass(role: string) {
  if (role === "AD") return "role-AD";
  if (role === "D") return "role-D";
  if (role === "P") return "role-P";
  return "tag-plain";
}

export function TalentCard({ talent, canRequest }: { talent: Talent; canRequest: boolean }) {
  const programs = talent.experience_programs?.slice(0, 2) ?? [];
  const hashtags = talent.hashtags?.slice(0, 4) ?? [];

  return (
    <article className="tc-card tc-card-hover p-5 flex flex-col">
      <div className="flex gap-4">
        <div className="shrink-0 w-16 h-16 rounded-2xl overflow-hidden bg-telecareer-yellow/20 border-2 border-ink flex items-center justify-center">
          {talent.image_url ? (
            <img
              src={talent.image_url}
              alt={talent.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <svg className="w-8 h-8 text-ink/40" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h2 className="font-bold text-lg text-telecareer-ink truncate">{talent.name}</h2>
            <span className={`tag-pill ${roleClass(talent.role)} shrink-0`}>{talent.role}</span>
          </div>
          {talent.genres?.length ? (
            <p className="text-sm text-gray-600 mt-1">経験ジャンル: {talent.genres.join("、")}</p>
          ) : null}
          {programs.length ? (
            <p className="text-sm text-gray-600 mt-1 line-clamp-2">主な経験: {programs.join(" / ")}</p>
          ) : null}
        </div>
      </div>
      {hashtags.length ? (
        <div className="flex flex-wrap gap-1.5 mt-3">
          {hashtags.map((h) => (
            <span key={h} className="tag-pill tag-plain">
              #{h}
            </span>
          ))}
        </div>
      ) : null}
      <div className="mt-auto pt-4 flex gap-2 flex-wrap items-center">
        <Link
          href={`/talents/${talent.id}`}
          className="text-sm link-accent"
        >
          詳細を見る →
        </Link>
        {canRequest && (
          <div className="ml-auto">
            <RequestButton talentId={talent.id} talentName={talent.name} />
          </div>
        )}
      </div>
    </article>
  );
}
