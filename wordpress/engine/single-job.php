<?php
/**
 * 求人詳細 /jobs/{slug}（Next.js 版 src/app/jobs/[id]/page.tsx を移植）。
 * ログイン中は応募フォームを表示（送信は engine-members プラグインが処理）。
 */
if (!defined('ABSPATH')) {
    exit;
}
get_header();

while (have_posts()) :
    the_post();
    $job = engine_map_job(get_post());
    $deadline = engine_format_deadline($job['deadline']);
    $logged_in = is_user_logged_in();
    $current_user = $logged_in ? wp_get_current_user() : null;
    $applied = isset($_GET['applied']) && $_GET['applied'] === '1';
    $apply_error = isset($_GET['apply_error']) ? sanitize_text_field(wp_unslash($_GET['apply_error'])) : '';

    // 登録済みプロフィールから応募フォームの初期値を用意（自動入力）
    $pf_name = '';
    $pf_email = '';
    $pf_phone = '';
    $pf_age = '';
    if ($logged_in) {
        $uid = $current_user->ID;
        $pf_name  = get_user_meta($uid, 'contact_name', true);
        if ($pf_name === '') {
            $pf_name = $current_user->display_name;
        }
        $pf_email = $current_user->user_email;
        $pf_phone = get_user_meta($uid, 'phone', true);
        $birthdate = get_user_meta($uid, 'birthdate', true);
        if ($birthdate) {
            $ts = strtotime($birthdate);
            if ($ts !== false) {
                $pf_age = (string) max(0, (int) ((time() - $ts) / (365.25 * 24 * 60 * 60)));
            }
        }
    }
?>

