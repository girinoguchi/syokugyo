<?php
/**
 * 汎用フォールバックテンプレート。
 */
if (!defined('ABSPATH')) {
    exit;
}
get_header();
?>
<main class="mx-auto max-w-3xl px-4 py-14 flex-1 w-full">
    <?php if (have_posts()) : ?>
        <?php while (have_posts()) : the_post(); ?>
            <article class="tc-card p-6 md:p-8 mb-8">
                <h1 class="text-2xl md:text-3xl font-black text-telecareer-ink mb-4"><?php the_title(); ?></h1>
                <div class="prose max-w-none text-ink leading-relaxed">
                    <?php the_content(); ?>
                </div>
            </article>
        <?php endwhile; ?>
    <?php else : ?>
        <div class="tc-card p-8 text-center">
            <h1 class="text-xl font-black text-telecareer-ink mb-2">ページが見つかりませんでした</h1>
            <p class="text-gray-600 text-sm">お探しのページは存在しないか、移動した可能性があります。</p>
            <a href="<?php echo esc_url(home_url('/')); ?>" class="link-accent inline-block mt-4">トップへ戻る →</a>
        </div>
    <?php endif; ?>
</main>
<?php
get_footer();
