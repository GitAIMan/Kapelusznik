import { cn } from "@/lib/utils";

interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
}

export default function SectionLabel({ children, className }: SectionLabelProps) {
  return (
    <span
      className={cn(
        "text-accent-gold text-xs font-semibold uppercase tracking-[0.3em]",
        className
      )}
    >
      {children}
    </span>
  );
}
