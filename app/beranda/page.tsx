import type { Metadata } from "next";
import Link from "next/link";
import HeroSection from "./HeroSection";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Beranda - CoFun",
};

const features = [
  {
    icon: "psychology_alt",
    iconBox: "bg-secondary-fixed text-on-secondary-fixed shadow-[0_3px_0_0_#005236]",
    title: "Salah, Coba, Berhasil!",
    description:
      "Belajar problem solving tanpa rasa takut salah. Gagal adalah petunjuk untuk menemukan solusi baru yang lebih pintar!",
    tag: "Trial & Error Mindset",
    tagColor: "text-secondary",
  },
  {
    icon: "extension",
    iconBox: "bg-primary-fixed text-on-primary-fixed-variant shadow-[0_3px_0_0_#004b73]",
    title: "Visual Block Coding",
    description:
      "Susun blok instruksi semudah menyusun balok mainan. Cukup drag-and-drop tanpa khawatir salah ketik sintaks kode.",
    tag: "Bebas Syntax Error",
    tagColor: "text-primary",
  },
  {
    icon: "smart_toy",
    iconBox: "bg-tertiary-fixed text-on-tertiary-fixed shadow-[0_3px_0_0_#a36700]",
    title: "Robot Teman Belajar",
    description:
      "Lihat robotmu bergerak nyata mengikuti setiap baris kodemu. Setiap instruksi memberikan hasil langsung di layar!",
    tag: "Visualisasi Nyata",
    tagColor: "text-tertiary",
  },
  {
    icon: "auto_graph",
    iconBox: "bg-surface-container-highest text-primary shadow-[0_3px_0_0_#bfc7d2]",
    title: "6 Kelas Bertingkat",
    description:
      "Dari logika pola dasar kelas 1 hingga tantangan seru kelas 6. Dirancang bertahap sesuai usia perkembangan anak.",
    tag: "Progresif & Terarah",
    tagColor: "text-on-surface",
  },
];

const classes = [
  {
    badge: "K1",
    badgeBox: "bg-secondary-fixed text-on-secondary-fixed shadow-[0_3px_0_0_#005236]",
    chip: "bg-secondary-container text-on-secondary-container",
    game: "Bantu Si Kancil",
    title: "Kelas 1: Pondasi Logika",
    description:
      "Urutan langkah (sequence), arah mata angin, serta pemecahan masalah pemula melalui rute cerita kancil.",
    linkColor: "text-secondary",
  },
  {
    badge: "K2",
    badgeBox: "bg-primary-fixed text-on-primary-fixed-variant shadow-[0_3px_0_0_#004b73]",
    chip: "bg-primary-fixed text-on-primary-fixed-variant",
    game: "Kebun Wortel",
    title: "Kelas 2: Pola & Perulangan",
    description:
      "Pengenalan pola (pattern), loop 2x–4x, dan navigasi tanpa tabrakan saat memanen wortel di kebun.",
    linkColor: "text-primary",
  },
  {
    badge: "K3",
    badgeBox: "bg-tertiary-fixed text-on-tertiary-fixed shadow-[0_3px_0_0_#a36700]",
    chip: "bg-tertiary-fixed text-on-tertiary-fixed",
    game: "Bintang Angkasa",
    title: "Kelas 3: Loop & Counter",
    description:
      "Perulangan bertingkat (nested loops), penghitungan skor, dan aksi bersyarat untuk misi antariksa.",
    linkColor: "text-tertiary",
  },
  {
    badge: "K4",
    badgeBox: "bg-surface-container-highest text-primary shadow-[0_3px_0_0_#bfc7d2]",
    chip: "bg-surface-container-highest text-primary",
    game: "Labirin Kristal",
    title: "Kelas 4: Percabangan IF / ELSE",
    description:
      "Kondisi bersyarat (IF-THEN-ELSE), sensor halangan cerdas, dan keputusan logis menjelajahi labirin.",
    linkColor: "text-primary",
  },
  {
    badge: "K5",
    badgeBox: "bg-secondary-fixed text-on-secondary-fixed shadow-[0_3px_0_0_#005236]",
    chip: "bg-secondary-container text-on-secondary-container",
    game: "Pabrik Kue Otomatis",
    title: "Kelas 5: Fungsi & Prosedur",
    description:
      "Sub-rutin fungsi berulang, dekomposisi masalah rumit, serta efisiensi blok instruksi robot koki.",
    linkColor: "text-secondary",
  },
  {
    badge: "K6",
    badgeBox: "bg-primary-fixed text-on-primary-fixed-variant shadow-[0_3px_0_0_#004b73]",
    chip: "bg-primary-fixed text-on-primary-fixed-variant",
    game: "Rover Mars",
    title: "Kelas 6: Variabel & Algoritma",
    description:
      "Variabel dinamis skor & energi, event-driven coding, serta perancangan logika game utuh.",
    linkColor: "text-primary",
  },
];

