"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";
import { apiUpload } from "@/lib/api";
import ImageCropper from "@/components/ui/ImageCropper";

interface GalleryEditorProps {
  gallery: string[];
  onChange: (gallery: string[]) => void;
  token: string;
}

export default function GalleryEditor({ gallery, onChange, token }: GalleryEditorProps) {
  const [rawImage, setRawImage] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

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
      const file = new File([blob], "gallery.jpg", { type: "image/jpeg" });
      const { url } = await apiUpload(file, token);
      onChange([...gallery, url]);
    } catch (err) {
      console.error(err);
      alert("Błąd uploadu zdjęcia");
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (i: number) => {
    if (!confirm("Usunąć zdjęcie z galerii?")) return;
    onChange(gallery.filter((_, idx) => idx !== i));
  };

  return (
    <div className="space-y-3">
      {rawImage && (
        <ImageCropper
          imageSrc={rawImage}
          onCropDone={handleCropDone}
          onCancel={() => setRawImage(null)}
        />
      )}

      {gallery.length > 0 && (
        <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
          {gallery.map((url, i) => (
            <div
              key={i}
              className="relative group aspect-square rounded-lg overflow-hidden bg-bg-surface border border-white/[0.06]"
            >
              <img src={url} alt="" className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => removeImage(i)}
                className="absolute top-1.5 right-1.5 bg-bg/80 backdrop-blur-sm text-text hover:text-red-400 rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
                title="Usuń"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}

      <label className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-text-secondary rounded-lg px-4 py-2.5 hover:bg-white/10 transition-colors cursor-pointer text-sm">
        <Plus className="h-4 w-4" />
        {uploading ? "Wgrywanie..." : "Dodaj zdjęcie"}
        <input
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
          disabled={uploading}
        />
      </label>
    </div>
  );
}
