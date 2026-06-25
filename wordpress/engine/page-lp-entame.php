<?php
/**
 * Template Name: 広告用LP（エンタメ）
 * 広告流入専用ランディングページ /lp/entame。
 * ゴールは「無料会員登録」1点に集約。グローバルナビなし・noindex。
 */
if (!defined('ABSPATH')) {
    exit;
}
get_header('lp');

$signup = home_url('/signup');

$cam = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>';

$genres = array('エキストラ', 'バラエティ', 'ドラマ', '芸能マネージャー', 'CM', '配信', '音響', '照明', 'イベント運営', '制作・AD');

$pains = array(
    'エンタメ業界に入りたいけど、入口が分からない。',
    '未経験だから、不安。続けられるか心配。',
    '怪しい求人サイトばかりで信頼できない。',
    '相談できる人が周りにいない。',
);

$steps = array(
    array('n' => '1', 'h' => '無料で会員登録', 'p' => 'お名前・連絡先などを入力するだけ。1分で完了、費用は一切かかりません。'),
    array('n' => '2', 'h' => 'キャリア相談・求人紹介', 'p' => '業界を知るアドバイザーが、あなたの希望や適性に合う求人をご紹介します。'),
    array('n' => '3', 'h' => '気になる求人に応募', 'p' => '現場デビューまでサポート。はじめての方も安心して挑戦できます。'),
);

$cats = array(
    array('h' => 'エキストラ',   'p' => 'ドラマ・映画・CMの撮影に参加。未経験・学生も歓迎。', 'c' => 'var(--yellow)'),
    array('h' => '制作・AD',     'p' => 'テレビ・映像制作のアシスタント。業界デビューの第一歩。', 'c' => 'var(--pink)'),
    array('h' => '音響スタッフ', 'p' => 'ライブ・イベントの音響設営やPA補助。研修ありの求人も。', 'c' => 'var(--coral)'),
    array('h' => '照明スタッフ', 'p' => 'ステージ・撮影現場のライティング。光で空間を演出。', 'c' => 'var(--blue)'),
    array('h' => '撮影・カメラ', 'p' => '番組・配信・Web動画の撮影サポートやカメラ補助。', 'c' => 'var(--yellow)'),
    array('h' => 'イベント運営', 'p' => 'コンサート・イベントの設営や運営スタッフ。単発も多数。', 'c' => 'var(--coral)'),
);

$reasons = array(
    array('h' => '未経験から多数スタート', 'p' => 'もともと未経験の方を数多く受け入れてきました。だから「未経験OK」は本当です。'),
    array('h' => '本物の現場とつながる', 'p' => '長年のネットワークで、テレビ・ドラマ・CM・配信の現場をご紹介。'),
    array('h' => '相談できるサポート体制', 'p' => '現場経験のあるスタッフが在籍。業界を知る人がそばにいます。'),
    array('h' => '登録も相談も無料', 'p' => 'ご登録・キャリア相談はすべて無料。まずは気軽にご相談ください。'),
);

$trust = array(
    array('t' => '実在の人材会社が運営', 'l' => '人材派遣・有料職業紹介の許可事業者'),
    array('t' => 'テレビ業界に深いネットワーク', 'l' => '1986年創業の親会社と2011年創業のI.T.S.'),
    array('t' => '未経験スタートを多数支援', 'l' => '受け入れ実績が豊富'),
    array('t' => '相談できる安心感', 'l' => '現場を知るスタッフがサポート'),
);

$abouts = array(
    array('h' => '実在する人材会社が運営', 'p' => '人材派遣・有料職業紹介の許可を受けた事業者です。'),
    array('h' => 'テレビ業界に深いネットワーク', 'p' => '1986年創業の親会社と2011年創業のI.T.S.。だから紹介する現場が“本物”です。'),
    array('h' => '未経験からのスタートを多数サポート', 'p' => 'もともと未経験の人を数多く受け入れてきた会社。だから「未経験OK」は本当です。'),
    array('h' => '相談できるサポート体制', 'p' => '現場経験のあるスタッフが在籍。業界のことを知る人がそばにいます。'),
);

$company = array(
    '商号'     => '株式会社フォーミュレーションI.T.S.',
    '設立'     => '2011年',
    '所在地'   => '東京都渋谷区東1-26-20 東京建物東渋谷ビル B1F',
    '事業内容' => '人材派遣業／有料職業紹介業／テレビ番組などメディアの企画制作',
    '関連会社' => '株式会社フォーミュレーション',
);

$faqs = array(
    array('q' => '本当に未経験でも大丈夫ですか？', 'a' => 'はい。もともと未経験の方を数多く受け入れてきました。未経験歓迎の求人を中心にご紹介します。'),
    array('q' => '登録や相談に費用はかかりますか？', 'a' => 'いいえ。会員登録・キャリア相談はすべて無料です。'),
    array('q' => '学生でも応募できますか？', 'a' => '学生の方も歓迎です。学業と両立しやすい単発の求人もあります。'),
    array('q' => '登録したらすぐ働かないといけませんか？', 'a' => 'いいえ。まずは相談だけでも大丈夫です。ご希望に合わせて求人をご案内します。'),
);

