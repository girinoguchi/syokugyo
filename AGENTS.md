# Career Type Finder（職業タイプ診断）

32問の質問で16タイプの仕事タイプを診断する WordPress プラグインです。

## 構成

- `career-type-finder.php` — プラグイン本体
- `includes/` — REST API、リード管理、ショートコード
- `assets/` — CSS / JS / 16タイプのイラスト
- `templates/` — 診断画面テンプレート
- `docker-compose.yml` — ローカル WordPress 開発環境

## Cursor Cloud specific instructions

### 起動

```bash
sudo service docker start 2>/dev/null || true
docker compose up -d
```

WordPress は `http://localhost:8081` で起動します。プラグインはボリュームマウント済みです。

### プラグイン有効化（初回のみ）

```bash
docker compose exec wpcli wp plugin activate career-type-finder --allow-root
docker compose exec wpcli wp rewrite flush --allow-root
```

### 動作確認

1. 固定ページを作成し、ショートコード `[career_type_finder]` を設置
2. ページ属性で「職業診断 全画面（ヘッダー/フッターなし）」テンプレートを選択
3. ブラウザで診断フロー（32問 → 結果表示）を確認

### スマホ確認（Docker 不要）

```bash
bash demo/serve-mobile.sh
```

表示された URL をスマホのブラウザで開くか、`/mobile` の QR コードを読み取ります。

```bash
# 手動で起動する場合
php -S 0.0.0.0:8080 -t . demo/router.php
```

### 開発時の注意

- PHP / JS / CSS を編集したらブラウザをリロード（プラグインはマウントされているため再ビルド不要）
- リード登録 API: `POST /wp-json/ctf/v1/lead`
- npm 依存はありません（PHP + 素の JS のみ）
