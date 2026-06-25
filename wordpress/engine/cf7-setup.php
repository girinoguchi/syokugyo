<?php
/**
 * Contact Form 7 のお問い合わせフォームを作成/更新するセットアップスクリプト。
 *   npx @wordpress/env run cli wp eval-file wp-content/themes/engine/cf7-setup.php
 *
 * 作成したフォームIDは option 'engine_cf7_form_id' に保存し、マイページで読み込む。
 * 宛先は option 'engine_contact_recipients'（管理画面で追加・削除可）に従う。
 * 既定の宛先は kankan6123@gmail.com。
 */

if (!defined('ABSPATH')) {
    exit;
}

if (!class_exists('WPCF7_ContactForm')) {
    WP_CLI::error('Contact Form 7 が有効化されていません。先に有効化してください。');
    return;
}

// 既定の送信先（受信メール）を用意
$recipients = get_option('engine_contact_recipients');
if (!is_array($recipients) || empty($recipients)) {
    update_option('engine_contact_recipients', array('kankan6123@gmail.com'));
    $recipients = array('kankan6123@gmail.com');
}
$recipient = implode(', ', $recipients);

$form_html = <<<FORM
<div class="cf7-field">
  <label class="tc-label">お名前 <span class="req">*</span></label>
  [text* your-name class:tc-input placeholder "例: 山田 太郎"]
</div>
<div class="cf7-field">
  <label class="tc-label">メールアドレス <span class="req">*</span></label>
  [email* your-email class:tc-input placeholder "you@example.com"]
</div>
<div class="cf7-field">
  <label class="tc-label">電話番号（任意）</label>
  [tel your-tel class:tc-input placeholder "例: 090-1234-5678"]
</div>
<div class="cf7-field">
  <label class="tc-label">お問い合わせ内容 <span class="req">*</span></label>
  [textarea* your-message class:tc-input x4 placeholder "ご質問・ご相談内容をご記入ください"]
</div>
<div class="cf7-submit">
  [submit class:btn-cta class:btn-flashy "送信する"]
</div>
FORM;

$mail_body = <<<BODY
エンジン（マイページ）からお問い合わせがありました。

■お名前: [your-name]
■メール: [your-email]
■電話番号: [your-tel]

■内容:
[your-message]

-- 
このメールは [_site_title] のお問い合わせフォームから送信されました。
送信元ページ: [_url]
BODY;

$mail = array(
    'subject'            => '【エンジン】お問い合わせ: [your-name] 様',
    'sender'             => '[_site_title] <wordpress@localhost>',
    'recipient'          => $recipient,
    'body'               => $mail_body,
    'additional_headers' => "Reply-To: [your-email]",
    'attachments'        => '',
    'use_html'           => 0,
    'exclude_blank'      => 0,
);

$messages = array();
if (method_exists('WPCF7_ContactForm', 'get_default_messages')) {
    // 一部バージョン用フォールバック
}

$existing_id = (int) get_option('engine_cf7_form_id', 0);
$contact_form = $existing_id ? wpcf7_contact_form($existing_id) : null;

if (!$contact_form) {
    $contact_form = WPCF7_ContactForm::get_template(array('title' => 'エンジン お問い合わせ'));
}

$contact_form->set_title('エンジン お問い合わせ');
$contact_form->set_properties(array(
    'form' => $form_html,
    'mail' => $mail,
    'mail_2' => array(
        'active'             => false,
        'subject'            => '',
        'sender'             => '',
        'recipient'          => '',
        'body'               => '',
        'additional_headers' => '',
        'attachments'        => '',
        'use_html'           => 0,
        'exclude_blank'      => 0,
    ),
));

$id = $contact_form->save();
update_option('engine_cf7_form_id', $id);

WP_CLI::success('CF7フォーム作成/更新 完了。ID=' . $id . ' / 宛先=' . $recipient);
