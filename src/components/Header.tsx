import Link from "next/link";

type HeaderProps = {
  user?: { email?: string | null } | null;
  profile?: { company_name?: string | null; role?: string } | null;
};

export function Header({ user, profile }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-telecareer-offwhite/90 backdrop-blur border-b-2 border-ink">
      <div className="mx-auto max-w-6xl px-4 py-3 flex justify-between items-center flex-wrap gap-2">
        <Link href="/" className="flex items-center gap-2.5 hover:opacity-90 transition-opacity">
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-telecareer-orange border-2 border-ink shadow-[3px_3px_0_rgba(43,38,32,0.18)] text-white font-black text-lg">E</span>
          <span className="flex flex-col leading-none">
            <span className="font-black text-xl text-telecareer-ink tracking-tight">エンジン</span>
            <span className="text-[10px] font-bold text-gray-500 mt-0.5">エンタメ人材キャリアマッチング</span>
          </span>
        </Link>
        <nav className="flex items-center gap-5">
          <Link href="/jobs" className="text-sm nav-link-light font-medium hidden sm:inline">
            求人を探す
          </Link>
          <Link href="/contact" className="text-sm nav-link-light font-medium hidden sm:inline">
            お問い合わせ
          </Link>
          {profile?.role === "admin" && (
            <>
              <Link href="/admin" className="text-sm nav-link-light hidden sm:inline">
                ダッシュボード
              </Link>
              <Link href="/admin/jobs" className="text-sm nav-link-light hidden sm:inline">
                案件管理
              </Link>
              <Link href="/admin/applications" className="text-sm nav-link-light hidden sm:inline">
                応募一覧
              </Link>
            </>
          )}
          {user ? (
            <>
              <span className="text-sm font-semibold text-gray-600 hidden sm:inline">
                {profile?.company_name ?? "会員"}
              </span>
              <form action="/auth/signout" method="post">
                <button type="submit" className="text-sm nav-link-light">
                  ログアウト
                </button>
              </form>
            </>
          ) : (
            <>
              <Link href="/login" className="text-sm nav-link-light font-medium">
                ログイン
              </Link>
              <Link href="/signup" className="btn-cta px-4 py-2 text-sm font-bold">
                会員登録
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
