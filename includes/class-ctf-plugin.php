<?php
/**
 * メインのオーケストレーションクラス。
 *
 * @package CareerTypeFinder
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Class CTF_Plugin
 */
final class CTF_Plugin {

	/**
	 * @var CTF_Plugin|null
	 */
	private static $instance = null;

	/** @var CTF_Lead */
	public $lead;

	/** @var CTF_Rest */
	public $rest;

	/** @var CTF_App */
	public $app;

	public static function instance() {
		if ( null === self::$instance ) {
			self::$instance = new self();
		}
		return self::$instance;
	}

	private function __construct() {
		$this->lead = new CTF_Lead();
		$this->rest = new CTF_Rest();
		$this->app  = new CTF_App();

		add_action(
			'init',
			function () {
				load_plugin_textdomain( 'career-type-finder', false, dirname( CTF_PLUGIN_BASENAME ) . '/languages' );
			}
		);
	}
}
