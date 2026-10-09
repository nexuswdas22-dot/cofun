import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Pilih Kelas - CoFun",
};

const classes = [
  {
    slug: "kelas-1",
    badge: "Kelas 1 SD",
    badgeClass: "bg-tertiary-fixed text-on-tertiary-fixed",
    stage: "Tahap: Fondasi Awal",
    icon: "child_care",
    iconBox: "bg-tertiary-fixed/40 text-tertiary",
    title: "Mengenal Logika",
    description:
      "Latihan berpikir tertib, memilah objek, dan menyimak instruksi sederhana melalui observasi visual.",
    modules: [
      "Kenali Pola",
      "Kelompokkan",
      "Kenali Arah",
      "Ikuti Instruksi",
      "Misi Pertama",
    ],
    activeStepClass: "bg-tertiary-fixed-dim",
  },
  {
    slug: "kelas-2",
    badge: "Kelas 2 SD",
    badgeClass: "bg-primary-fixed text-on-primary-fixed-variant",
    stage: "Tahap: Langkah Teratur",
    icon: "route",
    iconBox: "bg-primary-fixed/40 text-primary",
    title: "Urutan & Instruksi",
    description:
      "Membangun alur berpikir sekuensial: memandu karakter melewati labirin dengan perintah presisi.",
    modules: [
      "Susun Langkah",
      "Jalan ke Tujuan",
      "Ikuti Pola",
      "Cari Kesalahan",
      "Misi Robot",
    ],
    activeStepClass: "bg-primary-fixed-dim",
  },
  {
    slug: "kelas-3",
    badge: "Kelas 3 SD",
    badgeClass: "bg-secondary-fixed text-on-secondary-fixed",
    stage: "Tahap: Pemecahan Masalah",
    icon: "schema",
    iconBox: "bg-secondary-fixed/40 text-secondary",
    title: "Algoritma Dasar",
    description:
      "Memahami konsep algoritma dan pengkondisian awal: mengambil keputusan sederhana secara terstruktur.",
    modules: [
      "Apa Itu Algoritma?",
      "Buat Algoritma",
      "Pecahkan Masalah",
      "Jika... Maka...",
      "Misi Algoritma",
    ],
    activeStepClass: "bg-secondary-fixed-dim",
  },
  {
    slug: "kelas-4",
    badge: "Kelas 4 SD",
    badgeClass: "bg-primary-fixed text-on-primary-fixed-variant",
    stage: "Tahap: Blok Interaktif",
    icon: "extension",
    iconBox: "bg-primary-fixed/40 text-primary",
    title: "Block Coding",
    description:
      "Menyusun instruksi visual seperti menyusun puzzle balok. Menguasai perulangan (loop) dan penanganan eror (debugging).",
    modules: [
      "Kenalan dengan Blok",
      "Susun Program",
      "Perulangan",
      "Kondisi",
      "Debugging",
    ],
    activeStepClass: "bg-primary-fixed-dim",
  },
  {
    slug: "kelas-5",
    badge: "Kelas 5 SD",
    badgeClass: "bg-surface-container-highest text-on-surface",
    stage: "Tahap: Logika Kompleks",
    icon: "data_object",
    iconBox: "bg-surface-container-highest text-on-surface-variant",
    title: "Coding & Problem Solving",
    description:
      "Menyimpan data dengan variabel, membuat fungsi buatan sendiri, dan memecahkan teka-teki bertingkat.",
    modules: [
      "Loop Kompleks",
      "Kondisi Bersarang",
      "Variabel",
      "Function",
      "Coding Mission",
    ],
    activeStepClass: "",
  },
  {
    slug: "kelas-6",
    badge: "Kelas 6 SD",
    badgeClass: "bg-tertiary-fixed text-on-tertiary-fixed",
    stage: "Tahap: Proyek Mandiri",
    icon: "military_tech",
    iconBox: "bg-tertiary-fixed/40 text-tertiary",
    title: "Coding Challenge",
    description:
      "Menggabungkan seluruh keterampilan logika, fungsi, dan variabel untuk membangun game interaktif mini.",
    modules: [
      "Combine Logic",
      "Logic Master",
      "Variable & Function",
      "Debug Master",
      "Final Mission",
    ],
    activeStepClass: "",
  },
];

