import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "プライバシーポリシー | エンジン（株式会社フォーミュレーションI.T.S.）",
  description:
    "エンタメ業界専門求人サービス「エンジン」における個人情報の取り扱い方針です。取得する情報、利用目的、第三者提供、開示請求への対応などを定めています。",
};

const SECTIONS: { heading: string; body: React.ReactNode }[] = [
  {
    heading: "1. 事業者情報",
    body: (
      <ul>
        <li>商号：株式会社フォーミュレーションI.T.S.</li>
        <li>所在地：東京都渋谷区東1-26-20 東京建物東渋谷ビル B1F</li>
        <li>事業内容：人材派遣業／有料職業紹介業／テレビ番組などメディアの企画制作</li>
      </ul>
    ),
  },
  {
    heading: "2. 取得する個人情報",
    body: (
      <p>
        当社は、本サービスの提供にあたり、氏名・生年月日・電話番号・メールアドレス・経歴・希望条件等の個人情報を、会員ご本人の入力により取得します。また、本サービスの利用状況に関する情報（アクセスログ、Cookie 等）を取得する場合があります。
      </p>
    ),
  },
  {
    heading: "3. 利用目的",
    body: (
      <ul>
        <li>会員登録の受付および本人確認のため</li>
        <li>求人情報のご紹介、キャリア相談・面談・面接の調整のため</li>
        <li>応募手続きの代行・連絡・進捗管理のため</li>
        <li>人材派遣・有料職業紹介に関する業務遂行のため</li>
        <li>本サービスに関する各種お知らせ・ご案内の送付のため</li>
        <li>お問い合わせ・ご相談への対応のため</li>
        <li>本サービスの改善・新サービスの開発のため</li>
      </ul>
    ),
  },
  {
    heading: "4. 第三者提供",
    body: (
      <p>
        当社は、求人紹介・人材紹介・人材派遣の目的を達成するために必要な範囲で、応募先・派遣先その他の第三者に対し、会員の同意の範囲内で個人情報を提供することがあります。これらの場合を除き、法令に基づく場合を除いて、あらかじめ本人の同意を得ることなく個人情報を第三者に提供しません。
      </p>
    ),
  },
  {
    heading: "5. 連絡・通知について",
    body: (
      <p>
        会員は、本サービスへの登録をもって、当社およびキャリアアドバイザーが、登録された連絡先（電話・SMS・メール等）へ求人紹介・キャリアサポート・各種お知らせを目的として連絡することに同意するものとします。任意のお知らせ（メールマガジン等）はいつでも配信停止が可能です。
      </p>
    ),
  },
  {
    heading: "6. 安全管理措置",
    body: (
      <p>
        当社は、個人情報の漏えい・滅失・毀損を防止するため、必要かつ適切な安全管理措置を講じ、従業者および委託先に対して必要な監督を行います。
      </p>
    ),
  },
  {
    heading: "7. 開示・訂正・削除の請求",
    body: (
      <p>
        会員は、当社が保有する自己の個人情報について、開示・訂正・追加・削除・利用停止を求めることができます。ご請求は
        <Link href="/contact" className="link-accent">
          お問い合わせ
        </Link>
        または担当キャリアアドバイザーまでご連絡ください。ご本人であることを確認のうえ、法令に従って速やかに対応します。
      </p>
    ),
  },
  {
    heading: "8. Cookie の利用",
    body: (
      <p>
        本サービスは、利便性向上およびアクセス解析のために Cookie を利用する場合があります。ブラウザの設定により Cookie を無効化できますが、一部機能がご利用いただけなくなる場合があります。
      </p>
    ),
  },
  {
    heading: "9. 本ポリシーの変更",
    body: (
      <p>
        当社は、法令の変更やサービス内容の変更に応じて、本ポリシーを改定することがあります。改定後の内容は、本サービス上に掲載した時点から効力を生じます。
      </p>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-telecareer-surface overflow-x-hidden">
      <Header />
      <main className="mx-auto max-w-3xl px-4 py-14 flex-1 w-full min-w-0 tc-page-enter">
        <span className="tc-eyebrow bg-white">PRIVACY POLICY</span>
        <h1 className="mt-4 text-3xl font-black text-telecareer-ink mb-3">
          <span className="tc-marker">プライバシーポリシー</span>
        </h1>
        <p className="text-sm text-gray-600 leading-relaxed mb-8">
          株式会社フォーミュレーションI.T.S.（以下「当社」といいます。）は、エンタメ業界専門求人サービス「エンジン」における個人情報を、以下の方針に基づき適切に取り扱います。
        </p>

        <div className="tc-card p-6 md:p-8 space-y-8">
          {SECTIONS.map((s) => (
            <section key={s.heading}>
              <h2 className="font-black text-telecareer-ink text-lg border-b-2 border-telecareer-orange/40 pb-2 mb-3">
                {s.heading}
              </h2>
              <div className="prose-legal text-sm text-gray-700 leading-relaxed space-y-3">
                {s.body}
              </div>
            </section>
          ))}

          <div className="border-t-2 border-dashed border-ink/15 pt-5 text-xs text-gray-400">
            <p>制定日：2024年1月1日</p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link href="/terms" className="link-accent text-sm">
            利用規約を見る →
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
