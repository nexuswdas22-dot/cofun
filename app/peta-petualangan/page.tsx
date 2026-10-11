import { redirect } from "next/navigation";
import { defaultKelasSlug } from "@/lib/types";

export default function PetaPetualanganPage() {
  redirect(`/peta-petualangan/${defaultKelasSlug}`);
}
