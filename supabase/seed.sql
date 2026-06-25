-- 初期シード: 人材2名
-- schema.sql 実行後に実行してください。

insert into public.talents (
  name,
  age,
  gender,
  role,
  company,
  bio,
  experience_programs,
  genres,
  skills,
  specialties,
  qualifications,
  hashtags,
  is_active
) values
(
  '松丸志保',
  null,
  null,
  'AD',
  null,
  'リサーチ、ロケ、編集、収録準備、デスク業務経験。趣味は読書、韓国語学習。',
  array['NTV特番「国民一斉調査」（2024年4月〜7月）', 'MBS「プレバト！！」（2024年8月〜10月）', 'EX「ミラクル9」（2024年12月〜）'],
  array['バラエティ'],
  array['リサーチ', 'ロケ', '編集', '収録準備', 'デスク業務'],
  array['読書', '韓国語学習'],
  array[]::text[],
  array['AD', 'バラエティ', 'リサーチ', 'ロケ', '編集', 'デスク業務', '韓国語', '読書'],
  true
),
(
  '樋口舞冬',
  null,
  null,
  'AD',
  '博報堂プロダクツ 動画コンテンツクリエイティブ事業本部',
  'リサーチ、仕込み、ロケ、編集のAD業務全般。',
  array['EX「帰れマンデー見っけ隊!!」', 'WOKASHI'],
  array['バラエティ', 'Web動画'],
  array['リサーチ', '仕込み', 'ロケ', '編集'],
  array[]::text[],
  array['普通自動車第一種運転免許'],
  array['AD', 'バラエティ', 'ロケ', '編集', '仕込み', 'リサーチ', '運転免許', '臨機応変'],
  true
);
