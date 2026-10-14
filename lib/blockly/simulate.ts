// Simulator eksekusi blok CoFun.
// Membaca struktur workspace Blockly (bukan mengeksekusi kode) lalu
// menghasilkan rangkaian Frame untuk animasi robot. Tanpa eval.

import type { Block, Workspace } from "blockly/core";
import type { Facing, MazeCell, MazeData, WinCondition } from "../types";

export type SimFrame = {
  t: number;
  blockId: string | null;
  status: string;
  step?: number;
  robot?: { col: number; row: number; rotate: number };
  speech?: string;
  finish?: boolean;
  keyTaken?: boolean;
};

export type SimResult =
  | { ok: true; frames: SimFrame[]; steps: number; result: "success" | "fail" }
  | { ok: false; error: string };

const FACING_ORDER: Facing[] = ["utara", "timur", "selatan", "barat"];
const ROTATE: Record<Facing, number> = { utara: -90, timur: 0, selatan: 90, barat: 180 };
const DELTA: Record<Facing, { dc: number; dr: number }> = {
  utara: { dc: 0, dr: -1 },
  timur: { dc: 1, dr: 0 },
  selatan: { dc: 0, dr: 1 },
  barat: { dc: -1, dr: 0 },
};

const MAX_ACTIONS = 100;
const FRAME_MS = 700;
const SENSOR_MS = 450;
const START_MS = 500;

export function facingToRotate(facing: Facing): number {
  return ROTATE[facing];
}

type SimState = {
  maze: MazeData;
  win: WinCondition;
  col: number;
  row: number;
  facing: Facing;
  steps: number;
  actions: number;
  hasKey: boolean;
  t: number;
  stopped: boolean;
  result: "running" | "success" | "fail";
  frames: SimFrame[];
};

function pushFrame(state: SimState, frame: Omit<SimFrame, "t">): void {
  state.frames.push({ t: state.t, ...frame });
}

function cellAt(maze: MazeData, col: number, row: number): MazeCell | null {
  if (row < 0 || col < 0 || row >= maze.cells.length) return null;
  const cells = maze.cells[row];
  if (col >= cells.length) return null;
  return cells[col];
}

// Gerakan (MAKA robot tidak bisa lewat): area kosong (void di luar jalur),
// batu, tepi peta, dan pintu yang belum dibuka (belum punya kunci).
function isBlocked(state: SimState, cell: MazeCell | null): boolean {
  if (cell === null || cell === "rock" || cell === "empty") return true;
  return cell === "door" && !state.hasKey;
}

// Sensor blok JIKA: hanya "penghalang nyata" — batu, tepi peta, dan pintu
// terkunci. VOID (area kosong di luar jalur) TIDAK dihitung rintangan supaya
// sensor sesuai materi level ("cek ada batu") dan program dengan rak
// SELAIN ITU tetap terbaca saat robot menghadap ruang kosong di sisi koridor.
function isSensorObstacle(state: SimState, cell: MazeCell | null): boolean {
  if (cell === null || cell === "rock") return true;
  return cell === "door" && !state.hasKey;
}

function isObstacleAhead(state: SimState): boolean {
  const { dc, dr } = DELTA[state.facing];
  return isSensorObstacle(state, cellAt(state.maze, state.col + dc, state.row + dr));
}

function stopWith(state: SimState, message: string): void {
  state.stopped = true;
  state.result = "fail";
  pushFrame(state, {
    blockId: null,
    status: "Misi Gagal",
    speech: message,
  });
  state.t += SENSOR_MS;
}

