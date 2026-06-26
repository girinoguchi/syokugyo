<?php
/**
 * PHP 組み込みサーバー用ルーター。
 */
$uri  = parse_url( $_SERVER['REQUEST_URI'], PHP_URL_PATH );
$root = dirname( __DIR__ );
$file = $root . $uri;

if ( $uri !== '/' && is_file( $file ) ) {
	return false;
}

if ( $uri === '/mobile' || $uri === '/mobile/' ) {
	require __DIR__ . '/mobile.php';
	return true;
}

if ( $uri === '/' || $uri === '/shindan' || $uri === '/shindan/' ) {
	require __DIR__ . '/index.php';
	return true;
}

http_response_code( 404 );
echo 'Not Found';
return true;
