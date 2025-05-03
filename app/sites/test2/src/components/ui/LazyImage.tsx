'use client';

import React, { useState } from 'react';
import Image, { ImageProps } from 'next/image';
import useLazyLoad from '../../hooks/useLazyLoad';

interface LazyImageProps extends Omit<ImageProps, 'onLoad'> {
  placeholderColor?: string;
  transitionDuration?: number;
  threshold?: number;
  rootMargin?: string;
}

export const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  placeholderColor = '#f3f4f6',
  transitionDuration = 300,
  threshold = 0.1,
  rootMargin = '200px',
  className = '',
  ...props
}) => {
  const [ref, isVisible] = useLazyLoad({ threshold, rootMargin });
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Combine classes for transition effects
  const imageClasses = `
    transition-opacity
    duration-${transitionDuration}
    ${isLoaded ? 'opacity-100' : 'opacity-0'}
    ${className}
  `;
  
  // Handle image load event
  const handleImageLoad = () => {
    setIsLoaded(true);
  };
  
  return (
    <div 
      ref={ref} 
      className="relative overflow-hidden"
      style={{ backgroundColor: placeholderColor }}
    >
      {isVisible && (
        <Image
          src={src}
          alt={alt}
          className={imageClasses}
          onLoad={handleImageLoad}
          {...props}
        />
      )}
    </div>
  );
};

export default LazyImage;
