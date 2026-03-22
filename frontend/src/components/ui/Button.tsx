import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";

type Variant = "primary" | "gold" | "ghost";

type ButtonProps = {
  variant?: Variant;
  href?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-gradient-to-br from-primary to-accent-violet text-text shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:scale-[1.03] active:scale-[0.98]",
  gold: "bg-gradient-to-br from-accent-gold to-accent-orange text-bg shadow-lg shadow-accent-gold/20 hover:shadow-xl hover:shadow-accent-gold/30 hover:scale-[1.03] active:scale-[0.98]",
  ghost:
    "bg-transparent border border-white/10 text-text-secondary hover:text-text hover:border-white/25 hover:bg-white/[0.03] active:scale-[0.98]",
};

export default function Button({
  variant = "primary",
  href,
  className,
  children,
  ...props
}: ButtonProps) {
  const styles = cn(
    "inline-flex items-center justify-center gap-2 rounded-full px-8 py-3.5 font-semibold text-sm tracking-wide transition-all duration-200 cursor-pointer",
    variantStyles[variant],
    className
  );

  if (href) {
    return (
      <a
        href={href}
        className={styles}
        {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {children}
      </a>
    );
  }

  return (
    <button className={styles} {...props}>
      {children}
    </button>
  );
}
