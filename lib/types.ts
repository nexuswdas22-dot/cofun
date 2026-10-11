export type LevelStatus = "done" | "active" | "locked";

export type Level = {
  id: number;
  title: string;
  topic: string;
  desc: string;
  skills: string[];
  btnText: string;
  nodeLabel: string;
  nodeIcon: string;
  xpReward: number;
  visual: string | null;
};

export type Kelas = {
  slug: string;
  nomor: number;
  badge: string;
  judul: string;
  chip: string;
  pulau: string;
  levelAktif: number;
  ctaEnabled: boolean;
  bannerTitle: string;
  bannerCode: string;
  levels: Level[];
};

export type MazeCell = "empty" | "path" | "start" | "goal" | "rock" | "key" | "door";

export type Facing = "utara" | "timur" | "selatan" | "barat";

export type MazeData = {
  size: number;
  cells: MazeCell[][];
  start: { col: number; row: number; facing: Facing };
};

export type WinCondition = {
  type: "reach_goal";
  maxSteps?: number;
  maxBlocks?: number;
};

export type ChallengeTipe = "blockly" | "kuis";

export type KuisOption = { id: string; label: string };

export type KuisPayload =
  | {
      mode: "pilihan";
      pertanyaan: string;
      opsi: KuisOption[];
      jawaban: string[];
      visual?: string;
    }
  | {
      mode: "urutan";
      pertanyaan: string;
      kartu: KuisOption[];
      urutanBenar: string[];
      visual?: string;
    };

export type Challenge = {
  id: number;
  tipe: ChallengeTipe;
  title: string;
  brief: string;
  tujuan: string;
  materi: string;
  contoh: string;
  kondisiAwal: string;
  batasan: string[];
  kriteria: string;
  hint: string;
  feedbackSukses: string;
  feedbackGagal: string;
  maze: MazeData | null;
  allowedBlocks: string[];
  winCondition: WinCondition;
  kuis: KuisPayload | null;
  // Workspace awal (JSON serialisasi Blockly) untuk soal debugging.
  initialBlocks: Record<string, unknown> | null;
  difficulty: number;
  levelId: number;
  levelNomor: number;
  levelTitle: string;
  levelTopic: string;
  xpReward: number;
  kelasSlug: string;
  kelasNomor: number;
  kelasJudul: string;
  kelasChip: string;
  totalLevels: number;
};

export const defaultKelasSlug = "kelas-4";

const STATUS_BADGE: Record<LevelStatus, { label: string; className: string }> = {
  done: { label: "Sudah Selesai", className: "bg-secondary-fixed text-on-secondary-fixed" },
  active: {
    label: "Sedang Berjalan",
    className: "bg-primary-fixed text-on-primary-fixed-variant",
  },
  locked: { label: "Siap Ditantang", className: "bg-surface-container-high text-on-surface" },
};

export const TOTAL_LEVEL_DEFAULT = 5;

export function statusOf(kelas: Kelas, levelId: number): LevelStatus {
  if (levelId < kelas.levelAktif) return "done";
  if (levelId === kelas.levelAktif) return "active";
  return "locked";
}

export function statusBadge(status: LevelStatus) {
  return STATUS_BADGE[status];
}

export function progressOf(kelas: Kelas): number {
  const total = kelas.levels.length || TOTAL_LEVEL_DEFAULT;
  return Math.round(((kelas.levelAktif - 1) / total) * 100);
}

export function statusMisiOf(kelas: Kelas): string {
  const total = kelas.levels.length || TOTAL_LEVEL_DEFAULT;
  return `Level ${kelas.levelAktif} dari ${total}`;
}

export function nodeSummaryOf(kelas: Kelas): string {
  const done = kelas.levels.filter((l) => statusOf(kelas, l.id) === "done").length;
  const active = kelas.levels.filter((l) => statusOf(kelas, l.id) === "active").length;
  const locked = kelas.levels.filter((l) => statusOf(kelas, l.id) === "locked").length;
  return `${done} Selesai • ${active} Aktif • ${locked} Siap`;
}

export function codeOf(kelas: Kelas, levelId: number): string {
  return `K${kelas.nomor}-MOD-${String(levelId).padStart(2, "0")}`;
}

export function ctaStateOf(
  kelas: Kelas,
  level: Level,
  status: LevelStatus,
): { enabled: boolean; label: string } {
  if (!kelas.ctaEnabled) return { enabled: false, label: "Arena Segera Hadir" };
  if (status === "locked") return { enabled: false, label: "Selesaikan Level Sebelumnya" };
  return { enabled: true, label: level.btnText };
}
