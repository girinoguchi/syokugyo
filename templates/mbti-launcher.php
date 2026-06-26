<?php
/**
 * 全サイト共通のフローティング起動ボタンとモーダル。
 *
 * @package CareerTypeFinder
 *
 * @var string $app_markup 診断アプリの HTML（class-ctf-app.php から渡される）。
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
?>
<button
	class="ctf-fab"
	type="button"
	id="ctfFab"
	aria-label="<?php esc_attr_e( '職業タイプ診断を開く', 'career-type-finder' ); ?>"
	aria-controls="ctfModal"
	aria-expanded="false"
	onclick="ctfOpenModal()"
>
	<span class="ctf-fab__icon" aria-hidden="true">🎯</span>
	<span class="ctf-fab__label"><?php esc_html_e( 'タイプ診断', 'career-type-finder' ); ?></span>
</button>

<div
	class="ctf-modal"
	id="ctfModal"
	hidden
	aria-hidden="true"
	role="dialog"
	aria-modal="true"
	aria-labelledby="ctfModalTitle"
>
	<div class="ctf-modal__backdrop" onclick="ctfCloseModal()" aria-hidden="true"></div>
	<div class="ctf-modal__panel">
		<div class="ctf-modal__head">
			<p class="ctf-modal__title" id="ctfModalTitle"><?php esc_html_e( '職業タイプ診断', 'career-type-finder' ); ?></p>
			<button
				class="ctf-modal__close"
				type="button"
				onclick="ctfCloseModal()"
				aria-label="<?php esc_attr_e( '閉じる', 'career-type-finder' ); ?>"
			>×</button>
		</div>
		<div class="ctf-modal__body">
			<?php echo $app_markup; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- template HTML. ?>
		</div>
	</div>
</div>
