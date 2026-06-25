import { createClient } from "@/lib/supabase/server";
import type { Talent } from "@/lib/types";
import { isDemoMode } from "@/lib/demo-auth";
import { DEMO_TALENTS } from "@/lib/demo-data";

export async function getTalents(filters: {
  q?: string;
  role?: string;
  genre?: string;
  tag?: string;
  sort?: "created_at" | "recommend";
  profile?: { program_genres: string[]; needed_roles: string[] } | null;
}): Promise<Talent[]> {
  if (isDemoMode()) {
    let talents = [...DEMO_TALENTS];
    if (filters.role) talents = talents.filter((t) => t.role === filters.role);
    if (filters.genre) talents = talents.filter((t) => t.genres?.includes(filters.genre!));
    if (filters.q?.trim()) {
      const q = filters.q.trim().toLowerCase();
      talents = talents.filter(
        (t) =>
          t.name?.toLowerCase().includes(q) ||
          t.bio?.toLowerCase().includes(q) ||
          t.experience_programs?.some((s) => s.toLowerCase().includes(q)) ||
          t.skills?.some((s) => s.toLowerCase().includes(q)) ||
          t.hashtags?.some((s) => s.toLowerCase().includes(q))
      );
    }
    if (filters.tag?.trim()) {
      const tag = filters.tag.trim().toLowerCase();
      talents = talents.filter((t) => t.hashtags?.some((h) => h.toLowerCase().includes(tag)));
    }
    if (filters.sort === "recommend" && filters.profile) {
      return sortByRecommendScore(talents, filters.profile, filters.tag ?? "");
    }
    return talents;
  }

  const supabase = await createClient();
  let query = supabase
    .from("talents")
    .select("*")
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  if (filters.role) {
    query = query.eq("role", filters.role);
  }
  if (filters.genre) {
    query = query.contains("genres", [filters.genre]);
  }
  // タグは配列のためアプリ側でフィルタ
  if (filters.q && filters.q.trim()) {
    const q = filters.q.trim();
    query = query.or(`name.ilike.%${q}%,bio.ilike.%${q}%`);
  }

  const { data, error } = await query;
  if (error) return [];
  let talents = (data ?? []) as Talent[];

  if (filters.q && filters.q.trim()) {
    const q = filters.q.trim().toLowerCase();
    talents = talents.filter(
      (t) =>
        t.name?.toLowerCase().includes(q) ||
        t.bio?.toLowerCase().includes(q) ||
        t.experience_programs?.some((s) => s.toLowerCase().includes(q)) ||
        t.skills?.some((s) => s.toLowerCase().includes(q)) ||
        t.hashtags?.some((s) => s.toLowerCase().includes(q))
    );
  }
  if (filters.tag && filters.tag.trim()) {
    const tag = filters.tag.trim().toLowerCase();
    talents = talents.filter((t) =>
      t.hashtags?.some((h) => h.toLowerCase().includes(tag))
    );
  }

  if (filters.sort === "recommend" && filters.profile) {
    return sortByRecommendScore(talents, filters.profile, filters.tag ?? "");
  }
  return talents;
}

function recommendScore(
  talent: Talent,
  profile: { program_genres: string[]; needed_roles: string[] },
  searchTag: string
): number {
  let score = 0;
  if (profile.needed_roles.includes(talent.role)) score += 3;
  const genreMatch = profile.program_genres.filter((g) => talent.genres?.includes(g)).length;
  score += genreMatch * 2;
  if (searchTag && talent.hashtags?.some((h) => h.toLowerCase().includes(searchTag.toLowerCase()))) {
    score += 1;
  }
  const tagMatches = profile.program_genres.concat(profile.needed_roles).filter((t) =>
    talent.hashtags?.some((h) => h.toLowerCase().includes(t.toLowerCase()))
  ).length;
  score += tagMatches;
  return score;
}

function sortByRecommendScore(
  talents: Talent[],
  profile: { program_genres: string[]; needed_roles: string[] },
  searchTag: string
): Talent[] {
  return [...talents].sort((a, b) => {
    const sa = recommendScore(a, profile, searchTag);
    const sb = recommendScore(b, profile, searchTag);
    return sb - sa;
  });
}

export async function getTalentById(id: string): Promise<Talent | null> {
  if (isDemoMode()) {
    return DEMO_TALENTS.find((t) => t.id === id && t.is_active) ?? null;
  }
  const supabase = await createClient();
  const { data, error } = await supabase.from("talents").select("*").eq("id", id).eq("is_active", true).single();
  if (error || !data) return null;
  return data as Talent;
}

export async function getSimilarTalents(talent: Talent, limit: number): Promise<Talent[]> {
  if (isDemoMode()) {
    const list = DEMO_TALENTS.filter((t) => t.id !== talent.id && t.is_active);
    const scored = list.map((t) => ({
      t,
      score:
        (t.role === talent.role ? 3 : 0) +
        (t.genres?.filter((g) => talent.genres?.includes(g)).length ?? 0) * 2 +
        (t.hashtags?.filter((h) => talent.hashtags?.includes(h)).length ?? 0),
    }));
    scored.sort((a, b) => b.score - a.score);
    return scored.slice(0, limit).map((x) => x.t);
  }
  const supabase = await createClient();
  const { data } = await supabase
    .from("talents")
    .select("*")
    .eq("is_active", true)
    .neq("id", talent.id);
  const list = (data ?? []) as Talent[];
  const scored = list.map((t) => ({
    t,
    score:
      (t.role === talent.role ? 3 : 0) +
      (t.genres?.filter((g) => talent.genres?.includes(g)).length ?? 0) * 2 +
      (t.hashtags?.filter((h) => talent.hashtags?.includes(h)).length ?? 0),
  }));
  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map((x) => x.t);
}
