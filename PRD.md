# PRODUCT REQUIREMENTS DOCUMENT (PRD) & PROJECT BRIEF
## Project Name: CoFun (Coding Fun)
**Sub-title:** Media Pembelajaran Koding & Berpikir Komputasional Berbasis Game Puzzle untuk Siswa Sekolah Dasar (SD)
**Initiative:** Project Creation by RPL Student
**Status:** In Review / Ready for Implementation

---

## 1. Executive Summary & Product Vision

### 1.1 Visi Produk
**CoFun (Coding Fun)** adalah platform media pembelajaran web interaktif yang dirancang khusus untuk memperkenalkan dasar-dasar logika pemrograman dan *computational thinking* kepada anak-anak usia Sekolah Dasar (Kelas 1–6 SD). Melalui pendekatan *gamified block puzzle* yang intuitif, anak-anak belajar menyusun logika instruksi tanpa beban sintaks teks yang rumit.

### 1.2 Filosofi Desain
> *"Bukan sekadar editor kode, melainkan puzzle permainan logika."*
Anak-anak tidak merasa sedang mengetik skrip atau kode profesional, melainkan sedang memandu robot sahabat mereka berpetualang menuntaskan misi dengan menyusun kepingan puzzle magnetik.

### 1.3 Target Pengguna (User Persona)
- **Primary Users:** Siswa SD Kelas 1 hingga Kelas 6 (Usia 6–12 tahun). Memiliki rasa ingin tahu tinggi, menyukai visual berwarna cerah, membutuhkan instruksi visual sederhana dan umpan balik yang apresiatif tanpa intimidasi kesalahan.
- **Secondary Users:** Guru Informatika/TIK & Guru Kelas SD, serta Orang Tua pendamping yang membutuhkan kurikulum terstruktur dan pemantauan capaian belajar tanpa memerlukan akun login yang rumit.

---

## 2. Masalah & Peluang (Problem Statement & Opportunity)

| Masalah yang Dihadapi Siswa SD | Solusi CoFun |
|---|---|
| Coding konvensional berbasis teks rumit dan rentan salah ketik (*syntax error*), memicu frustrasi dini. | Menggunakan antarmuka visual **Puzzle Interlocking (Tab & Notch)** terinspirasi Blockly & Scratch dengan gaya khas CoFun. |
| Kurikulum koding sering tidak berjenjang dan melompat langsung ke logika kompleks. | Membagi kurikulum berjenjang dari **Kelas 1 hingga Kelas 6** dengan game petualangan tematik yang disesuaikan usia kognitif anak. |
| Pengalaman koding terasa abstrak dan terpisah dari hasil visual. | Tautan langsung *real-time*: **Blok Kode → Urutan Perintah → Gerakan Robot Step-by-Step → Feedback Visual**. |
| Hambatan registrasi/login yang menyulitkan anak di laboratorium sekolah. | Akses terbuka tanpa form login kompleks, langsung fokus pada eksplorasi dan modul materi. |

---

## 3. Peta Kurikulum & Petualangan Tiap Kelas

| Tingkat | Topik Utama Komputasi | Judul Game Petualangan | Konsep Kunci |
|---|---|---|---|
| **Kelas 1** | Pondasi Logika & Urutan | 🎮 *Bantu Si Kancil* | Langkah Berurutan (*Sequence*), Arah Mata Angin, Dekomposisi Sederhana |
| **Kelas 2** | Pengenalan Pola & Loop Awal | 🎮 *Kebun Wortel* | Pengenalan Pola (*Pattern Recognition*), Perulangan 2x–4x, Jalur Aman |
| **Kelas 3** | Perulangan & Counter | 🎮 *Bintang Angkasa* | *Loop* Berulang, Penghitung Langkah/Bintang, Instruksi Maju & Belok |
| **Kelas 4** | Percabangan Logika IF / ELSE | 🎮 *Labirin Kristal* | Blok Keputusan (`JIKA` ada halangan batu `MAKA` belok `SELAIN ITU` maju), Sensor |
| **Kelas 5** | Prosedur & Fungsi (*Function*) | 🎮 *Pabrik Kue Otomatis* | Sub-rutin (*Reusable Blocks*), Optimasi Langkah, Algoritma Terstruktur |
| **Kelas 6** | Variabel & Logika Game | 🎮 *Rover Mars* | Variabel (Skor, Bahan Bakar/Energi), Pemrograman Bersyarat Multi-Kondisi |

---

## 4. Arsitektur Antarmuka & User Flow

```
[ Beranda CoFun ]
       │
       ├──► [ Pilih Kelas (K1 - K6) ] ──► [ Peta Petualangan / Level Map ]
       │                                            │
       └────────────────────────────────────────────┴──► [ Arena Belajar & Tantangan ]
                                                                  │
                                                        ┌─────────┴─────────┐
                                                        │ 1. Simulator Labirin
                                                        │ 2. Kotak Perintah (Block Library)
                                                        │ 3. Papan Puzzle Koding (Workspace)
```

### 4.1 Halaman-Halaman Utama (Screen Scope)
1. **Beranda (`Beranda - CoFun`):**
   - Hero banner interaktif dengan pengenalan CoFun & CTA *"Mulai Petualangan Seru"*.
   - Seksi *"Fondasi Berpikir Kritis Lewat Permainan Seru"*.
   - Seksi *"Peta Materi & Game Tiap Kelas"* (Grid 3 kolom Kelas 1–6).
   - Alur 3 Langkah Belajar: *Pilih Misi → Rancang Strategi → Nyalakan & Rayakan*.
   - Footer ramah anak & penanda identitas *"Made by: RPL Student"*.

