<?php
/**
 * 診断リード（見込み客）管理。
 *
 * @package CareerTypeFinder
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Class CTF_Lead
 */
class CTF_Lead {

	const POST_TYPE = 'ctf_lead';
	const META_KEY  = '_ctf_data';

	public function __construct() {
		add_action( 'init', array( __CLASS__, 'register_cpt' ) );
		add_filter( 'manage_' . self::POST_TYPE . '_posts_columns', array( $this, 'columns' ) );
		add_action( 'manage_' . self::POST_TYPE . '_posts_custom_column', array( $this, 'column_content' ), 10, 2 );
	}

	public static function register_cpt() {
		register_post_type(
			self::POST_TYPE,
			array(
				'labels'              => array(
					'name'          => __( '診断リード', 'career-type-finder' ),
					'singular_name' => __( '診断リード', 'career-type-finder' ),
					'menu_name'     => __( '職業診断', 'career-type-finder' ),
					'all_items'     => __( 'リード一覧', 'career-type-finder' ),
				),
				'public'              => false,
				'show_ui'             => true,
				'show_in_menu'        => true,
				'menu_icon'           => 'dashicons-chart-pie',
				'menu_position'       => 27,
				'capability_type'     => 'post',
				'capabilities'        => array(
					'create_posts' => 'do_not_allow',
				),
				'map_meta_cap'        => true,
				'supports'            => array( 'title' ),
				'exclude_from_search' => true,
				'has_archive'         => false,
				'rewrite'             => false,
			)
		);
	}

	/**
	 * @param string $name  氏名。
	 * @param string $email メール。
	 * @param string $code  タイプコード。
	 * @param string $type  タイプ名。
	 * @return int|WP_Error
	 */
	public static function create( $name, $email, $code, $type ) {
		$title = sprintf(
			'%s（%s） - %s - %s',
			$name ? $name : '名称未設定',
			$email ? $email : 'メール未取得',
			$code ? $code : '—',
			current_time( 'Y-m-d H:i' )
		);

		$post_id = wp_insert_post(
			array(
				'post_type'   => self::POST_TYPE,
				'post_status' => 'private',
				'post_title'  => $title,
			),
			true
		);

		if ( is_wp_error( $post_id ) ) {
			return $post_id;
		}

		update_post_meta(
			$post_id,
			self::META_KEY,
			array(
				'name'      => $name,
				'email'     => $email,
				'code'      => $code,
				'type'      => $type,
				'created'   => current_time( 'mysql' ),
			)
		);

		return $post_id;
	}

	public function columns( $columns ) {
		return array(
			'cb'         => isset( $columns['cb'] ) ? $columns['cb'] : '<input type="checkbox" />',
			'title'      => __( 'タイトル', 'career-type-finder' ),
			'ctf_name'   => __( '氏名', 'career-type-finder' ),
			'ctf_email'  => __( 'メール', 'career-type-finder' ),
			'ctf_type'   => __( 'タイプ', 'career-type-finder' ),
			'date'       => __( '送信日時', 'career-type-finder' ),
		);
	}

	public function column_content( $column, $post_id ) {
		$data = get_post_meta( $post_id, self::META_KEY, true );
		if ( ! is_array( $data ) ) {
			return;
		}
		switch ( $column ) {
			case 'ctf_name':
				echo esc_html( $data['name'] ?? '—' );
				break;
			case 'ctf_email':
				echo esc_html( $data['email'] ?? '—' );
				break;
			case 'ctf_type':
				$label = trim( ( $data['code'] ?? '' ) . ' ' . ( $data['type'] ?? '' ) );
				echo esc_html( $label ? $label : '—' );
				break;
		}
	}
}