export default function PilihKelasPage() {
  return (
    <>
      <main className="w-full pt-20 bg-background min-h-[calc(100vh-5rem)]">
        <div className="relative w-full overflow-hidden px-margin-mobile md:px-margin py-space-xl">
          <div className="absolute -top-24 -left-20 w-80 h-80 rounded-full bg-primary-fixed/30 blur-3xl pointer-events-none" />
          <div className="absolute top-1/2 -right-24 w-96 h-96 rounded-full bg-secondary-fixed/25 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 left-1/3 w-72 h-72 rounded-full bg-tertiary-fixed/30 blur-3xl pointer-events-none" />
          <div
            className="relative max-w-7xl mx-auto flex flex-col gap-space-xl"
            data-reveal
          >
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md">
              <div className="flex flex-col gap-space-xs max-w-2xl">
                <div className="inline-flex items-center gap-space-xs bg-surface-container px-space-md py-space-xs rounded-full w-fit shadow-sm">
                  <span className="material-symbols-outlined text-primary text-[18px]">
                    explore
                  </span>
                  <span className="font-label-badge text-label-badge text-primary uppercase tracking-wide">
                    Peta Kurikulum Komputasi SD
                  </span>
                </div>
                <h1 className="font-display text-display-mobile md:text-display text-on-surface tracking-tight leading-tight">
                  Pilih Kelas Kamu
                </h1>
                <p className="font-body-lg text-body-lg text-on-surface-variant">
                  Mulai petualangan koding sesuai jenjangmu. Belajar langkah
                  demi langkah dari pengenalan logika dasar hingga pembuatan
                  proyek program interaktif!
                </p>
              </div>
            </div>

            <div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter"
              data-reveal
            >
              {classes.map((item) => (
                <div
                  key={item.badge}
                  className="group relative flex flex-col justify-between bg-surface-container-lowest rounded-[28px] p-space-lg shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200"
                >
                  <div className="flex flex-col gap-space-md">
                    <div className="flex items-start justify-between">
                      <div className="flex flex-col gap-space-xs">
                        <span
                          className={`inline-flex items-center px-space-md py-space-xs rounded-full font-label-badge text-label-badge font-bold ${item.badgeClass}`}
                        >
                          {item.badge}
                        </span>
                        <span className="font-label-code text-label-code text-outline">
                          {item.stage}
                        </span>
                      </div>
                      <div
                        className={`w-14 h-14 rounded-2xl flex items-center justify-center ${item.iconBox}`}
                      >
                        <span className="material-symbols-outlined text-[32px]">
                          {item.icon}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-space-xs">
                      <h2 className="font-headline-md text-headline-md text-on-surface">
                        {item.title}
                      </h2>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        {item.description}
                      </p>
                    </div>

                    <div className="flex flex-col gap-space-xs">
                      <span className="font-label-badge text-label-badge text-outline uppercase tracking-wider">
                        5 Modul Pembelajaran
                      </span>
                      <div className="flex flex-wrap gap-space-xs">
                        {item.modules.map((modul) => (
                          <span
                            key={modul}
                            className="bg-surface-container-low text-on-surface-variant font-body-sm text-body-sm px-space-sm py-space-xs rounded-lg"
                          >
                            {modul}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-space-xs">
                      <div className="flex items-center gap-1.5">
                        {[1, 2, 3, 4, 5].map((level) => (
                          <div
                            key={level}
                            className={`w-7 h-2 rounded-full ${
                              level === 1 && item.activeStepClass
                                ? item.activeStepClass
                                : "bg-surface-container"
                            }`}
                            title={`Level ${level}`}
                          />
                        ))}
                      </div>
                      <span className="font-label-code text-label-code text-outline">
                        5 Level
                      </span>
                    </div>
                  </div>

                  <div className="pt-space-lg">
                    <Link
                      className="w-full flex items-center justify-center gap-space-xs min-h-11 py-space-sm px-space-md rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-headline-sm text-headline-sm transition-colors active:translate-y-0.5"
                      href={`/peta-petualangan/${item.slug}`}
                    >
                      <span>Buka Materi</span>
                      <span className="material-symbols-outlined text-[20px]">
                        arrow_forward
                      </span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            <div
              className="w-full bg-surface-container-low rounded-3xl p-space-lg flex flex-col md:flex-row items-center justify-between gap-space-md"
              data-reveal
            >
              <div className="flex items-center gap-space-md">
                <div className="w-12 h-12 rounded-2xl bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[26px]">
                    psychology
                  </span>
                </div>
                <div className="flex flex-col">
                  <h3 className="font-headline-sm text-headline-sm text-on-surface">
                    Bebas Bereksplorasi Tanpa Takut Salah
                  </h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Kamu bisa berpindah kelas kapan saja untuk mengulang materi
                    atau mencoba tantangan baru. Setiap modul dirancang mandiri!
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-space-sm shrink-0">
                <span className="inline-flex items-center gap-1 text-on-surface-variant font-label-badge text-label-badge bg-surface-container px-space-md py-space-xs rounded-full">
                  <span className="material-symbols-outlined text-secondary text-[16px]">
                    check_circle
                  </span>
                  Kurikulum Terbimbing
                </span>
                <span className="inline-flex items-center gap-1 text-on-surface-variant font-label-badge text-label-badge bg-surface-container px-space-md py-space-xs rounded-full">
                  <span className="material-symbols-outlined text-primary text-[16px]">
                    lock_reset
                  </span>
                  Akses Terbuka
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
