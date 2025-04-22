'use client';
import { Accommodations } from '../../../../templates/project/src/pages/Accommodations';
import { Layout } from '../../../../templates/project/src/components/Layout';

export default function Page() {
  const propertyData = {
    name: "Twin Hills River Ranch",
    description: "A beautiful ranch resort with various accommodations and activities.",
    address: "123 Ranch Road, Twin Hills, TX"
  };

  return (
    <Layout propertyData={propertyData}>
      <Accommodations propertyData={propertyData} />
    </Layout>
  );
}
