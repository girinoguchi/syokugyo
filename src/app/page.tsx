import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const CAREER_SUPPORT = [
  {
    title: "業界を知り尽くしたアドバイザー",
    body: "エンタメ業界を知り尽くしたキャリアアドバイザーが、あなたの相談に乗ります。現場のリアルを知るからこそできる、的確なアドバイス。",
    color: "bg-telecareer-yellow",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    title: "未経験からのキャリア相談もOK",
    body: "「業界に興味はあるけど不安」という方も大丈夫。未経験からのスタートを数多くサポートしてきました。まずは気軽にご相談ください。",
    color: "bg-telecareer-coral",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z" />
      </svg>
    ),
  },
  {
    title: "希望や適性に合わせて紹介",
    body: "あなたの希望や適性をうかがったうえで、ぴったりの案件・求人をご紹介。ミスマッチの少ない、納得のいくキャリア選びを後押しします。",
    color: "bg-telecareer-green",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
        <polyline points="9 11 12 14 22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
      </svg>
    ),
  },
];

const CATEGORIES = [
  { name: "エキストラ", desc: "ドラマ・映画・CMの撮影に参加。未経験・学生も歓迎。", ring: "bg-telecareer-yellow" },
  { name: "制作・AD", desc: "テレビ・映像制作のアシスタント。業界デビューの第一歩に。", ring: "bg-telecareer-orange" },
  { name: "音響スタッフ", desc: "ライブ・イベントの音響設営やPA補助。研修ありの求人も。", ring: "bg-telecareer-coral" },
  { name: "照明スタッフ", desc: "ステージ・撮影現場のライティング。光で空間を演出。", ring: "bg-telecareer-green" },
  { name: "撮影・カメラ", desc: "番組・配信・Web動画の撮影サポートやカメラ補助。", ring: "bg-telecareer-yellow" },
  { name: "イベント運営", desc: "コンサート・イベントの設営や運営スタッフ。単発も多数。", ring: "bg-telecareer-coral" },
];

const DIFF_POINTS = [
  { title: "質の高いエンタメ求人", body: "長年エンタメ業界に人材を送り出してきたからこそ集まる、質の高い求人をご用意しています。", color: "text-coral-a11y" },
  { title: "各局・各社とのコネクション", body: "民放キー局・制作会社・大手広告会社など、長年培ったコネクションを活かしたマッチング。", color: "text-orange-700" },
  { title: "未経験からの入口", body: "未経験からエンタメ業界を目指せる入口がここに。経験ゼロから始められる仕事も多数。", color: "text-green-700" },
  { title: "アドバイザーがサポート", body: "業界を知るキャリアアドバイザーが、応募から現場デビューまで伴走します。", color: "text-coral-a11y" },
];

// 配属実績（運営会社の公式サイト掲載情報を流用。局・カテゴリ単位＋代表例）
const WORKS = [
  { network: "日本テレビ", shows: ["世界の果てまでイッテQ!", "月曜から夜ふかし", "有吉の壁", "ZIP!"] },
  { network: "テレビ朝日", shows: ["ミュージックステーション", "ロンドンハーツ", "Qさま!!", "グッド！モーニング"] },
  { network: "TBSテレビ", shows: ["ラヴィット！", "水曜日のダウンタウン", "王様のブランチ"] },
  { network: "フジテレビ", shows: ["新しいカギ", "全力！脱力タイムズ", "めざましテレビ"] },
  { network: "ドラマ", shows: ["VIVANT", "ブラッシュアップライフ", "どうする家康"] },
  { network: "配信コンテンツ", shows: ["ABEMA", "Netflix", "TVer", "YouTube"] },
  { network: "CM", shows: ["大手広告会社・CM制作会社の現場"] },
  { network: "その他（テレビ東京・NHK 等）", shows: ["チコちゃんに叱られる！", "プレバト！！", "乃木坂工事中"] },
];

