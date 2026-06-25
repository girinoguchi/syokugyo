"use client";

import { useState } from "react";
import Link from "next/link";

type Props = {
  defaultName?: string;
  defaultEmail?: string;
  defaultPhone?: string;
};

export function MypageContactForm({ defaultName = "", defaultEmail = "", defaultPhone = "" }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    contact_name: defaultName,
    email: defaultEmail,
    phone: defaultPhone,
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/demo/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError((data.error as string) || "送信に失敗しました。再度お試しください。");
        return;
      }
      setSent(true);
    } catch {
      setError("予期せぬエラーが発生しました。");
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <div className="tc-card-soft p-6 text-center">
        <p className="font-black text-telecareer-ink text-lg mb-1">お問い合わせを受け付けました</p>
        <p className="text-sm text-gray-600">内容を確認のうえ、担当者よりご連絡いたします。ありがとうございました。</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error ? (
        <div className="text-coral-a11y text-sm bg-telecareer-coral/10 p-4 rounded-xl border-2 border-telecareer-coral">
          {error}
        </div>
      ) : null}
      <div>
        <label className="tc-label">お名前 *</label>
        <input
          type="text"
          required
          value={form.contact_name}
          onChange={(e) => setForm((p) => ({ ...p, contact_name: e.target.value }))}
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
      <div>
        <label className="tc-label">電話番号（任意）</label>
        <input
          type="tel"
          value={form.phone}
          onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
          className="tc-input"
          placeholder="例: 090-1234-5678"
        />
      </div>
      <div>
        <label className="tc-label">お問い合わせ内容 *</label>
        <textarea
          required
          rows={5}
          value={form.message}
          onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
          className="tc-input"
          placeholder="ご質問・ご相談内容をご記入ください"
        />
      </div>
      <p className="text-xs text-gray-500 leading-relaxed">
        送信をもって
        <Link href="/privacy" className="link-accent">
          プライバシーポリシー
        </Link>
        に同意したものとみなします。
      </p>
      <button
        type="submit"
        disabled={loading}
        className={`w-full btn-cta py-3 font-bold disabled:opacity-50${loading ? " tc-btn-loading" : ""}`}
      >
        {loading ? "送信中..." : "送信する"}
      </button>
    </form>
  );
}
