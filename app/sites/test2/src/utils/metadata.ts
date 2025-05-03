import { Metadata } from 'next';
import { PropertyData } from '../contexts/PropertyDataContext';

/**
 * Generate metadata for SEO optimization
 * @param options Configuration options for metadata
 * @returns Next.js Metadata object
 */
export function generateMetadata({
  title,
  description,
  propertyData,
  path = '',
  images = [],
}: {
  title?: string;
  description?: string;
  propertyData?: PropertyData;
  path?: string;
  images?: string[];
}): Metadata {
  // Use property data if available
  const propertyName = propertyData?.name || 'Twin Hills River Ranch';
  const propertyDescription = propertyData?.description || 'A beautiful ranch resort with various accommodations and activities.';
  
  // Default values
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://hostshub.ai';
  const siteName = propertyName;
  
  // Construct title and description
  const metaTitle = title ? `${title} | ${propertyName}` : propertyName;
  const metaDescription = description || propertyDescription;
  
  // Construct canonical URL
  const canonicalUrl = `${baseUrl}${path}`;
  
  // Default image if none provided
  const defaultImage = '/assets/images/gallery01/3bad50ec.jpg';
  const imageUrls = images.length > 0 
    ? images.map(img => ({ url: img.startsWith('http') ? img : `${baseUrl}${img}` }))
    : [{ url: `${baseUrl}${defaultImage}` }];
  
  return {
    title: metaTitle,
    description: metaDescription,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      url: canonicalUrl,
      siteName,
      locale: 'en_US',
      type: 'website',
      images: imageUrls,
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTitle,
      description: metaDescription,
      images: imageUrls.map(img => img.url),
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default generateMetadata;
