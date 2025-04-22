'use client';
import { Gallery } from '../../../../templates/project/src/pages/Gallery';
import { Layout } from '../../../../templates/project/src/components/Layout';

export default function Page() {
  const propertyData = {
    name: "Twin Hills River Ranch",
    description: "A beautiful ranch resort with various accommodations and activities.",
    address: "123 Ranch Road, Twin Hills, TX"
  };

  return (
    <Layout propertyData={propertyData}>
      <Gallery propertyData={propertyData} />
    </Layout>
  );
}
