"use client";

// Daftar pertanyaan umum (FAQ) CoFun — gaya accordion, bukan chat.

import Link from "next/link";
import { useState } from "react";

type FaqItem = { q: string; a: string };

const FAQ_GROUPS: { title: string; icon: string; items: FaqItem[] }[] = [
  {
    title: "Mulai Bermain",
    icon: "rocket_launch",
    items: [
      {
        q: "Apakah web ini harus daftar akun?",
        a: "Tidak perlu daftar dan tidak perlu login. Langsung buka websitenya, pilih kelas, lalu mulai bermain. Tidak ada kata sandi yang perlu diingat.",
      },
      {
        q: "Apakah web ini gratis?",
        a: "Ya, gratis. Tidak ada biaya langganan dan tidak ada iklan.",
      },
      {
        q: "Untuk usia berapa web ini?",
        a: "Untuk anak SD kelas 1 sampai kelas 6. Bahasa dan tantangan disesuaikan dengan usia siswa SD.",
      },
      {
        q: "Berapa jumlah soalnya?",
        a: "Ada 30 soal utama: 6 kelas × 5 level. Setiap kelas membahas topik berbeda, dari mengenal logika sampai coding challenge terpadu.",
      },
    ],
  },
  {
    title: "Progres & Penyimpanan",
    icon: "save",
    items: [
      {
        q: "Apakah level yang sudah selesai tersimpan?",
        a: "Hanya selama sesi bermain. Selama tab browser masih terbuka, progres (level selesai) tetap ada. Begitu refresh halaman, tutup tab, atau buka browser baru, semuanya otomatis mulai dari nol.",
      },
      {
        q: "Kenapa setelah refresh papan blok saya kosong lagi?",
        a: "Itu normal dan sesuai desain. Web ini tidak menyimpan apa pun di browser — program yang disusun, progres level, dan riwayat permainan akan hilang saat halaman dimuat ulang.",
      },
      {
        q: "Apakah data saya dikirim ke server?",
        a: "Tidak. Web ini tidak meminta nama, email, atau data pribadi apa pun. Semua yang kamu mainkan hanya berjalan di browser kamu sendiri.",
      },
      {
        q: "Apakah bisa dilanjutkan di HP lain?",
        a: "Karena tidak ada akun dan tidak ada penyimpanan, progres tidak bisa dipindah ke perangkat lain. Di HP mana pun, semua orang selalu mulai dari level 1.",
      },
    ],
  },
  {
    title: "Cara Bermain",
    icon: "sports_esports",
    items: [
      {
        q: "Bagaimana cara memainkan soalnya?",
        a: "Pilih kelas di halaman Pilih Kelas → buka Peta Petualangan → klik level yang aktif → susun blok di papan → tekan Jalankan Robot. Kalau robot sampai bintang, level selesai.",
      },
      {
        q: "Apa itu blok Blockly?",
        a: "Blockly adalah cara menulis perintah tanpa mengetik kode. Kamu menyeret blok (Maju, Belok Kanan, Ulangi, Jika) dan menyambungnya seperti puzzle. Robot menjalankan urutan blokmu.",
      },
      {
        q: "Kalau sudah buntu dan tidak tahu harus ngapain?",
        a: "Tekan tombol Bantuan untuk melihat petunjuk dari guru CoFun, lalu tekan Cek Logika untuk mencoba program tanpa menyelesaikan misi. Tombol Reset mengembalikan robot ke posisi awal; tombol Bersihkan menghapus semua blok dari papan.",
      },
      {
        q: "Kenapa tombol levelnya terkunci?",
        a: "Level berikutnya terbuka setelah level sebelumnya selesai. Selesaikan dulu level yang sedang aktif (berwarna biru) di peta petualangan.",
      },
    ],
  },
  {
    title: "Masalah Teknis",
    icon: "build",
    items: [
      {
        q: "Kenapa robot menabrak atau tidak sampai tujuan?",
        a: "Periksa urutan blok dan arah hadap robot setiap setelah belok. Umumnya kesalahan ada di salah satu blok belok yang kebalik (kanan ↔ kiri) atau langkah yang kurang/kebanyakan.",
      },
      {
        q: "Blok kategori di atas kok tidak bisa diklik/di-scroll?",
        a: "Coba muat ulang halaman (refresh). Kalau masih bermasalah, pastikan browser kamu versi terbaru (Chrome, Edge, Firefox, atau Safari) dan koneksi internet stabil.",
      },
      {
        q: "Apakah bisa dimainkan tanpa internet?",
        a: "Tidak bisa. Web ini dimainkan lewat browser dan butuh koneksi internet, meski ringan.",
      },
      {
        q: "Ada soal yang terasa terlalu sulit, boleh dilewati?",
        a: "Boleh. Karena progres tidak disimpan, kamu bebas pindah kelas atau level kapan saja lewat Peta Petualangan tanpa urutan wajib.",
      },
    ],
  },
];

