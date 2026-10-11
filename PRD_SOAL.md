# CoFun — Spesifikasi Final 30 Soal

**Tujuan:** Dokumen acuan konten pembelajaran untuk website CoFun yang sudah tersedia.

**Struktur:** 6 kelas × 5 level = **30 soal utama**.

**Cakupan materi:** Coding, berpikir komputasional, dan konsep Kecerdasan Artifisial (KA) yang relevan.

## 1. Keputusan Utama

* Jumlah soal harus tetap 30.
* Jangan menambah level atau soal baru.
* Pertahankan konsep utama CoFun dan sistem game yang sudah ada.
* Setiap level mengikuti alur **Materi → Contoh → Challenge → Feedback**.
* Blockly diperkenalkan di Kelas 1 Level 5, lalu digunakan secara bertahap.
* Kesulitan meningkat sesuai kemampuan siswa.
* Debugging menjadi bagian dari pembelajaran.
* Konsep KA dimasukkan ke materi atau contoh pada level yang sesuai, tanpa menambah soal.
* Gunakan Bahasa Indonesia yang sederhana dan sesuai usia siswa SD.

## 2. Format Wajib Setiap Soal

Setiap soal harus memiliki:

1. **Nama level**
2. **Tujuan pembelajaran**
3. **Materi** — penjelasan singkat tentang konsep yang dipelajari.
4. **Contoh** — demonstrasi konsep sebelum challenge.
5. **Challenge** — tugas yang harus diselesaikan siswa.
6. **Kondisi awal** — posisi robot, objek, rintangan, dan keadaan permainan.
7. **Batasan** — aturan yang harus dipenuhi.
8. **Kriteria keberhasilan** — kondisi yang menentukan bahwa solusi benar.
9. **Hint** — satu petunjuk yang tidak membocorkan jawaban.
10. **Feedback** — respons ketika berhasil atau perlu memperbaiki program.

Validator harus memeriksa hasil dan aturan misi, bukan hanya mencocokkan urutan blok. Solusi alternatif yang memenuhi seluruh syarat harus diterima.

---

# KELAS 1 — MENGENAL LOGIKA

Fokus: pola, klasifikasi, arah, instruksi, dan pengenalan Blockly.

## Level 1 — Kenali Pola

**Tujuan:** Siswa mengenali pola sederhana dan menentukan bagian berikutnya.

**Materi:** Pola adalah susunan yang mengikuti aturan tertentu, misalnya bentuk yang berulang secara bergantian.

**Contoh:** Lingkaran, persegi, lingkaran, persegi, ...

**Challenge:** Lengkapi pola visual dengan memilih objek berikutnya.

**Kondisi dan batasan:**

* Gunakan satu aturan pola yang konsisten.
* Sediakan beberapa pilihan.
* Pastikan hanya satu pilihan yang sesuai.

**Kriteria keberhasilan:** Pilihan siswa mengikuti aturan pola.

**Hint:** Perhatikan bentuk yang muncul secara bergantian.

**Feedback:**

* Berhasil: “Hebat! Kamu menemukan polanya.”
* Belum berhasil: “Coba perhatikan urutan bentuknya sekali lagi.”

## Level 2 — Kelompokkan

**Tujuan:** Siswa mengelompokkan objek berdasarkan ciri tertentu.

**Materi:** Benda dapat dikelompokkan berdasarkan ciri yang sama, seperti bentuk atau warna.

**Contoh:** Kelompokkan beberapa objek berdasarkan bentuknya.

**Challenge:** Tempatkan objek ke kelompok sesuai ciri yang diminta.

**Kondisi dan batasan:**

* Gunakan satu kriteria yang jelas.
* Jangan mencampur beberapa kriteria dalam satu tantangan.
* Setiap objek harus dapat diklasifikasikan secara konsisten.

**Kriteria keberhasilan:** Semua objek berada pada kelompok yang tepat.

**Hint:** Fokus pada ciri yang diminta, bukan ciri lainnya.

**Feedback:**

* Berhasil: “Benar! Kamu mengelompokkan berdasarkan ciri yang tepat.”
* Belum berhasil: “Periksa kembali aturan kelompoknya.”

## Level 3 — Kenali Arah

**Tujuan:** Siswa memahami arah gerak berdasarkan orientasi robot.

**Materi:** Gerakan maju mengikuti arah hadap robot.

**Contoh:** Robot menghadap ke kanan. Jika maju satu langkah, robot bergerak ke arah mana?

**Challenge:** Tentukan arah gerak robot berdasarkan ilustrasi.

**Kondisi dan batasan:**

