<?php
/**
 * 広告用LP（/lp/entame）専用ヘッダー。
 * グローバルナビは付けず、導線は「無料会員登録」に集約。検索エンジンには noindex。
 */
if (!defined('ABSPATH')) {
    exit;
}
$signup_url = home_url('/signup');
$logo_uri = get_template_directory_uri() . '/assets/img/formulation-its-logo.png';
?><!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="robots" content="noindex, nofollow" />
    <?php wp_head(); ?>
</head>
<body <?php body_class('lp-page'); ?>>
<div class="lp-root">
    <header class="lp-header">
        <div class="container">
            <nav class="nav">
                <span class="logo">
                    <span class="logo-box"><img src="<?php echo esc_url($logo_uri); ?>" alt="テレキャリア（株式会社フォーミュレーションI.T.S.）" /></span>
                </span>
                <a href="<?php echo esc_url($signup_url); ?>" class="btn-cta" data-cta>無料で会員登録<span class="arrow">→</span></a>
            </nav>
        </div>
    </header>
