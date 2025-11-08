'use client';

import dynamic from 'next/dynamic';

// Lazy load Toaster to reduce initial bundle size
const Toaster = dynamic(
  () => import('react-hot-toast').then((mod) => ({ default: mod.Toaster })),
  {
    ssr: false, // Only load on client
    loading: () => null, // No loading UI needed
  }
);

export default function LazyToaster() {
  return (
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
  );
}

