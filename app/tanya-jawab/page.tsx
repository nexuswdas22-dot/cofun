import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import FAQAccordion from "@/components/FAQAccordion";

export const metadata: Metadata = {
  title: "Tanya-Jawab - CoFun",
  description:
    "Pertanyaan umum seputar web belajar coding CoFun: cara main, progres level, penyimpanan, dan masalah teknis.",
};

export default function TanyaJawabPage() {
  return (
    <>
      <main className="w-full pt-20 bg-background min-h-[calc(100vh-5rem)]">
        <div className="px-margin-mobile md:px-margin pb-space-xl max-w-3xl mx-auto w-full flex flex-col gap-space-md">
          <div className="flex flex-wrap items-center gap-space-sm mt-4">
            <Link
              className="inline-flex items-center gap-1 px-space-md py-space-xs rounded-full bg-surface-container font-label-badge text-label-badge text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors"
              href="/beranda"
            >
              <span className="material-symbols-outlined text-[16px]">arrow_back</span>
              Beranda
            </Link>
            <span className="inline-flex items-center gap-1.5 px-space-md py-space-xs rounded-full bg-primary-fixed text-on-primary-fixed-variant font-label-badge text-label-badge shadow-[0_2px_0_0_#93ccff]">
              <span className="material-symbols-outlined text-[16px]">quiz</span>
              Tanya-Jawab
            </span>
          </div>

          <div className="flex flex-col gap-space-xs">
            <h1 className="font-headline-md text-headline-md text-on-surface">
              Pertanyaan yang Sering Diajukan
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-3xl">
              Klik pertanyaan untuk melihat jawabannya. Semua jawaban di sini menjelaskan
              bagaimana web CoFun bekerja — dari cara main sampai penyimpanan progres.
            </p>
          </div>

          <FAQAccordion />
        </div>
      </main>
      <Footer />
    </>
  );
}
