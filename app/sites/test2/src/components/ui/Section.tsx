'use client';

import React from 'react';
import Container from './Container';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  containerSize?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  containerClassName?: string;
  background?: 'white' | 'light' | 'dark' | 'primary' | 'none';
  spacing?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  id?: string;
}

export const Section: React.FC<SectionProps> = ({
  children,
  className = '',
  containerSize = 'lg',
  containerClassName = '',
  background = 'white',
  spacing = 'lg',
  id,
}) => {
  // Background classes
  const backgroundClasses = {
    white: 'bg-white',
    light: 'bg-gray-50',
    dark: 'bg-gray-900 text-white',
    primary: 'bg-primary-600 text-white',
    none: '',
  };
  
  // Spacing classes
  const spacingClasses = {
    none: '',
    sm: 'py-8',
    md: 'py-12',
    lg: 'py-16',
    xl: 'py-24',
  };
  
  // Combine all classes
  const sectionClasses = `${backgroundClasses[background]} ${spacingClasses[spacing]} ${className}`;
  
  return (
    <section className={sectionClasses} id={id}>
      <Container size={containerSize} className={containerClassName}>
        {children}
      </Container>
    </section>
  );
};

interface SectionHeaderProps {
  title: string;
  description?: string;
  centered?: boolean;
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  description,
  centered = false,
  className = '',
}) => {
  const alignment = centered ? 'text-center' : '';
  
  return (
    <div className={`mb-12 ${alignment} ${className}`}>
      <h2 className="text-3xl font-serif text-gray-900 mb-4">{title}</h2>
      {description && (
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">{description}</p>
      )}
    </div>
  );
};

export default Object.assign(Section, {
  Header: SectionHeader,
});
