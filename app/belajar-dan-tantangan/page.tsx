import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import { getArenaChallenge } from "@/lib/db";
import Arena from "./Arena";
import KuisArena from "./KuisArena";

export const metadata: Metadata = {
  title: "Belajar & Tantangan - CoFun",
};

export default async function BelajarDanTantanganPage() {
  const challenge = getArenaChallenge();

  let content: React.ReactNode;
  if (!challenge) {
    content = (
      <div className="px-margin-mobile md:px-margin py-space-xl max-w-3xl mx-auto w-full">
        <div className="bg-surface-container-lowest rounded-xl shadow-md p-space-lg flex flex-col items-center text-center gap-space-md border border-outline-variant/30">
          <div className="w-14 h-14 rounded-full bg-surface-container-high flex items-center justify-center text-primary">
            <span className="material-symbols-outlined text-[32px]">
              puzzle
            </span>
          </div>
          <h1 className="font-headline-md text-headline-md text-on-surface">
            Belum Ada Soal di Arena
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Soal arena dibuat lewat file JSON di folder{" "}
            <code className="font-label-code text-primary">data/</code>,
            lalu dijalankan <code className="font-label-code text-primary">npm run seed</code>.
            Tambahkan satu objek <code className="font-label-code text-primary">challenges</code>{" "}
            di level mana pun, lalu muat ulang halaman ini.
          </p>
          <Link
            className="min-h-11 flex items-center justify-center gap-1 px-space-md py-2 rounded-full bg-primary text-on-primary font-label-badge text-label-badge shadow-[0_3px_0_0_#004b73]"
            href="/peta-petualangan/kelas-4"
          >
            Lihat Peta Petualangan
          </Link>
        </div>
      </div>
    );
  } else if (challenge.tipe === "kuis") {
    content = (
      <div className="px-margin-mobile md:px-margin pb-space-xl max-w-3xl mx-auto w-full flex flex-col gap-space-md">
        <Link
          className="self-start inline-flex items-center gap-1 px-space-md py-space-xs mt-4 rounded-full bg-surface-container font-label-badge text-label-badge text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors"
          href={`/peta-petualangan/${challenge.kelasSlug}`}
        >
          ← Peta Petualangan
        </Link>
        <div className="bg-surface-container-lowest rounded-xl shadow-md p-space-md lg:p-space-lg border border-outline-variant/30 flex flex-col gap-space-md">
          <span className="font-label-badge text-label-badge text-tertiary uppercase font-bold">
            {challenge.levelTitle} · {challenge.kelasJudul}
          </span>
          <h1 className="font-headline-md text-headline-md text-on-surface">{challenge.title}</h1>
          <p className="font-body-md text-on-surface-variant">{challenge.brief}</p>
          <KuisArena challenge={challenge} key={challenge.id} />
        </div>
      </div>
    );
  } else {
    content = <Arena challenge={challenge} key={challenge.id} />;
  }

  return (
    <>
      <main className="w-full pt-20 bg-background min-h-[calc(100vh-5rem)]">{content}</main>
      <Footer variant="arena" />
    </>
  );
}
