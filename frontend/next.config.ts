import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable static optimization for better performance
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true, // Required for static export
  },
  // Enable compression (HTTP/2 works well with compression)
  compress: true,
  // Optimize for mobile performance
  experimental: {
    optimizeServerReact: true,
  },
  // Compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Performance optimizations for HTTP/2
  poweredByHeader: false,
  generateEtags: true, // Enable ETags for better caching with HTTP/2
};

export default nextConfig;
