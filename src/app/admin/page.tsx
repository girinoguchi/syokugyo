import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import type { Job } from "@/lib/types";

function categoryClass(category: string) {
  const map: Record<string, string> = {
    "エキストラ": "tag-yellow",
    "音響スタッフ": "tag-green",
    "照明スタッフ": "tag-orange",
    "撮影・カメラ": "tag-coral",
    "制作・AD": "tag-green",
    "イベント運営": "tag-yellow",
  };
  return map[category] ?? "tag-plain";
}

export default async function AdminDashboardPage() {
  const supabase = await createClient();
  const { data: jobs } = await supabase
    .from("jobs")
    .select("id, title, category, location, is_active, created_at")
    .order("created_at", { ascending: false });
  const list = (jobs ?? []) as Pick<Job, "id" | "title" | "category" | "location" | "is_active" | "created_at">[];

  return (
    <div>
      <span className="tc-eyebrow bg-white">ADMIN</span>
      <h1 className="mt-3 text-2xl md:text-3xl font-black text-telecareer-ink mb-5 tc-section-heading">
        管理者ダッシュボード
      </h1>
      <div className="mb-8 flex gap-3 flex-wrap">
        <Link href="/admin/jobs/new" className="btn-cta px-5 py-2.5 font-bold">
          + 案件を新規登録
        </Link>
        <Link href="/admin/jobs" className="btn-outline-coral px-5 py-2.5 font-bold">
          案件管理
        </Link>
        <Link href="/admin/applications" className="btn-outline-coral px-5 py-2.5 font-bold">
          応募一覧を見る
        </Link>
      </div>

      <h2 className="text-lg font-bold text-telecareer-ink mb-3">掲載中・登録済みの案件</h2>
      <div className="tc-card-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[600px]">
            <thead className="bg-telecareer-yellow/15 border-b-2 border-ink/10">
              <tr>
                <th className="px-4 py-3 text-sm font-bold text-ink">求人タイトル</th>
                <th className="px-4 py-3 text-sm font-bold text-ink">カテゴリ</th>
                <th className="px-4 py-3 text-sm font-bold text-ink">勤務地</th>
                <th className="px-4 py-3 text-sm font-bold text-ink">状態</th>
                <th className="px-4 py-3 text-sm font-bold text-ink">操作</th>
              </tr>
            </thead>
            <tbody>
              {list.length === 0 ? (
                <tr><td colSpan={5} className="px-4 py-8 text-gray-500 text-center">案件がまだ登録されていません。「+ 案件を新規登録」から追加してください。</td></tr>
              ) : (
                list.map((j) => (
                  <tr key={j.id} className="border-b border-ink/5">
                    <td className="px-4 py-3 font-bold text-ink max-w-[280px] truncate">{j.title}</td>
                    <td className="px-4 py-3">
                      <span className={`tag-pill ${categoryClass(j.category)}`}>{j.category}</span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">{j.location ?? "—"}</td>
                    <td className="px-4 py-3">
                      <span className={`tag-pill ${j.is_active ? "tag-green" : "tag-plain"}`}>{j.is_active ? "公開" : "非公開"}</span>
                    </td>
                    <td className="px-4 py-3 flex gap-3 items-center">
                      <Link href={`/admin/jobs/${j.id}/edit`} className="text-sm link-accent">編集</Link>
                      <form action={`/admin/jobs/${j.id}/delete`} method="post" className="inline">
                        <button type="submit" className="text-sm font-semibold text-coral-a11y hover:underline" onClick={(e) => !confirm("削除してよろしいですか？") && e.preventDefault()}>
                          削除
                        </button>
                      </form>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
