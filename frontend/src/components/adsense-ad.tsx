'use client';

import { useEffect, useRef, useState } from 'react';

interface AdSenseAdProps {
  /**
   * AdSense ad slot ID (get from AdSense dashboard)
   * Format: "1234567890" or "ca-pub-XXXXX:slot-XXXXX"
   */
  adSlot: string;
  /**
   * Ad format: 'auto', 'rectangle', 'horizontal', 'vertical'
   */
  format?: 'auto' | 'rectangle' | 'horizontal' | 'vertical';
  /**
   * Ad size: 'responsive' or specific dimensions
   */
  style?: React.CSSProperties;
  /**
   * Full width responsive ad
   */
  fullWidth?: boolean;
  /**
   * Lazy load the ad (load when in viewport)
   */
  lazy?: boolean;
}

/**
 * Manual AdSense Ad Component
 * Optimized for performance with lazy loading and proper sizing
 * 
 * Usage:
 * <AdSenseAd adSlot="1234567890" format="auto" lazy />
 */
export default function AdSenseAd({
  adSlot,
  format = 'auto',
  style,
  fullWidth = false,
  lazy = true,
}: AdSenseAdProps) {
  const adRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(!lazy);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!lazy || shouldLoad) return;

    // Intersection Observer for lazy loading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldLoad(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: '100px', // Start loading 100px before ad comes into view
        threshold: 0.1,
      }
    );

    if (adRef.current) {
      observer.observe(adRef.current);
    }

    return () => observer.disconnect();
  }, [lazy, shouldLoad]);

  useEffect(() => {
    if (!shouldLoad || isLoaded) return;

    // Wait for AdSense script to be available
    const checkAdSense = setInterval(() => {
      if ((window as any).adsbygoogle) {
        try {
          ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
          setIsLoaded(true);
          clearInterval(checkAdSense);
        } catch (e) {
          console.error('AdSense error:', e);
        }
      }
    }, 100);

    // Timeout after 5 seconds
    const timeout = setTimeout(() => {
      clearInterval(checkAdSense);
    }, 5000);

    return () => {
      clearInterval(checkAdSense);
      clearTimeout(timeout);
    };
  }, [shouldLoad, isLoaded]);

  // Reserve space to prevent CLS (Cumulative Layout Shift)
  const containerStyle: React.CSSProperties = {
    minHeight: format === 'horizontal' ? '90px' : format === 'vertical' ? '250px' : '280px',
    width: fullWidth ? '100%' : '100%',
    maxWidth: '100%',
    margin: '1rem 0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    ...style,
  };

  return (
    <div
      ref={adRef}
      style={containerStyle}
      className="adsense-container"
    >
      {shouldLoad && (
        <ins
          className="adsbygoogle"
          style={{
            display: 'block',
            width: fullWidth ? '100%' : '100%',
            height: format === 'horizontal' ? '90px' : format === 'vertical' ? '250px' : 'auto',
          }}
          data-ad-client="ca-pub-2160043117224167"
          data-ad-slot={adSlot}
          data-ad-format={format}
          data-full-width-responsive={fullWidth ? 'true' : 'false'}
        />
      )}
    </div>
  );
}

