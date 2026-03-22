import type { Metadata } from "next";
import Script from "next/script";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-heading",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  title: "Kapelusznik — Kolektyw Artystyczny | Artyści Uliczni z Bielska-Białej",
  description:
    "Kolektyw artystów ulicznych z Bielska-Białej. Żywe rzeźby, żonglerka, akrobatyka powietrzna, highline, lalkarstwo i scena sztukmistrzów. Zamieniamy ulice w sceny.",
  keywords:
    "artyści uliczni, Bielsko-Biała, żonglerka, akrobatyka powietrzna, żywe rzeźby, kolektyw artystyczny, Kapelusznik, sztuka uliczna, busking, festiwal",
  openGraph: {
    title: "Kapelusznik — Kolektyw Artystyczny",
    description:
      "Zamieniamy ulice w sceny. Ogień, akrobatyka, magia — przeżyj sztukę, która nie zna granic.",
    url: "https://kapelusznik.com.pl",
    siteName: "Kapelusznik",
    locale: "pl_PL",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body>
        {children}
        <Script id="section-reveal" strategy="lazyOnload">{`
          var io=new IntersectionObserver(function(e){e.forEach(function(x){if(x.isIntersecting){x.target.classList.add('visible');io.unobserve(x.target)}})},{threshold:0.1});
          document.querySelectorAll('.section-reveal').forEach(function(el){io.observe(el)});
        `}</Script>
      </body>
    </html>
  );
}
