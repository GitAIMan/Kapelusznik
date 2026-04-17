"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { MapPin, Clock, Route as RouteIcon, Search } from "lucide-react";
import SectionLabel from "@/components/ui/SectionLabel";
import SectionHeading from "@/components/ui/SectionHeading";

const RouteMap = dynamic(() => import("./RouteMap"), {
  ssr: false,
  loading: () => (
    <div className="rounded-2xl border border-white/[0.06] h-72 md:h-96 bg-bg-surface animate-pulse" />
  ),
});

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

interface RouteResult {
  distance_km: number;
  duration_min: number;
  from: { lat: number; lng: number; label: string };
  to: { lat: number; lng: number };
  geometry: [number, number][];
}

function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes} min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m === 0 ? `${h} h` : `${h} h ${m} min`;
}

export default function RouteCalculator() {
  const [origin, setOrigin] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<RouteResult | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = origin.trim();
    if (trimmed.length < 3) return;

    setError("");
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch(`${API_URL}/api/route`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ origin: trimmed }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Nie udało się obliczyć trasy");
      } else {
        setResult(data);
      }
    } catch {
      setError("Błąd połączenia");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative px-6 md:px-12 py-16">
      <div className="mx-auto max-w-5xl">
        <div className="text-center mb-10">
          <SectionLabel>Dojazd</SectionLabel>
          <SectionHeading className="mt-4 flex flex-col items-center">
            Sprawdź, ile zajmuje dojazd
          </SectionHeading>
          <p className="text-text-secondary text-base mt-4 max-w-lg mx-auto">
            Wpisz swój adres — pokażemy odległość i czas przejazdu do Bielska-Białej.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto mb-10">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-text-muted pointer-events-none" />
              <input
                type="text"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                placeholder="np. Warszawa, Marszałkowska 1"
                className="w-full bg-bg-surface border border-white/10 text-text rounded-lg pl-12 pr-4 py-3.5 focus:border-accent-gold focus:outline-none"
                maxLength={200}
              />
            </div>
            <button
              type="submit"
              disabled={loading || origin.trim().length < 3}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-accent-gold/15 text-accent-gold border border-accent-gold/40 rounded-lg font-semibold hover:bg-accent-gold/25 hover:border-accent-gold/60 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Search className="h-4 w-4" />
              {loading ? "Liczę..." : "Oblicz dojazd"}
            </button>
          </div>
          {error && (
            <p className="mt-3 text-red-400 text-sm text-center">{error}</p>
          )}
        </form>

        {/* Result */}
        {result && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
              <div className="bg-bg-surface border border-white/[0.06] rounded-xl p-6 flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-accent-gold/10 flex items-center justify-center shrink-0">
                  <RouteIcon className="h-6 w-6 text-accent-gold" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-text-muted mb-1">
                    Dystans
                  </div>
                  <div className="font-heading text-2xl font-bold text-text">
                    {result.distance_km} km
                  </div>
                </div>
              </div>
              <div className="bg-bg-surface border border-white/[0.06] rounded-xl p-6 flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-accent-gold/10 flex items-center justify-center shrink-0">
                  <Clock className="h-6 w-6 text-accent-gold" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-text-muted mb-1">
                    Czas przejazdu
                  </div>
                  <div className="font-heading text-2xl font-bold text-text">
                    {formatDuration(result.duration_min)}
                  </div>
                </div>
              </div>
            </div>

            <p className="text-center text-text-muted text-sm">
              Z: <span className="text-text-secondary">{result.from.label}</span>{" "}
              → Bielsko-Biała
            </p>

            <RouteMap from={result.from} to={result.to} geometry={result.geometry} />
          </div>
        )}
      </div>
    </section>
  );
}