function doMaju(block: Block, state: SimState): void {
  if (state.stopped) return;
  if (state.actions >= MAX_ACTIONS) {
    stopWith(state, "Programnya kepanjangan. Coba buat lebih singkat, ya!");
    return;
  }
  state.actions += 1;
  const { dc, dr } = DELTA[state.facing];
  const nextCol = state.col + dc;
  const nextRow = state.row + dr;
  const cell = cellAt(state.maze, nextCol, nextRow);
  if (isBlocked(state, cell)) {
    const locked = cell === "door";
    pushFrame(state, {
      blockId: block.id,
      status: locked ? "Pintu Terkunci!" : "Menabrak Rintangan!",
      step: state.steps,
      speech: locked
        ? "Pintunya terkunci. Aku butuh kunci dulu!"
        : "Aduh! Di depan ada rintangan, aku berhenti di sini.",
    });
    state.t += FRAME_MS;
    stopWith(
      state,
      locked
        ? "Robot belum punya kunci untuk membuka pintu. Ambil kuncinya dulu!"
        : "Robot menabrak rintangan. Lihat jalannya, lalu perbaiki blokmu!",
    );
    return;
  }
  state.col = nextCol;
  state.row = nextRow;
  state.steps += 1;
  const pickedKey = cell === "key";
  if (pickedKey) state.hasKey = true;
  pushFrame(state, {
    blockId: block.id,
    status: pickedKey ? "Mengambil Kunci!" : `Langkah ${state.steps}: Maju`,
    step: state.steps,
    robot: { col: state.col, row: state.row, rotate: ROTATE[state.facing] },
    keyTaken: state.hasKey,
    speech: pickedKey ? "Dapat kunci! Sekarang pintu bisa dibuka." : undefined,
  });
  state.t += FRAME_MS;
  if (cell === "goal") {
    state.stopped = true;
    state.result = "success";
    pushFrame(state, {
      blockId: null,
      status: "Tantangan Selesai!",
      step: state.steps,
      speech: "Mantap! Aku berhasil mencapai Bintang Emas!",
      finish: true,
    });
    state.t += SENSOR_MS;
    return;
  }
  if (state.win.maxSteps && state.steps > state.win.maxSteps) {
    stopWith(
      state,
      `Wah, langkahnya sudah lebih dari ${state.win.maxSteps}. Coba buat program yang lebih singkat, ya!`,
    );
  }
}

function doTurn(block: Block, state: SimState, direction: 1 | -1, label: string): void {
  if (state.stopped) return;
  state.actions += 1;
  const index = FACING_ORDER.indexOf(state.facing);
  state.facing = FACING_ORDER[(index + direction + FACING_ORDER.length) % FACING_ORDER.length];
  pushFrame(state, {
    blockId: block.id,
    status: label,
    robot: { col: state.col, row: state.row, rotate: ROTATE[state.facing] },
  });
  state.t += FRAME_MS;
}

function getInputBlock(block: Block, name: string): Block | null {
  return block.getInput(name)?.connection?.targetBlock() ?? null;
}