$logo_uri = get_template_directory_uri() . '/assets/img/formulation-its-logo.png';
?>

<!-- Hero -->
<section class="hero">
    <div class="container hero-grid">
        <div class="reveal">
            <span class="eyebrow">エンタメ業界専門の求人サービス</span>
            <h1>エンタメ業界で働きたい人の、<span class="hl">エンジン</span>になる。</h1>
            <p class="sub">エキストラ、バラエティ、ドラマ、芸能マネージャー、CM、配信など、エンタメ特化の求人が見つかる。未経験から始められる仕事も多数。</p>
            <div class="hero-actions">
                <a href="<?php echo esc_url($signup); ?>" class="btn-cta" data-cta>無料で会員登録<span class="arrow">→</span></a>
                <a href="#about" class="btn-ghost">運営会社を見る</a>
            </div>
            <p class="cta-note"><b>登録も相談も無料</b>／未経験OKの求人多数</p>
            <div class="hero-points">
                <span class="pt"><span class="d" style="background:var(--yellow)"></span>未経験OK</span>
                <span class="pt"><span class="d" style="background:var(--coral)"></span>全部無料</span>
                <span class="pt"><span class="d" style="background:var(--blue)"></span>本物の現場</span>
            </div>
        </div>
        <div class="hero-art reveal">
            <div class="photo ar43"><?php echo $cam; ?><span class="cap">撮影スタジオ／番組収録の現場</span></div>
            <div class="photo ar11 photo-float"><?php echo $cam; ?><span class="cap">ライブ照明</span></div>
            <div class="photo ar11 photo-float2"><?php echo $cam; ?><span class="cap">音響PA</span></div>
        </div>
    </div>
</section>

<!-- Genre strip -->
<div class="genre">
    <div class="container row">
        <span class="lead">こんな仕事があります</span>
        <?php foreach ($genres as $g) : ?>
            <span class="pill"><?php echo esc_html($g); ?></span>
        <?php endforeach; ?>
    </div>
</div>

<!-- Pains -->
<section class="sec pains">
    <div class="container">
        <div class="sec-head reveal">
            <div class="tag">SUCH WORRIES</div>
            <h2>こんなお悩み、ありませんか？</h2>
            <p>エンタメ業界に興味はあるけれど、最初の一歩が踏み出せない。そんな声をよく聞きます。</p>
        </div>
        <div class="pain-grid reveal">
            <?php foreach ($pains as $p) : ?>
                <div class="pain">
                    <span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 9v4"/><path d="M12 17h.01"/><circle cx="12" cy="12" r="10"/></svg></span>
                    <p><?php echo esc_html($p); ?></p>
                </div>
            <?php endforeach; ?>
        </div>
        <p class="pain-foot">そのお悩み、<span class="hl">エンジン</span>が解決します。</p>
    </div>
</section>

<!-- Steps -->
<section class="sec">
    <div class="container">
        <div class="sec-head reveal">
            <div class="tag">HOW IT WORKS</div>
            <h2>はじめ方は、かんたん3ステップ</h2>
            <p>登録から現場デビューまで、しっかりサポートします。</p>
        </div>
        <div class="steps reveal">
            <?php foreach ($steps as $s) : ?>
                <div class="step">
                    <span class="badge"><?php echo esc_html($s['n']); ?></span>
                    <span class="ill"><?php echo $cam; ?></span>
                    <h3><?php echo esc_html($s['h']); ?></h3>
                    <p><?php echo esc_html($s['p']); ?></p>
                </div>
            <?php endforeach; ?>
        </div>
    </div>
</section>

<!-- Categories -->
<section class="sec">
    <div class="container">
        <div class="sec-head reveal">
            <div class="tag">CATEGORY</div>
            <h2>例えば、こんなお仕事。</h2>
            <p>未経験から始められるものも多数。あなたに合う現場が見つかります。</p>
        </div>
        <div class="cat-grid reveal">
            <?php foreach ($cats as $c) : ?>
                <div class="cat">
                    <div class="photo thumb"><?php echo $cam; ?></div>
                    <div class="body">
                        <span class="ico" style="background:<?php echo esc_attr($c['c']); ?>"><?php echo $cam; ?></span>
                        <h3><?php echo esc_html($c['h']); ?></h3>
                        <p><?php echo esc_html($c['p']); ?></p>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>
    </div>
</section>

