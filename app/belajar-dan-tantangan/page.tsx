import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Arena from "./Arena";

export const metadata: Metadata = {
  title: "Belajar & Tantangan - CoFun",
};

export default function BelajarDanTantanganPage() {
  return (
    <>
      <main className="w-full pt-20 bg-background min-h-[calc(100vh-5rem)]">
        <Arena />
      </main>
      <Footer variant="arena" />
    </>
  );
}
