"use client";

import { useState } from "react";
import Image from "next/image";
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
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 h-20 transition-colors",
        scrolled && "bg-bg/80 backdrop-blur-2xl border-b border-white/[0.03]"
      )}
    >
      {/* Logo */}
      <a href="#" onClick={closeMenu} className="flex items-center">
        <Image
          src="/images/logo.avif"
          alt="Kapelusznik"
          width={120}
          height={40}
          className="h-10 w-auto"
          priority
        />
      </a>

      {/* Hamburger */}
      <button
        onClick={toggleMenu}
        className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 cursor-pointer"
        aria-label={isOpen ? "Zamknij menu" : "Otwórz menu"}
      >
        <span
          className={cn(
            "block h-0.5 w-6 bg-text transition-transform",
            isOpen && "translate-y-2 rotate-45"
          )}
        />
        <span
          className={cn(
            "block h-0.5 w-6 bg-text transition-opacity",
            isOpen && "opacity-0"
          )}
        />
        <span
          className={cn(
            "block h-0.5 w-6 bg-text transition-transform",
            isOpen && "-translate-y-2 -rotate-45"
          )}
        />
      </button>

      {/* Fullscreen overlay */}
      <div
        className={cn(
          "fixed inset-0 z-40 flex flex-col items-center justify-center bg-bg transition-opacity",
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        )}
      >
        {/* Decorative radial gradients */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-accent-gold/10 blur-3xl" />
        </div>

        {/* Nav links */}
        <div className="flex flex-col items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={closeMenu}
              className="font-heading text-3xl md:text-5xl font-bold text-text transition-colors hover:text-accent-gold"
            >
              {link.label}
            </a>
          ))}
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
            href="mailto:kontakt@kapelusznik.com.pl"
            className="text-xs uppercase tracking-[0.2em] text-text-muted transition-colors hover:text-accent-gold"
          >
            Email
          </a>
        </div>
      </div>
    </nav>
  );
}
