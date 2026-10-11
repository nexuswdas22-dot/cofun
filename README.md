# CoFun — Coding Fun

Media pembelajaran interaktif berbasis game puzzle untuk memperkenalkan logika pemrograman dan *computational thinking* kepada siswa SD Kelas 1–6.

> *"Bukan sekadar editor kode, melainkan puzzle permainan logika."*

Anak-anak tidak mengetik sintaks, melainkan menyusun balok koding di **Blockly** untuk memandu robot menuntaskan misi. Prinsip utama: **Salah → Coba → Perbaiki → Berhasil**.

## Tech Stack

- [Next.js 16](https://nextjs.org/) (App Router, Turbopack)
- [React 19](https://react.dev/) + [TypeScript 5](https://www.typescriptlang.org/)
- [Tailwind CSS 4](https://tailwindcss.com/) dengan design token kustom
- [Blockly 13](https://developers.google.com/blockly) — engine blok visual (blok kustom CoFun, renderer Zelos)
- [SQLite](https://www.sqlite.org/) via `better-sqlite3` — database soal (read-only, di-seed dari file JSON)
- Font: Plus Jakarta Sans & Space Grotesk (`next/font`), Material Symbols (ikon)

## Cara Menjalankan

```bash
npm install
npm run dev     # otomatis menjalankan seed, lalu dev server
```

Perintah lain:

```bash
npm run seed    # sinkronkan data/*.json ke database SQLite
npm run build   # seed otomatis (prebuild), lalu production build
npm run start   # jalankan production server
npm run lint    # eslint
```

Buka `http://localhost:3000`. Arena butuh minimal satu soal di database; `npm run dev`/`npm run build` selalu men-seed ulang dari `data/*.json` sehingga database tidak pernah kosong.

## Rute

| URL | Halaman | Status |
|---|---|---|
| `/` | Redirect ke `/beranda` | Selesai |
| `/beranda` | Beranda (hero interaktif, fondasi, peta kelas K1–K6, alur 3 langkah) | Selesai |
| `/pilih-kelas` | Katalog kartu kelas 1–6 + infobar pedagogis | Selesai |
| `/peta-petualangan` | Redirect ke `/peta-petualangan/kelas-4` | Selesai |
| `/peta-petualangan/kelas-1` … `kelas-6` | Peta level per kelas (data dari database) | Selesai |
| `/belajar-dan-tantangan` | Arena: papan Blockly + simulator labirin (data soal dari database) | Selesai |

## Navigasi

- **Menu lengkap hanya di `/beranda`:** logo · **Home · Tentang · Materi · Cara Belajar · Kontak** (anchor ke seksi beranda) · tombol CTA **Mulai Bermain** → `/pilih-kelas`.
- Di HP, menu beranda berbentuk **hamburger** yang membuka panel dropdown (isi sama + CTA).
- **Halaman lain** (`/pilih-kelas`, `/peta-petualangan/*`, `/belajar-dan-tantangan`): **hanya logo** (klik → beranda), tanpa menu & tanpa CTA. Navigasi antar halaman lewat konten: kartu *Buka Materi*, breadcrumb *Pilih Kelas*, chip *← Peta Petualangan* di arena, tombol aksi drawer peta.
- Badge **Made by: RPL Student** berada di footer (semua halaman).

## Konten & Database

Seluruh data kelas, level, dan **soal arena** disimpan di database SQLite (`data/cofun.db`, dihasilkan otomatis — file ini tidak perlu di-commit). Sumber datanya adalah **file JSON per kelas** di folder `data/`:

```
data/
├── kelas-1.json … kelas-6.json   # 1 file = "kotak soal" satu kelas
└── cofun.db                      # hasil npm run seed (otomatis, git-ignored)
```

Hierarki di database:

```
kelas (1 kelas SD)
 └── levels (5 level per kelas)
      └── challenges (soal arena: labirin + blok yang diizinkan + kondisi menang)
```

Alurnya: **edit JSON → `npm run seed` → aplikasi membaca database**. Aplikasi **hanya membaca** (tanpa login, tanpa tabel pengguna); karena itu progres siswa bersifat **sesi** — terlihat selama mengerjakan, hilang saat refresh/tutup browser sesuai desain.

### Cara menambah / mengubah soal

Tambahkan objek `challenges` di level mana pun di `data/kelas-*.json`, lalu jalankan `npm run seed`. Contoh isi soal:

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

Keterangan singkat:

- `cells`: `"empty"` (sel koordinat), `"path"` (jalur), `"start"`, `"goal"`, `"rock"` (rintangan).
- `start.facing`: `"utara" | "timur" | "selatan" | "barat"`.
- `allowedBlocks`: membatasi toolbox Blockly untuk soal itu (misal level awal hanya `maju`).
- `winCondition.maxSteps`: batas langkah; robot menang jika mencapai sel `goal` dalam batas itu.
- `levelAktif` (di objek kelas) menentukan node "selesai/aktif/terkunci" di peta — saat ini state tampilan, bukan progres siswa tersimpan.

## Arena & Engine Blockly

Arena (`/belajar-dan-tantangan`) terdiri dari: kolom kiri **simulator labirin** (grid, robot, gelembung ucapan, status) dan kolom kanan **papan Blockly** tempat siswa menyusun blok.

Cara kerja engine:

1. **Blok kustom CoFun** (`lib/blockly/blocks.ts`): `Maju`, `Belok Kanan`, `Belok Kiri`, `ulangi [n]`, dan `JIKA ada batu di depan, MAKA … SELAIN ITU …` (blok berbentuk C). Didefinisikan dengan JSON definition bawaan Blockly, warna mengikuti design system (biru gerakan, hijau perulangan, amber kondisi).
2. **Toolbox dinamis** (`lib/blockly/toolbox.ts`) — kategori & isi kotak blok diambil dari `allowedBlocks` milik soal yang sedang dibuka.
3. **Theme & renderer** (`lib/blockly/theme.ts`) — renderer `zelos` (sudut bulat, ramah anak) + tema warna CoFun.
4. **Simulator** (`lib/blockly/simulate.ts`) — membaca struktur workspace (bukan mengeksekusi kode), menelusuri blok termasuk perulangan & percabangan, lalu menghasilkan rangkaian frame animasi untuk robot. **Tanpa `eval`** sehingga aman untuk konten buatan pengguna.
5. **Integrasi React** (`components/blockly/BlocklyArena.tsx`) — Blockly di-`inject` ke div pada client component (via `next/dynamic` `ssr:false` karena butuh DOM), sorotan blok aktif mengikuti frame yang sedang berjalan.

Saat tombol **Jalankan Robot!** ditekan, simulator menghasilkan frame → animasi robot berjalan di labirin → jika robot mencapai bintang, modal sukses + XP muncul. Semua state hanya di memori (reset saat refresh).

## Fitur Interaktif

- **Peta Petualangan:** klik node level → drawer kanan berganti (badge, judul, konsep, keahlian, tombol aksi) dengan animasi fade.
- **Arena:**
  - Tab *Pelajari Materi* membuka/menutup drawer "Inti Pelajaran Hari Ini".
  - Siswa menyusun blok di papan Blockly, lalu ▶ *Jalankan Robot!* — blok aktif menyala, robot bergerak di labirin sesuai program nyata (bukan timeline tetap).
  - 🔍 *Cek Logika* memvalidasi susunan blok tanpa menjalankannya; 🔄 *Reset* mengembalikan robot; tombol *Bersihkan* menghapus semua blok.
  - Modal *Bantuan* (hints dari soal) & *Sukses* dengan tombol Ulangi/Kembali ke Peta.
- Papan Blockly responsif: toolbox flyout, pinch/scroll zoom, trashcan, target sentuh.

## Mobile & Responsif

- Padding horizontal responsif `1rem → 2rem` di semua halaman; judul memakai skala `display-mobile` / `headline-lg-mobile` di HP.
- Navbar HP: logo mengecil, hamburger 44px, panel menu `max-h-[70vh]`.
- Target sentuh minimum 44px; `touch-action: manipulation` agar ketukan responsif.
- Labirin memakai grid berbasis persentase sehingga presisi di layar 320px sekalipun; peta memakai koordinat persentase + SVG jalur.
- Animasi: scroll reveal, fade drawer peta, slide-down menu HP, hover angkat kartu — semua menghormati `prefers-reduced-motion`.

## Struktur Proyek

```
cofun/
├── app/
│   ├── layout.tsx               # Root layout: font, metadata, Navbar, Reveal
│   ├── globals.css              # Design token (@theme) + utilitas & animasi
│   ├── page.tsx                 # Redirect ke /beranda
│   ├── beranda/                 # Halaman beranda + hero
│   ├── pilih-kelas/             # 6 kartu kelas
│   ├── peta-petualangan/        # Peta per kelas (SSG dari database) + drawer
│   └── belajar-dan-tantangan/
│       ├── page.tsx             # Server component: ambil soal dari DB → Arena
│       └── Arena.tsx            # Layout arena, animasi robot, modal (client)
├── components/
│   ├── blockly/BlocklyArena.tsx # Inject workspace Blockly (client-only)
│   ├── Navbar.tsx / Footer.tsx / Reveal.tsx
├── lib/
│   ├── types.ts                 # Tipe & helper murni (server & client)
│   ├── db.ts                    # Koneksi SQLite + query (server-only)
│   ├── db/schema.sql            # Skema: kelas → levels → challenges
│   └── blockly/
│       ├── blocks.ts            # Definisi blok kustom CoFun
│       ├── theme.ts             # Theme + warna design system
│       ├── toolbox.ts           # Toolbox dari allowedBlocks soal
│       └── simulate.ts          # Workspace-walk → frame animasi (tanpa eval)
├── data/
│   └── kelas-1.json … kelas-6.json  # Sumber data kelas & soal
├── scripts/seed.ts              # JSON → SQLite (npm run seed)
├── stitch/                      # Referensi desain dari Stitch (bukan bagian build)
├── design.md                    # Design system (token warna, tipografi, spacing)
└── PRD.md                       # Product Requirements Document
```

## Design System

Token dibangun di `app/globals.css` (`@theme`) dan bersumber dari `design.md`:

- **Warna:** palet Material-3 — primary `#006194`, container `#007bb9`, surface `#f9f9ff`, sekunder `#006c49`, tersier `#825100`, error `#ba1a1a`
- **Tipografi:** skala `display` hingga `label-badge` (+ varian `-mobile`); blok kode memakai Space Grotesk (`label-code`)
- **Gaya:** tombol taktil dengan efek ekstrusi bawah, sudut membulat, target sentuh minimum 44px
- Warna blok Blockly mengikuti palet yang sama: gerakan `#0284c7`, perulangan `#059669`, kondisi `#d97706`

## Sumber Desain

- Proyek Stitch: **CoFun UI/UX Prototype**
- Layar yang dikonversi: Beranda, Pilih Kelas, Peta Petualangan, Arena Belajar & Tantangan
- File HTML + screenshot asli tersimpan di `stitch/` sebagai referensi proses desain

## Roadmap (rencana pengembangan)

- [ ] Soal untuk kelas lain — tinggal tambah `challenges` di `data/kelas-*.json` lalu `npm run seed`, tanpa ubah kode
- [ ] Simpan progres siswa opsional (localStorage per perangkat, atau token anonim ke database)
- [ ] Blok tambahan (variabel, fungsi) mengikuti materi kelas 5–6
- [ ] Halaman admin untuk mengelola soal lewat UI (saat ini lewat JSON)
- [ ] Interpreter sandbox agar kode bisa diekspor dan dijalankan langkah demi langkah
- [ ] Efek suara & narasi ramah anak (Fase 4 di PRD)

## Catatan Teknis & Keamanan

- Eksekusi program siswa **tidak memakai `eval`**: simulator membaca struktur blok secara rekursif (loop & kondisi ditangani eksplisit, dengan batas maksimum langkah anti-infinite-loop).
- Blockly v11+ tidak lagi menyertakan teks pesan bawaan di `blockly/core`; CoFun memuat locale Inggris via `blockly/msg/en` + `Blockly.setLocale` sebelum `inject` (`lib/blockly/blocks.ts`).
- Semua query database memakai prepared statements; file DB dihasilkan ulang dari JSON (seed idempotent, replace per kelas).
- Halaman peta di-prerender (SSG) dari database saat build; arena membaca soal terbaru dari database.
- Tanpa login — akses terbuka untuk siswa, guru, dan orang tua; tidak ada data pribadi yang dikumpulkan.

Made by: RPL Student
