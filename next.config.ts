import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Produce a fully static site in ./out — deployable to any free static host
  // (Firebase Hosting, Vercel, Netlify, Cloudflare Pages, GitHub Pages).
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
