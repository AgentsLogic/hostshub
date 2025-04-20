import { Home } from '../pages/Home';
import { Layout } from '../components/Layout';

interface PageProps {
  propertyData: {
    name: string;
    description: string;
    address: string;
  };
}

export default function Page({ propertyData }: PageProps) {
  return (
    <Layout propertyData={propertyData}>
      <Home propertyData={propertyData} />
    </Layout>
  );
}
