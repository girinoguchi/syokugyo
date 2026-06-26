<?php
/**
 * REST API（診断リード受付）。
 *
 * @package CareerTypeFinder
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Class CTF_Rest
 */
class CTF_Rest {

	const NAMESPACE = 'ctf/v1';

	public function __construct() {
		add_action( 'rest_api_init', array( $this, 'register_routes' ) );
	}

	public function register_routes() {
		register_rest_route(
			self::NAMESPACE,
			'/lead',
			array(
				'methods'             => 'POST',
				'callback'            => array( $this, 'handle_lead' ),
				'permission_callback' => array( $this, 'check_permission' ),
			)
		);
	}

	public function check_permission( WP_REST_Request $request ) {
		$nonce = $request->get_header( 'X-WP-Nonce' );
		if ( empty( $nonce ) ) {
			$nonce = $request->get_param( '_wpnonce' );
		}
		if ( ! $nonce || ! wp_verify_nonce( $nonce, 'wp_rest' ) ) {
			return new WP_Error(
				'ctf_invalid_nonce',
				__( 'セキュリティ検証に失敗しました。ページを再読み込みしてお試しください。', 'career-type-finder' ),
				array( 'status' => 403 )
			);
		}
		return true;
	}

	public function handle_lead( WP_REST_Request $request ) {
		$params = $request->get_json_params();
		if ( ! is_array( $params ) ) {
			$params = $request->get_params();
		}

		$name  = isset( $params['name'] ) ? sanitize_text_field( wp_unslash( $params['name'] ) ) : '';
		$email = isset( $params['email'] ) ? sanitize_email( wp_unslash( $params['email'] ) ) : '';
		$code  = isset( $params['code'] ) ? sanitize_text_field( wp_unslash( $params['code'] ) ) : '';
		$type  = isset( $params['type'] ) ? sanitize_text_field( wp_unslash( $params['type'] ) ) : '';

		$code = preg_replace( '/[^A-Z]/', '', strtoupper( $code ) );
		$code = substr( $code, 0, 4 );

		if ( ! is_email( $email ) ) {
			return new WP_REST_Response(
				array(
					'ok'      => false,
					'message' => __( 'メールアドレスの形式をご確認ください。', 'career-type-finder' ),
				),
				422
			);
		}

		$lead_id = CTF_Lead::create( $name, $email, $code, $type );
		if ( is_wp_error( $lead_id ) ) {
			return new WP_REST_Response(
				array(
					'ok'      => false,
					'message' => __( '保存に失敗しました。時間をおいて再度お試しください。', 'career-type-finder' ),
				),
				422
			);
		}

		$this->notify_admin( $name, $email, $code, $type );

		return new WP_REST_Response( array( 'ok' => true ), 200 );
	}

	private function notify_admin( $name, $email, $code, $type ) {
		$to      = get_option( 'admin_email' );
		$subject = sprintf( '[%s] 職業診断から新しいリード', get_bloginfo( 'name' ) );
		$body    = "職業タイプ診断から新しいリードが届きました。\n\n"
			. '氏名: ' . ( $name ? $name : '（未入力）' ) . "\n"
			. 'メール: ' . $email . "\n"
			. 'タイプ: ' . trim( $code . ' ' . $type ) . "\n"
			. '受信日時: ' . current_time( 'Y-m-d H:i' ) . "\n";
		wp_mail( $to, $subject, $body ); // phpcs:ignore
	}
}