2. **Pilih Kelas (`Pilih Kelas - CoFun`):**
   - Katalog kartu kelas 1 sampai 6 dengan deskripsi capaian belajar, badge topik, dan tombol aksi terpadu *"Buka Materi"*.
   - Tanpa hambatan login siswa.

3. **Peta Petualangan (`Peta Petualangan - CoFun`):**
   - Visualisasi alur level misi (contoh: Level 1 s/d Level 8 pada Kelas 4: Logika Percabangan).
   - Ilustrasi 3D maskot robot di persimpangan jalan IF/ELSE.
   - Papan rangkuman inti pelajaran hari ini dan badge reward XP.

4. **Arena Belajar & Tantangan (`Arena Belajar & Tantangan - CoFun`):**
   - **Kolom Kiri (Simulator Labirin 5x5):** Menampilkan karakter Robot CoFun, jalur navigasi, rintangan batu karang, bintang finish, dan indikator langkah/status.
   - **Kolom Tengah (Kotak Perintah / Block Library):** Kepingan puzzle magnetik dalam 3 kategori warna (Gerakan, Kondisi IF/ELSE, Perulangan).
   - **Kolom Kanan (Papan Puzzle Koding):** Kanvas perakitan dengan start-block `KETIKA ROBOT DIJALANKAN`, struktur C-Block interlocking, area snap magnetik, dan tombol kontrol aksi (*💡 Bantuan*, *🔍 Cek Logika*, *🔄 Reset*, *▶ Jalankan Robot!*).

---

## 5. Fitur Kunci & Spesifikasi Fungsional

### 5.1 Desain Balok Koding (Interlocking Puzzle Pieces)
- **Male Tab & Female Notch:** Balok memiliki sambungan puzzle fisik di sisi atas dan lekukan di sisi bawah sehingga saling mengait saat dipasang secara vertikal.
- **C-Block Container:** Balok logika bersarang (*nesting*) untuk `JIKA` dan `SELAIN ITU` memiliki rongga capit (*jaw socket*) yang menampung balok perintah di dalamnya secara visual.
- **Kategori Warna Konsisten:**
  - 🔵 **Gerakan (Sky Blue):** `Maju 1 Langkah`, `Belok Kanan ↷`, `Belok Kiri ↶`.
  - 🟠 **Kondisi/Logika (Warm Amber):** `JIKA <rintangan>`, `SELAIN ITU`.
  - 🟢 **Perulangan (Soft Green):** `ULANGI [2x]`.
  - 🟩 **Start / Event (Teal/Emerald):** `🟢 KETIKA ROBOT DIJALANKAN`.

### 5.2 Interaksi Gameplay & Eksekusi Step-by-Step
1. **Drag-and-Drop & Magnetic Snap:** Balok yang didekatkan ke socket memberikan visual snapping dan menyatu dengan feedback haptic/animasi ringan.
2. **Eksekusi Langkah Bertahap (*Step-by-Step Execution*):** Saat tombol *"▶ Jalankan Robot!"* ditekan, sistem menyorot (*glow outline*) balok kode yang aktif secara berurutan seiring robot bergerak di simulator labirin.
3. **Cek Logika (*Pre-flight Validation*):** Memeriksa apakah balok sudah terpasang di bawah Start block dan memiliki parameter valid sebelum robot dijalankan.
4. **Hint & Feedback Positif:**
   - Kegagalan tidak menggunakan kata "Kamu Salah", melainkan *"Hmm, coba periksa kembali arah robot sebelum belok."*
   - Keberhasilan memicu ucapan selebrasi *"Mantap! Robot berhasil mencapai bintang!"* dan membuka level berikutnya.

---

## 6. Persyaratan Desain Sistem & Non-Fungsional

### 6.1 Desain Sistem (Tokens & Visual Language)
- **Font:** Plus Jakarta Sans (ramah, keterbacaan tinggi untuk anak).
- **Primary Color:** Sky Blue (`#0284c7`), Soft Teal (`#0d9488`).
- **Accent Colors:** Warm Amber (`#d97706`), Emerald Green (`#059669`), Soft Coral (`#e11d48`).
- **Surface & Background:** Off-white / Soft Ice Blue (`#f9f9ff`, `#f0f3ff`) untuk kenyamanan mata anak.
- **Corner Roundness:** Smooth Rounded (`rounded-xl` hingga `rounded-2xl`).

### 6.2 Responsivitas & Aksesibilitas
- **Desktop (Pengalaman Utama):** Tata letak 3 kolom sejajar tanpa horizontal scrolling pada resolusi 1280px ke atas.
- **Tablet:** Area Workspace dan Labirin bersanding dengan drawer kepingan perintah yang collapsible.
- **Mobile:** Alur bertahap: Simulator Robot di atas → Papan Puzzle di tengah → Bottom sheet drawer untuk memilih balok perintah. Target sentuh minimal 44x44px.

---

## 7. Roadmap & Pengembangan Mendatang
- [x] **Fase 1 (Design Baseline):** Desain Beranda, Pilih Kelas, Peta Petualangan, dan Arena Tantangan Desktop.
- [x] **Fase 2 (Refinement):** Penyelarasan identitas *"Made by: RPL Student"*, penyempurnaan bentuk puzzle interlocking, dan penataan ulang 3 kolom gameplay.
- [ ] **Fase 3 (Frontend Engine):** Integrasi JavaScript game engine untuk drag-and-drop kepingan puzzle SVG/DOM dan parser eksekusi AST (*Abstract Syntax Tree*) sederhana ke simulator robot.
- [ ] **Fase 4 (Sound & Voice Effects):** Efek suara klik magnetik saat puzzle terpasang dan narasi suara ramah anak untuk materi panduan.
