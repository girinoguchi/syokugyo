<?php
/**
 * スマホでスキャンして開くための QR ページ。
 */
$scheme = ( ! empty( $_SERVER['HTTPS'] ) && $_SERVER['HTTPS'] !== 'off' ) ? 'https' : 'http';
$host   = $_SERVER['HTTP_HOST'] ?? 'localhost:8080';
$demo   = $scheme . '://' . $host . '/';
$qr     = 'https://api.qrserver.com/v1/create-qr-code/?size=280x280&data=' . rawurlencode( $demo );
?>
<!doctype html>
<html lang="ja">
<head>
	<meta charset="UTF-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<title>スマホで開く — 職業タイプ診断</title>
	<style>
		:root { color-scheme: light; font-family: system-ui, sans-serif; }
		body { margin: 0; min-height: 100dvh; display: grid; place-items: center; background: #f6f7fb; color: #1a1a2e; }
		.card { width: min(92vw, 420px); background: #fff; border-radius: 20px; padding: 28px 24px 32px; box-shadow: 0 12px 40px rgba(26,26,46,.08); text-align: center; }
		h1 { margin: 0 0 8px; font-size: 1.35rem; }
		p { margin: 0 0 18px; line-height: 1.7; color: #5b6075; font-size: .95rem; }
		img { display: block; width: 280px; height: 280px; margin: 0 auto 18px; border-radius: 12px; }
		a { color: #4f46e5; word-break: break-all; }
		.btn { display: inline-block; margin-top: 18px; padding: 12px 18px; border-radius: 999px; background: #4f46e5; color: #fff; text-decoration: none; font-weight: 700; }
	</style>
</head>
<body>
	<div class="card">
		<h1>スマホで診断を開く</h1>
		<p>カメラで QR コードを読み取るか、下のリンクをスマホのブラウザで開いてください。</p>
		<img src="<?php echo htmlspecialchars( $qr, ENT_QUOTES, 'UTF-8' ); ?>" width="280" height="280" alt="診断ページの QR コード" />
		<p><a href="<?php echo htmlspecialchars( $demo, ENT_QUOTES, 'UTF-8' ); ?>"><?php echo htmlspecialchars( $demo, ENT_QUOTES, 'UTF-8' ); ?></a></p>
		<a class="btn" href="<?php echo htmlspecialchars( $demo, ENT_QUOTES, 'UTF-8' ); ?>">診断を開く</a>
	</div>
</body>
</html>
