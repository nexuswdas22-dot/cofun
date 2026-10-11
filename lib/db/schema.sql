CREATE TABLE IF NOT EXISTS kelas (
  id INTEGER PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  nomor INTEGER NOT NULL UNIQUE,
  judul TEXT NOT NULL,
  badge TEXT,
  pulau TEXT,
  chip TEXT,
  banner_title TEXT,
  banner_code TEXT,
  cta_enabled INTEGER NOT NULL DEFAULT 0,
  level_aktif INTEGER NOT NULL DEFAULT 1,
  is_published INTEGER NOT NULL DEFAULT 1
);

CREATE TABLE IF NOT EXISTS levels (
  id INTEGER PRIMARY KEY,
  kelas_id INTEGER NOT NULL REFERENCES kelas(id) ON DELETE CASCADE,
  nomor INTEGER NOT NULL,
  title TEXT NOT NULL,
  topic TEXT,
  desc TEXT,
  skills_json TEXT NOT NULL DEFAULT '[]',
  btn_text TEXT,
  node_label TEXT,
  node_icon TEXT,
  xp_reward INTEGER NOT NULL DEFAULT 80,
  is_published INTEGER NOT NULL DEFAULT 1,
  UNIQUE(kelas_id, nomor)
);

CREATE TABLE IF NOT EXISTS challenges (
  id INTEGER PRIMARY KEY,
  level_id INTEGER NOT NULL REFERENCES levels(id) ON DELETE CASCADE,
  urutan INTEGER NOT NULL DEFAULT 1,
  title TEXT NOT NULL,
  brief TEXT NOT NULL,
  maze_json TEXT NOT NULL,
  allowed_blocks_json TEXT NOT NULL,
  win_condition_json TEXT NOT NULL,
  hints_json TEXT NOT NULL DEFAULT '[]',
  difficulty INTEGER NOT NULL DEFAULT 1,
  is_published INTEGER NOT NULL DEFAULT 1,
  UNIQUE(level_id, urutan)
);

CREATE INDEX IF NOT EXISTS idx_levels_kelas ON levels(kelas_id, nomor);
CREATE INDEX IF NOT EXISTS idx_challenges_level ON challenges(level_id, urutan);