* Tampilkan arah hadap robot dengan jelas.
* Gunakan ilustrasi sederhana.
* Belum memerlukan Blockly.

**Kriteria keberhasilan:** Siswa memilih arah yang sesuai dengan orientasi robot.

**Hint:** Lihat ke arah mana bagian depan robot menghadap.

**Feedback:**

* Berhasil: “Tepat! Kamu memahami arah robot.”
* Belum berhasil: “Coba perhatikan kembali bagian depan robot.”

## Level 4 — Ikuti Instruksi

**Tujuan:** Siswa menyusun instruksi secara berurutan.

**Materi:** Instruksi perlu dilakukan dalam urutan yang tepat agar tujuan tercapai.

**Contoh:** Peragakan tiga kartu gerakan pada grid kecil.

**Challenge:** Susun kartu arah untuk membawa robot menuju petak tujuan.

**Kondisi dan batasan:**

* Gunakan grid sederhana tanpa rintangan.
* Sediakan instruksi gerak yang mudah dipahami.
* Urutan instruksi harus menentukan hasil gerakan.

**Kriteria keberhasilan:** Robot mencapai tujuan setelah menjalankan instruksi.

**Hint:** Mulai dari posisi robot dan ikuti setiap langkah satu per satu.

**Feedback:**

* Berhasil: “Mantap! Urutan instruksi membawamu ke tujuan.”
* Belum berhasil: “Periksa urutan langkah dari posisi awal.”

## Level 5 — Misi Pertama

**Tujuan:** Siswa mengenal Blockly dan hubungan antara blok dengan gerakan robot.

**Materi:** Blockly menggunakan blok visual untuk menyusun instruksi program.

**Contoh:** Sambungkan blok maju dan jalankan robot satu langkah.

**Challenge:** Susun blok gerak dasar untuk mencapai tujuan.

**Kondisi dan batasan:**

* Perkenalkan Blockly untuk pertama kalinya.
* Gunakan blok gerak maju dan belok jika diperlukan.
* Jangan gunakan perulangan, kondisi, atau variabel.
* Mulai dari grid sederhana tanpa rintangan.

**Kriteria keberhasilan:** Robot mencapai tujuan melalui eksekusi program.

**Hint:** Bandingkan arah robot dengan posisi tujuan sebelum menentukan langkah.

**Feedback:**

* Berhasil: “Misi pertama berhasil! Robot mengikuti programmu.”
* Belum berhasil: “Jalankan lagi dan perhatikan gerakan setiap blok.”

---

# KELAS 2 — URUTAN DAN PREDIKSI

Fokus: algoritma sederhana, perencanaan rute, prediksi, dan debugging dasar.

## Level 1 — Susun Langkah

**Tujuan:** Siswa menyusun langkah kegiatan dalam urutan logis.

**Materi:** Algoritma adalah urutan instruksi untuk menyelesaikan tugas.

**Contoh:** Susun langkah kegiatan sederhana yang diacak.

**Challenge:** Atur kartu langkah menjadi urutan yang benar.

**Kondisi dan batasan:**

* Gunakan aktivitas yang familiar.
* Pastikan urutan jawaban tidak ambigu.
* Semua langkah yang disediakan harus relevan.

**Kriteria keberhasilan:** Langkah tersusun sesuai urutan yang ditetapkan.

**Hint:** Pikirkan apa yang dilakukan terlebih dahulu dan sesudahnya.

**Feedback:**

* Berhasil: “Bagus! Langkah-langkahmu tersusun dengan benar.”
* Belum berhasil: “Coba tentukan langkah yang harus dilakukan paling awal.”

## Level 2 — Jalan ke Tujuan

**Tujuan:** Siswa merencanakan rute dengan memperhatikan arah dan rintangan.

**Materi:** Rute dapat direncanakan dari posisi awal menuju tujuan dengan menghindari rintangan.

**Contoh:** Peragakan rute singkat dengan satu belokan.

**Challenge:** Susun instruksi agar robot mencapai tujuan tanpa menabrak rintangan.

**Kondisi dan batasan:**

* Tampilkan posisi awal dan arah robot.
* Semua rintangan harus terlihat.
* Gunakan blok gerak dasar.

**Kriteria keberhasilan:** Robot mencapai tujuan tanpa melewati petak terlarang.

**Hint:** Rencanakan belokan sebelum robot mencapai rintangan.

**Feedback:**

* Berhasil: “Rute berhasil! Robot sampai tanpa menabrak.”
* Belum berhasil: “Periksa posisi robot sebelum setiap belokan.”

## Level 3 — Prediksi Gerakan

