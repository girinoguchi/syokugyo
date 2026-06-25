<?php
/**
 * Template Name: マイページ（エンジン）
 * 会員の専用ダッシュボード。プロフィールとおすすめ求人を表示。
 */
if (!defined('ABSPATH')) {
    exit;
}

if (!is_user_logged_in()) {
    wp_safe_redirect(add_query_arg('notice', 'login_required', home_url('/login')));
    exit;
}

get_header();

$user = wp_get_current_user();
$uid  = $user->ID;
$name = get_user_meta($uid, 'contact_name', true);
if ($name === '') {
    $name = $user->display_name;
}
$user_type = get_user_meta($uid, 'user_type', true);
$cats = get_user_meta($uid, 'interested_categories', true);
$cats = is_array($cats) ? array_values(array_filter($cats)) : array();

$recommended = engine_get_recommended_jobs($uid, 6);
$is_recommended = !empty($recommended);
if (!$is_recommended) {
    // 希望カテゴリ未登録時は新着求人を案内
    $recommended = array_slice(engine_all_jobs(), 0, 6);
}
?>
<main class="mx-auto max-w-6xl px-4 py-10 flex-1 w-full">
    <span class="tc-eyebrow bg-white">MY PAGE</span>
    <h1 class="mt-4 text-3xl font-black text-telecareer-ink mb-6"><span class="tc-marker"><?php echo esc_html($name); ?></span> さんのマイページ</h1>

    <section class="tc-card p-6 md:p-7 mb-10">
        <h2 class="font-black text-lg text-telecareer-ink mb-4">登録情報</h2>
        <dl class="grid gap-4 sm:grid-cols-2">
            <div><dt class="text-sm text-gray-500">お名前</dt><dd class="font-semibold text-ink"><?php echo esc_html($name); ?></dd></div>
            <div><dt class="text-sm text-gray-500">メールアドレス</dt><dd class="font-semibold text-ink"><?php echo esc_html($user->user_email); ?></dd></div>
            <?php if ($user_type) : ?>
                <div><dt class="text-sm text-gray-500">区分</dt><dd class="font-semibold text-ink"><?php echo esc_html($user_type); ?></dd></div>
            <?php endif; ?>
            <div>
                <dt class="text-sm text-gray-500">興味のある職種</dt>
                <dd class="font-semibold text-ink">
                    <?php if (!empty($cats)) : ?>
                        <div class="flex flex-wrap gap-1.5 mt-1">
                            <?php foreach ($cats as $c) : ?>
                                <span class="tag-pill tag-plain text-xs"><?php echo esc_html($c); ?></span>
                            <?php endforeach; ?>
                        </div>
                    <?php else : ?>
                        <span class="text-gray-400 text-sm">未設定</span>
                    <?php endif; ?>
                </dd>
            </div>
        </dl>
    </section>

    <section>
        <h2 class="font-black text-xl text-telecareer-ink mb-4">
            <?php echo $is_recommended ? 'あなたへのおすすめ求人' : '新着の求人'; ?>
        </h2>
        <?php if (empty($recommended)) : ?>
            <div class="tc-card p-8 text-center">
                <p class="text-gray-600 text-sm">現在ご紹介できる求人がありません。新しい求人が入り次第ご案内します。</p>
            </div>
        <?php else : ?>
            <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                <?php foreach ($recommended as $job) : ?>
                    <?php get_template_part('template-parts/job-card', null, array('job' => $job)); ?>
                <?php endforeach; ?>
            </div>
        <?php endif; ?>
        <div class="mt-8 text-center">
            <a href="<?php echo esc_url(home_url('/jobs')); ?>" class="btn-cta btn-flashy px-8 py-3.5 font-bold">すべての求人を見る →</a>
        </div>
    </section>

    <section class="mt-12" id="contact">
        <h2 class="font-black text-xl text-telecareer-ink mb-2">お問い合わせ</h2>
        <p class="text-sm text-gray-600 mb-4">サービスやお仕事に関するご質問・ご相談はこちらから。担当よりご連絡いたします。</p>
        <div class="tc-card p-6 md:p-7 cf7-wrap">
            <?php
            $cf7_id = (int) get_option('engine_cf7_form_id', 0);
            if ($cf7_id && shortcode_exists('contact-form-7')) {
                echo do_shortcode('[contact-form-7 id="' . $cf7_id . '"]');
            } else {
                echo '<p class="text-sm text-gray-500">お問い合わせフォームは現在準備中です。</p>';
            }
            ?>
        </div>
    </section>
</main>
<?php
get_footer();
