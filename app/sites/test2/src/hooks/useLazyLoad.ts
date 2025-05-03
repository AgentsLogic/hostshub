'use client';

import { useState, useEffect, useRef, RefObject } from 'react';

interface UseLazyLoadOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}

/**
 * Custom hook for lazy loading elements when they enter the viewport
 * @param options Configuration options for the IntersectionObserver
 * @returns [ref, isVisible] - Ref to attach to the element and boolean indicating if element is visible
 */
export function useLazyLoad({
  threshold = 0.1,
  rootMargin = '0px',
  once = true,
}: UseLazyLoadOptions = {}): [RefObject<HTMLDivElement>, boolean] {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // If already visible and once is true, no need to observe
    if (isVisible && once) return;
    
    const element = ref.current;
    if (!element) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) {
            observer.disconnect();
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );
    
    observer.observe(element);
    
    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, once, isVisible]);
  
  return [ref, isVisible];
}

export default useLazyLoad;