**Tujuan:** Siswa memperkirakan hasil program sebelum dijalankan.

**Materi:** Algoritma dapat ditelusuri satu instruksi demi satu instruksi untuk memperkirakan hasil akhirnya.

**Contoh:** Tampilkan program pendek dan pindahkan penanda robot sesuai setiap blok.

**Challenge:** Pilih posisi akhir robot sebelum program dijalankan.

**Kondisi dan batasan:**

* Gunakan blok yang sudah dikenal.
* Program harus pendek dan mudah ditelusuri.
* Siswa memberikan prediksi sebelum melihat hasil.

**Kriteria keberhasilan:** Prediksi posisi akhir sesuai hasil eksekusi.

**Hint:** Simulasikan setiap blok satu per satu.

**Feedback:**

* Berhasil: “Prediksimu tepat!”
* Belum berhasil: “Telusuri kembali program satu blok setiap langkah.”

## Level 4 — Perbaiki Instruksi

**Tujuan:** Siswa menemukan dan memperbaiki kesalahan sederhana.

**Materi:** Debugging adalah proses menemukan dan memperbaiki kesalahan dalam program.

**Contoh:** Perlihatkan rute yang gagal akibat satu instruksi belok yang keliru.

**Challenge:** Temukan dan ganti satu instruksi yang menyebabkan robot gagal.

**Kondisi dan batasan:**

* Program memiliki satu kesalahan yang disengaja.
* Instruksi lainnya benar.
* Jangan langsung menunjukkan jawaban.

**Kriteria keberhasilan:** Robot mencapai tujuan setelah perbaikan.

**Hint:** Perhatikan bagian ketika arah robot mulai berbeda dari rute yang direncanakan.

**Feedback:**

* Berhasil: “Kamu menemukan dan memperbaiki kesalahannya.”
* Belum berhasil: “Telusuri langkah robot untuk menemukan bagian yang menyimpang.”

## Level 5 — Misi Robot

**Tujuan:** Siswa membuat dan menguji program gerak dasar.

**Materi:** Program tersusun dari instruksi yang dijalankan secara berurutan.

**Contoh:** Jalankan program singkat dan bandingkan posisi robot dengan target.

**Challenge:** Susun program gerak untuk melewati rute dengan beberapa belokan.

**Kondisi dan batasan:**

* Gunakan blok yang sudah diperkenalkan.
* Jangan menggunakan perulangan atau kondisi yang belum diajarkan.
* Eksekusi robot harus terlihat langkah demi langkah.

**Kriteria keberhasilan:** Robot mencapai tujuan tanpa tabrakan.

**Hint:** Periksa arah hadap robot setelah setiap belokan.

**Feedback:**

* Berhasil: “Misi selesai! Programmu membawa robot ke tujuan.”
* Belum berhasil: “Amati blok yang berjalan tepat sebelum robot keluar dari rute.”

---

# KELAS 3 — ALGORITMA DAN PEMECAHAN MASALAH

Fokus: algoritma mandiri, abstraksi, pengujian, dan dekomposisi.

## Level 1 — Lengkapi Algoritma

**Tujuan:** Siswa melengkapi program yang kehilangan instruksi.

**Materi:** Algoritma dapat diperiksa untuk menentukan instruksi yang diperlukan.

**Contoh:** Tampilkan program dengan satu blok yang hilang.

**Challenge:** Pilih blok yang tepat untuk mengisi bagian kosong.

**Kondisi dan batasan:**

* Satu bagian program kosong.
* Pilihan jawaban mencakup pengecoh yang masuk akal.
* Semua blok yang dibutuhkan sudah pernah diajarkan.

**Kriteria keberhasilan:** Program lengkap mencapai tujuan.

**Hint:** Perhatikan posisi robot setelah menjalankan blok sebelumnya.

**Feedback:**

* Berhasil: “Tepat! Kamu melengkapi algoritma.”
* Belum berhasil: “Pikirkan perubahan posisi yang dibutuhkan.”

## Level 2 — Buat Algoritma

**Tujuan:** Siswa merancang urutan instruksi sendiri.

**Materi:** Tujuan dapat dipecah menjadi langkah-langkah kecil yang dapat dilakukan.

**Contoh:** Rencanakan rute singkat sebelum menyusun blok.

**Challenge:** Buat program untuk mencapai tujuan dengan rute dan batasan yang ditentukan.

**Kondisi dan batasan:**

* Tampilkan posisi awal, orientasi, target, dan rintangan.
* Sediakan blok yang telah dipelajari.
* Terima lebih dari satu solusi yang valid.

