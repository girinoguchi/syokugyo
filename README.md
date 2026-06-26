# Career Type Finder（職業タイプ診断）

32の質問で16タイプの仕事タイプを診断する WordPress プラグインです。

## 機能

- ショートコード `[career_type_finder]` で診断アプリを設置
- 16タイプの結果表示・タイプ図鑑
- メール登録によるリード取得（管理画面で一覧）
- REST API: `/wp-json/ctf/v1/lead`

## インストール

```
wp-content/plugins/career-type-finder/
```

WordPress 管理画面でプラグインを有効化し、固定ページに `[career_type_finder]` を設置します。

### 全画面表示

ページ属性のテンプレートで **「職業診断 全画面（ヘッダー/フッターなし）」** を選択してください。

## 履歴書AIとの連携

同じ WordPress に **AI Resume Generator** プラグインが入っている場合、診断結果から履歴書AIページへ自動リンクします。

別ドメインの場合は `ctf_resume_url` フィルターで URL を指定できます。

```php
add_filter( 'ctf_resume_url', function () {
    return 'https://example.com/resume/';
} );
```

## ローカル開発（Docker）

```bash
docker compose up -d
# http://localhost:8081
```

## ファイル構成

```
career-type-finder/
├── career-type-finder.php
├── includes/
│   ├── class-ctf-plugin.php
│   ├── class-ctf-app.php      # ショートコード・テンプレート
│   ├── class-ctf-lead.php     # リード CPT
│   └── class-ctf-rest.php     # REST API
├── assets/
│   ├── css/mbti.css
│   ├── js/mbti.core.js
│   └── img/types/             # 16タイプのイラスト
└── templates/
    ├── mbti-app.php
    └── page-fullscreen.php
```
