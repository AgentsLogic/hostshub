'use client';

import React from 'react';
import Link from 'next/link';
import theme from '../../styles/theme';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'link';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  isLoading?: boolean;
  href?: string;
  external?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      icon,
      iconPosition = 'right',
      isLoading = false,
      href,
      external = false,
      className = '',
      ...props
    },
    ref
  ) => {
    // Base classes
    const baseClasses = 'inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
    
    // Size classes
    const sizeClasses = {
      sm: 'px-3 py-1.5 text-sm rounded',
      md: 'px-4 py-2 text-base rounded-md',
      lg: 'px-6 py-3 text-lg rounded-lg',
    };
    
    // Variant classes
    const variantClasses = {
      primary: `bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500`,
      secondary: `bg-secondary-600 text-white hover:bg-secondary-700 focus:ring-secondary-500`,
      outline: `border border-gray-300 bg-transparent text-gray-700 hover:bg-gray-50 focus:ring-primary-500`,
      ghost: `bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-primary-500`,
      link: `bg-transparent text-primary-600 hover:underline p-0 focus:ring-0 focus:ring-offset-0`,
    };
    
    // Width classes
    const widthClasses = fullWidth ? 'w-full' : '';
    
    // Loading state
    const loadingClasses = isLoading ? 'opacity-70 cursor-not-allowed' : '';
    
    // Combine all classes
    const buttonClasses = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${widthClasses} ${loadingClasses} ${className}`;
    
    // Icon rendering
    const renderIcon = () => {
      if (!icon) return null;
      return (
        <span className={iconPosition === 'left' ? 'mr-2' : 'ml-2'}>
          {icon}
        </span>
      );
    };
    
    // Loading spinner
    const loadingSpinner = (
      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    );
    
    // If href is provided, render as a link
    if (href) {
      const linkProps = external
        ? { href, target: '_blank', rel: 'noopener noreferrer' }
        : { href };
        
      return (
        <Link
          {...linkProps}
          className={buttonClasses}
        >
          {isLoading && loadingSpinner}
          {iconPosition === 'left' && renderIcon()}
          {children}
          {iconPosition === 'right' && renderIcon()}
        </Link>
      );
    }
    
    // Otherwise, render as a button
    return (
      <button
        ref={ref}
        className={buttonClasses}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading && loadingSpinner}
        {iconPosition === 'left' && renderIcon()}
        {children}
        {iconPosition === 'right' && renderIcon()}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
