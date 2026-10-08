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

Buka [http://localhost:3000](http://localhost:3000) — otomatis di-redirect ke `/beranda`.

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
| `/pilih-kelas` | Katalog kartu kelas 1–6 | Direncanakan |
| `/peta-petualangan` | Peta level misi per kelas | Direncanakan |
| `/belajar-dan-tantangan` | Arena: simulator labirin, kotak perintah, papan puzzle | Direncanakan |

## Struktur Proyek

```
cofun/
├── app/
│   ├── layout.tsx            # Root layout: font, metadata, Navbar
│   ├── globals.css           # Design token (@theme) dari design.md
│   ├── page.tsx              # Redirect ke /beranda
│   ├── icon.png              # Favicon (otomatis diload Next.js)
│   └── beranda/
│       ├── page.tsx          # Seksi statis halaman beranda
│       └── HeroSection.tsx   # Hero + animasi robot (client component)
├── components/
│   └── Navbar.tsx            # Navigasi pill, badge RPL Student
├── lib/
│   └── assets.ts             # Konstanta aset (path logo)
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
- **Tipografi:** skala `display` hingga `label-badge`; blok kode memakai Space Grotesk (`label-code`)
- **Spacing:** token kustom `margin`, `gutter`, `space-xs` … `space-xl`
- **Gaya:** tombol taktil dengan efek ekstrusi bawah, target sentuh minimum 44px

## Sumber Desain

- Proyek Stitch: **CoFun UI/UX Prototype** (`2197497788622805466`)
- Layar yang dikonversi: Beranda, Pilih Kelas, Peta Petualangan, Arena Belajar & Tantangan
- File HTML + screenshot asli tersimpan di `stitch/` sebagai referensi

## Catatan

- Logo (`public/images/logo.png`) dirujuk lewat `lib/assets.ts`; favicon di `app/icon.png`.
- Tanpa login — akses terbuka untuk siswa, guru, dan orang tua.

Made by: RPL Student
