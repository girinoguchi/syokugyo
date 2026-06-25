"use client";

import { useRouter } from "next/navigation";

const ROLE_OPTIONS = ["AD", "D", "P"];
const GENRE_OPTIONS = ["バラエティ", "報道", "情報", "ドキュメンタリー", "Web動画"];

export function TalentsSearchForm({
  defaultQ,
  defaultRole,
  defaultGenre,
  defaultTag,
  defaultSort,
  isLoggedIn,
}: {
  defaultQ?: string;
  defaultRole?: string;
  defaultGenre?: string;
  defaultTag?: string;
  defaultSort?: string;
  isLoggedIn: boolean;
}) {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const q = (form.querySelector('[name="q"]') as HTMLInputElement)?.value ?? "";
    const role = (form.querySelector('[name="role"]') as HTMLSelectElement)?.value ?? "";
    const genre = (form.querySelector('[name="genre"]') as HTMLSelectElement)?.value ?? "";
    const tag = (form.querySelector('[name="tag"]') as HTMLInputElement)?.value ?? "";
    const sort = (form.querySelector('[name="sort"]') as HTMLSelectElement)?.value ?? "";
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (role) params.set("role", role);
    if (genre) params.set("genre", genre);
    if (tag) params.set("tag", tag);
    if (sort) params.set("sort", sort);
    router.push(`/talents?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit} className="tc-card-soft p-5 space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="lg:col-span-2">
          <label className="tc-label">フリーワード</label>
          <input
            type="text"
            name="q"
            defaultValue={defaultQ}
            placeholder="名前・経験番組・特技・タグ"
            className="tc-input"
          />
        </div>
        <div>
          <label className="tc-label">職種</label>
          <select name="role" defaultValue={defaultRole ?? ""} className="tc-input">
            <option value="">すべて</option>
            {ROLE_OPTIONS.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="tc-label">ジャンル</label>
          <select name="genre" defaultValue={defaultGenre ?? ""} className="tc-input">
            <option value="">すべて</option>
            {GENRE_OPTIONS.map((g) => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex flex-wrap gap-4 items-end">
        <div className="flex-1 min-w-[120px]">
          <label className="tc-label">ハッシュタグ</label>
          <input
            type="text"
            name="tag"
            defaultValue={defaultTag}
            placeholder="例: リサーチ"
            className="tc-input"
          />
        </div>
        {isLoggedIn && (
          <div className="w-40">
            <label className="tc-label">並び順</label>
            <select name="sort" defaultValue={defaultSort ?? "created_at"} className="tc-input">
              <option value="created_at">新着順</option>
              <option value="recommend">おすすめ順</option>
            </select>
          </div>
        )}
        <button type="submit" className="btn-cta px-7 py-2.5 font-bold">
          検索する
        </button>
      </div>
    </form>
  );
}
