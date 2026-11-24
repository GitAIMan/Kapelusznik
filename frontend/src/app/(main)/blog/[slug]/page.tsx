"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ChevronRight, X } from "lucide-react";
import { BLOG_POSTS } from "@/lib/constants";
import type { BlogPost, BlogBlock } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export default function BlogPostPage() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;

  const [post, setPost] = useState<BlogPost | null>(null);
  const [otherPosts, setOtherPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [lightbox, setLightbox] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;

    fetch(`${API_URL}/api/blog/${slug}`)
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data) => {
        setPost(data);
        setLoading(false);
      })
      .catch(() => {
        const fallback = BLOG_POSTS.find((p) => p.slug === slug) || null;
        setPost(fallback);
        setLoading(false);
      });

    fetch(`${API_URL}/api/blog`)
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data) => {
        if (Array.isArray(data)) {
          setOtherPosts(data.filter((p: BlogPost) => p.slug !== slug).slice(0, 2));
        }
      })
      .catch(() => {});
  }, [slug]);

  const closeLightbox = useCallback(() => setLightbox(null), []);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, closeLightbox]);

  if (loading) {
    return (
      <div className="pt-32 pb-20 px-6">
        <div className="mx-auto max-w-3xl">
          <div className="h-4 w-32 bg-bg-surface rounded mb-12 animate-pulse" />
          <div className="h-10 w-3/4 bg-bg-surface rounded mb-4 animate-pulse" />
          <div className="h-4 w-40 bg-bg-surface rounded mb-12 animate-pulse" />
          <div className="h-64 bg-bg-surface rounded-2xl mb-12 animate-pulse" />
          <div className="space-y-4">
            <div className="h-4 bg-bg-surface rounded animate-pulse" />
            <div className="h-4 bg-bg-surface rounded w-5/6 animate-pulse" />
            <div className="h-4 bg-bg-surface rounded w-4/6 animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="pt-32 pb-20 px-6 text-center">
        <p className="text-text-muted text-lg mb-6">Post nie został znaleziony.</p>
        <Link href="/blog" className="text-accent-gold hover:text-primary-light transition-colors">
          ← Wróć do bloga
        </Link>
      </div>
    );
  }

  const formattedDate = new Date(post.date).toLocaleDateString("pl-PL", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const blocks: BlogBlock[] = Array.isArray(post.blocks) ? post.blocks : [];
  const gallery: string[] = Array.isArray(post.gallery) ? post.gallery : [];

  // Fallback: brak bloków → render content jako akapity
  const fallbackParagraphs =
    blocks.length === 0
      ? (post.content || post.excerpt).split("\n").filter((p) => p.trim())
      : [];

  return (
    <article className="pt-28 pb-20">
      {/* Header */}
      <header className="relative px-6 md:px-12 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/3 w-[500px] h-[500px] rounded-full bg-primary/6 blur-[70px]" />
        </div>

        <div className="relative mx-auto max-w-[680px]">
          <nav className="flex items-center gap-2 text-sm text-text-muted mb-10">
            <Link href="/blog" className="transition-colors hover:text-text">
              Blog
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-text-secondary line-clamp-1">{post.title}</span>
          </nav>

          <time className="text-xs text-accent-gold/70 uppercase tracking-[0.15em] font-medium">
            {formattedDate}
          </time>

          <h1 className="font-heading text-3xl md:text-5xl font-bold text-text mt-3 mb-6 leading-[1.15] tracking-tight">
            {post.title}
          </h1>

          {/* Lead / subtitle */}
          {post.subtitle && (
            <p className="text-lg md:text-xl font-light text-text/85 leading-[1.6] mb-10">
              {post.subtitle}
            </p>
          )}
        </div>
      </header>

      {/* Hero image — POD tytułem i leadem */}
      {post.image && (
        <div className="px-6 md:px-12 mb-14">
          <div className="mx-auto max-w-4xl">
            <div className="relative rounded-2xl overflow-hidden border border-white/[0.04] bg-bg-surface flex items-center justify-center">
              <img
                src={post.image}
                alt={post.title}
                className="w-full max-h-[600px] object-contain"
              />
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="px-6 md:px-12">
        <div className="mx-auto max-w-[680px]">
          <div className="w-12 h-px bg-accent-gold/30 mb-10" />

          <div className="space-y-6">
            {blocks.length > 0 ? (
              blocks.map((block, i) => {
                if (block.type === "heading") {
                  return (
                    <h2
                      key={i}
                      className="font-heading text-2xl md:text-3xl font-bold text-text mt-10 mb-2 leading-tight"
                    >
                      {block.text}
                    </h2>
                  );
                }
                if (block.type === "paragraph") {
                  return (
                    <p
                      key={i}
                      className="text-text-secondary leading-[1.85] text-base"
                    >
                      {block.text}
                    </p>
                  );
                }
                if (block.type === "image") {
                  return (
                    <figure key={i} className="my-10 -mx-2 md:-mx-8">
                      <button
                        type="button"
                        onClick={() => setLightbox(block.url)}
                        className="block w-full rounded-xl overflow-hidden border border-white/[0.04] bg-bg-surface"
                      >
                        <img
                          src={block.url}
                          alt={block.caption || ""}
                          className="w-full max-h-[560px] object-contain mx-auto"
                        />
                      </button>
                      {block.caption && (
                        <figcaption className="text-center text-text-muted text-sm italic mt-3">
                          {block.caption}
                        </figcaption>
                      )}
                    </figure>
                  );
                }
                if (block.type === "quote") {
                  return (
                    <blockquote
                      key={i}
                      className="border-l-2 border-accent-gold pl-6 my-8 py-1"
                    >
                      <p className="text-lg md:text-xl text-text italic leading-[1.6] font-light">
                        {block.text}
                      </p>
                      {block.author && (
                        <footer className="text-sm text-text-muted mt-3 not-italic">
                          {block.author}
                        </footer>
                      )}
                    </blockquote>
                  );
                }
                return null;
              })
            ) : (
              fallbackParagraphs.map((paragraph, i) => (
                <p
                  key={i}
                  className={`text-text-secondary leading-[1.85] ${
                    i === 0 ? "text-lg font-light text-text/90" : "text-base"
                  }`}
                >
                  {paragraph}
                </p>
              ))
            )}
          </div>

          <div className="flex items-center gap-3 mt-14 mb-10">
            <div className="h-px flex-1 bg-gradient-to-r from-accent-gold/20 to-transparent" />
            <span className="text-accent-gold/40 text-xs">◆</span>
            <div className="h-px flex-1 bg-gradient-to-l from-accent-gold/20 to-transparent" />
          </div>
        </div>
      </div>

      {/* Gallery */}
      {gallery.length > 0 && (
        <section className="px-6 md:px-12 mb-16">
          <div className="mx-auto max-w-4xl">
            <h2 className="font-heading text-xl font-bold text-text mb-6">
              Galeria
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {gallery.map((url, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setLightbox(url)}
                  className="aspect-square rounded-lg overflow-hidden bg-bg-surface border border-white/[0.06] hover:border-accent-gold/30 transition-colors group"
                >
                  <img
                    src={url}
                    alt=""
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Back link */}
      <div className="px-6 md:px-12 mb-14">
        <div className="mx-auto max-w-[680px]">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-text-muted hover:text-accent-gold transition-colors text-sm"
          >
            <ArrowLeft className="h-4 w-4" />
            Wróć do bloga
          </Link>
        </div>
      </div>

      {/* Related posts */}
      {otherPosts.length > 0 && (
        <section className="px-6 md:px-12 mt-6">
          <div className="section-divider mx-auto max-w-4xl mb-14" />

          <div className="mx-auto max-w-4xl">
            <h2 className="font-heading text-xl font-bold text-text mb-8">
              Inne wpisy
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {otherPosts.map((related) => (
                <Link
                  key={related.id}
                  href={`/blog/${related.slug}`}
                  className="group block rounded-xl overflow-hidden bg-bg-surface border border-white/[0.06] hover:border-accent-gold/20 transition-all card-hover"
                >
                  <div className="h-36 overflow-hidden bg-gradient-to-br from-bg-surface-hover to-bg-surface flex items-center justify-center">
                    {related.image ? (
                      <img
                        src={related.image}
                        alt={related.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <span className="text-text-muted/20 text-xs uppercase tracking-widest">
                        Zdjęcie
                      </span>
                    )}
                  </div>

                  <div className="p-6">
                    <time className="text-xs text-text-muted uppercase tracking-wider">
                      {new Date(related.date).toLocaleDateString("pl-PL", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>

                    <h3 className="font-heading text-base font-bold text-text mt-2 mb-2 group-hover:text-accent-gold transition-colors">
                      {related.title}
                    </h3>

                    <span className="inline-flex items-center gap-1.5 text-xs text-accent-gold font-medium group-hover:gap-2.5 transition-all">
                      Czytaj
                      <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Lightbox */}
      {lightbox && (
        <div
          onClick={closeLightbox}
          className="fixed inset-0 z-[100] bg-bg/95 backdrop-blur-sm flex items-center justify-center p-6 cursor-zoom-out"
        >
          <button
            type="button"
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-text-muted hover:text-text p-2 rounded-full bg-bg-surface/80"
            aria-label="Zamknij"
          >
            <X className="h-5 w-5" />
          </button>
          <img
            src={lightbox}
            alt=""
            onClick={(e) => e.stopPropagation()}
            className="max-w-full max-h-full object-contain rounded-lg cursor-default"
          />
        </div>
      )}
    </article>
  );
}
