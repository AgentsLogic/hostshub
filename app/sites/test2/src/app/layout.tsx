import { Layout } from '../components/Layout';
import { PropertyDataProvider } from '../contexts/PropertyDataContext';
import { ErrorBoundary } from '../components/ErrorBoundary';

// Create a mock getPropertyDataBySubdomain since we can't access the real one
const getPropertyDataBySubdomain = async (subdomain: string) => {
  try {
    // In a real application, this would fetch from a database
    // For now, return mock data
    return {
      name: "Twin Hills River Ranch",
      description: "A beautiful ranch resort with various accommodations and activities.",
      address: "123 Ranch Road, Twin Hills, TX"
    };
  } catch (error) {
    console.error("Error fetching property data:", error);
    return null;
  }
};

interface SiteLayoutProps {
  children: React.ReactNode;
  params: {
    subdomain: string;
  };
}

export default async function SiteLayout({ children, params }: SiteLayoutProps) {
  const subdomain = params.subdomain || '';

  // Fetch property data using the mocked function
  const propertyData = await getPropertyDataBySubdomain(subdomain);

  if (!propertyData) {
    // Handle case where property data is not found
    return (
      <html lang="en">
        <body>
          <div className="p-6 bg-red-50 border border-red-200 rounded-lg max-w-lg mx-auto mt-10">
            <h2 className="text-xl font-semibold text-red-700 mb-2">Property Not Found</h2>
            <p className="text-red-600 mb-4">
              We couldn't find property data for this subdomain. Please check the URL and try again.
            </p>
          </div>
        </body>
      </html>
    );
  }

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
