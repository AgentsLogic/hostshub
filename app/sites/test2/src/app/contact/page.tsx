import { Contact } from '../../pages/Contact';
import { Layout } from '../../components/Layout';

export default function Page() {
  // Provide default property data to prevent the error
  const propertyData = {
    name: "Twin Hills River Ranch",
    description: "A beautiful ranch resort with various accommodations and activities.",
    address: "123 Ranch Road, Twin Hills, TX"
  };

  return (
    <Layout propertyData={propertyData}>
      <Contact propertyData={propertyData} />
    </Layout>
  );
}
