<?php
/**
 * WordPress なしのローカルプレビュー（スマホ確認用）。
 */
$base = dirname( __DIR__ );
$app  = file_get_contents( $base . '/templates/mbti-app.php' );
$app  = preg_replace( '/^<\?php.*?\?>\s*/s', '', $app );
?>
<!doctype html>
<html lang="ja">
<head>
	<meta charset="UTF-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<title>職業タイプ診断 — プレビュー</title>
	<link rel="stylesheet" href="/assets/css/mbti.css" />
	<script>
		window.CTF = {
			restUrl: "",
			nonce: "",
			resumeUrl: "/",
			typeImgBase: "/assets/img/types/"
		};
	</script>
</head>
<body class="ctf-fullscreen">
<?php echo $app; ?>
<script src="/assets/js/mbti.core.js"></script>
</body>
</html>
