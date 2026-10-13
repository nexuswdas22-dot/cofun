# CoFun — Coding Fun

Media pembelajaran interaktif berbasis game puzzle untuk memperkenalkan logika pemrograman dan *computational thinking* kepada siswa SD kelas 1–6.

> *"Bukan sekadar editor kode, melainkan puzzle permainan logika."*

Siswa tidak mengetik sintaks. Mereka menyusun balok koding (Blockly) untuk memandu robot menyelesaikan misi di labirin. Prinsip utama: **Salah → Coba → Perbaiki → Berhasil**.

## Apa Itu CoFun?

- **Peta petualangan per kelas**: 6 kelas SD, masing-masing 5 level, dengan tema game berbeda (mis. kelas 4 *Labirin Kristal* tentang percabangan IF/ELSE).
- **Arena belajar**: simulator labirin 5×5 di satu sisi, papan Blockly di sisi lain. Blok yang disusun siswa dijalankan oleh simulator robot langkah demi langkah.
- **Soal kuis**: soal pilihan ganda dan urutan kartu dengan ilustrasi SVG.
- **Tanpa login**: akses terbuka untuk siswa, guru, dan orang tua. Progres hanya tersimpan di perangkat (localStorage).
- **Ramah HP**: tata letak responsif dan target sentuh minimum 44px (lihat PRD §6.2).

Konsep kurikulum per kelas ada di [PRD.md](./PRD.md).

## Teknologi

