"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import { NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [subOpen, setSubOpen] = useState(false);
  const scrollY = useScrollPosition();
  const scrolled = scrollY > 50;

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
    document.body.style.overflow = isOpen ? "" : "hidden";
  };

  const closeMenu = () => {
    setIsOpen(false);
    setSubOpen(false);
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
              if (link.children) {
                return (
                  <div key={link.href} className="relative group">
                    <Link
                      href={link.href}
                      aria-haspopup="true"
                      className="inline-flex items-center gap-1 px-4 py-2 text-sm rounded-lg text-text-secondary hover:text-text hover:bg-white/[0.04] group-hover:text-text group-focus-within:text-text transition-all"
                    >
                      {link.label}
                      <ChevronDown className="h-3.5 w-3.5 transition-transform duration-200 group-hover:rotate-180 group-focus-within:rotate-180" />
                    </Link>
                    {/* pt-2 = mostek, żeby kursor nie gubił menu przy przejściu w dół */}
                    <div className="absolute left-0 top-full pt-2 opacity-0 invisible translate-y-1 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 group-focus-within:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 transition-all duration-200">
                      <ul className="min-w-[19rem] rounded-xl border border-white/[0.08] bg-bg py-2 shadow-xl shadow-black/40">
                        {link.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              className="block px-5 py-2.5 text-sm text-text-secondary hover:text-accent-gold hover:bg-white/[0.04] focus-visible:text-accent-gold focus-visible:bg-white/[0.04] outline-none transition-colors"
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              }
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
          "fixed inset-0 z-[55] flex lg:hidden flex-col items-center overflow-y-auto bg-bg transition-all duration-300",
          isOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        )}
      >
        {/* Decorative radial gradients */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full bg-primary/8 blur-[60px]" />
          <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-accent-gold/6 blur-[60px]" />
        </div>

        {/* Nav links */}
        <div className="relative my-auto flex flex-col items-center gap-6 pt-28 pb-28">
          {NAV_LINKS.map((link) => {
            const Icon = link.icon;
            if (link.children) {
              return (
                <div key={link.href} className="flex flex-col items-center">
                  <button
                    type="button"
                    onClick={() => setSubOpen((prev) => !prev)}
                    aria-expanded={subOpen}
                    className="font-heading font-bold text-2xl md:text-4xl text-text hover:text-accent-gold inline-flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    {link.label}
                    <ChevronDown className={cn("h-6 w-6 transition-transform duration-200", subOpen && "rotate-180")} />
                  </button>
                  <div
                    className={cn(
                      "grid transition-[grid-template-rows] duration-300",
                      subOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    )}
                  >
                    <ul className="overflow-hidden flex flex-col items-center gap-3">
                      {link.children.map((child, i) => (
                        <li key={child.href} className={i === 0 ? "mt-4" : undefined}>
                          <Link
                            href={child.href}
                            onClick={closeMenu}
                            tabIndex={subOpen ? 0 : -1}
                            className="text-lg text-text-secondary hover:text-accent-gold transition-colors"
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            }
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
