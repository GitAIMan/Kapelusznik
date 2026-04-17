"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { apiPost } from "@/lib/api";
import PostEditor from "@/components/admin/PostEditor";

export default function NewPostPage() {
  const router = useRouter();
  const { token, isVerified, isLoading } = useAuth();

  if (isLoading) return null;
  if (!isVerified || !token) {
    router.push("/admin");
    return null;
  }

  const handleSubmit = async (values: any) => {
    await apiPost("/api/blog", values, token);
    router.push("/admin");
  };

  return <PostEditor mode="new" token={token} onSubmit={handleSubmit} />;
}
