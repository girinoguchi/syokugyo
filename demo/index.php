<?php
/**
 * WordPress なしのローカルプレビュー（スマホ確認用）。
 */
$base     = dirname( __DIR__ );
$app      = file_get_contents( $base . '/templates/mbti-app.php' );
$app      = preg_replace( '/^<\?php.*?\?>\s*/s', '', $app );
$scheme   = ( ! empty( $_SERVER['HTTPS'] ) && 'off' !== $_SERVER['HTTPS'] ) ? 'https' : 'http';
$host     = $_SERVER['HTTP_HOST'] ?? 'localhost:8081';
$page_url = $scheme . '://' . $host . '/';
?>
<!doctype html>
<html lang="ja">
<head>
	<meta charset="UTF-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<title>職業タイプ診断 | キャリア・タイプ診断</title>
	<meta name="description" content="32問・約5分で16タイプの仕事タイプを診断。4つの仕事カラーで分類します。" />
	<meta property="og:type" content="website" />
	<meta property="og:title" content="職業タイプ診断 | キャリア・タイプ診断" />
	<meta property="og:description" content="32問・約5分で16タイプの仕事タイプを診断。" />
	<meta property="og:url" content="<?php echo htmlspecialchars( $page_url, ENT_QUOTES, 'UTF-8' ); ?>" />
	<meta name="twitter:card" content="summary_large_image" />
	<link rel="stylesheet" href="/assets/css/mbti.css" />
	<script>
		window.CTF = {
			restUrl: "",
			nonce: "",
			resumeUrl: "/",
			pageUrl: <?php echo json_encode( $page_url, JSON_UNESCAPED_SLASHES ); ?>,
			typeImgBase: "/assets/img/types/"
		};
	</script>
</head>
<body class="ctf-fullscreen">
<?php echo $app; ?>
<script src="/assets/js/mbti.core.js"></script>
</body>
</html>
