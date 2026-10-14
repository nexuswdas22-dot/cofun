import Link from "next/link";
import Footer from "@/components/Footer";

// Halaman 404: rute tidak dikenal / level tidak ada.
export default function NotFound() {
  return (
    <>
      <main className="w-full pt-20 bg-background min-h-[calc(100vh-5rem)] flex items-center justify-center px-margin-mobile md:px-margin">
        <div className="max-w-md w-full bg-surface-container-lowest rounded-xl shadow-md p-space-lg flex flex-col items-center text-center gap-space-md border border-outline-variant/30">
          <div className="w-14 h-14 rounded-full bg-surface-container-high flex items-center justify-center text-primary">
            <span className="material-symbols-outlined text-[32px]">explore_off</span>
          </div>
          <h1 className="font-headline-md text-headline-md text-on-surface">
            Halaman Tidak Ditemukan
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Ups, jalur yang kamu tuju tidak ada. Ayo kembali dan lanjut
            petualanganmu dari peta!
          </p>
          <Link
            className="min-h-11 flex items-center justify-center gap-1 px-space-md py-2 rounded-full bg-primary text-on-primary font-label-badge text-label-badge shadow-[0_3px_0_0_#004b73]"
            href="/beranda"
          >
            Kembali ke Beranda
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
