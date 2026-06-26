/* ============================================================
   AXES — the four career dichotomies
   pole1 = teal / positive direction ; pole2 = violet
   ============================================================ */
const AXES = [
  {nm:"関心の方向", p1:{k:"P",label:"人 ・ 対人"},      p2:{k:"T",label:"課題 ・ データ"}},
  {nm:"思考スタイル", p1:{k:"L",label:"論理 ・ 分析"},   p2:{k:"C",label:"創造 ・ 直感"}},
  {nm:"仕事の進め方", p1:{k:"O",label:"計画 ・ 秩序"},   p2:{k:"F",label:"柔軟 ・ 即興"}},
  {nm:"チームでの役割", p1:{k:"D",label:"主導 ・ 牽引"}, p2:{k:"S",label:"支援 ・ 専門"}},
];

/* Questions per axis. d:+1 agreeing -> pole1 (teal). d:-1 agreeing -> pole2 (violet). */
const Q = {
  0:[ {t:"新しい人と出会い、関わることに大きなやりがいを感じる。",d:1},
      {t:"一日中、人と関わるより、課題やデータにじっくり取り組む方が好きだ。",d:-1},
      {t:"誰かの役に立ち、感謝されることが強いモチベーションになる。",d:1},
      {t:"黙々と一つの問題を解き明かしていく作業に没頭できる。",d:-1},
      {t:"チームの雰囲気や人間関係の調整に、自然と気を配るほうだ。",d:1},
      {t:"仕事の成果は「人への影響」より「成し遂げた中身」で測りたい。",d:-1},
      {t:"相手の気持ちや反応を読み取るのが得意なほうだ。",d:1},
      {t:"機械・システム・数字を相手にする仕事に魅力を感じる。",d:-1} ],
  1:[ {t:"物事は、データや根拠にもとづいて筋道立てて判断したい。",d:1},
      {t:"前例のないアイデアやひらめきを形にすることにワクワクする。",d:-1},
      {t:"複雑な問題を、要素に分解して分析するのが得意だ。",d:1},
      {t:"細かいルールより、自由な発想で考えるほうが性に合っている。",d:-1},
      {t:"「なぜそうなるのか」という仕組みや因果関係を理解したい。",d:1},
      {t:"美しさ・世界観・表現といった、感性的な価値を大切にする。",d:-1},
      {t:"感覚的な意見より、客観的な数値やロジックを信頼する。",d:1},
      {t:"既存のやり方を、まったく新しい視点で作り変えたくなる。",d:-1} ],
  2:[ {t:"仕事は事前に計画を立て、見通しを持って進めたい。",d:1},
      {t:"予定が変わっても、その場の状況に合わせて動くのが得意だ。",d:-1},
      {t:"締め切りやタスクは、早めに片付けておかないと落ち着かない。",d:1},
      {t:"決まった手順より、臨機応変に進めるほうが好きだ。",d:-1},
      {t:"整理整頓された環境やルールがあると、力を発揮しやすい。",d:1},
      {t:"同じことの繰り返しより、変化や刺激の多い環境のほうがいい。",d:-1},
      {t:"物事を最後まで計画どおりにやり遂げることに満足を感じる。",d:1},
      {t:"思いついたら、まず動いてみてから考えるタイプだ。",d:-1} ],
  3:[ {t:"グループでは、自然と方向性を決めたり引っ張る役割になる。",d:1},
      {t:"前に出るより、誰かを後ろから支えるほうがやりがいを感じる。",d:-1},
      {t:"自分で意思決定し、責任を持って物事を動かしたい。",d:1},
      {t:"全体をまとめる人より、専門性で貢献する立場が心地よい。",d:-1},
      {t:"人を説得し、巻き込んで目標を達成するのが好きだ。",d:1},
      {t:"目立つポジションより、縁の下で確実に役割を果たしたい。",d:-1},
      {t:"競争や交渉の場面で、むしろ燃えるほうだ。",d:1},
      {t:"周囲との調和を保ちながら、協力して進めることを重視する。",d:-1} ],
};

/* Build an interleaved 32-question list (one per axis, round by round) */
const QUESTIONS = [];
for(let k=0;k<8;k++) for(let a=0;a<4;a++) QUESTIONS.push({axis:a, t:Q[a][k].t, d:Q[a][k].d});

/* 7-point scale: leftmost = strongest agree (+3) -> rightmost = strongest disagree (-3) */
const SCALE = [
  {v: 3, side:"agree",  size:54, label:"とても当てはまる"},
  {v: 2, side:"agree",  size:42, label:"当てはまる"},
  {v: 1, side:"agree",  size:32, label:"やや当てはまる"},
  {v: 0, side:"neutral",size:28, label:"どちらでもない"},
  {v:-1, side:"disagree",size:32,label:"やや当てはまらない"},
  {v:-2, side:"disagree",size:42,label:"当てはまらない"},
  {v:-3, side:"disagree",size:54,label:"まったく当てはまらない"},
];
const dotColor = s => s==="agree" ? "var(--teal)" : s==="disagree" ? "var(--violet)" : "var(--gray-dot)";

/* ============================================================
   TYPES — 16 career personalities
   ============================================================ */
const TYPES = {
"PLOD":{e:"🎯",name:"統率するマネージャー",nick:"司令塔",riasec:"企業的(E) × 慣習的(C)",
  essence:"人と組織を、計画と論理で前へ進める生まれながらのまとめ役。目標から逆算し、人を巻き込んで形にします。",
  strengths:["全体を俯瞰し、優先順位を即座につけられる","目標から逆算して計画を組み、実行しきる","公平でぶれない判断軸を持つ","責任を引き受けることをいとわない"],
  env:["役割と目標が明確な組織","裁量を持って意思決定できるポジション","成果がきちんと評価される環境"],
  careers:["経営者・事業責任者","プロジェクトマネージャー","人事・組織開発の責任者","経営コンサルタント","学校長・施設長","行政・公共のマネジメント","店舗・支社長"],
  warn:["効率を優先しすぎて人の感情を後回しにしがち","自分の基準を相手にも求め、厳しく映ることがある"],
  match:["PLFS","TLOS"]},
"PLOS":{e:"🤝",name:"支える調整役",nick:"縁の下のまとめ役",riasec:"慣習的(C) × 社会的(S)",
  essence:"ルールと段取りで、人と現場を着実に支える信頼の要。約束を守り、安心感を生み出します。",
  strengths:["約束・期限・手続きを正確に守る","人と仕組みの間に立って調整できる","細部まで目が届き、ミスを防ぐ","誠実で、まわりに安心感を与える"],
  env:["役割と手順が整った組織","人を支える制度・仕組みのある場所","安定の中で専門性を磨ける環境"],
  careers:["人事・労務","経理・財務（対顧客）","医療事務・病院運営","ファイナンシャルアドバイザー","学務・教務スタッフ","コンプライアンス・法務サポート","福祉のコーディネーター"],
  warn:["変化や前例のない事態に戸惑いやすい","頼まれごとを抱え込みすぎてしまう"],
  match:["PCFD","TLFD"]},
"PLFD":{e:"♟️",name:"戦略を操る交渉人",nick:"勝負師",riasec:"企業的(E) × 研究的(I)",
  essence:"論理と度胸で人を動かし、状況を読んで勝ち筋を作る策士。変化のただ中でこそ力を発揮します。",
  strengths:["相手と状況を分析し、交渉を有利に運ぶ","変化に強く、即断即決できる","説得力と行動力を兼ね備える","目標達成への執着が強い"],
  env:["成果と裁量が大きいポジション","スピードと変化のある業界","交渉・競争のある場面"],
  careers:["営業責任者・事業開発","起業家・スタートアップ創業者","弁護士（交渉・訴訟）","戦略コンサルタント","渉外・パブリックアフェアーズ","マーケティング戦略","投資・ファンド"],
  warn:["勝ちにこだわり、強引に見られることがある","短期成果を優先し、長期の信頼を軽視しがち"],
  match:["TLOS","PCOS"]},
"PLFS":{e:"🧭",name:"分析する助言者",nick:"参謀型サポーター",riasec:"社会的(S) × 研究的(I)",
  essence:"データと洞察で、人の悩みや判断にそっと最適解を差し出す相談役。冷静さと聞く力を併せ持ちます。",
  strengths:["客観的に状況を分析して助言できる","相手に合わせて柔軟に対応する","課題の本質を見抜く","冷静さと傾聴力を併せ持つ"],
  env:["一対一・少人数で人に向き合える場","専門知識を活かせる相談・支援職","状況に応じて動ける裁量"],
  careers:["アドバイザリー・コンサルタント","コーチ・キャリアカウンセラー","ファイナンシャルプランナー","UXリサーチャー","カスタマーサクセス","心理カウンセラー（認知行動系）","リクルーター"],
  warn:["分析しすぎて決断や行動が遅れる","感情より正論を優先し、冷たく映ることがある"],
  match:["PLOD","TCFD"]},
"PCOD":{e:"🎬",name:"魅せるプロデューサー",nick:"旗振り役",riasec:"企業的(E) × 芸術的(A)",
  essence:"世界観を描き、人をまとめて形にする創造のリーダー。創造性と段取り力を両立させます。",
  strengths:["ビジョンを示して人を惹きつける","創造性と段取り力を両立する","トレンドや人の感性を読む","プロジェクトを最後まで束ねる"],
  env:["創造性が評価される組織","チームを率いてものを生み出す場","ブランド・体験をつくるポジション"],
  careers:["クリエイティブディレクター","ブランドマネージャー","イベント・公演プロデューサー","編集長","広告・マーケティング責任者","文化事業・NPOのディレクター","プロダクトマネージャー（体験志向）"],
  warn:["理想を追って現実の制約と衝突しやすい","注目を集めたい気持ちが先に出ることがある"],
  match:["TCOS","PLFS"]},
"PCOS":{e:"🌱",name:"育てる表現者",nick:"伝え手",riasec:"芸術的(A) × 社会的(S)",
  essence:"創造性とやさしさで、人の学びや成長を形にして届ける育成者。相手の個性を引き出します。",
  strengths:["わかりやすく、魅力的に伝える","相手の個性を引き出し育てる","創造性を秩序立てて形にする","丁寧で面倒見がよい"],
  env:["人の成長・学びに関わる場","創造性を活かせる教育・発信の場","落ち着いて作り込める環境"],
  careers:["教員（国語・芸術・人文）","カリキュラム・教材デザイナー","コンテンツクリエイター","広報・コミュニケーション","美術館・博物館の教育担当","アートセラピスト","インストラクショナルデザイナー"],
  warn:["相手を気づかいすぎて、自分の主張を抑えがち","こだわりが強く、時間をかけすぎることがある"],
  match:["TLFD","PCFD"]},
"PCFD":{e:"🔥",name:"人を動かすイノベーター",nick:"火付け役",riasec:"企業的(E) × 芸術的(A) × 社会的(S)",
  essence:"ひらめきと熱量で人を巻き込み、新しい流れを生み出す扇動者。場の空気をつくるのが得意です。",
  strengths:["人を惹きつけ巻き込む熱量とカリスマ","既成概念にとらわれず発想する","変化を恐れず即興で動く","場の空気をつくるのがうまい"],
  env:["自由度の高い創造・新規事業の場","変化とスピードのある環境","人前で発信・表現できる場"],
  careers:["起業家（消費者・クリエイティブ領域）","講演者・発信者","映像・メディアプロデューサー","ムーブメント/キャンペーンの主導者","クリエイター起業・インフルエンサー","コミュニティオーガナイザー"],
  warn:["熱しやすく冷めやすく、詰めが甘くなりがち","思いつきで周囲を振り回すことがある"],
  match:["PLOS","TCOS"]},
"PCFS":{e:"💛",name:"寄り添う共感者",nick:"聞き手",riasec:"社会的(S) × 芸術的(A)",
  essence:"ゆたかな感受性で人の心に寄り添い、そっと支える理解者。多様な人を偏見なく受け入れます。",
  strengths:["相手の気持ちを敏感に汲み取る","押しつけず、柔らかく支える","想像力ゆたかで、言葉や物語に強い","偏見なく多様な人を受け入れる"],
  env:["一人ひとりに向き合える支援の場","競争より協力・共感のある環境","自分のペースで関われる場"],
  careers:["カウンセラー・セラピスト","ソーシャルワーカー","ライター・記者（人を描く）","保育・幼児教育","地域・福祉のプログラム担当","人材・組織カルチャー","デザイナー（協働型）"],
  warn:["人の感情を背負いすぎて消耗しやすい","対立や厳しい判断を避けがち"],
  match:["TLFD","PLOD"]},
"TLOD":{e:"⚙️",name:"最適化する司令官",nick:"現場の指揮官",riasec:"慣習的(C) × 現実的(R) × 企業的(E)",
  essence:"仕組みと数字を読み、計画的に成果を最大化する実務の司令塔。計画を着実に実行しきります。",
  strengths:["複雑な業務を構造化して回す","効率とリスクを見極め最適化する","計画を着実に実行しきる","数字と現実にもとづいて判断する"],
  env:["オペレーションやシステムを動かす現場","成果・効率が明確に測られる環境","裁量を持って改善できるポジション"],
  careers:["エンジニアリングマネージャー","生産・物流・サプライチェーン責任者","経営管理・財務（FP&A）","IT・インフラのマネージャー","品質・プロセス改善リーダー","建設・工事の現場責任者"],
  warn:["効率重視で、人の感情や意欲を見落としがち","計画外の“柔らかい”問題に弱い"],
  match:["TLFS","PLOS"]},
"TLOS":{e:"🔬",name:"精密な専門家",nick:"縁の下の技術者",riasec:"慣習的(C) × 研究的(I) × 現実的(R)",
  essence:"正確さと粘りで、複雑な仕事を確実に積み上げる専門職人。信頼できる安定した成果を出します。",
  strengths:["細部まで正確に処理する集中力","論理的に問題を切り分ける","コツコツ積み上げる粘り強さ","信頼できる安定したアウトプット"],
  env:["専門性を深く追求できる環境","正確さが評価される仕事","落ち着いて没頭できる場"],
  careers:["ソフトウェアエンジニア（バックエンド）","データアナリスト","会計士・監査・税理士","アクチュアリー","研究・検査技術者","金融・財務アナリスト","データベース／インフラ管理","土木・建築設計"],
  warn:["完璧を求めすぎて時間がかかる","視野が狭くなり全体最適を見失いがち"],
  match:["TLFD","PLOD"]},
"TLFD":{e:"🚀",name:"革新する戦略家",nick:"開発リーダー",riasec:"研究的(I) × 企業的(E)",
  essence:"論理と機動力で、技術や事業の最前線を切り開く革新の旗手。リスクを取り、成長を加速させます。",
  strengths:["本質を見抜き、戦略に落とし込む","新技術・新領域を素早く学び取り込む","リスクを取って意思決定する","成長を加速させる推進力"],
  env:["技術・事業の最前線","スピードと自由度のある環境","成果と挑戦が評価される場"],
  careers:["スタートアップ創業者・CTO","プロダクトマネージャー（技術）","戦略コンサルタント","トレーダー・クオンツ","R&D・研究開発リーダー","ベンチャーキャピタリスト","グロース／データ責任者"],
  warn:["興味が移りやすく、地道な運用を軽視しがち","周囲のスピードを置き去りにすることがある"],
  match:["TLOS","PCOS"]},
"TLFS":{e:"🧪",name:"探究する研究者",nick:"真理の追求者",riasec:"研究的(I) × 現実的(R)",
  essence:"尽きない好奇心で、未知の問いを解き明かしていく探究者。一つのテーマを深く掘り下げます。",
  strengths:["深く考え、仮説を立てて検証する","新しい問いやデータに柔軟に向き合う","客観的で論理的な思考","一つのテーマを掘り下げる集中力"],
  env:["探究・実験・分析ができる場","自分のペースと裁量がある環境","専門性が尊重される場"],
  careers:["研究者・科学者","データサイエンティスト","ソフトウェアエンジニア（探索的）","医師（診断・専門）","アナリスト","法医・フォレンジック","技術系コンサルタント"],
  warn:["探究に没頭し、締め切りや実用を後回しにしがち","理屈が先に立ち、人との温度差が出やすい"],
  match:["TLOD","PCFD"]},
"TCOD":{e:"🏛️",name:"形にする設計者",nick:"ものづくりの統率者",riasec:"芸術的(A) × 現実的(R) × 企業的(E)",
  essence:"美しさと機能を両立させ、計画的にかたちを生み出す設計者。全体設計から細部まで一貫して描きます。",
  strengths:["創造性を構造と両立させる","全体設計から細部まで一貫して描く","品質基準を保ちチームを導く","美意識と論理のバランス"],
  env:["ものや体験をつくり上げる現場","創造と品質の両方が求められる場","設計から完成まで関われる環境"],
  careers:["建築家","プロダクト・インダストリアルデザイナー","エンジニアリングリード（製品）","UXデザインリード","ゲームディレクター","デザインファーム経営","クリエイティブテクノロジスト"],
  warn:["品質へのこだわりが進行を遅らせることがある","妥協が苦手で、衝突を生みやすい"],
  match:["PCOS","TLFS"]},
"TCOS":{e:"🎨",name:"磨き上げる職人",nick:"作り手",riasec:"芸術的(A) × 現実的(R) × 慣習的(C)",
  essence:"ていねいな手仕事で、こだわりのものを静かに磨き上げる職人。自分の世界観を持っています。",
  strengths:["細部まで作り込む美意識と技術","集中して完成度を高める","創造性を着実に形にする","自分の世界観を持つ"],
  env:["創作・制作に没頭できる環境","品質と表現が評価される場","落ち着いて作り込める時間"],
  careers:["デザイナー（グラフィック・UI・プロダクト）","イラストレーター","職人・工芸作家","テクニカルライター","アニメーター","建築・設計スタッフ","料理人・パティシエ","フロントエンド開発（表現志向）"],
  warn:["こだわりすぎて納期や採算を見失いがち","自分の世界に閉じ、発信が弱くなる"],
  match:["TCOD","PCOS"]},
"TCFD":{e:"💡",name:"未知を切り拓く開拓者",nick:"発明家",riasec:"芸術的(A) × 企業的(E) × 研究的(I)",
  essence:"大胆な発想と行動で、まだ無いものを生み出すパイオニア。0→1を生み出す突破力があります。",
  strengths:["常識を超えて発想する","試行錯誤を恐れず手を動かす","変化と不確実性を楽しむ","0→1を生み出す突破力"],
  env:["自由に試せる創造・開発の場","不確実でも挑戦できる環境","成果と独創が評価される場"],
  careers:["起業家（プロダクト・クリエイティブ）","発明家・メーカー創業者","クリエイティブディレクター（デジタル）","アーティスト起業家","ゲームデザイナー（インディー）","映画・映像監督","新規プロダクト開発リード"],
  warn:["飽きやすく、一つを完成させきれないことがある","突っ走って周囲の理解を置き去りにする"],
  match:["TCOS","PLFS"]},
"TCFS":{e:"🪐",name:"自由に創る表現者",nick:"一匹狼のクリエイター",riasec:"芸術的(A) × 現実的(R)",
  essence:"しばられず、自分の感性のままに世界を表現する自由人。直感とひらめきに正直です。",
  strengths:["独自の世界観と表現力","既成のやり方にとらわれない","興味の赴くまま深く創る","直感とひらめきに正直"],
  env:["自由と裁量の大きい創作の場","規則より発想が活きる環境","自分のペースで進められる場"],
  careers:["アーティスト","作家・小説家","ミュージシャン","フリーランスデザイナー","写真家","映像作家","ゲームアーティスト","独立系開発者・クリエイター"],
  warn:["自由を求め、組織や締め切りと衝突しがち","収入や働き方が不規則になりやすい"],
  match:["TCFD","PCFS"]},
};

