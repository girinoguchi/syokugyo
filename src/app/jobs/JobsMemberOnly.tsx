"use client";

import { useEffect } from "react";
import { useDemoClientSession } from "@/lib/demo-client-session";

/**
 * 会員向けページ用ガード。デモ環境で localStorage の管理者セッションなら /admin へ戻す。
 */
export function JobsMemberOnly({ children }: { children: React.ReactNode }) {
  const { session, loading } = useDemoClientSession();

  useEffect(() => {
    if (loading) return;
    if (session?.role === "admin") {
      window.location.replace("/admin");
    }
  }, [loading, session]);

  if (loading || session?.role === "admin") {
    return (
      <div className="tc-card p-8 text-center text-sm text-gray-500">読み込み中...</div>
    );
  }

  return <>{children}</>;
}
