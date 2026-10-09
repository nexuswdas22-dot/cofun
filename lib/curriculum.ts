export type LevelStatus = "done" | "active" | "locked";

export type Level = {
  id: number;
  title: string;
  topic: string;
  desc: string;
  skills: string[];
  btnText: string;
  nodeLabel: string;
  nodeIcon: string;
};

export type Kelas = {
  slug: string;
  nomor: number;
  badge: string;
  judul: string;
  chip: string;
  pulau: string;
  levelAktif: number;
  ctaEnabled: boolean;
  bannerTitle: string;
  bannerCode: string;
  levels: Level[];
};

const STATUS_BADGE: Record<LevelStatus, { label: string; className: string }> = {
  done: { label: "Sudah Selesai", className: "bg-secondary-fixed text-on-secondary-fixed" },
  active: {
    label: "Sedang Berjalan",
    className: "bg-primary-fixed text-on-primary-fixed-variant",
  },
  locked: { label: "Siap Ditantang", className: "bg-surface-container-high text-on-surface" },
};

export const TOTAL_LEVEL = 5;

export function statusOf(kelas: Kelas, levelId: number): LevelStatus {
  if (levelId < kelas.levelAktif) return "done";
  if (levelId === kelas.levelAktif) return "active";
  return "locked";
}

export function statusBadge(status: LevelStatus) {
  return STATUS_BADGE[status];
}

export function progressOf(kelas: Kelas): number {
  return Math.round(((kelas.levelAktif - 1) / TOTAL_LEVEL) * 100);
}

export function statusMisiOf(kelas: Kelas): string {
  return `Level ${kelas.levelAktif} dari ${TOTAL_LEVEL}`;
}

export function nodeSummaryOf(kelas: Kelas): string {
  const done = kelas.levels.filter((l) => statusOf(kelas, l.id) === "done").length;
  const active = kelas.levels.filter((l) => statusOf(kelas, l.id) === "active").length;
  const locked = kelas.levels.filter((l) => statusOf(kelas, l.id) === "locked").length;
  return `${done} Selesai • ${active} Aktif • ${locked} Siap`;
}

export function codeOf(kelas: Kelas, levelId: number): string {
  return `K${kelas.nomor}-MOD-${String(levelId).padStart(2, "0")}`;
}

export function ctaStateOf(
  kelas: Kelas,
  level: Level,
  status: LevelStatus,
): { enabled: boolean; label: string } {
  if (!kelas.ctaEnabled) {
    return { enabled: false, label: "Arena Segera Hadir" };
  }
  if (status === "locked") {
    return { enabled: false, label: "Selesaikan Level Sebelumnya" };
  }
  return { enabled: true, label: level.btnText };
}

