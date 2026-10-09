# CoFun — Coding Fun

Media pembelajaran interaktif berbasis game puzzle untuk memperkenalkan logika pemrograman dan *computational thinking* kepada siswa SD Kelas 1–6.

> *"Bukan sekadar editor kode, melainkan puzzle permainan logika."*

Anak-anak tidak mengetik sintaks, melainkan menyusun kepingan puzzle magnetik untuk memandu robot menuntaskan misi. Prinsip utama: **Salah → Coba → Perbaiki → Berhasil**.

## Tech Stack

- [Next.js 16](https://nextjs.org/) (App Router, Turbopack)
- [React 19](https://react.dev/) + [TypeScript 5](https://www.typescriptlang.org/)
- [Tailwind CSS 4](https://tailwindcss.com/) dengan design token kustom
- Font: Plus Jakarta Sans & Space Grotesk (`next/font`), Material Symbols (ikon)

## Getting Started

```bash
npm install
npm run dev
```

Perintah lain:

```bash
npm run build   # production build
npm run start   # jalankan production server
npm run lint    # eslint
```

## Rute

| URL | Halaman | Status |
|---|---|---|
| `/` | Redirect ke `/beranda` | Selesai |
| `/beranda` | Beranda (hero interaktif, fondasi, peta kelas K1–K6, alur 3 langkah) | Selesai |
| `/pilih-kelas` | Katalog kartu kelas 1–6 + infobar pedagogis | Selesai |
| `/peta-petualangan` | Redirect ke `/peta-petualangan/kelas-4` | Selesai |
| `/peta-petualangan/kelas-1` … `kelas-6` | Peta level per kelas (data dari `lib/curriculum.ts`) | Selesai |
| `/belajar-dan-tantangan` | Arena: simulator labirin, kotak perintah, papan puzzle | Selesai (UI + demo eksekusi) |

## Navigasi

- **Menu lengkap hanya di `/beranda`:** logo · **Home · Tentang · Materi · Cara Belajar · Kontak** (anchor ke seksi beranda) · tombol CTA **Mulai Bermain** → `/pilih-kelas`.
- Di HP, menu beranda berbentuk **hamburger** yang membuka panel dropdown (isi sama + CTA).
- **Halaman lain** (`/pilih-kelas`, `/peta-petualangan/*`, `/belajar-dan-tantangan`): **hanya logo** (klik → beranda), tanpa menu & tanpa CTA. Navigasi antar halaman lewat konten: kartu *Buka Materi*, breadcrumb *Pilih Kelas*, chip *← Peta Petualangan* di arena, tombol aksi drawer peta.
- CTA beranda: *Mulai Belajar Sekarang*, *Lihat Petualangan*, dan *Buka Peta Level* → `/pilih-kelas`; kartu *Lihat Materi & Game* → `/pilih-kelas`.
- Badge **Made by: RPL Student** berada di footer (semua halaman).

## Konten Kelas

Semua data peta (judul, pulau, level, teks materi, keahlian) ada di `lib/curriculum.ts`
dalam bentuk objek serializable — siap dipindah ke database nanti tanpa mengubah UI.

- **Nama & urutan level = chip modul di kartu Pilih Kelas** (mis. K1: *Kenali Pola → Kelompokkan → Kenali Arah → Ikuti Instruksi → Misi Pertama*).
- Helper terhitung otomatis: status node (selesai/aktif/terkunci), progress %, "Level x dari 5", kode level (`K4-MOD-01`), dan label tombol aksi.
- **Kelas 4 mendalam** (level aktif: 1; terhubung ke Arena):
  - Level aktif/selesai → tombol **"Buka Materi & Challenge"** → `/belajar-dan-tantangan`.
  - Level terkunci → tombol nonaktif **"Selesaikan Level Sebelumnya"**.
- **Kelas lain** → tombol nonaktif **"Arena Segera Hadir"** (peta & teks materi tetap lengkap).

## Fitur Interaktif

- **Peta Petualangan:** klik node level → drawer kanan berganti (badge, judul, konsep, keahlian, tombol aksi) dengan animasi fade.
- **Arena (`/belajar-dan-tantangan`):**
  - Tab *Pelajari Materi* membuka/menutup drawer "Inti Pelajaran Hari Ini".
  - Klik balok di Kotak Perintah → toast notifikasi; tombol 🔍 *Cek Logika* memberi umpan balik positif; 🔄 *Reset* mengembalikan robot; ▶ *Jalankan Robot!* menjalankan demo langkah berurutan — balok aktif menyala (`puzzle-exec-active`) dan robot bergerak di labirin sampai modal sukses *+80 XP*.
  - Modal *Bantuan* (petunjuk guru) & *Sukses* dengan tombol Ulangi/Lanjut.
  - Toggle *Buka Kotak Perintah Puzzle* untuk layar kecil.

## Mobile & Responsif

- Padding horizontal responsif `1rem → 2rem` di semua halaman; judul memakai skala `display-mobile` / `headline-lg-mobile` di HP.
- Navbar HP: logo mengecil, hamburger 44px, panel menu `max-h-[70vh]`.
- Target sentuh minimum 44px (tombol aksi, toolbar papan puzzle, kartu kelas, drawer peta); `touch-action: manipulation` agar ketukan responsif.
- **Labirin 5×5:** posisi & ukuran robot dihitung dari % sel (`calc((100% - 24px)/5)`) sehingga selalu presisi di layar 320px sekalipun.
- **Peta:** node memakai koordinat persentase + SVG jalur `preserveAspectRatio="none"`, tinggi kanvas menyesuaikan (`480/560/620px`), chip "Geser peta ke samping…" muncul hanya di HP.
- Animasi: *scroll reveal* (IntersectionObserver, elemen `data-reveal`), fade drawer peta, slide-down menu HP, hover angkat kartu — semua menghormati `prefers-reduced-motion`.

## Struktur Proyek

```
cofun/
├── app/
│   ├── layout.tsx            # Root layout: font, metadata, Navbar, Reveal
│   ├── globals.css           # Design token (@theme) + utilitas puzzle & animasi
│   ├── page.tsx              # Redirect ke /beranda
│   ├── icon.png              # Favicon (otomatis diload Next.js)
│   ├── beranda/
│   │   ├── page.tsx          # Seksi statis halaman beranda
│   │   └── HeroSection.tsx   # Hero + animasi robot (client component)
│   ├── pilih-kelas/
│   │   └── page.tsx          # 6 kartu kelas + infobar
│   ├── peta-petualangan/
│   │   ├── page.tsx          # Redirect ke kelas-4
│   │   ├── [kelas]/page.tsx  # Peta per kelas (generateStaticParams 6 slug)
│   │   └── MapExplorer.tsx   # Peta level + drawer detail (client component)
│   └── belajar-dan-tantangan/
│       ├── page.tsx          # Shell halaman arena
│       └── Arena.tsx         # 3 kolom gameplay + modal + state (client component)
├── components/
│   ├── Navbar.tsx            # Navigasi 2 varian (menu beranda / logo saja)
│   ├── Footer.tsx            # Footer bersama + badge RPL Student
│   └── Reveal.tsx            # Scroll-reveal observer (data-reveal)
├── lib/
│   ├── assets.ts             # Konstanta aset (path logo)
│   └── curriculum.ts         # Data 6 kelas, level, materi (siap pindah DB)
├── public/
│   └── images/logo.png       # Logo CoFun
├── stitch/                   # Referensi desain dari Stitch (bukan bagian build)
│   ├── htmlcode/             # HTML asli tiap layar
│   └── imgreferences/        # Screenshot tiap layar
├── design.md                 # Design system (token warna, tipografi, spacing)
└── PRD.md                    # Product Requirements Document
```

## Design System

Token dibangun di `app/globals.css` (`@theme`) dan bersumber dari `design.md`:

- **Warna:** palet Material-3 — primary `#006194`, container `#007bb9`, surface `#f9f9ff`, sekunder `#006c49`, tersier `#825100`, error `#ba1a1a`
- **Tipografi:** skala `display` hingga `label-badge` (+ varian `-mobile`); blok kode memakai Space Grotesk (`label-code`)
- **Spacing:** token kustom `margin`/`margin-mobile`, `gutter`, `space-xs` … `space-xl`
- **Gaya:** tombol taktil dengan efek ekstrusi bawah, sudut membulat, target sentuh minimum 44px
- **Utilitas khusus:** `.bg-grid-dots`, `.puzzle-male-tab`, `.puzzle-female-slot`, `.puzzle-exec-active`, `.reveal`, `.animate-fade-in`, `.animate-slide-down`

## Sumber Desain

- Proyek Stitch: **CoFun UI/UX Prototype**
- Layar yang dikonversi: Beranda, Pilih Kelas, Peta Petualangan, Arena Belajar & Tantangan
- File HTML + screenshot asli tersimpan di `stitch/` sebagai referensi

## Roadmap Selanjutnya

- [ ] Drag & drop blok dari Kotak Perintah ke papan puzzle + parser eksekusi nyata (bukan demo tetap)
- [ ] Konten arena (labirin & soal) untuk kelas selain Kelas 4
- [ ] Pindahkan `lib/curriculum.ts` ke database bila konten perlu diperbarui tanpa deploy
- [ ] Efek suara & narasi ramah anak (Fase 4 di PRD)

## Catatan

- Logo (`public/images/logo.png`) dirujuk lewat `lib/assets.ts`; favicon di `app/icon.png`.
- Tanpa login — akses terbuka untuk siswa, guru, dan orang tua.

Made by: RPL Student
