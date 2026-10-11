// Progres belajar siswa — HANYA di memori (RAM), sengaja TIDAK disimpan.
// Setelah refresh / tutup browser, semua otomatis mulai dari nol.

const progress: Record<string, number> = {};

// Nomor level tertinggi yang sudah selesai untuk satu kelas (0 jika belum ada).
export function getCompletedLevel(slug: string): number {
  return progress[slug] ?? 0;
}

// Tandai level selesai. Tidak pernah menurunkan progres yang sudah lebih tinggi.
export function markLevelComplete(slug: string, levelNomor: number): void {
  if ((progress[slug] ?? 0) >= levelNomor) return;
  progress[slug] = levelNomor;
}
