<?php
/**
 * Template Name: お問い合わせ（エンジン）
 * お問い合わせフォーム。送信は engine_contact が処理し、inquiry CPT に保存。
 */
if (!defined('ABSPATH')) {
    exit;
}
get_header();

$sent  = isset($_GET['sent']) && $_GET['sent'] === '1';
$flash = engine_flash_from_query();

$cu = is_user_logged_in() ? wp_get_current_user() : null;
$pf_name  = $cu ? (get_user_meta($cu->ID, 'contact_name', true) ?: $cu->display_name) : '';
$pf_email = $cu ? $cu->user_email : '';
$pf_phone = $cu ? get_user_meta($cu->ID, 'phone', true) : '';
?>
<main class="mx-auto max-w-2xl px-4 py-14 flex-1 w-full">
    <span class="tc-eyebrow bg-white">CONTACT</span>
    <h1 class="mt-4 text-3xl font-black text-telecareer-ink mb-3"><span class="tc-marker">お問い合わせ</span></h1>
    <p class="text-gray-600 mb-8 text-sm leading-relaxed">
        サービスやお仕事に関するご質問・ご相談はこちらから。未経験の方のキャリア相談も歓迎です。<br />
        担当のキャリアマネージャーより追ってご連絡いたします。
    </p>

    <?php if ($sent) : ?>
        <div class="tc-card p-8 text-center">
            <p class="font-black text-telecareer-ink text-lg mb-1">お問い合わせを受け付けました</p>
            <p class="text-sm text-gray-600">内容を確認のうえ、担当者よりご連絡いたします。ありがとうございました。</p>
            <a href="<?php echo esc_url(home_url('/')); ?>" class="link-accent inline-block mt-4">トップへ戻る →</a>
        </div>
    <?php else : ?>
        <form method="post" action="<?php echo esc_url(admin_url('admin-post.php')); ?>" class="space-y-4 tc-card p-6 md:p-7">
            <input type="hidden" name="action" value="engine_contact" />
            <?php wp_nonce_field('engine_contact', 'engine_contact_nonce'); ?>
            <?php if (!empty($flash['error'])) : ?>
                <div class="text-coral-a11y text-sm bg-telecareer-coral/10 p-4 rounded-xl border-2 border-telecareer-coral"><?php echo esc_html($flash['error']); ?></div>
            <?php endif; ?>
            <div>
                <label class="tc-label">お名前 *</label>
                <input type="text" name="contact_name" required value="<?php echo esc_attr($pf_name); ?>" class="tc-input" />
            </div>
            <div>
                <label class="tc-label">メールアドレス *</label>
                <input type="email" name="email" required value="<?php echo esc_attr($pf_email); ?>" class="tc-input" />
            </div>
            <div>
                <label class="tc-label">電話番号（任意）</label>
                <input type="tel" name="phone" value="<?php echo esc_attr($pf_phone); ?>" class="tc-input" placeholder="例: 090-1234-5678" />
            </div>
            <div>
                <label class="tc-label">お問い合わせ内容 *</label>
                <textarea name="message" rows="5" required class="tc-input" placeholder="ご質問・ご相談内容をご記入ください"></textarea>
            </div>
            <p class="text-xs text-gray-500 leading-relaxed">
                送信をもって<a href="<?php echo esc_url(home_url('/privacy')); ?>" class="link-accent">プライバシーポリシー</a>に同意したものとみなします。
            </p>
            <button type="submit" class="w-full btn-cta py-3 font-bold">送信する</button>
        </form>
    <?php endif; ?>
</main>
<?php
get_footer();
