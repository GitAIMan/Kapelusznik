import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  children: React.ReactNode;
  subtitle?: string;
  className?: string;
}

export default function SectionHeading({
  children,
  subtitle,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("mb-12", className)}>
      <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-text tracking-tight mb-4">
        {children}
      </h2>
      {subtitle && (
        <p className="text-text-secondary text-lg max-w-2xl">{subtitle}</p>
      )}
      <div className="mt-6 flex items-center gap-3">
        <div className="h-0.5 w-12 bg-gradient-to-r from-accent-gold to-primary rounded-full" />
        <div className="h-0.5 w-3 bg-accent-gold/40 rounded-full" />
        <div className="h-0.5 w-1.5 bg-accent-gold/20 rounded-full" />
      </div>
    </div>
  );
}
