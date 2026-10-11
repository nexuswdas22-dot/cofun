// Seed database CoFun dari file JSON di data/.
// Jalankan: npm run seed  (idempotent: data lama per kelas diganti seluruhnya)

import fs from "node:fs";
import path from "node:path";
import Database from "better-sqlite3";

type SeedChallenge = {
  urutan?: number;
  title: string;
  brief: string;
  maze: unknown;
  allowedBlocks: string[];
  winCondition: unknown;
  hints?: string[];
  difficulty?: number;
  isPublished?: boolean;
};

type SeedLevel = {
  nomor: number;
  title: string;
  topic?: string;
  desc?: string;
  skills?: string[];
  btnText?: string;
  nodeLabel?: string;
  nodeIcon?: string;
  xpReward?: number;
  isPublished?: boolean;
  challenges?: SeedChallenge[];
};

type SeedKelas = {
  slug: string;
  nomor: number;
  judul: string;
  badge?: string;
  pulau?: string;
  chip?: string;
  bannerTitle?: string;
  bannerCode?: string;
  ctaEnabled?: boolean;
  levelAktif?: number;
  isPublished?: boolean;
  levels: SeedLevel[];
};

const root = process.cwd();
const dataDir = path.join(root, "data");
const dbPath = path.join(dataDir, "cofun.db");
const schemaPath = path.join(root, "lib", "db", "schema.sql");

if (!fs.existsSync(dataDir)) {
  console.error("Folder data/ tidak ditemukan.");
  process.exit(1);
}

fs.mkdirSync(dataDir, { recursive: true });
const db = new Database(dbPath);
db.pragma("journal_mode = WAL");
db.exec(fs.readFileSync(schemaPath, "utf8"));

const files = fs
  .readdirSync(dataDir)
  .filter((name) => name.endsWith(".json") && name.startsWith("kelas-"))
  .sort();

if (files.length === 0) {
  console.error("Tidak ada file kelas-*.json di folder data/.");
  process.exit(1);
}

const insertKelas = db.prepare(`
  INSERT INTO kelas (slug, nomor, judul, badge, pulau, chip, banner_title, banner_code,
                     cta_enabled, level_aktif, is_published)
  VALUES (@slug, @nomor, @judul, @badge, @pulau, @chip, @bannerTitle, @bannerCode,
          @ctaEnabled, @levelAktif, @isPublished)
`);

const insertLevel = db.prepare(`
  INSERT INTO levels (kelas_id, nomor, title, topic, desc, skills_json, btn_text,
                      node_label, node_icon, xp_reward, is_published)
  VALUES (@kelasId, @nomor, @title, @topic, @desc, @skillsJson, @btnText,
          @nodeLabel, @nodeIcon, @xpReward, @isPublished)
`);

const insertChallenge = db.prepare(`
  INSERT INTO challenges (level_id, urutan, title, brief, maze_json, allowed_blocks_json,
                          win_condition_json, hints_json, difficulty, is_published)
  VALUES (@levelId, @urutan, @title, @brief, @mazeJson, @allowedBlocksJson,
          @winConditionJson, @hintsJson, @difficulty, @isPublished)
`);

const seedOne = db.transaction((kelas: SeedKelas) => {
  db.prepare("DELETE FROM kelas WHERE slug = ?").run(kelas.slug);

  const kelasId = insertKelas.run({
    slug: kelas.slug,
    nomor: kelas.nomor,
    judul: kelas.judul,
    badge: kelas.badge ?? null,
    pulau: kelas.pulau ?? null,
    chip: kelas.chip ?? null,
    bannerTitle: kelas.bannerTitle ?? null,
    bannerCode: kelas.bannerCode ?? null,
    ctaEnabled: kelas.ctaEnabled ? 1 : 0,
    levelAktif: kelas.levelAktif ?? 1,
    isPublished: kelas.isPublished === false ? 0 : 1,
  }).lastInsertRowid;

  for (const level of kelas.levels) {
    const levelId = insertLevel.run({
      kelasId,
      nomor: level.nomor,
      title: level.title,
      topic: level.topic ?? null,
      desc: level.desc ?? null,
      skillsJson: JSON.stringify(level.skills ?? []),
      btnText: level.btnText ?? null,
      nodeLabel: level.nodeLabel ?? null,
      nodeIcon: level.nodeIcon ?? null,
      xpReward: level.xpReward ?? 80,
      isPublished: level.isPublished === false ? 0 : 1,
    }).lastInsertRowid;

    for (const challenge of level.challenges ?? []) {
      insertChallenge.run({
        levelId,
        urutan: challenge.urutan ?? 1,
        title: challenge.title,
        brief: challenge.brief,
        mazeJson: JSON.stringify(challenge.maze),
        allowedBlocksJson: JSON.stringify(challenge.allowedBlocks ?? []),
        winConditionJson: JSON.stringify(challenge.winCondition ?? { type: "reach_goal" }),
        hintsJson: JSON.stringify(challenge.hints ?? []),
        difficulty: challenge.difficulty ?? 1,
        isPublished: challenge.isPublished === false ? 0 : 1,
      });
    }
  }

  const totalChallenges = kelas.levels.reduce(
    (sum, level) => sum + (level.challenges?.length ?? 0),
    0,
  );
  console.log(
    `✓ ${kelas.slug}: ${kelas.levels.length} level, ${totalChallenges} soal`,
  );
});

let totalKelas = 0;
for (const file of files) {
  const raw = fs.readFileSync(path.join(dataDir, file), "utf8");
  let parsed: SeedKelas;
  try {
    parsed = JSON.parse(raw) as SeedKelas;
  } catch (error) {
    console.error(`✗ ${file}: JSON tidak valid.`, error);
    process.exit(1);
  }
  if (!parsed.slug || !Array.isArray(parsed.levels)) {
    console.error(`✗ ${file}: field slug/levels tidak valid.`);
    process.exit(1);
  }
  seedOne(parsed);
  totalKelas += 1;
}

console.log(`\nSeed selesai: ${totalKelas} kelas -> ${dbPath}`);
db.close();
