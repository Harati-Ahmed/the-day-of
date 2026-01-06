import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static site optimization
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true, // Required for static export
  },
  
  // Experimental optimizations following Next.js best practices
  experimental: {
    webVitalsAttribution: ['CLS', 'LCP', 'FCP', 'FID', 'TTFB'],
    optimizePackageImports: ['lucide-react', 'react-hot-toast', 'recharts', 'framer-motion'], // Tree-shake heavy packages
  },
  
  // Modern JavaScript - reduce polyfills for better mobile performance
  // Next.js 16 uses modern JS by default, but we ensure no unnecessary transpilation
  transpilePackages: [], // Don't transpile any packages unnecessarily
  
  // Compiler optimizations for production
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production', // Remove console logs in production
  },
  
  // Performance optimizations
  poweredByHeader: false, // Remove X-Powered-By header
  generateEtags: true, // Generate ETags for caching
};

export default nextConfig;