**Kriteria keberhasilan:** Robot mencapai tujuan tanpa melanggar aturan misi.

**Hint:** Rencanakan rute terlebih dahulu, lalu ubah menjadi instruksi.

**Feedback:**

* Berhasil: “Berhasil! Kamu merancang algoritmamu sendiri.”
* Belum berhasil: “Uji rute sedikit demi sedikit dan periksa titik saat robot menyimpang.”

## Level 3 — Pilih Instruksi

**Tujuan:** Siswa memilih informasi dan instruksi yang relevan.

**Materi:** Abstraksi membantu kita fokus pada informasi yang diperlukan untuk menyelesaikan masalah.

**Contoh:** Tampilkan beberapa instruksi dan pilih yang dibutuhkan untuk tujuan tertentu.

**Challenge:** Pilih instruksi yang diperlukan dari daftar pilihan.

**Kondisi dan batasan:**

* Instruksi relevan dan pengecoh harus jelas.
* Jangan menganggap solusi alternatif yang valid sebagai salah.

**Kriteria keberhasilan:** Pilihan memenuhi kebutuhan misi tanpa memasukkan instruksi yang tidak diperlukan.

**Hint:** Tanyakan apakah setiap instruksi membantu mencapai tujuan.

**Feedback:**

* Berhasil: “Bagus! Kamu fokus pada instruksi yang diperlukan.”
* Belum berhasil: “Periksa fungsi setiap instruksi terhadap tujuan.”

## Level 4 — Debugging Challenge

**Tujuan:** Siswa mendiagnosis kesalahan dan menguji perbaikannya.

**Materi:** Debugging dilakukan dengan membandingkan hasil program dengan tujuan.

**Contoh:** Telusuri program untuk menemukan langkah pertama yang salah.

**Challenge:** Perbaiki program yang gagal dan jalankan kembali.

**Kondisi dan batasan:**

* Kesalahan harus dapat ditemukan dengan konsep yang sudah diajarkan.
* Jangan memberikan solusi lengkap.
* Kesalahan tidak boleh berasal dari bug pada game.

**Kriteria keberhasilan:** Program yang diperbaiki memenuhi semua aturan misi.

**Hint:** Cari langkah pertama ketika hasil berbeda dari yang diharapkan.

**Feedback:**

* Berhasil: “Debugging berhasil! Kamu memperbaiki program melalui pengujian.”
* Belum berhasil: “Bandingkan hasil setiap langkah dengan rute yang seharusnya.”

## Level 5 — Misi Bertahap

**Tujuan:** Siswa memecah masalah menjadi beberapa tujuan kecil.

**Materi:** Masalah besar lebih mudah diselesaikan jika dibagi menjadi bagian-bagian yang teratur.

**Contoh:** Peragakan misi mengambil kunci sebelum menuju pintu.

**Challenge:** Selesaikan beberapa tujuan berurutan, misalnya mengambil kunci lalu mencapai pintu.

**Kondisi dan batasan:**

* Interaksi dengan objek dijelaskan.
* Permainan memeriksa bahwa tujuan pertama dipenuhi sebelum tujuan berikutnya.
* Gunakan blok yang sudah dipelajari.

**Kriteria keberhasilan:** Semua tujuan tercapai dalam urutan yang diwajibkan.

**Hint:** Tentukan tujuan yang harus diselesaikan terlebih dahulu.

**Feedback:**

* Berhasil: “Semua tujuan tercapai sesuai urutan!”
* Belum berhasil: “Periksa apakah setiap tujuan sudah dipenuhi sebelum melanjutkan.”

---

# KELAS 4 — DASAR PEMROGRAMAN BLOCKLY

Fokus: urutan program, perulangan, kondisi, dan integrasi dasar.

## Level 1 — Kenalan dengan Blockly

**Tujuan:** Siswa menyusun program menggunakan blok visual.

**Materi:** Blok Blockly disambungkan dalam urutan eksekusi.

**Contoh:** Susun blok awal dan blok maju, lalu jalankan robot.

**Challenge:** Susun program Blockly untuk mencapai target sederhana.

**Kondisi dan batasan:**

* Gunakan blok gerak dan urutan.
* Jangan membutuhkan perulangan, kondisi, atau variabel.

**Kriteria keberhasilan:** Robot mencapai tujuan.

**Hint:** Pastikan blok terhubung sesuai urutan yang ingin dijalankan.

**Feedback:**

* Berhasil: “Programmu berjalan dengan benar.”
* Belum berhasil: “Periksa urutan blok dan hasil setiap gerakan.”

## Level 2 — Tantangan Rute

