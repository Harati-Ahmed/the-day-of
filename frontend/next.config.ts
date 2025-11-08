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
    optimizeServerReact: false, // Not needed for static sites
    webVitalsAttribution: ['CLS', 'LCP', 'FCP', 'FID', 'TTFB'],
    optimizePackageImports: ['lucide-react', 'react-hot-toast'], // Tree-shake heavy packages
  },
  
  // Compiler optimizations for production
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production', // Remove console logs in production
  },
  
  // Performance optimizations
  poweredByHeader: false, // Remove X-Powered-By header
  generateEtags: true, // Generate ETags for caching
};

export default nextConfig;