<!-- Reasons -->
<section class="sec reasons">
    <div class="container">
        <div class="sec-head reveal">
            <div class="tag">WHY ENGINE</div>
            <h2>未経験でも、エンタメ業界で働ける理由</h2>
            <p>「やってみたい」を、現場での経験に変えていきます。</p>
        </div>
        <div class="reason-grid reveal">
            <?php foreach ($reasons as $i => $r) : ?>
                <?php $bg = array('var(--yellow)', 'var(--pink)', 'var(--coral)', 'var(--blue)'); ?>
                <div class="reason">
                    <span class="ill" style="background:<?php echo esc_attr($bg[$i % 4]); ?>"><?php echo $cam; ?></span>
                    <h3><?php echo esc_html($r['h']); ?></h3>
                    <p><?php echo esc_html($r['p']); ?></p>
                </div>
            <?php endforeach; ?>
        </div>
    </div>
</section>

<!-- Gallery -->
<section class="sec">
    <div class="container">
        <div class="sec-head reveal">
            <div class="tag">ON SITE</div>
            <h2>“本物の現場”で働く</h2>
            <p>テレビ・ドラマ・CM・配信・イベント。あなたの「好き」を仕事に。</p>
        </div>
        <div class="gal-grid reveal">
            <?php for ($i = 0; $i < 5; $i++) : ?>
                <div class="photo"><?php echo $cam; ?></div>
            <?php endfor; ?>
        </div>
    </div>
</section>

<!-- Trust -->
<section class="sec">
    <div class="container">
        <div class="sec-head reveal">
            <div class="tag">TRUST</div>
            <h2>安心して、はじめられる</h2>
        </div>
        <div class="trust-grid reveal">
            <?php foreach ($trust as $t) : ?>
                <div class="card">
                    <span class="ill"><?php echo $cam; ?></span>
                    <div class="ttl"><?php echo esc_html($t['t']); ?></div>
                    <div class="lbl"><?php echo esc_html($t['l']); ?></div>
                </div>
            <?php endforeach; ?>
        </div>
    </div>
</section>

<!-- About us（運営会社） -->
<section class="sec about" id="about">
    <div class="container">
        <div class="sec-head reveal">
            <div class="tag">ABOUT US</div>
            <h2>テレビ業界に強い人材会社が運営しています</h2>
            <p>「どこの誰が運営しているか分からない」という不安はいりません。長年テレビ・エンタメ業界に人材を送り出してきた会社です。</p>
        </div>
        <div class="about-grid reveal">
            <div class="about-desc">
                <p>運営は株式会社フォーミュレーションI.T.S.。2011年からテレビ局や制作会社に人材を送り出してきた、メディア業界専門の人材会社です。親会社は1986年創業、テレビ・CM業界で活躍するリサーチ会社「フォーミュレーション」。長年つちかったネットワークで、テレビ番組・ドラマ・映画・大手CM・配信・イベントなど“本物の現場”とつながっています。</p>
            </div>
            <div class="about-media">
                <span class="logo-box"><img src="<?php echo esc_url($logo_uri); ?>" alt="株式会社フォーミュレーションI.T.S." style="height:38px" /></span>
                <div class="photo ar43"><?php echo $cam; ?><span class="cap">オフィス／現場の様子</span></div>
            </div>
        </div>
        <div class="about-cards reveal">
            <?php foreach ($abouts as $a) : ?>
                <div class="about-card">
                    <span class="badge-ico"><?php echo $cam; ?></span>
                    <h3><?php echo esc_html($a['h']); ?></h3>
                    <p><?php echo esc_html($a['p']); ?></p>
                </div>
            <?php endforeach; ?>
        </div>
        <div class="company reveal">
            <dl>
                <?php foreach ($company as $k => $v) : ?>
                    <dt><?php echo esc_html($k); ?></dt>
                    <dd><?php echo esc_html($v); ?></dd>
                <?php endforeach; ?>
            </dl>
        </div>
        <div class="about-link">
            <a href="https://www.f-its.co.jp/about/" target="_blank" rel="noopener noreferrer">会社概要はこちら ↗</a>
        </div>
    </div>
</section>

<!-- FAQ -->
<section class="sec">
    <div class="container">
        <div class="sec-head reveal">
            <div class="tag">FAQ</div>
            <h2>よくあるご質問</h2>
        </div>
        <div class="faq-wrap reveal">
            <?php foreach ($faqs as $f) : ?>
                <details class="faq">
                    <summary>
                        <span class="q"><b>Q.</b><?php echo esc_html($f['q']); ?></span>
                        <span class="plus"></span>
                    </summary>
                    <div class="a"><?php echo esc_html($f['a']); ?></div>
                </details>
            <?php endforeach; ?>
        </div>
    </div>
</section>

<!-- Final CTA -->
<section class="final">
    <div class="container">
        <div class="final-card reveal">
            <h2>まずは、無料登録から。</h2>
            <p class="lead">エンタメ業界への第一歩を、いっしょに踏み出しましょう。ご相談だけでも歓迎です。</p>
            <div class="final-actions">
                <a href="<?php echo esc_url($signup); ?>" class="btn-cta btn-cta-lg" data-cta>無料で会員登録する<span class="arrow">→</span></a>
                <span class="cta-note">登録は1分・費用は一切かかりません</span>
            </div>
        </div>
    </div>
</section>

<?php
get_footer('lp');
