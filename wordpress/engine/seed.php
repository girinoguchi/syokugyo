<?php
/**
 * 初期データ投入スクリプト（WP-CLI で実行）。
 *   npx @wordpress/env run cli wp eval-file wp-content/themes/engine/seed.php
 *
 * - 必要な固定ページを作成し、テンプレート（page-{slug}.php）に対応させる
 * - 静的トップページを設定
 * - 管理ユーザー（noguchi / noguchi）を用意
 * - 実在の求人（AD募集）を投入（制作会社名は管理者のみ参照のメタに保持）
 * すべて存在チェック付きなので、再実行しても重複しない。
 */

if (!defined('ABSPATH')) {
    exit;
}

/** 固定ページを作成（slug が page-{slug}.php テンプレートに対応） */
function engine_seed_page($title, $slug) {
    $existing = get_page_by_path($slug);
    if ($existing) {
        return $existing->ID;
    }
    $id = wp_insert_post(array(
        'post_type'    => 'page',
        'post_status'  => 'publish',
        'post_title'   => $title,
        'post_name'    => $slug,
        'post_content' => '',
    ));
    if (is_wp_error($id)) {
        return 0;
    }
    return $id;
}

/** トップページ（静的フロント）を作成・設定 */
$front_id = engine_seed_page('トップ', 'top');
if ($front_id) {
    update_option('show_on_front', 'page');
    update_option('page_on_front', $front_id);
}

// 各固定ページ（テンプレートは page-{slug}.php が自動適用される）
engine_seed_page('会員登録', 'signup');
engine_seed_page('ログイン', 'login');
engine_seed_page('マイページ', 'mypage');
engine_seed_page('お問い合わせ', 'contact');
engine_seed_page('プライバシーポリシー', 'privacy');
engine_seed_page('利用規約', 'terms');

// 広告用LP（テンプレート名で割り当て）
$lp_id = engine_seed_page('広告用LP（エンタメ）', 'lp-entame');
if ($lp_id) {
    update_post_meta($lp_id, '_wp_page_template', 'page-lp-entame.php');
}

/** 管理ユーザー noguchi / noguchi */
if (!username_exists('noguchi')) {
    $uid = wp_create_user('noguchi', 'noguchi', 'noguchi@example.com');
    if (!is_wp_error($uid)) {
        $u = new WP_User($uid);
        $u->set_role('administrator');
    }
}

/** 求人を投入（存在チェック付き） */
function engine_seed_job($title, $meta, $content) {
    $found = get_posts(array(
        'post_type'      => 'job',
        'post_status'    => 'any',
        'title'          => $title,
        'posts_per_page' => 1,
        'fields'         => 'ids',
    ));
    if (!empty($found)) {
        return $found[0];
    }
    $id = wp_insert_post(array(
        'post_type'    => 'job',
        'post_status'  => 'publish',
        'post_title'   => $title,
        'post_content' => $content,
    ));
    if (is_wp_error($id)) {
        return 0;
    }
    foreach ($meta as $k => $v) {
        update_post_meta($id, $k, $v);
    }
    update_post_meta($id, 'is_active', '1');
    return $id;
}

// ① TBS「櫻井・有吉 THE夜会」AD募集（未経験OK／制作会社は非公開メタ）
engine_seed_job(
    'TBS「櫻井・有吉 THE夜会」AD募集（未経験OK）',
    array(
        'category'      => '制作・AD',
        'job_type'      => '中長期案件',
        'location'      => '東京都',
        'pay'           => '月給22万円〜（経験・能力により優遇）',
        'pay_type'      => '月給',
        'wage_min'      => '',
        'work_period'   => '中長期（社員・契約）',
        'headcount'     => '2',
        'deadline'      => '',
        'tags'          => '未経験歓迎 AD 制作 バラエティ',
        'company_internal' => 'ファットトランク', // 管理者のみ参照（非公開）
    ),
    "人気バラエティ番組のAD（アシスタントディレクター）を募集します。\n未経験OK。先輩スタッフがしっかりサポートします。\n\n【制作会社】非公開\n【仕事内容】番組制作のアシスタント業務全般（リサーチ、ロケ準備、編集補助 など）"
);

// ② NTV「サクサクヒムヒム」／TBS「ラヴィット！」AD募集（未経験OK／制作会社は非公開メタ）
engine_seed_job(
    'NTV「サクサクヒムヒム」・TBS「ラヴィット！」AD募集（未経験OK）',
    array(
        'category'      => '制作・AD',
        'job_type'      => '中長期案件',
        'location'      => '東京都',
        'pay'           => '月給22万円〜（経験・能力により優遇）',
        'pay_type'      => '月給',
        'wage_min'      => '',
        'work_period'   => '中長期（社員・契約）',
        'headcount'     => '2',
        'deadline'      => '',
        'tags'          => '未経験歓迎 AD 制作 朝番組 バラエティ',
        'company_internal' => 'デージカンパニー', // 管理者のみ参照（非公開）
    ),
    "朝の情報・バラエティ番組のAD（アシスタントディレクター）を募集します。\n未経験OK。エンタメ業界デビューを応援します。\n\n【制作会社】非公開\n【仕事内容】番組制作のアシスタント業務全般（リサーチ、ロケ準備、編集補助 など）"
);

WP_CLI::success('エンジン: 初期データの投入が完了しました。');
