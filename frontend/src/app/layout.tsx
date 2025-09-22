import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from '@/contexts/theme-context';
import ThemeSpread from '@/components/theme-spread';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'TheDayOf - Celebrate Every Day',
  description: 'Discover and celebrate every special day, holiday, and observance. From food days to awareness campaigns, we\'ve got you covered with fun facts, traditions, and ways to celebrate.',
  keywords: ['holidays', 'national days', 'celebrations', 'food days', 'awareness days', 'special days'],
  authors: [{ name: 'TheDayOf Team' }],
  openGraph: {
    title: 'TheDayOf - Celebrate Every Day',
    description: 'Discover and celebrate every special day, holiday, and observance.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TheDayOf - Celebrate Every Day',
    description: 'Discover and celebrate every special day, holiday, and observance.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
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