"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type Cell =
  | { kind: "coord"; label: string }
  | { kind: "start" }
  | { kind: "goal" }
  | { kind: "rock" }
  | { kind: "path"; icon: string };

const coord = (label: string): Cell => ({ kind: "coord", label });

const maze: Cell[][] = [
  [coord("1,1"), coord("1,2"), coord("1,3"), coord("1,4"), coord("1,5")],
  [
    { kind: "start" },
    { kind: "path", icon: "arrow_forward" },
    { kind: "rock" },
    coord("2,4"),
    coord("2,5"),
  ],
  [
    coord("3,1"),
    { kind: "path", icon: "subdirectory_arrow_right" },
    { kind: "path", icon: "arrow_forward" },
    { kind: "path", icon: "arrow_downward" },
    coord("3,5"),
  ],
  [coord("4,1"), coord("4,2"), coord("4,3"), { kind: "goal" }, coord("4,5")],
  [coord("5,1"), coord("5,2"), coord("5,3"), coord("5,4"), coord("5,5")],
];

type LibraryPiece = {
  id: string;
  label: string;
  icon: string;
  bg: string;
  tab: string;
  hint: string;
  badge?: string;
  compact?: boolean;
};

type LibraryCategory = {
  title: string;
  icon: string;
  count: string;
  headerClass: string;
  badgeClass: string;
  divider: boolean;
  pieces: LibraryPiece[];
};

const movementBg =
  "bg-[#0284c7] hover:bg-[#0369a1] shadow-[0_4px_0_0_#075985] border-t border-l border-white/30";
const movementTab = "bg-[#0284c7] shadow-[0_2px_0_0_#075985]";

const library: LibraryCategory[] = [
  {
    title: "Gerakan",
    icon: "directions_run",
    count: "3 Balok",
    headerClass: "text-sky-700",
    badgeClass: "text-sky-600 bg-sky-100",
    divider: false,
    pieces: [
      {
        id: "maju",
        label: "Maju 1 Langkah",
        icon: "arrow_upward",
        bg: movementBg,
        tab: movementTab,
        hint: "Kepingan Maju siap digunakan!",
      },
      {
        id: "kanan",
        label: "Belok Kanan ↷",
        icon: "turn_right",
        bg: movementBg,
        tab: movementTab,
        hint: "Kepingan Belok Kanan siap!",
      },
      {
        id: "kiri",
        label: "Belok Kiri ↶",
        icon: "turn_left",
        bg: movementBg,
        tab: movementTab,
        hint: "Kepingan Belok Kiri siap!",
      },
    ],
  },
  {
    title: "Kondisi (IF / ELSE)",
    icon: "alt_route",
    count: "2 Balok",
    headerClass: "text-amber-800",
    badgeClass: "text-amber-700 bg-amber-100",
    divider: true,
    pieces: [
      {
        id: "jika",
        label: "JIKA <rintangan>",
        icon: "help",
        bg: "bg-[#d97706] hover:bg-[#b45309] shadow-[0_4px_0_0_#78350f] border-t border-l border-white/30",
        tab: "bg-[#d97706] shadow-[0_2px_0_0_#78350f]",
        hint: "Kepingan JIKA siap!",
        badge: "C-Block",
      },
      {
        id: "selain",
        label: "SELAIN ITU",
        icon: "call_split",
        bg: "bg-[#b45309] hover:bg-[#92400e] shadow-[0_3px_0_0_#78350f] border-t border-l border-white/30",
        tab: "bg-[#b45309] shadow-[0_2px_0_0_#78350f]",
        hint: "Kepingan SELAIN ITU siap!",
        compact: true,
      },
    ],
  },
  {
    title: "Perulangan",
    icon: "repeat",
    count: "1 Balok",
    headerClass: "text-emerald-800",
    badgeClass: "text-emerald-700 bg-emerald-100",
    divider: true,
    pieces: [
      {
        id: "ulangi",
        label: "ULANGI [2x]",
        icon: "sync",
        bg: "bg-[#059669] hover:bg-[#047857] shadow-[0_4px_0_0_#064e3b] border-t border-l border-white/30",
        tab: "bg-[#059669] shadow-[0_2px_0_0_#064e3b]",
        hint: "Kepingan Loop ULANGI!",
      },
    ],
  },
];

