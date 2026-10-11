import Database from "better-sqlite3";
import fs from "node:fs";
import path from "node:path";
import type { Challenge, Kelas, Level } from "./types";

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
  title: string;
  brief: string;
  maze_json: string;
  allowed_blocks_json: string;
  win_condition_json: string;
  hints_json: string;
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
    ch.id, ch.title, ch.brief, ch.maze_json, ch.allowed_blocks_json,
    ch.win_condition_json, ch.hints_json, ch.difficulty, ch.level_id,
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
  const maze = parseJson<Challenge["maze"]>(row.maze_json, {
    size: 0,
    cells: [],
    start: { col: 0, row: 0, facing: "timur" },
  });
  return {
    id: row.id,
    title: row.title,
    brief: row.brief,
    maze,
    allowedBlocks: parseJson<string[]>(row.allowed_blocks_json, []),
    winCondition: parseJson<Challenge["winCondition"]>(row.win_condition_json, {
      type: "reach_goal",
    }),
    hints: parseJson<string[]>(row.hints_json, []),
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