const AVATARS = {"PLOD": "<svg viewBox=\"0 0 120 120\" xmlns=\"http://www.w3.org/2000/svg\"><defs><clipPath id=\"cPLOD\"><circle cx=\"60\" cy=\"60\" r=\"58\"/></clipPath></defs><circle cx=\"60\" cy=\"60\" r=\"58\" fill=\"#f0e6d5\"/><g clip-path=\"url(#cPLOD)\"><polygon points=\"0,0 120,0 0,130\" fill=\"#f4ede1\"/><polygon points=\"0,130 120,130 120,38\" fill=\"#ebdec6\"/><polygon points=\"14,122 27,99 60,92 93,99 106,122\" fill=\"#77571f\"/><polygon points=\"14,122 27,99 60,92 60,122\" fill=\"#896523\"/><polygon points=\"60,92 93,99 106,122 60,122\" fill=\"#614719\"/><polygon points=\"50,93 60,107 70,93\" fill=\"#c8a465\"/><polygon points=\"50,93 60,103 54,95\" fill=\"#b68733\"/><polygon points=\"70,93 60,103 66,95\" fill=\"#b68733\"/><polygon points=\"57,95 63,95 62,114 58,114\" fill=\"#513b15\"/><polygon points=\"55,84 65,84 64,98 56,98\" fill=\"#cba96d\"/><polygon points=\"55,84 60,98 56,98\" fill=\"#d4b886\"/><polygon points=\"38,47 41,24 60,16 79,24 82,47 74,32 60,29 46,32\" fill=\"#6c4f1c\"/><polygon points=\"60,27 45,31 60,47\" fill=\"#d9c094\"/><polygon points=\"60,27 60,47 75,31\" fill=\"#d5ba8a\"/><polygon points=\"45,31 38,46 50,48 60,47\" fill=\"#d7bd8e\"/><polygon points=\"75,31 60,47 70,48 82,46\" fill=\"#ceaf77\"/><polygon points=\"38,46 40,61 50,62 50,48\" fill=\"#d5ba8a\"/><polygon points=\"82,46 70,48 70,62 80,61\" fill=\"#cdad73\"/><polygon points=\"50,48 50,62 60,75 70,62 70,48 60,47\" fill=\"#d3b784\"/><polygon points=\"40,61 50,74 60,75 50,62\" fill=\"#d0b27b\"/><polygon points=\"80,61 70,62 60,75 70,74\" fill=\"#cba96d\"/><polygon points=\"50,74 60,86 60,75\" fill=\"#ceaf77\"/><polygon points=\"70,74 60,75 60,86\" fill=\"#c9a769\"/><polygon points=\"43,52 50,56 45,60\" fill=\"#dec9a3\"/><polygon points=\"77,52 70,56 75,60\" fill=\"#d8bf92\"/><polygon points=\"60,55 56,64 60,65\" fill=\"#dac399\"/><polygon points=\"60,55 60,65 64,64\" fill=\"#ccac71\"/><polygon points=\"38,47 46,32 60,29 74,32 82,47 72,39 60,41 48,39\" fill=\"#7b5a1f\"/><polygon points=\"46,32 60,29 60,41 48,39\" fill=\"#896523\"/><polygon points=\"60,29 74,32 72,39 60,41\" fill=\"#654a1a\"/><polygon points=\"46,50 56,48.5 56,50.5 46,52\" fill=\"#4c3713\"/><polygon points=\"64,48.5 74,50 74,52 64,50.5\" fill=\"#4c3713\"/><polygon points=\"47.4,55.5 51,54 54.6,55.5 51,57.2\" fill=\"#4c3713\"/><circle cx=\"49.8\" cy=\"55\" r=\"0.9\" fill=\"#fff\" opacity=\"0.85\"/><polygon points=\"65.4,55.5 69,54 72.6,55.5 69,57.2\" fill=\"#4c3713\"/><circle cx=\"67.8\" cy=\"55\" r=\"0.9\" fill=\"#fff\" opacity=\"0.85\"/><polygon points=\"54.5,75 60,76.2 65.5,75 63,77.4 60,78 57,77.4\" fill=\"#6c4f1c\"/></g></svg>", "PLOS": "<svg viewBox=\"0 0 120 120\" xmlns=\"http://www.w3.org/2000/svg\"><defs><clipPath id=\"cPLOS\"><circle cx=\"60\" cy=\"60\" r=\"58\"/></clipPath></defs><circle cx=\"60\" cy=\"60\" r=\"58\" fill=\"#f0e6d5\"/><g clip-path=\"url(#cPLOS)\"><polygon points=\"0,0 120,0 0,130\" fill=\"#f4ede1\"/><polygon points=\"0,130 120,130 120,38\" fill=\"#ebdec6\"/><polygon points=\"14,122 27,99 60,92 93,99 106,122\" fill=\"#77571f\"/><polygon points=\"14,122 27,99 60,92 60,122\" fill=\"#896523\"/><polygon points=\"60,92 93,99 106,122 60,122\" fill=\"#614719\"/><polygon points=\"50,94 55,101 60,103 65,101 70,94 66,99 60,100 54,99\" fill=\"#a2772a\"/><polygon points=\"55,84 65,84 64,98 56,98\" fill=\"#cba96d\"/><polygon points=\"55,84 60,98 56,98\" fill=\"#d4b886\"/><polygon points=\"54,22 60,16 66,22 64,28 56,28\" fill=\"#684d1b\"/><polygon points=\"60,27 45,31 60,47\" fill=\"#d9c094\"/><polygon points=\"60,27 60,47 75,31\" fill=\"#d5ba8a\"/><polygon points=\"45,31 38,46 50,48 60,47\" fill=\"#d7bd8e\"/><polygon points=\"75,31 60,47 70,48 82,46\" fill=\"#ceaf77\"/><polygon points=\"38,46 40,61 50,62 50,48\" fill=\"#d5ba8a\"/><polygon points=\"82,46 70,48 70,62 80,61\" fill=\"#cdad73\"/><polygon points=\"50,48 50,62 60,75 70,62 70,48 60,47\" fill=\"#d3b784\"/><polygon points=\"40,61 50,74 60,75 50,62\" fill=\"#d0b27b\"/><polygon points=\"80,61 70,62 60,75 70,74\" fill=\"#cba96d\"/><polygon points=\"50,74 60,86 60,75\" fill=\"#ceaf77\"/><polygon points=\"70,74 60,75 60,86\" fill=\"#c9a769\"/><polygon points=\"43,52 50,56 45,60\" fill=\"#dec9a3\"/><polygon points=\"77,52 70,56 75,60\" fill=\"#d8bf92\"/><polygon points=\"60,55 56,64 60,65\" fill=\"#dac399\"/><polygon points=\"60,55 60,65 64,64\" fill=\"#ccac71\"/><polygon points=\"38,47 46,32 60,29 74,32 82,47 72,39 60,41 48,39\" fill=\"#7b5a1f\"/><polygon points=\"46,32 60,29 60,41 48,39\" fill=\"#896523\"/><polygon points=\"60,29 74,32 72,39 60,41\" fill=\"#654a1a\"/><polygon points=\"46,50 56,48.5 56,50.5 46,52\" fill=\"#4c3713\"/><polygon points=\"64,48.5 74,50 74,52 64,50.5\" fill=\"#4c3713\"/><polygon points=\"47.4,55.5 51,54 54.6,55.5 51,57.2\" fill=\"#4c3713\"/><circle cx=\"49.8\" cy=\"55\" r=\"0.9\" fill=\"#fff\" opacity=\"0.85\"/><polygon points=\"65.4,55.5 69,54 72.6,55.5 69,57.2\" fill=\"#4c3713\"/><circle cx=\"67.8\" cy=\"55\" r=\"0.9\" fill=\"#fff\" opacity=\"0.85\"/><polygon points=\"54.5,75 60,76.2 65.5,75 63,77.4 60,78 57,77.4\" fill=\"#6c4f1c\"/><polyline points=\"53,93 57,105\" fill=\"none\" stroke=\"#5a4217\" stroke-width=\"2.4\"/><polyline points=\"67,93 63,105\" fill=\"none\" stroke=\"#5a4217\" stroke-width=\"2.4\"/><polygon points=\"53,104 67,104 67,114 53,114\" fill=\"#d2b582\"/><polygon points=\"56,106 60,106 60,112 56,112\" fill=\"#906a25\"/></g></svg>", "PLFD": "<svg viewBox=\"0 0 120 120\" xmlns=\"http://www.w3.org/2000/svg\"><defs><clipPath id=\"cPLFD\"><circle cx=\"60\" cy=\"60\" r=\"58\"/></clipPath></defs><circle cx=\"60\" cy=\"60\" r=\"58\" fill=\"#f0e6d5\"/><g clip-path=\"url(#cPLFD)\"><polygon points=\"0,0 120,0 0,130\" fill=\"#f4ede1\"/><polygon points=\"0,130 120,130 120,38\" fill=\"#ebdec6\"/><polygon points=\"14,122 27,99 60,92 93,99 106,122\" fill=\"#77571f\"/><polygon points=\"14,122 27,99 60,92 60,122\" fill=\"#896523\"/><polygon points=\"60,92 93,99 106,122 60,122\" fill=\"#614719\"/><polygon points=\"50,93 60,106 70,93\" fill=\"#c39d58\"/><polygon points=\"50,93 60,103 54,95\" fill=\"#a2772a\"/><polygon points=\"70,93 60,103 66,95\" fill=\"#a2772a\"/><polygon points=\"64,97 70,97 69,101 64,101\" fill=\"#ceae75\"/><polygon points=\"55,84 65,84 64,98 56,98\" fill=\"#cba96d\"/><polygon points=\"55,84 60,98 56,98\" fill=\"#d4b886\"/><polygon points=\"38,47 41,24 60,16 79,24 82,47 74,32 60,29 46,32\" fill=\"#6c4f1c\"/><polygon points=\"60,27 45,31 60,47\" fill=\"#d9c094\"/><polygon points=\"60,27 60,47 75,31\" fill=\"#d5ba8a\"/><polygon points=\"45,31 38,46 50,48 60,47\" fill=\"#d7bd8e\"/><polygon points=\"75,31 60,47 70,48 82,46\" fill=\"#ceaf77\"/><polygon points=\"38,46 40,61 50,62 50,48\" fill=\"#d5ba8a\"/><polygon points=\"82,46 70,48 70,62 80,61\" fill=\"#cdad73\"/><polygon points=\"50,48 50,62 60,75 70,62 70,48 60,47\" fill=\"#d3b784\"/><polygon points=\"40,61 50,74 60,75 50,62\" fill=\"#d0b27b\"/><polygon points=\"80,61 70,62 60,75 70,74\" fill=\"#cba96d\"/><polygon points=\"50,74 60,86 60,75\" fill=\"#ceaf77\"/><polygon points=\"70,74 60,75 60,86\" fill=\"#c9a769\"/><polygon points=\"43,52 50,56 45,60\" fill=\"#dec9a3\"/><polygon points=\"77,52 70,56 75,60\" fill=\"#d8bf92\"/><polygon points=\"60,55 56,64 60,65\" fill=\"#dac399\"/><polygon points=\"60,55 60,65 64,64\" fill=\"#ccac71\"/><polygon points=\"38,47 46,32 60,29 74,32 82,47 72,39 60,41 48,39\" fill=\"#7b5a1f\"/><polygon points=\"46,32 60,29 60,41 48,39\" fill=\"#896523\"/><polygon points=\"60,29 74,32 72,39 60,41\" fill=\"#654a1a\"/><polygon points=\"46,50 56,48.5 56,50.5 46,52\" fill=\"#4c3713\"/><polygon points=\"64,48.5 74,50 74,52 64,50.5\" fill=\"#4c3713\"/><polygon points=\"47.4,55.5 51,54 54.6,55.5 51,57.2\" fill=\"#4c3713\"/><circle cx=\"49.8\" cy=\"55\" r=\"0.9\" fill=\"#fff\" opacity=\"0.85\"/><polygon points=\"65.4,55.5 69,54 72.6,55.5 69,57.2\" fill=\"#4c3713\"/><circle cx=\"67.8\" cy=\"55\" r=\"0.9\" fill=\"#fff\" opacity=\"0.85\"/><polygon points=\"54.5,75 60,76.2 65.5,75 63,77.4 60,78 57,77.4\" fill=\"#6c4f1c\"/><polygon points=\"78,100 102,100 102,116 78,116\" fill=\"#876323\"/><polygon points=\"78,100 102,100 102,104 78,104\" fill=\"#634919\"/><polygon points=\"86,96 94,96 94,100 86,100\" fill=\"#634919\"/></g></svg>", "PLFS": "<svg viewBox=\"0 0 120 120\" xmlns=\"http://www.w3.org/2000/svg\"><defs><clipPath id=\"cPLFS\"><circle cx=\"60\" cy=\"60\" r=\"58\"/></clipPath></defs><circle cx=\"60\" cy=\"60\" r=\"58\" fill=\"#f0e6d5\"/><g clip-path=\"url(#cPLFS)\"><polygon points=\"0,0 120,0 0,130\" fill=\"#f4ede1\"/><polygon points=\"0,130 120,130 120,38\" fill=\"#ebdec6\"/><polygon points=\"14,122 27,99 60,92 93,99 106,122\" fill=\"#77571f\"/><polygon points=\"14,122 27,99 60,92 60,122\" fill=\"#896523\"/><polygon points=\"60,92 93,99 106,122 60,122\" fill=\"#614719\"/><polygon points=\"50,93 60,106 70,93\" fill=\"#c39d58\"/><polygon points=\"50,93 60,103 54,95\" fill=\"#a2772a\"/><polygon points=\"70,93 60,103 66,95\" fill=\"#a2772a\"/><polygon points=\"64,97 70,97 69,101 64,101\" fill=\"#ceae75\"/><polygon points=\"55,84 65,84 64,98 56,98\" fill=\"#cba96d\"/><polygon points=\"55,84 60,98 56,98\" fill=\"#d4b886\"/><polygon points=\"38,47 41,24 60,16 79,24 82,47 74,32 60,29 46,32\" fill=\"#6c4f1c\"/><polygon points=\"60,27 45,31 60,47\" fill=\"#d9c094\"/><polygon points=\"60,27 60,47 75,31\" fill=\"#d5ba8a\"/><polygon points=\"45,31 38,46 50,48 60,47\" fill=\"#d7bd8e\"/><polygon points=\"75,31 60,47 70,48 82,46\" fill=\"#ceaf77\"/><polygon points=\"38,46 40,61 50,62 50,48\" fill=\"#d5ba8a\"/><polygon points=\"82,46 70,48 70,62 80,61\" fill=\"#cdad73\"/><polygon points=\"50,48 50,62 60,75 70,62 70,48 60,47\" fill=\"#d3b784\"/><polygon points=\"40,61 50,74 60,75 50,62\" fill=\"#d0b27b\"/><polygon points=\"80,61 70,62 60,75 70,74\" fill=\"#cba96d\"/><polygon points=\"50,74 60,86 60,75\" fill=\"#ceaf77\"/><polygon points=\"70,74 60,75 60,86\" fill=\"#c9a769\"/><polygon points=\"43,52 50,56 45,60\" fill=\"#dec9a3\"/><polygon points=\"77,52 70,56 75,60\" fill=\"#d8bf92\"/><polygon points=\"60,55 56,64 60,65\" fill=\"#dac399\"/><polygon points=\"60,55 60,65 64,64\" fill=\"#ccac71\"/><polygon points=\"38,47 46,32 60,29 74,32 82,47 72,39 60,41 48,39\" fill=\"#7b5a1f\"/><polygon points=\"46,32 60,29 60,41 48,39\" fill=\"#896523\"/><polygon points=\"60,29 74,32 72,39 60,41\" fill=\"#654a1a\"/><polygon points=\"46,50 56,48.5 56,50.5 46,52\" fill=\"#4c3713\"/><polygon points=\"64,48.5 74,50 74,52 64,50.5\" fill=\"#4c3713\"/><polygon points=\"47.4,55.5 51,54 54.6,55.5 51,57.2\" fill=\"#4c3713\"/><circle cx=\"49.8\" cy=\"55\" r=\"0.9\" fill=\"#fff\" opacity=\"0.85\"/><polygon points=\"65.4,55.5 69,54 72.6,55.5 69,57.2\" fill=\"#4c3713\"/><circle cx=\"67.8\" cy=\"55\" r=\"0.9\" fill=\"#fff\" opacity=\"0.85\"/><g><rect x=\"46\" y=\"51.5\" width=\"10\" height=\"8\" rx=\"2.5\" fill=\"none\" stroke=\"#443211\" stroke-width=\"1.8\"/><rect x=\"64\" y=\"51.5\" width=\"10\" height=\"8\" rx=\"2.5\" fill=\"none\" stroke=\"#443211\" stroke-width=\"1.8\"/><line x1=\"56\" y1=\"55\" x2=\"64\" y2=\"55\" stroke=\"#443211\" stroke-width=\"1.8\"/></g><polygon points=\"54.5,75 60,76.2 65.5,75 63,77.4 60,78 57,77.4\" fill=\"#6c4f1c\"/><polygon points=\"78,97 98,97 98,116 78,116\" fill=\"#ceae75\"/><polygon points=\"84,94 92,94 92,98 84,98\" fill=\"#906a25\"/><polygon points=\"81,103 95,103 95,105 81,105\" fill=\"#876323\"/><polygon points=\"81,108 91,108 91,110 81,110\" fill=\"#876323\"/></g></svg>", "PCOD": "<svg viewBox=\"0 0 120 120\" xmlns=\"http://www.w3.org/2000/svg\"><defs><clipPath id=\"cPCOD\"><circle cx=\"60\" cy=\"60\" r=\"58\"/></clipPath></defs><circle cx=\"60\" cy=\"60\" r=\"58\" fill=\"#e5dfed\"/><g clip-path=\"url(#cPCOD)\"><polygon points=\"0,0 120,0 0,130\" fill=\"#ece9f2\"/><polygon points=\"0,130 120,130 120,38\" fill=\"#dcd4e7\"/><polygon points=\"14,122 27,99 60,92 93,99 106,122\" fill=\"#53416e\"/><polygon points=\"14,122 27,99 60,92 60,122\" fill=\"#5f4b7f\"/><polygon points=\"60,92 93,99 106,122 60,122\" fill=\"#44355a\"/><polygon points=\"50,93 50,99 60,102 70,99 70,93 60,96\" fill=\"#765d9d\"/><polygon points=\"50,93 60,96 60,102 50,99\" fill=\"#856cad\"/><polygon points=\"55,84 65,84 64,98 56,98\" fill=\"#a491c2\"/><polygon points=\"55,84 60,98 56,98\" fill=\"#b4a4cc\"/><polygon points=\"38,47 41,24 60,16 79,24 82,47 74,32 60,29 46,32\" fill=\"#4b3b64\"/><polygon points=\"60,27 45,31 60,47\" fill=\"#bdafd2\"/><polygon points=\"60,27 60,47 75,31\" fill=\"#b6a7ce\"/><polygon points=\"45,31 38,46 50,48 60,47\" fill=\"#b9aad0\"/><polygon points=\"75,31 60,47 70,48 82,46\" fill=\"#ab99c6\"/><polygon points=\"38,46 40,61 50,62 50,48\" fill=\"#b6a7ce\"/><polygon points=\"82,46 70,48 70,62 80,61\" fill=\"#a896c4\"/><polygon points=\"50,48 50,62 60,75 70,62 70,48 60,47\" fill=\"#b2a2cb\"/><polygon points=\"40,61 50,74 60,75 50,62\" fill=\"#ad9cc8\"/><polygon points=\"80,61 70,62 60,75 70,74\" fill=\"#a491c2\"/><polygon points=\"50,74 60,86 60,75\" fill=\"#ab99c6\"/><polygon points=\"70,74 60,75 60,86\" fill=\"#a28ec0\"/><polygon points=\"43,52 50,56 45,60\" fill=\"#c6bad8\"/><polygon points=\"77,52 70,56 75,60\" fill=\"#bbadd1\"/><polygon points=\"60,55 56,64 60,65\" fill=\"#bfb2d4\"/><polygon points=\"60,55 60,65 64,64\" fill=\"#a794c3\"/><polygon points=\"38,47 46,32 60,29 74,32 82,47 72,39 60,41 48,39\" fill=\"#554372\"/><polygon points=\"46,32 60,29 60,41 48,39\" fill=\"#5f4b7f\"/><polygon points=\"60,29 74,32 72,39 60,41\" fill=\"#46375e\"/><polygon points=\"46,50 56,48.5 56,50.5 46,52\" fill=\"#342946\"/><polygon points=\"64,48.5 74,50 74,52 64,50.5\" fill=\"#342946\"/><polygon points=\"47.4,55.5 51,54 54.6,55.5 51,57.2\" fill=\"#342946\"/><circle cx=\"49.8\" cy=\"55\" r=\"0.9\" fill=\"#fff\" opacity=\"0.85\"/><polygon points=\"65.4,55.5 69,54 72.6,55.5 69,57.2\" fill=\"#342946\"/><circle cx=\"67.8\" cy=\"55\" r=\"0.9\" fill=\"#fff\" opacity=\"0.85\"/><polygon points=\"54.5,75 60,76.2 65.5,75 63,77.4 60,78 57,77.4\" fill=\"#4b3b64\"/><polygon points=\"76,100 102,96 103,102 77,106\" fill=\"#3f3154\"/><polygon points=\"76,106 103,102 103,118 76,118\" fill=\"#5e4a7e\"/><polygon points=\"79,101 83,100.4 81,104 77,104.6\" fill=\"#beb1d3\"/><polygon points=\"88,99.6 92,99 90,102.6 86,103.2\" fill=\"#beb1d3\"/></g></svg>", "PCOS": "<svg viewBox=\"0 0 120 120\" xmlns=\"http://www.w3.org/2000/svg\"><defs><clipPath id=\"cPCOS\"><circle cx=\"60\" cy=\"60\" r=\"58\"/></clipPath></defs><circle cx=\"60\" cy=\"60\" r=\"58\" fill=\"#e5dfed\"/><g clip-path=\"url(#cPCOS)\"><polygon points=\"0,0 120,0 0,130\" fill=\"#ece9f2\"/><polygon points=\"0,130 120,130 120,38\" fill=\"#dcd4e7\"/><polygon points=\"14,122 27,99 60,92 93,99 106,122\" fill=\"#53416e\"/><polygon points=\"14,122 27,99 60,92 60,122\" fill=\"#5f4b7f\"/><polygon points=\"60,92 93,99 106,122 60,122\" fill=\"#44355a\"/><polygon points=\"50,94 55,101 60,103 65,101 70,94 66,99 60,100 54,99\" fill=\"#715997\"/><polygon points=\"55,84 65,84 64,98 56,98\" fill=\"#a491c2\"/><polygon points=\"55,84 60,98 56,98\" fill=\"#b4a4cc\"/><polygon points=\"38,47 41,24 60,16 79,24 82,47 74,32 60,29 46,32\" fill=\"#4b3b64\"/><polygon points=\"60,27 45,31 60,47\" fill=\"#bdafd2\"/><polygon points=\"60,27 60,47 75,31\" fill=\"#b6a7ce\"/><polygon points=\"45,31 38,46 50,48 60,47\" fill=\"#b9aad0\"/><polygon points=\"75,31 60,47 70,48 82,46\" fill=\"#ab99c6\"/><polygon points=\"38,46 40,61 50,62 50,48\" fill=\"#b6a7ce\"/><polygon points=\"82,46 70,48 70,62 80,61\" fill=\"#a896c4\"/><polygon points=\"50,48 50,62 60,75 70,62 70,48 60,47\" fill=\"#b2a2cb\"/><polygon points=\"40,61 50,74 60,75 50,62\" fill=\"#ad9cc8\"/><polygon points=\"80,61 70,62 60,75 70,74\" fill=\"#a491c2\"/><polygon points=\"50,74 60,86 60,75\" fill=\"#ab99c6\"/><polygon points=\"70,74 60,75 60,86\" fill=\"#a28ec0\"/><polygon points=\"43,52 50,56 45,60\" fill=\"#c6bad8\"/><polygon points=\"77,52 70,56 75,60\" fill=\"#bbadd1\"/><polygon points=\"60,55 56,64 60,65\" fill=\"#bfb2d4\"/><polygon points=\"60,55 60,65 64,64\" fill=\"#a794c3\"/><polygon points=\"38,47 46,32 60,29 74,32 82,47 72,39 60,41 48,39\" fill=\"#554372\"/><polygon points=\"46,32 60,29 60,41 48,39\" fill=\"#5f4b7f\"/><polygon points=\"60,29 74,32 72,39 60,41\" fill=\"#46375e\"/><polygon points=\"46,50 56,48.5 56,50.5 46,52\" fill=\"#342946\"/><polygon points=\"64,48.5 74,50 74,52 64,50.5\" fill=\"#342946\"/><polygon points=\"47.4,55.5 51,54 54.6,55.5 51,57.2\" fill=\"#342946\"/><circle cx=\"49.8\" cy=\"55\" r=\"0.9\" fill=\"#fff\" opacity=\"0.85\"/><polygon points=\"65.4,55.5 69,54 72.6,55.5 69,57.2\" fill=\"#342946\"/><circle cx=\"67.8\" cy=\"55\" r=\"0.9\" fill=\"#fff\" opacity=\"0.85\"/><polygon points=\"54.5,75 60,76.2 65.5,75 63,77.4 60,78 57,77.4\" fill=\"#4b3b64\"/><polygon points=\"77,100 99,95 99,114 77,119\" fill=\"#644f86\"/><polygon points=\"77,100 72,104 72,119 77,114\" fill=\"#4b3b64\"/><polygon points=\"79,103 96,99\" fill=\"\"/><polygon points=\"79,103 96,99 96,101 79,105\" fill=\"#b1a1ca\"/></g></svg>", "PCFD": "<svg viewBox=\"0 0 120 120\" xmlns=\"http://www.w3.org/2000/svg\"><defs><clipPath id=\"cPCFD\"><circle cx=\"60\" cy=\"60\" r=\"58\"/></clipPath></defs><circle cx=\"60\" cy=\"60\" r=\"58\" fill=\"#e5dfed\"/><g clip-path=\"url(#cPCFD)\"><polygon points=\"0,0 120,0 0,130\" fill=\"#ece9f2\"/><polygon points=\"0,130 120,130 120,38\" fill=\"#dcd4e7\"/><polygon points=\"14,122 27,99 60,92 93,99 106,122\" fill=\"#53416e\"/><polygon points=\"14,122 27,99 60,92 60,122\" fill=\"#5f4b7f\"/><polygon points=\"60,92 93,99 106,122 60,122\" fill=\"#44355a\"/><polygon points=\"50,93 60,106 70,93\" fill=\"#9782b9\"/><polygon points=\"50,93 60,103 54,95\" fill=\"#715997\"/><polygon points=\"70,93 60,103 66,95\" fill=\"#715997\"/><polygon points=\"64,97 70,97 69,101 64,101\" fill=\"#a998c5\"/><polygon points=\"55,84 65,84 64,98 56,98\" fill=\"#a491c2\"/><polygon points=\"55,84 60,98 56,98\" fill=\"#b4a4cc\"/><polygon points=\"38,47 41,24 60,16 79,24 82,47 74,32 60,29 46,32\" fill=\"#4b3b64\"/><polygon points=\"60,27 45,31 60,47\" fill=\"#bdafd2\"/><polygon points=\"60,27 60,47 75,31\" fill=\"#b6a7ce\"/><polygon points=\"45,31 38,46 50,48 60,47\" fill=\"#b9aad0\"/><polygon points=\"75,31 60,47 70,48 82,46\" fill=\"#ab99c6\"/><polygon points=\"38,46 40,61 50,62 50,48\" fill=\"#b6a7ce\"/><polygon points=\"82,46 70,48 70,62 80,61\" fill=\"#a896c4\"/><polygon points=\"50,48 50,62 60,75 70,62 70,48 60,47\" fill=\"#b2a2cb\"/><polygon points=\"40,61 50,74 60,75 50,62\" fill=\"#ad9cc8\"/><polygon points=\"80,61 70,62 60,75 70,74\" fill=\"#a491c2\"/><polygon points=\"50,74 60,86 60,75\" fill=\"#ab99c6\"/><polygon points=\"70,74 60,75 60,86\" fill=\"#a28ec0\"/><polygon points=\"43,52 50,56 45,60\" fill=\"#c6bad8\"/><polygon points=\"77,52 70,56 75,60\" fill=\"#bbadd1\"/><polygon points=\"60,55 56,64 60,65\" fill=\"#bfb2d4\"/><polygon points=\"60,55 60,65 64,64\" fill=\"#a794c3\"/><polygon points=\"38,47 46,32 60,29 74,32 82,47 72,39 60,41 48,39\" fill=\"#554372\"/><polygon points=\"46,32 60,29 60,41 48,39\" fill=\"#5f4b7f\"/><polygon points=\"60,29 74,32 72,39 60,41\" fill=\"#46375e\"/><polygon points=\"46,50 56,48.5 56,50.5 46,52\" fill=\"#342946\"/><polygon points=\"64,48.5 74,50 74,52 64,50.5\" fill=\"#342946\"/><polygon points=\"47.4,55.5 51,54 54.6,55.5 51,57.2\" fill=\"#342946\"/><circle cx=\"49.8\" cy=\"55\" r=\"0.9\" fill=\"#fff\" opacity=\"0.85\"/><polygon points=\"65.4,55.5 69,54 72.6,55.5 69,57.2\" fill=\"#342946\"/><circle cx=\"67.8\" cy=\"55\" r=\"0.9\" fill=\"#fff\" opacity=\"0.85\"/><polygon points=\"54.5,75 60,76.2 65.5,75 63,77.4 60,78 57,77.4\" fill=\"#4b3b64\"/><rect x=\"84\" y=\"92\" width=\"9\" height=\"20\" rx=\"4.5\" fill=\"#4b3b64\"/><circle cx=\"88.5\" cy=\"91\" r=\"6\" fill=\"#8a72b0\"/><rect x=\"86.5\" y=\"110\" width=\"4\" height=\"8\" fill=\"#4b3b64\"/></g></svg>", "PCFS": "<svg viewBox=\"0 0 120 120\" xmlns=\"http://www.w3.org/2000/svg\"><defs><clipPath id=\"cPCFS\"><circle cx=\"60\" cy=\"60\" r=\"58\"/></clipPath></defs><circle cx=\"60\" cy=\"60\" r=\"58\" fill=\"#e5dfed\"/><g clip-path=\"url(#cPCFS)\"><polygon points=\"0,0 120,0 0,130\" fill=\"#ece9f2\"/><polygon points=\"0,130 120,130 120,38\" fill=\"#dcd4e7\"/><polygon points=\"14,122 27,99 60,92 93,99 106,122\" fill=\"#53416e\"/><polygon points=\"14,122 27,99 60,92 60,122\" fill=\"#5f4b7f\"/><polygon points=\"60,92 93,99 106,122 60,122\" fill=\"#44355a\"/><polygon points=\"50,94 55,101 60,103 65,101 70,94 66,99 60,100 54,99\" fill=\"#715997\"/><polygon points=\"55,84 65,84 64,98 56,98\" fill=\"#a491c2\"/><polygon points=\"55,84 60,98 56,98\" fill=\"#b4a4cc\"/><polygon points=\"36,46 40,24 52,17 60,21 68,17 80,24 84,46 74,30 60,27 46,30\" fill=\"#4b3b64\"/><polygon points=\"60,27 45,31 60,47\" fill=\"#bdafd2\"/><polygon points=\"60,27 60,47 75,31\" fill=\"#b6a7ce\"/><polygon points=\"45,31 38,46 50,48 60,47\" fill=\"#b9aad0\"/><polygon points=\"75,31 60,47 70,48 82,46\" fill=\"#ab99c6\"/><polygon points=\"38,46 40,61 50,62 50,48\" fill=\"#b6a7ce\"/><polygon points=\"82,46 70,48 70,62 80,61\" fill=\"#a896c4\"/><polygon points=\"50,48 50,62 60,75 70,62 70,48 60,47\" fill=\"#b2a2cb\"/><polygon points=\"40,61 50,74 60,75 50,62\" fill=\"#ad9cc8\"/><polygon points=\"80,61 70,62 60,75 70,74\" fill=\"#a491c2\"/><polygon points=\"50,74 60,86 60,75\" fill=\"#ab99c6\"/><polygon points=\"70,74 60,75 60,86\" fill=\"#a28ec0\"/><polygon points=\"43,52 50,56 45,60\" fill=\"#c6bad8\"/><polygon points=\"77,52 70,56 75,60\" fill=\"#bbadd1\"/><polygon points=\"60,55 56,64 60,65\" fill=\"#bfb2d4\"/><polygon points=\"60,55 60,65 64,64\" fill=\"#a794c3\"/><polygon points=\"38,47 46,32 60,29 74,32 82,47 72,39 60,41 48,39\" fill=\"#554372\"/><polygon points=\"46,32 60,29 60,41 48,39\" fill=\"#5f4b7f\"/><polygon points=\"60,29 74,32 72,39 60,41\" fill=\"#46375e\"/><polygon points=\"46,50 56,48.5 56,50.5 46,52\" fill=\"#342946\"/><polygon points=\"64,48.5 74,50 74,52 64,50.5\" fill=\"#342946\"/><polygon points=\"47.4,55.5 51,54 54.6,55.5 51,57.2\" fill=\"#342946\"/><circle cx=\"49.8\" cy=\"55\" r=\"0.9\" fill=\"#fff\" opacity=\"0.85\"/><polygon points=\"65.4,55.5 69,54 72.6,55.5 69,57.2\" fill=\"#342946\"/><circle cx=\"67.8\" cy=\"55\" r=\"0.9\" fill=\"#fff\" opacity=\"0.85\"/><polygon points=\"54.5,75 60,76.2 65.5,75 63,77.4 60,78 57,77.4\" fill=\"#4b3b64\"/><polygon points=\"86,98 80,94 75,98 78,104 86,111 94,104 97,98 92,94\" fill=\"#ac9bc7\"/><polygon points=\"80,96 78,99\" fill=\"\"/></g></svg>", "TLOD": "<svg viewBox=\"0 0 120 120\" xmlns=\"http://www.w3.org/2000/svg\"><defs><clipPath id=\"cTLOD\"><circle cx=\"60\" cy=\"60\" r=\"58\"/></clipPath></defs><circle cx=\"60\" cy=\"60\" r=\"58\" fill=\"#dbe6ed\"/><g clip-path=\"url(#cTLOD)\"><polygon points=\"0,0 120,0 0,130\" fill=\"#e6eef2\"/><polygon points=\"0,130 120,130 120,38\" fill=\"#cfdee7\"/><polygon points=\"14,122 27,99 60,92 93,99 106,122\" fill=\"#34586e\"/><polygon points=\"14,122 27,99 60,92 60,122\" fill=\"#3c657f\"/><polygon points=\"60,92 93,99 106,122 60,122\" fill=\"#2a485a\"/><polygon points=\"50,93 60,106 70,93\" fill=\"#6092b0\"/><polygon points=\"16,99 104,99 104,103 16,103\" fill=\"#83aac2\"/><polygon points=\"16,109 104,109 104,113 16,113\" fill=\"#83aac2\"/><polygon points=\"55,84 65,84 64,98 56,98\" fill=\"#83aac2\"/><polygon points=\"55,84 60,98 56,98\" fill=\"#98b8cc\"/><polygon points=\"38,47 41,24 60,16 79,24 82,47 74,32 60,29 46,32\" fill=\"#2f5064\"/><polygon points=\"60,27 45,31 60,47\" fill=\"#a5c1d2\"/><polygon points=\"60,27 60,47 75,31\" fill=\"#9cbbce\"/><polygon points=\"45,31 38,46 50,48 60,47\" fill=\"#9fbdd0\"/><polygon points=\"75,31 60,47 70,48 82,46\" fill=\"#8cb0c6\"/><polygon points=\"38,46 40,61 50,62 50,48\" fill=\"#9cbbce\"/><polygon points=\"82,46 70,48 70,62 80,61\" fill=\"#89adc4\"/><polygon points=\"50,48 50,62 60,75 70,62 70,48 60,47\" fill=\"#97b7cb\"/><polygon points=\"40,61 50,74 60,75 50,62\" fill=\"#90b2c8\"/><polygon points=\"80,61 70,62 60,75 70,74\" fill=\"#83aac2\"/><polygon points=\"50,74 60,86 60,75\" fill=\"#8cb0c6\"/><polygon points=\"70,74 60,75 60,86\" fill=\"#80a7c0\"/><polygon points=\"43,52 50,56 45,60\" fill=\"#b1c9d8\"/><polygon points=\"77,52 70,56 75,60\" fill=\"#a3c0d1\"/><polygon points=\"60,55 56,64 60,65\" fill=\"#a8c3d4\"/><polygon points=\"60,55 60,65 64,64\" fill=\"#87acc3\"/><polygon points=\"40,42 50,26 60,22 70,26 80,42 60,36\" fill=\"#6e9bb7\"/><polygon points=\"40,42 50,26 60,22 60,36\" fill=\"#83aac2\"/><polygon points=\"36,41 84,41 82,46 38,46\" fill=\"#477897\"/><polygon points=\"57,22 63,22 63,30 57,30\" fill=\"#3f6b86\"/><polygon points=\"46,50 56,48.5 56,50.5 46,52\" fill=\"#213846\"/><polygon points=\"64,48.5 74,50 74,52 64,50.5\" fill=\"#213846\"/><polygon points=\"47.4,55.5 51,54 54.6,55.5 51,57.2\" fill=\"#213846\"/><circle cx=\"49.8\" cy=\"55\" r=\"0.9\" fill=\"#fff\" opacity=\"0.85\"/><polygon points=\"65.4,55.5 69,54 72.6,55.5 69,57.2\" fill=\"#213846\"/><circle cx=\"67.8\" cy=\"55\" r=\"0.9\" fill=\"#fff\" opacity=\"0.85\"/><polygon points=\"54.5,75 60,76.2 65.5,75 63,77.4 60,78 57,77.4\" fill=\"#2f5064\"/></g></svg>", "TLOS": "<svg viewBox=\"0 0 120 120\" xmlns=\"http://www.w3.org/2000/svg\"><defs><clipPath id=\"cTLOS\"><circle cx=\"60\" cy=\"60\" r=\"58\"/></clipPath></defs><circle cx=\"60\" cy=\"60\" r=\"58\" fill=\"#dbe6ed\"/><g clip-path=\"url(#cTLOS)\"><polygon points=\"0,0 120,0 0,130\" fill=\"#e6eef2\"/><polygon points=\"0,130 120,130 120,38\" fill=\"#cfdee7\"/><polygon points=\"14,122 27,99 60,92 93,99 106,122\" fill=\"#34586e\"/><polygon points=\"14,122 27,99 60,92 60,122\" fill=\"#3c657f\"/><polygon points=\"60,92 93,99 106,122 60,122\" fill=\"#2a485a\"/><polygon points=\"50,93 60,104 70,93\" fill=\"#83aac2\"/><polygon points=\"50,93 60,101 54,95\" fill=\"#6092b0\"/><polygon points=\"70,93 60,101 66,95\" fill=\"#6092b0\"/><polygon points=\"57,95 63,95 62,114 58,114\" fill=\"#274354\"/><polygon points=\"55,84 65,84 64,98 56,98\" fill=\"#83aac2\"/><polygon points=\"55,84 60,98 56,98\" fill=\"#98b8cc\"/><polygon points=\"38,47 41,24 60,16 79,24 82,47 74,32 60,29 46,32\" fill=\"#2f5064\"/><polygon points=\"60,27 45,31 60,47\" fill=\"#a5c1d2\"/><polygon points=\"60,27 60,47 75,31\" fill=\"#9cbbce\"/><polygon points=\"45,31 38,46 50,48 60,47\" fill=\"#9fbdd0\"/><polygon points=\"75,31 60,47 70,48 82,46\" fill=\"#8cb0c6\"/><polygon points=\"38,46 40,61 50,62 50,48\" fill=\"#9cbbce\"/><polygon points=\"82,46 70,48 70,62 80,61\" fill=\"#89adc4\"/><polygon points=\"50,48 50,62 60,75 70,62 70,48 60,47\" fill=\"#97b7cb\"/><polygon points=\"40,61 50,74 60,75 50,62\" fill=\"#90b2c8\"/><polygon points=\"80,61 70,62 60,75 70,74\" fill=\"#83aac2\"/><polygon points=\"50,74 60,86 60,75\" fill=\"#8cb0c6\"/><polygon points=\"70,74 60,75 60,86\" fill=\"#80a7c0\"/><polygon points=\"43,52 50,56 45,60\" fill=\"#b1c9d8\"/><polygon points=\"77,52 70,56 75,60\" fill=\"#a3c0d1\"/><polygon points=\"60,55 56,64 60,65\" fill=\"#a8c3d4\"/><polygon points=\"60,55 60,65 64,64\" fill=\"#87acc3\"/><polygon points=\"38,47 46,32 60,29 74,32 82,47 72,39 60,41 48,39\" fill=\"#355b72\"/><polygon points=\"46,32 60,29 60,41 48,39\" fill=\"#3c657f\"/><polygon points=\"60,29 74,32 72,39 60,41\" fill=\"#2c4b5e\"/><polygon points=\"46,50 56,48.5 56,50.5 46,52\" fill=\"#213846\"/><polygon points=\"64,48.5 74,50 74,52 64,50.5\" fill=\"#213846\"/><polygon points=\"47.4,55.5 51,54 54.6,55.5 51,57.2\" fill=\"#213846\"/><circle cx=\"49.8\" cy=\"55\" r=\"0.9\" fill=\"#fff\" opacity=\"0.85\"/><polygon points=\"65.4,55.5 69,54 72.6,55.5 69,57.2\" fill=\"#213846\"/><circle cx=\"67.8\" cy=\"55\" r=\"0.9\" fill=\"#fff\" opacity=\"0.85\"/><g><rect x=\"46\" y=\"51.5\" width=\"10\" height=\"8\" rx=\"2.5\" fill=\"none\" stroke=\"#1e323f\" stroke-width=\"1.8\"/><rect x=\"64\" y=\"51.5\" width=\"10\" height=\"8\" rx=\"2.5\" fill=\"none\" stroke=\"#1e323f\" stroke-width=\"1.8\"/><line x1=\"56\" y1=\"55\" x2=\"64\" y2=\"55\" stroke=\"#1e323f\" stroke-width=\"1.8\"/></g><polygon points=\"54.5,75 60,76.2 65.5,75 63,77.4 60,78 57,77.4\" fill=\"#2f5064\"/><polygon points=\"75,99 99,99 97,112 77,112\" fill=\"#2f5064\"/><polygon points=\"77,101 97,101 95.5,110 78.5,110\" fill=\"#9fbdd0\"/><polygon points=\"72,112 102,112 104,117 70,117\" fill=\"#375d75\"/></g></svg>", "TLFD": "<svg viewBox=\"0 0 120 120\" xmlns=\"http://www.w3.org/2000/svg\"><defs><clipPath id=\"cTLFD\"><circle cx=\"60\" cy=\"60\" r=\"58\"/></clipPath></defs><circle cx=\"60\" cy=\"60\" r=\"58\" fill=\"#dbe6ed\"/><g clip-path=\"url(#cTLFD)\"><polygon points=\"0,0 120,0 0,130\" fill=\"#e6eef2\"/><polygon points=\"0,130 120,130 120,38\" fill=\"#cfdee7\"/><polygon points=\"14,122 27,99 60,92 93,99 106,122\" fill=\"#34586e\"/><polygon points=\"14,122 27,99 60,92 60,122\" fill=\"#3c657f\"/><polygon points=\"60,92 93,99 106,122 60,122\" fill=\"#2a485a\"/><polygon points=\"52,96 54,96 53,114 51,114\" fill=\"#1f3543\"/><polygon points=\"66,96 68,96 69,114 67,114\" fill=\"#1f3543\"/><polygon points=\"55,84 65,84 64,98 56,98\" fill=\"#83aac2\"/><polygon points=\"55,84 60,98 56,98\" fill=\"#98b8cc\"/><polygon points=\"38,47 41,24 60,16 79,24 82,47 74,32 60,29 46,32\" fill=\"#2f5064\"/><polygon points=\"60,27 45,31 60,47\" fill=\"#a5c1d2\"/><polygon points=\"60,27 60,47 75,31\" fill=\"#9cbbce\"/><polygon points=\"45,31 38,46 50,48 60,47\" fill=\"#9fbdd0\"/><polygon points=\"75,31 60,47 70,48 82,46\" fill=\"#8cb0c6\"/><polygon points=\"38,46 40,61 50,62 50,48\" fill=\"#9cbbce\"/><polygon points=\"82,46 70,48 70,62 80,61\" fill=\"#89adc4\"/><polygon points=\"50,48 50,62 60,75 70,62 70,48 60,47\" fill=\"#97b7cb\"/><polygon points=\"40,61 50,74 60,75 50,62\" fill=\"#90b2c8\"/><polygon points=\"80,61 70,62 60,75 70,74\" fill=\"#83aac2\"/><polygon points=\"50,74 60,86 60,75\" fill=\"#8cb0c6\"/><polygon points=\"70,74 60,75 60,86\" fill=\"#80a7c0\"/><polygon points=\"43,52 50,56 45,60\" fill=\"#b1c9d8\"/><polygon points=\"77,52 70,56 75,60\" fill=\"#a3c0d1\"/><polygon points=\"60,55 56,64 60,65\" fill=\"#a8c3d4\"/><polygon points=\"60,55 60,65 64,64\" fill=\"#87acc3\"/><polygon points=\"38,47 46,32 60,29 74,32 82,47 72,39 60,41 48,39\" fill=\"#355b72\"/><polygon points=\"46,32 60,29 60,41 48,39\" fill=\"#3c657f\"/><polygon points=\"60,29 74,32 72,39 60,41\" fill=\"#2c4b5e\"/><polygon points=\"46,50 56,48.5 56,50.5 46,52\" fill=\"#213846\"/><polygon points=\"64,48.5 74,50 74,52 64,50.5\" fill=\"#213846\"/><polygon points=\"47.4,55.5 51,54 54.6,55.5 51,57.2\" fill=\"#213846\"/><circle cx=\"49.8\" cy=\"55\" r=\"0.9\" fill=\"#fff\" opacity=\"0.85\"/><polygon points=\"65.4,55.5 69,54 72.6,55.5 69,57.2\" fill=\"#213846\"/><circle cx=\"67.8\" cy=\"55\" r=\"0.9\" fill=\"#fff\" opacity=\"0.85\"/><polygon points=\"54.5,75 60,76.2 65.5,75 63,77.4 60,78 57,77.4\" fill=\"#2f5064\"/><circle cx=\"90\" cy=\"99\" r=\"9\" fill=\"#4f86a8\"/><rect x=\"-2.2\" y=\"-12.5\" width=\"4.4\" height=\"4.5\" transform=\"translate(90,99) rotate(0)\" fill=\"#4f86a8\"/><rect x=\"-2.2\" y=\"-12.5\" width=\"4.4\" height=\"4.5\" transform=\"translate(90,99) rotate(45)\" fill=\"#4f86a8\"/><rect x=\"-2.2\" y=\"-12.5\" width=\"4.4\" height=\"4.5\" transform=\"translate(90,99) rotate(90)\" fill=\"#4f86a8\"/><rect x=\"-2.2\" y=\"-12.5\" width=\"4.4\" height=\"4.5\" transform=\"translate(90,99) rotate(135)\" fill=\"#4f86a8\"/><rect x=\"-2.2\" y=\"-12.5\" width=\"4.4\" height=\"4.5\" transform=\"translate(90,99) rotate(180)\" fill=\"#4f86a8\"/><rect x=\"-2.2\" y=\"-12.5\" width=\"4.4\" height=\"4.5\" transform=\"translate(90,99) rotate(225)\" fill=\"#4f86a8\"/><rect x=\"-2.2\" y=\"-12.5\" width=\"4.4\" height=\"4.5\" transform=\"translate(90,99) rotate(270)\" fill=\"#4f86a8\"/><rect x=\"-2.2\" y=\"-12.5\" width=\"4.4\" height=\"4.5\" transform=\"translate(90,99) rotate(315)\" fill=\"#4f86a8\"/><circle cx=\"90\" cy=\"99\" r=\"3.4\" fill=\"#a7c2d3\"/></g></svg>", "TLFS": "<svg viewBox=\"0 0 120 120\" xmlns=\"http://www.w3.org/2000/svg\"><defs><clipPath id=\"cTLFS\"><circle cx=\"60\" cy=\"60\" r=\"58\"/></clipPath></defs><circle cx=\"60\" cy=\"60\" r=\"58\" fill=\"#dbe6ed\"/><g clip-path=\"url(#cTLFS)\"><polygon points=\"0,0 120,0 0,130\" fill=\"#e6eef2\"/><polygon points=\"0,130 120,130 120,38\" fill=\"#cfdee7\"/><polygon points=\"14,122 27,99 60,92 93,99 106,122\" fill=\"#34586e\"/><polygon points=\"14,122 27,99 60,92 60,122\" fill=\"#3c657f\"/><polygon points=\"60,92 93,99 106,122 60,122\" fill=\"#2a485a\"/><polygon points=\"50,93 60,104 70,93\" fill=\"#83aac2\"/><polygon points=\"58,95 62,95 60,101\" fill=\"#2f5064\"/><polygon points=\"60,96 60,118\" fill=\"\"/><polygon points=\"69,99 81,99 81,113 69,113\" fill=\"#75a0bb\"/><polygon points=\"55,84 65,84 64,98 56,98\" fill=\"#83aac2\"/><polygon points=\"55,84 60,98 56,98\" fill=\"#98b8cc\"/><polygon points=\"38,47 41,24 60,16 79,24 82,47 74,32 60,29 46,32\" fill=\"#2f5064\"/><polygon points=\"60,27 45,31 60,47\" fill=\"#a5c1d2\"/><polygon points=\"60,27 60,47 75,31\" fill=\"#9cbbce\"/><polygon points=\"45,31 38,46 50,48 60,47\" fill=\"#9fbdd0\"/><polygon points=\"75,31 60,47 70,48 82,46\" fill=\"#8cb0c6\"/><polygon points=\"38,46 40,61 50,62 50,48\" fill=\"#9cbbce\"/><polygon points=\"82,46 70,48 70,62 80,61\" fill=\"#89adc4\"/><polygon points=\"50,48 50,62 60,75 70,62 70,48 60,47\" fill=\"#97b7cb\"/><polygon points=\"40,61 50,74 60,75 50,62\" fill=\"#90b2c8\"/><polygon points=\"80,61 70,62 60,75 70,74\" fill=\"#83aac2\"/><polygon points=\"50,74 60,86 60,75\" fill=\"#8cb0c6\"/><polygon points=\"70,74 60,75 60,86\" fill=\"#80a7c0\"/><polygon points=\"43,52 50,56 45,60\" fill=\"#b1c9d8\"/><polygon points=\"77,52 70,56 75,60\" fill=\"#a3c0d1\"/><polygon points=\"60,55 56,64 60,65\" fill=\"#a8c3d4\"/><polygon points=\"60,55 60,65 64,64\" fill=\"#87acc3\"/><polygon points=\"38,47 46,32 60,29 74,32 82,47 72,39 60,41 48,39\" fill=\"#355b72\"/><polygon points=\"46,32 60,29 60,41 48,39\" fill=\"#3c657f\"/><polygon points=\"60,29 74,32 72,39 60,41\" fill=\"#2c4b5e\"/><polygon points=\"46,50 56,48.5 56,50.5 46,52\" fill=\"#213846\"/><polygon points=\"64,48.5 74,50 74,52 64,50.5\" fill=\"#213846\"/><polygon points=\"47.4,55.5 51,54 54.6,55.5 51,57.2\" fill=\"#213846\"/><circle cx=\"49.8\" cy=\"55\" r=\"0.9\" fill=\"#fff\" opacity=\"0.85\"/><polygon points=\"65.4,55.5 69,54 72.6,55.5 69,57.2\" fill=\"#213846\"/><circle cx=\"67.8\" cy=\"55\" r=\"0.9\" fill=\"#fff\" opacity=\"0.85\"/><g><rect x=\"46\" y=\"51.5\" width=\"10\" height=\"8\" rx=\"2.5\" fill=\"none\" stroke=\"#1e323f\" stroke-width=\"1.8\"/><rect x=\"64\" y=\"51.5\" width=\"10\" height=\"8\" rx=\"2.5\" fill=\"none\" stroke=\"#1e323f\" stroke-width=\"1.8\"/><line x1=\"56\" y1=\"55\" x2=\"64\" y2=\"55\" stroke=\"#1e323f\" stroke-width=\"1.8\"/></g><polygon points=\"54.5,75 60,76.2 65.5,75 63,77.4 60,78 57,77.4\" fill=\"#2f5064\"/><polygon points=\"86,92 94,92 94,100 102,116 78,116 86,100\" fill=\"#95b6ca\"/><polygon points=\"80,110 100,110 102,116 78,116\" fill=\"#43718e\"/><polygon points=\"84,90 96,90 96,93 84,93\" fill=\"#375d75\"/></g></svg>", "TCOD": "<svg viewBox=\"0 0 120 120\" xmlns=\"http://www.w3.org/2000/svg\"><defs><clipPath id=\"cTCOD\"><circle cx=\"60\" cy=\"60\" r=\"58\"/></clipPath></defs><circle cx=\"60\" cy=\"60\" r=\"58\" fill=\"#dee9e0\"/><g clip-path=\"url(#cTCOD)\"><polygon points=\"0,0 120,0 0,130\" fill=\"#e8f0e9\"/><polygon points=\"0,130 120,130 120,38\" fill=\"#d3e2d5\"/><polygon points=\"14,122 27,99 60,92 93,99 106,122\" fill=\"#3e6143\"/><polygon points=\"14,122 27,99 60,92 60,122\" fill=\"#47704d\"/><polygon points=\"60,92 93,99 106,122 60,122\" fill=\"#324f37\"/><polygon points=\"50,93 60,106 70,93\" fill=\"#8eb493\"/><polygon points=\"56,95 64,95 63,108 57,108\" fill=\"#8eb493\"/><polygon points=\"58,98 62,98 62,99.6 58,99.6\" fill=\"#416747\"/><polygon points=\"58,102 62,102 62,103.6 58,103.6\" fill=\"#416747\"/><polygon points=\"55,84 65,84 64,98 56,98\" fill=\"#8eb493\"/><polygon points=\"55,84 60,98 56,98\" fill=\"#a1c0a6\"/><polygon points=\"38,47 41,24 60,16 79,24 82,47 74,32 60,29 46,32\" fill=\"#38583d\"/><polygon points=\"60,27 45,31 60,47\" fill=\"#acc8b0\"/><polygon points=\"60,27 60,47 75,31\" fill=\"#a4c3a9\"/><polygon points=\"45,31 38,46 50,48 60,47\" fill=\"#a8c5ac\"/><polygon points=\"75,31 60,47 70,48 82,46\" fill=\"#96b99b\"/><polygon points=\"38,46 40,61 50,62 50,48\" fill=\"#a4c3a9\"/><polygon points=\"82,46 70,48 70,62 80,61\" fill=\"#93b798\"/><polygon points=\"50,48 50,62 60,75 70,62 70,48 60,47\" fill=\"#a0bfa4\"/><polygon points=\"40,61 50,74 60,75 50,62\" fill=\"#99bb9e\"/><polygon points=\"80,61 70,62 60,75 70,74\" fill=\"#8eb493\"/><polygon points=\"50,74 60,86 60,75\" fill=\"#96b99b\"/><polygon points=\"70,74 60,75 60,86\" fill=\"#8bb190\"/><polygon points=\"43,52 50,56 45,60\" fill=\"#b8cfbb\"/><polygon points=\"77,52 70,56 75,60\" fill=\"#abc7af\"/><polygon points=\"60,55 56,64 60,65\" fill=\"#b0cab4\"/><polygon points=\"60,55 60,65 64,64\" fill=\"#91b696\"/><polygon points=\"38,47 46,32 60,29 74,32 82,47 72,39 60,41 48,39\" fill=\"#3f6445\"/><polygon points=\"46,32 60,29 60,41 48,39\" fill=\"#47704d\"/><polygon points=\"60,29 74,32 72,39 60,41\" fill=\"#345239\"/><polygon points=\"46,50 56,48.5 56,50.5 46,52\" fill=\"#273e2a\"/><polygon points=\"64,48.5 74,50 74,52 64,50.5\" fill=\"#273e2a\"/><polygon points=\"47.4,55.5 51,54 54.6,55.5 51,57.2\" fill=\"#273e2a\"/><circle cx=\"49.8\" cy=\"55\" r=\"0.9\" fill=\"#fff\" opacity=\"0.85\"/><polygon points=\"65.4,55.5 69,54 72.6,55.5 69,57.2\" fill=\"#273e2a\"/><circle cx=\"67.8\" cy=\"55\" r=\"0.9\" fill=\"#fff\" opacity=\"0.85\"/><g><rect x=\"46\" y=\"51.5\" width=\"10\" height=\"8\" rx=\"2.5\" fill=\"none\" stroke=\"#233826\" stroke-width=\"1.8\"/><rect x=\"64\" y=\"51.5\" width=\"10\" height=\"8\" rx=\"2.5\" fill=\"none\" stroke=\"#233826\" stroke-width=\"1.8\"/><line x1=\"56\" y1=\"55\" x2=\"64\" y2=\"55\" stroke=\"#233826\" stroke-width=\"1.8\"/></g><polygon points=\"54.5,75 60,76.2 65.5,75 63,77.4 60,78 57,77.4\" fill=\"#38583d\"/><rect x=\"74\" y=\"92\" width=\"8\" height=\"24\" rx=\"4\" fill=\"#38583d\"/><polygon points=\"82,94 99,91 99,112 82,115\" fill=\"#9ebea3\"/><polygon points=\"85,98 96,96\" fill=\"\"/><polygon points=\"85,98 96,96 96,98 85,100\" fill=\"#416747\"/></g></svg>", "TCOS": "<svg viewBox=\"0 0 120 120\" xmlns=\"http://www.w3.org/2000/svg\"><defs><clipPath id=\"cTCOS\"><circle cx=\"60\" cy=\"60\" r=\"58\"/></clipPath></defs><circle cx=\"60\" cy=\"60\" r=\"58\" fill=\"#dee9e0\"/><g clip-path=\"url(#cTCOS)\"><polygon points=\"0,0 120,0 0,130\" fill=\"#e8f0e9\"/><polygon points=\"0,130 120,130 120,38\" fill=\"#d3e2d5\"/><polygon points=\"14,122 27,99 60,92 93,99 106,122\" fill=\"#3e6143\"/><polygon points=\"14,122 27,99 60,92 60,122\" fill=\"#47704d\"/><polygon points=\"60,92 93,99 106,122 60,122\" fill=\"#324f37\"/><polygon points=\"49,93 60,99 71,93 74,118 46,118\" fill=\"#4b7651\"/><polygon points=\"50,93 58,99 58,118 46,118\" fill=\"#54855b\"/><polygon points=\"53,94 60,99 67,94\" fill=\"#2f4a33\"/><polygon points=\"55,84 65,84 64,98 56,98\" fill=\"#8eb493\"/><polygon points=\"55,84 60,98 56,98\" fill=\"#a1c0a6\"/><polygon points=\"38,47 41,24 60,16 79,24 82,47 74,32 60,29 46,32\" fill=\"#38583d\"/><polygon points=\"60,27 45,31 60,47\" fill=\"#acc8b0\"/><polygon points=\"60,27 60,47 75,31\" fill=\"#a4c3a9\"/><polygon points=\"45,31 38,46 50,48 60,47\" fill=\"#a8c5ac\"/><polygon points=\"75,31 60,47 70,48 82,46\" fill=\"#96b99b\"/><polygon points=\"38,46 40,61 50,62 50,48\" fill=\"#a4c3a9\"/><polygon points=\"82,46 70,48 70,62 80,61\" fill=\"#93b798\"/><polygon points=\"50,48 50,62 60,75 70,62 70,48 60,47\" fill=\"#a0bfa4\"/><polygon points=\"40,61 50,74 60,75 50,62\" fill=\"#99bb9e\"/><polygon points=\"80,61 70,62 60,75 70,74\" fill=\"#8eb493\"/><polygon points=\"50,74 60,86 60,75\" fill=\"#96b99b\"/><polygon points=\"70,74 60,75 60,86\" fill=\"#8bb190\"/><polygon points=\"43,52 50,56 45,60\" fill=\"#b8cfbb\"/><polygon points=\"77,52 70,56 75,60\" fill=\"#abc7af\"/><polygon points=\"60,55 56,64 60,65\" fill=\"#b0cab4\"/><polygon points=\"60,55 60,65 64,64\" fill=\"#91b696\"/><polygon points=\"38,47 46,32 60,29 74,32 82,47 72,39 60,41 48,39\" fill=\"#3f6445\"/><polygon points=\"46,32 60,29 60,41 48,39\" fill=\"#47704d\"/><polygon points=\"60,29 74,32 72,39 60,41\" fill=\"#345239\"/><polygon points=\"38,41 60,33 82,41 80,46 60,40 40,46\" fill=\"#4b7651\"/><polygon points=\"80,42 88,44 82,50\" fill=\"#3d6042\"/><polygon points=\"46,50 56,48.5 56,50.5 46,52\" fill=\"#273e2a\"/><polygon points=\"64,48.5 74,50 74,52 64,50.5\" fill=\"#273e2a\"/><polygon points=\"47.4,55.5 51,54 54.6,55.5 51,57.2\" fill=\"#273e2a\"/><circle cx=\"49.8\" cy=\"55\" r=\"0.9\" fill=\"#fff\" opacity=\"0.85\"/><polygon points=\"65.4,55.5 69,54 72.6,55.5 69,57.2\" fill=\"#273e2a\"/><circle cx=\"67.8\" cy=\"55\" r=\"0.9\" fill=\"#fff\" opacity=\"0.85\"/><polygon points=\"54.5,75 60,76.2 65.5,75 63,77.4 60,78 57,77.4\" fill=\"#38583d\"/><rect x=\"84\" y=\"92\" width=\"3.6\" height=\"22\" rx=\"1.8\" transform=\"rotate(16 86 103)\" fill=\"#4b7651\"/><polygon points=\"89,90 95,93 91,100 85,97\" fill=\"#2f4a33\"/></g></svg>", "TCFD": "<svg viewBox=\"0 0 120 120\" xmlns=\"http://www.w3.org/2000/svg\"><defs><clipPath id=\"cTCFD\"><circle cx=\"60\" cy=\"60\" r=\"58\"/></clipPath></defs><circle cx=\"60\" cy=\"60\" r=\"58\" fill=\"#dee9e0\"/><g clip-path=\"url(#cTCFD)\"><polygon points=\"0,0 120,0 0,130\" fill=\"#e8f0e9\"/><polygon points=\"0,130 120,130 120,38\" fill=\"#d3e2d5\"/><polygon points=\"14,122 27,99 60,92 93,99 106,122\" fill=\"#3e6143\"/><polygon points=\"14,122 27,99 60,92 60,122\" fill=\"#47704d\"/><polygon points=\"60,92 93,99 106,122 60,122\" fill=\"#324f37\"/><polygon points=\"50,93 60,107 70,93\" fill=\"#87af8d\"/><polygon points=\"50,93 60,103 54,95\" fill=\"#619669\"/><polygon points=\"70,93 60,103 66,95\" fill=\"#619669\"/><polygon points=\"57,95 63,95 62,114 58,114\" fill=\"#2a422d\"/><polygon points=\"55,84 65,84 64,98 56,98\" fill=\"#8eb493\"/><polygon points=\"55,84 60,98 56,98\" fill=\"#a1c0a6\"/><polygon points=\"34,48 38,26 46,18 54,24 60,16 66,24 74,18 82,26 86,48 74,30 60,27 46,30\" fill=\"#38583d\"/><polygon points=\"60,27 45,31 60,47\" fill=\"#acc8b0\"/><polygon points=\"60,27 60,47 75,31\" fill=\"#a4c3a9\"/><polygon points=\"45,31 38,46 50,48 60,47\" fill=\"#a8c5ac\"/><polygon points=\"75,31 60,47 70,48 82,46\" fill=\"#96b99b\"/><polygon points=\"38,46 40,61 50,62 50,48\" fill=\"#a4c3a9\"/><polygon points=\"82,46 70,48 70,62 80,61\" fill=\"#93b798\"/><polygon points=\"50,48 50,62 60,75 70,62 70,48 60,47\" fill=\"#a0bfa4\"/><polygon points=\"40,61 50,74 60,75 50,62\" fill=\"#99bb9e\"/><polygon points=\"80,61 70,62 60,75 70,74\" fill=\"#8eb493\"/><polygon points=\"50,74 60,86 60,75\" fill=\"#96b99b\"/><polygon points=\"70,74 60,75 60,86\" fill=\"#8bb190\"/><polygon points=\"43,52 50,56 45,60\" fill=\"#b8cfbb\"/><polygon points=\"77,52 70,56 75,60\" fill=\"#abc7af\"/><polygon points=\"60,55 56,64 60,65\" fill=\"#b0cab4\"/><polygon points=\"60,55 60,65 64,64\" fill=\"#91b696\"/><polygon points=\"38,47 46,32 60,29 74,32 82,47 72,39 60,41 48,39\" fill=\"#3f6445\"/><polygon points=\"46,32 60,29 60,41 48,39\" fill=\"#47704d\"/><polygon points=\"60,29 74,32 72,39 60,41\" fill=\"#345239\"/><g><polygon points=\"44,38 50,35 56,38 50,42\" fill=\"#2f4a33\"/><circle cx=\"50\" cy=\"38.5\" r=\"3\" fill=\"#aec9b2\"/><polygon points=\"64,38 70,35 76,38 70,42\" fill=\"#2f4a33\"/><circle cx=\"70\" cy=\"38.5\" r=\"3\" fill=\"#aec9b2\"/><polygon points=\"44,37 76,37 76,40 44,40\" fill=\"#2a422d\"/></g><polygon points=\"46,50 56,48.5 56,50.5 46,52\" fill=\"#273e2a\"/><polygon points=\"64,48.5 74,50 74,52 64,50.5\" fill=\"#273e2a\"/><polygon points=\"47.4,55.5 51,54 54.6,55.5 51,57.2\" fill=\"#273e2a\"/><circle cx=\"49.8\" cy=\"55\" r=\"0.9\" fill=\"#fff\" opacity=\"0.85\"/><polygon points=\"65.4,55.5 69,54 72.6,55.5 69,57.2\" fill=\"#273e2a\"/><circle cx=\"67.8\" cy=\"55\" r=\"0.9\" fill=\"#fff\" opacity=\"0.85\"/><polygon points=\"54.5,75 60,76.2 65.5,75 63,77.4 60,78 57,77.4\" fill=\"#38583d\"/><circle cx=\"90\" cy=\"92\" r=\"8.5\" fill=\"#aec9b2\"/><rect x=\"86\" y=\"99\" width=\"8\" height=\"5\" fill=\"#416747\"/><polygon points=\"90,82 90,77\" fill=\"\"/></g></svg>", "TCFS": "<svg viewBox=\"0 0 120 120\" xmlns=\"http://www.w3.org/2000/svg\"><defs><clipPath id=\"cTCFS\"><circle cx=\"60\" cy=\"60\" r=\"58\"/></clipPath></defs><circle cx=\"60\" cy=\"60\" r=\"58\" fill=\"#dee9e0\"/><g clip-path=\"url(#cTCFS)\"><polygon points=\"0,0 120,0 0,130\" fill=\"#e8f0e9\"/><polygon points=\"0,130 120,130 120,38\" fill=\"#d3e2d5\"/><polygon points=\"14,122 27,99 60,92 93,99 106,122\" fill=\"#3e6143\"/><polygon points=\"14,122 27,99 60,92 60,122\" fill=\"#47704d\"/><polygon points=\"60,92 93,99 106,122 60,122\" fill=\"#324f37\"/><polygon points=\"50,94 55,101 60,103 65,101 70,94 66,99 60,100 54,99\" fill=\"#54855b\"/><polygon points=\"50,108 53,108 53,111 50,111\" fill=\"#9ebea3\"/><polygon points=\"67,112 70,112 70,115 67,115\" fill=\"#335138\"/><polygon points=\"55,84 65,84 64,98 56,98\" fill=\"#8eb493\"/><polygon points=\"55,84 60,98 56,98\" fill=\"#a1c0a6\"/><polygon points=\"34,50 40,22 60,15 80,22 86,50 84,104 74,104 76,52 60,46 44,52 46,104 36,104\" fill=\"#36553b\"/><polygon points=\"60,27 45,31 60,47\" fill=\"#acc8b0\"/><polygon points=\"60,27 60,47 75,31\" fill=\"#a4c3a9\"/><polygon points=\"45,31 38,46 50,48 60,47\" fill=\"#a8c5ac\"/><polygon points=\"75,31 60,47 70,48 82,46\" fill=\"#96b99b\"/><polygon points=\"38,46 40,61 50,62 50,48\" fill=\"#a4c3a9\"/><polygon points=\"82,46 70,48 70,62 80,61\" fill=\"#93b798\"/><polygon points=\"50,48 50,62 60,75 70,62 70,48 60,47\" fill=\"#a0bfa4\"/><polygon points=\"40,61 50,74 60,75 50,62\" fill=\"#99bb9e\"/><polygon points=\"80,61 70,62 60,75 70,74\" fill=\"#8eb493\"/><polygon points=\"50,74 60,86 60,75\" fill=\"#96b99b\"/><polygon points=\"70,74 60,75 60,86\" fill=\"#8bb190\"/><polygon points=\"43,52 50,56 45,60\" fill=\"#b8cfbb\"/><polygon points=\"77,52 70,56 75,60\" fill=\"#abc7af\"/><polygon points=\"60,55 56,64 60,65\" fill=\"#b0cab4\"/><polygon points=\"60,55 60,65 64,64\" fill=\"#91b696\"/><polygon points=\"38,47 46,32 60,29 74,32 82,47 72,39 60,41 48,39\" fill=\"#3f6445\"/><polygon points=\"46,32 60,29 60,41 48,39\" fill=\"#47704d\"/><polygon points=\"60,29 74,32 72,39 60,41\" fill=\"#345239\"/><polygon points=\"36,34 50,24 64,24 80,30 74,38 58,40 42,38\" fill=\"#416747\"/><polygon points=\"36,34 50,24 58,30 46,36\" fill=\"#4d7953\"/><polygon points=\"78,28 82,26 80,32\" fill=\"#38583d\"/><polygon points=\"46,50 56,48.5 56,50.5 46,52\" fill=\"#273e2a\"/><polygon points=\"64,48.5 74,50 74,52 64,50.5\" fill=\"#273e2a\"/><polygon points=\"47.4,55.5 51,54 54.6,55.5 51,57.2\" fill=\"#273e2a\"/><circle cx=\"49.8\" cy=\"55\" r=\"0.9\" fill=\"#fff\" opacity=\"0.85\"/><polygon points=\"65.4,55.5 69,54 72.6,55.5 69,57.2\" fill=\"#273e2a\"/><circle cx=\"67.8\" cy=\"55\" r=\"0.9\" fill=\"#fff\" opacity=\"0.85\"/><polygon points=\"54.5,75 60,76.2 65.5,75 63,77.4 60,78 57,77.4\" fill=\"#38583d\"/><polygon points=\"20,99 40,95 45,104 38,112 22,111 16,104\" fill=\"#9bbca0\"/><circle cx=\"33\" cy=\"108\" r=\"3\" fill=\"#ceded1\"/><circle cx=\"24\" cy=\"100\" r=\"2.4\" fill=\"#416747\"/><circle cx=\"31\" cy=\"98\" r=\"2.4\" fill=\"#416747\"/><circle cx=\"38\" cy=\"101\" r=\"2.4\" fill=\"#416747\"/><circle cx=\"40\" cy=\"107\" r=\"2.4\" fill=\"#416747\"/></g></svg>"};

