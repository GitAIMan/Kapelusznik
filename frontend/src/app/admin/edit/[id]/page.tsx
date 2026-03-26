"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { apiGet, apiPut, apiUpload } from "@/lib/api";
import { ArrowLeft, Upload } from "lucide-react";
import ImageCropper from "@/components/ui/ImageCropper";

export default function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const { token, isVerified, isLoading } = useAuth();

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState("");
  const [image, setImage] = useState("");
  const [rawImage, setRawImage] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) return;
    apiGet(`/api/blog/${id}`, token)
      .then((post) => {
        setTitle(post.title);
        setSlug(post.slug);
        setContent(post.content);
        setDate(post.date?.split("T")[0] || "");
        setImage(post.image || "");
      })
      .catch(() => setError("Nie udało się załadować posta"))
      .finally(() => setLoading(false));
  }, [token, id]);

  if (isLoading || loading) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
      </div>
    );
  }

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
      await apiPut(`/api/blog/${id}`, { title, slug, excerpt, content, date, image }, token);
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
          <h1 className="font-heading text-3xl font-bold text-text">Edytuj post</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
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

          <div>
            <label className="block text-text-secondary text-sm mb-2">Slug (URL)</label>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="w-full bg-bg-surface border border-white/10 text-text rounded-lg px-4 py-3 focus:border-primary focus:outline-none font-mono text-sm"
              required
            />
          </div>

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

          <div>
            <label className="block text-text-secondary text-sm mb-2">Zdjęcie</label>
            <div className="flex items-center gap-4">
              <label className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-text-secondary rounded-lg px-4 py-2.5 hover:bg-white/10 transition-colors cursor-pointer text-sm">
                <Upload className="h-4 w-4" />
                {uploading ? "Wgrywanie..." : "Zmień zdjęcie"}
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

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <div className="flex items-center gap-4">
            <button
              type="submit"
              disabled={saving}
              className="bg-primary text-bg font-semibold rounded-lg px-8 py-3 hover:bg-primary-light transition-colors disabled:opacity-50"
            >
              {saving ? "Zapisuję..." : "Zapisz zmiany"}
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
