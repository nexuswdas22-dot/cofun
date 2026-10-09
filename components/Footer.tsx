import Image from "next/image";
import { cofunLogoSrc } from "@/lib/assets";

type FooterProps = {
  variant?: "default" | "arena";
};

export default function Footer({ variant = "default" }: FooterProps) {
  const wrapper =
    variant === "arena"
      ? "w-full bg-surface-container-low py-space-lg mt-8 shadow-[0_-1px_8px_rgba(0,0,0,0.02)] border-t border-outline-variant/30"
      : "w-full bg-surface-container-low py-10 sm:py-space-xl shadow-[0_-1px_8px_rgba(0,0,0,0.02)]";

  return (
    <footer className={wrapper} id="kontak">
      <div className="w-full px-margin-mobile md:px-margin flex flex-col md:flex-row items-center justify-between gap-space-md">
        <div className="flex flex-wrap items-center justify-center gap-space-sm text-center">
          <Image
            alt="CoFun Logo"
            className="h-6 w-auto object-contain opacity-80"
            height={148}
            src={cofunLogoSrc}
            width={512}
          />
          <span className="font-body-sm text-body-sm text-on-surface-variant">
            CoFun © Belajar Koding Menyenangkan untuk SD
          </span>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-space-lg">
          <span className="font-body-sm text-body-sm text-on-surface-variant">
            Aman &amp; Terbimbing untuk Anak
          </span>
          <span className="inline-flex items-center gap-space-xs bg-surface-container-high px-space-md py-space-xs rounded-full shadow-[0_2px_0_0_#bfc7d2] border border-outline-variant/30">
            <span className="material-symbols-outlined text-primary text-[18px]">
              code
            </span>
            <span className="font-label-badge text-label-badge text-primary font-bold tracking-wide">
              Made by: RPL Student
            </span>
          </span>
        </div>
      </div>
    </footer>
  );
}