const CHARS = {"PLOD": {"role": "マネージャー", "title": "ボス", "char": "チームを率いる、決断と統率のリーダー。", "cry": "ついてこい、道は私が決める"}, "PLOS": {"role": "コーディネーター", "title": "縁の下の働き者", "char": "縁の下で段取りを固め、みんなを支える。", "cry": "土台は、私が固めておくよ"}, "PLFD": {"role": "ネゴシエーター", "title": "策士", "char": "知恵と機転で勝ち筋を読む交渉上手。", "cry": "さて、どこから攻めようか"}, "PLFS": {"role": "アドバイザー", "title": "賢い相談役", "char": "かしこく社交的、人の悩みをすっと解く。", "cry": "いっしょに考えてみよう"}, "PCOD": {"role": "プロデューサー", "title": "華のプロデューサー", "char": "美しく魅せて、人を惹きつける主役肌。", "cry": "さあ、最高の舞台にしよう"}, "PCOS": {"role": "先生", "title": "やさしい先生", "char": "あたたかく寄り添い、相手の芽を育てる。", "cry": "あなたのペースで、大丈夫"}, "PCFD": {"role": "ホスト", "title": "ムードメーカー", "char": "明るく情熱的、人を巻き込み熱をつくる。", "cry": "面白そう！まずやってみよう"}, "PCFS": {"role": "カウンセラー", "title": "いちばんの理解者", "char": "気持ちに敏感で誠実、そばで支える名脇役。", "cry": "話、聞かせて。そばにいるよ"}, "TLOD": {"role": "オペレーション長", "title": "司令塔", "char": "全体を見渡し、現場を的確に動かす指揮官。", "cry": "全体は、私が見ている"}, "TLOS": {"role": "アナリスト", "title": "精密スペシャリスト", "char": "寸分の狂いもなく仕事を仕上げる完璧主義。", "cry": "細部まで、きっちりと"}, "TLFD": {"role": "テックリーダー", "title": "最速の開発者", "char": "鋭く速く、最前線を切り拓くスピード型。", "cry": "迷う前に、もう動いてる"}, "TLFS": {"role": "研究者", "title": "探究の賢者", "char": "とことん考え抜く、知の探究者。", "cry": "その仕組み、解き明かしたい"}, "TCOD": {"role": "建築家", "title": "大物の設計者", "char": "大きな構想を着実に形にする設計の達人。", "cry": "壮大なものを、確実に"}, "TCOS": {"role": "職人", "title": "磨きの職人", "char": "あせらず一点を極める、手仕事の名手。", "cry": "いいものは、急がない"}, "TCFD": {"role": "発明家", "title": "発明家", "char": "ひらめきを形にする発明家。誰も見ぬ道へ。", "cry": "ないなら、作ればいい"}, "TCFS": {"role": "アーティスト", "title": "自由なクリエイター", "char": "気ままに、自分の世界を創る自由人。", "cry": "私は、私の道をいく"}};

