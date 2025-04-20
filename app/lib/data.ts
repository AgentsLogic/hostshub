"use server";

import { createSupabaseServerClient } from "@/lib/supabase-server";

export async function getPropertyDataBySubdomain(subdomain: string) {
  const supabase = await createSupabaseServerClient();

  // Fetch website data to get property_id
  const { data: websiteData, error: websiteError } = await supabase
    .from('websites')
    .select('property_id')
    .eq('subdomain', subdomain)
    .single();

  if (websiteError || !websiteData) {
    console.error("Error fetching website data by subdomain:", websiteError);
    return null;
  }

  const propertyId = websiteData.property_id;

  // Fetch property data using property_id
  const { data: propertyData, error: propertyError } = await supabase
    .from('properties') // Assuming a 'properties' table exists
    .select('name, description, address') // Select the required fields
    .eq('id', propertyId)
    .single();

  if (propertyError || !propertyData) {
    console.error("Error fetching property data by ID:", propertyError);
    return null;
  }

  return propertyData;
}
