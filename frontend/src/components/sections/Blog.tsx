import { ArrowRight } from "lucide-react";
import SectionLabel from "@/components/ui/SectionLabel";
import SectionHeading from "@/components/ui/SectionHeading";
import { BLOG_POSTS } from "@/lib/constants";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

async function getPosts() {
  try {
    const res = await fetch(`${API_URL}/api/blog`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) throw new Error();
    return await res.json();
  } catch {
    return BLOG_POSTS;
  }
}

export default async function Blog() {
  const posts = await getPosts();

  return (
    <section id="blog" className="relative py-40 px-6 md:px-12">
      <div className="section-divider absolute top-0 left-[10%] right-[10%]" />

      <div className="section-reveal relative mx-auto max-w-7xl">
        <SectionLabel>Aktualności</SectionLabel>
        <SectionHeading className="mt-4" subtitle="Co u nas słychać">
          Blog
        </SectionHeading>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post: any) => (
            <article
              key={post.id}
              className="card-hover rounded-2xl bg-bg-surface border border-white/5 overflow-hidden"
            >
              {/* Image */}
              <div className="aspect-[16/10] bg-gradient-to-br from-bg-surface-hover to-bg-surface flex items-center justify-center overflow-hidden">
                {post.image ? (
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
                <p className="text-text-secondary text-sm leading-relaxed mb-4">
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
    </section>
  );
}
