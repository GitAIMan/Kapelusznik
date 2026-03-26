"use client";

import dynamic from "next/dynamic";

const ContactMap = dynamic(() => import("@/components/ui/ContactMap"), {
  ssr: false,
  loading: () => (
    <div className="rounded-2xl overflow-hidden border border-white/[0.06] h-56 md:h-72 bg-bg-surface animate-pulse" />
  ),
});

export default function ContactMapWrapper() {
  return <ContactMap />;
}
