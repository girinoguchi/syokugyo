<?php
/**
 * 汎用固定ページテンプレート（専用テンプレートが無い固定ページ用）。
 */
if (!defined('ABSPATH')) {
    exit;
}
get_header();
?>
<main class="mx-auto max-w-3xl px-4 py-14 flex-1 w-full">
    <?php while (have_posts()) : the_post(); ?>
        <h1 class="text-3xl font-black text-telecareer-ink mb-6"><span class="tc-marker"><?php the_title(); ?></span></h1>
        <div class="tc-card p-6 md:p-8 prose max-w-none text-ink leading-relaxed">
            <?php the_content(); ?>
        </div>
    <?php endwhile; ?>
</main>
<?php
get_footer();
