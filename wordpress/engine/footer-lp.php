<?php
/**
 * 広告用LP（/lp/entame）専用フッター。スマホ固定CTAバー付き。
 */
if (!defined('ABSPATH')) {
    exit;
}
$signup_url = home_url('/signup');
?>
    <footer class="lp-footer">
        <div class="container foot">
            <span>&copy; テレキャリア（株式会社フォーミュレーションI.T.S.）</span>
            <span class="links">
                <a href="<?php echo esc_url(home_url('/terms')); ?>">利用規約</a>
                <a href="<?php echo esc_url(home_url('/privacy')); ?>">プライバシーポリシー</a>
                <a href="https://www.f-its.co.jp/" target="_blank" rel="noopener noreferrer">運営会社</a>
            </span>
        </div>
    </footer>

    <div class="sticky-cta">
        <a href="<?php echo esc_url($signup_url); ?>" class="btn-cta" data-cta>無料で会員登録する<span class="arrow">→</span></a>
    </div>
</div><!-- /.lp-root -->
<?php wp_footer(); ?>
</body>
</html>
