import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Contact from "@/components/sections/Contact";
import ContactMap from "@/components/ui/ContactMap";
import RouteCalculator from "@/components/sections/RouteCalculator";
import SectionLabel from "@/components/ui/SectionLabel";
import SectionHeading from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Kontakt | Kapelusznik | Kolektyw Artystyczny",
  description:
    "Skontaktuj się z kolektywem Kapelusznik. Zamów występ artystów ulicznych na swoje wydarzenie.",
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ sklad?: string | string[] }>;
}) {
  // ?sklad=Żonglerzy,Iluzjoniści (ze „Złóż swój skład” na podstronach Animacji)
  const { sklad } = await searchParams;
  const list = (Array.isArray(sklad) ? sklad[0] : sklad ?? "")
    .split(",")
    .map((s) => s.trim().slice(0, 40))
    .filter(Boolean)
    .slice(0, 12)
    .join(", ");
  const initialMessage = list ? `Interesuje mnie skład: ${list}.\n\nData i miejsce wydarzenia: ` : "";

  return (
    <div className="pt-28 pb-20">
      <div className="px-6 md:px-12 mb-6">
        <Link href="/" className="inline-flex items-center gap-2 text-text-muted hover:text-text transition-colors text-sm">
          <ArrowLeft className="h-4 w-4" />
          Strona główna
        </Link>
      </div>

      {/* Header */}
      <section className="relative px-6 md:px-12 pb-8">
        <div className="mx-auto max-w-4xl text-center">
          <SectionLabel>Kontakt</SectionLabel>
          <SectionHeading className="mt-4 flex flex-col items-center">
            Porozmawiajmy
          </SectionHeading>
          <p className="text-text-secondary text-base mt-4 max-w-lg mx-auto">
            Opisz swoje wydarzenie, wrócimy z propozycją programu. Odpowiadamy
            w ciągu 48 godzin.
          </p>
        </div>
      </section>

      {/* Formularz kontaktowy */}
      <Contact key={initialMessage} initialMessage={initialMessage} />

      {/* Mapa pod formularzem */}
      <section className="px-6 md:px-12 py-8">
        <div className="mx-auto max-w-5xl">
          <ContactMap />
        </div>
      </section>

      {/* Route calculator — ukryty do czasu dodania klucza ORS_API_KEY */}
      {/* <RouteCalculator /> */}
    </div>
  );
}
