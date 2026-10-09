"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cofunLogoSrc } from "@/lib/assets";

const navLinks = [
  { href: "/beranda", label: "Home" },
  { href: "#tentang", label: "Tentang" },
  { href: "#materi", label: "Materi" },
  { href: "#cara-belajar", label: "Cara Belajar" },
  { href: "#kontak", label: "Kontak" },
];

const FULL_PATH = "/beranda";

const baseLink =
  "px-space-md py-space-xs rounded-full transition-all font-body-md text-body-md";

const inactiveLink =
  "text-on-surface-variant hover:bg-surface-container-highest hover:text-on-surface";

const activeLink =
  "bg-primary-container text-on-primary font-bold shadow-[0_3px_0_0_#004b73]";

const ctaClass =
  "group inline-flex items-center justify-center gap-space-xs bg-primary hover:bg-primary-container text-on-primary font-headline-sm text-headline-sm px-space-lg py-2 rounded-full shadow-[0_4px_0_0_#004b73] active:translate-y-1 active:shadow-[0_1px_0_0_#004b73] transition-all";

function Logo() {
  return (
    <Link
      className="flex items-center gap-space-sm sm:gap-space-md shrink-0 min-w-0"
      href="/beranda"
    >
      <Image
        alt="CoFun Logo"
        className="h-7 sm:h-8 w-auto object-contain"
        height={148}
        priority
        src={cofunLogoSrc}
        width={512}
      />
      <span className="flex flex-col min-w-0">
        <span className="font-headline-sm sm:font-headline-md text-headline-sm sm:text-headline-md text-primary tracking-tight leading-none">
          CoFun
        </span>
        <span className="hidden sm:block font-label-badge text-label-badge text-on-surface-variant uppercase tracking-wider">
          Coding Fun
        </span>
      </span>
    </Link>
  );
}

function CtaLink({ className = "" }: { className?: string }) {
  return (
    <Link className={`${ctaClass} ${className}`} href="/pilih-kelas">
      <span className="material-symbols-outlined text-[20px] group-hover:rotate-12 transition-transform">
        rocket_launch
      </span>
      <span>Mulai Bermain</span>
      <span className="material-symbols-outlined text-[18px]">
        arrow_forward
      </span>
    </Link>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const full = pathname === FULL_PATH || pathname === "/";
  const [open, setOpen] = useState(false);
  const [prevPath, setPrevPath] = useState(pathname);

  if (prevPath !== pathname) {
    setPrevPath(pathname);
    setOpen(false);
  }

  if (!full) {
    return (
      <header className="fixed top-0 w-full z-50 bg-gradient-to-b from-surface-container-low to-surface-container-lowest/95 backdrop-blur-md shadow-[0_4px_16px_-4px_rgba(0,97,148,0.08)]">
        <div className="h-20 w-full px-margin-mobile md:px-margin flex items-center justify-between gap-gutter">
          <Logo />
        </div>
      </header>
    );
  }

  return (
    <header className="fixed top-0 w-full z-50 bg-gradient-to-b from-surface-container-low to-surface-container-lowest/95 backdrop-blur-md shadow-[0_4px_16px_-4px_rgba(0,97,148,0.08)]">
      <div className="h-20 w-full px-margin-mobile md:px-margin flex items-center justify-between gap-gutter">
        <Logo />
        <nav className="hidden lg:flex flex-1 items-center justify-center gap-space-sm bg-surface-container/60 p-space-xs rounded-full mx-space-lg">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                aria-current={active ? "page" : undefined}
                className={`${baseLink} ${active ? activeLink : inactiveLink}`}
                href={link.href}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-space-sm shrink-0">
          <CtaLink className="hidden lg:inline-flex" />
          <button
            aria-expanded={open}
            aria-label={open ? "Tutup menu" : "Buka menu"}
            className="lg:hidden w-11 h-11 shrink-0 rounded-full bg-surface-container-high hover:bg-surface-container-highest text-primary flex items-center justify-center shadow-[0_2px_0_0_#bfc7d2] transition-colors"
            onClick={() => setOpen((value) => !value)}
            type="button"
          >
            <span className="material-symbols-outlined text-[24px]">
              {open ? "close" : "menu"}
            </span>
          </button>
        </div>
      </div>

      {open && (
        <nav className="lg:hidden max-h-[70vh] overflow-y-auto bg-surface-container-lowest border-t border-outline-variant/40 px-margin-mobile md:px-margin py-space-md flex flex-col gap-space-xs shadow-[0_12px_24px_-12px_rgba(0,97,148,0.18)] animate-slide-down">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                aria-current={active ? "page" : undefined}
                className={`flex items-center min-h-11 px-space-md py-3 rounded-xl font-body-lg text-body-lg transition-colors ${
                  active
                    ? "bg-primary-container text-on-primary font-bold"
                    : "text-on-surface hover:bg-surface-container"
                }`}
                href={link.href}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            );
          })}
          <CtaLink className="mt-space-xs w-full" />
        </nav>
      )}
    </header>
  );
}
