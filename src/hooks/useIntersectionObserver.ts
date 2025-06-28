// ================================
// src/hooks/useIntersectionObserver.ts
// ================================

'use client';

import { useState, useEffect, useRef, RefObject } from 'react';

export interface UseIntersectionObserverOptions {
  threshold?: number;
  rootMargin?: string;
  root?: Element | null;
  freezeOnceVisible?: boolean;
}

export interface UseIntersectionObserverReturn {
  isIntersecting: boolean;
  entry: IntersectionObserverEntry | null;
  ref: RefObject<HTMLElement>;
}

export const useIntersectionObserver = (
  options: UseIntersectionObserverOptions = {}
): UseIntersectionObserverReturn => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);
  const ref = useRef<HTMLElement>(null);
  const frozen = useRef(false);

  const { threshold = 0.1, rootMargin = '0px', root = null, freezeOnceVisible = false } = options;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isElementIntersecting = entry.isIntersecting;
        
        if (!frozen.current) {
          setIsIntersecting(isElementIntersecting);
          setEntry(entry);
          
          if (freezeOnceVisible && isElementIntersecting) {
            frozen.current = true;
          }
        }
      },
      { threshold, rootMargin, root }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [threshold, rootMargin, root, freezeOnceVisible]);

  return { isIntersecting, entry, ref };
};