/* ============================================================
   PERSONA — タイプごとの“個性”（キャッチコピー／あるある／燃える・消耗する瞬間／近いイメージ）
   ============================================================ */
const PERSONA = {
"PLOD":{catch:"決めて、背負って、前に進む。", vibe:"場が止まると、つい自分が口火を切ってしまうリーダー気質。",
  aruaru:["会議で沈黙が続くと「じゃあ私から」と言ってしまう","旅行やイベントの幹事をやると、しおりレベルまで作り込む","話していると、つい『で、結論は？』が出る"],
  love:"目標から逆算して人を動かし、やりきって達成したとき", tired:"決定権がなく、ただ待たされ続ける時間", near:"学級委員長・部活のキャプテンタイプ"},
"PLOS":{catch:"気づけば、みんなの土台になっている。", vibe:"表に立つより、まわりが回る仕組みを静かに整えたい。",
  aruaru:["誰かが困る前に、先に段取りを済ませておく","「あれ、やっておきました」と地味に有能","頼まれると断れず、気づくと抱え込んでいる"],
  love:"自分の段取りでチームが滞りなく回ったとき", tired:"ルールも段取りもなく、行き当たりばったりな現場", near:"頼れる副キャプテン・事務局長タイプ"},
"PLFD":{catch:"勝ち筋は、いつも探している。", vibe:"駆け引きや勝負どころで、むしろテンションが上がる。",
  aruaru:["相手の出方を読んで、会話の主導権を握る","『それ、こっちが得する？』を瞬時に計算している","ピンチな場面ほど目が輝く"],
  love:"不利な状況をひっくり返して勝ち切ったとき", tired:"勝ち負けも刺激もない、平坦なルーティン", near:"敏腕営業・交渉人タイプ"},
"PLFS":{catch:"答えより、いい問いを返す人。", vibe:"前に出るより、横で的確に助言したい参謀タイプ。",
  aruaru:["相談されると、つい頭の中で構造を整理して返す","『一回、そもそもを考えよう』と言いがち","人の話を聞きながら、図やフローで考えている"],
  love:"相手のもやもやが、すっと言語化できた瞬間", tired:"感情論だけで押し切られる場面", near:"頼れる相談役・キャリアの参謀タイプ"},
"PCOD":{catch:"世界観をつくって、人を巻き込む。", vibe:"主役にも裏方にもなれる、場の仕掛け人。",
  aruaru:["『どうせやるなら映える方』を選ぶ","頭の中で完成形のビジュアルが先に見えている","人の良さを見つけて、舞台に上げるのが好き"],
  love:"自分が描いた世界に、人が熱狂したとき", tired:"細かいルールで表現を縛られる場面", near:"イベント仕掛け人・編集長タイプ"},
"PCOS":{catch:"相手の芽を、ことばで育てる。", vibe:"おだやかだけど、伝えることには情熱的。",
  aruaru:["むずかしい話を、相手に合わせてかみ砕く","人の成長を自分のことのように喜ぶ","資料や説明を、つい作り込みすぎる"],
  love:"教えた相手が『わかった！』と笑ったとき", tired:"急かされて、ていねいに向き合えないとき", near:"人気の先生・研修講師タイプ"},
"PCFD":{catch:"「面白い」を、最初に始める人。", vibe:"熱量が高く、まわりに火をつけて回るムードメーカー。",
  aruaru:["思いついたら『とりあえずやってみよう』","場が静かだと、つい盛り上げにいく","熱しやすく、ちょっと冷めやすい"],
  love:"自分の熱に人が巻き込まれて、動き出した瞬間", tired:"同じことの繰り返しと、冷めた空気", near:"コミュニティの中心人物・発信者タイプ"},
"PCFS":{catch:"いちばんに、気持ちに気づく。", vibe:"そっと隣にいて、心の機微を感じ取る聞き手。",
  aruaru:["相手の表情の小さな変化に気づく","『大丈夫？』が自然に口から出る","人の感情を背負って、自分が疲れてしまうことも"],
  love:"そばにいた人が、安心して笑顔になったとき", tired:"対立や、人を厳しく裁く場面", near:"みんなの相談相手・聞き上手タイプ"},
"TLOD":{catch:"仕組みで、現場を回しきる。", vibe:"感覚より数字。淡々と、確実に最適化していく。",
  aruaru:["ムダな工程を見つけると、直したくなる","『それ、何分かかる？』をいつも考えている","計画表とチェックリストに安心する"],
  love:"現場が、自分の設計どおりぴたりと回ったとき", tired:"理屈の通らない、感情だけの意思決定", near:"工場長・オペレーション責任者タイプ"},
"TLOS":{catch:"細部に、神を宿す。", vibe:"目立たないが、正確さでは誰にも負けない。",
  aruaru:["1円・1ピクセルのズレが気になる","『一応もう一回確認します』が口ぐせ","静かに集中できる時間が、いちばん幸せ"],
  love:"複雑な作業を、ミスなく仕上げきったとき", tired:"雑な仕事と、せかされる納期", near:"凄腕の経理・バックエンドエンジニアタイプ"},
"TLFD":{catch:"先に、未来へ走っていく。", vibe:"新しい技術と勝負どころに、迷わず飛び込む。",
  aruaru:["新しいツールが出ると、とりあえず即さわる","『それ、もっと速くできない？』が口ぐせ","退屈な定型業務は、すぐ仕組み化したくなる"],
  love:"新しい領域で、誰より早く形にできたとき", tired:"前例主義と、変化を嫌う空気", near:"スタートアップCTO・開発リードタイプ"},
"TLFS":{catch:"「なぜ？」を、どこまでも。", vibe:"ひとつの問いを、静かに深く掘り続ける探究者。",
  aruaru:["気になると、朝まで調べてしまう","『それの根拠は？』を反射で聞いてしまう","雑談より、深い議論のほうが好き"],
  love:"ずっと解けなかった謎が、つながった瞬間", tired:"浅い結論で、話を切り上げられること", near:"研究者・データサイエンティストタイプ"},
"TCOD":{catch:"美しさも、強度も、ゆずらない。", vibe:"構想から細部まで、一本の筋を通して設計する。",
  aruaru:["まず全体像を描いてから、手を動かす","美しさと機能、両方そろわないと気が済まない","話しながら、つい図やラフを描き出す"],
  love:"頭の中の設計が、寸分なく形になったとき", tired:"品質を妥協させられる進行", near:"建築家・プロダクト設計リードタイプ"},
"TCOS":{catch:"いいものは、急がない。", vibe:"自分の世界観を、こつこつ磨き上げる作り手。",
  aruaru:["細部に手を入れ出すと、止まらない","納得いくまで、何度でも作り直す","派手な発信より、作品で語りたい"],
  love:"こだわり抜いた一点が、ぴたりと決まったとき", tired:"質より量とスピードを求められる場面", near:"デザイナー・工芸作家タイプ"},
"TCFD":{catch:"ないなら、つくればいい。", vibe:"前例ゼロでも、面白ければ突っ込んでいく開拓者。",
  aruaru:["『これ誰もやってないよね？』にワクワクする","思いつきを、すぐ試作してしまう","完成より、次の新しいネタに目移りしがち"],
  love:"世にまだ無いものを、最初に生み出したとき", tired:"決まりきった手順と、地道な保守作業", near:"プロダクト起業家・発明家タイプ"},
"TCFS":{catch:"私は、私の道をいく。", vibe:"しばられず、感性のままに表現する自由人。",
  aruaru:["興味が向いた瞬間に、深く没頭する","型や流行に『で、自分はどう思う？』と問う","ひとりの時間がないと、枯れてしまう"],
  love:"自分の感性そのものが、作品になった瞬間", tired:"管理・締め切り・横並びの空気", near:"アーティスト・フリーの作家タイプ"},
};

