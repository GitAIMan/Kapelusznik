"use client";

import { useState } from "react";
import { ArrowUp, ArrowDown, Trash2, Upload, Heading2, Type, Image as ImageIcon, Quote, Plus } from "lucide-react";
import type { BlogBlock } from "@/types";
import { apiUpload } from "@/lib/api";
import ImageCropper from "@/components/ui/ImageCropper";

interface BlockEditorProps {
  blocks: BlogBlock[];
  onChange: (blocks: BlogBlock[]) => void;
  token: string;
}

const ADD_OPTIONS: { type: BlogBlock["type"]; label: string; icon: typeof Heading2 }[] = [
  { type: "heading", label: "Nagłówek", icon: Heading2 },
  { type: "paragraph", label: "Akapit", icon: Type },
  { type: "image", label: "Zdjęcie", icon: ImageIcon },
  { type: "quote", label: "Cytat", icon: Quote },
];

function createBlock(type: BlogBlock["type"]): BlogBlock {
  switch (type) {
    case "heading": return { type: "heading", text: "" };
    case "paragraph": return { type: "paragraph", text: "" };
    case "image": return { type: "image", url: "", caption: "" };
    case "quote": return { type: "quote", text: "", author: "" };
  }
}

export default function BlockEditor({ blocks, onChange, token }: BlockEditorProps) {
  const [addMenuOpen, setAddMenuOpen] = useState(false);
  const [cropperIndex, setCropperIndex] = useState<number | null>(null);
  const [rawImage, setRawImage] = useState<string | null>(null);
  const [uploading, setUploading] = useState<number | null>(null);

  const updateBlock = (i: number, patch: Partial<BlogBlock>) => {
    const next = [...blocks];
    next[i] = { ...next[i], ...patch } as BlogBlock;
    onChange(next);
  };

  const removeBlock = (i: number) => {
    onChange(blocks.filter((_, idx) => idx !== i));
  };

  const moveBlock = (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= blocks.length) return;
    const next = [...blocks];
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  };

  const addBlock = (type: BlogBlock["type"]) => {
    onChange([...blocks, createBlock(type)]);
    setAddMenuOpen(false);
  };

  const handleFileSelect = (i: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setRawImage(reader.result as string);
      setCropperIndex(i);
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const handleCropDone = async (blob: Blob) => {
    if (cropperIndex === null) return;
    const idx = cropperIndex;
    setRawImage(null);
    setCropperIndex(null);
    setUploading(idx);
    try {
      const file = new File([blob], "cropped.jpg", { type: "image/jpeg" });
      const { url } = await apiUpload(file, token);
      updateBlock(idx, { url } as Partial<BlogBlock>);
    } catch (err) {
      console.error(err);
      alert("Błąd uploadu zdjęcia");
    } finally {
      setUploading(null);
    }
  };

  return (
    <div className="space-y-3">
      {rawImage && (
        <ImageCropper
          imageSrc={rawImage}
          onCropDone={handleCropDone}
          onCancel={() => {
            setRawImage(null);
            setCropperIndex(null);
          }}
        />
      )}

      {blocks.map((block, i) => (
        <div
          key={i}
          className="group relative bg-bg-surface border border-white/[0.06] rounded-lg p-4"
        >
          {/* Controls */}
          <div className="absolute right-2 top-2 flex items-center gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
            <button
              type="button"
              onClick={() => moveBlock(i, -1)}
              disabled={i === 0}
              className="p-1.5 text-text-muted hover:text-text disabled:opacity-30 disabled:cursor-not-allowed"
              title="W górę"
            >
              <ArrowUp className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={() => moveBlock(i, 1)}
              disabled={i === blocks.length - 1}
              className="p-1.5 text-text-muted hover:text-text disabled:opacity-30 disabled:cursor-not-allowed"
              title="W dół"
            >
              <ArrowDown className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={() => removeBlock(i)}
              className="p-1.5 text-text-muted hover:text-red-400"
              title="Usuń"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Type label */}
          <div className="text-[10px] uppercase tracking-widest text-accent-gold/60 mb-2 font-medium">
            {block.type === "heading" && "Nagłówek"}
            {block.type === "paragraph" && "Akapit"}
            {block.type === "image" && "Zdjęcie"}
            {block.type === "quote" && "Cytat"}
          </div>

          {/* Body */}
          {block.type === "heading" && (
            <input
              type="text"
              value={block.text}
              onChange={(e) => updateBlock(i, { text: e.target.value } as Partial<BlogBlock>)}
              placeholder="Tekst nagłówka"
              className="w-full bg-transparent border-0 text-text font-heading text-xl font-bold focus:outline-none pr-20"
            />
          )}

          {block.type === "paragraph" && (
            <textarea
              value={block.text}
              onChange={(e) => updateBlock(i, { text: e.target.value } as Partial<BlogBlock>)}
              placeholder="Treść akapitu..."
              rows={4}
              className="w-full bg-transparent border-0 text-text focus:outline-none resize-y pr-20"
            />
          )}

          {block.type === "quote" && (
            <div className="space-y-2 pr-20">
              <textarea
                value={block.text}
                onChange={(e) => updateBlock(i, { text: e.target.value } as Partial<BlogBlock>)}
                placeholder="Treść cytatu..."
                rows={2}
                className="w-full bg-transparent border-l-2 border-accent-gold/40 pl-3 text-text italic focus:outline-none resize-y"
              />
              <input
                type="text"
                value={block.author || ""}
                onChange={(e) => updateBlock(i, { author: e.target.value } as Partial<BlogBlock>)}
                placeholder="Autor (opcjonalnie)"
                className="w-full bg-transparent border-0 text-text-secondary text-sm focus:outline-none pl-3"
              />
            </div>
          )}

          {block.type === "image" && (
            <div className="space-y-3 pr-20">
              {block.url ? (
                <div className="relative">
                  <img src={block.url} alt="" className="rounded-lg max-h-60 object-contain bg-bg" />
                </div>
              ) : (
                <div className="h-32 rounded-lg border border-dashed border-white/10 flex items-center justify-center text-text-muted text-sm">
                  Brak zdjęcia
                </div>
              )}
              <div className="flex items-center gap-3">
                <label className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-text-secondary rounded-lg px-3 py-2 hover:bg-white/10 transition-colors cursor-pointer text-xs">
                  <Upload className="h-3.5 w-3.5" />
                  {uploading === i ? "Wgrywanie..." : block.url ? "Zmień" : "Wybierz plik"}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileSelect(i, e)}
                    className="hidden"
                    disabled={uploading === i}
                  />
                </label>
              </div>
              <input
                type="text"
                value={block.caption || ""}
                onChange={(e) => updateBlock(i, { caption: e.target.value } as Partial<BlogBlock>)}
                placeholder="Podpis (opcjonalnie)"
                className="w-full bg-transparent border-0 text-text-secondary text-sm italic focus:outline-none"
              />
            </div>
          )}
        </div>
      ))}

      {/* Add button + menu */}
      <div className="relative">
        {addMenuOpen ? (
          <div className="bg-bg-surface border border-white/10 rounded-lg p-2 flex flex-wrap gap-2">
            {ADD_OPTIONS.map((opt) => (
              <button
                key={opt.type}
                type="button"
                onClick={() => addBlock(opt.type)}
                className="inline-flex items-center gap-2 px-3 py-2 text-sm text-text-secondary hover:text-text hover:bg-white/5 rounded-md transition-colors"
              >
                <opt.icon className="h-4 w-4" />
                {opt.label}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setAddMenuOpen(false)}
              className="inline-flex items-center px-3 py-2 text-xs text-text-muted hover:text-text"
            >
              Anuluj
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setAddMenuOpen(true)}
            className="w-full inline-flex items-center justify-center gap-2 border border-dashed border-white/10 hover:border-accent-gold/30 text-text-muted hover:text-accent-gold rounded-lg py-3 text-sm transition-colors"
          >
            <Plus className="h-4 w-4" />
            Dodaj blok
          </button>
        )}
      </div>
    </div>
  );
}
