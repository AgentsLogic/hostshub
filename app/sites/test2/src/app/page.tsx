import { Home } from '../pages/Home';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { getPropertyDataBySubdomain } from '../utils/db';
import { generateMetadata as createMetadata } from '../utils/metadata';
import { Metadata } from 'next';

interface PageProps {
  params: {
    subdomain: string;
  };
}

// Generate metadata for the home page
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const subdomain = params.subdomain || '';
  const propertyData = await getPropertyDataBySubdomain(subdomain);

  return createMetadata({
    title: 'Home',
    description: `Welcome to ${propertyData.name}. ${propertyData.description}`,
    propertyData,
    path: `/${subdomain}`,
    images: ['/assets/images/gallery01/3bad50ec.jpg'],
  });
}

export default function Page() {
  return (
    <ErrorBoundary fallback={
      <div className="p-6 bg-red-50 border border-red-200 rounded-lg max-w-lg mx-auto mt-10">
        <h2 className="text-xl font-semibold text-red-700 mb-2">Error Loading Home Page</h2>
        <p className="text-red-600 mb-4">
          We encountered an error while loading the home page. Please try again later.
        </p>
      </div>
    }>
      <Home />
    </ErrorBoundary>
  );
}