const GROUPS = [{"id": "PL", "color": "#D99A1E", "dark": "#946410", "bg": "#F8EFD6", "emoji": "🟡", "name": "ビジネス・推進タイプ", "axis": "人 × 論理", "desc": "人を相手に、論理と戦略で組織や成果を動かす。営業・経営・人事・コンサル。", "codes": ["PLOD", "PLOS", "PLFD", "PLFS"]}, {"id": "PC", "color": "#8B6FB0", "dark": "#5E4684", "bg": "#ECE3F2", "emoji": "🟣", "name": "クリエイティブ・発信タイプ", "axis": "人 × 創造", "desc": "人の心に届ける。マーケティング・広報・企画・教育・表現。", "codes": ["PCOD", "PCOS", "PCFD", "PCFS"]}, {"id": "TL", "color": "#4A90B8", "dark": "#2E6A8E", "bg": "#E3EDF4", "emoji": "🔵", "name": "ロジカル・テクニカルタイプ", "axis": "課題 × 論理", "desc": "データと仕組みを、正確なロジックで動かす。事務・経理・エンジニア・研究。", "codes": ["TLOD", "TLOS", "TLFD", "TLFS"]}, {"id": "TC", "color": "#5A9E6F", "dark": "#3C7A4F", "bg": "#E5EFE6", "emoji": "🟢", "name": "ものづくり・デザインタイプ", "axis": "課題 × 創造", "desc": "手と発想で、かたちあるものを生み出す。デザイン・建築・職人・アート。", "codes": ["TCOD", "TCOS", "TCFD", "TCFS"]}];

