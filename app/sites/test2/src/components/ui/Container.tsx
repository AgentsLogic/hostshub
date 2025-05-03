'use client';

import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  padding?: boolean;
}

export const Container: React.FC<ContainerProps> = ({
  children,
  className = '',
  size = 'lg',
  padding = true,
}) => {
  // Size classes
  const sizeClasses = {
    sm: 'max-w-3xl',
    md: 'max-w-5xl',
    lg: 'max-w-7xl',
    xl: 'max-w-screen-2xl',
    full: 'max-w-full',
  };
  
  // Padding classes
  const paddingClasses = padding ? 'px-4 sm:px-6 lg:px-8' : '';
  
  // Combine all classes
  const containerClasses = `mx-auto ${sizeClasses[size]} ${paddingClasses} ${className}`;
  
  return (
    <div className={containerClasses}>
      {children}
    </div>
  );
};

export default Container;
