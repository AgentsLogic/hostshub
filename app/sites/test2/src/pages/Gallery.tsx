import React from 'react';
import { lazyLoad } from '../utils/lazyLoad';

// Lazy load the OptimizedGallery component
const OptimizedGallery = lazyLoad(
  () => import('../components/OptimizedGallery'),
  {
    fallback: (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="animate-pulse">
          <div className="h-10 bg-gray-200 rounded w-3/4 mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="h-64 bg-gray-200 rounded-lg"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  }
);

export const Gallery = () => {
  return <OptimizedGallery />;
};
