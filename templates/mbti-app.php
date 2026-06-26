<?php if ( ! defined( 'ABSPATH' ) ) { exit; } ?>
<div class="wrap" id="ctfApp">

  <!-- ===== INTRO ===== -->
  <section class="stage is-active" id="intro" aria-labelledby="intro-title">
    <div class="hero">
      <div class="hero-glow" aria-hidden="true"></div>
      <div class="eyebrow">キャリア・タイプ診断 · 16 types</div>
      <h1 id="intro-title">32の質問でわかる、<br>あなたの<span class="hl">仕事タイプ</span>。</h1>
      <p class="lead">4つの軸・32問・約5分。回答から<b>4つの仕事カラー</b>に分類し、16タイプのうちあなたに合う<b>職種</b>と強みを提示します。直感で、深く考えすぎずに答えるほど正確に出ます。</p>
      <div class="trust-row" aria-label="診断の特徴">
        <span class="trust-pill">無料</span>
        <span class="trust-pill">約5分</span>
        <span class="trust-pill">32問</span>
        <span class="trust-pill">16タイプ</span>
      </div>
      <div class="meta-row" role="list" aria-label="診断の概要">
        <div class="meta" role="listitem"><b>32</b><span>の質問</span></div>
        <div class="meta" role="listitem"><b>4</b><span>つの軸</span></div>
        <div class="meta" role="listitem"><b>16</b><span>タイプ</span></div>
        <div class="meta" role="listitem"><b>5</b><span>分ほど</span></div>
      </div>
    </div>

    <div class="color-strip" aria-label="4つの仕事カラー">
      <div class="color-chip" style="--gc:var(--grp-pl);--gbg:var(--grp-pl-bg)"><span>🟡</span>ビジネス・推進</div>
      <div class="color-chip" style="--gc:var(--grp-pc);--gbg:var(--grp-pc-bg)"><span>🟣</span>クリエイティブ・発信</div>
      <div class="color-chip" style="--gc:var(--grp-tl);--gbg:var(--grp-tl-bg)"><span>🔵</span>ロジカル・テクニカル</div>
      <div class="color-chip" style="--gc:var(--grp-tc);--gbg:var(--grp-tc-bg)"><span>🟢</span>ものづくり・デザイン</div>
    </div>

    <div class="card axis-preview">
      <div class="ttl">測定する 4 つの軸</div>
      <div class="axrow">
        <div class="axend"><span class="k teal">P</span>人 ・ 対人</div>
        <div class="axmid"><div class="nm">関心の方向</div><div class="track"></div></div>
        <div class="axend r">課題 ・ データ<span class="k violet">T</span></div>
      </div>
      <div class="axrow r">
        <div class="axend"><span class="k teal">L</span>論理 ・ 分析</div>
        <div class="axmid"><div class="nm">思考スタイル</div><div class="track"></div></div>
        <div class="axend r">創造 ・ 直感<span class="k violet">C</span></div>
      </div>
      <div class="axrow">
        <div class="axend"><span class="k teal">O</span>計画 ・ 秩序</div>
        <div class="axmid"><div class="nm">仕事の進め方</div><div class="track"></div></div>
        <div class="axend r">柔軟 ・ 即興<span class="k violet">F</span></div>
      </div>
      <div class="axrow r">
        <div class="axend"><span class="k teal">D</span>主導 ・ 牽引</div>
        <div class="axmid"><div class="nm">チームでの役割</div><div class="track"></div></div>
        <div class="axend r">支援 ・ 専門<span class="k violet">S</span></div>
      </div>
    </div>

    <div class="start-row">
      <button class="btn btn--start" type="button" onclick="start()">診断をはじめる</button>
      <p class="note">直感で、深く考えすぎずに答えるほど正確に出ます。</p>
    </div>

    <div class="cast">
      <div class="cast-lead">— 4つの仕事カラー × 16タイプ —</div>
      <div class="cast-row" id="castRow" aria-label="16タイプのプレビュー"></div>
      <button class="cast-btn" type="button" onclick="openGallery()">タイプ図鑑をぜんぶ見る →</button>
    </div>
  </section>

  <!-- ===== QUIZ ===== -->
  <section class="stage" id="quiz" aria-labelledby="quiz-label">
    <div class="quiz-ambient" id="quizAmbient" aria-hidden="true"></div>
    <div class="topbar">
      <div class="count" id="quiz-label">Q<em id="qnum">1</em> / 32</div>
      <div class="progress" role="progressbar" aria-valuemin="0" aria-valuemax="32" aria-valuenow="1" id="progressBar">
        <i id="bar"></i>
      </div>
      <div class="pct" id="qpct" aria-hidden="true">0%</div>
    </div>
    <div class="card q-card" id="qcard">
      <p class="q-text" id="qtext" tabindex="-1" aria-live="polite"></p>
      <div class="scale">
        <div class="scale-dots" id="dots" role="radiogroup" aria-label="この文は自分にどれくらい当てはまりますか"></div>
        <div class="scale-ends"><span class="agree">当てはまる</span><span class="disagree">当てはまらない</span></div>
        <p class="scale-hint" aria-hidden="true">キーボード：1〜7で回答、←で戻る</p>
      </div>
    </div>
    <div class="q-foot">
      <button class="back" id="back" type="button" onclick="back()" disabled aria-label="前の質問に戻る">← ひとつ戻る</button>
    </div>
  </section>

  <!-- ===== RESULT ===== -->
  <section class="stage" id="result" aria-live="polite"></section>

  <!-- ===== GALLERY ===== -->
  <section class="stage" id="gallery"></section>

</div>
