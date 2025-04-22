'use client';
import { Layout } from '../../../templates/project/src/components/Layout';

// Create a simple Home component directly in this file since we can't resolve the import
const Home = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Welcome to Twin Hills River Ranch</h1>
      <p className="mb-4">
        Experience the beauty and tranquility of our beautiful ranch, nestled in the heart of nature.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-3">Our Accommodations</h2>
          <p>
            Comfortable and spacious lodging options for individuals, couples, and families.
          </p>
        </div>
        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-3">Activities</h2>
          <p>
            Explore hiking trails, fishing spots, horseback riding, and more during your stay.
          </p>
        </div>
      </div>
    </div>
  );
};

export default function Page() {
  return (
    <Layout propertyData={{
      name: "Twin Hills River Ranch",
      description: "A beautiful ranch resort with various accommodations and activities.",
      address: "123 Ranch Road, Twin Hills, TX"
    }}>
      <Home />
    </Layout>
  );
}
