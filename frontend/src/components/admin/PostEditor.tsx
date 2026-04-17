"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Upload } from "lucide-react";
import { apiUpload } from "@/lib/api";
import ImageCropper from "@/components/ui/ImageCropper";
import BlockEditor from "./BlockEditor";
import GalleryEditor from "./GalleryEditor";
import type { BlogBlock } from "@/types";

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[ąà]/g, "a")
    .replace(/[ćč]/g, "c")
    .replace(/[ęè]/g, "e")
    .replace(/[łl]/g, "l")
    .replace(/[ńñ]/g, "n")
    .replace(/[óò]/g, "o")
    .replace(/[śš]/g, "s")
    .replace(/[źżž]/g, "z")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export interface PostEditorValues {
  title: string;
  subtitle: string;
  slug: string;
  date: string;
  image: string;
  blocks: BlogBlock[];
  gallery: string[];
}

interface PostEditorProps {
  mode: "new" | "edit";
  token: string;
  initial?: Partial<PostEditorValues>;
  onSubmit: (values: PostEditorValues & { excerpt: string; content: string }) => Promise<void>;
}

export default function PostEditor({ mode, token, initial, onSubmit }: PostEditorProps) {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [subtitle, setSubtitle] = useState(initial?.subtitle ?? "");
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [slugManual, setSlugManual] = useState(mode === "edit");
  const [date, setDate] = useState(initial?.date ?? new Date().toISOString().split("T")[0]);
  const [image, setImage] = useState(initial?.image ?? "");
  const [blocks, setBlocks] = useState<BlogBlock[]>(initial?.blocks ?? []);
  const [gallery, setGallery] = useState<string[]>(initial?.gallery ?? []);

  const [rawImage, setRawImage] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!slugManual) setSlug(slugify(title));
  }, [title, slugManual]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setRawImage(reader.result as string);
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const handleCropDone = async (blob: Blob) => {
    setRawImage(null);
    setUploading(true);
    try {
      const file = new File([blob], "cropped.jpg", { type: "image/jpeg" });
      const { url } = await apiUpload(file, token);
      setImage(url);
    } catch (err: any) {
      setError(err.message || "Błąd uploadu zdjęcia");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSaving(true);
    try {
      // excerpt + content generowane z bloków (fallback do subtitle)
      const textFromBlocks = blocks
        .map((b) => {
          if (b.type === "paragraph" || b.type === "heading") return b.text;
          if (b.type === "quote") return b.text;
          return "";
        })
        .filter(Boolean)
        .join("\n\n");

      const content = textFromBlocks || subtitle || title;
      const excerptSource = subtitle || textFromBlocks;
      const excerpt = excerptSource.slice(0, 150).trim() + (excerptSource.length > 150 ? "..." : "");

      await onSubmit({
        title,
        subtitle,
        slug,
        date,
        image,
        blocks,
        gallery,
        excerpt: excerpt || title,
        content,
      });
    } catch (err: any) {
      setError(err.message || "Błąd zapisu");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg">
      {rawImage && (
        <ImageCropper
          imageSrc={rawImage}
          onCropDone={handleCropDone}
          onCancel={() => setRawImage(null)}
        />
      )}

      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="flex items-center gap-4 mb-10">
          <Link href="/admin" className="text-text-muted hover:text-text transition-colors">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="font-heading text-3xl font-bold text-text">
            {mode === "new" ? "Nowy post" : "Edytuj post"}
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-text-secondary text-sm mb-2">Tytuł</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-bg-surface border border-white/10 text-text rounded-lg px-4 py-3 focus:border-primary focus:outline-none"
              required
            />
          </div>

          {/* Subtitle / lead */}
          <div>
            <label className="block text-text-secondary text-sm mb-2">
              Podtytuł / lead <span className="text-text-muted">(opcjonalnie)</span>
            </label>
            <textarea
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              rows={2}
              placeholder="Krótkie wprowadzenie pod tytułem..."
              className="w-full bg-bg-surface border border-white/10 text-text rounded-lg px-4 py-3 focus:border-primary focus:outline-none resize-y"
            />
          </div>

          {/* Slug */}
          <div>
            <label className="block text-text-secondary text-sm mb-2">Slug (URL)</label>
            <input
              type="text"
              value={slug}
              onChange={(e) => {
                setSlug(e.target.value);
                setSlugManual(true);
              }}
              className="w-full bg-bg-surface border border-white/10 text-text rounded-lg px-4 py-3 focus:border-primary focus:outline-none font-mono text-sm"
              required
            />
          </div>

          {/* Date */}
          <div>
            <label className="block text-text-secondary text-sm mb-2">Data</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full bg-bg-surface border border-white/10 text-text rounded-lg px-4 py-3 focus:border-primary focus:outline-none"
              required
            />
          </div>

          {/* Main image */}
          <div>
            <label className="block text-text-secondary text-sm mb-2">Zdjęcie główne</label>
            <div className="flex items-center gap-4">
              <label className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-text-secondary rounded-lg px-4 py-2.5 hover:bg-white/10 transition-colors cursor-pointer text-sm">
                <Upload className="h-4 w-4" />
                {uploading ? "Wgrywanie..." : image ? "Zmień zdjęcie" : "Wybierz plik"}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                  disabled={uploading}
                />
              </label>
            </div>
            {image && (
              <img src={image} alt="Preview" className="mt-3 rounded-lg max-h-40 object-cover" />
            )}
          </div>

          {/* Blocks editor */}
          <div>
            <label className="block text-text-secondary text-sm mb-2">Treść</label>
            <BlockEditor blocks={blocks} onChange={setBlocks} token={token} />
          </div>

          {/* Gallery */}
          <div>
            <label className="block text-text-secondary text-sm mb-2">
              Galeria zdjęć <span className="text-text-muted">(dodatkowe zdjęcia pod treścią)</span>
            </label>
            <GalleryEditor gallery={gallery} onChange={setGallery} token={token} />
          </div>

          {/* Error */}
          {error && <p className="text-red-400 text-sm">{error}</p>}

          {/* Submit */}
          <div className="flex items-center gap-4 pt-4">
            <button
              type="submit"
              disabled={saving}
              className="bg-primary text-bg font-semibold rounded-lg px-8 py-3 hover:bg-primary-light transition-colors disabled:opacity-50"
            >
              {saving ? "Zapisuję..." : mode === "new" ? "Opublikuj" : "Zapisz zmiany"}
            </button>
            <Link href="/admin" className="text-text-muted hover:text-text transition-colors text-sm">
              Anuluj
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
