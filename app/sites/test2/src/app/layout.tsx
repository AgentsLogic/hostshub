import { Layout } from '../components/Layout'; // Assuming Layout is in components
import { getPropertyDataBySubdomain } from "../../../../app/lib/data"; // Import the new server action

interface SiteLayoutProps {
  children: React.ReactNode;
  params: {
    subdomain: string;
  };
}

export default async function SiteLayout({ children, params }: SiteLayoutProps) {
  const subdomain = params.subdomain;

  // Fetch property data using the server action
  const propertyData = await getPropertyDataBySubdomain(subdomain);

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
