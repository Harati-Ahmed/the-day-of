'use client';

import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import { ReactNode, memo } from 'react';

interface LazySectionProps {
  children: ReactNode;
  className?: string;
  rootMargin?: string;
  threshold?: number;
}

const LazySection = memo(function LazySection({ 
  children, 
  className = '', 
  rootMargin = '50px', // Reduced for faster loading
  threshold = 0.1 // Slightly higher threshold for better performance
}: LazySectionProps) {
  const { ref, isIntersecting } = useIntersectionObserver({
    rootMargin,
    threshold,
    triggerOnce: true,
  });

  return (
    <section ref={ref} className={className}>
      {isIntersecting ? children : (
        <div className="h-32 bg-neutral-50 dark:bg-dark-800 animate-pulse rounded-2xl"></div>
      )}
    </section>
  );
});

export default LazySection;