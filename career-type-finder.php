<?php
/**
 * Plugin Name:       Career Type Finder（職業タイプ診断）
 * Plugin URI:        https://example.com/career-type-finder
 * Description:        32の質問で16タイプの仕事タイプを診断するWordPressプラグイン。ショートコード [career_type_finder] で設置します。
 * Version:           1.0.0
 * Requires at least: 6.0
 * Requires PHP:      7.4
 * Author:            Your Name
 * License:           GPL-2.0-or-later
 * Text Domain:       career-type-finder
 *
 * @package CareerTypeFinder
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'CTF_VERSION', '1.0.0' );
define( 'CTF_PLUGIN_FILE', __FILE__ );
define( 'CTF_PLUGIN_DIR', plugin_dir_path( __FILE__ ) );
define( 'CTF_PLUGIN_URL', plugin_dir_url( __FILE__ ) );
define( 'CTF_PLUGIN_BASENAME', plugin_basename( __FILE__ ) );

require_once CTF_PLUGIN_DIR . 'includes/class-ctf-lead.php';
require_once CTF_PLUGIN_DIR . 'includes/class-ctf-rest.php';
require_once CTF_PLUGIN_DIR . 'includes/class-ctf-app.php';
require_once CTF_PLUGIN_DIR . 'includes/class-ctf-plugin.php';

/**
 * プラグイン起動。
 */
function ctf_bootstrap() {
	return CTF_Plugin::instance();
}
add_action( 'plugins_loaded', 'ctf_bootstrap' );

register_activation_hook(
	__FILE__,
	function () {
		CTF_Lead::register_cpt();
		flush_rewrite_rules();
	}
);

register_deactivation_hook(
	__FILE__,
	function () {
		flush_rewrite_rules();
	}
);