const JOBS = {"PLOD": "経営・マネジメント型", "PLOS": "人事・労務型", "PLFD": "営業・交渉型", "PLFS": "コンサル・相談型", "PCOD": "企画・プロデュース型", "PCOS": "教育・育成型", "PCFD": "マーケ・PR型", "PCFS": "ケア・カウンセリング型", "TLOD": "オペレーション・管理型", "TLOS": "経理・分析型", "TLFD": "エンジニア・開発型", "TLFS": "研究・データ型", "TCOD": "設計・アーキテクト型", "TCOS": "デザイン・クラフト型", "TCFD": "プロダクト・発明型", "TCFS": "アート・自由創作型"};

function groupOf(code){ return GROUPS.find(g=>g.codes.indexOf(code)>=0); }

const IMAGES = {
  // ▼ 生成した写真のURL（またはパス）をここに貼ると、その絵に差し替わります
  // ▼ 未設定のタイプは内蔵イラストのまま表示されます
  // "PLOD": "https://example.com/PLOD.png",
  // "PLOS": "https://example.com/PLOS.png",
};
function avatarHTML(code, opts){
  opts = opts || {};
  if(opts.svgOnly) return AVATARS[code] || "";
  const base = (window.CTF && CTF.typeImgBase) ? CTF.typeImgBase : "";
  const u = IMAGES[code] || (base ? base + "mbti-" + code + ".png" : "");
  if(u){
    const fallback = (AVATARS[code] || "").replace(/"/g, "&quot;");
    const lazy = opts.eager ? "" : ' loading="lazy"';
    const cls = opts.large ? "avatar-photo avatar-photo--lg" : "avatar-photo";
    return `<img class="${cls}" src="${u}" alt=""${lazy} decoding="async" onerror="this.outerHTML='${fallback}'">`;
  }
  return AVATARS[code] || "";
}

const ORDER = Object.keys(TYPES);

/* ============================================================
   STATE + FLOW
   ============================================================ */
let idx = 0;
const answers = new Array(QUESTIONS.length).fill(null); // store chosen scale value

/* ----- lead capture (WordPress 連携) ----- */
window.CTF = window.CTF || { restUrl:"", nonce:"", resumeUrl:"/" };
let ctfCode = "";       // 現在の結果コード（例: PLOD）
let ctfTypeName = "";   // 現在の結果タイプ名
let ctfJob = "";        // 現在の職種ラベル

function ctfSubmitLead(ev){
  ev.preventDefault();
  const email = (document.getElementById("ctfEmail")||{}).value || "";
  const name  = (document.getElementById("ctfName")||{}).value || "";
  const msg   = document.getElementById("ctfMsg");
  const btn   = ev.target.querySelector("button[type=submit]");
  if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)){
    if(msg){ msg.className="ctf-msg is-err"; msg.textContent="メールアドレスの形式をご確認ください。"; }
    return false;
  }
  if(!CTF.restUrl){
    if(msg){ msg.className="ctf-msg is-err"; msg.textContent="送信先が設定されていません。"; }
    return false;
  }
  if(btn){ btn.disabled=true; btn.textContent="送信中…"; }
  fetch(CTF.restUrl, {
    method:"POST",
    headers:{ "Content-Type":"application/json", "X-WP-Nonce":CTF.nonce },
    body: JSON.stringify({ name, email, code:ctfCode, type:ctfTypeName })
  })
  .then(r=>r.json())
  .then(d=>{
    const lead = document.getElementById("ctfLead");
    if(d && d.ok){
      if(lead){
        lead.innerHTML = `
          <div class="ctf-next-h">✅ 送信ありがとうございます</div>
          <p class="ctf-next-p">「${ctfTypeName}」の結果レポートをメールでお届けします。続けて、この強みを活かした履歴書をAIで作成してみましょう。</p>
          <a class="btn ctf-resume-btn" href="${CTF.resumeUrl}">無料でAI履歴書を作成 →</a>`;
      }
    } else {
      if(msg){ msg.className="ctf-msg is-err"; msg.textContent=(d&&d.message)||"送信に失敗しました。時間をおいて再度お試しください。"; }
      if(btn){ btn.disabled=false; btn.textContent="無料で結果を受け取る"; }
    }
  })
  .catch(()=>{
    if(msg){ msg.className="ctf-msg is-err"; msg.textContent="通信エラーが発生しました。時間をおいて再度お試しください。"; }
    if(btn){ btn.disabled=false; btn.textContent="無料で結果を受け取る"; }
  });
  return false;
}

