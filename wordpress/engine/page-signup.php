<?php
/**
 * Template Name: 会員登録（エンジン）
 * 会員登録ページ（Next.js 版 src/app/signup/page.tsx を移植）。送信は engine_signup が処理。
 */
if (!defined('ABSPATH')) {
    exit;
}

// ログイン済みならマイページへ
if (is_user_logged_in()) {
    wp_safe_redirect(home_url('/mypage'));
    exit;
}

get_header();
$flash = engine_flash_from_query();
?>
<main class="mx-auto max-w-md px-4 py-14 flex-1 w-full">
    <span class="tc-eyebrow bg-white">SIGN UP</span>
    <h1 class="mt-4 text-3xl font-black text-telecareer-ink mb-6"><span class="tc-marker">会員登録</span></h1>

    <form method="post" action="<?php echo esc_url(admin_url('admin-post.php')); ?>" class="space-y-4 tc-card p-6 md:p-7">
        <input type="hidden" name="action" value="engine_signup" />
        <?php if (!empty($flash['error'])) : ?>
            <div class="text-coral-a11y text-sm bg-telecareer-coral/10 p-4 rounded-xl border-2 border-telecareer-coral"><?php echo esc_html($flash['error']); ?></div>
        <?php endif; ?>

        <div>
            <label class="tc-label">お名前 *</label>
            <input type="text" name="contact_name" required class="tc-input" placeholder="例: 山田 太郎" />
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
                <label class="tc-label">生年月日</label>
                <input type="date" name="birthdate" class="tc-input" />
            </div>
            <div>
                <label class="tc-label">電話番号</label>
                <input type="tel" name="phone" class="tc-input" placeholder="例: 090-1234-5678" />
            </div>
        </div>
        <div>
            <label class="tc-label">メールアドレス *</label>
            <input type="email" name="email" required class="tc-input" />
        </div>
        <div>
            <label class="tc-label">パスワード *</label>
            <input type="password" name="password" required minlength="6" class="tc-input" placeholder="6文字以上" />
        </div>

        <div>
            <label class="tc-label mb-2">あてはまるものを選択してください</label>
            <div class="flex flex-wrap gap-3">
                <?php foreach (engine_user_type_options() as $t) : ?>
                    <label class="tag-pill tag-plain cursor-pointer">
                        <input type="radio" name="user_type" value="<?php echo esc_attr($t); ?>" class="mr-1.5 accent-telecareer-green" />
                        <?php echo esc_html($t); ?>
                    </label>
                <?php endforeach; ?>
            </div>
        </div>

        <div>
            <label class="tc-label mb-1">どんな案件をお探しですか？（任意・複数可）</label>
            <p class="text-xs text-gray-500 mb-2">選んでおくと、ログイン後におすすめの求人をご案内します。</p>
            <div class="flex flex-wrap gap-3">
                <?php foreach (engine_job_category_options() as $c) : ?>
                    <label class="tag-pill tag-plain cursor-pointer">
                        <input type="checkbox" name="interested_categories[]" value="<?php echo esc_attr($c); ?>" class="mr-1.5 accent-telecareer-orange" />
                        <?php echo esc_html($c); ?>
                    </label>
                <?php endforeach; ?>
            </div>
        </div>

        <div class="border-t-2 border-dashed border-ink/15 pt-4 space-y-3">
            <label class="flex items-start gap-2.5 cursor-pointer">
                <input type="checkbox" name="newsletter_opt_in" value="1" checked class="w-4 h-4 mt-0.5 accent-telecareer-orange shrink-0" />
                <span class="text-sm text-gray-700">今後、案件や求人情報などのお知らせを受け取る（不要な場合はチェックを外してください）</span>
            </label>
            <p class="text-xs text-gray-500 leading-relaxed">
                ご登録後、担当のキャリアマネージャーよりご連絡を差し上げる場合があります。<br />
                ご登録をもって<a href="<?php echo esc_url(home_url('/terms')); ?>" class="link-accent">利用規約</a>および<a href="<?php echo esc_url(home_url('/privacy')); ?>" class="link-accent">プライバシーポリシー</a>に同意したものとみなします。
            </p>
        </div>

        <button type="submit" class="w-full btn-cta py-3 font-bold">会員登録</button>
    </form>
    <p class="mt-5 text-center text-sm text-gray-600">
        <a href="<?php echo esc_url(home_url('/login')); ?>" class="link-accent">すでにアカウントをお持ちの方はログイン →</a>
    </p>
</main>
<?php
get_footer();
