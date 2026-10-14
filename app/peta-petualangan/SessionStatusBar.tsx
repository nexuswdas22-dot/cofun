"use client";

// Status misi + bar progress di header peta: mengikuti progres belajar
// siswa di perangkat ini (lib/progress, sesi berjalan) supaya konsisten
// dengan MapExplorer di bawahnya — bukan hanya levelAktif awal dari DB.
import { useEffect, useState } from "react";
import { getCompletedLevel } from "@/lib/progress";
import { progressOf, statusMisiOf, type Kelas } from "@/lib/types";

export default function SessionStatusBar({ kelas }: { kelas: Kelas }) {
  const totalLevels = kelas.levels.length;
  const [levelAktif, setLevelAktif] = useState(kelas.levelAktif);

  useEffect(() => {
    const completed = getCompletedLevel(kelas.slug);
    const effective = Math.min(totalLevels, Math.max(kelas.levelAktif, completed + 1));
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLevelAktif(effective);
  }, [kelas.slug, kelas.levelAktif, totalLevels]);

  const kelasAktif: Kelas = { ...kelas, levelAktif };

  return (
    <div className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-space-sm sm:gap-space-md w-full sm:w-auto bg-surface-container-lowest px-space-md py-space-sm rounded-full shadow-[0_3px_0_0_#bfc7d2]">
      <div className="flex items-center gap-space-xs">
        <span
          className="material-symbols-outlined text-primary text-[20px]"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          explore
        </span>
        <div className="flex flex-col">
          <span className="font-label-badge text-label-badge text-on-surface-variant leading-none">
            Status Misi
          </span>
          <span className="font-body-md text-body-md font-bold text-primary leading-tight">
            {statusMisiOf(kelasAktif)}
          </span>
        </div>
      </div>
      <div className="w-24 sm:w-32 flex-1 sm:flex-none h-3 bg-surface-container rounded-full overflow-hidden p-0.5">
        <div
          className="h-full bg-primary rounded-full transition-all duration-700"
          style={{ width: `${progressOf(kelasAktif)}%` }}
        />
      </div>
    </div>
  );
}
