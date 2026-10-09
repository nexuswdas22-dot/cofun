import { redirect } from "next/navigation";
import { defaultKelasSlug } from "@/lib/curriculum";

export default function PetaPetualanganPage() {
  redirect(`/peta-petualangan/${defaultKelasSlug}`);
}
