import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Zdjęcia podstron trzymamy na Cloudflare R2, nie w repo
    remotePatterns: [
      { protocol: "https", hostname: "pub-c80345f06600456890a96b515fec6e54.r2.dev" },
    ],
  },
  async redirects() {
    return [
      // Stara pisownia (1×s) → poprawna (2×s). Stare linki dalej działają.
      {
        source: "/teserakt-ognia",
        destination: "/tesserakt-ognia",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
