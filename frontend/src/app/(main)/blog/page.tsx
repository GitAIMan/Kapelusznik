"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionLabel from "@/components/ui/SectionLabel";
import SectionHeading from "@/components/ui/SectionHeading";
import { BLOG_POSTS } from "@/lib/constants";
import type { BlogPost } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>(BLOG_POSTS);

  useEffect(() => {
    fetch(`${API_URL}/api/blog`)
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) setPosts(data);
      })
      .catch(() => {});
  }, []);

  return (
    <div className="pt-28 pb-20">
      {/* Header */}
      <section className="relative px-6 md:px-12 pb-16">
        <div className="mx-auto max-w-4xl text-center">
          <SectionLabel>Blog</SectionLabel>
          <SectionHeading className="mt-4 flex flex-col items-center">
            Aktualności
          </SectionHeading>
          <p className="text-text-secondary text-base mt-4 max-w-lg mx-auto">
            Relacje z wydarzeń, kulisy przygotowań i nowości z kolektywu.
          </p>
        </div>
      </section>

      {/* Posts grid — staggered 2-column */}
      <section className="px-6 md:px-12">
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {posts.map((post, i) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className={`group block rounded-xl overflow-hidden bg-bg-surface border border-white/[0.06] hover:border-accent-gold/20 transition-all card-hover ${
                  i === 0 ? "md:col-span-2" : ""
                }`}
              >
                {/* Image placeholder */}
                <div className={`bg-gradient-to-br from-bg-surface-hover to-bg-surface flex items-center justify-center ${
                  i === 0 ? "h-56 md:h-72" : "h-44"
                }`}>
                  <span className="text-text-muted text-xs uppercase tracking-widest">
                    Zdjęcie
                  </span>
                </div>

                <div className="p-6 md:p-8">
                  <time className="text-xs text-text-muted uppercase tracking-wider">
                    {new Date(post.date).toLocaleDateString("pl-PL", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>

                  <h3 className={`font-heading font-bold text-text mt-2 mb-3 group-hover:text-accent-gold transition-colors ${
                    i === 0 ? "text-2xl" : "text-lg"
                  }`}>
                    {post.title}
                  </h3>

                  <p className="text-text-muted text-sm leading-relaxed line-clamp-3 mb-4">
                    {post.excerpt}
                  </p>

                  <span className="inline-flex items-center gap-2 text-sm text-accent-gold font-medium group-hover:gap-3 transition-all">
                    Czytaj więcej
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {posts.length === 0 && (
            <p className="text-center text-text-muted text-sm py-20">
              Brak wpisów na blogu.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
