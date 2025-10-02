import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from '@/contexts/theme-context';
import ThemeSpread from '@/components/theme-spread';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial'],
  adjustFontFallback: true,
  variable: '--font-inter',
  // Optimize font loading for mobile - reduce weights
  weight: ['400', '600'], // Only essential weights for mobile
});

export const metadata: Metadata = {
  title: 'TheDayOf - Discover National Days, Food & Holiday Calendar',
  description: 'Discover national days, food holidays & celebrations worldwide. From coffee day to awareness campaigns - your complete calendar guide.',
  keywords: ['national days', 'food days', 'holidays', 'coffee day', 'celebrations', 'awareness days', 'discover', 'calendar', 'world celebrations'],
  authors: [{ name: 'TheDayOf Team' }],
  openGraph: {
    title: 'TheDayOf - National Days, Food & Holiday Calendar',
    description: 'Discover national days, food holidays & celebrations worldwide. From coffee day to awareness campaigns.',
    type: 'website',
    url: 'https://www.thedayof.net/',
    siteName: 'TheDayOf',
    locale: 'en_US',
    images: [
      {
        url: 'https://www.thedayof.net/images/og-homepage.jpg',
        width: 1200,
        height: 630,
        alt: 'TheDayOf - National Days, Food & Holiday Calendar',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TheDayOf - National Days, Food & Holiday Calendar',
    description: 'Discover national days, food holidays & celebrations worldwide. From coffee day to awareness campaigns.',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://www.thedayof.net',
  },
  other: {
    'google-adsense-account': 'ca-pub-2160043117224167',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const websiteStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "TheDayOf",
    "description": "Discover national days, food holidays & celebrations worldwide. From coffee day to awareness campaigns - your complete calendar guide.",
    "url": "https://www.thedayof.net",
    "publisher": {
      "@type": "Organization",
      "name": "TheDayOf",
      "url": "https://www.thedayof.net"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://www.thedayof.net/search?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <html lang="en">
      <head>
        {/* Critical Resource hints optimized for static sites */}
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
        <link rel="dns-prefetch" href="//vitals.vercel-insights.com" />
        
        {/* Preload critical static assets */}
        <link rel="preload" href="/next.svg" as="image" />
        <link rel="preload" href="/vercel.svg" as="image" />
        
        {/* Remove duplicate font loading - Next.js handles this */}
        
        {/* Schema.org structured data - load early for SEO */}
        <Script
          id="website-structured-data"
          type="application/ld+json"
          strategy="beforeInteractive"
        >
          {JSON.stringify(websiteStructuredData)}
        </Script>
        
        {/* Google Analytics - Lazy loaded to reduce TBT */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-BLYYB9LCXW"
          strategy="lazyOnload"
        />
        <Script id="google-analytics" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-BLYYB9LCXW', {
              send_page_view: false
            });
          `}
        </Script>
      </head>
      <body className={`${inter.variable} font-sans`}>
        <ThemeProvider>
          <ThemeSpread>
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-1 pt-20">
                {children}
              </main>
              <Footer />
            </div>
            <Toaster 
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: '#363636',
                  color: '#fff',
                },
              }}
            />
            <Analytics />
            <SpeedInsights />
          </ThemeSpread>
        </ThemeProvider>
      </body>
    </html>
  );
}