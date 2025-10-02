'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

interface UseIntersectionObserverProps {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export function useIntersectionObserver({
  threshold = 0,
  rootMargin = '0px',
  triggerOnce = true,
}: UseIntersectionObserverProps = {}) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const ref = useRef<HTMLElement>(null);

  const handleIntersection = useCallback(([entry]: IntersectionObserverEntry[]) => {
    const isElementIntersecting = entry.isIntersecting;
    setIsIntersecting(isElementIntersecting);
    
    if (isElementIntersecting && triggerOnce) {
      setHasTriggered(true);
    }
  }, [triggerOnce]);

  useEffect(() => {
    const element = ref.current;
    if (!element || (triggerOnce && hasTriggered)) return;

    // Use requestIdleCallback for better performance
    const observer = new IntersectionObserver(handleIntersection, {
      threshold,
      rootMargin,
    });

    // Use requestIdleCallback to defer observation
    const observeElement = () => {
      if (element) {
        observer.observe(element);
      }
    };

    if ('requestIdleCallback' in window) {
      requestIdleCallback(observeElement);
    } else {
      setTimeout(observeElement, 0);
    }

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, triggerOnce, hasTriggered, handleIntersection]);

  return { ref, isIntersecting: triggerOnce ? (hasTriggered || isIntersecting) : isIntersecting };
}