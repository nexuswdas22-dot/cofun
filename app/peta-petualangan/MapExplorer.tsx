"use client";

import Link from "next/link";
import { useState } from "react";
import {
  codeOf,
  ctaStateOf,
  nodeSummaryOf,
  statusBadge,
  statusOf,
  type Kelas,
  type Level,
  type LevelStatus,
} from "@/lib/curriculum";

const NODE_POSITIONS = [
  "left-[10.5%] bottom-[8%]",
  "left-[50%] bottom-[26.6%]",
  "right-[17.1%] bottom-[49.2%]",
  "left-[28.3%] top-[16.9%] z-20",
  "right-[28.3%] top-[4.8%]",
];

function LevelNode({
  level,
  status,
  active,
  onSelect,
}: {
  level: Level;
  status: LevelStatus;
  active: boolean;
  onSelect: (id: number) => void;
}) {
  const discIcon = status === "done" ? "check_circle" : level.nodeIcon;
  const labelIcon = status === "locked" ? "flag" : level.nodeIcon;

  return (
    <button
      aria-pressed={active}
      className={`absolute flex flex-col items-center group cursor-pointer ${NODE_POSITIONS[level.id - 1]}`}
      onClick={() => onSelect(level.id)}
      type="button"
    >
      {status === "done" && (
        <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-secondary-fixed flex items-center justify-center shadow-[0_5px_0_0_#00714d] hover:brightness-105 active:translate-y-1 transition-all">
          <span
            className="material-symbols-outlined text-on-secondary-fixed text-[26px] sm:text-[32px]"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            check_circle
          </span>
        </div>
      )}

      {status === "active" && (
        <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-primary flex items-center justify-center shadow-[0_6px_0_0_#004b73] hover:scale-105 transition-transform">
          <div className="absolute inset-0 rounded-full bg-primary-container animate-ping opacity-25" />
          <span
            className="material-symbols-outlined text-on-primary text-[30px] sm:text-[38px]"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            {discIcon}
          </span>
        </div>
      )}

      {status === "locked" && (
        <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-surface-container-high flex items-center justify-center shadow-[0_5px_0_0_#bfc7d2] hover:bg-surface-container-highest active:translate-y-1 transition-all">
          <span className="material-symbols-outlined text-primary text-[26px] sm:text-[32px]">
            {discIcon}
          </span>
        </div>
      )}

      {status === "active" ? (
        <div className="mt-1.5 sm:mt-2 bg-primary text-on-primary px-2.5 sm:px-space-md py-1 rounded-full shadow-[0_3px_0_0_#004b73] flex items-center gap-1 font-body-sm text-xs sm:text-body-sm font-bold whitespace-nowrap">
          <span>
            {level.id}. {level.nodeLabel}
          </span>
        </div>
      ) : (
        <div
          className={`mt-1.5 sm:mt-2 bg-surface-container-lowest/95 px-2 sm:px-space-sm py-1 rounded-full shadow-[0_2px_0_0_#bfc7d2] flex items-center gap-1 whitespace-nowrap ${
            active ? "ring-2 ring-primary/40" : ""
          }`}
        >
          <span
            className={`material-symbols-outlined text-[13px] sm:text-[14px] ${
              status === "done" ? "text-secondary" : "text-outline"
            }`}
          >
            {labelIcon}
          </span>
          <span
            className={`font-body-sm text-xs sm:text-body-sm font-bold ${
              status === "done" ? "text-on-surface" : "text-on-surface-variant"
            }`}
          >
            {level.id}. {level.nodeLabel}
          </span>
        </div>
      )}
    </button>
  );
}

function ConceptBanner({ title, code }: { title: string; code: string }) {
  return (
    <div className="relative w-full h-44 rounded-2xl overflow-hidden bg-gradient-to-br from-primary via-primary-container to-secondary flex items-center justify-center group">
      <div className="absolute -top-10 -left-8 w-44 h-44 rounded-full bg-on-primary/10" />
      <div className="absolute -bottom-14 -right-6 w-52 h-52 rounded-full bg-on-primary/10" />
      <svg
        className="absolute inset-0 w-full h-full opacity-50"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 400 176"
      >
        <path
          d="M30 140 C 110 140, 130 50, 210 50"
          stroke="#fdfcff"
          strokeDasharray="10 14"
          strokeLinecap="round"
          strokeWidth="5"
        />
        <path
          d="M140 96 C 190 96, 230 140, 330 140"
          stroke="#fdfcff"
          strokeDasharray="10 14"
          strokeLinecap="round"
          strokeWidth="5"
        />
      </svg>
      <div className="relative z-10 flex flex-col items-center gap-space-sm">
        <div className="w-20 h-20 rounded-3xl bg-on-primary/15 border border-on-primary/30 flex items-center justify-center shadow-[0_6px_0_0_rgba(0,0,0,0.15)] group-hover:-translate-y-1 transition-transform">
          <span
            className="material-symbols-outlined text-on-primary text-[44px]"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            smart_toy
          </span>
        </div>
        <span className="font-label-badge text-label-badge uppercase tracking-wider text-secondary-fixed bg-on-surface/30 backdrop-blur-sm px-space-sm py-0.5 rounded-full">
          {title}
        </span>
      </div>
      <div className="absolute bottom-3 left-3 right-3 text-on-primary flex items-center justify-between z-10">
        <span className="font-label-code text-label-code bg-on-surface/60 backdrop-blur-sm px-2 py-1 rounded">
          {code}
        </span>
        <span className="material-symbols-outlined text-[20px]">
          smart_toy
        </span>
      </div>
    </div>
  );
}

export default function MapExplorer({ kelas }: { kelas: Kelas }) {
  const [activeId, setActiveId] = useState(kelas.levelAktif);
  const level =
    kelas.levels.find((item) => item.id === activeId) ??
    kelas.levels[kelas.levelAktif - 1];
  const status = statusOf(kelas, level.id);
  const badge = statusBadge(status);
  const cta = ctaStateOf(kelas, level, status);

  return (
    <section className="w-full px-margin-mobile md:px-margin py-space-lg">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
        <div className="lg:col-span-8 bg-surface-container-lowest rounded-[28px] shadow-[0_8px_24px_-4px_rgba(0,97,148,0.08)] relative overflow-hidden flex flex-col p-space-md md:p-space-lg">
          <div className="flex flex-wrap items-center justify-between gap-2 z-10">
            <div className="flex items-center gap-space-xs bg-surface-container-high/90 backdrop-blur-md px-2.5 sm:px-space-md py-space-xs rounded-full shadow-[0_2px_0_0_#bfc7d2]">
              <span className="material-symbols-outlined text-secondary text-[18px]">
                nature
              </span>
              <span className="font-body-sm text-xs sm:text-body-sm font-bold text-on-surface">
                {kelas.pulau}
              </span>
            </div>
            <div className="flex items-center gap-space-xs text-on-surface-variant font-label-badge text-label-badge bg-surface-container/70 px-2.5 sm:px-space-sm py-space-xs rounded-full">
              <span className="w-2.5 h-2.5 rounded-full bg-secondary inline-block shrink-0" />
              {nodeSummaryOf(kelas)}
            </div>
          </div>

          <div className="lg:hidden mt-2 inline-flex w-fit items-center gap-1.5 bg-surface-container-low px-3 py-1.5 rounded-full border border-outline-variant/30 font-label-badge text-label-badge text-on-surface-variant tracking-wide">
            <span className="material-symbols-outlined text-[15px] text-primary">
              swipe
            </span>
            Geser peta ke samping untuk lihat semua level
          </div>

          <div className="relative w-full h-[480px] sm:h-[560px] md:h-[620px] my-space-md select-none overflow-x-auto rounded-2xl bg-gradient-to-b from-surface-container-low via-surface-container to-surface-container-high/60">
            <div className="relative w-full min-w-[760px] h-full">
              <div className="absolute top-[4%] left-[3%] flex items-center gap-2 bg-surface-container-lowest/80 backdrop-blur-sm px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full opacity-90 shadow-sm animate-pulse">
                <span className="material-symbols-outlined text-primary-fixed-dim text-[20px]">
                  cloud
                </span>
                <span className="font-label-code text-[13px] sm:text-label-code text-primary">
                  mulai_jalan()
                </span>
              </div>
              <div className="absolute bottom-[4%] right-[3%] flex items-center gap-2 bg-surface-container-lowest/80 backdrop-blur-sm px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full opacity-90 shadow-sm">
                <span className="material-symbols-outlined text-tertiary-fixed-dim text-[20px]">
                  psychology
                </span>
                <span className="font-label-code text-[13px] sm:text-label-code text-tertiary">
                  finish_misi()
                </span>
              </div>

              <span className="material-symbols-outlined absolute top-[22%] right-[6%] text-secondary text-[36px] opacity-40">
                park
              </span>
              <span className="material-symbols-outlined absolute bottom-[26%] left-[5%] text-secondary text-[32px] opacity-40">
                park
              </span>
              <span className="material-symbols-outlined absolute top-1/2 left-[4%] text-primary text-[28px] opacity-30">
                deployed_code
              </span>
              <span className="material-symbols-outlined absolute top-[20%] right-[14%] text-tertiary text-[24px] opacity-30">
                shapes
              </span>

              <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 760 620"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M 120 540 C 260 520, 290 410, 420 420 C 560 430, 650 340, 580 270 C 510 200, 310 260, 260 170 C 220 100, 360 70, 500 70"
                  stroke="#bfc7d2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="26"
                />
                <path
                  d="M 120 540 C 260 520, 290 410, 420 420 C 560 430, 650 340, 580 270 C 510 200, 310 260, 260 170 C 220 100, 360 70, 500 70"
                  stroke="#dee8ff"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="20"
                />
                <path
                  d="M 120 540 C 260 520, 290 410, 420 420 C 560 430, 650 340, 580 270 C 510 200, 310 260, 260 170 C 220 100, 360 70, 500 70"
                  stroke="#93ccff"
                  strokeDasharray="10 14"
                  strokeLinecap="round"
                  strokeWidth="4"
                />
              </svg>

              {kelas.levels.map((item) => (
                <LevelNode
                  active={item.id === activeId}
                  key={item.id}
                  level={item}
                  onSelect={setActiveId}
                  status={statusOf(kelas, item.id)}
                />
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 pt-space-xs text-on-surface-variant font-body-sm text-xs sm:text-body-sm">
            <div className="flex flex-wrap items-center gap-2 sm:gap-space-md">
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-full bg-secondary-fixed" />{" "}
                Sudah Selesai
              </span>
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-full bg-primary" /> Level Saat
                Ini
              </span>
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-full bg-surface-container-high" />{" "}
                Siap Dipelajari
              </span>
            </div>
            <span className="text-outline font-label-badge text-label-badge uppercase">
              Klik node untuk melihat info level
            </span>
          </div>
        </div>

        <div
          className="lg:col-span-4 flex flex-col gap-space-md bg-surface-container-lowest rounded-[28px] p-space-md md:p-space-lg shadow-[0_8px_24px_-4px_rgba(0,97,148,0.08)] animate-fade-in"
          data-reveal
          id="level-preview-drawer"
          key={level.id}
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span
              className={`font-label-badge text-label-badge uppercase tracking-wider px-space-sm py-1 rounded-full ${badge.className}`}
            >
              {badge.label}
            </span>
            <div className="flex items-center gap-1 text-on-surface-variant font-label-code text-label-code">
              <span className="material-symbols-outlined text-[16px] text-primary">
                code_blocks
              </span>
              {codeOf(kelas, level.id)}
            </div>
          </div>

          <div className="flex flex-col gap-space-xs">
            <h2 className="font-headline-md text-headline-md text-on-surface tracking-tight">
              {level.title}
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant">
              {level.topic}
            </p>
          </div>

          <ConceptBanner code={kelas.bannerCode} title={kelas.bannerTitle} />

          <div className="bg-surface-container-low p-space-md rounded-2xl flex flex-col gap-space-xs">
            <div className="flex items-center gap-space-xs text-primary font-bold font-body-sm text-body-sm">
              <span className="material-symbols-outlined text-[18px]">
                lightbulb
              </span>
              Konsep Singkat
            </div>
            <p className="font-body-md text-body-md text-on-surface">
              {level.desc}
            </p>
          </div>

          <div className="flex flex-col gap-space-xs">
            <span className="font-label-badge text-label-badge text-on-surface-variant uppercase tracking-wider">
              Keahlian yang Dipelajari
            </span>
            <div className="flex flex-col gap-1.5 font-body-sm text-body-sm text-on-surface">
              {level.skills.map((skill) => (
                <div className="flex items-center gap-2" key={skill}>
                  <span className="material-symbols-outlined text-secondary text-[18px]">
                    check
                  </span>
                  <span>{skill}</span>
                </div>
              ))}
            </div>
          </div>

          {cta.enabled ? (
            <Link
              className="mt-space-xs w-full min-h-11 flex items-center justify-center gap-space-xs py-space-sm px-space-md rounded-full bg-primary hover:bg-primary-container text-on-primary font-headline-sm text-headline-sm shadow-[0_4px_0_0_#004b73] active:translate-y-1 active:shadow-[0_1px_0_0_#004b73] transition-all"
              href="/belajar-dan-tantangan"
            >
              <span>{cta.label}</span>
              <span className="material-symbols-outlined text-[20px]">
                arrow_forward
              </span>
            </Link>
          ) : (
            <span className="mt-space-xs w-full min-h-11 flex items-center justify-center gap-space-xs py-space-sm px-space-md rounded-full bg-surface-container-high text-on-surface-variant font-headline-sm text-headline-sm font-bold select-none">
              <span className="material-symbols-outlined text-[20px]">
                {kelas.ctaEnabled ? "lock" : "hourglass_top"}
              </span>
              {cta.label}
            </span>
          )}
        </div>
      </div>
    </section>
  );
}
