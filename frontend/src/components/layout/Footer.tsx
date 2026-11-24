import Image from "next/image";
import Link from "next/link";
import { Mail, Phone, MapPin, Facebook, Youtube } from "lucide-react";

const COMPANY = {
  name: "Kolektyw Kapelusznik Sp. z o.o.",
  nip: "937 277 79 07",
  regon: "543798724",
  krs: "0001219235",
};

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.07] bg-bg px-6 md:px-12 py-20">
      <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-16">
        {/* Pełne logo + dane firmy */}
        <div>
          <Link href="/" className="inline-block">
            <Image
              src="/images/logo.jpg"
              alt="Kolektyw Artystyczny Kapelusznik — logo"
              width={128}
              height={128}
              className="h-32 w-32 rounded-xl border border-accent-gold/20 hover:border-accent-gold/50 transition-colors"
            />
          </Link>
          <p className="mt-5 font-heading font-semibold text-text">
            {COMPANY.name}
          </p>
          <dl className="mt-2 grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-sm text-text-secondary">
            <dt className="text-text-muted">NIP:</dt>
            <dd>{COMPANY.nip}</dd>
            <dt className="text-text-muted">REGON:</dt>
            <dd>{COMPANY.regon}</dd>
            <dt className="text-text-muted">KRS:</dt>
            <dd>{COMPANY.krs}</dd>
          </dl>
        </div>

        {/* Kontakt */}
        <div>
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

        {/* Social */}
        <div>
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
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="mx-auto max-w-7xl mt-12 pt-8 border-t border-white/5 text-center text-xs text-text-muted">
        &copy; {new Date().getFullYear()} {COMPANY.name} Wszystkie prawa
        zastrzeżone.
      </div>
    </footer>
  );
}
