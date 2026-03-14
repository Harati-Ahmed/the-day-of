'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';

// Lazy load Vercel analytics; only mount after engagement (like DeferredScripts)
const Analytics = dynamic(
  () => import('@vercel/analytics/react').then((mod) => ({ default: mod.Analytics })),
  { ssr: false }
);

const SpeedInsights = dynamic(
  () => import('@vercel/speed-insights/next').then((mod) => ({ default: mod.SpeedInsights })),
  { ssr: false }
);

/**
 * Mounts Vercel Analytics and Speed Insights only after scroll or 8s.
 * Keeps them off the critical path for Lighthouse performance.
 */
export default function DeferredAnalytics() {
  const [shouldLoad, setShouldLoad] = useState(false);
  const loaded = useRef(false);

  useEffect(() => {
    if (loaded.current) return;

    const load = () => {
      if (loaded.current) return;
      loaded.current = true;
      window.removeEventListener('scroll', load);
      window.removeEventListener('click', load);
      window.removeEventListener('touchstart', load);
      window.removeEventListener('keydown', load);
      setShouldLoad(true);
    };

    window.addEventListener('scroll', load, { passive: true, once: true });
    window.addEventListener('click', load, { once: true });
    window.addEventListener('touchstart', load, { passive: true, once: true });
    window.addEventListener('keydown', load, { once: true });
    const t = window.setTimeout(load, 8000);

    return () => {
      window.clearTimeout(t);
      window.removeEventListener('scroll', load);
      window.removeEventListener('click', load);
      window.removeEventListener('touchstart', load);
      window.removeEventListener('keydown', load);
    };
  }, []);

  if (!shouldLoad) return null;
  return (
    <>
      <Analytics />
      <SpeedInsights />
    </>
  );
}
