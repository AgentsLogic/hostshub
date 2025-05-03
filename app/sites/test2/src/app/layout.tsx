import { Layout } from '../components/Layout';
import { PropertyDataProvider } from '../contexts/PropertyDataContext';

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
    return <div>Error: Property data not found for this subdomain.</div>;
  }

  return (
    <html lang="en">
      <body>
        <PropertyDataProvider initialData={propertyData}>
          <Layout>
            {children}
          </Layout>
        </PropertyDataProvider>
      </body>
    </html>
  );
}
