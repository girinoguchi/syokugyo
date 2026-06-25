<?php
/**
 * Template Name: プライバシーポリシー（エンジン）
 * Next.js 版 src/app/privacy/page.tsx を移植。
 */
if (!defined('ABSPATH')) {
    exit;
}
get_header();

$sections = array(
    array('h' => '1. 個人情報の取得・利用目的', 'p' => '当サービス（エンジン）では、会員登録・お問い合わせ等を通じて、お名前・生年月日・電話番号・メールアドレス等の個人情報を取得します。これらは、求人・案件のご紹介、キャリアに関するご連絡・ご相談対応、サービス改善、各種お知らせの送付のために利用します。'),
    array('h' => '2. キャリアマネージャーからのご連絡', 'p' => 'ご登録いただいた連絡先には、担当のキャリアマネージャーより、求人のご紹介やキャリア相談に関するご連絡をさせていただく場合があります。'),
    array('h' => '3. お知らせの配信', 'p' => '案件・求人情報などのお知らせをお送りする場合があります。配信が不要な場合は、登録時の設定変更、または各お知らせ内の手続きにより停止できます。'),
    array('h' => '4. 第三者への提供', 'p' => '法令に基づく場合等を除き、ご本人の同意なく個人情報を第三者へ提供することはありません。求人紹介に伴い必要な範囲で提供する場合は、事前にご案内します。'),
    array('h' => '5. 個人情報の管理', 'p' => '取得した個人情報は、漏えい・滅失・毀損の防止に努め、適切に管理します。'),
    array('h' => '6. お問い合わせ・開示等の請求', 'p' => '個人情報の開示・訂正・利用停止等のご請求は、お問い合わせ窓口より承ります。'),
);
?>
<main class="mx-auto max-w-3xl px-4 py-14 flex-1 w-full">
    <span class="tc-eyebrow bg-white">PRIVACY POLICY</span>
    <h1 class="mt-4 text-3xl font-black text-telecareer-ink mb-3"><span class="tc-marker">プライバシーポリシー</span></h1>
    <p class="text-gray-600 mb-8 text-sm leading-relaxed">
        エンジン（運営：株式会社フォーミュレーションI.T.S.）は、利用者の個人情報を適切に取り扱います。
    </p>
    <div class="space-y-6">
        <?php foreach ($sections as $s) : ?>
            <section class="tc-card-soft p-5">
                <h2 class="font-bold text-telecareer-ink mb-2"><?php echo esc_html($s['h']); ?></h2>
                <p class="text-sm text-gray-700 leading-relaxed"><?php echo esc_html($s['p']); ?></p>
            </section>
        <?php endforeach; ?>
    </div>
    <p class="mt-8 text-xs text-gray-400">
        ※ 本ポリシーは概要です。正式な内容は運営会社の規定に準じます。内容は予告なく改定される場合があります。
    </p>
</main>
<?php
get_footer();
