#!/usr/bin/env bash
# telecareer-engine を Cursor のリポジトリ一覧に表示させるためのセットアップスクリプト
#
# 使い方（どちらか）:
#   A) gh auth login 済みの場合:
#        bash scripts/enable-cursor-repo.sh
#   B) Personal Access Token がある場合:
#        GITHUB_TOKEN=ghp_xxxx bash scripts/enable-cursor-repo.sh
#
# 実行後: https://cursor.com/dashboard/integrations で GitHub を一度 Disconnect → Connect

set -euo pipefail

OWNER="girinoguchi"
REPO="telecareer-engine"
DESCRIPTION="テレキャリアエンジン - エンタメ業界専門求人マッチングサービス"

if [ -n "${GITHUB_TOKEN:-}" ]; then
  ghapi() { curl -sS -H "Authorization: token ${GITHUB_TOKEN}" -H "Accept: application/vnd.github+json" "https://api.github.com/$1" "${@:2}"; }
  ghapi_put() { curl -sS -o /dev/null -w "%{http_code}" -X PUT -H "Authorization: token ${GITHUB_TOKEN}" -H "Accept: application/vnd.github+json" "https://api.github.com/$1" "${@:2}"; }
elif gh auth status >/dev/null 2>&1; then
  ghapi() { gh api "$@"; }
  ghapi_put() { gh api -X PUT "$@" >/dev/null; echo "204"; }
else
  echo "❌ GitHub 認証が必要です。"
  echo "   Mac/PC で: gh auth login"
  echo "   または: GITHUB_TOKEN=ghp_xxxx bash scripts/enable-cursor-repo.sh"
  echo ""
  echo ""
  echo "【スマホのみの場合】次の手順で手動設定してください:"
  echo "   1. https://github.com/apps/cursor/installations/new"
  echo "      → girinoguchi / telecareer-engine を許可（または All repositories）"
  echo "   2. https://cursor.com/dashboard/integrations"
  echo "      → GitHub Disconnect → Connect"
  echo "   3. 検索欄に「telecareer」と入力"
  exit 1
fi

echo "==> 1. リポジトリ確認: ${OWNER}/${REPO}"
REPO_JSON=$(ghapi "repos/${OWNER}/${REPO}" 2>/dev/null || echo '{"id":null}')
REPO_ID=$(echo "$REPO_JSON" | python3 -c "import sys,json; print(json.load(sys.stdin).get('id') or '')" 2>/dev/null || true)

if [ -z "$REPO_ID" ]; then
  echo "    リポジトリが見つかりません。新規作成します..."
  ghapi -X POST "user/repos" -d "{\"name\":\"${REPO}\",\"description\":\"${DESCRIPTION}\",\"private\":true}" >/dev/null
  REPO_JSON=$(ghapi "repos/${OWNER}/${REPO}")
  REPO_ID=$(echo "$REPO_JSON" | python3 -c "import sys,json; print(json.load(sys.stdin)['id'])")
  echo "    作成完了 (id: ${REPO_ID})"
else
  echo "    存在します (id: ${REPO_ID})"
fi

echo "==> 2. Cursor GitHub App を検索"
INSTALL_JSON=$(ghapi "user/installations")
INSTALL_ID=$(echo "$INSTALL_JSON" | python3 -c "
import sys, json
for i in json.load(sys.stdin).get('installations', []):
    if i.get('app_slug') == 'cursor':
        print(i['id'])
        break
")

if [ -z "$INSTALL_ID" ]; then
  echo ""
  echo "❌ Cursor GitHub App が未インストールです。"
  echo "   https://github.com/apps/cursor/installations/new"
  echo "   → All repositories を選択してインストール"
  exit 1
fi
echo "    installation id: ${INSTALL_ID}"

echo "==> 3. telecareer-engine を Cursor に許可"
CODE=$(ghapi_put "user/installations/${INSTALL_ID}/repositories/${REPO_ID}" || echo "000")
if [ "$CODE" = "204" ] || [ "$CODE" = "200" ]; then
  echo "    ✅ 追加成功"
else
  echo "    ℹ️  All repositories モードの可能性あり（HTTP ${CODE}）"
fi

echo ""
echo "============================================"
echo "  次: https://cursor.com/dashboard/integrations"
echo "  GitHub → Disconnect → Connect"
echo "  検索欄に「telecareer」と入力"
echo "============================================"
