"use client";

import { useState } from "react";
import type { Job } from "@/lib/types";
import { GENDER_OPTIONS } from "@/lib/types";

type ProfilePrefill = {
  contact_name?: string | null;
  email?: string | null;
  phone?: string | null;
  age?: string;
};

type Props = {
  job: Job;
  profile: ProfilePrefill;
};

export function JobApplyForm({ job, profile }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [applied, setApplied] = useState(false);
  const [form, setForm] = useState({
    applicant_name: profile.contact_name ?? "",
    email: profile.email ?? "",
    age: profile.age ?? "",
    gender: "",
    address: "",
    phone: profile.phone ?? "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!form.applicant_name || !form.email || !form.age || !form.gender || !form.address || !form.phone) {
      setError("年齢・住所・電話番号・性別・氏名はすべて必須です。");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/demo/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          job_id: job.id,
          job_title: job.title,
          ...form,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError((data.error as string) || "応募に失敗しました。再度お試しください。");
        return;
      }
      setApplied(true);
    } catch {
      setError("予期せぬエラーが発生しました。");
    } finally {
      setLoading(false);
    }
  };

  if (applied) {
    return (
      <div className="tc-card-soft p-5 text-center">
        <p className="font-black text-telecareer-ink text-lg mb-1">応募を受け付けました</p>
        <p className="text-sm text-gray-600">
          「{job.title}」へのご応募ありがとうございます。担当者より追ってご連絡いたします。
        </p>
      </div>
    );
  }

  return (
    <>
      <h2 className="font-black text-xl mb-1 text-telecareer-ink">応募フォーム</h2>
      <p className="text-sm text-gray-600 mb-4">
        <span className="tc-marker">{job.title}</span>
      </p>
      {error ? (
        <div className="text-coral-a11y text-sm bg-telecareer-coral/10 p-3 rounded-xl border-2 border-telecareer-coral mb-4">
          {error}
        </div>
      ) : null}
      <p className="text-xs text-gray-500 mb-4">
        会員情報をもとに一部の項目を自動入力しています。内容をご確認のうえ、必要に応じて修正してください。
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="tc-label">氏名 *</label>
          <input
            type="text"
            required
            value={form.applicant_name}
            onChange={(e) => setForm((p) => ({ ...p, applicant_name: e.target.value }))}
            className="tc-input"
          />
        </div>
        <div>
          <label className="tc-label">メールアドレス *</label>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
            className="tc-input"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 min-w-0">
          <div className="min-w-0">
            <label className="tc-label">年齢 *</label>
            <input
              type="number"
              min={0}
              required
              value={form.age}
              onChange={(e) => setForm((p) => ({ ...p, age: e.target.value }))}
              className="tc-input w-full"
            />
          </div>
          <div className="min-w-0">
            <label className="tc-label">性別 *</label>
            <select
              required
              value={form.gender}
              onChange={(e) => setForm((p) => ({ ...p, gender: e.target.value }))}
              className="tc-input w-full"
            >
              <option value="">選択してください</option>
              {GENDER_OPTIONS.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <label className="tc-label">住所 *</label>
          <input
            type="text"
            required
            value={form.address}
            onChange={(e) => setForm((p) => ({ ...p, address: e.target.value }))}
            className="tc-input"
            placeholder="例: 東京都新宿区..."
          />
        </div>
        <div>
          <label className="tc-label">電話番号 *</label>
          <input
            type="tel"
            required
            value={form.phone}
            onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
            className="tc-input"
            placeholder="例: 090-1234-5678"
          />
        </div>
        <div>
          <label className="tc-label">メッセージ（任意）</label>
          <textarea
            rows={3}
            value={form.message}
            onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
            className="tc-input"
            placeholder="自己PR・経験・希望条件など"
          />
        </div>
        <div className="pt-1">
          <button
            type="submit"
            disabled={loading}
            className={`btn-cta px-6 py-2.5 font-bold disabled:opacity-50${loading ? " tc-btn-loading" : ""}`}
          >
            {loading ? "送信中..." : "この案件に応募する"}
          </button>
        </div>
      </form>
    </>
  );
}
