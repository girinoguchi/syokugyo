<?php
/**
 * 共通ヘッダー（Next.js 版 src/components/Header.tsx を移植）。
 * テキストロゴの「エンジン」ワードマーク＋ナビ。ログイン状態に応じてリンクを出し分け。
 */
if (!defined('ABSPATH')) {
    exit;
}
$logged_in = is_user_logged_in();
?><!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <?php wp_head(); ?>
</head>
<body <?php body_class('bg-telecareer-surface text-ink antialiased'); ?>>
<div class="min-h-screen flex flex-col">
    <header class="sticky top-0 z-40 bg-white/90 backdrop-blur border-b-2 border-ink">
        <div class="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between gap-4">
            <a href="<?php echo esc_url(home_url('/')); ?>" class="inline-flex items-center gap-2.5 shrink-0">
                <span class="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-telecareer-orange border-2 border-ink text-white font-black">E</span>
                <span class="flex flex-col leading-none">
                    <span class="font-black text-lg text-telecareer-ink tracking-tight">エンジン</span>
                    <span class="text-[10px] text-gray-500 font-bold tracking-wide">エンタメ人材キャリアマッチング</span>
                </span>
            </a>

            <nav class="flex items-center gap-3 sm:gap-5 text-sm font-bold text-telecareer-ink">
                <?php if ($logged_in) : ?>
                    <a href="<?php echo esc_url(home_url('/jobs')); ?>" class="hidden sm:inline hover:text-telecareer-orange transition-colors">求人を探す</a>
                    <a href="<?php echo esc_url(home_url('/mypage')); ?>" class="hover:text-telecareer-orange transition-colors">マイページ</a>
                    <a href="<?php echo esc_url(wp_logout_url(home_url('/'))); ?>" class="hover:text-telecareer-orange transition-colors">ログアウト</a>
                <?php else : ?>
                    <a href="<?php echo esc_url(home_url('/login')); ?>" class="hover:text-telecareer-orange transition-colors">ログイン</a>
                    <a href="<?php echo esc_url(home_url('/signup')); ?>" class="btn-cta btn-flashy px-5 py-2 text-sm">会員登録</a>
                <?php endif; ?>
            </nav>
        </div>
    </header>
