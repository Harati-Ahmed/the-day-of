import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static site optimization
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true, // Required for static export
  },
  // Enable compression for static assets
  compress: true,
  // Optimizations for static sites
  experimental: {
    optimizeServerReact: false, // Not needed for static sites
    webVitalsAttribution: ['CLS', 'LCP', 'FCP', 'FID', 'TTFB'],
  },
  // Compiler optimizations for static build
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Performance optimizations
  poweredByHeader: false,
  generateEtags: true,
  
  // Webpack optimizations for static builds
  webpack: (config, { dev, isServer }) => {
    // Only optimize for production builds
    if (!dev && !isServer) {
      // Enable tree shaking
      config.optimization.usedExports = true;
      config.optimization.sideEffects = false;
      
      // Optimize chunk splitting for static sites
      config.optimization.splitChunks = {
        chunks: 'all',
        minSize: 20000,
        maxSize: 70000,
        cacheGroups: {
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
          },
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            priority: -10,
            chunks: 'all',
          },
        },
      };
    }
    
    return config;
  },
};

export default nextConfig;
