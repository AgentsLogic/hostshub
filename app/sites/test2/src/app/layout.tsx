import { Layout } from '../components/Layout'; // Assuming Layout is in components

// Create a mock getPropertyDataBySubdomain since we can't access the real one
const getPropertyDataBySubdomain = (subdomain: string) => {
  return {
    name: "Twin Hills River Ranch",
    description: "A beautiful ranch resort with various accommodations and activities.",
    address: "123 Ranch Road, Twin Hills, TX"
  };
};

interface SiteLayoutProps {
  children: React.ReactNode;
  params: {
    subdomain: string;
  };
}

export default async function SiteLayout({ children, params }: SiteLayoutProps) {
  const subdomain = params.subdomain;

  // Fetch property data using the mocked function
  const propertyData = getPropertyDataBySubdomain(subdomain);

  if (!propertyData) {
    // Handle case where property data is not found
    return <div>Error: Property data not found for this subdomain.</div>;
  }

  return (
    <html lang="en">
      <body>
        <Layout propertyData={propertyData}>
          {children}
        </Layout>
      </body>
    </html>
  );
}
