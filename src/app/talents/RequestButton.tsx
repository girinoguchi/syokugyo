"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export function RequestButton({ talentId, talentName }: { talentId: string; talentName: string }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [memo, setMemo] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const useDemo = !process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    try {
      if (useDemo) {
        const res = await fetch("/api/demo/request", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ talent_id: talentId, memo }),
        });
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          alert((data.error as string) || "依頼の送信に失敗しました。");
          setLoading(false);
          return;
        }
        setOpen(false);
        setMemo("");
        setLoading(false);
        alert(`${talentName} さんへの依頼を送信しました。（デモモード）`);
        return;
      }

      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
        setLoading(false);
        return;
      }
      const { data: profile } = await supabase.from("profiles").select("company_name, contact_name, email").eq("id", user.id).single();
      const { error } = await supabase.from("requests").insert({
        talent_id: talentId,
        requester_user_id: user.id,
        requester_company_name: profile?.company_name ?? null,
        requester_contact_name: profile?.contact_name ?? null,
        requester_email: profile?.email ?? user.email ?? null,
        memo: memo || null,
        status: "未対応",
      });
      if (error) {
        alert(error.message);
        setLoading(false);
        return;
      }
      setOpen(false);
      setMemo("");
      router.refresh();
      alert(`${talentName} さんへの依頼を送信しました。`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="text-sm btn-cta px-4 py-1.5 font-bold"
      >
        依頼する
      </button>
      {open && (
        <div className="fixed inset-0 bg-ink/60 flex items-center justify-center z-50 p-4">
          <div className="tc-card max-w-md w-full p-6 md:p-7">
            <h3 className="font-black text-xl mb-4 text-telecareer-ink">
              <span className="tc-marker">{talentName}</span> さんに依頼
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="tc-label">メモ（任意）</label>
                <textarea
                  value={memo}
                  onChange={(e) => setMemo(e.target.value)}
                  rows={3}
                  className="tc-input"
                  placeholder="依頼内容の補足など"
                />
              </div>
              <div className="flex gap-3 justify-end">
                <button type="button" onClick={() => setOpen(false)} className="btn-outline-coral px-5 py-2 font-bold">
                  キャンセル
                </button>
                <button type="submit" disabled={loading} className="btn-cta px-5 py-2 font-bold disabled:opacity-50">
                  {loading ? "送信中..." : "依頼を送信"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