const SEEKER_STEPS = [
  { no: "01", color: "tag-yellow", title: "無料で会員登録", body: "名前・連絡先などをご登録（1分）。費用は一切かかりません。" },
  { no: "02", color: "tag-coral", title: "キャリア相談・求人紹介", body: "アドバイザーがあなたの希望や適性をうかがい、ぴったりの求人をご紹介します。" },
  { no: "03", color: "tag-green", title: "気になる求人に応募", body: "紹介された求人や気になる求人に応募。現場デビューまでサポートします。" },
];

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-telecareer-surface">
      <Header />

      <main className="flex-1">
        {/* ===== Hero（明るい配色） ===== */}
        <section className="bg-telecareer-hero relative overflow-hidden border-b-2 border-ink">
          <div className="mx-auto max-w-5xl px-4 pt-16 pb-20 md:pt-24 md:pb-28 relative z-10 flex flex-col items-center text-center">
            <span className="tc-eyebrow bg-white">エンタメ人材キャリアマッチング</span>
            <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl font-black leading-[1.12] tracking-tight text-telecareer-ink">
              エンタメ業界で働きたい人の、<br className="hidden sm:block" />
              <span className="tc-marker">エンジン</span>になる。
            </h1>
            <p className="mt-6 text-base sm:text-lg text-gray-700 max-w-2xl font-medium">
              バラエティ、ドラマ、芸能マネージャー、CM、配信など、<br className="hidden sm:block" />
              エンタメ特化の求人が見つかる。未経験から始められる仕事も多数。
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center">
              <Link href="/signup" className="btn-cta px-9 py-4 font-bold text-lg w-full sm:w-auto">
                無料で会員登録 →
              </Link>
              <Link href="/jobs" className="btn-outline-coral px-9 py-4 font-bold text-lg w-full sm:w-auto">
                求人を探す
              </Link>
            </div>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm font-bold text-gray-700">
              <span className="inline-flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-telecareer-yellow" />未経験OK</span>
              <span className="inline-flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-telecareer-coral" />登録無料</span>
              <span className="inline-flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-telecareer-green" />キャリアアドバイザーがサポート</span>
            </div>
          </div>
        </section>

        {/* ===== キャリアサポート訴求 ===== */}
        <section className="mx-auto max-w-6xl px-4 py-16 md:py-20">
          <div className="text-center mb-12">
            <span className="tc-eyebrow bg-white">CAREER SUPPORT</span>
            <h2 className="mt-4 text-2xl md:text-3xl font-black text-telecareer-ink tc-section-heading inline-block">
              あなた専任のキャリアアドバイザーがサポート
            </h2>
            <p className="mt-4 text-gray-600 font-medium">一人で悩まなくて大丈夫。業界を知るプロが、あなたのキャリアに伴走します。</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {CAREER_SUPPORT.map((c) => (
              <div key={c.title} className="tc-card tc-card-hover p-7 flex flex-col items-center text-center">
                <span className={`w-16 h-16 rounded-2xl border-2 border-ink flex items-center justify-center text-ink ${c.color}`}>{c.icon}</span>
                <h3 className="mt-4 font-bold text-lg text-telecareer-ink">{c.title}</h3>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed">{c.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="/signup" className="btn-cta px-8 py-3.5 font-bold text-base">無料で相談・会員登録する →</Link>
          </div>
        </section>

        {/* ===== 差別化ポイント ===== */}
        <section className="bg-white border-y-2 border-ink">
          <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
            <div className="text-center mb-12">
              <span className="tc-eyebrow bg-telecareer-surface">WHY ENGINE</span>
              <h2 className="mt-4 text-2xl md:text-3xl font-black text-telecareer-ink tc-section-heading inline-block">
                エンジンが選ばれる理由
              </h2>
              <p className="mt-4 text-gray-600 font-medium">長年培った各局・各社とのコネクションが、案件の質の高さにつながっています。</p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              {DIFF_POINTS.map((d, i) => (
                <div key={d.title} className="tc-card p-6 flex gap-4 items-start">
                  <span className={`text-3xl font-black ${d.color} shrink-0`}>{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="font-bold text-lg text-telecareer-ink">{d.title}</h3>
                    <p className="mt-1 text-sm text-gray-600 leading-relaxed">{d.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== 実績（各局・各社とのつながり） ===== */}
        <section className="mx-auto max-w-6xl px-4 py-16 md:py-20">
          <div className="text-center mb-12">
            <span className="tc-eyebrow bg-white">WORKS</span>
            <h2 className="mt-4 text-2xl md:text-3xl font-black text-telecareer-ink tc-section-heading inline-block">
              これまで携わった主な現場
            </h2>
            <p className="mt-4 text-gray-600 font-medium">
              実績ある会社が運営。誰もが知るテレビ番組・ドラマ・大手CM・配信の現場とつながっています。
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {WORKS.map((w) => (
              <div key={w.network} className="tc-card-soft p-5">
                <h3 className="font-black text-telecareer-ink border-b-2 border-telecareer-orange/40 pb-2 mb-3">{w.network}</h3>
                <ul className="space-y-1.5">
                  {w.shows.map((s) => (
                    <li key={s} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-telecareer-orange shrink-0" />
                      <span>{s}</span>
                    </li>
                  ))}
                  <li className="text-xs text-gray-400 pt-1">ほか多数</li>
                </ul>
              </div>
            ))}
          </div>
          <p className="mt-6 text-xs text-gray-400 text-center max-w-3xl mx-auto">
            ※ 運営会社（株式会社フォーミュレーションI.T.S.）の配属実績の一部です。番組名は各放送局・制作会社の権利に帰属します。
          </p>
        </section>

        {/* ===== カテゴリ（こんな求人があります） ===== */}
        <section className="bg-white border-y-2 border-ink">
          <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-black text-telecareer-ink tc-section-heading inline-block">こんな求人があります</h2>
              <p className="mt-4 text-gray-600 font-medium">気になるカテゴリから、エンタメのお仕事を探してみましょう。</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
              {CATEGORIES.map((c) => (
                <Link key={c.name} href={`/jobs?category=${encodeURIComponent(c.name)}`} className="tc-card tc-card-hover p-6 flex flex-col items-center text-center">
                  <span className={`w-14 h-14 rounded-2xl border-2 border-ink flex items-center justify-center font-black text-ink text-lg ${c.ring}`}>{c.name.charAt(0)}</span>
                  <h3 className="mt-4 font-bold text-lg text-telecareer-ink">{c.name}</h3>
                  <p className="mt-1 text-sm text-gray-600 leading-relaxed">{c.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ===== 使い方 ===== */}
        <section className="mx-auto max-w-6xl px-4 py-16 md:py-20">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-black text-telecareer-ink tc-section-heading inline-block">ご利用の流れ</h2>
            <p className="mt-4 text-gray-600 font-medium">初めての方でも、3ステップでかんたん。</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {SEEKER_STEPS.map((s) => (
              <div key={s.no} className="tc-card tc-card-hover p-7 flex flex-col items-center text-center">
                <span className="tag-pill tag-plain">STEP {s.no}</span>
                <h3 className="mt-3 text-xl font-bold text-telecareer-ink">{s.title}</h3>
                <p className="mt-2 text-gray-600 leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ===== 新卒採用バナー ===== */}
        <section className="mx-auto max-w-6xl px-4 pb-4">
          <a
            href="https://www.f-its.co.jp/recruit/"
            target="_blank"
            rel="noopener noreferrer"
            className="tc-card tc-card-hover p-6 md:p-7 flex flex-col sm:flex-row items-center justify-between gap-4 bg-telecareer-yellow/15"
          >
            <div className="text-center sm:text-left">
              <h3 className="text-lg md:text-xl font-black text-telecareer-ink">新卒採用の方はこちら</h3>
              <p className="mt-1 text-sm text-gray-600">株式会社フォーミュレーションI.T.S. の新卒採用ページをご覧いただけます。</p>
            </div>
            <span className="btn-outline-coral px-6 py-3 font-bold whitespace-nowrap">採用ページへ ↗</span>
          </a>
        </section>

        {/* ===== お問い合わせ / 会員登録 CTA ===== */}
        <section className="mx-auto max-w-6xl px-4 py-16 md:py-24">
          <div className="tc-card bg-telecareer-hero border-ink p-10 md:p-14 text-center relative overflow-hidden">
            <h2 className="text-2xl md:text-4xl font-black text-telecareer-ink relative">
              まずは、気軽に一歩を。
            </h2>
            <p className="mt-4 text-gray-700 font-medium relative">
              会員登録は無料。未経験から挑戦できる求人もたくさんあります。ご相談だけでも歓迎です。
            </p>
            <div className="mt-8 flex flex-wrap gap-4 justify-center relative">
              <Link href="/signup" className="btn-cta px-8 py-3.5 font-bold text-base">無料で会員登録 →</Link>
              <Link href="/contact" className="btn-outline-coral px-8 py-3.5 font-bold text-base">お問い合わせ</Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