const $ = id => document.getElementById(id);
const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function ctfScrollAppToTop(){
  const body = document.querySelector(".ctf-modal__body");
  const behavior = reducedMotion() ? "auto" : "smooth";
  if(body) body.scrollTo({top:0, behavior});
  else window.scrollTo({top:0, behavior});
}

function ctfResetApp(){
  idx = 0;
  answers.fill(null);
  updateProgress();
  show("intro");
}

function ctfOpenModal(){
  const modal = $("ctfModal");
  const fab = $("ctfFab");
  if(!modal) return;
  ctfResetApp();
  modal.hidden = false;
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("ctf-modal-open");
  if(fab) fab.setAttribute("aria-expanded", "true");
  const closeBtn = modal.querySelector(".ctf-modal__close");
  if(closeBtn) closeBtn.focus();
}

function ctfCloseModal(){
  const modal = $("ctfModal");
  const fab = $("ctfFab");
  if(!modal || modal.hidden) return;
  modal.hidden = true;
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("ctf-modal-open");
  if(fab){
    fab.setAttribute("aria-expanded", "false");
    fab.focus();
  }
}

document.addEventListener("keydown", e=>{
  if(e.key === "Escape") ctfCloseModal();
});

function setAppMode(mode){
  const app = $("ctfApp");
  if(app) app.dataset.ctfMode = mode;
}

function updateQuizAmbient(){
  const el = $("quizAmbient");
  if(!el) return;
  const pct = idx / QUESTIONS.length;
  el.style.setProperty("--quiz-p", String(pct));
}

function show(stageId){
  const current = document.querySelector(".stage.is-active");
  const next = $(stageId);
  if(!next || current === next) return;
  const go = ()=>{
    document.querySelectorAll(".stage").forEach(s=>s.classList.remove("is-active","is-leaving"));
    next.classList.add("is-active");
    setAppMode(stageId);
    ctfScrollAppToTop();
  };
  if(current && !reducedMotion()){
    current.classList.add("is-leaving");
    setTimeout(go, 220);
  } else go();
}

function start(){ idx=0; answers.fill(null); show("quiz"); renderQ(); }

function updateProgress(){
  const n = idx + 1;
  const pct = Math.round((idx / QUESTIONS.length) * 100);
  const bar = $("bar");
  const qpct = $("qpct");
  const progressBar = $("progressBar");
  if(bar) bar.style.width = pct + "%";
  if(qpct) qpct.textContent = pct + "%";
  if(progressBar){
    progressBar.setAttribute("aria-valuenow", String(n));
    progressBar.setAttribute("aria-valuetext", "質問 " + n + " / 32（" + pct + "%）");
  }
  updateQuizAmbient();
}

function renderQ(){
  const q = QUESTIONS[idx];
  $("qnum").textContent = idx + 1;
  updateProgress();
  $("qtext").textContent = q.t;
  $("back").disabled = idx === 0;

  const card = $("qcard");
  if(card && !reducedMotion()){
    card.classList.remove("is-enter");
    void card.offsetWidth;
    card.classList.add("is-enter");
  }

  const box = $("dots");
  box.innerHTML = "";
  SCALE.forEach((s, i)=>{
    const b = document.createElement("button");
    b.type = "button";
    b.className = "dot" + (answers[idx] === s.v ? " is-on" : "");
    b.style.width = b.style.height = s.size + "px";
    b.style.setProperty("--c", dotColor(s.side));
    b.setAttribute("role", "radio");
    b.setAttribute("aria-checked", answers[idx] === s.v ? "true" : "false");
    b.setAttribute("aria-label", s.label);
    b.tabIndex = answers[idx] === s.v ? 0 : -1;
    b.dataset.idx = i;
    b.onclick = ()=>choose(s.v, b);
    box.appendChild(b);
  });

  const qtext = $("qtext");
  if(qtext) qtext.focus({ preventScroll: true });
}

