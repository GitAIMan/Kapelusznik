import Image from "next/image";
import Link from "next/link";
import { Mail, Phone, MapPin, Facebook, Youtube, Instagram } from "lucide-react";

const COMPANY = {
  name: "Kolektyw Kapelusznik Sp. z o.o.",
  nip: "937 277 79 07",
  regon: "543798724",
  krs: "0001219235",
};

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.07] bg-bg px-6 md:px-12 py-20">
      <div className="mx-auto max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
        {/* Marka: logo + nazwa + 1 zdanie */}
        <div className="sm:col-span-2 lg:col-span-4 flex items-start gap-4">
          <Link href="/" className="shrink-0">
            <Image
              src="/images/logo.jpg"
              alt="Kolektyw Artystyczny Kapelusznik, logo"
              width={64}
              height={64}
              className="h-16 w-16 rounded-lg border border-accent-gold/20 hover:border-accent-gold/50 transition-colors"
            />
          </Link>
          <div>
            <p className="font-heading font-semibold text-text mb-4">
              Kolektyw Artystyczny Kapelusznik
            </p>
            <p className="text-sm text-text-secondary leading-relaxed max-w-xs">
              Artyści cyrkowi i&nbsp;uliczni z&nbsp;Bielska-Białej. Pokazy,
              warsztaty i&nbsp;kompleksowa realizacja imprez.
            </p>
          </div>
        </div>

        {/* Kontakt */}
        <div className="lg:col-span-3">
          <p className="font-heading font-semibold text-text mb-4">Kontakt</p>
          <ul className="space-y-3 text-sm text-text-secondary">
            <li className="flex items-center gap-3">
              <Mail className="h-4 w-4 shrink-0 text-accent-gold" />
              <a
                href="mailto:kolektyw.kapelusznik@gmail.com"
                className="transition-colors hover:text-text break-all"
              >
                kolektyw.kapelusznik@gmail.com
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="h-4 w-4 shrink-0 text-accent-gold" />
              <a
                href="tel:+48509999683"
                className="transition-colors hover:text-text"
              >
                +48 509 999 683
              </a>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="h-4 w-4 shrink-0 mt-0.5 text-accent-gold" />
              <span>
                ul. 11 Listopada 78
                <br />
                Bielsko-Biała, Polska
              </span>
            </li>
          </ul>
        </div>

        {/* Dane firmy — w kolumnie */}
        <div className="lg:col-span-3">
          <p className="font-heading font-semibold text-text mb-4">Dane firmy</p>
          <p className="text-sm text-text-secondary mb-3">{COMPANY.name}</p>
          <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1.5 text-sm">
            <dt className="text-text-muted">NIP</dt>
            <dd className="text-text-secondary">{COMPANY.nip}</dd>
            <dt className="text-text-muted">REGON</dt>
            <dd className="text-text-secondary">{COMPANY.regon}</dd>
            <dt className="text-text-muted">KRS</dt>
            <dd className="text-text-secondary">{COMPANY.krs}</dd>
          </dl>
        </div>

        {/* Social */}
        <div className="lg:col-span-2">
          <p className="font-heading font-semibold text-text mb-4">
            Social Media
          </p>
          <ul className="space-y-3">
            <li>
              <a
                href="https://www.facebook.com/kolektyw.kapelusznik"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 text-sm text-text-secondary transition-colors hover:text-text"
              >
                <Facebook className="h-4 w-4 text-accent-gold" />
                Facebook
              </a>
            </li>
            <li>
              <a
                href="https://www.youtube.com/@k.a.kapelusznik"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 text-sm text-text-secondary transition-colors hover:text-text"
              >
                <Youtube className="h-4 w-4 text-accent-gold" />
                YouTube
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/kolektyw.kapelusznik"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 text-sm text-text-secondary transition-colors hover:text-text"
              >
                <Instagram className="h-4 w-4 text-accent-gold" />
                Instagram
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Dolny pasek: © */}
      <div className="mx-auto max-w-7xl mt-12 pt-8 border-t border-white/5 text-center text-xs text-text-muted">
        &copy; {new Date().getFullYear()} {COMPANY.name} Wszystkie prawa
        zastrzeżone.
      </div>
    </footer>
  );
}