**Tujuan:** Siswa membuat program gerak untuk rute dengan beberapa rintangan.

**Materi:** Program perlu direncanakan dan diuji dengan memperhatikan arah robot.

**Contoh:** Peragakan rute dengan beberapa belokan.

**Challenge:** Susun program Blockly untuk melewati rintangan.

**Kondisi dan batasan:**

* Gunakan blok yang sudah diajarkan.
* Semua rintangan terlihat jelas.
* Solusi alternatif diterima.

**Kriteria keberhasilan:** Robot mencapai target tanpa tabrakan.

**Hint:** Periksa arah robot setelah setiap belokan.

**Feedback:**

* Berhasil: “Rute berhasil diselesaikan.”
* Belum berhasil: “Cari titik ketika robot mulai menyimpang dari rute.”

## Level 3 — Perulangan

**Tujuan:** Siswa menggunakan perulangan untuk mengurangi instruksi berulang.

**Materi:** Perulangan menjalankan instruksi di dalamnya beberapa kali.

**Contoh:** Bandingkan tiga blok maju dengan satu perulangan yang menjalankan maju tiga kali.

**Challenge:** Gunakan perulangan untuk menyelesaikan rute dengan pola gerak berulang.

**Kondisi dan batasan:**

* Jelaskan jumlah pengulangan.
* Pastikan rute dapat diselesaikan menggunakan blok yang tersedia.
* Jika menguji efisiensi, tentukan batas jumlah blok.

**Kriteria keberhasilan:** Robot mencapai tujuan dan memenuhi batasan misi.

**Hint:** Cari bagian program yang mengulang gerakan yang sama.

**Feedback:**

* Berhasil: “Bagus! Kamu menggunakan perulangan.”
* Belum berhasil: “Periksa isi perulangan dan jumlah pengulangannya.”

## Level 4 — Logika Kondisi

**Tujuan:** Siswa membuat program yang merespons keadaan tertentu.

**Materi:** Kondisi `if/else` memungkinkan program memilih tindakan berdasarkan keadaan yang diperiksa.

**Contoh:** Gunakan kondisi seperti “ada jalan di depan” jika keadaan tersebut benar-benar didukung permainan.

**Challenge:** Buat program yang memilih tindakan berbeda berdasarkan kondisi permainan.

**Kondisi dan batasan:**

* Kondisi harus didukung engine.
* Jelaskan arti kondisi.
* Setiap cabang harus memiliki perilaku yang dapat diuji.

**Kriteria keberhasilan:** Program memilih tindakan sesuai keadaan dan mencapai tujuan.

**Hint:** Perhatikan keadaan yang diperiksa sebelum program memilih tindakan.

**Feedback:**

* Berhasil: “Tepat! Programmu merespons kondisi dengan benar.”
* Belum berhasil: “Periksa kondisi dan tindakan di setiap cabang.”

## Level 5 — Misi Pemrograman

**Tujuan:** Siswa menggabungkan urutan, perulangan, dan kondisi.

**Materi:** Beberapa konsep pemrograman dapat digunakan bersama untuk menyelesaikan misi.

**Contoh:** Peragakan program pendek yang menggunakan satu perulangan dan satu kondisi.

**Challenge:** Gabungkan urutan, perulangan, dan kondisi untuk menyelesaikan rute.

**Kondisi dan batasan:**

* Semua konsep telah diajarkan.
* Jangan menggunakan variabel jika belum diperkenalkan.
* Tujuan misi harus benar-benar memerlukan konsep tersebut.

**Kriteria keberhasilan:** Robot memenuhi tujuan dan merespons kondisi dengan benar.

**Hint:** Pisahkan gerakan yang berulang dari tindakan yang bergantung pada kondisi.

**Feedback:**

* Berhasil: “Mantap! Kamu menggabungkan beberapa konsep.”
* Belum berhasil: “Uji perulangan dan setiap cabang kondisi secara terpisah.”

---

# KELAS 5 — VARIABEL DAN STRATEGI

Fokus: perulangan dan kondisi kompleks, variabel, serta pemecahan masalah.

## Level 1 — Perulangan Kompleks

**Tujuan:** Siswa mengatur perulangan yang berisi beberapa instruksi.

**Materi:** Perulangan dapat menjalankan beberapa instruksi secara berulang.

**Contoh:** Peragakan dua gerakan yang diulang dalam pola yang sama.

**Challenge:** Gunakan perulangan yang berisi beberapa gerakan untuk menyelesaikan rute.

**Kondisi dan batasan:**

* Siswa sudah memahami perulangan dasar.
* Pola yang diulang harus jelas.
* Blok yang dibutuhkan tersedia.

