"use client";

// Penangkap error runtime (mis. database tidak siap): tampilkan pesan ramah
// alih-alih halaman error telanjang dari Next.js.
export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <main className="w-full pt-20 bg-background min-h-[calc(100vh-5rem)] flex items-center justify-center px-margin-mobile md:px-margin">
      <div className="max-w-md w-full bg-surface-container-lowest rounded-xl shadow-md p-space-lg flex flex-col items-center text-center gap-space-md border border-outline-variant/30">
        <div className="w-14 h-14 rounded-full bg-error-container/60 flex items-center justify-center text-error">
          <span className="material-symbols-outlined text-[32px]">error</span>
        </div>
        <h1 className="font-headline-md text-headline-md text-on-surface">
          Ada Masalah Sedikit
        </h1>
        <p className="font-body-md text-body-md text-on-surface-variant">
          CoFun sedang kesulitan memuat halaman ini. Coba muat ulang, ya —
          biasanya langsung beres!
        </p>
        <button
          className="min-h-11 flex items-center justify-center gap-1 px-space-md py-2 rounded-full bg-primary text-on-primary font-label-badge text-label-badge shadow-[0_3px_0_0_#004b73]"
          onClick={reset}
          type="button"
        >
          Coba Muat Ulang
        </button>
      </div>
    </main>
  );
}
