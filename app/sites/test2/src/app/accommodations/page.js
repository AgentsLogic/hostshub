import { Accommodations } from '../../pages/Accommodations';
import { Layout } from '../../components/Layout';
import { supabase } from '@/lib/supabase';

export default async function Page({ params }) {
  const { data: property, error } = await supabase
    .from('properties')
    .select('name, description, address')
    .eq('subdomain', params.subdomain)
    .single();

  if (error) {
    console.error("Error fetching property:", error);
    return (
      <Layout>
        <div>Error loading accommodations.</div>
      </Layout>
    );
  }

  if (!property) {
    return (
      <Layout>
        <div>Property not found.</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Accommodations propertyData={property} />
    </Layout>
  );
}
