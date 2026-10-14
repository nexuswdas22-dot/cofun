import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import { getAllKelas, getChallengeForLevel } from "@/lib/db";
import Arena from "../../Arena";
import KuisArena from "../../KuisArena";

// Prerender SEMUA halaman arena saat build (DB masih bisa ditulis di build
// container). Tanpa ini, route dynamic dirender runtime dan SQLite tidak
// tersedia di serverless (mis. Vercel) → halaman 404.
export function generateStaticParams() {
  try {
    return getAllKelas().flatMap((kelas) =>
      kelas.levels.map((lvl) => ({ kelas: kelas.slug, level: String(lvl.id) })),
    );
  } catch {
    // Database belum di-seed — biarkan Next menangani route tanpa prerender.
    return [];
  }
}

export const dynamicParams = false;

type Params = Promise<{ kelas: string; level: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { kelas, level } = await params;
  let challenge;
  try {
    challenge = getChallengeForLevel(kelas, Number(level));
  } catch {
    challenge = undefined;
  }
  return { title: challenge ? `${challenge.title} - CoFun` : "Arena - CoFun" };
}

export default async function ArenaLevelPage({ params }: { params: Params }) {
  const { kelas, level } = await params;
  const nomor = Number(level);
  if (!Number.isInteger(nomor)) notFound();

  let challenge;
  try {
    challenge = getChallengeForLevel(kelas, nomor);
  } catch {
    challenge = undefined;
  }
  if (!challenge) notFound();

  return (
    <>
      <main className="w-full pt-20 bg-background min-h-[calc(100vh-5rem)]">
        {challenge.tipe === "kuis" ? (
          <div className="px-margin-mobile md:px-margin pb-space-xl max-w-3xl mx-auto w-full flex flex-col gap-space-md">
            <Link
              className="self-start inline-flex items-center gap-1 px-space-md py-space-xs mt-4 rounded-full bg-surface-container font-label-badge text-label-badge text-on-surface-variant hover:bg-surface-container-high"
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
        ) : (
          <Arena challenge={challenge} key={challenge.id} />
        )}
      </main>
      <Footer variant="arena" />
    </>
  );
}