const steps = [
  {
    number: "1",
    numberBox:
      "bg-primary text-on-primary shadow-[0_3px_0_0_#004b73]",
    title: "Pilih Misi Petualangan",
    description:
      "Setiap level memiliki cerita seru, seperti membantu robot mengumpulkan buah atau melewati labirin kristal.",
  },
  {
    number: "2",
    numberBox:
      "bg-tertiary text-on-tertiary shadow-[0_3px_0_0_#653e00]",
    title: "Rancang Strategi dengan Blok",
    description:
      "Gunakan logika urutan (sequence) dan perulangan (loops) untuk menyusun rute langkah tercepat robot.",
  },
  {
    number: "3",
    numberBox:
      "bg-secondary text-on-secondary shadow-[0_3px_0_0_#005236]",
    title: "Nyalakan & Rayakan Kemenangan!",
    description:
      'Tekan tombol "Jalankan", tonton robot bergerak dan menari gembira saat mencapai garis akhir dan raih bintang!',
  },
];

export default function BerandaPage() {
  return (
    <>
      <main className="w-full pt-20 bg-background min-h-[calc(100vh-5rem)]">
        <div className="flex flex-col w-full">
          <HeroSection />
          <section
            className="w-full px-margin-mobile md:px-margin py-space-xl bg-surface-container-low/50"
            id="tentang"
          >
            <div
              className="max-w-7xl mx-auto flex flex-col gap-space-xl"
              data-reveal
            >
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md">
                <div className="flex flex-col gap-space-xs max-w-2xl">
                  <div className="inline-flex items-center gap-1 font-label-badge text-label-badge text-primary uppercase font-bold tracking-wider">
                    <span className="material-symbols-outlined text-[16px]">
                      school
                    </span>{" "}
                    Mengapa Belajar di CoFun?
                  </div>
                  <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">
                    Fondasi Berpikir Kritis Lewat Permainan Seru
                  </h2>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-lg">
                {features.map((feature) => (
                  <div
                    key={feature.title}
                    className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm hover:shadow-md hover:-translate-y-1 transition-all flex flex-col justify-between gap-space-md group"
                  >
                    <div className="flex flex-col gap-space-md">
                      <div
                        className={`w-14 h-14 rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform ${feature.iconBox}`}
                      >
                        <span
                          className="material-symbols-outlined text-[28px]"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          {feature.icon}
                        </span>
                      </div>
                      <div className="flex flex-col gap-space-xs">
                        <h3 className="font-headline-sm text-headline-sm text-on-surface">
                          {feature.title}
                        </h3>
                        <p className="font-body-md text-body-md text-on-surface-variant">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                    <div
                      className={`flex items-center gap-1 font-label-code text-label-code ${feature.tagColor}`}
                    >
                      <span>{feature.tag}</span>
                      <span className="material-symbols-outlined text-[16px]">
                        arrow_forward
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
          <section className="w-full px-margin-mobile md:px-margin py-space-xl bg-background" id="materi">
            <div
              className="max-w-7xl mx-auto flex flex-col gap-space-xl"
              data-reveal
            >
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md">
                <div className="flex flex-col gap-space-xs max-w-2xl">
                  <div className="inline-flex items-center gap-1 font-label-badge text-label-badge text-primary uppercase font-bold tracking-wider">
                    <span className="material-symbols-outlined text-[16px]">
                      map
                    </span>{" "}
                    Kurikulum Berbasis Tantangan Seru
                  </div>
                  <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">
                    Jelajahi Jalur Belajar & Game Tiap Kelas
                  </h2>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-lg">
                {classes.map((item) => (
                  <div
                    key={item.badge}
                    className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm hover:shadow-md hover:-translate-y-1 transition-all flex flex-col justify-between gap-space-md group border border-outline-variant/30"
                  >
                    <div className="flex flex-col gap-space-md">
                      <div className="flex items-center justify-between">
                        <div
                          className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-[16px] group-hover:scale-105 transition-transform ${item.badgeBox}`}
                        >
                          {item.badge}
                        </div>
                        <span
                          className={`font-label-badge text-label-badge px-2.5 py-1 rounded-full font-bold ${item.chip}`}
                        >
                          🎮 {item.game}
                        </span>
                      </div>
                      <div className="flex flex-col gap-space-xs">
                        <h3 className="font-headline-sm text-headline-sm text-on-surface">
                          {item.title}
                        </h3>
                        <p className="font-body-md text-body-md text-on-surface-variant">
                          {item.description}
                        </p>
                      </div>
                    </div>
                    <Link
                      className={`flex items-center gap-1 font-label-code text-label-code group-hover:translate-x-1 transition-transform ${item.linkColor}`}
                      href="/pilih-kelas"
                    >
                      <span>Lihat Materi & Game</span>
                      <span className="material-symbols-outlined text-[16px]">
                        arrow_forward
                      </span>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </section>
          <section
            className="w-full px-margin-mobile md:px-margin py-space-xl bg-surface-container-low/50"
            id="cara-belajar"
          >
              <div
                className="max-w-7xl mx-auto flex flex-col gap-space-lg"
                data-reveal
              >
              <div className="flex flex-col gap-space-xs">
                <div className="inline-flex items-center gap-1 font-label-badge text-label-badge text-tertiary uppercase font-bold tracking-wider">
                  <span className="material-symbols-outlined text-[16px]">
                    stars
                  </span>{" "}
                  3 Langkah Asyik
                </div>
                <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">
                  Bagaimana Cara Anak Belajar di CoFun?
                </h2>
                <p className="font-body-md text-body-md text-on-surface-variant max-w-xl">
                  Metode bertahap yang membimbing anak memecahkan teka-teki
                  logika dengan menyenangkan dan penuh percaya diri.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg">
                {steps.map((step) => (
                  <div
                    key={step.number}
                    className="flex flex-col gap-space-md bg-surface-container-lowest p-space-lg rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all border border-outline-variant/30"
                  >
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 font-headline-sm text-headline-sm ${step.numberBox}`}
                    >
                      {step.number}
                    </div>
                    <div className="flex flex-col gap-space-xs">
                      <h4 className="font-headline-sm text-body-lg font-bold text-on-surface">
                        {step.title}
                      </h4>
                      <p className="font-body-md text-body-md text-on-surface-variant">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
        <section
          className="w-full px-margin-mobile md:px-margin py-space-xl bg-background mb-space-xl"
          id="cta-banner"
        >
          <div
            className="max-w-7xl mx-auto bg-gradient-to-r from-primary to-primary-container text-on-primary rounded-2xl p-space-lg lg:p-space-xl shadow-lg relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-space-lg"
            data-reveal
          >
            <div className="absolute -left-10 -bottom-10 opacity-10">
              <svg
                fill="currentColor"
                height="240"
                viewBox="0 0 100 100"
                width="240"
              >
                <circle cx="50" cy="50" r="40" />
              </svg>
            </div>
            <div className="flex flex-col gap-space-xs text-center md:text-left z-10 max-w-xl">
              <div className="inline-flex items-center justify-center md:justify-start gap-2 text-secondary-fixed font-label-badge text-label-badge uppercase font-bold tracking-wider">
                <span className="material-symbols-outlined text-[20px]">
                  sports_esports
                </span>{" "}
                Dunia Coding Tanpa Batas
              </div>
              <h2 className="font-display text-headline-lg-mobile md:text-headline-lg lg:text-display text-on-primary tracking-tight">
                30 Level Menantang Siap Dimainkan!
              </h2>
              <p className="font-body-md text-body-md text-primary-fixed">
                Mulai dari teka-teki pemanasan hingga proyek mini interaktif.
                Semuanya dirancang tanpa biaya untuk pelajar sekolah dasar.
              </p>
            </div>
            <div className="z-10 flex flex-col sm:flex-row items-center gap-space-md shrink-0">
              <Link
                className="w-full sm:w-auto bg-secondary-fixed hover:bg-secondary text-on-secondary-fixed hover:text-on-secondary font-headline-sm text-headline-sm px-space-xl py-3 rounded-full shadow-[0_4px_0_0_#005236] active:translate-y-1 active:shadow-[0_1px_0_0_#005236] transition-all flex items-center justify-center gap-2 cursor-pointer"
                href="/pilih-kelas"
              >
                <span className="material-symbols-outlined text-[24px]">
                  play_arrow
                </span>
                <span>Buka Peta Level</span>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
