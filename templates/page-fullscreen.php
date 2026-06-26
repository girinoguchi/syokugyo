<?php
/**
 * 全画面ページテンプレート（テーマのヘッダー・フッターを出さない）。
 *
 * @package CareerTypeFinder
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
?>
<!doctype html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<?php wp_head(); ?>
</head>
<body <?php body_class( 'ctf-fullscreen' ); ?>>
<?php
if ( function_exists( 'wp_body_open' ) ) {
	wp_body_open();
}

while ( have_posts() ) :
	the_post();
	the_content();
endwhile;

wp_footer();
?>
</body>
</html>
