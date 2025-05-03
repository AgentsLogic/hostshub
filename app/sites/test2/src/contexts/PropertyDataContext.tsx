'use client';

import React, { createContext, useContext, ReactNode } from 'react';

// Define the property data interface
export interface PropertyData {
  name: string;
  description: string;
  address: string;
}

// Default property data
const defaultPropertyData: PropertyData = {
  name: "Twin Hills River Ranch",
  description: "A beautiful ranch resort with various accommodations and activities.",
  address: "123 Ranch Road, Twin Hills, TX"
};

// Create the context
interface PropertyDataContextType {
  propertyData: PropertyData;
}

const PropertyDataContext = createContext<PropertyDataContextType | undefined>(undefined);

// Provider component
export function PropertyDataProvider({ 
  children,
  initialData
}: { 
  children: ReactNode;
  initialData?: PropertyData;
}) {
  // Use provided data or fall back to default data
  const propertyData = initialData || defaultPropertyData;

  return (
    <PropertyDataContext.Provider value={{ propertyData }}>
      {children}
    </PropertyDataContext.Provider>
  );
}

// Custom hook to use the property data
export function usePropertyData(): PropertyDataContextType {
  const context = useContext(PropertyDataContext);
  
  if (context === undefined) {
    throw new Error('usePropertyData must be used within a PropertyDataProvider');
  }
  
  return context;
}
