import { MetadataRoute } from 'next';

/**
 * Generate sitemap for the site
 * @returns Sitemap configuration
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://hostshub.ai';
  const subdomain = 'test2'; // In a real app, this would be dynamic
  
  // Define all routes for the site
  const routes = [
    '',
    '/accommodations',
    '/activities',
    '/gallery',
    '/contact',
  ];
  
  // Generate sitemap entries
  return routes.map((route) => ({
    url: `${baseUrl}/${subdomain}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1.0 : 0.8,
  }));
}
