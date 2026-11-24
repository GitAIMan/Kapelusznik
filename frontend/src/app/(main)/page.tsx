import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import AboutContent from "@/components/sections/AboutContent";
import TrustedBy from "@/components/sections/TrustedBy";

export const metadata: Metadata = {
  title: "Kapelusznik — Kolektyw Artystyczny z Bielska-Białej",
  description:
    "Kolektyw artystów ulicznych z Bielska-Białej. Ogień, akrobatyka, lalkarstwo, highline — spektakle, które publiczność pamięta latami.",
};

export default function Home() {
  return (
    <>
      <Hero />
      <TrustedBy />
      <AboutContent />
    </>
  );
}
