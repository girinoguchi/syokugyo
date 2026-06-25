"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const ROLE_OPTIONS = ["AD", "D", "P"];
const GENRE_OPTIONS = ["バラエティ", "報道", "情報", "ドキュメンタリー", "Web動画"];

type TalentFormData = {
  name: string;
  image_url: string;
  age: string;
  gender: string;
  role: string;
  company: string;
  bio: string;
  experience_programs: string;
  genres: string[];
  skills: string;
  specialties: string;
  qualifications: string;
  hashtags: string;
  is_active: boolean;
};

const defaultForm: TalentFormData = {
  name: "",
  image_url: "",
  age: "",
  gender: "",
  role: "AD",
  company: "",
  bio: "",
  experience_programs: "",
  genres: [],
  skills: "",
  specialties: "",
  qualifications: "",
  hashtags: "",
  is_active: true,
};

export function TalentForm({
  talent,
  actionUrl,
  method = "POST",
}: {
  talent?: TalentFormData | null;
  actionUrl: string;
  method?: "POST" | "PUT";
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState<TalentFormData>(talent ?? defaultForm);

  const toggleGenre = (g: string) => {
    setForm((prev) => ({
      ...prev,
      genres: prev.genres.includes(g) ? prev.genres.filter((x) => x !== g) : [...prev.genres, g],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const payload = {
      name: form.name.trim(),
      image_url: form.image_url.trim() || null,
      age: form.age ? parseInt(form.age, 10) : null,
      gender: form.gender || null,
      role: form.role,
      company: form.company.trim() || null,
      bio: form.bio.trim() || null,
      experience_programs: form.experience_programs.split("\n").map((s) => s.trim()).filter(Boolean),
      genres: form.genres,
      skills: form.skills.split("\n").map((s) => s.trim()).filter(Boolean),
      specialties: form.specialties.split("\n").map((s) => s.trim()).filter(Boolean),
      qualifications: form.qualifications.split("\n").map((s) => s.trim()).filter(Boolean),
      hashtags: form.hashtags.split(/\s+/).map((s) => s.replace(/^#/, "").trim()).filter(Boolean),
      is_active: form.is_active,
    };
    const res = await fetch(actionUrl, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? "保存に失敗しました");
      setLoading(false);
      return;
    }
    router.push("/admin");
    router.refresh();
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 tc-card p-6 md:p-7">
      {error && <div className="text-coral-a11y bg-telecareer-coral/10 border-2 border-telecareer-coral p-3 rounded-xl">{error}</div>}
      <div>
        <label className="tc-label">名前 *</label>
        <input type="text" required value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} className="tc-input" />
      </div>
      <div>
        <label className="tc-label">プロフィール画像（顔写真）URL</label>
        <input type="url" value={form.image_url} onChange={(e) => setForm((p) => ({ ...p, image_url: e.target.value }))} className="tc-input" placeholder="https://..." />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="tc-label">年齢</label>
          <input type="number" min={0} value={form.age} onChange={(e) => setForm((p) => ({ ...p, age: e.target.value }))} className="tc-input" />
        </div>
        <div>
          <label className="tc-label">性別</label>
          <input type="text" value={form.gender} onChange={(e) => setForm((p) => ({ ...p, gender: e.target.value }))} className="tc-input" placeholder="例: 女" />
        </div>
      </div>
      <div>
        <label className="tc-label">職種 *</label>
        <select value={form.role} onChange={(e) => setForm((p) => ({ ...p, role: e.target.value }))} className="tc-input">
          {ROLE_OPTIONS.map((r) => <option key={r} value={r}>{r}</option>)}
        </select>
      </div>
      <div>
        <label className="tc-label">所属</label>
        <input type="text" value={form.company} onChange={(e) => setForm((p) => ({ ...p, company: e.target.value }))} className="tc-input" />
      </div>
      <div>
        <label className="tc-label">経歴概要</label>
        <textarea value={form.bio} onChange={(e) => setForm((p) => ({ ...p, bio: e.target.value }))} rows={3} className="tc-input" />
      </div>
      <div>
        <label className="tc-label">経験番組（1行1件）</label>
        <textarea value={form.experience_programs} onChange={(e) => setForm((p) => ({ ...p, experience_programs: e.target.value }))} rows={4} className="tc-input" placeholder="EX「ミラクル9」" />
      </div>
      <div>
        <label className="tc-label mb-2">経験ジャンル（複数選択）</label>
        <div className="flex flex-wrap gap-2">
          {GENRE_OPTIONS.map((g) => {
            const on = form.genres.includes(g);
            return (
              <button type="button" key={g} onClick={() => toggleGenre(g)} className={`tag-pill cursor-pointer transition-colors ${on ? "tag-orange" : "tag-plain"}`}>
                {g}
              </button>
            );
          })}
        </div>
      </div>
      <div>
        <label className="tc-label">経験業務（1行1件）</label>
        <textarea value={form.skills} onChange={(e) => setForm((p) => ({ ...p, skills: e.target.value }))} rows={2} className="tc-input" placeholder="リサーチ&#10;ロケ" />
      </div>
      <div>
        <label className="tc-label">特技（1行1件）</label>
        <textarea value={form.specialties} onChange={(e) => setForm((p) => ({ ...p, specialties: e.target.value }))} rows={2} className="tc-input" />
      </div>
      <div>
        <label className="tc-label">資格（1行1件）</label>
        <textarea value={form.qualifications} onChange={(e) => setForm((p) => ({ ...p, qualifications: e.target.value }))} rows={2} className="tc-input" />
      </div>
      <div>
        <label className="tc-label">ハッシュタグ（スペース区切り）</label>
        <input type="text" value={form.hashtags} onChange={(e) => setForm((p) => ({ ...p, hashtags: e.target.value }))} className="tc-input" placeholder="AD バラエティ リサーチ" />
      </div>
      <div>
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" className="w-4 h-4 accent-telecareer-orange" checked={form.is_active} onChange={(e) => setForm((p) => ({ ...p, is_active: e.target.checked }))} />
          <span className="text-sm font-semibold text-ink">名簿に表示する</span>
        </label>
      </div>
      <div className="flex gap-3 pt-4">
        <button type="submit" disabled={loading} className="btn-cta px-7 py-2.5 font-bold disabled:opacity-50">
          {loading ? "保存中..." : "保存する"}
        </button>
        <button type="button" onClick={() => router.back()} className="btn-outline-coral px-7 py-2.5 font-bold">
          キャンセル
        </button>
      </div>
    </form>
  );
}
