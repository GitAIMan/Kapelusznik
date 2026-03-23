"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import SectionLabel from "@/components/ui/SectionLabel";
import SectionHeading from "@/components/ui/SectionHeading";
import { BLOG_POSTS } from "@/lib/constants";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export default function Blog() {
  const [posts, setPosts] = useState(BLOG_POSTS);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    fetch(`${API_URL}/api/blog`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data) => setPosts(data))
      .catch(() => {});
  }, []);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 2);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 2);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [checkScroll, posts]);

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.querySelector("article")?.offsetWidth || 350;
    el.scrollBy({ left: dir === "left" ? -cardWidth - 24 : cardWidth + 24, behavior: "smooth" });
  };

  return (
    <section id="blog" className="relative py-40 px-6 md:px-12">
      <div className="section-divider absolute top-0 left-[10%] right-[10%]" />

      <div className="section-reveal relative mx-auto max-w-7xl">
        <SectionLabel>Aktualności</SectionLabel>
        <SectionHeading className="mt-4" subtitle="Co u nas słychać">
          Blog
        </SectionHeading>

        {/* Slider container */}
        <div className="relative group">
          {/* Left fade */}
          <div
            className="absolute left-0 top-0 bottom-0 w-16 z-10 pointer-events-none transition-opacity duration-300"
            style={{
              background: "linear-gradient(to right, #1A1210, transparent)",
              opacity: canScrollLeft ? 1 : 0,
            }}
          />

          {/* Right fade */}
          <div
            className="absolute right-0 top-0 bottom-0 w-16 z-10 pointer-events-none transition-opacity duration-300"
            style={{
              background: "linear-gradient(to left, #1A1210, transparent)",
              opacity: canScrollRight ? 1 : 0,
            }}
          />

          {/* Left arrow */}
          <button
            onClick={() => scroll("left")}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-bg-surface/80 backdrop-blur-sm border border-white/10 flex items-center justify-center text-text-secondary hover:text-text hover:border-white/20 transition-all opacity-0 group-hover:opacity-100 disabled:opacity-0"
            disabled={!canScrollLeft}
            aria-label="Przewiń w lewo"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          {/* Right arrow */}
          <button
            onClick={() => scroll("right")}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-bg-surface/80 backdrop-blur-sm border border-white/10 flex items-center justify-center text-text-secondary hover:text-text hover:border-white/20 transition-all opacity-0 group-hover:opacity-100 disabled:opacity-0"
            disabled={!canScrollRight}
            aria-label="Przewiń w prawo"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Scrollable row */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto hide-scrollbar snap-x snap-mandatory pb-4 -mb-4"
          >
            {posts.map((post: any) => (
              <article
                key={post.id}
                className="card-hover snap-start shrink-0 w-[280px] md:w-[350px] rounded-2xl bg-bg-surface border border-white/5 overflow-hidden"
              >
                {/* Image */}
                <div className="aspect-[16/10] bg-gradient-to-br from-bg-surface-hover to-bg-surface flex items-center justify-center overflow-hidden">
                  {post.image && !post.image.includes("placeholder") ? (
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-text-muted text-xs uppercase tracking-wider">
                      Zdjęcie
                    </span>
                  )}
                </div>

                <div className="p-6">
                  <time className="text-text-muted text-xs uppercase tracking-wider">
                    {new Date(post.date).toLocaleDateString("pl-PL", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                  <h3 className="font-heading text-lg font-bold text-text mt-2 mb-3">
                    {post.title}
                  </h3>
                  <p className="text-text-secondary text-sm leading-relaxed mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <span className="inline-flex items-center gap-2 text-accent-gold text-sm font-semibold transition-colors hover:text-primary-light cursor-pointer">
                    Czytaj więcej
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