type Frame = {
  t: number;
  block: string | null;
  status: string;
  step?: number;
  robot?: { col?: number; row?: number; rotate?: number };
  speech?: string;
  finish?: boolean;
};

const timeline: Frame[] = [
  {
    t: 0,
    block: "block-hat",
    status: "Menyalakan Robot",
    speech: "Robot menyala! Aku membaca rangkaian puzzlemu, ya...",
  },
  {
    t: 800,
    block: "block-step-1",
    status: "Langkah 1: Maju",
    step: 1,
    robot: { col: 1, row: 1 },
  },
  {
    t: 1700,
    block: "block-if-c",
    status: "Memeriksa Rintangan",
    speech: "SENSOR: Ada batu karang di depan! Menjalankan instruksi MAKA...",
  },
  {
    t: 2600,
    block: "block-inside-turn",
    status: "Langkah 2: Belok Kanan",
    step: 2,
    robot: { rotate: 90 },
  },
  {
    t: 3500,
    block: "block-inside-step",
    status: "Langkah 3: Menghindar",
    step: 3,
    robot: { col: 1, row: 2 },
  },
  {
    t: 4400,
    block: "block-inside-else",
    status: "Langkah 4: Capai Bintang",
    step: 4,
    robot: { col: 3, row: 3 },
  },
  {
    t: 5300,
    block: null,
    status: "Tantangan Selesai!",
    speech: "Mantap! Aku berhasil mencapai Bintang Emas!",
    finish: true,
  },
];

const defaultRobot = { col: 0, row: 1, rotate: 0 };

const CELL = "calc((100% - 24px) / 5)";
const CELL_STEP = "calc((100% - 24px) / 5 + 6px)";

