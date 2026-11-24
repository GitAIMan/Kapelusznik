/** Loga w /public/images/zaufali (przygotowane: białe tło, przycięte, webp). */
const LOGOS = [
  { file: "miasto-bielsko-biala", name: "Miasto Bielsko-Biała" },
  { file: "banialuka", name: "Teatr Lalek Banialuka" },
  { file: "ksiaznica-beskidzka", name: "Książnica Beskidzka" },
  { file: "estrada-tyska", name: "Estrada Tyska" },
  { file: "opg-jaworze", name: "Ośrodek Promocji Gminy Jaworze" },
  { file: "teatr-zly", name: "Teatr Zły" },
  { file: "biblioteka-pleszew", name: "Biblioteka Publiczna Miasta i Gminy w Pleszewie" },
  { file: "bbts", name: "BBTS Bielsko-Biała" },
  { file: "tpbbip", name: "Towarzystwo Przyjaciół Bielska-Białej i Podbeskidzia" },
  { file: "gok-milowka", name: "GOK Milówka" },
  { file: "warownia", name: "Warownia Pszczyńskich Rycerzy" },
  { file: "w-to-mi-graj", name: "Fundacja W To Mi Graj" },
  { file: "zywiec", name: "Żywiec, miasto zmysłów" },
  { file: "gok-buczkowice", name: "Gminny Ośrodek Kultury w Buczkowicach" },
  { file: "kta", name: "KTA Bielsko-Biała" },
  { file: "fest", name: "FEST" },
  { file: "odskocznia", name: "Odskocznia" },
  { file: "lufcik", name: "Lufcik na korbkę" },
  { file: "nakaja", name: "Nakaja Art" },
  { file: "decors", name: "Decor's, firma eventowa" },
  { file: "korsarz", name: "Korsarz, fajerwerki" },
  { file: "fuego", name: "Fuego fajerwerki" },
];

function LogoTile({ file, name, hidden }: { file: string; name: string; hidden?: boolean }) {
  return (
    <li className="shrink-0" aria-hidden={hidden || undefined}>
      <div className="flex h-20 w-32 md:h-24 md:w-40 items-center justify-center rounded-xl bg-white p-3 md:p-4 shadow-sm shadow-black/30">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`/images/zaufali/${file}.webp`}
          alt={hidden ? "" : name}
          title={name}
          loading="lazy"
          decoding="async"
          className="max-h-full max-w-full object-contain"
        />
      </div>
    </li>
  );
}

export default function TrustedBy() {
  return (
    <section className="relative py-10 md:py-12 border-y border-white/[0.05]" aria-label="Zaufali nam">
      <p className="mb-6 text-center text-xs uppercase tracking-[0.25em] text-accent-gold/80 font-medium">
        Zaufali nam
      </p>

      {/* Pasek: lista zdublowana → płynna pętla; najechanie myszą zatrzymuje */}
      <div className="marquee marquee-fade overflow-hidden">
        <ul className="animate-marquee flex w-max gap-4 md:gap-5 py-1">
          {LOGOS.map((l) => (
            <LogoTile key={l.file} {...l} />
          ))}
          {LOGOS.map((l) => (
            <LogoTile key={`${l.file}-2`} {...l} hidden />
          ))}
        </ul>
      </div>
    </section>
  );
}
