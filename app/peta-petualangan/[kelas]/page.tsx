import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import MapExplorer from "../MapExplorer";
import {
  getAllKelas,
  getKelasBySlug,
  progressOf,
  statusMisiOf,
} from "@/lib/curriculum";

export function generateStaticParams() {
  return getAllKelas().map((kelas) => ({ kelas: kelas.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/peta-petualangan/[kelas]">): Promise<Metadata> {
  const { kelas: slug } = await params;
  const kelas = getKelasBySlug(slug);
  return {
    title: kelas ? `${kelas.judul} - CoFun` : "Peta Petualangan - CoFun",
  };
}

export default async function PetaPetualanganKelasPage({
  params,
}: PageProps<"/peta-petualangan/[kelas]">) {
  const { kelas: slug } = await params;
  const kelas = getKelasBySlug(slug);
  if (!kelas) notFound();

  return (
    <>
      <main className="w-full pt-20 bg-background min-h-[calc(100vh-5rem)]">
        <div className="flex flex-col w-full">
          <section className="w-full px-margin-mobile md:px-margin py-space-md bg-surface-container-low shadow-[0_2px_8px_rgba(0,97,148,0.04)]">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-space-md">
              <div className="flex flex-col gap-space-xs">
                <div className="flex items-center gap-space-xs">
                  <Link
                    className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1"
                    href="/pilih-kelas"
                  >
                    <span className="material-symbols-outlined text-[16px]">
                      arrow_back
                    </span>
                    Pilih Kelas
                  </Link>
                  <span className="text-outline-variant font-body-sm text-body-sm">
                    /
                  </span>
                  <span className="font-body-sm text-body-sm text-primary font-bold">
                    Peta Petualangan
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-space-sm">
                  <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface tracking-tight">
                    {kelas.judul}
                  </h1>
                  <span className="bg-primary-fixed text-on-primary-fixed-variant px-space-sm py-0.5 rounded-full font-label-badge text-label-badge uppercase tracking-wider">
                    {kelas.chip}
                  </span>
                </div>
              </div>

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
                      {statusMisiOf(kelas)}
                    </span>
                  </div>
                </div>
                <div className="w-24 sm:w-32 flex-1 sm:flex-none h-3 bg-surface-container rounded-full overflow-hidden p-0.5">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-700"
                    style={{ width: `${progressOf(kelas)}%` }}
                  />
                </div>
              </div>
            </div>
          </section>

          <MapExplorer kelas={kelas} />

          <section className="w-full px-margin-mobile md:px-margin pb-space-xl">
            <div className="max-w-7xl mx-auto bg-surface-container-low rounded-2xl p-space-md flex flex-col md:flex-row items-center justify-between gap-space-md">
              <div className="flex items-center gap-space-md">
                <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-primary shrink-0 shadow-[0_2px_0_0_#bfc7d2]">
                  <span className="material-symbols-outlined text-[22px]">
                    verified
                  </span>
                </div>
                <div className="flex flex-col items-center md:items-start text-center md:text-left">
                  <span className="font-body-md text-body-md font-bold text-on-surface">
                    Belajar dengan Rasa Ingin Tahu, Bebas Tekanan
                  </span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">
                    Setiap anak maju sesuai kecepatannya sendiri tanpa batas
                    waktu yang terburu-buru.
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-space-sm shrink-0">
                <Link
                  className="font-body-sm text-body-sm font-bold text-primary hover:underline flex items-center gap-1"
                  href="/beranda"
                >
                  Panduan Guru &amp; Orang Tua
                  <span className="material-symbols-outlined text-[16px]">
                    chevron_right
                  </span>
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