<main class="mx-auto max-w-3xl px-4 py-8 flex-1">
    <a href="<?php echo esc_url(home_url('/jobs')); ?>" class="text-sm link-accent mb-5 inline-block">← 案件一覧へ</a>

    <article class="tc-card p-6 md:p-8">
        <div class="flex flex-wrap items-center gap-2">
            <?php if (!empty($job['job_type'])) : ?>
                <span class="rounded-full px-3 py-0.5 text-xs font-bold <?php echo esc_attr(engine_job_type_class($job['job_type'])); ?>"><?php echo esc_html($job['job_type']); ?></span>
            <?php endif; ?>
            <span class="tag-pill <?php echo esc_attr(engine_category_class($job['category'])); ?>"><?php echo esc_html($job['category']); ?></span>
        </div>
        <h1 class="mt-3 text-2xl md:text-3xl font-black text-telecareer-ink"><?php echo esc_html($job['title']); ?></h1>

        <dl class="mt-6 grid gap-4 sm:grid-cols-2">
            <?php if (!empty($job['location'])) : ?>
                <div><dt class="text-sm text-gray-500">勤務地</dt><dd class="font-semibold text-ink"><?php echo esc_html($job['location']); ?></dd></div>
            <?php endif; ?>
            <?php if (!empty($job['pay'])) : ?>
                <div><dt class="text-sm text-gray-500">報酬・給与</dt><dd class="font-semibold text-ink"><?php echo esc_html($job['pay']); ?></dd></div>
            <?php endif; ?>
            <?php if (!empty($job['work_period'])) : ?>
                <div><dt class="text-sm text-gray-500">期間・雇用形態</dt><dd class="font-semibold text-ink"><?php echo esc_html($job['work_period']); ?></dd></div>
            <?php endif; ?>
            <?php if ($job['headcount'] !== null) : ?>
                <div><dt class="text-sm text-gray-500">募集人数</dt><dd class="font-semibold text-ink"><?php echo esc_html($job['headcount']); ?>名</dd></div>
            <?php endif; ?>
            <?php if ($deadline) : ?>
                <div><dt class="text-sm text-gray-500">応募締切</dt><dd class="font-semibold text-ink"><?php echo esc_html($deadline); ?></dd></div>
            <?php endif; ?>
        </dl>

        <?php if (!empty($job['body'])) : ?>
            <div class="mt-6 border-t-2 border-dashed border-ink/15 pt-6">
                <h2 class="text-sm text-gray-500 mb-2">募集内容</h2>
                <p class="whitespace-pre-wrap leading-relaxed text-ink"><?php echo esc_html($job['body']); ?></p>
            </div>
        <?php endif; ?>

        <?php if (!empty($job['tags'])) : ?>
            <div class="mt-6 flex flex-wrap gap-1.5">
                <?php foreach ($job['tags'] as $t) : ?>
                    <span class="tag-pill tag-plain">#<?php echo esc_html($t); ?></span>
                <?php endforeach; ?>
            </div>
        <?php endif; ?>

        <div class="mt-8 border-t-2 border-dashed border-ink/15 pt-6">
            <?php if ($applied) : ?>
                <div class="tc-card-soft p-5 text-center">
                    <p class="font-black text-telecareer-ink text-lg mb-1">応募を受け付けました</p>
                    <p class="text-sm text-gray-600">「<?php echo esc_html($job['title']); ?>」へのご応募ありがとうございます。担当者より追ってご連絡いたします。</p>
                </div>
            <?php elseif ($logged_in) : ?>
                <h2 class="font-black text-xl mb-1 text-telecareer-ink">応募フォーム</h2>
                <p class="text-sm text-gray-600 mb-4"><span class="tc-marker"><?php echo esc_html($job['title']); ?></span></p>
                <?php if ($apply_error) : ?>
                    <div class="text-coral-a11y text-sm bg-telecareer-coral/10 p-3 rounded-xl border-2 border-telecareer-coral mb-4">年齢・住所・電話番号・性別・氏名はすべて必須です。</div>
                <?php endif; ?>
                <p class="text-xs text-gray-500 mb-4">会員情報をもとに一部の項目を自動入力しています。内容をご確認のうえ、必要に応じて修正してください。</p>
                <form method="post" action="<?php echo esc_url(admin_url('admin-post.php')); ?>" class="space-y-4">
                    <input type="hidden" name="action" value="engine_apply" />
                    <input type="hidden" name="job_id" value="<?php echo esc_attr($job['id']); ?>" />
                    <?php wp_nonce_field('engine_apply', 'engine_apply_nonce'); ?>
                    <div>
                        <label class="tc-label">氏名 *</label>
                        <input type="text" name="applicant_name" required value="<?php echo esc_attr($pf_name); ?>" class="tc-input" />
                    </div>
                    <div>
                        <label class="tc-label">メールアドレス *</label>
                        <input type="email" name="email" required value="<?php echo esc_attr($pf_email); ?>" class="tc-input" />
                    </div>
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="tc-label">年齢 *</label>
                            <input type="number" name="age" min="0" required value="<?php echo esc_attr($pf_age); ?>" class="tc-input" />
                        </div>
                        <div>
                            <label class="tc-label">性別 *</label>
                            <select name="gender" required class="tc-input">
                                <option value="">選択してください</option>
                                <?php foreach (engine_gender_options() as $g) : ?>
                                    <option value="<?php echo esc_attr($g); ?>"><?php echo esc_html($g); ?></option>
                                <?php endforeach; ?>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label class="tc-label">住所 *</label>
                        <input type="text" name="address" required class="tc-input" placeholder="例: 東京都新宿区..." />
                    </div>
                    <div>
                        <label class="tc-label">電話番号 *</label>
                        <input type="tel" name="phone" required value="<?php echo esc_attr($pf_phone); ?>" class="tc-input" placeholder="例: 090-1234-5678" />
                    </div>
                    <div>
                        <label class="tc-label">メッセージ（任意）</label>
                        <textarea name="message" rows="3" class="tc-input" placeholder="自己PR・経験・希望条件など"></textarea>
                    </div>
                    <div class="pt-1">
                        <button type="submit" class="btn-cta px-6 py-2.5 font-bold">この案件に応募する</button>
                    </div>
                </form>
            <?php else : ?>
                <p class="text-sm text-gray-700">
                    応募するには
                    <a href="<?php echo esc_url(home_url('/login')); ?>" class="link-accent mx-1">ログイン</a>
                    または
                    <a href="<?php echo esc_url(home_url('/signup')); ?>" class="link-accent mx-1">会員登録</a>
                    してください。
                </p>
            <?php endif; ?>
        </div>
    </article>
</main>

<?php
endwhile;
get_footer();
