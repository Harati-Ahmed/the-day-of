'use client';

import Script from 'next/script';

/**
 * Mobile-optimized AdSense loader
 * Uses afterInteractive strategy for instant loading to maintain impressions
 * Next.js afterInteractive loads after page becomes interactive, which is optimal
 * for both mobile performance and ad impressions
 */
export default function MobileOptimizedAdSense() {
  return (
    <>
      <Script
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2160043117224167"
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />
      <Script id="adsense-auto-ads" strategy="afterInteractive">
        {`
          (adsbygoogle = window.adsbygoogle || []).push({
            google_ad_client: "ca-pub-2160043117224167",
            enable_page_level_ads: true
          });
        `}
      </Script>
    </>
  );
}

