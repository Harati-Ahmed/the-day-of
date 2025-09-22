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
  variable: '--font-inter'
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
    locale: 'en_US',
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
    canonical: 'https://thedayof.net',
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
    "url": "https://thedayof.net",
    "publisher": {
      "@type": "Organization",
      "name": "TheDayOf",
      "url": "https://thedayof.net"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://thedayof.net/search?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <html lang="en">
      <head>
        {/* Resource hints for better performance */}
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
        <link rel="dns-prefetch" href="//vitals.vercel-insights.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        
        {/* Preload critical resources */}
        <link rel="preload" href="/next.svg" as="image" />
        <link rel="preload" href="/vercel.svg" as="image" />
        
        {/* Schema.org structured data */}
        <Script
          id="website-structured-data"
          type="application/ld+json"
          strategy="beforeInteractive"
        >
          {JSON.stringify(websiteStructuredData)}
        </Script>
        
        {/* Google Analytics - Optimized for mobile performance */}
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
              page_title: document.title,
              page_location: window.location.href
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