export default function FAQAccordion() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-space-lg">
      {FAQ_GROUPS.map((group) => (
        <section
          className="bg-surface-container-lowest rounded-xl shadow-md p-space-md lg:p-space-lg flex flex-col gap-space-sm border border-outline-variant/30"
          key={group.title}
        >
          <div className="flex items-center gap-space-sm pb-space-xs border-b border-surface-container-high">
            <div className="w-9 h-9 rounded-lg bg-primary-container text-on-primary flex items-center justify-center shadow-[0_2px_0_0_#004b73] shrink-0">
              <span className="material-symbols-outlined text-[20px]">{group.icon}</span>
            </div>
            <h2 className="font-headline-sm text-headline-sm text-on-surface">{group.title}</h2>
          </div>

          {group.items.map((item) => {
            const id = `${group.title}-${item.q}`;
            const open = openId === id;
            return (
              <div className="flex flex-col" key={id}>
                <button
                  aria-expanded={open}
                  className={`w-full flex items-center justify-between gap-space-sm text-left min-h-11 px-space-md py-space-sm rounded-xl transition-colors ${
                    open
                      ? "bg-primary-fixed text-on-primary-fixed-variant"
                      : "bg-surface-container-low text-on-surface hover:bg-surface-container"
                  }`}
                  onClick={() => setOpenId(open ? null : id)}
                  type="button"
                >
                  <span className="font-body-md text-body-md font-bold">{item.q}</span>
                  <span
                    className={`material-symbols-outlined text-[22px] shrink-0 transition-transform ${
                      open ? "rotate-180 text-primary" : "text-on-surface-variant"
                    }`}
                  >
                    expand_more
                  </span>
                </button>
                {open && (
                  <p className="font-body-md text-body-md text-on-surface-variant px-space-md pt-space-sm pb-space-sm leading-relaxed">
                    {item.a}
                  </p>
                )}
              </div>
            );
          })}
        </section>
      ))}

      <div className="bg-tertiary-fixed/40 rounded-xl p-space-md lg:p-space-lg border border-tertiary-fixed flex flex-col md:flex-row items-center justify-between gap-space-md">
        <div className="flex items-center gap-space-md">
          <div className="w-11 h-11 rounded-full bg-tertiary-container text-on-tertiary-container flex items-center justify-center shrink-0 shadow-[0_3px_0_0_#653e00]">
            <span className="material-symbols-outlined text-[24px]">help</span>
          </div>
          <p className="font-body-md text-body-md text-on-surface">
            Pertanyaanmu belum terjawab? Langsung coba bermain — semua jawabannya paling cepat
            ketahuan sambil praktik.
          </p>
        </div>
        <Link
          className="inline-flex items-center gap-space-xs min-h-11 px-space-lg py-2 rounded-full bg-primary text-on-primary font-label-badge text-label-badge font-bold shadow-[0_3px_0_0_#004b73] hover:brightness-110 shrink-0"
          href="/pilih-kelas"
        >
          Mulai Bermain
          <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
        </Link>
      </div>
    </div>
  );
}