**Kriteria keberhasilan:** Robot menyelesaikan rute tanpa tabrakan.

**Hint:** Periksa seluruh isi perulangan, bukan hanya jumlah pengulangannya.

**Feedback:**

* Berhasil: “Kamu mengatur pola berulang dengan tepat.”
* Belum berhasil: “Periksa urutan instruksi di dalam perulangan.”

## Level 2 — Kondisi Kompleks

**Tujuan:** Siswa menangani beberapa keadaan menggunakan kondisi.

**Materi:** Program dapat memilih tindakan berbeda untuk situasi yang berbeda.

**Contoh:** Demonstrasikan dua situasi dan tindakan yang sesuai untuk masing-masing situasi.

**Challenge:** Buat program yang menangani beberapa situasi dalam permainan.

**Kondisi dan batasan:**

* Gunakan kondisi yang didukung engine.
* Semua kemungkinan yang diuji dijelaskan.
* Setiap cabang harus memiliki tujuan yang jelas.

**Kriteria keberhasilan:** Program memberikan tindakan yang benar pada seluruh skenario uji.

**Hint:** Uji setiap kemungkinan keadaan dan amati cabang yang dijalankan.

**Feedback:**

* Berhasil: “Programmu menangani semua situasi yang diuji.”
* Belum berhasil: “Periksa cabang yang belum memberikan tindakan sesuai keadaan.”

## Level 3 — Variabel Mandiri

**Tujuan:** Siswa membuat dan menggunakan variabel dalam program.

**Materi:** Variabel menyimpan nilai yang dapat digunakan dan diubah selama program berjalan.

**Contoh:** Buat variabel penghitung mulai dari nol, lalu tambahkan satu saat robot mengambil objek.

**Challenge:** Buat variabel untuk menghitung objek yang dikumpulkan dan gunakan nilainya dalam keputusan program.

**Kondisi dan batasan:**

* Ajarkan pembuatan variabel, nilai awal, perubahan nilai, dan pembacaan nilai.
* Pengumpulan objek harus benar-benar mengubah variabel.
* Keputusan program harus menggunakan nilai variabel.

**Kriteria keberhasilan:** Nilai berubah sesuai interaksi dan digunakan untuk memenuhi tujuan.

**Hint:** Pikirkan kapan nilai dimulai, kapan berubah, dan kapan diperiksa.

**Feedback:**

* Berhasil: “Hebat! Kamu menggunakan variabel dalam program.”
* Belum berhasil: “Periksa nilai awal, perubahan nilai, dan bagian yang membaca nilainya.”

## Level 4 — Gabungan Logika

**Tujuan:** Siswa menggabungkan variabel, perulangan, dan kondisi.

**Materi:** Program dapat mengelola nilai yang berubah sambil menjalankan instruksi berulang dan memilih tindakan berdasarkan kondisi.

**Contoh:** Peragakan variabel penghitung yang bertambah di dalam perulangan lalu diperiksa oleh kondisi.

**Challenge:** Gabungkan variabel, perulangan, dan kondisi untuk menyelesaikan misi.

**Kondisi dan batasan:**

* Semua konsep telah diperkenalkan.
* Nilai awal dan aturan perubahan nilai jelas.
* Setiap konsep memiliki fungsi nyata dalam solusi.

**Kriteria keberhasilan:** Robot mencapai tujuan dan nilai variabel digunakan dengan benar.

**Hint:** Telusuri perubahan variabel setiap kali perulangan berjalan.

**Feedback:**

* Berhasil: “Bagus! Semua bagian programmu bekerja bersama.”
* Belum berhasil: “Periksa kapan nilai berubah dan kapan kondisi diperiksa.”

## Level 5 — Misi Strategis

**Tujuan:** Siswa merancang, menguji, dan memperbaiki program dengan beberapa tujuan.

**Materi:** Program kompleks lebih mudah diperbaiki jika diuji per bagian.

**Contoh:** Peragakan cara menguji satu bagian rute sebelum menjalankan program lengkap.

**Challenge:** Buat program untuk beberapa tujuan, jalankan, temukan penyebab kegagalan, dan perbaiki.

**Kondisi dan batasan:**

* Gunakan konsep yang telah dipelajari.
* Tujuan dan syarat harus jelas.
* Kesalahan yang disediakan harus bisa ditemukan melalui pengujian.

**Kriteria keberhasilan:** Semua tujuan tercapai dan batasan misi dipenuhi.

**Hint:** Uji satu bagian program terlebih dahulu.

**Feedback:**