function choose(v, el){
  answers[idx] = v;
  if(el && !reducedMotion()){
    el.classList.add("is-pulse");
    setTimeout(()=>el.classList.remove("is-pulse"), 280);
  }
  renderQ();
  const delay = reducedMotion() ? 0 : 260;
  setTimeout(()=>{
    if(idx < QUESTIONS.length - 1){ idx++; renderQ(); }
    else finish();
  }, delay);
}

function back(){ if(idx>0){ idx--; renderQ(); } }

function onQuizKey(e){
  const quiz = $("quiz");
  if(!quiz || !quiz.classList.contains("is-active")) return;
  const t = e.target;
  if(t && (t.tagName==="INPUT" || t.tagName==="TEXTAREA" || t.isContentEditable)) return;
  if(e.key>="1" && e.key<="7"){
    e.preventDefault();
    choose(SCALE[parseInt(e.key,10)-1].v);
  } else if(e.key==="ArrowLeft"){
    e.preventDefault();
    back();
  }
}
document.addEventListener("keydown", onQuizKey);

/* ----- scoring ----- */
function score(){
  const totals = [0,0,0,0];   // signed sum toward pole1 per axis
  const counts = [0,0,0,0];
  QUESTIONS.forEach((q,i)=>{
    const v = answers[i] ?? 0;
    totals[q.axis] += v * q.d;
    counts[q.axis] += 1;
  });
  return AXES.map((ax,a)=>{
    const max = counts[a]*3;                       // = 24
    const pct1 = Math.round(((totals[a]+max)/(2*max))*100); // 0..100 toward pole1
    const winner = totals[a] >= 0 ? "p1" : "p2";
    const strength = winner==="p1" ? pct1 : 100-pct1;
    return {ax, pct1, winner, strength, key:(winner==="p1"?ax.p1.k:ax.p2.k)};
  });
}

function finish(){
  const bar = $("bar");
  const qpct = $("qpct");
  const progressBar = $("progressBar");
  if(bar) bar.style.width = "100%";
  if(qpct) qpct.textContent = "100%";
  if(progressBar){
    progressBar.setAttribute("aria-valuenow", "32");
    progressBar.setAttribute("aria-valuetext", "診断完了");
  }
  const res = score();
  const code = res.map(r=>r.key).join("");
  renderResult(code, res);
  show("result");
}

function shareText(code, job, name){
  return `私の仕事タイプは「${job}」（${code}・${name}）でした！`;
}

function shareX(){
  const text = encodeURIComponent(shareText(ctfCode, ctfJob, ctfTypeName));
  const url = encodeURIComponent(location.href.split("#")[0]);
  window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, "_blank", "noopener,noreferrer");
}

function shareCopy(){
  const msg = shareText(ctfCode, ctfJob, ctfTypeName) + "\n" + location.href.split("#")[0];
  if(navigator.clipboard && navigator.clipboard.writeText){
    navigator.clipboard.writeText(msg).then(()=>{
      const el = $("shareMsg");
      if(el){ el.textContent = "リンクをコピーしました"; setTimeout(()=>{ el.textContent=""; }, 2500); }
    });
  }
}

function shareDownloadImage(){
  const canvas = document.createElement("canvas");
  const w = 1080, h = 1350;
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if(!ctx || !ctfCode) return;

  const g = groupOf(ctfCode);
  const ch = CHARS[ctfCode];
  const t = TYPES[ctfCode];
  const font = '"Hiragino Sans","Noto Sans JP","Yu Gothic",system-ui,sans-serif';

  const bg = g ? g.bg : "#EFF2F8";
  const accent = g ? g.color : "#FF6B5B";
  const dark = g ? g.dark : "#16243F";

  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);
  const grad = ctx.createRadialGradient(w * 0.5, h * 0.2, 0, w * 0.5, h * 0.2, w * 0.7);
  grad.addColorStop(0, accent + "33");
  grad.addColorStop(1, "transparent");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);

  ctx.fillStyle = dark;
  ctx.font = `600 28px ${font}`;
  ctx.textAlign = "center";
  ctx.fillText("キャリア・タイプ診断", w / 2, 100);

  ctx.font = `800 120px ui-monospace,Menlo,monospace`;
  ctx.fillStyle = accent;
  ctx.fillText(ctfCode, w / 2, 280);

  ctx.font = `800 52px ${font}`;
  ctx.fillStyle = dark;
  ctx.fillText(ctfJob, w / 2, 380);

  if(g){
    ctx.font = `700 32px ${font}`;
    ctx.fillStyle = accent;
    ctx.fillText(g.emoji + " " + g.name, w / 2, 460);
  }

  if(ch){
    ctx.font = `700 36px ${font}`;
    ctx.fillStyle = "#FF6B5B";
    const cry = "“" + ch.cry + "”";
    wrapCanvasText(ctx, cry, w / 2, 560, w - 120, 48);
  }

  if(t){
    ctx.font = `600 30px ${font}`;
    ctx.fillStyle = "#5A6B85";
    wrapCanvasText(ctx, t.name, w / 2, 700, w - 120, 42);
  }

  ctx.font = `500 24px ${font}`;
  ctx.fillStyle = "#94A2BB";
  ctx.fillText("職業タイプ診断 · 16 types", w / 2, h - 80);

  canvas.toBlob(blob=>{
    if(!blob) return;
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "career-type-" + ctfCode + ".png";
    a.click();
    URL.revokeObjectURL(a.href);
    const el = $("shareMsg");
    if(el){ el.textContent = "画像を保存しました"; setTimeout(()=>{ el.textContent=""; }, 2500); }
  }, "image/png");
}

function wrapCanvasText(ctx, text, x, y, maxWidth, lineHeight){
  const chars = text.split("");
  let line = "";
  const lines = [];
  chars.forEach(ch=>{
    const test = line + ch;
    if(ctx.measureText(test).width > maxWidth && line){
      lines.push(line);
      line = ch;
    } else line = test;
  });
  if(line) lines.push(line);
  lines.forEach((ln, i)=>ctx.fillText(ln, x, y + i * lineHeight));
}

/* ----- render result ----- */
function renderResult(code, res){
  const t = TYPES[code];
  const ch = CHARS[code];
  const g = groupOf(code);
  const job = JOBS[code];
  const pr = PERSONA[code] || {};

  ctfCode = code;
  ctfTypeName = t.name;
  ctfJob = job;

  const bars = res.map(r=>{
    const win = r.winner==="p1" ? r.ax.p1 : r.ax.p2;
    const lose = r.winner==="p1" ? r.ax.p2 : r.ax.p1;
    const color = r.winner==="p1" ? "agree" : "disagree";
    const from = r.winner==="p1" ? "from-l" : "from-r";
    const winShort = win.label.split(" ")[0];
    const loseShort = lose.label.split(" ")[0];
    return `
      <div class="bar">
        <div class="bar-top">
          <span class="${r.winner==='p1'?'win':'lose'}">${winShort}</span>
          <span class="bar-pct bar-pct--${color}">${winShort} ${r.strength}%</span>
          <span class="${r.winner==='p2'?'win':'lose'}">${loseShort}</span>
        </div>
        <div class="bar-track"><i class="bar-fill ${color} ${from}" data-w="${r.strength}" style="width:0" role="presentation"></i></div>
      </div>`;
  }).join("");

  const li = (arr,cls="")=> `<ul class="ul ${cls}">`+arr.map(x=>`<li>${x}</li>`).join("")+`</ul>`;
  const chips = t.careers.map(c=>`<span class="chip">${c}</span>`).join("");
  const matches = t.match.map(mc=>{
    const m = TYPES[mc];
    return `<div class="match-card"><div class="mc">${mc}</div><div class="mn">${m.e} ${m.name}</div></div>`;
  }).join("");

  const coded = code.split("").map(c=>`<b>${c}</b>`).join("");

  $("result").innerHTML = `
    <div class="card res-card is-revealing">
      <div class="res-head" style="--gc:${g.color};--gbg:${g.bg};--gd:${g.dark}">
        <div class="res-code" aria-label="タイプコード ${code}">${coded}</div>
        <div class="res-job">${job}</div>
        <div class="avatar avatar--lg" role="img" aria-label="${ch.role}">${avatarHTML(code, { large: true, eager: true })}</div>
        <div class="res-group">${g.emoji} ${g.name}<small>${g.axis}</small></div>
        <p class="res-cry">“${ch.cry}”</p>
        <div class="res-name">${t.name}</div>
        <div class="res-nick">${ch.role}（通称「${ch.title}」）</div>
        ${pr.catch ? `<p class="res-catch">${pr.catch}</p>` : ``}
        <p class="res-char">${ch.char} ${t.essence}</p>
        <div class="riasec">適性領域 ／ ${t.riasec}</div>
      </div>

      ${ pr.aruaru ? `
      <div class="persona" style="--gc:${g.color};--gbg:${g.bg}">
        <h3 class="persona-h">この人、こんな人</h3>
        ${pr.vibe ? `<p class="persona-vibe">${pr.vibe}</p>` : ``}
        <ul class="persona-aruaru">
          ${pr.aruaru.map(a=>`<li>${a}</li>`).join("")}
        </ul>
        <div class="persona-grid">
          ${pr.love ? `<div class="persona-cell persona-love"><span class="persona-cap">燃える瞬間</span><p>${pr.love}</p></div>` : ``}
          ${pr.tired ? `<div class="persona-cell persona-tired"><span class="persona-cap">消耗する瞬間</span><p>${pr.tired}</p></div>` : ``}
        </div>
        ${pr.near ? `<p class="persona-near"><span class="persona-cap">近いイメージ</span>${pr.near}</p>` : ``}
      </div>` : `` }

      <div class="bars">
        <h3>4つの軸のスコア</h3>
        ${bars}
      </div>

      <div class="block">
        <h3>強み</h3>
        ${li(t.strengths,"soft")}
      </div>

      <div class="block">
        <h3>向いている環境・働き方</h3>
        ${li(t.env)}
      </div>

      <div class="block">
        <h3>おすすめの職業・キャリア</h3>
        <div class="chips">${chips}</div>
      </div>

      <div class="block">
        <h3>気をつけたいこと</h3>
        ${li(t.warn,"warn")}
      </div>

      <div class="block">
        <h3>相性のよいタイプ</h3>
        <div class="match">${matches}</div>
      </div>
    </div>

    <div class="ctf-next card" id="ctfNext">
      <div class="ctf-next-grid">
        <div class="ctf-lead" id="ctfLead">
          <div class="ctf-next-h">📩 結果レポートをメールで受け取る</div>
          <p class="ctf-next-p">「${t.name}」の強みの活かし方と、向いている求人の探し方をまとめてお届けします。</p>
          <form class="ctf-form" onsubmit="return ctfSubmitLead(event)">
            <input class="ctf-inp" type="text" id="ctfName" placeholder="お名前（任意）" autocomplete="name">
            <input class="ctf-inp" type="email" id="ctfEmail" placeholder="メールアドレス" autocomplete="email" required>
            <button class="btn ctf-form-btn" type="submit">無料で結果を受け取る</button>
            <div class="ctf-msg" id="ctfMsg" role="status"></div>
          </form>
        </div>
        <div class="ctf-resume">
          <div class="ctf-next-h">📝 この強みで履歴書をつくる</div>
          <p class="ctf-next-p">診断でわかった強みを活かして、AIが履歴書・職務経歴書を無料で作成します。スマホで最短5分、PDFでお届け。</p>
          <a class="btn ctf-resume-btn" href="${CTF.resumeUrl}">無料でAI履歴書を作成 →</a>
        </div>
      </div>
    </div>

    <div class="res-share">
      <div class="share-card" id="shareCardPreview" style="--gc:${g.color};--gbg:${g.bg};--gd:${g.dark}">
        <div class="share-card__brand">キャリア・タイプ診断</div>
        <div class="share-card__code">${code}</div>
        <div class="share-card__job">${job}</div>
        <div class="share-card__group">${g.emoji} ${g.name}</div>
        <p class="share-card__cry">“${ch.cry}”</p>
        <div class="share-card__name">${t.name}</div>
      </div>
      <span class="res-share-lbl">結果をシェア</span>
      <div class="res-share-btns">
        <button class="share-btn share-btn--x" type="button" onclick="shareX()">X でシェア</button>
        <button class="share-btn share-btn--img" type="button" onclick="shareDownloadImage()">画像を保存</button>
        <button class="share-btn share-btn--copy" type="button" onclick="shareCopy()">リンクをコピー</button>
      </div>
      <p class="share-msg" id="shareMsg" role="status" aria-live="polite"></p>
    </div>

    <div class="disclaimer">
      この診断は、あなたの傾向を言葉にして<b>自己理解とキャリアの仮説づくりを助ける</b>ためのものです。能力や将来を断定するものではありません。気になる職業があれば、ぜひ一次情報や実際の体験で確かめてみてください。
    </div>

    <div class="res-foot">
      <button class="btn" type="button" onclick="start()">もう一度診断する</button>
      <button class="btn--ghost" type="button" onclick="openGallery()">16タイプ図鑑</button>
    </div>
  `;

  const animBars = ()=>{
    document.querySelectorAll(".bar-fill").forEach((el, i)=>{
      if(reducedMotion()) el.style.width = el.dataset.w + "%";
      else setTimeout(()=>{ el.style.width = el.dataset.w + "%"; }, 80 + i * 90);
    });
  };
  requestAnimationFrame(()=>requestAnimationFrame(animBars));

  if(!reducedMotion()){
    const card = document.querySelector(".res-card.is-revealing");
    if(card){
      setTimeout(()=>card.classList.add("is-revealed"), 40);
    }
  }
}

/* ----- gallery + cast ----- */
function openGallery(){ renderGallery(); show("gallery"); }
function renderGallery(){
  const quad = GROUPS.map(g=>{
    const cards = g.codes.map(code=>{
      const t=TYPES[code];
      return `<button class="tcard" type="button" onclick="showTypePreview('${code}')" aria-label="${JOBS[code]} ${code}">
        <div class="avatar" role="img" aria-hidden="true">${avatarHTML(code, { svgOnly: true })}</div>
        <div class="tjob">${JOBS[code]}</div>
        <div class="tcode">${code}</div>
      </button>`;
    }).join("");
    return `<div class="gal-group" style="--gc:${g.color};--gbg:${g.bg};--gd:${g.dark}">
      <div class="gal-gh">
        <span class="gal-dot" style="background:${g.color}"></span>
        <span class="gal-gname" style="color:${g.dark}">${g.emoji} ${g.name}</span>
      </div>
      <p class="gal-gaxis">${g.axis}</p>
      <p class="gal-gdesc">${g.desc}</p>
      <div class="gal-grow">${cards}</div>
    </div>`;
  }).join("");
  document.getElementById("gallery").innerHTML = `
    <div class="gal-top">
      <div class="gal-h">16タイプ ｜ 4つの仕事カラー</div>
      <button class="btn--ghost" type="button" onclick="show('intro')">← 戻る</button>
    </div>
    <p class="gal-sub">「関心（人／課題）」×「思考（論理／創造）」で4色に分かれ、各色の中で〈進め方〉と〈役割〉により4タイプに分かれます。</p>
    <div class="gal-quad" aria-label="16タイプ図鑑 4象限">
      ${quad}
    </div>
    <div class="res-foot"><button class="btn" type="button" onclick="start()">診断をはじめる</button></div>`;
}

function showTypePreview(code){
  const fakeRes = code.split("").map((ch,i)=>{
    const ax = AXES[i];
    const isP1 = ax.p1.k === ch;
    return {ax, winner:isP1?"p1":"p2", strength:62, key:ch};
  });
  renderResult(code, fakeRes);
  show("result");
}
function initCast(){
  const row=document.getElementById("castRow");
  if(row) row.innerHTML = ORDER.map(c=>{
    const g = groupOf(c);
    return `<button class="cast-avatar" type="button" style="--gc:${g.color}" onclick="openGallery()" aria-label="${JOBS[c]} ${c}">
      <span class="avatar" aria-hidden="true">${avatarHTML(c, { svgOnly: true })}</span>
    </button>`;
  }).join("");
}
initCast();
setAppMode("intro");
