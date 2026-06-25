import { Suspense } from "react";
import Link from "next/link";
import { isDemoMode } from "@/lib/demo-auth";
import { AdminJobsManager } from "@/components/admin/AdminJobsManager";

export const dynamic = "force-dynamic";

export default function AdminJobsPage() {
  if (!isDemoMode()) {
    return (
      <div>
        <Link href="/admin" className="text-sm link-accent mb-4 inline-block">
          ← ダッシュボード
        </Link>
        <h1 className="text-2xl font-black text-telecareer-ink mb-3">案件管理</h1>
        <div className="tc-card-soft p-8 text-center text-gray-600 text-sm">
          本番環境（Supabase 接続）では、この画面の案件管理は準備中です。
        </div>
      </div>
    );
  }

  return (
    <Suspense
      fallback={
        <div className="tc-card-soft p-8 text-center text-sm text-gray-500">読み込み中...</div>
      }
    >
      <AdminJobsManager />
    </Suspense>
  );
}
