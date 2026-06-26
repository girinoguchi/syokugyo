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
		add_action( 'wp_head', array( $this, 'maybe_output_og_tags' ), 5 );
		add_action( 'wp_footer', array( $this, 'maybe_render_global_launcher' ), 20 );
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

	/**
	 * 全サイト共通のフローティング起動ボタンを表示するか。
	 *
	 * @return bool
	 */
	public function should_show_global_launcher() {
		if ( is_admin() || wp_doing_ajax() || wp_is_json_request() ) {
			return false;
		}

		if ( ! apply_filters( 'ctf_global_launcher_enabled', true ) ) {
			return false;
		}

		if ( $this->rendered ) {
			return false;
		}

		if ( is_page() && self::PAGE_TEMPLATE === get_page_template_slug() ) {
			return false;
		}

		return true;
	}

	/**
	 * アセット読み込みと CTF グローバル変数の設定。
	 */
	private function enqueue_app_assets() {
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
				'pageUrl'     => is_singular() ? get_permalink() : home_url( '/' ),
			)
		);
	}

	/**
	 * 共有URL（?t=タイプコード）向け OGP（クローラー用）。
	 */
	public function maybe_output_og_tags() {
		if ( ! is_singular( 'page' ) ) {
			return;
		}

		global $post;
		if ( ! $post || ! has_shortcode( $post->post_content, self::SHORTCODE ) ) {
			return;
		}

		// phpcs:ignore WordPress.Security.NonceVerification.Recommended
		$code = isset( $_GET['t'] ) ? strtoupper( sanitize_text_field( wp_unslash( $_GET['t'] ) ) ) : '';
		if ( ! preg_match( '/^[PT][LC][OF][DS]$/', $code ) ) {
			return;
		}

		$title = sprintf( '仕事タイプ診断の結果：%s', $code );
		$desc  = '32問のキャリア・タイプ診断。あなたの仕事タイプと強みをチェック。';
		$url   = add_query_arg( 't', $code, get_permalink( $post ) );
		$img   = '';

		$img_path = CTF_PLUGIN_DIR . 'assets/img/types/mbti-' . $code . '.png';
		if ( file_exists( $img_path ) ) {
			$img = CTF_PLUGIN_URL . 'assets/img/types/mbti-' . $code . '.png';
		}

		echo '<meta property="og:type" content="website" />' . "\n";
		echo '<meta property="og:title" content="' . esc_attr( $title ) . '" />' . "\n";
		echo '<meta property="og:description" content="' . esc_attr( $desc ) . '" />' . "\n";
		echo '<meta property="og:url" content="' . esc_url( $url ) . '" />' . "\n";
		if ( $img ) {
			echo '<meta property="og:image" content="' . esc_url( $img ) . '" />' . "\n";
		}
		echo '<meta name="twitter:card" content="summary_large_image" />' . "\n";
		echo '<meta name="twitter:title" content="' . esc_attr( $title ) . '" />' . "\n";
		echo '<meta name="twitter:description" content="' . esc_attr( $desc ) . '" />' . "\n";
		if ( $img ) {
			echo '<meta name="twitter:image" content="' . esc_url( $img ) . '" />' . "\n";
		}
	}

	/**
	 * 診断アプリの HTML。
	 *
	 * @return string
	 */
	private function get_app_markup() {
		$template = CTF_PLUGIN_DIR . 'templates/mbti-app.php';
		if ( ! file_exists( $template ) ) {
			return '';
		}

		ob_start();
		include $template;
		return (string) ob_get_clean();
	}

	public function render( $atts ) {
		if ( $this->rendered ) {
			return '';
		}
		$this->rendered = true;

		$this->enqueue_app_assets();
		return $this->get_app_markup();
	}

	/**
	 * 全ページにフローティング起動ボタンとモーダルを出力。
	 */
	public function maybe_render_global_launcher() {
		if ( ! $this->should_show_global_launcher() ) {
			return;
		}

		$this->rendered = true;
		$this->enqueue_app_assets();

		$template = CTF_PLUGIN_DIR . 'templates/mbti-launcher.php';
		if ( ! file_exists( $template ) ) {
			return;
		}

		$app_markup = $this->get_app_markup();
		if ( '' === $app_markup ) {
			return;
		}

		include $template;
	}
}
