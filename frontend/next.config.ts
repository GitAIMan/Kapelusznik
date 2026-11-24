import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
