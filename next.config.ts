import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  output: 'standalone',
  images: {
    domains: ['firebasestorage.googleapis.com'],
    unoptimized: true,
  },
};

export default nextConfig;
