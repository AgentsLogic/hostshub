import { Layout } from '../components/Layout';
import { PropertyDataProvider } from '../contexts/PropertyDataContext';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { getPropertyDataBySubdomain, propertyExists } from '../utils/db';
import { generateMetadata as createMetadata } from '../utils/metadata';
import { Metadata } from 'next';

interface SiteLayoutProps {
  children: React.ReactNode;
  params: {
    subdomain: string;
  };
}

// Generate metadata for the site
export async function generateMetadata({ params }: SiteLayoutProps): Promise<Metadata> {
  const subdomain = params.subdomain || '';
  const propertyData = await getPropertyDataBySubdomain(subdomain);

  return createMetadata({
    propertyData,
    path: `/${subdomain}`,
  });
}

export default async function SiteLayout({ children, params }: SiteLayoutProps) {
  const subdomain = params.subdomain || '';

  // Check if property exists
  const exists = await propertyExists(subdomain);

  if (!exists) {
    // Handle case where property doesn't exist
    return (
      <html lang="en">
        <body>
          <div className="p-6 bg-red-50 border border-red-200 rounded-lg max-w-lg mx-auto mt-10">
            <h2 className="text-xl font-semibold text-red-700 mb-2">Property Not Found</h2>
            <p className="text-red-600 mb-4">
              We couldn't find a property for this subdomain. Please check the URL and try again.
            </p>
          </div>
        </body>
      </html>
    );
  }

  // Fetch property data with built-in fallback
  const propertyData = await getPropertyDataBySubdomain(subdomain);

  return (
    <html lang="en">
      <body>
        <PropertyDataProvider initialData={propertyData}>
          <ErrorBoundary>
            <Layout>
              {children}
            </Layout>
          </ErrorBoundary>
        </PropertyDataProvider>
      </body>
    </html>
  );
}
