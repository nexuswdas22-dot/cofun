// Seed database CoFun dari file JSON di data/.
// Jalankan: npm run seed  (idempotent: data lama per kelas diganti seluruhnya)

import fs from "node:fs";
import path from "node:path";
import Database from "better-sqlite3";

type SeedChallenge = {
  urutan?: number;
  tipe?: "blockly" | "kuis";
  title: string;
  brief: string;
  tujuan?: string;
  materi?: string;
  contoh?: string;
  kondisiAwal?: string;
  batasan?: string[];
  kriteria?: string;
  hints?: string[];
  feedbackSukses?: string;
  feedbackGagal?: string;
  maze?: unknown;
  allowedBlocks?: string[];
  winCondition?: unknown;
  kuis?: unknown;
  initialBlocks?: unknown;
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
  visual?: string;
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

// Baca & validasi SEMUA file JSON dulu sebelum menyentuh database,
// agar DB lama tidak rusak kalau ada input yang tidak valid.
const files = fs
  .readdirSync(dataDir)
  .filter((name) => name.endsWith(".json") && name.startsWith("kelas-"))
  .sort();

if (files.length === 0) {
  console.error("Tidak ada file kelas-*.json di folder data/.");
  process.exit(1);
}

const parsedKelasList: SeedKelas[] = [];
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
  // Validasi setiap challenge sebelum menyentuh DB.
  for (const level of parsed.levels) {
    for (const challenge of level.challenges ?? []) {
      const tipe = challenge.tipe ?? "blockly";
      if (tipe === "blockly" && !challenge.maze) {
        console.error(`✗ ${parsed.slug} L${level.nomor}: challenge blockly tanpa maze.`);
        process.exit(1);
      }
      if (tipe === "kuis" && !challenge.kuis) {
        console.error(`✗ ${parsed.slug} L${level.nomor}: challenge kuis tanpa payload kuis.`);
        process.exit(1);
      }
    }
  }
  parsedKelasList.push(parsed);
}

fs.mkdirSync(dataDir, { recursive: true });
const db = new Database(dbPath);
db.pragma("journal_mode = WAL");
// Drop dulu agar perubahan skema (kolom baru) selalu ikut terbuat.
// Aman: seluruh input sudah tervalidasi di atas, dan seed me-rebuild dari JSON.
db.exec("DROP TABLE IF EXISTS challenges; DROP TABLE IF EXISTS levels; DROP TABLE IF EXISTS kelas;");
db.exec(fs.readFileSync(schemaPath, "utf8"));

const insertKelas = db.prepare(`
  INSERT INTO kelas (slug, nomor, judul, badge, pulau, chip, banner_title, banner_code,
                     cta_enabled, level_aktif, is_published)
  VALUES (@slug, @nomor, @judul, @badge, @pulau, @chip, @bannerTitle, @bannerCode,
          @ctaEnabled, @levelAktif, @isPublished)
`);

const insertLevel = db.prepare(`
  INSERT INTO levels (kelas_id, nomor, title, topic, desc, skills_json, btn_text,
                      node_label, node_icon, xp_reward, visual, is_published)
  VALUES (@kelasId, @nomor, @title, @topic, @desc, @skillsJson, @btnText,
          @nodeLabel, @nodeIcon, @xpReward, @visual, @isPublished)
`);

const insertChallenge = db.prepare(`
  INSERT INTO challenges (level_id, urutan, tipe, title, brief, tujuan, materi, contoh,
                          kondisi_awal, batasan_json, kriteria, hints_json,
                          feedback_sukses, feedback_gagal, maze_json, allowed_blocks_json,
                          win_condition_json, payload_json, difficulty, is_published)
  VALUES (@levelId, @urutan, @tipe, @title, @brief, @tujuan, @materi, @contoh,
          @kondisiAwal, @batasanJson, @kriteria, @hintsJson,
          @feedbackSukses, @feedbackGagal, @mazeJson, @allowedBlocksJson,
          @winConditionJson, @payloadJson, @difficulty, @isPublished)
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
      visual: level.visual ?? null,
      isPublished: level.isPublished === false ? 0 : 1,
    }).lastInsertRowid;

    for (const challenge of level.challenges ?? []) {
      const tipe = challenge.tipe ?? "blockly";
      insertChallenge.run({
        levelId,
        urutan: challenge.urutan ?? 1,
        tipe,
        title: challenge.title,
        brief: challenge.brief,
        tujuan: challenge.tujuan ?? null,
        materi: challenge.materi ?? null,
        contoh: challenge.contoh ?? null,
        kondisiAwal: challenge.kondisiAwal ?? null,
        batasanJson: JSON.stringify(challenge.batasan ?? []),
        kriteria: challenge.kriteria ?? null,
        hintsJson: JSON.stringify(challenge.hints ?? []),
        feedbackSukses: challenge.feedbackSukses ?? null,
        feedbackGagal: challenge.feedbackGagal ?? null,
        mazeJson: challenge.maze ? JSON.stringify(challenge.maze) : null,
        allowedBlocksJson: JSON.stringify(challenge.allowedBlocks ?? []),
        winConditionJson: JSON.stringify(challenge.winCondition ?? { type: "reach_goal" }),
        payloadJson: challenge.kuis
          ? JSON.stringify(challenge.kuis)
          : challenge.initialBlocks
            ? JSON.stringify(challenge.initialBlocks)
            : null,
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
for (const parsed of parsedKelasList) {
  seedOne(parsed);
  totalKelas += 1;
}

console.log(`\nSeed selesai: ${totalKelas} kelas -> ${dbPath}`);
db.close();
