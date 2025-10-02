'use client';

import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import { ReactNode } from 'react';

interface LazySectionProps {
  children: ReactNode;
  className?: string;
  rootMargin?: string;
  threshold?: number;
}

export default function LazySection({ 
  children, 
  className = '', 
  rootMargin = '100px',
  threshold = 0 
}: LazySectionProps) {
  const { ref, isIntersecting } = useIntersectionObserver({
    rootMargin,
    threshold,
    triggerOnce: true,
  });

  return (
    <section ref={ref} className={className}>
      {isIntersecting ? children : (
        <div className="h-64 bg-neutral-50 dark:bg-dark-800 animate-pulse rounded-2xl"></div>
      )}
    </section>
  );
}