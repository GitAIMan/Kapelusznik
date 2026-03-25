"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { apiPost, apiUpload } from "@/lib/api";
import { ArrowLeft, Upload } from "lucide-react";
import ImageCropper from "@/components/ui/ImageCropper";

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

export default function NewPostPage() {
  const router = useRouter();
  const { token, isVerified, isLoading } = useAuth();

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [slugManual, setSlugManual] = useState(false);
  const [content, setContent] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [image, setImage] = useState("");
  const [rawImage, setRawImage] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!slugManual) setSlug(slugify(title));
  }, [title, slugManual]);

  if (isLoading) return null;
  if (!isVerified || !token) {
    router.push("/admin");
    return null;
  }

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
      const excerpt = content.slice(0, 150).trim() + (content.length > 150 ? "..." : "");
      await apiPost("/api/blog", { title, slug, excerpt, content, date, image }, token);
      router.push("/admin");
    } catch (err: any) {
      setError(err.message || "Błąd zapisu");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg">
      {/* Cropper overlay */}
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
          <h1 className="font-heading text-3xl font-bold text-text">Nowy post</h1>
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

          {/* Image upload */}
          <div>
            <label className="block text-text-secondary text-sm mb-2">Zdjęcie</label>
            <div className="flex items-center gap-4">
              <label className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-text-secondary rounded-lg px-4 py-2.5 hover:bg-white/10 transition-colors cursor-pointer text-sm">
                <Upload className="h-4 w-4" />
                {uploading ? "Wgrywanie..." : "Wybierz plik"}
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

          {/* Content */}
          <div>
            <label className="block text-text-secondary text-sm mb-2">Treść</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={12}
              className="w-full bg-bg-surface border border-white/10 text-text rounded-lg px-4 py-3 focus:border-primary focus:outline-none resize-y"
              required
            />
          </div>

          {/* Error */}
          {error && <p className="text-red-400 text-sm">{error}</p>}

          {/* Submit */}
          <div className="flex items-center gap-4">
            <button
              type="submit"
              disabled={saving}
              className="bg-primary text-bg font-semibold rounded-lg px-8 py-3 hover:bg-primary-light transition-colors disabled:opacity-50"
            >
              {saving ? "Zapisuję..." : "Opublikuj"}
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
