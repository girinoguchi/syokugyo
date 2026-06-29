#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
PORT="${PORT:-8080}"
LOG="/tmp/ctf-demo-tunnel.log"

if ! command -v php >/dev/null 2>&1; then
	echo "php が見つかりません。php-cli をインストールしてください。" >&2
	exit 1
fi

if ! pgrep -f "php -S 0.0.0.0:${PORT}.*demo/router.php" >/dev/null 2>&1; then
	echo "PHP サーバーを起動中 (port ${PORT})..."
	php -S "0.0.0.0:${PORT}" -t "$ROOT" "$ROOT/demo/router.php" >/tmp/ctf-demo-php.log 2>&1 &
	sleep 1
fi

if [[ ! -x /tmp/cloudflared ]]; then
	echo "cloudflared を取得中..."
	curl -sL https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64 -o /tmp/cloudflared
	chmod +x /tmp/cloudflared
fi

pkill -f "cloudflared tunnel --url http://localhost:${PORT}" >/dev/null 2>&1 || true
: > "$LOG"
/tmp/cloudflared tunnel --url "http://localhost:${PORT}" >"$LOG" 2>&1 &

for _ in $(seq 1 30); do
	URL="$(grep -o 'https://[a-z0-9-]*\.trycloudflare\.com' "$LOG" | head -1 || true)"
	if [[ -n "$URL" ]]; then
		echo ""
		echo "スマホで開く URL:"
		echo "  診断:  ${URL}/"
		echo "  QR:    ${URL}/mobile"
		echo ""
		exit 0
	fi
	sleep 1
done

echo "トンネル URL の取得に失敗しました。ログ: ${LOG}" >&2
exit 1