export const kelasList: Kelas[] = [
  {
    slug: "kelas-1",
    nomor: 1,
    badge: "Kelas 1 SD",
    judul: "Kelas 1: Pondasi Logika",
    chip: "Petualangan Urutan",
    pulau: "Pulau Urutan Langkah",
    levelAktif: 1,
    ctaEnabled: false,
    bannerTitle: "Langkah demi Langkah",
    bannerCode: "maju(); belok_kanan(); maju();",
    levels: [
      {
        id: 1,
        title: "Level 1 — Kenali Pola",
        topic: "Mengenali pola gambar dan langkah yang berulang.",
        desc: "Lihat dulu pola langkah Kancil: maju, maju, maju. Sekarang giliranmu mengenali polanya!",
        skills: [
          "Mengenali pola yang berulang",
          "Menemukan pola yang hilang",
          "Meniru pola sederhana",
        ],
        btnText: "Mulai Level 1",
        nodeLabel: "Kenali Pola",
        nodeIcon: "pattern",
      },
      {
        id: 2,
        title: "Level 2 — Kelompokkan",
        topic: "Mengelompokkan objek sesuai ciri yang sama.",
        desc: "Kelompokkan buah dan batu sebelum Kancil menyeberang, supaya jalurmu rapi!",
        skills: [
          "Mengelompokkan objek serupa",
          "Memisahkan yang bukan kelompok",
          "Menjelaskan ciri kelompok",
        ],
        btnText: "Mulai Level 2",
        nodeLabel: "Kelompokkan",
        nodeIcon: "category",
      },
      {
        id: 3,
        title: "Level 3 — Kenali Arah",
        topic: "Mengenal arah hadap: utara, timur, selatan, dan barat.",
        desc: "Kancil butuh petunjuk arah. Arahkan hadapnya ke kanan, kiri, dan lurus supaya tidak tersesat!",
        skills: [
          "Mengenal arah hadap robot",
          "Memberi perintah belok",
          "Membaca petunjuk arah",
        ],
        btnText: "Mulai Level 3",
        nodeLabel: "Kenali Arah",
        nodeIcon: "explore",
      },
      {
        id: 4,
        title: "Level 4 — Ikuti Instruksi",
        topic: "Melakukan instruksi persis seperti yang dibaca.",
        desc: "Bacakan resep nenek, lalu bantu Kancil mengambil buah sesuai urutan resepnya.",
        skills: [
          "Membaca instruksi sederhana",
          "Membandingkan urutan buah",
          "Menyelesaikan resep nenek",
        ],
        btnText: "Mulai Level 4",
        nodeLabel: "Ikuti Instruksi",
        nodeIcon: "menu_book",
      },
      {
        id: 5,
        title: "Level 5 — Misi Pertama",
        topic: "Misi gabungan semua materi Kelas 1.",
        desc: "Misi terakhir: bantu Kancil sampai ke rumah nenek dengan urutan langkah yang tepat!",
        skills: [
          "Menggabungkan pola, arah & urutan",
          "Menyelesaikan misi tanpa salah langkah",
          "Mendapat lencana Kancil Pintar",
        ],
        btnText: "Mulai Level 5",
        nodeLabel: "Misi Pertama",
        nodeIcon: "flag",
      },
    ],
  },
  {
    slug: "kelas-2",
    nomor: 2,
    badge: "Kelas 2 SD",
    judul: "Kelas 2: Pola & Perulangan",
    chip: "Petualangan Pola",
    pulau: "Pulau Kebun Wortel",
    levelAktif: 1,
    ctaEnabled: false,
    bannerTitle: "Pola yang Berulang",
    bannerCode: "ulangi(3) { maju(); }",
    levels: [
      {
        id: 1,
        title: "Level 1 — Susun Langkah",
        topic: "Menyusun jalur sederhana dari titik awal ke tujuan.",
        desc: "Bawa robot ke bedeng wortel pertama dengan langkah maju yang tertib.",
        skills: [
          "Menyusun langkah maju",
          "Menghindari batas kebun",
          "Sampai ke bedeng wortel",
        ],
        btnText: "Mulai Level 1",
        nodeLabel: "Susun Langkah",
        nodeIcon: "route",
      },
      {
        id: 2,
        title: "Level 2 — Jalan ke Tujuan",
        topic: "Memilih jalur teraman melewati rintangan kebun.",
        desc: "Ada pagar di tengah! Pilih jalan memutar agar robot tidak menabrak.",
        skills: [
          "Memilih jalur aman",
          "Berbelok dengan tepat",
          "Menghindari tabrakan",
        ],
        btnText: "Mulai Level 2",
        nodeLabel: "Jalan ke Tujuan",
        nodeIcon: "move_to_location",
      },
      {
        id: 3,
        title: "Level 3 — Ikuti Pola",
        topic: "Mengenali pola langkah yang berulang.",
        desc: "Maju, maju, belok — pola ini terus berulang. Bantu robot menirunya!",
        skills: [
          "Mengenali pola berulang",
          "Meniru urutan pola",
          "Melanjutkan pola yang hilang",
        ],
        btnText: "Mulai Level 3",
        nodeLabel: "Ikuti Pola",
        nodeIcon: "pattern",
      },
      {
        id: 4,
        title: "Level 4 — Cari Kesalahan",
        topic: "Menemukan langkah yang salah urutan pada program.",
        desc: "Ada langkah keliru di program kebun. Temukan dan perbaiki agar wortel selamat!",
        skills: [
          "Menemukan langkah keliru",
          "Memperbaiki urutan program",
          "Menguji ulang program",
        ],
        btnText: "Mulai Level 4",
        nodeLabel: "Cari Kesalahan",
        nodeIcon: "bug_report",
      },
      {
        id: 5,
        title: "Level 5 — Misi Robot",
        topic: "Misi akhir memanen wortel dengan pola dan perulangan.",
        desc: "Panen wortel sebanyak mungkin dengan program paling hemat balok!",
        skills: [
          "Menggabungkan pola & loop",
          "Menghitung wortel hasil panen",
          "Mendapat lencana Petani Pola",
        ],
        btnText: "Mulai Level 5",
        nodeLabel: "Misi Robot",
        nodeIcon: "flag",
      },
    ],
  },
  {
    slug: "kelas-3",
    nomor: 3,
    badge: "Kelas 3 SD",
    judul: "Kelas 3: Loop & Counter",
    chip: "Petualangan Perulangan",
    pulau: "Pulau Bintang Angkasa",
    levelAktif: 1,
    ctaEnabled: false,
    bannerTitle: "Loop Menuju Bintang",
    bannerCode: "ulangi(4) { langkah_bintang(); }",
    levels: [
      {
        id: 1,
        title: "Level 1 — Apa Itu Algoritma?",
        topic: "Mengenal algoritma sebagai urutan langkah menuju tujuan.",
        desc: "Sebelum lepas landas, kenali dulu urutan persiapan roketmu!",
        skills: [
          "Menyusun langkah logis",
          "Mengecek urutan persiapan",
          "Menjalankan langkah pertama",
        ],
        btnText: "Mulai Level 1",
        nodeLabel: "Apa Itu Algoritma?",
        nodeIcon: "schema",
      },
      {
        id: 2,
        title: "Level 2 — Buat Algoritma",
        topic: "Menyusun instruksi maju dan belok untuk robot penjelajah.",
        desc: "Tulis urutan maju dan belok agar penjelajah sampai ke bintang.",
        skills: [
          "Instruksi maju satu langkah",
          "Instruksi belok kiri & kanan",
          "Menggabungkan maju dan belok",
        ],
        btnText: "Mulai Level 2",
        nodeLabel: "Buat Algoritma",
        nodeIcon: "directions",
      },
      {
        id: 3,
        title: "Level 3 — Pecahkan Masalah",
        topic: "Memecah masalah besar menjadi langkah-langkah kecil.",
        desc: "Ada asteroid di jalurmu! Pecah masalahnya jadi langkah kecil yang mudah.",
        skills: [
          "Memecah masalah jadi langkah kecil",
          "Mencoba solusi bertahap",
          "Memeriksa hasil tiap langkah",
        ],
        btnText: "Mulai Level 3",
        nodeLabel: "Pecahkan Masalah",
        nodeIcon: "psychology",
      },
      {
        id: 4,
        title: "Level 4 — Jika... Maka...",
        topic: "Memperkenalkan keputusan sederhana JIKA / MAKA.",
        desc: "Jika ada bintang, ambil; jika kosong, lanjut. Robot mulai bisa memilih!",
        skills: [
          "Membaca kondisi sederhana",
          "Memilih tindakan sesuai kondisi",
          "Menguji keputusan robot",
        ],
        btnText: "Mulai Level 4",
        nodeLabel: "Jika... Maka...",
        nodeIcon: "alt_route",
      },
      {
        id: 5,
        title: "Level 5 — Misi Algoritma",
        topic: "Misi akhir: kumpulkan bintang dengan algoritma lengkap.",
        desc: "Kumpulkan semua bintang di tata surya dengan algoritma terbaikmu!",
        skills: [
          "Algoritma + keputusan sederhana",
          "Mengoptimalkan jumlah langkah",
          "Mendapat lencana Jelajah Bintang",
        ],
        btnText: "Mulai Level 5",
        nodeLabel: "Misi Algoritma",
        nodeIcon: "flag",
      },
    ],
  },
  {
    slug: "kelas-4",
    nomor: 4,
    badge: "Kelas 4 SD",
    judul: "Kelas 4: Block Coding",
    chip: "Petualangan Logika",
    pulau: "Pulau Percabangan Algoritma",
    levelAktif: 1,
    ctaEnabled: true,
    bannerTitle: "Robot Memilih Jalan Sendiri",
    bannerCode: "jika (ada_batu) { belok_kiri() }",
    levels: [
      {
        id: 1,
        title: "Level 1 — Kenalan dengan Blok",
        topic: "Mengenal bentuk potongan balok koding dan cara menempelkannya.",
        desc: "Kamu sudah berhasil belajar cara menempelkan blok maju, mundur, dan memutar. Dasar yang sangat kokoh!",
        skills: [
          "Menemukan bentuk balok puzzle",
          "Menempel blok tanpa salah urutan",
          "Mengenal arah hadap robot",
        ],
        btnText: "Buka Materi & Challenge",
        nodeLabel: "Kenalan dengan Blok",
        nodeIcon: "extension",
      },
      {
        id: 2,
        title: "Level 2 — Susun Program",
        topic: "Menyusun rangkaian aksi berurutan secara teratur dari atas ke bawah.",
        desc: "Kamu sudah hebat mengatur urutan langkah robot agar sampai ke garis aman tanpa menabrak dinding.",
        skills: [
          "Menyusun langkah dari atas ke bawah",
          "Menghitung langkah robot",
          "Menghindari tabrakan dinding",
        ],
        btnText: "Buka Kembali Materi",
        nodeLabel: "Susun Program",
        nodeIcon: "reorder",
      },
      {
        id: 3,
        title: "Level 3 — Perulangan",
        topic: "Mengulang perintah berkali-kali menggunakan 1 blok pintar.",
        desc: "Kamu berhasil menghemat balok dengan perulangan 4 langkah untuk menggambar pola persegi rapi!",
        skills: [
          "Mengulang perintah dengan blok ULANGI",
          "Menghitung bintang yang dikumpulkan",
          "Menghemat jumlah balok",
        ],
        btnText: "Buka Kembali Materi",
        nodeLabel: "Perulangan",
        nodeIcon: "all_inclusive",
      },
      {
        id: 4,
        title: "Level 4 — Kondisi",
        topic: "Konsep percabangan keputusan saat robot menghadapi situasi berbeda di lintasan.",
        desc: "Robot belajar memilih jalan sendiri jika ada rintangan di depan! Kamu akan menyusun blok perintah: jika ada rintangan, belok; jika aman, maju terus.",
        skills: [
          "Membaca kondisi sensor rintangan",
          "Membuat jalur alternatif dengan blok ELSE",
          "Mengarahkan CoFun Bot ke bendera akhir",
        ],
        btnText: "Buka Materi & Challenge",
        nodeLabel: "Kondisi",
        nodeIcon: "alt_route",
      },
      {
        id: 5,
        title: "Level 5 — Debugging",
        topic: "Menemukan kesalahan kode dan memperbaikinya agar misi sukses.",
        desc: "Jadilah dokter kode! Kamu akan mencari balok yang salah urutan atau salah arah dan menjadikannya sempurna.",
        skills: [
          "Menemukan blok yang salah urutan",
          "Memperbaiki logika robot",
          "Menguji ulang sampai misi sukses",
        ],
        btnText: "Mulai Level 5",
        nodeLabel: "Debugging",
        nodeIcon: "pest_control",
      },
    ],
  },
  {
    slug: "kelas-5",
    nomor: 5,
    badge: "Kelas 5 SD",
    judul: "Kelas 5: Fungsi & Prosedur",
    chip: "Petualangan Fungsi",
    pulau: "Pulau Pabrik Kue",
    levelAktif: 1,
    ctaEnabled: false,
    bannerTitle: "Resep Jadi Satu Fungsi",
    bannerCode: "fungsi aduk() { ... }",
    levels: [
      {
        id: 1,
        title: "Level 1 — Loop Kompleks",
        topic: "Perulangan bertingkat untuk langkah yang panjang.",
        desc: "Aduk berkali-kali sambil mencetak — perulangan bersarang membuat produksi jauh lebih cepat!",
        skills: [
          "Loop di dalam loop",
          "Mengatur jumlah pengulangan",
          "Menghemat balok instruksi",
        ],
        btnText: "Mulai Level 1",
        nodeLabel: "Loop Kompleks",
        nodeIcon: "all_inclusive",
      },
      {
        id: 2,
        title: "Level 2 — Kondisi Bersarang",
        topic: "Keputusan IF/ELSE di dalam perulangan.",
        desc: "Kalau adonan kurang, tambah; kalau cukup, lanjut mencetak — semuanya di dalam loop!",
        skills: [
          "Menempatkan kondisi di dalam loop",
          "Membaca kondisi bertingkat",
          "Menguji tiap cabang keputusan",
        ],
        btnText: "Mulai Level 2",
        nodeLabel: "Kondisi Bersarang",
        nodeIcon: "call_split",
      },
      {
        id: 3,
        title: "Level 3 — Variabel",
        topic: "Menyimpan nilai bahan dan hasil kue dalam variabel.",
        desc: "Simpan jumlah tepung dan jumlah kue ke dalam variabel supaya mudah dipantau.",
        skills: [
          "Membuat variabel",
          "Mengubah nilai variabel",
          "Membaca nilai variabel",
        ],
        btnText: "Mulai Level 3",
        nodeLabel: "Variabel",
        nodeIcon: "data_object",
      },
      {
        id: 4,
        title: "Level 4 — Function",
        topic: "Membuat blok fungsi untuk tugas yang berulang.",
        desc: "Simpan tugas aduk jadi satu fungsi, lalu panggil kapan pun dibutuhkan!",
        skills: [
          "Membuat fungsi sendiri",
          "Memanggil fungsi berkali-kali",
          "Menggabungkan fungsi jadi prosedur",
        ],
        btnText: "Mulai Level 4",
        nodeLabel: "Function",
        nodeIcon: "function",
      },
      {
        id: 5,
        title: "Level 5 — Coding Mission",
        topic: "Misi akhir produksi kue otomatis.",
        desc: "Produksi 10 kue tanpa henti dengan program lengkap buatanmu!",
        skills: [
          "Fungsi + loop + variabel",
          "Menjaga produksi tetap stabil",
          "Mendapat lencana Koki Algoritma",
        ],
        btnText: "Mulai Level 5",
        nodeLabel: "Coding Mission",
        nodeIcon: "flag",
      },
    ],
  },
  {
    slug: "kelas-6",
    nomor: 6,
    badge: "Kelas 6 SD",
    judul: "Kelas 6: Variabel & Algoritma",
    chip: "Petualangan Variabel",
    pulau: "Pulau Pangkalan Rover Mars",
    levelAktif: 1,
    ctaEnabled: false,
    bannerTitle: "Simpan Nilai di Variabel",
    bannerCode: "energi = 100; skor = 0;",
    levels: [
      {
        id: 1,
        title: "Level 1 — Combine Logic",
        topic: "Menggabungkan beberapa kondisi menjadi satu aturan.",
        desc: "Kalau energi cukup DAN jalan aman, rover boleh maju terus.",
        skills: [
          "Menggabung dua kondisi",
          "Membaca hasil benar atau salah",
          "Membuat keputusan bertingkat",
        ],
        btnText: "Mulai Level 1",
        nodeLabel: "Combine Logic",
        nodeIcon: "alt_route",
      },
      {
        id: 2,
        title: "Level 2 — Logic Master",
        topic: "Merancang aturan main sederhana untuk game mini.",
        desc: "Buat aturan menang dan kalah untuk mini game rover Mars.",
        skills: [
          "Merancang aturan game",
          "Menyimpan status menang",
          "Menguji aturan game",
        ],
        btnText: "Mulai Level 2",
        nodeLabel: "Logic Master",
        nodeIcon: "sports_esports",
      },
      {
        id: 3,
        title: "Level 3 — Variable & Function",
        topic: "Menyimpan skor dan energi dalam variabel, lalu membungkusnya jadi fungsi.",
        desc: "Simpan skor batu dan sisa baterai dalam variabel, lalu rapikan menjadi fungsi.",
        skills: [
          "Membuat & mengubah variabel",
          "Membungkus logika jadi fungsi",
          "Memanggil fungsi saat dibutuhkan",
        ],
        btnText: "Mulai Level 3",
        nodeLabel: "Variable & Function",
        nodeIcon: "function",
      },
      {
        id: 4,
        title: "Level 4 — Debug Master",
        topic: "Menemukan kesalahan kode dan memperbaikinya.",
        desc: "Jadilah dokter kode! Cari balok yang salah urutan dan perbaiki sampai misi sukses.",
        skills: [
          "Menemukan bug program",
          "Memperbaiki logika robot",
          "Menguji ulang sampai benar",
        ],
        btnText: "Mulai Level 4",
        nodeLabel: "Debug Master",
        nodeIcon: "pest_control",
      },
      {
        id: 5,
        title: "Level 5 — Final Mission",
        topic: "Misi akhir: program lengkap rover Mars.",
        desc: "Rover harus mengumpulkan batu, menghemat energi, dan kembali ke landasan!",
        skills: [
          "Variabel + kondisi + fungsi",
          "Program utuh tanpa error",
          "Mendapat lencana Pilot Rover",
        ],
        btnText: "Mulai Level 5",
        nodeLabel: "Final Mission",
        nodeIcon: "flag",
      },
    ],
  },
];

export const defaultKelasSlug = "kelas-4";

export function getAllKelas(): Kelas[] {
  return kelasList;
}

export function getKelasBySlug(slug: string): Kelas | undefined {
  return kelasList.find((kelas) => kelas.slug === slug);
}
