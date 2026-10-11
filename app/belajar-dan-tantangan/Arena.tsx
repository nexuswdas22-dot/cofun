"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { facingToRotate } from "@/lib/blockly/simulate";
import type { SimFrame } from "@/lib/blockly/simulate";
import type { BlocklyArenaHandle } from "@/components/blockly/BlocklyArena";
import type { Challenge, MazeCell } from "@/lib/types";

const BlocklyArena = dynamic(() => import("@/components/blockly/BlocklyArena"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[420px] sm:h-[460px] lg:h-[560px] rounded-xl bg-surface-container-high animate-pulse border border-outline-variant/30" />
  ),
});

type RobotState = { col: number; row: number; rotate: number };

const GRID_GAP_PX = 6;

function cellLabel(row: number, col: number): string {
  return `${row + 1},${col + 1}`;
}

function MazeCellView({
  kind,
  row,
  col,
  covered,
}: {
  kind: MazeCell;
  row: number;
  col: number;
  covered?: boolean;
}) {
  const key = `${row}-${col}`;
  if (kind === "start") {
    return (
      <div
        className="relative bg-secondary-fixed/90 rounded-lg flex items-center justify-center shadow-sm border border-secondary/30"
        key={key}
      >
        {!covered && (
          <span className="text-[9px] font-bold text-secondary absolute bottom-1 font-label-badge">
            START
          </span>
        )}
      </div>
    );
  }
  if (kind === "rock") {
    return (
      <div
        className="bg-error-container rounded-lg flex flex-col items-center justify-center text-on-error-container shadow-sm p-1 text-center border-2 border-error/40 relative overflow-hidden"
        key={key}
      >
        <span
          className="material-symbols-outlined text-[24px] text-error animate-pulse"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          landslide
        </span>
        <span className="font-label-badge text-[8px] font-bold leading-none mt-0.5 text-error">
          BATU
        </span>
      </div>
    );
  }
  if (kind === "goal") {
    return (
      <div
        className="bg-tertiary-fixed rounded-lg flex flex-col items-center justify-center text-on-tertiary-fixed shadow-[0_3px_0_0_#ffb95f] p-1 border border-tertiary/40 relative overflow-hidden"
        key={key}
      >
        <span
          className="material-symbols-outlined text-[26px] text-tertiary animate-bounce"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          star
        </span>
        <span className="font-label-badge text-[8px] font-bold text-tertiary">FINISH</span>
      </div>
    );
  }
  if (kind === "path") {
    return (
      <div
        className="bg-surface-container-lowest rounded-lg flex items-center justify-center shadow-sm"
        key={key}
      >
        <span className="w-2 h-2 rounded-full bg-outline-variant/50" />
      </div>
    );
  }
  return (
    <div
      className="bg-surface-container rounded-lg flex items-center justify-center text-[10px] font-mono text-outline-variant"
      key={key}
    >
      {cellLabel(row, col)}
    </div>
  );
}

