import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "利用規約 | エンジン（株式会社フォーミュレーションI.T.S.）",
  description:
    "エンタメ業界専門求人サービス「エンジン」の利用規約です。会員登録・サービス利用にあたっての条件、禁止事項、知的財産権、連絡に関する取り扱いなどを定めています。",
};

const SECTIONS: { heading: string; body: React.ReactNode }[] = [
  {
    heading: "第1条（本規約の適用）",
    body: (
      <>
        <p>
          本利用規約（以下「本規約」といいます。）は、株式会社フォーミュレーションI.T.S.（以下「当社」といいます。）が運営するエンタメ業界専門求人サービス「エンジン」（以下「本サービス」といいます。）の提供条件および当社と利用者との間の権利義務関係を定めるものです。
        </p>
        <p>
          利用者は、本規約に同意のうえ本サービスを利用するものとし、本サービスを利用した時点で本規約のすべての内容に同意したものとみなします。
        </p>
      </>
    ),
  },
  {
    heading: "第2条（定義）",
    body: (
      <ul>
        <li>
          「本サービス」とは、当社が提供するエンタメ業界向けの求人情報の掲載・紹介、会員情報の登録・管理、その他関連する一切のサービスをいいます。
        </li>
        <li>
          「利用者」とは、本規約に同意のうえ本サービスを利用するすべての方をいいます。
        </li>
        <li>
          「会員」とは、本サービスの会員登録手続きを完了した利用者をいいます。
        </li>
        <li>
          「登録情報」とは、会員が本サービスに登録した氏名・連絡先・経歴その他一切の情報をいいます。
        </li>
        <li>
          「コンテンツ」とは、本サービス上で提供される求人情報、文章、画像、ロゴ、動画、プログラム、デザインその他一切の情報をいいます。
        </li>
      </ul>
    ),
  },
  {
    heading: "第3条（会員登録）",
    body: (
      <>
        <ul>
          <li>
            会員登録を希望する方は、本規約に同意のうえ、当社所定の方法により正確かつ最新の情報を登録するものとします。
          </li>
          <li>
            登録は原則として満15歳以上の方を対象とします。未成年者が登録する場合は、親権者など法定代理人の同意を得たうえで行うものとします。
          </li>
          <li>
            登録情報に虚偽・誤記・記載漏れがあった場合に利用者が被った不利益について、当社は一切の責任を負いません。
          </li>
          <li>
            会員は、登録情報に変更が生じた場合、速やかに当社所定の方法により変更手続きを行うものとします。
          </li>
        </ul>
      </>
    ),
  },
  {
    heading: "第4条（ご連絡・キャリアサポートについて）",
    body: (
      <>
        <p>
          会員は、本サービスへの登録をもって、当社およびキャリアアドバイザー（キャリアマネージャー）が、求人紹介・キャリア相談・各種お知らせ等を目的として、登録された電話番号・メールアドレス等の連絡先へ連絡することにあらかじめ同意するものとします。
        </p>
        <ul>
          <li>
            連絡の手段には、電話・SMS・電子メール・その他当社が適切と判断する方法を含みます。
          </li>
          <li>
            当社からの連絡には、求人のご紹介、面談・面接の調整、応募状況のご確認、各種重要なお知らせが含まれます。
          </li>
          <li>
            会員は、メールマガジン等の任意のお知らせについて、いつでも配信停止を申し出ることができます。ただし、サービス運営上必要な連絡（応募手続きに関する連絡等）は、退会まで停止できない場合があります。
          </li>
        </ul>
      </>
    ),
  },
  {
    heading: "第5条（個人情報の取扱い）",
    body: (
      <p>
        当社は、登録情報を含む個人情報を、別途定める
        <Link href="/privacy" className="link-accent">
          プライバシーポリシー
        </Link>
        に従って適切に取り扱います。当社は、求人紹介・人材紹介・人材派遣の目的の範囲内で、応募先・派遣先その他必要な第三者に対し、会員の同意の範囲内で登録情報を提供することがあります。
      </p>
    ),
  },
  {
    heading: "第6条（禁止事項）",
    body: (
      <>
        <p>利用者は、本サービスの利用にあたり、以下の行為を行ってはなりません。</p>
        <ul>
          <li>
            本サービスのコンテンツ（求人情報を含みます。）を、当社の事前の書面による承諾なく複製・転載・転用・再配布・販売・出版・公衆送信する行為
          </li>
          <li>
            本サービスで知り得た求人情報・連絡先・その他の情報を、第三者に開示・漏えいし、または本来の目的以外に利用する行為
          </li>
          <li>虚偽の情報を登録し、または他人になりすます行為</li>
          <li>当社・他の利用者・求人提供者その他第三者の権利・利益を侵害する行為</li>
          <li>法令または公序良俗に違反する行為</li>
          <li>本サービスの運営を妨害し、またはサーバー・ネットワークに過度の負荷をかける行為</li>
          <li>不正アクセス、リバースエンジニアリング、その他不正な手段で本サービスを利用する行為</li>
          <li>その他、当社が不適切と合理的に判断する行為</li>
        </ul>
      </>
    ),
  },
  {
    heading: "第7条（知的財産権・無断転載の禁止）",
    body: (
      <>
        <p>
          本サービスおよびコンテンツに関する著作権・商標権その他一切の知的財産権は、当社または正当な権利を有する第三者に帰属します。
        </p>
        <div className="rounded-2xl border-2 border-telecareer-coral bg-telecareer-coral/10 p-5 not-prose">
          <p className="font-bold text-telecareer-ink">無断転載・無断利用に関する措置</p>
          <p className="mt-2 text-sm text-gray-700 leading-relaxed">
            当社の事前の書面による承諾なくコンテンツを複製・転載・転用した場合、当社は当該行為の差止め、アカウントの停止・削除、ならびにこれによって生じた損害（逸失利益・調査費用・弁護士費用を含みます。）の賠償を請求できるものとします。悪質な場合には、著作権法その他関係法令に基づき民事上・刑事上の法的措置を講じることがあります。
          </p>
        </div>
      </>
    ),
  },
  {
    heading: "第8条（利用停止・登録抹消）",
    body: (
      <p>
        当社は、会員が本規約に違反した場合、または当社が本サービスの提供を不適当と判断した場合、事前の通知なく当該会員による本サービスの利用を停止し、または会員登録を抹消することができます。これによって会員に生じた損害について、当社は一切の責任を負いません。
      </p>
    ),
  },
  {
    heading: "第9条（免責事項）",
    body: (
      <ul>
        <li>
          当社は、本サービスに掲載する求人情報の正確性・完全性・最新性・有用性、および応募・採用の結果について保証するものではありません。
        </li>
        <li>
          会員と求人提供者・派遣先・応募先との間で生じた紛争については、当事者間で解決するものとし、当社は一切の責任を負いません（ただし、当社の故意または重過失による場合を除きます。）。
        </li>
        <li>
          天災地変、通信回線の障害、システムの保守・障害等により本サービスの提供が中断・停止した場合でも、当社はこれによって生じた損害について責任を負いません。
        </li>
      </ul>
    ),
  },
  {
    heading: "第10条（サービスの変更・中断・終了）",
    body: (
      <p>
        当社は、利用者への事前の通知なく、本サービスの内容を変更し、または提供を中断・終了することができます。これによって利用者に生じた損害について、当社は一切の責任を負いません。
      </p>
    ),
  },
  {
    heading: "第11条（退会）",
    body: (
      <p>
        会員は、当社所定の方法によりいつでも退会することができます。退会後の登録情報の取扱いについては、プライバシーポリシーおよび関係法令に従います。
      </p>
    ),
  },
  {
    heading: "第12条（本規約の変更）",
    body: (
      <p>
        当社は、必要と判断した場合には、利用者に通知することなく本規約を変更することができます。変更後の本規約は、本サービス上に掲載した時点から効力を生じるものとし、変更後に利用者が本サービスを利用した場合、変更後の本規約に同意したものとみなします。
      </p>
    ),
  },
  {
    heading: "第13条（準拠法・管轄裁判所）",
    body: (
      <p>
        本規約の解釈および適用は日本法に準拠します。本サービスに関して当社と利用者との間で紛争が生じた場合には、当社の本店所在地を管轄する地方裁判所を第一審の専属的合意管轄裁判所とします。
      </p>
    ),
  },
];

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-telecareer-surface overflow-x-hidden">
      <Header />
      <main className="mx-auto max-w-3xl px-4 py-14 flex-1 w-full min-w-0 tc-page-enter">
        <span className="tc-eyebrow bg-white">TERMS OF SERVICE</span>
        <h1 className="mt-4 text-3xl font-black text-telecareer-ink mb-3">
          <span className="tc-marker">利用規約</span>
        </h1>
        <p className="text-sm text-gray-600 leading-relaxed mb-8">
          本規約は、株式会社フォーミュレーションI.T.S.が運営するエンタメ業界専門求人サービス「エンジン」の利用条件を定めるものです。会員登録の前に、必ず本規約をお読みください。
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

          <div className="border-t-2 border-dashed border-ink/15 pt-5 text-sm text-gray-600">
            <p className="font-bold text-telecareer-ink">運営者</p>
            <dl className="mt-2 space-y-1">
              <div>
                <dt className="inline text-gray-500">商号：</dt>
                <dd className="inline">株式会社フォーミュレーションI.T.S.</dd>
              </div>
              <div>
                <dt className="inline text-gray-500">所在地：</dt>
                <dd className="inline">東京都渋谷区東1-26-20 東京建物東渋谷ビル B1F</dd>
              </div>
              <div>
                <dt className="inline text-gray-500">事業内容：</dt>
                <dd className="inline">
                  人材派遣業／有料職業紹介業／テレビ番組などメディアの企画制作
                </dd>
              </div>
            </dl>
            <p className="mt-4 text-xs text-gray-400">制定日：2024年1月1日</p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link href="/signup" className="btn-cta px-8 py-3.5 font-bold inline-block">
            同意して会員登録へ →
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
