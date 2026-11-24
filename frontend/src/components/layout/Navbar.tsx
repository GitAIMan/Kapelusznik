"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import { NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const scrollY = useScrollPosition();
  const scrolled = scrollY > 50;

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
    document.body.style.overflow = isOpen ? "" : "hidden";
  };

  const closeMenu = () => {
    setIsOpen(false);
    document.body.style.overflow = "";
  };

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-[60] transition-all duration-300",
          isOpen
            ? "bg-bg"
            : scrolled
              ? "bg-bg/95 border-b border-white/[0.06] shadow-lg shadow-black/20"
              : "bg-transparent"
        )}
      >
        <div className="mx-auto max-w-7xl flex items-center justify-between px-6 md:px-12 h-20">
          {/* Logo */}
          <Link href="/" onClick={closeMenu} className="flex items-center shrink-0">
            <div className="h-11 w-11 rounded-full overflow-hidden ring-[1.5px] ring-accent-gold/30 hover:ring-accent-gold/60 transition-all">
              <Image
                src="/images/logo.jpg"
                alt="Kapelusznik"
                width={44}
                height={44}
                className="h-full w-full object-cover"
                priority
              />
            </div>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden lg:flex items-center gap-1.5">
            {NAV_LINKS.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-lg transition-all",
                    link.highlight
                      ? "px-4 py-2 text-xs font-bold uppercase tracking-wider text-accent-gold bg-gradient-to-r from-accent-gold/20 via-accent-gold/10 to-accent-gold/20 border border-accent-gold/50 animate-nav-glow hover:from-accent-gold/30 hover:via-accent-gold/20 hover:to-accent-gold/30 hover:text-primary-light"
                      : "px-4 py-2 text-sm text-text-secondary hover:text-text hover:bg-white/[0.04]"
                  )}
                >
                  {Icon && <Icon className="h-4 w-4 animate-icon-pulse text-accent-gold" />}
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Desktop CTA + Mobile hamburger */}
          <div className="flex items-center gap-4">
            {/* CTA — desktop only */}
            <Link
              href="/kontakt"
              className="hidden lg:inline-flex items-center px-5 py-2.5 text-sm font-medium rounded-lg bg-accent-gold/10 text-accent-gold border border-accent-gold/25 hover:bg-accent-gold/20 hover:border-accent-gold/40 transition-all"
            >
              Zamów występ
            </Link>

            {/* Hamburger — mobile only */}
            <button
              onClick={toggleMenu}
              className="relative flex lg:hidden h-10 w-10 flex-col items-center justify-center gap-1.5 cursor-pointer"
              aria-label={isOpen ? "Zamknij menu" : "Otwórz menu"}
            >
              <span
                className={cn(
                  "block h-0.5 w-6 bg-text transition-transform duration-300",
                  isOpen && "translate-y-2 rotate-45"
                )}
              />
              <span
                className={cn(
                  "block h-0.5 w-6 bg-text transition-opacity duration-300",
                  isOpen && "opacity-0"
                )}
              />
              <span
                className={cn(
                  "block h-0.5 w-6 bg-text transition-transform duration-300",
                  isOpen && "-translate-y-2 -rotate-45"
                )}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile fullscreen overlay — outside nav, fixed with proper z-index */}
      <div
        className={cn(
          "fixed inset-0 z-[55] flex lg:hidden flex-col items-center justify-center bg-bg transition-all duration-300",
          isOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        )}
      >
        {/* Decorative radial gradients */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full bg-primary/8 blur-[60px]" />
          <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-accent-gold/6 blur-[60px]" />
        </div>

        {/* Nav links */}
        <div className="flex flex-col items-center gap-6">
          {NAV_LINKS.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className={cn(
                  "font-heading font-bold transition-all inline-flex items-center gap-3",
                  link.highlight
                    ? "text-2xl md:text-4xl text-accent-gold px-5 py-2.5 rounded-2xl bg-gradient-to-r from-accent-gold/20 via-accent-gold/10 to-accent-gold/20 border border-accent-gold/50 animate-nav-glow hover:text-primary-light"
                    : "text-2xl md:text-4xl text-text hover:text-accent-gold"
                )}
              >
                {Icon && <Icon className="h-7 w-7 md:h-8 md:w-8 animate-icon-pulse text-accent-gold" />}
                {link.label}
              </Link>
            );
          })}

          {/* CTA in mobile menu */}
          <Link
            href="/kontakt"
            onClick={closeMenu}
            className="mt-4 inline-flex items-center px-7 py-3 text-base font-medium rounded-lg bg-accent-gold/15 text-accent-gold border border-accent-gold/30 hover:bg-accent-gold/25 transition-all"
          >
            Zamów występ
          </Link>
        </div>

        {/* Bottom links */}
        <div className="absolute bottom-12 flex gap-8">
          <a
            href="https://www.facebook.com/kolektyw.kapelusznik"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs uppercase tracking-[0.2em] text-text-muted transition-colors hover:text-accent-gold"
          >
            Facebook
          </a>
          <a
            href="mailto:kolektyw.kapelusznik@gmail.com"
            className="text-xs uppercase tracking-[0.2em] text-text-muted transition-colors hover:text-accent-gold"
          >
            Email
          </a>
        </div>
      </div>
    </>
  );
}
