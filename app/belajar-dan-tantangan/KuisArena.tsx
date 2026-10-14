"use client";

// Arena untuk soal non-Blockly (tipe "kuis"): pilihan ganda dan urutan kartu.
// Memakai token tema yang sudah ada (tidak ada warna baru).

import Link from "next/link";
import { useEffect, useState } from "react";
import KuisVisual from "@/components/quiz/KuisVisual";
import { markLevelComplete } from "@/lib/progress";
import type { Challenge, KuisOption } from "@/lib/types";

type Props = { challenge: Challenge };

function shuffle<T>(items: T[]): T[] {
  // Urutan awal kartu diacak agar bukan langsung jawabannya.
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export default function KuisArena({ challenge }: Props) {
  const payload = challenge.kuis;
  const [picked, setPicked] = useState<string[]>([]);
  const [checked, setChecked] = useState<"idle" | "ok" | "salah">("idle");
  // Kartu diacak SETELAH mount (useEffect) supaya hasil SSR dan client sama —
  // menghindari hydration error dari Math.random di useState initializer.
  const [deck, setDeck] = useState<KuisOption[]>(payload?.mode === "urutan" ? payload.kartu : []);

  useEffect(() => {
    if (payload?.mode === "urutan") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDeck(shuffle(payload.kartu));
    }
  }, [payload]);

  if (!payload) {
    return (
      <p className="font-body-md text-on-surface-variant">Soal kuis belum lengkap.</p>
    );
  }

  const isPilihan = payload.mode === "pilihan";
  const multiple = isPilihan && payload.jawaban.length > 1;

  const toggleOption = (id: string) => {
    if (checked === "ok") return;
    setChecked("idle");
    if (isPilihan && !multiple) {
      setPicked([id]);
      return;
    }
    setPicked((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const addCard = (id: string) => {
    if (checked === "ok" || picked.includes(id)) return;
    setChecked("idle");
    setPicked((prev) => [...prev, id]);
  };

  const removeLast = () => {
    if (checked === "ok") return;
    setChecked("idle");
    setPicked((prev) => prev.slice(0, -1));
  };

  const check = () => {
    let benar = false;
    if (isPilihan) {
      benar =
        picked.length === payload.jawaban.length &&
        payload.jawaban.every((id) => picked.includes(id));
    } else {
      benar =
        picked.length === payload.urutanBenar.length &&
        picked.every((id, i) => id === payload.urutanBenar[i]);
    }
    setChecked(benar ? "ok" : "salah");
    if (benar) {
      markLevelComplete(challenge.kelasSlug, challenge.levelNomor);
    }
  };

  const reset = () => {
    setPicked([]);
    setChecked("idle");
  };

  const labelOf = (id: string) =>
    (isPilihan ? payload.opsi : payload.kartu).find((o) => o.id === id)?.label ?? id;

  return (
    <div className="flex flex-col gap-space-md">
      {payload.visual && <KuisVisual id={payload.visual} />}
      <p className="font-headline-sm text-headline-sm text-on-surface">{payload.pertanyaan}</p>

      {isPilihan ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm">
          {payload.opsi.map((opsi) => {
            const active = picked.includes(opsi.id);
            return (
              <button
                aria-pressed={active}
                className={`min-h-11 text-left px-space-md py-space-sm rounded-xl border font-body-md transition-all ${
                  active
                    ? "bg-primary-fixed border-primary text-on-primary-fixed-variant shadow-[0_3px_0_0_#93ccff]"
                    : "bg-surface-container-low border-outline-variant/40 text-on-surface hover:bg-surface-container"
                }`}
                key={opsi.id}
                onClick={() => toggleOption(opsi.id)}
                type="button"
              >
                {opsi.label}
              </button>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col gap-space-md">
          <div className="flex flex-wrap gap-space-sm min-h-14 p-space-sm rounded-xl bg-surface-container-low border border-dashed border-outline-variant">
            {picked.length === 0 && (
              <span className="font-body-sm text-on-surface-variant">
                Ketuk kartu di bawah sesuai urutan yang benar.
              </span>
            )}
            {picked.map((id, i) => (
              <span
                className="px-space-md py-space-xs rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-badge text-label-badge"
                key={id}
              >
                {i + 1}. {labelOf(id)}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap gap-space-sm">
            {deck.map((kartu) => {
              const used = picked.includes(kartu.id);
              return (
                <button
                  className={`min-h-11 px-space-md py-space-sm rounded-xl border font-body-md transition-all ${
                    used
                      ? "opacity-40 border-outline-variant/30 bg-surface-container"
                      : "bg-tertiary-fixed border-tertiary/40 text-on-tertiary-fixed shadow-[0_3px_0_0_#ffb95f] hover:translate-y-[-1px]"
                  }`}
                  disabled={used}
                  key={kartu.id}
                  onClick={() => addCard(kartu.id)}
                  type="button"
                >
                  {kartu.label}
                </button>
              );
            })}
          </div>
          <button
            className="self-start text-on-surface-variant font-label-badge text-label-badge px-space-md py-space-xs rounded-full bg-surface-container hover:bg-surface-container-high"
            onClick={removeLast}
            type="button"
          >
            Hapus kartu terakhir
          </button>
        </div>
      )}

      {checked === "ok" && (
        <div className="flex items-center gap-2 bg-secondary-container/40 border border-secondary-fixed p-space-md rounded-xl text-secondary font-bold">
          <span className="material-symbols-outlined text-[20px]">check_circle</span>
          {challenge.feedbackSukses}
        </div>
      )}
      {checked === "salah" && (
        <div className="flex items-center gap-2 bg-error-container/50 border border-error/30 p-space-md rounded-xl text-on-error-container">
          <span className="material-symbols-outlined text-[20px]">info</span>
          {challenge.feedbackGagal}
        </div>
      )}

      <div className="flex flex-wrap items-center gap-space-sm">
        {checked !== "ok" && (
          <button
            className="min-h-11 px-space-lg py-2.5 rounded-full bg-primary text-on-primary font-headline-sm text-[16px] font-bold shadow-[0_4px_0_0_#004b73] disabled:opacity-60"
            disabled={picked.length === 0}
            onClick={check}
            type="button"
          >
            Periksa Jawaban
          </button>
        )}
        <button
          className="min-h-11 px-space-md py-2 rounded-full bg-surface-container-high text-on-surface-variant font-label-badge text-label-badge"
          onClick={reset}
          type="button"
        >
          Ulangi
        </button>
        {checked === "ok" &&
          (challenge.levelNomor < challenge.totalLevels ? (
            <Link
              className="min-h-11 flex items-center gap-1.5 px-space-lg py-2 rounded-full bg-primary text-on-primary font-label-badge text-label-badge font-bold shadow-[0_3px_0_0_#004b73]"
              href={`/belajar-dan-tantangan/${challenge.kelasSlug}/${challenge.levelNomor + 1}`}
            >
              Lanjut Level Berikutnya
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </Link>
          ) : (
            <Link
              className="min-h-11 flex items-center gap-1.5 px-space-lg py-2 rounded-full bg-primary text-on-primary font-label-badge text-label-badge font-bold shadow-[0_3px_0_0_#004b73]"
              href={`/peta-petualangan/${challenge.kelasSlug}`}
            >
              Kembali ke Peta
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </Link>
          ))}
      </div>
    </div>
  );
}