function runStatements(first: Block | null, state: SimState): void {
  let block: Block | null = first;
  while (block && !state.stopped) {
    switch (block.type) {
      case "cf_maju":
        doMaju(block, state);
        break;
      case "cf_belok_kanan":
        doTurn(block, state, 1, "Belok Kanan");
        break;
      case "cf_belok_kiri":
        doTurn(block, state, -1, "Belok Kiri");
        break;
      case "cf_ulangi": {
        const raw = Number(block.getFieldValue("COUNT"));
        const count = Math.max(0, Math.min(raw || 0, MAX_ACTIONS));
        const inner = getInputBlock(block, "DO");
        for (let i = 0; i < count && !state.stopped; i += 1) {
          runStatements(inner, state);
        }
        break;
      }
      // Dua blok kondisi terpisah (bukan if/else gabungan):
      // cf_jika_rintangan → jalankan rak kalau ada rintangan di depan.
      // cf_jika_aman → jalankan rak kalau jalur aman di depan.
      // Ini lebih ramah buat siswa: dua kondisi berdiri sendiri, tanpa rak
      // SELAIN ITU yang gampang salah tempel.
      case "cf_jika_rintangan": {
        const obstacle = isObstacleAhead(state);
        pushFrame(state, {
          blockId: block.id,
          status: obstacle ? "Sensor: Rintangan! Jalankan raknya" : "Sensor: Aman, rak dilewati",
          speech: obstacle
            ? "SENSOR: Ada rintangan di depan! Menjalankan rak di bawahnya..."
            : "SENSOR: jalur aman, rak ini tidak dijalankan.",
        });
        state.t += SENSOR_MS;
        if (obstacle) {
          runStatements(getInputBlock(block, "DO"), state);
        }
        break;
      }
      case "cf_jika_aman": {
        const safe = !isObstacleAhead(state);
        pushFrame(state, {
          blockId: block.id,
          status: safe ? "Sensor: Aman! Jalankan raknya" : "Sensor: Rintangan, rak dilewati",
          speech: safe
            ? "SENSOR: Jalur aman di depan! Menjalankan rak di bawahnya..."
            : "SENSOR: Ada rintangan di depan, rak ini tidak dijalankan.",
        });
        state.t += SENSOR_MS;
        if (safe) {
          runStatements(getInputBlock(block, "DO"), state);
        }
        break;
      }
      default:
        break;
    }
    if (state.stopped) break;
    block = block.getNextBlock();
  }
}

// Menghitung semua blok CoFun (termasuk yang di dalam ULANGI / JIKA).
function countCofunBlocks(workspace: Workspace): number {
  return workspace.getAllBlocks(false).filter((b) => b.type.startsWith("cf_")).length;
}

export function simulateWorkspace(
  workspace: Workspace,
  maze: MazeData,
  win: WinCondition,
): SimResult {
  const topBlocks = workspace.getTopBlocks(true);
  if (topBlocks.length === 0) {
    return { ok: false, error: "Belum ada blok. Susun dulu rangkaian programmu!" };
  }

  // Aturan misi: batas jumlah blok diperiksa sebelum robot berjalan.
  if (win.maxBlocks) {
    const used = countCofunBlocks(workspace);
    if (used > win.maxBlocks) {
      return {
        ok: false,
        error: `Programnya pakai ${used} blok. Yuk, hemat blok dengan memakai ULANGI supaya muat dalam ${win.maxBlocks} blok!`,
      };
    }
  }

  // Aturan misi: beberapa level mewajibkan blok tertentu (mis. JIKA) dipakai,
  // supaya siswa tidak menembus misi dengan belok langsung tanpa kondisi.
  if (win.requireAnyBlock?.length) {
    const types = new Set(workspace.getAllBlocks(false).map((b) => b.type));
    const used = win.requireAnyBlock.some((t) => types.has(t));
    if (!used) {
      return {
        ok: false,
        error:
          "Misi ini mensyaratkan blok JIKA, ya! Pakai blok JIKA untuk memeriksa rintangan sebelum robot melangkah.",
      };
    }
  }

  const state: SimState = {
    maze,
    win,
    col: maze.start.col,
    row: maze.start.row,
    facing: maze.start.facing,
    steps: 0,
    actions: 0,
    hasKey: false,
    t: 0,
    stopped: false,
    result: "running",
    frames: [],
  };

  pushFrame(state, {
    blockId: null,
    status: "Menyalakan Robot",
    speech: "Robot menyala! Aku membaca rangkaian puzzlemu, ya...",
  });
  state.t += START_MS;

  for (const top of topBlocks) {
    if (state.stopped) break;
    runStatements(top, state);
  }

  if (!state.stopped) {
    pushFrame(state, {
      blockId: null,
      status: "Program Selesai",
      speech:
        "Programnya selesai dijalankan, tapi aku belum sampai Bintang Emas. Coba perbaiki langkahmu!",
    });
    state.t += SENSOR_MS;
    state.result = "fail";
  }

  return {
    ok: true,
    frames: state.frames,
    steps: state.steps,
    result: state.result === "success" ? "success" : "fail",
  };
}
