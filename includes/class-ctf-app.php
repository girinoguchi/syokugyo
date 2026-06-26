<?php
/**
 * 職業タイプ診断アプリ（ショートコード・テンプレート・アセット）。
 *
 * @package CareerTypeFinder
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Class CTF_App
 */
class CTF_App {

	const SHORTCODE     = 'career_type_finder';
	const PAGE_TEMPLATE = 'ctf-fullscreen';

	/** @var bool */
	private $rendered = false;

	public function __construct() {
		add_shortcode( self::SHORTCODE, array( $this, 'render' ) );
		add_action( 'wp_enqueue_scripts', array( $this, 'register_assets' ) );
		add_filter( 'theme_page_templates', array( $this, 'register_page_template' ) );
		add_filter( 'template_include', array( $this, 'load_page_template' ) );
	}

	public function register_assets() {
		wp_register_style(
			'ctf-app',
			CTF_PLUGIN_URL . 'assets/css/mbti.css',
			array(),
			CTF_VERSION
		);
		wp_register_script(
			'ctf-app',
			CTF_PLUGIN_URL . 'assets/js/mbti.core.js',
			array(),
			CTF_VERSION,
			true
		);
	}

	public function register_page_template( $templates ) {
		$templates[ self::PAGE_TEMPLATE ] = __( '職業診断 全画面（ヘッダー/フッターなし）', 'career-type-finder' );
		return $templates;
	}

	public function load_page_template( $template ) {
		if ( is_page() && self::PAGE_TEMPLATE === get_page_template_slug() ) {
			$custom = CTF_PLUGIN_DIR . 'templates/page-fullscreen.php';
			if ( file_exists( $custom ) ) {
				return $custom;
			}
		}
		return $template;
	}

	/**
	 * 診断ページのURL。
	 *
	 * @return string
	 */
	public static function shindan_url() {
		$cached = get_transient( 'ctf_shindan_page_url' );
		if ( is_string( $cached ) && '' !== $cached ) {
			return $cached;
		}

		$url   = '';
		$pages = get_posts(
			array(
				'post_type'      => 'page',
				'post_status'    => 'publish',
				'posts_per_page' => 50,
				'no_found_rows'  => true,
				's'              => self::SHORTCODE,
			)
		);
		foreach ( $pages as $p ) {
			if ( has_shortcode( $p->post_content, self::SHORTCODE ) ) {
				$url = get_permalink( $p );
				break;
			}
		}

		if ( '' !== $url ) {
			set_transient( 'ctf_shindan_page_url', $url, HOUR_IN_SECONDS );
		}
		return $url;
	}

	/**
	 * 履歴書AIページのURL（別プラグインがあれば自動検出）。
	 *
	 * @return string
	 */
	public static function resume_url() {
		$cached = get_transient( 'ctf_resume_page_url' );
		if ( is_string( $cached ) && '' !== $cached ) {
			return $cached;
		}

		$url = apply_filters( 'ctf_resume_url', '' );
		if ( $url ) {
			set_transient( 'ctf_resume_page_url', $url, HOUR_IN_SECONDS );
			return $url;
		}

		$url   = home_url( '/' );
		$pages = get_posts(
			array(
				'post_type'      => 'page',
				'post_status'    => 'publish',
				'posts_per_page' => 50,
				'no_found_rows'  => true,
				's'              => 'ai_resume_form',
			)
		);
		foreach ( $pages as $p ) {
			if ( has_shortcode( $p->post_content, 'ai_resume_form' ) ) {
				$url = get_permalink( $p );
				break;
			}
		}

		set_transient( 'ctf_resume_page_url', $url, HOUR_IN_SECONDS );
		return $url;
	}

	public function render( $atts ) {
		if ( $this->rendered ) {
			return '';
		}
		$this->rendered = true;

		wp_enqueue_style( 'ctf-app' );
		wp_enqueue_script( 'ctf-app' );

		$type_img_base = '';
		$types_dir     = CTF_PLUGIN_DIR . 'assets/img/types/';
		if ( is_dir( $types_dir ) ) {
			$found = glob( $types_dir . 'mbti-*.png' );
			if ( is_array( $found ) && count( $found ) > 0 ) {
				$type_img_base = CTF_PLUGIN_URL . 'assets/img/types/';
			}
		}

		wp_localize_script(
			'ctf-app',
			'CTF',
			array(
				'restUrl'     => esc_url_raw( rest_url( CTF_Rest::NAMESPACE . '/lead' ) ),
				'nonce'       => wp_create_nonce( 'wp_rest' ),
				'resumeUrl'   => self::resume_url(),
				'typeImgBase' => $type_img_base,
			)
		);

		$template = CTF_PLUGIN_DIR . 'templates/mbti-app.php';
		if ( ! file_exists( $template ) ) {
			return '';
		}

		ob_start();
		include $template;
		return (string) ob_get_clean();
	}
}
