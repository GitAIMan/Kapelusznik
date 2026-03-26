"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import SectionLabel from "@/components/ui/SectionLabel";
import SectionHeading from "@/components/ui/SectionHeading";
import { BLOG_POSTS } from "@/lib/constants";
import type { BlogPost } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export default function BlogCarousel() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [slidesInView, setSlidesInView] = useState<number[]>([]);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    slidesToScroll: 1,
    containScroll: false,
  });

  // Fetch posts
  useEffect(() => {
    fetch(`${API_URL}/api/blog`)
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) setPosts(data);
        else setPosts(BLOG_POSTS);
      })
      .catch(() => setPosts(BLOG_POSTS));
  }, []);

  // Coverflow transforms
  const [slideStyles, setSlideStyles] = useState<Record<number, React.CSSProperties>>({});

  const updateSlideStyles = useCallback(() => {
    if (!emblaApi) return;
    const engine = emblaApi.internalEngine();
    const scrollProgress = emblaApi.scrollProgress();
    const slides = emblaApi.slideNodes();
    const styles: Record<number, React.CSSProperties> = {};

    slides.forEach((_, index) => {
      let diff = emblaApi.scrollSnapList()[index] - scrollProgress;

      // Handle loop wrapping
      if (engine.options.loop) {
        const snapLength = emblaApi.scrollSnapList().length;
        if (diff > 0.5) diff -= 1;
        if (diff < -0.5) diff += 1;
      }

      const absDiff = Math.abs(diff);
      const maxRotation = 10;
      const rotation = diff * maxRotation * -1;
      const scale = Math.max(0.8, 1 - absDiff * 0.2);
      const opacity = Math.max(0.4, 1 - absDiff * 0.5);
      const translateZ = -absDiff * 100;

      styles[index] = {
        transform: `perspective(800px) rotateY(${rotation}deg) scale(${scale}) translateZ(${translateZ}px)`,
        opacity,
        zIndex: Math.round((1 - absDiff) * 10),
        transition: "transform 0.1s ease-out, opacity 0.1s ease-out",
      };
    });

    setSlideStyles(styles);
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    updateSlideStyles();
    emblaApi.on("scroll", updateSlideStyles);
    emblaApi.on("reInit", updateSlideStyles);
    return () => {
      emblaApi.off("scroll", updateSlideStyles);
      emblaApi.off("reInit", updateSlideStyles);
    };
  }, [emblaApi, updateSlideStyles]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  if (posts.length === 0) return null;

  return (
    <section className="relative py-20 overflow-hidden">
      <div className="section-divider absolute top-0 left-[10%] right-[10%]" />

      <div className="section-reveal mx-auto max-w-7xl px-6 md:px-12">
        <div className="text-center mb-12">
          <SectionLabel>Aktualności</SectionLabel>
          <SectionHeading className="mt-4 flex flex-col items-center">
            Z naszego bloga
          </SectionHeading>
        </div>
      </div>

      {/* Carousel */}
      <div className="relative mx-auto max-w-6xl" style={{ perspective: "1000px" }}>
        <div ref={emblaRef} className="overflow-hidden px-6">
          <div className="flex gap-6">
            {posts.map((post, i) => (
              <div
                key={post.id}
                className="flex-[0_0_300px] md:flex-[0_0_360px] min-w-0"
                style={slideStyles[i] || {}}
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className="group block rounded-2xl overflow-hidden bg-bg-surface border border-white/[0.06] hover:border-accent-gold/25 transition-colors"
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    {post.image ? (
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-bg-surface-hover to-accent-violet/15 flex items-center justify-center">
                        <span className="text-text-muted/25 text-xs uppercase tracking-widest">
                          Zdjęcie
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <time className="text-[11px] text-text-muted uppercase tracking-wider">
                      {new Date(post.date).toLocaleDateString("pl-PL", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>

                    <h3 className="font-heading text-base font-bold text-text mt-2 mb-3 line-clamp-2 group-hover:text-accent-gold transition-colors">
                      {post.title}
                    </h3>

                    <span className="inline-flex items-center gap-1.5 text-xs text-accent-gold font-medium group-hover:gap-2.5 transition-all">
                      Czytaj więcej
                      <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Gradient fades on edges */}
        <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-bg to-transparent pointer-events-none z-20" />
        <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-bg to-transparent pointer-events-none z-20" />
      </div>

      {/* Navigation arrows */}
      <div className="flex items-center justify-center gap-4 mt-8">
        <button
          onClick={scrollPrev}
          className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-text-muted hover:text-accent-gold hover:border-accent-gold/30 transition-all cursor-pointer"
          aria-label="Poprzedni"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={scrollNext}
          className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-text-muted hover:text-accent-gold hover:border-accent-gold/30 transition-all cursor-pointer"
          aria-label="Następny"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </section>
  );
}