* Berhasil: “Misi strategis selesai melalui perencanaan dan pengujian.”
* Belum berhasil: “Pilih satu bagian program untuk diperiksa lebih dahulu.”

---

# KELAS 6 — CODING CHALLENGE TERPADU

Fokus: efisiensi, kondisi bertingkat, manajemen objek, debugging terpadu. **Seluruh level Kelas 6 berupa tantangan Blockly (full challenge), tanpa kuis.**

## Level 1 — Algoritma Efisien

**Tujuan:** Siswa membandingkan solusi menggunakan ukuran efisiensi yang jelas.

**Materi:** Beberapa program dapat menyelesaikan masalah yang sama dengan jumlah blok atau langkah berbeda.

**Contoh:** Bandingkan dua program valid dan hitung jumlah bloknya.

**Challenge:** Selesaikan rute dengan batas jumlah blok (mis. 3 blok), sehingga perulangan wajib dipakai.

**Kondisi dan batasan:**

* Batas blok eksplisit dan dapat dihitung.
* Rute harus bisa diselesaikan.
* Jangan mengklaim solusi paling efisien tanpa metrik.

**Kriteria keberhasilan:** Robot mencapai tujuan dan memenuhi batas yang ditentukan.

**Hint:** Cari gerakan berulang yang dapat ditulis lebih ringkas.

**Feedback:**

* Berhasil: “Kamu memenuhi target dan batas efisiensi.”
* Belum berhasil: “Periksa apakah ada blok yang dapat disederhanakan.”

## Level 2 — Logika Bertingkat

**Tujuan:** Siswa memahami dan menguji kondisi yang saling berkaitan.

**Materi:** Kondisi dapat diperiksa lebih dari satu kali dalam satu program. Satu kondisi boleh ditaruh di dalam cabang kondisi lain (bertingkat).

**Contoh:** Jika ada batu di depan, jalankan cabang MAKA; di dalam cabang itu boleh ada pemeriksaan kondisi lagi.

**Challenge:** Rute dengan dua titik berbatu. Susun program berbasis JIKA agar robot menghindari keduanya dan sampai bintang.

**Kondisi dan batasan:**

* Engine mendukung kondisi (ada batu di depan) termasuk bersarang.
* Semua kondisi dijelaskan terlebih dahulu.
* Sediakan waktu menguji tiap cabang.

**Kriteria keberhasilan:** Program memilih cabang yang benar di kedua titik dan mencapai tujuan.

**Hint:** Telusuri kondisi dari bagian terluar menuju bagian di dalamnya.

**Feedback:**

* Berhasil: “Tepat! Kamu memahami logika bertingkat.”
* Belum berhasil: “Periksa kondisi mana yang dievaluasi terlebih dahulu.”

## Level 3 — Manajemen Kunci

**Tujuan:** Siswa mengelola beberapa nilai/tujuan dalam satu program.

**Materi:** Kunci harus diambil sebelum pintu bisa dibuka. Nilai "punya kunci" berubah saat robot menginjak petak kunci.

**Contoh:** Robot mengambil kunci di petak kunci, lalu melangkah ke pintu yang sebelumnya terkunci.

**Challenge:** Ambil kunci yang ada di jalur, lalu buka pintu dan capai bintang.

**Kondisi dan batasan:**

* Kunci diambil saat robot menginjak petak kunci.
* Pintu hanya bisa dilewati setelah kunci diambil.
* Setiap variabel/objek berpengaruh ke tujuan.

**Kriteria keberhasilan:** Kunci diambil lebih dulu, lalu robot melewati pintu dan mencapai bintang.

**Hint:** Periksa setiap tujuan secara terpisah, lalu perhatikan pengaruhnya terhadap keputusan.

**Feedback:**

* Berhasil: “Bagus! Kamu mengelola beberapa nilai dalam satu program.”
* Belum berhasil: “Periksa urutan: apakah kunci sudah diambil sebelum robot mencapai pintu?”

## Level 4 — Debugging Lanjutan

**Tujuan:** Siswa menemukan kesalahan pada program yang menggabungkan beberapa konsep.

**Materi:** Debugging terpadu memerlukan pemeriksaan urutan, perulangan, kondisi, dan perubahan nilai.

**Contoh:** Telusuri satu langkah program dan catat arah robot.

**Challenge:** Papan diisi program awal yang berisi satu kesalahan (blok belok keliru). Siswa menemukan dan memperbaikinya.

**Kondisi dan batasan:**

* Semua konsep sudah diajarkan.
* Kesalahan hanya satu blok dan konsisten.
* Program awal harus benar-benar gagal.

**Kriteria keberhasilan:** Program yang diperbaiki membawa robot ke bintang.