- [Next.js 16](https://nextjs.org/) (App Router, Turbopack) + [React 19](https://react.dev/) + TypeScript 5
- [Tailwind CSS 4](https://tailwindcss.com/) dengan design token kustom (`app/globals.css`)
- [Blockly 13](https://developers.google.com/blockly) (renderer Zelos, blok kustom CoFun)
- [SQLite](https://www.sqlite.org/) lewat `better-sqlite3`, di-seed dari file JSON
- Font: Plus Jakarta Sans & Space Grotesk (`next/font`), Material Symbols

## Persyaratan

- **Node.js 20 atau lebih baru** (disarankan LTS terbaru)
- **npm** (ikut terpasang bersama Node.js)
- Build tools C++ untuk `better-sqlite3` **hanya jika** tidak ada prebuilt binary untuk platform kamu:
  - Windows: `npm install --global windows-build-tools` atau Visual Studio Build Tools (opsi "Desktop development with C++")
  - macOS: `xcode-select --install`
  - Linux: `sudo apt install build-essential python3`

## Instalasi

```bash
# 1. Masuk ke folder proyek
cd cofun

# 2. Pasang dependensi
npm install

# 3. Jalankan mode pengembangan
npm run dev
```

`npm run dev` otomatis menjalankan seed (membuat/mengisi `data/cofun.db` dari `data/kelas-*.json`), lalu menyalakan dev server.

### Engine Blockly

Blockly **tidak perlu diinstal terpisah**. Ia sudah terdaftar sebagai dependency di `package.json` (`"blockly": "^13.3.0"`) dan ikut terpasang saat `npm install`.

- Untuk mengubah kode blok, toolbox, theme, atau logika papan, cukup edit file di `lib/blockly/` dan `components/blockly/BlocklyArena.tsx`, lalu jalankan `npm run dev`. Tidak perlu install ulang.
- Jika ingin mengganti versi Blockly: `npm install blockly@<versi>`, lalu uji ulang arena (terutama seret blok di HP), karena `BlocklyArena.tsx` memakai API internal `Blockly.Touch.*` yang dapat berubah antarversi.

Buka **http://localhost:3000** di browser. Halaman awal akan mengarahkan ke `/beranda`.

### Mencoba di HP (satu jaringan Wi-Fi)

```bash
npx next dev -H 0.0.0.0
```

Lalu buka `http://<IP-komputer>:3000` dari HP. Cari IP komputer dengan `ipconfig` (Windows) atau `ifconfig` / `ip addr` (macOS/Linux).

## Perintah Lain

| Perintah | Fungsi |
|---|---|
| `npm run seed` | Sinkronkan `data/*.json` ke `data/cofun.db` (idempotent) |
| `npm run build` | Seed otomatis (`prebuild`), lalu production build |
| `npm run start` | Jalankan hasil build (butuh `npm run build` dulu) |
| `npm run lint` | Jalankan ESLint |

Untuk produksi:

```bash
npm run build
npm run start
```

## Rute

| URL | Halaman |
|---|---|
| `/` | Redirect ke `/beranda` |
| `/beranda` | Beranda: hero, fondasi, peta kelas 1–6, alur 3 langkah |
| `/pilih-kelas` | Katalog kartu kelas 1–6 |
| `/peta-petualangan` | Redirect ke `/peta-petualangan/kelas-4` |
| `/peta-petualangan/kelas-1` … `kelas-6` | Peta level per kelas |
| `/belajar-dan-tantangan/[kelas]/[level]` | Arena level (Blockly atau kuis) |
| `/tanya-jawab` | Tanya-jawab |

## Struktur Proyek

```
cofun/
├── app/                      # Rute App Router & layout
│   ├── layout.tsx            # Font, metadata, Navbar, Reveal
│   ├── globals.css           # Design token (@theme) + gaya Blockly & sentuh HP
│   ├── beranda/              # Halaman beranda
│   ├── pilih-kelas/          # Katalog kelas
│   ├── peta-petualangan/     # Peta level per kelas
│   ├── belajar-dan-tantangan/
│   │   ├── Arena.tsx         # Arena Blockly (simulator + papan)
│   │   └── KuisArena.tsx     # Arena kuis
│   └── tanya-jawab/
├── components/
│   ├── blockly/BlocklyArena.tsx  # Inject workspace Blockly (client-only)
│   ├── quiz/KuisVisual.tsx       # Ilustrasi SVG soal kuis
│   └── Navbar.tsx / Footer.tsx / Reveal.tsx
├── lib/
│   ├── types.ts              # Tipe & helper murni
│   ├── db.ts                 # Akses SQLite (server-only)
│   ├── db/schema.sql         # Skema: kelas → levels → challenges
│   ├── progress.ts           # Progres siswa (localStorage)
│   └── blockly/              # Blok, theme, toolbox, simulator
├── data/
│   └── kelas-1.json … kelas-6.json   # Sumber data kelas & soal
├── scripts/seed.ts           # JSON → SQLite
├── design.md                 # Design system
├── PRD.md                    # Product Requirements Document
└── README.md
```

## Menambah atau Mengubah Soal

Soal ada di `data/kelas-*.json`. Tambahkan objek di `challenges` pada level mana pun, lalu jalankan:

```bash
npm run seed
```

Contoh soal arena (blockly):

```json
{
  "urutan": 1,
  "title": "Misi: Pandu CoFun Melewati Batu Karang!",
  "brief": "Gunakan blok JIKA untuk memeriksa rintangan di depan robot.",
  "maze": {
    "size": 5,
    "cells": [
      ["empty", "empty", "empty", "empty", "empty"],
      ["start", "path", "rock", "empty", "empty"],
      ["empty", "path", "path", "path", "empty"],
      ["empty", "empty", "empty", "goal", "empty"],
      ["empty", "empty", "empty", "empty", "empty"]
    ],
    "start": { "col": 0, "row": 1, "facing": "timur" }
  },
  "allowedBlocks": ["maju", "belok_kanan", "belok_kiri", "ulangi", "jika_rintangan"],
  "winCondition": { "type": "reach_goal", "maxSteps": 12 },
  "hints": ["Belok kanan dulu untuk turun ke jalur aman, lalu menuju bintang."]
}
```

- `cells`: `"empty"`, `"path"`, `"start"`, `"goal"`, `"rock"`.
- `start.facing`: `"utara" | "timur" | "selatan" | "barat"`.
- `allowedBlocks`: membatasi isi toolbox untuk soal itu.
- `winCondition.maxSteps`: batas langkah; robot menang jika mencapai `goal` dalam batas.

## Catatan Mobile

- Hapus blok: seret blok kembali ke kotak blok di atas papan. Tong sampah dan tombol zoom +/- dihapus dari papan di HP (zoom tetap lewat pinch dan scroll).
- Papan Blockly memakai kelas `.cofun-blockly` dengan `touch-action: none` agar seret blok dan geser papan tidak diambil alih browser.
- Di HP, skala blok 0.8 dan `BlocklyArena.tsx` memasang safety net sentuhan: pointer aktif dilacak, dan `Blockly.Touch.clearTouchIdentifier()` dipanggil setelah semua jari terangkat, supaya papan tidak macet akibat jari kedua (telapak tangan).
- Long-press 750 ms menu konteks Blockly dib  atalkan begitu jari bergerak lebih dari 8 px.
- Catatan: `Blockly.Touch.*` adalah API internal yang ditandai `@internal` di typings Blockly. Periksa ulang saat upgrade Blockly.
- Pengujian sentuh lengkap di perangkat Android/iOS nyata belum selesai; uji di HP sebelum rilis.

## Design System

Token ada di `app/globals.css` (`@theme`) dan bersumber dari `design.md`:

- Warna: primary `#006194`, sekunder `#006c49`, tersier `#825100`, error `#ba1a1a`, surface `#f9f9ff`
- Warna blok: gerakan `#0284c7`, perulangan `#059669`, kondisi `#d97706`
- Target sentuh minimum 44px, sudut membulat, gaya tombol taktil

## Roadmap

- [ ] Soal untuk kelas lain (tambah `challenges` di JSON, tanpa ubah kode)
- [ ] Blok tambahan (variabel, fungsi) untuk kelas 5–6
- [ ] Efek suara dan narasi ramah anak (Fase 4 PRD)
- [ ] Interpreter sandbox agar program bisa diekspor dan dijalankan langkah demi langkah

## Lisensi

Proyek internal / pembelajaran. Belum ada lisensi resmi.

Made by: RPL Student
