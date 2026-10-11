import Database from "better-sqlite3";
import fs from "node:fs";
import path from "node:path";
import type { Challenge, Kelas, KuisPayload, Level, MazeData, WinCondition } from "./types";

const DB_DIR = path.join(process.cwd(), "data");
const DB_PATH = path.join(DB_DIR, "cofun.db");
const SCHEMA_PATH = path.join(process.cwd(), "lib", "db", "schema.sql");

declare global {
  var __cofunDb: Database.Database | undefined;
}

function openDatabase(): Database.Database {
  fs.mkdirSync(DB_DIR, { recursive: true });
  const db = new Database(DB_PATH);
  db.pragma("journal_mode = WAL");
  db.exec(fs.readFileSync(SCHEMA_PATH, "utf8"));
  return db;
}

export function getDb(): Database.Database {
  if (!globalThis.__cofunDb) {
    globalThis.__cofunDb = openDatabase();
  }
  return globalThis.__cofunDb;
}

function parseJson<T>(raw: string, fallback: T): T {
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

type KelasRow = {
  id: number;
  slug: string;
  nomor: number;
  judul: string;
  badge: string | null;
  pulau: string | null;
  chip: string | null;
  banner_title: string | null;
  banner_code: string | null;
  cta_enabled: number;
  level_aktif: number;
};

type LevelRow = {
  id: number;
  kelas_id: number;
  nomor: number;
  title: string;
  topic: string | null;
  desc: string | null;
  skills_json: string;
  btn_text: string | null;
  node_label: string | null;
  node_icon: string | null;
  xp_reward: number;
  visual: string | null;
};

function toLevel(row: LevelRow): Level {
  return {
    id: row.nomor,
    title: row.title,
    topic: row.topic ?? "",
    desc: row.desc ?? "",
    skills: parseJson<string[]>(row.skills_json, []),
    btnText: row.btn_text ?? "Mulai Level",
    nodeLabel: row.node_label ?? row.title,
    nodeIcon: row.node_icon ?? "extension",
    xpReward: row.xp_reward,
    visual: row.visual,
  };
}

function toKelas(row: KelasRow, levels: Level[]): Kelas {
  return {
    slug: row.slug,
    nomor: row.nomor,
    judul: row.judul,
    badge: row.badge ?? "",
    pulau: row.pulau ?? "",
    chip: row.chip ?? "",
    levelAktif: row.level_aktif,
    ctaEnabled: row.cta_enabled === 1,
    bannerTitle: row.banner_title ?? "",
    bannerCode: row.banner_code ?? "",
    levels,
  };
}

export function getAllKelas(): Kelas[] {
  const db = getDb();
  const kelasRows = db
    .prepare("SELECT * FROM kelas WHERE is_published = 1 ORDER BY nomor")
    .all() as KelasRow[];
  const levelStmt = db.prepare(
    "SELECT * FROM levels WHERE kelas_id = ? AND is_published = 1 ORDER BY nomor",
  );
  return kelasRows.map((row) =>
    toKelas(row, (levelStmt.all(row.id) as LevelRow[]).map(toLevel)),
  );
}

export function getKelasBySlug(slug: string): Kelas | undefined {
  const db = getDb();
  const row = db.prepare("SELECT * FROM kelas WHERE slug = ? AND is_published = 1").get(slug) as
    | KelasRow
    | undefined;
  if (!row) return undefined;
  const levels = db
    .prepare("SELECT * FROM levels WHERE kelas_id = ? AND is_published = 1 ORDER BY nomor")
    .all(row.id) as LevelRow[];
  return toKelas(row, levels.map(toLevel));
}

type ChallengeRow = {
  id: number;
  tipe: string;
  title: string;
  brief: string;
  tujuan: string | null;
  materi: string | null;
  contoh: string | null;
  kondisi_awal: string | null;
  batasan_json: string;
  kriteria: string | null;
  hints_json: string;
  feedback_sukses: string | null;
  feedback_gagal: string | null;
  maze_json: string | null;
  allowed_blocks_json: string;
  win_condition_json: string;
  payload_json: string | null;
  difficulty: number;
  level_id: number;
  level_nomor: number;
  level_title: string;
  level_topic: string | null;
  xp_reward: number;
  kelas_slug: string;
  kelas_nomor: number;
  kelas_judul: string;
  kelas_chip: string | null;
  total_levels: number;
};

const CHALLENGE_SELECT = `
  SELECT
    ch.id, ch.tipe, ch.title, ch.brief, ch.tujuan, ch.materi, ch.contoh, ch.kondisi_awal,
    ch.batasan_json, ch.kriteria, ch.hints_json, ch.feedback_sukses, ch.feedback_gagal,
    ch.maze_json, ch.allowed_blocks_json, ch.win_condition_json, ch.payload_json,
    ch.difficulty, ch.level_id,
    lv.nomor AS level_nomor, lv.title AS level_title, lv.topic AS level_topic,
    lv.xp_reward,
    k.slug AS kelas_slug, k.nomor AS kelas_nomor, k.judul AS kelas_judul, k.chip AS kelas_chip,
    (SELECT COUNT(*) FROM levels lv2 WHERE lv2.kelas_id = k.id AND lv2.is_published = 1) AS total_levels
  FROM challenges ch
  JOIN levels lv ON lv.id = ch.level_id
  JOIN kelas k ON k.id = lv.kelas_id
  WHERE ch.is_published = 1 AND lv.is_published = 1 AND k.is_published = 1
`;

function toChallenge(row: ChallengeRow): Challenge {
  const hints = parseJson<string[]>(row.hints_json, []);
  return {
    id: row.id,
    tipe: row.tipe === "kuis" ? "kuis" : "blockly",
    title: row.title,
    brief: row.brief,
    tujuan: row.tujuan ?? "",
    materi: row.materi ?? "",
    contoh: row.contoh ?? "",
    kondisiAwal: row.kondisi_awal ?? "",
    batasan: parseJson<string[]>(row.batasan_json, []),
    kriteria: row.kriteria ?? "",
    hint: hints[0] ?? "",
    feedbackSukses: row.feedback_sukses ?? "",
    feedbackGagal: row.feedback_gagal ?? "",
    maze: row.maze_json ? parseJson<MazeData | null>(row.maze_json, null) : null,
    allowedBlocks: parseJson<string[]>(row.allowed_blocks_json, []),
    winCondition: parseJson<WinCondition>(row.win_condition_json, { type: "reach_goal" }),
    kuis:
      row.tipe === "kuis" && row.payload_json
        ? parseJson<KuisPayload | null>(row.payload_json, null)
        : null,
    initialBlocks:
      row.tipe === "blockly" && row.payload_json
        ? parseJson<Record<string, unknown> | null>(row.payload_json, null)
        : null,
    difficulty: row.difficulty,
    levelId: row.level_id,
    levelNomor: row.level_nomor,
    levelTitle: row.level_title,
    levelTopic: row.level_topic ?? "",
    xpReward: row.xp_reward,
    kelasSlug: row.kelas_slug,
    kelasNomor: row.kelas_nomor,
    kelasJudul: row.kelas_judul,
    kelasChip: row.kelas_chip ?? "",
    totalLevels: row.total_levels || 5,
  };
}

// Soal arena per level: satu challenge per level (urutan pertama).
export function getChallengeForLevel(kelasSlug: string, levelNomor: number): Challenge | undefined {
  const db = getDb();
  const row = db
    .prepare(`${CHALLENGE_SELECT} AND k.slug = ? AND lv.nomor = ? ORDER BY ch.urutan LIMIT 1`)
    .get(kelasSlug, levelNomor) as ChallengeRow | undefined;
  return row ? toChallenge(row) : undefined;
}

// Materi isi soal tiap level (untuk drawer peta): nomor level -> materi challenge.
export function getMateriPerLevel(kelasSlug: string): Record<number, string> {
  const db = getDb();
  const rows = db
    .prepare(
      `SELECT lv.nomor AS level_nomor, ch.materi
       FROM challenges ch
       JOIN levels lv ON lv.id = ch.level_id
       JOIN kelas k ON k.id = lv.kelas_id
       WHERE k.slug = ? AND ch.is_published = 1 AND lv.is_published = 1
       ORDER BY lv.nomor, ch.urutan`,
    )
    .all(kelasSlug) as { level_nomor: number; materi: string | null }[];
  const result: Record<number, string> = {};
  for (const row of rows) {
    if (row.materi && result[row.level_nomor] === undefined) {
      result[row.level_nomor] = row.materi;
    }
  }
  return result;
}

// Soal yang dibuka di arena /belajar-dan-tantangan (urutan published pertama).
export function getArenaChallenge(): Challenge | undefined {
  const db = getDb();
  const row = db
    .prepare(`${CHALLENGE_SELECT} ORDER BY k.nomor, lv.nomor, ch.urutan LIMIT 1`)
    .get() as ChallengeRow | undefined;
  return row ? toChallenge(row) : undefined;
}

export function getChallengeById(id: number): Challenge | undefined {
  const db = getDb();
  const row = db.prepare(`${CHALLENGE_SELECT} AND ch.id = ?`).get(id) as ChallengeRow | undefined;
  return row ? toChallenge(row) : undefined;
}

export function getChallengesForLevel(levelId: number): Challenge[] {
  const db = getDb();
  const rows = db
    .prepare(`${CHALLENGE_SELECT} AND ch.level_id = ? ORDER BY ch.urutan`)
    .all(levelId) as ChallengeRow[];
  return rows.map(toChallenge);
}
