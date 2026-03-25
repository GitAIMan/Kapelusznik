import Image from "next/image";
import Link from "next/link";
import { Mail, Phone, MapPin, Facebook } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.07] bg-bg px-6 md:px-12 py-20">
      <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-16">
        {/* Logo + opis */}
        <div>
          <Link href="/">
            <Image
              src="/images/logo.jpg"
              alt="Kapelusznik"
              width={80}
              height={80}
              className="h-16 w-auto"
            />
          </Link>
          <p className="mt-4 text-sm text-text-secondary leading-relaxed">
            Kolektyw artystów ulicznych z Bielska-Białej. Zamieniamy ulice w
            sceny pełne ognia, akrobatyki i magii.
          </p>
        </div>

        {/* Kontakt */}
        <div>
          <p className="font-heading font-semibold text-text mb-4">Kontakt</p>
          <ul className="space-y-3 text-sm text-text-secondary">
            <li className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-accent-gold" />
              <a
                href="mailto:kontakt@kapelusznik.com.pl"
                className="transition-colors hover:text-text"
              >
                kontakt@kapelusznik.com.pl
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-accent-gold" />
              <a
                href="tel:+48123456789"
                className="transition-colors hover:text-text"
              >
                +48 123 456 789
              </a>
            </li>
            <li className="flex items-center gap-3">
              <MapPin className="h-4 w-4 text-accent-gold" />
              <span>Bielsko-Biała, Polska</span>
            </li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <p className="font-heading font-semibold text-text mb-4">
            Social Media
          </p>
          <a
            href="https://www.facebook.com/kolektyw.kapelusznik"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 text-sm text-text-secondary transition-colors hover:text-text"
          >
            <Facebook className="h-4 w-4 text-accent-gold" />
            Facebook
          </a>
        </div>
      </div>

      {/* Copyright */}
      <div className="mx-auto max-w-7xl mt-12 pt-8 border-t border-white/5 text-center text-xs text-text-muted">
        &copy; {new Date().getFullYear()} Kapelusznik Kolektyw Artystyczny.
        Wszystkie prawa zastrzeżone.
      </div>
    </footer>
  );
}