**Hint:** Telusuri satu langkah dan catat arah robot sebelum melanjutkan.

**Feedback:**

* Berhasil: “Debugging selesai! Programmu lolos pengujian.”
* Belum berhasil: “Periksa urutan eksekusi dan arah robot setelah setiap belok.”

## Level 5 — Misi Final CoFun

**Tujuan:** Siswa menggabungkan konsep yang dipelajari untuk menyelesaikan masalah terpadu.

**Materi:** Pemecahan masalah terpadu melibatkan perencanaan, perulangan, kondisi, pengujian, dan perbaikan.

**Contoh:** Pecah misi menjadi beberapa target kecil dan uji setiap bagian program.

**Challenge:** Rancang program untuk sampai bintang dengan batas blok dan rintangan.

**Kondisi dan batasan:**

* Semua konsep yang dibutuhkan sudah diajarkan.
* Tujuan dan aturan interaksi dijelaskan dengan jelas.
* Terima solusi berbeda jika seluruh syarat terpenuhi.

**Kriteria keberhasilan:** Robot menyelesaikan tujuan dan memenuhi seluruh batasan misi.

**Hint:** Pecah misi menjadi tujuan kecil dan uji program satu bagian setiap kali.

**Feedback:**

* Berhasil: “Misi Final CoFun berhasil! Kamu merancang, menguji, dan memperbaiki programmu.”
* Belum berhasil: “Pilih tujuan yang belum tercapai dan telusuri program yang memengaruhinya.”

---

# Integrasi Konsep Kecerdasan Artifisial (KA)

KA dimasukkan ke materi atau contoh pada level yang sesuai, terutama kelas 5–6. Tidak ada soal tambahan.

Konsep yang dapat dikenalkan:

1. **Pengenalan pola:** sistem dapat mencari pola dari contoh.
2. **Klasifikasi:** sistem dapat mengelompokkan objek berdasarkan pola yang dipelajari.
3. **Prediksi dan input:** hasil prediksi dapat berubah ketika input atau contoh berubah.
4. **Keterbatasan KA:** prediksi tidak selalu benar dan perlu diperiksa.

Gunakan demonstrasi singkat yang sesuai usia. Jika hanya menggunakan aturan tetap, jangan mengklaimnya sebagai model KA sungguhan. Demonstrasi KA tidak boleh menambah soal ke-31 atau memasukkan materi literasi digital.

---

# Standar Validasi dan Pengujian

Sebelum soal dimasukkan ke website, pastikan:

* [ ] Jumlah soal tepat 30.
* [ ] Setiap soal memiliki materi, contoh, challenge, kondisi awal, batasan, kriteria berhasil, hint, dan feedback.
* [ ] Konsep baru diajarkan sebelum digunakan.
* [ ] Semua blok yang dibutuhkan tersedia dan didukung oleh engine.
* [ ] Robot bergerak langkah demi langkah.
* [ ] Validator memeriksa hasil dan aturan misi, bukan hanya satu urutan blok.
* [ ] Solusi alternatif yang benar diterima.
* [ ] Hint tidak membocorkan solusi lengkap.
* [ ] Feedback membantu siswa memperbaiki kesalahan tanpa menyalahkan.
* [ ] Setiap soal diuji agar tidak ambigu dan benar-benar dapat diselesaikan.
* [ ] Pemetaan kompetensi diperiksa terhadap kurikulum yang berlaku.
* [ ] Konsep KA disisipkan pada materi atau contoh yang sudah ada.
* [ ] Tidak ada materi literasi digital.

**Catatan kurikulum:** Pembagian tantangan per kelas adalah rancangan CoFun, bukan klaim bahwa kurikulum menetapkan setiap kompetensi secara terpisah untuk tiap kelas. Pemetaan akhir perlu dicocokkan dengan capaian pembelajaran yang berlaku, khususnya Koding dan KA Fase C untuk kelas V–VI.

---

# Instruksi Penggunaan Dokumen

Gunakan dokumen ini untuk memperbarui konten soal pada proyek CoFun yang sudah ada.

**Jangan:**

* membangun ulang website;
* mengubah konsep utama CoFun;
* menambah soal atau level;
* menambahkan literasi digital;
* menambah fitur di luar kebutuhan pembelajaran.

**Lakukan:**

* cocokkan konten dengan mekanisme game yang tersedia;
* tandai jika suatu blok atau kondisi belum didukung;
* masukkan materi, contoh, challenge, hint, feedback, dan kriteria keberhasilan;
* uji semua 30 soal sebelum menyatakan pekerjaan selesai.