export default function Arena({ challenge }: { challenge: Challenge }) {
  const maxSteps = challenge.winCondition.maxSteps;
  const mazeSize = challenge.maze.size;
  const cellSize = `calc((100% - ${(mazeSize - 1) * GRID_GAP_PX}px) / ${mazeSize})`;
  const cellStep = `calc((100% - ${(mazeSize - 1) * GRID_GAP_PX}px) / ${mazeSize} + ${GRID_GAP_PX}px)`;
  const initialRobot: RobotState = {
    col: challenge.maze.start.col,
    row: challenge.maze.start.row,
    rotate: facingToRotate(challenge.maze.start.facing),
  };

  const [hintDrawer, setHintDrawer] = useState(true);
  const [toast, setToast] = useState<string | null>(null);
  const [hintOpen, setHintOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [activeBlock, setActiveBlock] = useState<string | null>(null);
  const [steps, setSteps] = useState(0);
  const [status, setStatus] = useState("Siap di Titik Awal");
  const [speech, setSpeech] = useState(
    "“Ayo susun blok kodingmu! Aku siap mendeteksi rintangan batu di depan.”",
  );
  const [robot, setRobot] = useState<RobotState>(initialRobot);
  const [executing, setExecuting] = useState(false);

  const arenaRef = useRef<BlocklyArenaHandle | null>(null);
  const simulatorRef = useRef<HTMLDivElement | null>(null);
  const timers = useRef<number[]>([]);
  const toastTimer = useRef<number | null>(null);

  const clearTimers = () => {
    timers.current.forEach((id) => clearTimeout(id));
    timers.current = [];
  };

  useEffect(() => {
    // Di HP, drawer materi default tertutup supaya papan blok langsung terlihat.
    // Sinkronisasi viewport hanya bisa diketahui di client setelah hydration.
    if (window.matchMedia("(max-width: 639px)").matches) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setHintDrawer(false);
    }
    return () => {
      clearTimers();
      if (toastTimer.current) clearTimeout(toastTimer.current);
    };
  }, []);

  const spawnNotification = (message: string) => {
    setToast(message);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(null), 2400);
  };

  const resetSimulation = () => {
    clearTimers();
    setExecuting(false);
    setActiveBlock(null);
    setSteps(0);
    setStatus("Siap di Titik Awal");
    setSpeech("“Robot kembali ke titik awal. Tekan Jalankan Robot untuk mencoba!”");
    setRobot(initialRobot);
    setSuccessOpen(false);
    spawnNotification("Simulator di-reset.");
  };

  const clearBlocks = () => {
    if (executing) return;
    arenaRef.current?.clearWorkspace();
    setActiveBlock(null);
    spawnNotification("Semua blok dihapus dari papan.");
  };

  const checkLogic = () => {
    if (executing) return;
    const sim = arenaRef.current?.generateFrames(challenge.maze, challenge.winCondition);
    if (!sim) return;
    if (!sim.ok) {
      setStatus("⚠️ Belum Siap");
      setSpeech(`“${sim.error}”`);
      spawnNotification(sim.error);
      return;
    }
    setStatus("✓ Logika Diverifikasi!");
    setSpeech(
      "“Rangkaian blokmu valid dan siap dijalankan. Tekan Jalankan Robot kalau sudah siap!”",
    );
    spawnNotification("✓ Rangkaian blok koding valid & siap!");
  };

  const applyFrame = (frame: SimFrame) => {
    setActiveBlock(frame.blockId);
    setStatus(frame.status);
    if (typeof frame.step === "number") setSteps(frame.step);
    if (frame.speech) setSpeech(`“${frame.speech}”`);
    if (frame.robot) setRobot((prev) => ({ ...prev, ...frame.robot! }));
  };

  const runRobotSequence = () => {
    if (executing) return;
    clearTimers();
    setSuccessOpen(false);

    const sim = arenaRef.current?.generateFrames(challenge.maze, challenge.winCondition);
    if (!sim) return;
    if (!sim.ok) {
      setStatus("⚠️ Belum Siap");
      spawnNotification(sim.error);
      return;
    }
    if (sim.frames.length === 0) {
      spawnNotification("Susun dulu bloknya ya!");
      return;
    }

    setExecuting(true);
    setSteps(0);
    setRobot(initialRobot);
    setSpeech("“Berangkat! Ikuti aku ya...”");

    // Di layar kecil simulator ada di atas papan blok — pastikan robot terlihat.
    if (window.matchMedia("(max-width: 1023px)").matches) {
      simulatorRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    sim.frames.forEach((frame) => {
      const id = window.setTimeout(() => applyFrame(frame), frame.t);
      timers.current.push(id);
    });

    const lastFrame = sim.frames[sim.frames.length - 1];
    const endId = window.setTimeout(() => {
      setExecuting(false);
      setActiveBlock(null);
      if (sim.result === "success") {
        setSuccessOpen(true);
      } else {
        setStatus("Coba Lagi, Perbaiki Blokmu!");
      }
    }, lastFrame.t + 900);
    timers.current.push(endId);
  };

  return (
    <>
      <div className="px-margin-mobile md:px-margin pb-space-xl flex flex-col gap-space-md max-w-[1560px] mx-auto w-full">
        <section className="bg-surface-container-lowest rounded-xl shadow-md p-space-md lg:p-space-lg flex flex-col lg:flex-row lg:items-center justify-between gap-space-md mt-4">
          <div className="flex flex-col gap-space-xs">
            <div className="flex flex-wrap items-center gap-space-sm">
              <Link
                className="inline-flex items-center gap-1 px-space-md py-space-xs rounded-full bg-surface-container font-label-badge text-label-badge text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors"
                href={`/peta-petualangan/${challenge.kelasSlug}`}
              >
                <span className="material-symbols-outlined text-[16px]">
                  arrow_back
                </span>
                Peta Petualangan
              </Link>
              <span className="hidden sm:inline-flex items-center gap-1.5 px-space-md py-space-xs rounded-full bg-primary-fixed text-on-primary-fixed-variant font-label-badge text-label-badge shadow-[0_2px_0_0_#93ccff]">
                <span className="material-symbols-outlined text-[16px]">
                  school
                </span>
                {challenge.kelasJudul}
              </span>
              <span className="inline-flex items-center gap-1.5 px-space-md py-space-xs rounded-full bg-tertiary-fixed text-on-tertiary-fixed-variant font-label-badge text-label-badge shadow-[0_2px_0_0_#ffb95f]">
                <span className="material-symbols-outlined text-[16px]">
                  psychology
                </span>
                {challenge.levelTitle}
              </span>
              <span className="inline-flex items-center gap-1 px-space-sm py-space-xs rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-badge text-label-badge">
                <span className="material-symbols-outlined text-[15px]">
                  stars
                </span>
                Hadiah: +{challenge.xpReward} XP
              </span>
            </div>
            <h1 className="font-headline-md text-headline-md text-on-surface">
              {challenge.title}
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-3xl">
              {challenge.brief}
            </p>
          </div>

          <div className="flex items-center p-1 bg-surface-container-high rounded-full self-start lg:self-center shrink-0 shadow-inner">
            <button
              aria-label="Pelajari Materi"
              className={`flex items-center gap-1.5 px-2.5 sm:px-space-md py-space-xs rounded-full font-label-badge text-label-badge transition-all ${
                hintDrawer
                  ? "bg-primary text-on-primary shadow-[0_3px_0_0_#004b73]"
                  : "text-on-surface-variant hover:text-on-surface"
              }`}
              onClick={() => setHintDrawer((open) => !open)}
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">
                menu_book
              </span>
              <span className="hidden sm:inline">📖 Pelajari Materi</span>
            </button>
            <span
              className="flex items-center gap-1.5 px-2.5 sm:px-space-md py-space-xs rounded-full font-label-badge text-label-badge text-on-surface-variant"
              aria-hidden="true"
            >
              <span className="material-symbols-outlined text-[18px]">
                sports_esports
              </span>
              <span className="hidden sm:inline">🎮 Arena Tantangan</span>
            </span>
          </div>
        </section>

        {hintDrawer && (
          <div
            className="bg-surface-container-low rounded-xl p-space-md flex flex-col md:flex-row items-start md:items-center justify-between gap-space-md shadow-sm border border-outline-variant/30"
            id="concept-drawer"
          >
            <div className="flex items-center gap-space-md">
              <div className="w-11 h-11 rounded-full bg-tertiary-container text-on-tertiary-container flex items-center justify-center shrink-0 shadow-[0_3px_0_0_#653e00]">
                <span className="material-symbols-outlined text-[24px]">
                  lightbulb
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-label-badge text-label-badge text-tertiary uppercase font-bold">
                  Inti Pelajaran Hari Ini
                </span>
                <p className="font-body-sm text-body-sm text-on-surface">
                  <strong>{challenge.levelTitle}:</strong> {challenge.levelTopic}
                </p>
              </div>
            </div>
            <button
              className="text-on-surface-variant hover:text-on-surface text-body-sm font-label-badge flex items-center gap-1 self-end md:self-auto shrink-0 bg-surface-container px-3 py-1 rounded-full transition-colors"
              onClick={() => setHintDrawer(false)}
              type="button"
            >
              Tutup{" "}
              <span className="material-symbols-outlined text-[16px]">
                close
              </span>
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-md items-start">
          <div
            className="lg:col-span-4 flex flex-col gap-space-md order-1 lg:order-1 scroll-mt-24"
            ref={simulatorRef}
          >
            <div className="bg-surface-container-lowest rounded-xl shadow-md p-space-md lg:p-space-lg flex flex-col gap-space-md border border-outline-variant/30">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-space-xs border-b border-surface-container-high">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-secondary text-on-secondary flex items-center justify-center shadow-[0_2px_0_0_#002113] shrink-0">
                    <span className="material-symbols-outlined text-[20px]">
                      smart_toy
                    </span>
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-headline-sm text-headline-sm text-on-surface leading-tight">
                      Simulator Labirin
                    </h3>
                    <span className="font-label-badge text-[11px] text-on-surface-variant">
                      Peta Uji {challenge.maze.size}×{challenge.maze.size}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 bg-surface-container-high px-3 py-1 rounded-full border border-outline-variant/40">
                  <span className="material-symbols-outlined text-[16px] text-primary">
                    footprint
                  </span>
                  <span className="font-label-code text-[12px] font-bold text-on-surface">
                    Langkah: {steps} / {maxSteps ?? "∞"}
                  </span>
                </div>
              </div>

              <div className="relative bg-surface-container-high rounded-xl p-space-sm shadow-sm flex items-start gap-space-sm border border-primary/20">
                <div className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center shrink-0 shadow-[0_2px_0_0_#004b73]">
                  <span className="material-symbols-outlined text-[18px]">
                    smart_toy
                  </span>
                </div>
                <div className="flex-1">
                  <p className="font-body-sm text-[13px] text-on-surface leading-snug">
                    {speech}
                  </p>
                </div>
                <div className="absolute -bottom-2 left-6 w-3.5 h-3.5 bg-surface-container-high rotate-45 border-r border-b border-primary/20" />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-1 bg-surface-container-low px-3 py-1.5 rounded-lg border border-outline-variant/30 text-[12px]">
                <span className="font-label-badge text-on-surface-variant flex items-center gap-1 shrink-0">
                  <span className="w-2.5 h-2.5 rounded-full bg-secondary animate-pulse" />{" "}
                  Status Robot:
                </span>
                <span className="font-label-code font-bold text-primary text-right">
                  {status}
                </span>
              </div>

              <div className="relative bg-surface-container-low rounded-xl p-3 shadow-inner flex items-center justify-center overflow-hidden border border-outline-variant/30">
                <div
                  className="grid gap-1.5 w-full max-w-[340px] aspect-square relative"
                  style={{
                    gridTemplateColumns: `repeat(${challenge.maze.size}, minmax(0, 1fr))`,
                    gridTemplateRows: `repeat(${challenge.maze.size}, minmax(0, 1fr))`,
                  }}
                >
                  {challenge.maze.cells.flatMap((row, rowIndex) =>
                    row.map((kind, cellIndex) => (
                      <MazeCellView
                        col={cellIndex}
                        covered={
                          kind === "start" &&
                          robot.col === cellIndex &&
                          robot.row === rowIndex
                        }
                        key={`${rowIndex}-${cellIndex}`}
                        kind={kind}
                        row={rowIndex}
                      />
                    )),
                  )}

                  <div
                    className="absolute z-30 transition-all duration-500 ease-out flex items-center justify-center pointer-events-none"
                    style={{
                      width: cellSize,
                      height: cellSize,
                      left: `calc(${robot.col} * ${cellStep})`,
                      top: `calc(${robot.row} * ${cellStep})`,
                      transform: `rotate(${robot.rotate}deg)`,
                    }}
                  >
                    <div className="w-9 h-9 sm:w-10 sm:h-10 bg-primary text-on-primary rounded-xl flex flex-col items-center justify-center shadow-[0_3px_0_0_#004b73] border border-white/40">
                      <div className="flex gap-1 mb-0.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-secondary-container animate-pulse" />
                        <span className="w-1.5 h-1.5 rounded-full bg-secondary-container animate-pulse" />
                      </div>
                      <span className="material-symbols-outlined text-[16px] leading-none">
                        smart_toy
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 text-on-surface-variant font-body-sm text-[12px] px-1 pt-1">
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-sm bg-secondary-fixed" />{" "}
                    Mulai
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-sm bg-error-container" />{" "}
                    Rintangan
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-sm bg-tertiary-fixed" />{" "}
                    Bintang
                  </span>
                </div>
                <div className="flex items-center gap-1 font-label-badge text-[11px] text-primary bg-primary-fixed px-2 py-0.5 rounded-full">
                  <span className="material-symbols-outlined text-[13px]">
                    explore
                  </span>
                  Arah Hadap: {challenge.maze.start.facing}
                </div>
              </div>

              <div
                className={`items-center gap-2 bg-primary text-white text-xs px-3 py-2 rounded-lg shadow-md transition-all ${
                  toast ? "flex" : "hidden"
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">
                  info
                </span>
                <span>{toast}</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8 flex flex-col gap-space-md order-2 lg:order-2">
            <div className="bg-surface-container-lowest rounded-xl shadow-md p-space-md lg:p-space-lg flex flex-col gap-space-md border border-outline-variant/30">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-space-xs border-b border-surface-container-high">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-primary-container text-on-primary flex items-center justify-center shadow-[0_2px_0_0_#004b73] shrink-0">
                    <span className="material-symbols-outlined text-[20px]">
                      extension
                    </span>
                  </div>
                  <div className="min-w-0">
                    <h2 className="font-headline-sm text-headline-sm text-on-surface leading-tight">
                      Papan Blockly
                    </h2>
                    <span className="hidden sm:inline font-label-badge text-[11px] text-on-surface-variant">
                      Ambil blok dari kotak kategori, lalu susun programmu
                    </span>
                  </div>
                </div>
                <button
                  className="flex items-center gap-1 min-h-11 px-3 py-1.5 rounded-full bg-surface-container-high text-on-surface-variant hover:bg-error-container hover:text-error font-label-badge text-label-badge transition-colors"
                  onClick={clearBlocks}
                  title="Bersihkan semua blok"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[16px]">
                    delete_sweep
                  </span>
                  <span className="hidden sm:inline">Bersihkan</span>
                </button>
              </div>

              <BlocklyArena
                activeBlockId={activeBlock}
                allowedBlocks={challenge.allowedBlocks}
                key={challenge.id}
                ref={arenaRef}
              />

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-space-sm pt-space-xs border-t border-surface-container-high">
                <div className="grid grid-cols-3 gap-2 w-full sm:flex sm:w-auto">
                  <button
                    className="flex flex-col sm:flex-row items-center justify-center gap-0.5 sm:gap-1.5 min-h-11 px-1 sm:px-space-md py-1.5 sm:py-2 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-badge text-[11px] sm:text-label-badge shadow-[0_3px_0_0_#ffb95f] hover:translate-y-[-1px] active:translate-y-[2px] transition-all"
                    onClick={() => setHintOpen(true)}
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[17px]">
                      lightbulb
                    </span>
                    Bantuan
                  </button>
                  <button
                    className="flex flex-col sm:flex-row items-center justify-center gap-0.5 sm:gap-1.5 min-h-11 px-1 sm:px-space-md py-1.5 sm:py-2 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-badge text-[11px] sm:text-label-badge shadow-[0_3px_0_0_#4edea3] hover:translate-y-[-1px] active:translate-y-[2px] transition-all"
                    onClick={checkLogic}
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[17px]">
                      check_box
                    </span>
                    Cek Logika
                  </button>
                  <button
                    className="flex flex-col sm:flex-row items-center justify-center gap-0.5 sm:gap-1.5 min-h-11 px-1 sm:px-space-md py-1.5 sm:py-2 rounded-full bg-surface-container-high text-on-surface-variant font-label-badge text-[11px] sm:text-label-badge hover:bg-surface-container-highest transition-all"
                    onClick={resetSimulation}
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[17px]">
                      restart_alt
                    </span>
                    Reset
                  </button>
                </div>
                <button
                  className="flex items-center justify-center gap-2 min-h-11 px-space-lg py-2.5 rounded-full bg-primary text-on-primary font-headline-sm text-[16px] font-bold shadow-[0_4px_0_0_#004b73] hover:translate-y-[-1px] active:translate-y-[3px] active:shadow-[0_1px_0_0_#004b73] transition-all w-full sm:w-auto disabled:opacity-70"
                  disabled={executing}
                  onClick={runRobotSequence}
                  type="button"
                >
                  <span
                    className="material-symbols-outlined text-[22px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    play_arrow
                  </span>
                  {executing ? "Robot Berjalan..." : "Jalankan Robot!"}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-surface-container-lowest rounded-xl p-space-md lg:p-space-lg shadow-sm flex flex-col md:flex-row items-center justify-between gap-space-md border border-outline-variant/30 mt-2">
          <div className="flex items-center gap-space-md">
            <div className="w-12 h-12 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0 shadow-[0_3px_0_0_#00714d]">
              <span className="material-symbols-outlined text-[28px]">
                trophy
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-headline-sm text-[18px] text-on-surface font-bold">
                Kemajuan Belajar: Level {challenge.levelNomor} dari{" "}
                {challenge.totalLevels}
              </span>
              <span className="font-body-sm text-body-sm text-on-surface-variant">
                Selesaikan level ini untuk membuka lencana penjelajah berikutnya!
              </span>
            </div>
          </div>
          <div className="flex items-center gap-space-md w-full md:w-80">
            <div className="w-full bg-surface-container-high h-3 rounded-full overflow-hidden shadow-inner">
              <div
                className="bg-primary h-full rounded-full transition-all duration-700"
                style={{
                  width: `${Math.round(((challenge.levelNomor - 1) / challenge.totalLevels) * 100)}%`,
                }}
              />
            </div>
            <span className="font-label-code text-label-code text-primary font-bold shrink-0">
              {Math.round(((challenge.levelNomor - 1) / challenge.totalLevels) * 100)}%
            </span>
          </div>
        </div>
      </div>

      <div
        className={`fixed inset-0 z-50 bg-black/40 backdrop-blur-sm p-0 sm:p-4 transition-all ${
          hintOpen ? "flex" : "hidden"
        } items-end sm:items-center justify-center`}
      >
        <div className="bg-surface-container-lowest rounded-t-2xl sm:rounded-2xl max-w-md w-full max-h-[85dvh] overflow-y-auto p-space-md sm:p-space-lg shadow-2xl border border-outline-variant/30 flex flex-col gap-space-md animate-scale-up">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-tertiary-fixed text-tertiary flex items-center justify-center font-bold">
                <span className="material-symbols-outlined text-[24px]">
                  lightbulb
                </span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface">
                Petunjuk Guru CoFun
              </h3>
            </div>
            <button
              aria-label="Tutup petunjuk"
              className="w-9 h-9 sm:w-8 sm:h-8 rounded-full hover:bg-surface-container text-on-surface-variant flex items-center justify-center"
              onClick={() => setHintOpen(false)}
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">
                close
              </span>
            </button>
          </div>
          <div className="bg-tertiary-fixed/30 rounded-xl p-space-md border border-tertiary-fixed flex flex-col gap-space-sm">
            {challenge.hints.length === 0 ? (
              <p className="font-body-md text-on-surface leading-relaxed">
                “Coba jalankan dulu programmu dan perhatikan ke mana robot
                berhenti. Dari situ biasanya kelihatan blok mana yang perlu
                ditambah atau diganti.”
              </p>
            ) : (
              challenge.hints.map((hint) => (
                <p className="font-body-md text-on-surface leading-relaxed" key={hint}>
                  “{hint}”
                </p>
              ))
            )}
          </div>
          <div className="flex justify-end">
            <button
              className="px-space-lg py-2 rounded-full bg-primary text-on-primary font-label-badge text-label-badge font-bold shadow-[0_3px_0_0_#004b73]"
              onClick={() => setHintOpen(false)}
              type="button"
            >
              Saya Paham! 👍
            </button>
          </div>
        </div>
      </div>

      <div
        className={`fixed inset-0 z-50 bg-black/50 backdrop-blur-sm p-0 sm:p-4 transition-all ${
          successOpen ? "flex" : "hidden"
        } items-end sm:items-center justify-center`}
      >
        <div className="bg-surface-container-lowest rounded-t-2xl sm:rounded-2xl max-w-md w-full max-h-[85dvh] overflow-y-auto p-space-md sm:p-space-lg shadow-2xl border border-secondary-fixed flex flex-col items-center text-center gap-space-md animate-bounce-short">
          <div className="w-20 h-20 rounded-full bg-secondary-fixed flex items-center justify-center text-secondary shadow-[0_4px_0_0_#006c49]">
            <span
              className="material-symbols-outlined text-[44px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              stars
            </span>
          </div>
          <div>
            <span className="text-xs uppercase font-label-badge text-secondary font-bold tracking-widest">
              Level Selesai!
            </span>
            <h3 className="font-headline-lg text-[26px] text-on-surface font-extrabold mt-1">
              🎉 Mantap! Robot Sampai Tujuan!
            </h3>
            <p className="font-body-md text-on-surface-variant mt-2">
              {challenge.brief}
            </p>
          </div>
          <div className="flex items-center justify-center gap-3 w-full bg-secondary-container/40 p-3 rounded-xl border border-secondary-fixed">
            <span className="font-label-badge text-secondary font-bold text-sm">
              Hadiah Didapat:
            </span>
            <span className="px-3 py-1 bg-secondary text-white rounded-full font-label-code text-sm font-bold shadow-sm">
              +{challenge.xpReward} XP 🌟
            </span>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-2 w-full pt-2">
            <button
              className="flex-1 py-2.5 rounded-full bg-surface-container-high text-on-surface-variant font-label-badge text-label-badge font-bold hover:bg-surface-container-highest"
              onClick={resetSimulation}
              type="button"
            >
              Ulangi Level
            </button>
            <Link
              className="flex-1 py-2.5 rounded-full bg-primary text-on-primary font-label-badge text-label-badge font-bold shadow-[0_3px_0_0_#004b73] hover:brightness-110 text-center"
              href={`/peta-petualangan/${challenge.kelasSlug}`}
              onClick={() => setSuccessOpen(false)}
            >
              Kembali ke Peta ➔
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
