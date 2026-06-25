import Link from "next/link";
import { isDemoMode } from "@/lib/demo-auth";
import { AdminAccountsManager } from "@/components/admin/AdminAccountsManager";

export const dynamic = "force-dynamic";

export default function AdminAccountsPage() {
  if (!isDemoMode()) {
    return (
      <div>
        <Link href="/admin" className="text-sm link-accent mb-4 inline-block">
          ← ダッシュボード
        </Link>
        <h1 className="text-2xl font-black text-telecareer-ink mb-3">アカウント管理</h1>
        <div className="tc-card-soft p-8 text-center text-gray-600 text-sm">
          本番環境（Supabase 接続）では、この画面のアカウント管理は準備中です。
        </div>
      </div>
    );
  }

  return <AdminAccountsManager />;
}
