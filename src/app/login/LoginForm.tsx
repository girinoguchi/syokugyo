"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { isDemoMode } from "@/lib/demo-auth";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/mypage";
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();
    if (!trimmedEmail) {
      setError("メールアドレスを入力してください。");
      return;
    }
    if (!trimmedPassword) {
      setError("パスワードを入力してください。");
      return;
    }

    const useDemo = isDemoMode();

    setLoading(true);
    try {
      if (useDemo) {
        const res = await fetch("/api/demo/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ email: trimmedEmail, password: trimmedPassword }),
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
          setError((data.error as string) || "ログインに失敗しました。再度お試しください。");
          return;
        }
        router.push(redirectTo);
        router.refresh();
        return;
      }

      const supabase = createClient();
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: trimmedEmail,
        password: trimmedPassword,
      });
      if (signInError) {
        setError(signInError.message + " 内容を修正して再度送信してください。");
        return;
      }
      router.push(redirectTo);
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "予期せぬエラーが発生しました。内容を確認して再度送信してください。"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4 tc-card p-6 md:p-7">
        {error && (
          <div className="tc-error-enter text-coral-a11y text-sm bg-telecareer-coral/10 p-4 rounded-xl border-2 border-telecareer-coral flex justify-between items-start gap-3">
            <span>{error}</span>
            <button
              type="button"
              onClick={() => setError(null)}
              className="text-telecareer-coral hover:opacity-70 shrink-0 font-bold"
              aria-label="エラーを閉じる"
            >
              ×
            </button>
          </div>
        )}
        <div>
          <label className="tc-label">メールアドレス</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="tc-input"
          />
        </div>
        <div>
          <label className="tc-label">パスワード</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="tc-input"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`w-full btn-cta py-3 font-bold disabled:opacity-50${loading ? " tc-btn-loading" : ""}`}
        >
          {loading ? "ログイン中..." : "ログイン"}
        </button>
      </form>
      <p className="mt-5 text-center text-sm text-gray-600">
        <Link href="/signup" className="link-accent">
          会員登録はこちら →
        </Link>
      </p>
    </>
  );
}
