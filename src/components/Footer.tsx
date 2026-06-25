import Link from "next/link";
import { getWordPressAdminUrl } from "@/lib/wordpress";

export function Footer() {
  const wpAdminUrl = getWordPressAdminUrl();
  return (
    <footer className="bg-telecareer-dark text-gray-400 text-sm mt-20 relative overflow-hidden">
      {/* 上部のカラフルな帯 */}
      <div className="flex h-2">
        <span className="flex-1 bg-telecareer-yellow" />
        <span className="flex-1 bg-telecareer-orange" />
        <span className="flex-1 bg-telecareer-green" />
        <span className="flex-1 bg-telecareer-coral" />
      </div>
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
          <div>
            <Link href="/" className="inline-flex items-center gap-2.5 mb-3">
              <span className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-telecareer-orange border-2 border-ink text-white font-black">E</span>
              <span className="font-black text-xl text-white tracking-tight">エンジン</span>
            </Link>
            <p className="leading-relaxed">
              エンタメ業界で働きたい人の、エンジンになる。
              バラエティ・ドラマ・芸能マネージャー・CM・配信など、エンタメ特化の求人をお届けします。未経験から始められる仕事も多数。
            </p>
            <p className="mt-3 text-xs text-gray-500">運営：株式会社フォーミュレーションI.T.S.</p>
          </div>
          <div>
            <h3 className="text-telecareer-text-on-dark font-bold mb-3">Contents</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="hover:text-telecareer-yellow transition-colors">トップ</Link></li>
              <li><Link href="/jobs" className="hover:text-telecareer-yellow transition-colors">求人を探す</Link></li>
              <li><Link href="/contact" className="hover:text-telecareer-yellow transition-colors">お問い合わせ</Link></li>
              <li><Link href="/login" className="hover:text-telecareer-yellow transition-colors">ログイン</Link></li>
              <li><Link href="/signup" className="hover:text-telecareer-yellow transition-colors">会員登録</Link></li>
              <li>
                <a href="https://www.f-its.co.jp/recruit/" target="_blank" rel="noopener noreferrer" className="hover:text-telecareer-yellow transition-colors">
                  新卒採用の方はこちら ↗
                </a>
              </li>
              <li>
                <a href={wpAdminUrl} target="_blank" rel="noopener noreferrer" className="hover:text-telecareer-yellow transition-colors">
                  管理者ログイン（案件入稿）
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-gray-500">
          <span>© エンジン（株式会社フォーミュレーションI.T.S.）All Rights Reserved.</span>
          <Link href="/privacy" className="hover:text-telecareer-yellow transition-colors">プライバシーポリシー</Link>
        </div>
      </div>
    </footer>
  );
}
