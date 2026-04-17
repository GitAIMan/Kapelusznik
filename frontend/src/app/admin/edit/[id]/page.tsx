"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { apiGet, apiPut } from "@/lib/api";
import PostEditor, { type PostEditorValues } from "@/components/admin/PostEditor";

export default function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const { token, isVerified, isLoading } = useAuth();

  const [initial, setInitial] = useState<Partial<PostEditorValues> | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    if (!token) return;
    apiGet(`/api/blog/${id}`, token)
      .then((post) => {
        setInitial({
          title: post.title ?? "",
          subtitle: post.subtitle ?? "",
          slug: post.slug ?? "",
          date: post.date?.split("T")[0] ?? "",
          image: post.image ?? "",
          blocks: Array.isArray(post.blocks) ? post.blocks : [],
          gallery: Array.isArray(post.gallery) ? post.gallery : [],
        });
      })
      .catch(() => setLoadError("Nie udało się załadować posta"))
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

  if (loadError) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center text-red-400">
        {loadError}
      </div>
    );
  }

  const handleSubmit = async (values: any) => {
    await apiPut(`/api/blog/${id}`, values, token);
    router.push("/admin");
  };

  return <PostEditor mode="edit" token={token} initial={initial || undefined} onSubmit={handleSubmit} />;
}
