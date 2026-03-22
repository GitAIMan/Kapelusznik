import type { LucideIcon } from "lucide-react";

export interface Discipline {
  id: string;
  name: string;
  icon: LucideIcon;
  description: string;
  image: string;
}

export interface TimelineStep {
  number: string;
  title: string;
  description: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface StatItem {
  value: string;
  label: string;
}

export interface ContactInfo {
  icon: LucideIcon;
  label: string;
  value: string;
  href?: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  image: string;
  slug: string;
}

export interface DisciplineDetails {
  longDescription: string;
  quote: string;
  quoteAuthor: string;
  history: string;
  galleryImages: string[];
  artists: DisciplineArtist[];
}

export interface DisciplineArtist {
  name: string;
  role: string;
  image: string;
}
