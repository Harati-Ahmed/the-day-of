import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { ThemeProvider } from '@/contexts/theme-context';
import ThemeSpread from '@/components/theme-spread';
import LazyToaster from '@/components/lazy-toaster';
import { LazyAnalytics, LazySpeedInsights } from '@/components/lazy-analytics';

// Optimized font loading - Next.js automatically optimizes and self-hosts Google Fonts
const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap', // Prevent flash of unstyled text (FOUT)
  variable: '--font-inter',
  weight: ['400', '600'], // Only load essential weights
});

export const metadata: Metadata = {
  title: 'TheDayOf: 365+ National Days, Food Holidays & Celebration Calendar 🎉',
  description: 'Never miss a celebration! Find out what\'s special TODAY with 365+ national days, trending food holidays, exclusive deals & party ideas. Join millions celebrating now!',
  keywords: ['national days', 'food days', 'holidays', 'coffee day', 'celebrations', 'awareness days', 'discover', 'calendar', 'world celebrations'],
  authors: [{ name: 'TheDayOf Team' }],
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/apple-icon.svg', type: 'image/svg+xml' },
    ],
  },
  openGraph: {
    title: 'TheDayOf - National Days, Food & Holiday Calendar',
    description: 'Never miss a celebration! Find out what\'s special TODAY with 365+ national days, trending food holidays, exclusive deals & party ideas.',
    type: 'website',
    url: 'https://www.thedayof.net/',
    siteName: 'TheDayOf',
    locale: 'en_US',
    images: [
      {
        url: 'https://www.thedayof.net/images/og-homepage.svg',
        width: 1200,
        height: 630,
        alt: 'TheDayOf - National Days, Food & Holiday Calendar',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TheDayOf - National Days, Food & Holiday Calendar',
    description: 'Never miss a celebration! Find out what\'s special TODAY with 365+ national days, trending food holidays, exclusive deals & party ideas.',
    images: ['https://www.thedayof.net/images/og-homepage.svg'],
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
    'last-modified': new Date().toISOString(),
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#0284c7' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
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
    "description": "Never miss a celebration! Find out what's special TODAY with 365+ national days, trending food holidays, exclusive deals & party ideas. Join millions celebrating now!",
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
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        {/* DNS prefetch and preconnect for third-party domains - improves performance */}
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
        <link rel="dns-prefetch" href="//pagead2.googlesyndication.com" />
        <link rel="dns-prefetch" href="//vitals.vercel-insights.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://pagead2.googlesyndication.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.google-analytics.com" crossOrigin="anonymous" />
        
        {/* Schema.org structured data - load early for SEO */}
        <Script
          id="website-structured-data"
          type="application/ld+json"
          strategy="beforeInteractive"
        >
          {JSON.stringify(websiteStructuredData)}
        </Script>
        
        {/* Google Analytics - Lazy loaded per Google's recommendations */}
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
        
        {/* Google AdSense Auto Ads - Lazy loaded to not impact performance */}
        <Script
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2160043117224167"
          crossOrigin="anonymous"
          strategy="lazyOnload"
        />
        <Script id="adsense-auto-ads" strategy="lazyOnload">
          {`
            (adsbygoogle = window.adsbygoogle || []).push({
              google_ad_client: "ca-pub-2160043117224167",
              enable_page_level_ads: true
            });
          `}
        </Script>
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        {/* Skip to main content link for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary-600 focus:text-white focus:rounded-lg focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2"
        >
          Skip to main content
        </a>
        <ThemeProvider>
          <ThemeSpread>
            <div className="min-h-screen flex flex-col">
              <Header />
              <main id="main-content" className="flex-1 pt-20" tabIndex={-1}>
                {children}
              </main>
              <Footer />
            </div>
            <LazyToaster />
            <LazyAnalytics />
            <LazySpeedInsights />
          </ThemeSpread>
        </ThemeProvider>
      </body>
    </html>
  );
}