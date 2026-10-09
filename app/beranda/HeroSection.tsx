"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const ROBOT_TRANSFORMS = [
  "translateX(45px) rotate(8deg)",
  "translateX(80px) translateY(-10px) rotate(0deg)",
  "translateX(100px) translateY(-20px) scale(1.1)",
];

type Phase = "idle" | "step-1" | "step-2" | "celebrate";

export default function HeroSection() {
  const [phase, setPhase] = useState<Phase>("idle");
  const timers = useRef<number[]>([]);

  useEffect(() => {
    return () => {
      timers.current.forEach((timer) => clearTimeout(timer));
    };
  }, []);

  const runRobot = () => {
    if (phase !== "idle") return;
    setPhase("step-1");
    timers.current = [
      window.setTimeout(() => setPhase("step-2"), 400),
      window.setTimeout(() => setPhase("celebrate"), 800),
      window.setTimeout(() => setPhase("idle"), 2000),
    ];
  };

  const scrollToBanner = () => {
    document
      .getElementById("cta-banner")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const robotTransform =
    phase === "step-1"
      ? ROBOT_TRANSFORMS[0]
      : phase === "step-2"
        ? ROBOT_TRANSFORMS[1]
        : phase === "celebrate"
          ? ROBOT_TRANSFORMS[2]
          : "none";

  const eyeRadius = phase === "idle" ? 5 : 7;

  return (
    <section className="relative w-full overflow-hidden px-margin-mobile md:px-margin py-space-xl lg:py-24 bg-gradient-to-b from-surface-container-low via-background to-background">
      <div className="absolute -top-12 -left-12 w-72 h-72 rounded-full bg-primary-fixed/30 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-96 h-96 rounded-full bg-secondary-fixed/20 blur-3xl pointer-events-none" />
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-center relative z-10">
        <div className="lg:col-span-7 flex flex-col items-start gap-space-lg">
          <div className="inline-flex items-center gap-space-xs bg-surface-container-high px-space-md py-space-xs rounded-full shadow-[0_2px_0_0_#bfc7d2]">
            <span
              className="material-symbols-outlined text-tertiary text-[18px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              stars
            </span>
            <span className="font-label-badge text-label-badge text-primary font-bold uppercase tracking-wide">
              Sahabat Pintar Anak SD
            </span>
          </div>
          <div className="flex flex-col gap-space-sm">
            <h1 className="font-display text-display-mobile md:text-display text-on-surface tracking-tight">
              Belajar Coding Jadi{" "}
              <br className="hidden sm:inline" />
              <span className="text-primary underline decoration-secondary-container decoration-wavy decoration-4">
                Seru & Asyik!
              </span>
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl">
              Media belajar logika, computational thinking, dan algoritma untuk
              anak SD dengan robot interaktif yang selalu siap membantu
              petualanganmu!
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-space-md pt-space-xs w-full sm:w-auto">
            <button
              className="group flex w-full sm:w-auto items-center justify-center gap-space-sm bg-primary hover:bg-primary-container text-on-primary font-headline-sm text-headline-sm px-space-lg py-3 rounded-full shadow-[0_4px_0_0_#004b73] active:translate-y-1 active:shadow-[0_1px_0_0_#004b73] transition-all cursor-pointer"
              id="cta-start"
              onClick={scrollToBanner}
              type="button"
            >
              <span className="material-symbols-outlined text-[24px] group-hover:rotate-12 transition-transform">
                rocket_launch
              </span>
              <span>Mulai Belajar Sekarang</span>
            </button>
            <Link
              className="flex w-full sm:w-auto items-center justify-center gap-space-xs bg-surface-container-lowest hover:bg-surface-container-high text-primary font-headline-sm text-headline-sm px-space-lg py-3 rounded-full shadow-[0_3px_0_0_#bfc7d2] active:translate-y-1 active:shadow-[0_1px_0_0_#bfc7d2] transition-all cursor-pointer"
              href="/pilih-kelas"
            >
              <span className="material-symbols-outlined text-[22px]">
                explore
              </span>
              <span>Lihat Petualangan</span>
            </Link>
          </div>
          <div className="flex flex-wrap items-center gap-space-lg pt-space-md">
            <div className="flex items-center gap-space-xs">
              <div className="w-8 h-8 rounded-full bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed">
                <span className="material-symbols-outlined text-[18px]">
                  verified_user
                </span>
              </div>
              <span className="font-body-sm text-body-sm text-on-surface font-semibold">
                100% Ramah & Aman
              </span>
            </div>
            <div className="flex items-center gap-space-xs">
              <div className="w-8 h-8 rounded-full bg-tertiary-fixed flex items-center justify-center text-on-tertiary-fixed">
                <span className="material-symbols-outlined text-[18px]">
                  grade
                </span>
              </div>
              <span className="font-body-sm text-body-sm text-on-surface font-semibold">
                Kurikulum Merdeka SD
              </span>
            </div>
          </div>
        </div>
        <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
          <div className="w-full bg-surface-container-lowest rounded-2xl p-space-lg shadow-xl relative overflow-hidden flex flex-col gap-space-md">
            <div className="flex items-center justify-between bg-surface-container-low px-space-md py-space-xs rounded-xl">
              <div className="flex items-center gap-space-xs">
                <span className="w-3 h-3 rounded-full bg-error" />
                <span className="w-3 h-3 rounded-full bg-tertiary-fixed-dim" />
                <span className="w-3 h-3 rounded-full bg-secondary-fixed-dim" />
              </div>
              <span className="font-label-code text-label-code text-on-surface-variant flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px] text-primary">
                  smart_toy
                </span>{" "}
                CoFun Play Area
              </span>
              <span className="font-label-badge text-label-badge bg-secondary-container text-on-secondary-container px-2 py-0.5 rounded-full">
                Level 1-A
              </span>
            </div>
            <div className="w-full h-56 bg-surface-container-low rounded-xl relative flex items-center justify-center overflow-hidden">
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage:
                    "radial-gradient(#006194 1px, transparent 1px)",
                  backgroundSize: "20px 20px",
                }}
              />
              <div className="absolute right-8 top-12 flex flex-col items-center animate-bounce">
                <span
                  className="material-symbols-outlined text-[32px] text-tertiary"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  flag
                </span>
                <span className="font-label-badge text-label-badge text-tertiary font-bold">
                  FINISH
                </span>
              </div>
              <div className="absolute inset-x-12 bottom-16 flex items-center justify-around opacity-40">
                <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                <span className="w-2.5 h-2.5 rounded-full bg-primary" />
              </div>
              <div
                className="relative z-10 flex flex-col items-center transition-transform duration-500 ease-out"
                id="hero-robot"
                style={{ transform: robotTransform }}
              >
                <svg
                  className="drop-shadow-md"
                  fill="none"
                  height="130"
                  viewBox="0 0 120 130"
                  width="120"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="60"
                    cy="8"
                    fill="#FFB95F"
                    r="6"
                    stroke="#A36700"
                    strokeWidth="2"
                  />
                  <rect fill="#006194" height="12" rx="2" width="4" x="58" y="14" />
                  <rect fill="#007BB9" height="60" rx="16" width="70" x="25" y="24" />
                  <rect fill="#E7EEFF" height="38" rx="10" width="54" x="33" y="32" />
                  <circle
                    cx="46"
                    cy="48"
                    fill="#004B73"
                    id="robot-eye-left"
                    r={eyeRadius}
                  />
                  <circle
                    cx="74"
                    cy="48"
                    fill="#004B73"
                    id="robot-eye-right"
                    r={eyeRadius}
                  />
                  <path
                    d="M52 56C54 60 66 60 68 56"
                    stroke="#004B73"
                    strokeLinecap="round"
                    strokeWidth="3"
                  />
                  <ellipse cx="40" cy="56" fill="#FFA5A5" rx="3" ry="2" />
                  <ellipse cx="80" cy="56" fill="#FFA5A5" rx="3" ry="2" />
                  <rect
                    className="origin-top animate-pulse"
                    fill="#006194"
                    height="20"
                    rx="5"
                    width="10"
                    x="13"
                    y="44"
                  />
                  <rect fill="#006194" height="20" rx="5" width="10" x="97" y="44" />
                  <rect fill="#263143" height="14" rx="7" width="60" x="30" y="86" />
                  <circle cx="42" cy="93" fill="#6FFBBE" r="3.5" />
                  <circle cx="60" cy="93" fill="#6FFBBE" r="3.5" />
                  <circle cx="78" cy="93" fill="#6FFBBE" r="3.5" />
                </svg>
                <div className="bg-surface-container-lowest text-primary font-label-badge text-label-badge px-2.5 py-1 rounded-full shadow-[0_2px_4px_rgba(0,0,0,0.06)] mt-1 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px] text-secondary">
                    sentiment_very_satisfied
                  </span>
                  <span>Siap Jalankan Kode!</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="w-full bg-tertiary-fixed text-on-tertiary-fixed px-space-md py-2.5 rounded-xl font-label-code text-label-code flex items-center justify-between shadow-[0_3px_0_0_#a36700] hover:translate-x-1 transition-transform cursor-pointer">
                <div className="flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-[20px] text-tertiary">
                    replay
                  </span>
                  <span>ULANGI (REPEAT) : 3x</span>
                </div>
                <span className="material-symbols-outlined text-[18px]">
                  drag_handle
                </span>
              </div>
              <div className="w-[92%] ml-auto bg-primary-fixed text-on-primary-fixed-variant px-space-md py-2.5 rounded-xl font-label-code text-label-code flex items-center justify-between shadow-[0_3px_0_0_#004b73] hover:translate-x-1 transition-transform cursor-pointer">
                <div className="flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-[20px] text-primary">
                    arrow_forward
                  </span>
                  <span>MAJU (MOVE 1 LANGKAH)</span>
                </div>
                <span className="material-symbols-outlined text-[18px]">
                  drag_handle
                </span>
              </div>
              <div className="w-[92%] ml-auto bg-secondary-fixed text-on-secondary-fixed-variant px-space-md py-2.5 rounded-xl font-label-code text-label-code flex items-center justify-between shadow-[0_3px_0_0_#005236] hover:translate-x-1 transition-transform cursor-pointer">
                <div className="flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-[20px] text-secondary">
                    turn_right
                  </span>
                  <span>BELOK KANAN (TURN RIGHT)</span>
                </div>
                <span className="material-symbols-outlined text-[18px]">
                  drag_handle
                </span>
              </div>
            </div>
            <button
              className="w-full bg-secondary hover:bg-on-secondary-container text-on-secondary font-headline-sm text-headline-sm py-2.5 rounded-xl shadow-[0_4px_0_0_#005236] active:translate-y-1 active:shadow-[0_1px_0_0_#005236] flex items-center justify-center gap-2 transition-all cursor-pointer"
              id="run-simulation-btn"
              onClick={runRobot}
              type="button"
            >
              {phase === "idle" ? (
                <>
                  <span className="material-symbols-outlined text-[22px]">
                    play_circle
                  </span>
                  <span>Uji Coba Kode Robot</span>
                </>
              ) : phase === "celebrate" ? (
                <>
                  <span className="material-symbols-outlined text-[20px]">
                    celebration
                  </span>
                  <span>Misi Selesai! Hore!</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined animate-spin text-[20px]">
                    sync
                  </span>
                  <span>Robot Berjalan...</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
