"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { apiGet, apiDelete } from "@/lib/api";
import { Flame, Plus, Pencil, Trash2, LogOut, ArrowLeft } from "lucide-react";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  image: string;
  slug: string;
}

function LoginForm({ onLogin }: { onLogin: (password: string) => Promise<void> }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await onLogin(password);
    } catch {
      setError("Nieprawidłowe hasło");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent-violet flex items-center justify-center shadow-lg shadow-primary/30">
            <Flame className="h-7 w-7 text-text" />
          </div>
        </div>
        <form onSubmit={handleSubmit} className="bg-bg-surface border border-white/5 rounded-2xl p-8">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Hasło"
            className="w-full bg-bg border border-white/10 text-text rounded-lg px-4 py-3 focus:border-primary focus:outline-none placeholder:text-text-muted mb-4"
            autoFocus
          />
          {error && <p className="text-red-400 text-sm mb-4">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-bg font-semibold rounded-lg px-6 py-3 hover:bg-primary-light transition-colors disabled:opacity-50"
          >
            {loading ? "Logowanie..." : "Wejdź"}
          </button>
        </form>
      </div>
    </div>
  );
}

function Dashboard({ token, onLogout }: { token: string; onLogout: () => void }) {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      const data = await apiGet("/api/blog", token);
      setPosts(data);
    } catch (err) {
      console.error("Error fetching posts:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleDelete = async (id: number, title: string) => {
    if (!confirm(`Usunąć post "${title}"?`)) return;
    try {
      await apiDelete(`/api/blog/${id}`, token);
      setPosts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error("Error deleting post:", err);
    }
  };

  return (
    <div className="min-h-screen bg-bg">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-text-muted hover:text-text transition-colors">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <h1 className="font-heading text-3xl font-bold text-text">Panel Admina</h1>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/admin/new"
              className="inline-flex items-center gap-2 bg-primary text-bg font-semibold rounded-lg px-5 py-2.5 hover:bg-primary-light transition-colors text-sm"
            >
              <Plus className="h-4 w-4" />
              Nowy post
            </Link>
            <button
              onClick={onLogout}
              className="inline-flex items-center gap-2 text-text-muted hover:text-text transition-colors text-sm px-3 py-2.5"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Posts list */}
        {loading ? (
          <p className="text-text-muted">Ładowanie...</p>
        ) : posts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-text-muted mb-4">Brak postów</p>
            <Link
              href="/admin/new"
              className="inline-flex items-center gap-2 text-accent-gold hover:text-primary-light transition-colors text-sm font-semibold"
            >
              <Plus className="h-4 w-4" />
              Dodaj pierwszy post
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => (
              <div
                key={post.id}
                className="bg-bg-surface border border-white/5 rounded-2xl p-6 flex items-center justify-between gap-6"
              >
                <div className="min-w-0 flex-1">
                  <h3 className="font-heading text-lg font-semibold text-text truncate">
                    {post.title}
                  </h3>
                  <p className="text-text-muted text-sm mt-1">
                    {new Date(post.date).toLocaleDateString("pl-PL", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                  <p className="text-text-secondary text-sm mt-2 line-clamp-1">
                    {post.excerpt}
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Link
                    href={`/admin/edit/${post.id}`}
                    className="p-2.5 rounded-lg bg-white/5 text-text-secondary hover:text-text hover:bg-white/10 transition-colors"
                  >
                    <Pencil className="h-4 w-4" />
                  </Link>
                  <button
                    onClick={() => handleDelete(post.id, post.title)}
                    className="p-2.5 rounded-lg bg-white/5 text-text-secondary hover:text-red-400 hover:bg-red-400/10 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function AdminPage() {
  const { token, isVerified, isLoading, login, logout } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!isVerified || !token) {
    return <LoginForm onLogin={login} />;
  }

  return <Dashboard token={token} onLogout={logout} />;
}
