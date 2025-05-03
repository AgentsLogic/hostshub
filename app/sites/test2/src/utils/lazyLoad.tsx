'use client';

import React, { lazy, Suspense } from 'react';

interface LazyLoadOptions {
  fallback?: React.ReactNode;
  ssr?: boolean;
}

/**
 * Utility function for lazy loading components with Suspense
 * @param importFn Dynamic import function for the component
 * @param options Configuration options
 * @returns Lazy loaded component wrapped in Suspense
 */
export function lazyLoad<T extends React.ComponentType<any>>(
  importFn: () => Promise<{ default: T }>,
  options: LazyLoadOptions = {}
) {
  const {
    fallback = <div className="animate-pulse bg-gray-200 rounded-md h-full w-full min-h-[100px]"></div>,
    ssr = false,
  } = options;
  
  const LazyComponent = lazy(importFn);
  
  return function LazyLoadedComponent(props: React.ComponentProps<T>) {
    // If SSR is disabled and we're on the server, return fallback
    if (!ssr && typeof window === 'undefined') {
      return <>{fallback}</>;
    }
    
    return (
      <Suspense fallback={fallback}>
        <LazyComponent {...props} />
      </Suspense>
    );
  };
}

export default lazyLoad;
