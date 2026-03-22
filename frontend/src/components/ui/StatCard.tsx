import type { StatItem } from "@/types";

export default function StatCard({ value, label }: StatItem) {
  return (
    <div className="gradient-border card-hover rounded-2xl bg-bg-surface/80 p-8 text-center backdrop-blur-sm">
      <p className="font-heading text-3xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-accent-gold to-primary bg-clip-text text-transparent">
        {value}
      </p>
      <p className="mt-3 text-sm text-text-secondary uppercase tracking-wider">{label}</p>
    </div>
  );
}
