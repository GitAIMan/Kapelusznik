import { notFound } from "next/navigation";
import AnimacjaTemplate from "@/components/sections/AnimacjaTemplate";
import { ANIMACJE_PAGES, getAnimacja } from "@/lib/animacje";

export const dynamicParams = false;

export async function generateStaticParams() {
  return ANIMACJE_PAGES.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = getAnimacja(slug);
  if (!page) return {};
  return {
    title: `${page.name} — Kapelusznik`,
    description: page.lead.slice(0, 155),
  };
}

export default async function AnimacjaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = getAnimacja(slug);
  if (!page) notFound();
  return <AnimacjaTemplate page={page} />;
}
