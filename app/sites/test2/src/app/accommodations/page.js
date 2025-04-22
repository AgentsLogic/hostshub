import React from 'react';
import { Accommodations } from '../../pages/Accommodations';
import { Layout } from '../../components/Layout';

// Define mock property data to avoid the "Cannot read properties of undefined" error
const mockPropertyData = {
  name: "Twin Hills River Ranch",
  description: "A beautiful riverside retreat with various outdoor activities.",
  address: "123 River Road, Twin Hills, TX"
};

// Define generateStaticParams to ensure the page gets pre-rendered properly
export function generateStaticParams() {
  return [];
}

export default function Page() {
  return (
    <Layout>
      <Accommodations propertyData={mockPropertyData} />
    </Layout>
  );
}
