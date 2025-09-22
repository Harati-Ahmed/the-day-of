import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable static optimization for better performance
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true, // Required for static export
  },
  // Enable compression
  compress: true,
  // Optimize for mobile performance
  experimental: {
    optimizeServerReact: true,
  },
  // Compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Performance optimizations
  poweredByHeader: false,
  generateEtags: false,
};

export default nextConfig;
