import type { LucideIcon } from "lucide-react";

export interface DisciplineItem {
  id: string;
  name: string;
  icon: LucideIcon;
  description: string;
  image: string;
  href?: string;
  highlight?: boolean;
}

// Zgodność wsteczna — stare importy dalej działają
export type Discipline = DisciplineItem;

export interface DisciplineCategory {
  id: string;
  name: string;
  subtitle: string;
  icon: LucideIcon;
  items: DisciplineItem[];
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
  highlight?: boolean;
  icon?: LucideIcon;
  children?: { label: string; href: string }[];
}

export type BlogBlock =
  | { type: "heading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "image"; url: string; caption?: string }
  | { type: "quote"; text: string; author?: string };

export interface BlogPost {
  id: string;
  title: string;
  subtitle?: string;
  excerpt: string;
  content?: string;
  blocks?: BlogBlock[];
  gallery?: string[];
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
