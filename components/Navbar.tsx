"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cofunLogoSrc } from "@/lib/assets";

const navLinks = [
  { href: "/beranda", label: "Beranda" },
  { href: "/pilih-kelas", label: "Pilih Kelas" },
  { href: "/peta-petualangan", label: "Peta Petualangan" },
  { href: "/belajar-dan-tantangan", label: "Belajar & Tantangan" },
];

const baseLink =
  "px-space-md py-space-xs rounded-full transition-all font-body-md text-body-md";

const inactiveLink =
  "text-on-surface-variant hover:bg-surface-container-highest hover:text-on-surface";

const activeLink =
  "bg-primary-container text-on-primary font-bold shadow-[0_3px_0_0_#004b73]";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 w-full z-50 bg-gradient-to-b from-surface-container-low to-surface-container-lowest/95 backdrop-blur-md shadow-[0_4px_16px_-4px_rgba(0,97,148,0.08)]">
      <div className="h-20 w-full px-margin flex items-center justify-between gap-gutter">
        <Link
          className="flex items-center gap-space-md shrink-0"
          href="/beranda"
        >
          <Image
            alt="CoFun Logo"
            className="h-8 w-auto object-contain"
            height={148}
            priority
            src={cofunLogoSrc}
            width={512}
          />
          <span className="flex flex-col">
            <span className="font-headline-md text-headline-md text-primary tracking-tight leading-none">
              CoFun
            </span>
            <span className="font-label-badge text-label-badge text-on-surface-variant uppercase tracking-wider">
              Coding Fun
            </span>
          </span>
        </Link>
        <nav className="hidden lg:flex items-center gap-space-sm bg-surface-container/60 p-space-xs rounded-full">
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
        <div className="flex items-center shrink-0">
          <div className="inline-flex items-center gap-space-xs bg-surface-container-high px-space-md py-space-xs rounded-full shadow-[0_2px_0_0_#bfc7d2] border border-outline-variant/30">
            <span className="material-symbols-outlined text-primary text-[18px]">
              code
            </span>
            <span className="font-label-badge text-label-badge text-primary font-bold tracking-wide">
              Made by: RPL Student
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
