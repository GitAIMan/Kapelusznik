import { ArrowRight } from "lucide-react";
import type { ContactInfo } from "@/types";

export default function ContactCard({ icon: Icon, label, value, href }: ContactInfo) {
  const Wrapper = href ? "a" : "div";
  const wrapperProps = href
    ? { href, target: href.startsWith("http") ? "_blank" as const : undefined, rel: href.startsWith("http") ? "noopener noreferrer" : undefined }
    : {};

  return (
    <Wrapper
      {...wrapperProps}
      className="group card-hover flex items-center gap-5 rounded-xl border border-white/5 bg-bg-surface/80 p-5 transition-all hover:bg-bg-surface-hover hover:border-white/10"
    >
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-accent-gold/15 to-accent-gold/5 ring-1 ring-accent-gold/10">
        <Icon className="h-5 w-5 text-accent-gold" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-xs text-text-muted uppercase tracking-wide">{label}</p>
        <p className="text-text truncate">{value}</p>
      </div>
      {href && (
        <ArrowRight className="h-4 w-4 text-text-muted opacity-0 transition-opacity group-hover:opacity-100" />
      )}
    </Wrapper>
  );
}