export default function Arena() {
  const [hintDrawer, setHintDrawer] = useState(true);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [hintOpen, setHintOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [activeBlock, setActiveBlock] = useState<string | null>(null);
  const [steps, setSteps] = useState(0);
  const [status, setStatus] = useState("Siap di Titik Awal");
  const [speech, setSpeech] = useState(
    "“Ayo susun puzzle kodingmu! Aku siap mendeteksi rintangan batu di depan.”",
  );
  const [robot, setRobot] = useState(defaultRobot);
  const [executing, setExecuting] = useState(false);

  const timers = useRef<number[]>([]);
  const toastTimer = useRef<number | null>(null);

  const clearTimers = () => {
    timers.current.forEach((id) => clearTimeout(id));
    timers.current = [];
  };

  useEffect(() => {
    return () => {
      clearTimers();
      if (toastTimer.current) clearTimeout(toastTimer.current);
    };
  }, []);

  const spawnNotification = (message: string) => {
    setToast(message);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(null), 2200);
  };

  const resetSimulation = () => {
    clearTimers();
    setExecuting(false);
    setActiveBlock(null);
    setSteps(0);
    setStatus("Siap di Titik Awal");
    setSpeech(
      "“Robot kembali ke titik awal. Tekan Jalankan Robot untuk mencoba!”",
    );
    setRobot(defaultRobot);
    setSuccessOpen(false);
    spawnNotification("Simulator di-reset.");
  };

  const clearBlocks = () => {
    setActiveBlock(null);
    spawnNotification("Susunan balok dibersihkan dari sorotan.");
  };

  const checkLogic = () => {
    if (executing) return;
    setStatus("✓ Logika Diverifikasi!");
    setSpeech(
      "Logika valid! Blok IF siap memeriksa batu karang dan berbelok menghindari tabrakan.",
    );
    spawnNotification("✓ Rangkaian puzzle koding valid & siap!");
  };

  const runRobotSequence = () => {
    if (executing) return;
    clearTimers();
    setSuccessOpen(false);
    setExecuting(true);
    setSteps(0);
    setRobot(defaultRobot);
    setSpeech("“Berangkat! Ikuti aku ya...”");

    timeline.forEach((frame) => {
      const id = window.setTimeout(() => {
        setActiveBlock(frame.block);
        setStatus(frame.status);
        if (typeof frame.step === "number") setSteps(frame.step);
        if (frame.speech) setSpeech(`“${frame.speech}”`);
        if (frame.robot) setRobot((prev) => ({ ...prev, ...frame.robot }));
        if (frame.finish) {
          setSteps(4);
          setExecuting(false);
          setSuccessOpen(true);
        }
      }, frame.t);
      timers.current.push(id);
    });
  };

  const active = (id: string) =>
    activeBlock === id ? "puzzle-exec-active" : "";

  return (
    <>
      <div className="px-margin-mobile md:px-margin pb-space-xl flex flex-col gap-space-md max-w-[1560px] mx-auto w-full">
        <section className="bg-surface-container-lowest rounded-xl shadow-md p-space-md lg:p-space-lg flex flex-col lg:flex-row lg:items-center justify-between gap-space-md mt-4">
          <div className="flex flex-col gap-space-xs">
            <div className="flex flex-wrap items-center gap-space-sm">
              <Link
                className="inline-flex items-center gap-1 px-space-md py-space-xs rounded-full bg-surface-container font-label-badge text-label-badge text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors"
                href="/peta-petualangan/kelas-4"
              >
                <span className="material-symbols-outlined text-[16px]">
                  arrow_back
                </span>
                Peta Petualangan
              </Link>
              <span className="inline-flex items-center gap-1.5 px-space-md py-space-xs rounded-full bg-primary-fixed text-on-primary-fixed-variant font-label-badge text-label-badge shadow-[0_2px_0_0_#93ccff]">
                <span className="material-symbols-outlined text-[16px]">
                  school
                </span>
                Kelas 4
              </span>
              <span className="inline-flex items-center gap-1.5 px-space-md py-space-xs rounded-full bg-tertiary-fixed text-on-tertiary-fixed-variant font-label-badge text-label-badge shadow-[0_2px_0_0_#ffb95f]">
                <span className="material-symbols-outlined text-[16px]">
                  psychology
                </span>
                Level 4: Kondisi (IF / ELSE)
              </span>
              <span className="inline-flex items-center gap-1 px-space-sm py-space-xs rounded-full bg-secondary-fixed text-on-secondary-fixed-variant font-label-badge text-label-badge">
                <span className="material-symbols-outlined text-[15px]">
                  stars
                </span>
                Hadiah: +80 XP
              </span>
            </div>
            <h1 className="font-headline-md text-headline-md text-on-surface">
              Misi: Pandu CoFun Melewati Batu Karang!
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-3xl">
              Gunakan blok keputusan{" "}
              <span className="font-bold text-tertiary">JIKA (IF)</span> untuk
              memeriksa apakah ada rintangan di depan robot, dan pilih jalur
              aman ke Bintang Emas.
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
            <button
              aria-label="Arena Tantangan"
              className={`flex items-center gap-1.5 px-2.5 sm:px-space-md py-space-xs rounded-full font-label-badge text-label-badge transition-all ${
                hintDrawer
                  ? "text-on-surface-variant hover:text-on-surface"
                  : "bg-primary text-on-primary shadow-[0_3px_0_0_#004b73]"
              }`}
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">
                sports_esports
              </span>
              <span className="hidden sm:inline">🎮 Arena Tantangan</span>
            </button>
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
                  <strong>Kondisi (IF/ELSE):</strong> Komputer berpikir seperti
                  kamu!{" "}
                  <span className="text-tertiary font-bold">
                    JIKA lapar → makan
                  </span>
                  ,{" "}
                  <span className="text-primary font-bold">
                    SELAIN ITU → main
                  </span>
                  . Di maze ini, robot memeriksa batu sebelum melangkah!
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

        <div className="lg:hidden flex items-center justify-between bg-surface-container-lowest p-space-sm rounded-xl shadow-sm border border-outline-variant/40">
          <button
            className="flex items-center gap-2 min-h-11 px-space-md py-3 bg-primary-fixed text-on-primary-fixed-variant rounded-lg font-label-badge text-label-badge font-bold w-full justify-center"
            onClick={() => setPaletteOpen((open) => !open)}
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">
              extension
            </span>
            {paletteOpen ? "Tutup" : "Buka"} Kotak Perintah Puzzle
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-md items-start">
          <div className="lg:col-span-4 flex flex-col gap-space-md order-1 lg:order-1">
            <div className="bg-surface-container-lowest rounded-xl shadow-md p-space-md lg:p-space-lg flex flex-col gap-space-md border border-outline-variant/30">
              <div className="flex items-center justify-between pb-space-xs border-b border-surface-container-high">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-secondary text-on-secondary flex items-center justify-center shadow-[0_2px_0_0_#002113]">
                    <span className="material-symbols-outlined text-[20px]">
                      smart_toy
                    </span>
                  </div>
                  <div>
                    <h3 className="font-headline-sm text-headline-sm text-on-surface leading-tight">
                      Simulator Labirin
                    </h3>
                    <span className="font-label-badge text-[11px] text-on-surface-variant">
                      Peta Uji 5×5
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 bg-surface-container-high px-3 py-1 rounded-full border border-outline-variant/40">
                  <span className="material-symbols-outlined text-[16px] text-primary">
                    footprint
                  </span>
                  <span className="font-label-code text-[12px] font-bold text-on-surface">
                    Langkah: {steps} / 4
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

              <div className="flex items-center justify-between bg-surface-container-low px-3 py-1.5 rounded-lg border border-outline-variant/30 text-[12px]">
                <span className="font-label-badge text-on-surface-variant flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-secondary animate-pulse" />{" "}
                  Status Robot:
                </span>
                <span className="font-label-code font-bold text-primary">
                  {status}
                </span>
              </div>

              <div className="relative bg-surface-container-low rounded-xl p-3 shadow-inner flex items-center justify-center overflow-hidden border border-outline-variant/30">
                <div className="grid grid-cols-5 grid-rows-5 gap-1.5 w-full max-w-[340px] aspect-square relative">
                  {maze.flatMap((row, rowIndex) =>
                    row.map((cell, cellIndex) => {
                      const key = `${rowIndex}-${cellIndex}`;
                      if (cell.kind === "coord") {
                        return (
                          <div
                            className="bg-surface-container rounded-lg flex items-center justify-center text-[10px] font-mono text-outline-variant"
                            key={key}
                          >
                            {cell.label}
                          </div>
                        );
                      }
                      if (cell.kind === "start") {
                        return (
                          <div
                            className="relative bg-secondary-fixed/90 rounded-lg flex items-center justify-center shadow-sm border border-secondary/30"
                            key={key}
                          >
                            <span className="text-[9px] font-bold text-secondary absolute bottom-1 font-label-badge">
                              START
                            </span>
                          </div>
                        );
                      }
                      if (cell.kind === "rock") {
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
                      if (cell.kind === "goal") {
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
                            <span className="font-label-badge text-[8px] font-bold text-tertiary">
                              FINISH
                            </span>
                          </div>
                        );
                      }
                      return (
                        <div
                          className="bg-surface-container-lowest rounded-lg flex items-center justify-center shadow-sm"
                          key={key}
                        >
                          <span className="material-symbols-outlined text-outline-variant text-[18px]">
                            {cell.icon}
                          </span>
                        </div>
                      );
                    }),
                  )}

                  <div
                    className="absolute z-30 transition-all duration-500 ease-out flex items-center justify-center pointer-events-none"
                    style={{
                      width: CELL,
                      height: CELL,
                      left: `calc(${robot.col} * ${CELL_STEP})`,
                      top: `calc(${robot.row} * ${CELL_STEP})`,
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
                  Arah: Timur (Kanan)
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

          <div
            className={`lg:col-span-3 flex-col gap-space-sm order-2 lg:order-2 ${
              paletteOpen ? "flex" : "hidden"
            } lg:flex`}
          >
            <div className="bg-surface-container-lowest rounded-xl shadow-md p-space-md flex flex-col gap-space-md border border-outline-variant/30 sticky top-24">
              <div className="flex items-center justify-between pb-2 border-b border-surface-container-high">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-primary-fixed flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-[18px]">
                      category
                    </span>
                  </div>
                  <div>
                    <h3 className="font-headline-sm text-[16px] text-on-surface font-bold leading-tight">
                      Kotak Perintah
                    </h3>
                    <span className="font-label-badge text-[11px] text-on-surface-variant">
                      Pilih kepingan puzzle
                    </span>
                  </div>
                </div>
                <span className="text-[10px] bg-surface-container-high text-primary px-2 py-0.5 rounded-full font-label-code">
                  Library
                </span>
              </div>

              {library.map((category) => (
                <div
                  className={`flex flex-col gap-2 ${
                    category.divider
                      ? "pt-2 border-t border-surface-container-high"
                      : ""
                  }`}
                  key={category.title}
                >
                  <div
                    className={`flex items-center justify-between font-label-badge text-[12px] font-bold ${category.headerClass}`}
                  >
                    <span className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[15px]">
                        {category.icon}
                      </span>
                      {category.title}
                    </span>
                    <span
                      className={`text-[10px] px-1.5 rounded ${category.badgeClass}`}
                    >
                      {category.count}
                    </span>
                  </div>

                  {category.pieces.map((piece) => (
                    <div
                      className="relative group cursor-grab active:cursor-grabbing hover:-translate-y-0.5 transition-all select-none mt-1 first:mt-0"
                      draggable
                      key={piece.id}
                      onClick={() => spawnNotification(piece.hint)}
                      role="button"
                      tabIndex={0}
                    >
                      <div className="puzzle-female-slot" />
                      <div
                        className={`text-white px-3 ${
                          piece.compact ? "py-2" : "py-2.5"
                        } rounded-lg flex items-center justify-between ${piece.bg} ${
                          piece.compact ? "" : ""
                        }`}
                      >
                        <div className="flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-[16px]">
                            {piece.icon}
                          </span>
                          <span className="font-label-code text-[13px] font-bold">
                            {piece.label}
                          </span>
                        </div>
                        {piece.badge ? (
                          <span className="text-[10px] bg-black/20 px-1.5 py-0.5 rounded font-mono">
                            {piece.badge}
                          </span>
                        ) : (
                          <span className="material-symbols-outlined text-[15px] opacity-75">
                            drag_indicator
                          </span>
                        )}
                      </div>
                      <div className={`puzzle-male-tab ${piece.tab}`} />
                    </div>
                  ))}
                </div>
              ))}

              <div className="text-[11px] text-on-surface-variant bg-surface-container-low p-2 rounded-lg text-center font-body-sm mt-1">
                💡 Tip: Kepingan puzzle saling mengunci secara otomatis.
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col gap-space-md order-3 lg:order-3">
            <div className="bg-surface-container-lowest rounded-xl shadow-md p-space-md lg:p-space-lg flex flex-col gap-space-md border border-outline-variant/30 min-h-[520px] lg:min-h-[640px]">
              <div className="flex items-center justify-between pb-space-xs border-b border-surface-container-high">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-primary-container text-on-primary flex items-center justify-center shadow-[0_2px_0_0_#004b73]">
                    <span className="material-symbols-outlined text-[20px]">
                      extension
                    </span>
                  </div>
                  <div>
                    <h2 className="font-headline-sm text-headline-sm text-on-surface leading-tight">
                      Papan Puzzle Koding
                    </h2>
                    <span className="font-label-badge text-[11px] text-on-surface-variant">
                      Rangkaian balok logika aktif
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1 bg-surface-container-low p-1 rounded-full border border-outline-variant/40">
                  <button
                    className="w-9 h-9 sm:w-7 sm:h-7 rounded-full flex items-center justify-center hover:bg-surface-container-high text-on-surface-variant"
                    onClick={() => spawnNotification("Zoom In Canvas")}
                    title="Perbesar"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[16px]">
                      zoom_in
                    </span>
                  </button>
                  <button
                    className="w-9 h-9 sm:w-7 sm:h-7 rounded-full flex items-center justify-center hover:bg-surface-container-high text-on-surface-variant"
                    onClick={() => spawnNotification("Canvas Normal")}
                    title="Perkecil"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[16px]">
                      zoom_out
                    </span>
                  </button>
                  <button
                    className="w-9 h-9 sm:w-7 sm:h-7 rounded-full flex items-center justify-center hover:bg-error-container text-error"
                    onClick={clearBlocks}
                    title="Bersihkan Susunan"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[16px]">
                      delete_sweep
                    </span>
                  </button>
                </div>
              </div>

              <div
                className="bg-surface-container-low/70 bg-grid-dots rounded-xl p-space-md sm:p-space-lg flex flex-col gap-2 relative shadow-inner overflow-x-auto min-h-[500px] border border-outline-variant/30"
                id="puzzle-canvas"
              >
                <div
                  className={`relative w-max select-none drop-shadow-sm transition-all duration-300 ${active("block-hat")}`}
                  id="block-hat"
                >
                  <div className="inline-flex items-center gap-2.5 bg-[#059669] text-white font-label-code text-[14px] px-4 py-2.5 rounded-t-2xl rounded-br-lg shadow-[0_4px_0_0_#064e3b] border-t-2 border-white/40">
                    <div className="w-6 h-6 rounded-full bg-emerald-300/30 flex items-center justify-center">
                      <span
                        className="material-symbols-outlined text-[18px] text-emerald-200"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        play_arrow
                      </span>
                    </div>
                    <span className="font-bold tracking-wide">
                      🟢 KETIKA ROBOT DIJALANKAN
                    </span>
                    <span className="text-[10px] bg-emerald-900/40 text-emerald-200 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                      Mulai
                    </span>
                  </div>
                  <div
                    className="puzzle-male-tab bg-[#059669] shadow-[0_2px_0_0_#064e3b]"
                    style={{ left: 38 }}
                  />
                </div>

                <div
                  className={`relative ml-5 mt-2.5 w-max select-none drop-shadow-sm transition-all duration-300 ${active("block-step-1")}`}
                  id="block-step-1"
                >
                  <div className="puzzle-female-slot" style={{ left: 20 }} />
                  <div className="flex items-center justify-between gap-3 bg-[#0284c7] text-white font-label-code text-[13px] px-4 py-2.5 rounded-lg shadow-[0_4px_0_0_#075985] border-l-4 border-l-sky-300 border-t border-white/30 min-w-[240px]">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[17px]">
                        directions_run
                      </span>
                      <span className="font-bold">Maju 1 Langkah</span>
                    </div>
                    <span className="text-[11px] bg-sky-900/40 text-sky-200 px-2 py-0.5 rounded-full font-sans font-medium">
                      ke (1,2)
                    </span>
                  </div>
                  <div
                    className="puzzle-male-tab bg-[#0284c7] shadow-[0_2px_0_0_#075985]"
                    style={{ left: 20 }}
                  />
                </div>

                <div
                  className={`relative ml-5 mt-2.5 max-w-full select-none drop-shadow-sm transition-all duration-300 ${active("block-if-c")}`}
                  id="block-if-c"
                >
                  <div className="puzzle-female-slot" style={{ left: 20 }} />
                  <div className="flex flex-col bg-[#d97706] text-white rounded-xl shadow-[0_5px_0_0_#78350f] border-t border-l border-white/30 overflow-hidden">
                    <div className="relative px-3.5 py-2.5 bg-[#d97706] flex items-center gap-2 flex-wrap font-label-code text-[13px] border-b border-amber-900/30">
                      <span className="w-2.5 h-2.5 rounded-sm bg-amber-200 shadow-sm" />
                      <span className="font-bold tracking-wide uppercase">
                        JIKA
                      </span>
                      <div className="bg-surface-container-lowest text-amber-950 px-2.5 py-1 rounded-full text-xs font-bold shadow-sm inline-flex items-center gap-1.5 border border-amber-300">
                        <span
                          className="material-symbols-outlined text-[16px] text-error"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          landslide
                        </span>
                        <span className="font-bold">Ada Batu di Depan?</span>
                        <span className="text-[9px] bg-amber-200/60 text-amber-900 px-1.5 py-0.2 rounded font-mono font-bold">
                          [SENSOR]
                        </span>
                      </div>
                      <span className="font-bold text-amber-100">MAKA:</span>
                    </div>

                    <div className="flex pl-4 pr-3 py-2 bg-black/15">
                      <div className="w-3.5 bg-[#d97706] rounded-l-sm border-r border-amber-800/40 shrink-0 mr-2 flex items-center justify-center">
                        <div className="w-1 h-14 bg-amber-200/30 rounded-full" />
                      </div>
                      <div className="flex flex-col gap-2 flex-1">
                        <div
                          className={`relative w-max transition-all duration-300 ${active("block-inside-turn")}`}
                          id="block-inside-turn"
                        >
                          <div className="puzzle-female-slot" style={{ left: 16 }} />
                          <div className="bg-[#0284c7] text-white font-label-code text-[12px] px-3.5 py-2 rounded-md shadow-[0_3px_0_0_#075985] flex items-center gap-2 border-t border-white/20">
                            <span className="material-symbols-outlined text-[16px]">
                              turn_right
                            </span>
                            <span className="font-bold">Belok Kanan ↷</span>
                            <span className="text-[10px] bg-sky-900/30 text-sky-200 px-1.5 py-0.5 rounded">
                              Hindari Batu
                            </span>
                          </div>
                          <div
                            className="puzzle-male-tab bg-[#0284c7] shadow-[0_2px_0_0_#075985]"
                            style={{ left: 16 }}
                          />
                        </div>
                        <div
                          className={`relative w-max transition-all duration-300 ${active("block-inside-step")}`}
                          id="block-inside-step"
                        >
                          <div className="puzzle-female-slot" style={{ left: 16 }} />
                          <div className="bg-[#0284c7] text-white font-label-code text-[12px] px-3.5 py-2 rounded-md shadow-[0_3px_0_0_#075985] flex items-center gap-2 border-t border-white/20">
                            <span className="material-symbols-outlined text-[16px]">
                              directions_walk
                            </span>
                            <span className="font-bold">
                              Maju 1 Langkah (Jalur Aman)
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="relative px-3.5 py-1.5 bg-[#b45309] font-label-code text-[13px] font-bold flex items-center gap-2 border-y border-amber-950/40">
                      <span className="material-symbols-outlined text-[16px] text-amber-200">
                        call_split
                      </span>
                      <span>SELAIN ITU:</span>
                    </div>

                    <div className="flex pl-4 pr-3 py-2 bg-black/15">
                      <div className="w-3.5 bg-[#b45309] rounded-l-sm border-r border-amber-950/40 shrink-0 mr-2 flex items-center justify-center">
                        <div className="w-1 h-8 bg-amber-200/30 rounded-full" />
                      </div>
                      <div className="flex flex-col gap-1.5 flex-1">
                        <div
                          className={`relative w-max opacity-90 transition-all duration-300 ${active("block-inside-else")}`}
                          id="block-inside-else"
                        >
                          <div className="puzzle-female-slot" style={{ left: 16 }} />
                          <div className="bg-[#0284c7]/90 text-white font-label-code text-[12px] px-3.5 py-2 rounded-md shadow-[0_3px_0_0_#075985] flex items-center gap-2 border-t border-white/20">
                            <span className="material-symbols-outlined text-[16px]">
                              arrow_forward
                            </span>
                            <span className="font-bold">Maju 1 Langkah</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="h-3 bg-[#d97706] rounded-b-lg border-t border-amber-800/40 relative">
                      <div
                        className="puzzle-male-tab bg-[#d97706] shadow-[0_2px_0_0_#78350f]"
                        style={{ left: 20 }}
                      />
                    </div>
                  </div>
                </div>

                <div
                  className="ml-5 mt-3 flex items-center gap-2 text-[12px] text-on-surface-variant font-label-code bg-white/70 px-4 py-2.5 rounded-xl border-2 border-dashed border-primary/40 w-max hover:bg-white transition-all shadow-sm cursor-pointer"
                  onClick={() =>
                    spawnNotification(
                      "Tarik kepingan dari Kotak Perintah ke sini",
                    )
                  }
                  role="button"
                  tabIndex={0}
                >
                  <span className="material-symbols-outlined text-[18px] text-primary">
                    add_circle
                  </span>
                  <span className="font-bold text-primary">
                    Pasang kepingan puzzle di sini
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-space-sm pt-space-xs border-t border-surface-container-high">
                <div className="flex items-center gap-2 flex-wrap w-full sm:w-auto">
                  <button
                    className="flex flex-1 sm:flex-none items-center justify-center gap-1.5 min-h-11 px-space-md py-2 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-badge text-label-badge shadow-[0_3px_0_0_#ffb95f] hover:translate-y-[-1px] active:translate-y-[2px] transition-all"
                    onClick={() => setHintOpen(true)}
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[17px]">
                      lightbulb
                    </span>
                    💡 Bantuan
                  </button>
                  <button
                    className="flex flex-1 sm:flex-none items-center justify-center gap-1.5 min-h-11 px-space-md py-2 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-badge text-label-badge shadow-[0_3px_0_0_#4edea3] hover:translate-y-[-1px] active:translate-y-[2px] transition-all"
                    onClick={checkLogic}
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[17px]">
                      check_box
                    </span>
                    🔍 Cek Logika
                  </button>
                  <button
                    className="flex flex-1 sm:flex-none items-center justify-center gap-1.5 min-h-11 px-space-md py-2 rounded-full bg-surface-container-high text-on-surface-variant font-label-badge text-label-badge hover:bg-surface-container-highest transition-all"
                    onClick={resetSimulation}
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[17px]">
                      restart_alt
                    </span>
                    🔄 Reset
                  </button>
                </div>
                <button
                  className="flex items-center gap-2 min-h-11 px-space-lg py-2.5 rounded-full bg-primary text-on-primary font-headline-sm text-[16px] font-bold shadow-[0_4px_0_0_#004b73] hover:translate-y-[-1px] active:translate-y-[3px] active:shadow-[0_1px_0_0_#004b73] transition-all w-full sm:w-auto justify-center disabled:opacity-70"
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
                Kemajuan Belajar: Level 4 dari 8
              </span>
              <span className="font-body-sm text-body-sm text-on-surface-variant">
                Selesaikan level ini untuk membuka Lencana Penjelajah Algoritma!
              </span>
            </div>
          </div>
          <div className="flex items-center gap-space-md w-full md:w-80">
            <div className="w-full bg-surface-container-high h-3 rounded-full overflow-hidden shadow-inner">
              <div className="bg-primary h-full rounded-full w-1/2 transition-all duration-700" />
            </div>
            <span className="font-label-code text-label-code text-primary font-bold shrink-0">
              50%
            </span>
          </div>
        </div>
      </div>

      <div
        className={`fixed inset-0 z-50 bg-black/40 backdrop-blur-sm p-4 transition-all ${
          hintOpen ? "flex" : "hidden"
        } items-center justify-center`}
      >
        <div className="bg-surface-container-lowest rounded-2xl max-w-md w-full p-space-lg shadow-2xl border border-outline-variant/30 flex flex-col gap-space-md animate-scale-up">
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
              className="w-9 h-9 sm:w-8 sm:h-8 rounded-full hover:bg-surface-container text-on-surface-variant flex items-center justify-center"
              onClick={() => setHintOpen(false)}
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">
                close
              </span>
            </button>
          </div>
          <div className="bg-tertiary-fixed/30 rounded-xl p-space-md border border-tertiary-fixed">
            <p className="font-body-md text-on-surface leading-relaxed">
              “Coba perhatikan arah robot tepat sebelum batu karang! Robot
              harus <strong>Belok Kanan ↷</strong> dulu untuk turun ke jalur
              aman bawah, lalu melangkah ke bintang.”
            </p>
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
        className={`fixed inset-0 z-50 bg-black/50 backdrop-blur-sm p-4 transition-all ${
          successOpen ? "flex" : "hidden"
        } items-center justify-center`}
      >
        <div className="bg-surface-container-lowest rounded-2xl max-w-md w-full p-space-lg shadow-2xl border border-secondary-fixed flex flex-col items-center text-center gap-space-md animate-bounce-short">
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
              Blok keputusan IF/ELSE kamu bekerja sempurna menghindari batu
              karang dan mencapai Bintang Emas!
            </p>
          </div>
          <div className="flex items-center justify-center gap-3 w-full bg-secondary-container/40 p-3 rounded-xl border border-secondary-fixed">
            <span className="font-label-badge text-secondary font-bold text-sm">
              Hadiah Didapat:
            </span>
            <span className="px-3 py-1 bg-secondary text-white rounded-full font-label-code text-sm font-bold shadow-sm">
              +80 XP 🌟
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
            <button
              className="flex-1 py-2.5 rounded-full bg-primary text-on-primary font-label-badge text-label-badge font-bold shadow-[0_3px_0_0_#004b73] hover:brightness-110"
              onClick={() => {
                setSuccessOpen(false);
                spawnNotification("Membuka Level 5: Perulangan Bersarang!");
              }}
              type="button"
            >
              Lanjut Level 5 ➔
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
