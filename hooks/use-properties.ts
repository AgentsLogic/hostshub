"use client"

import { useState, useEffect, useCallback } from "react";
// No longer need Supabase client or useAuth here
// import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
// import { useAuth } from "@/contexts/auth-context";
import { Database } from "@/lib/database.types"; // Still useful for type hints if needed

// Define the Property type based on DB schema + desired frontend structure
export interface Property {
  id: string;
  title: string; // Mapped from 'name'
  description: string;
  location: {
    address: string;
    city: string;
    state: string;
    zip: string; // Mapped from 'zip_code'
    country: string;
  };
  price: number; // Mapped from 'base_price'
  bedrooms: number;
  bathrooms: number;
  maxGuests: number; // Mapped from 'max_guests'
  amenities: string[];
  images: string[];
  status: "active" | "inactive" | "maintenance"; // Match DB enum
  // rating and reviews are not in the DB schema provided
  owner_id?: string; // Keep track of owner if needed
}


export function useProperties() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // const { user } = useAuth(); // No longer needed
  // const supabase = createClientComponentClient<Database>(); // No longer needed

  const fetchProperties = useCallback(async () => {
    // No need to check for user here, API route handles authentication
    setIsLoading(true);
    setError(null);

    try {
      // Fetch properties from the new API route
      const response = await fetch('/api/my-properties');

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.details || errorData.error || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Assuming the API returns data matching the DB schema structure
      // Map the fetched data to the frontend Property interface structure
      const fetchedProperties: Property[] = data?.map((p: any) => ({ // Use 'any' or define a DB type
        id: p.id,
        title: p.name, // Map name to title
        description: p.description,
        location: { // Create nested location object
          address: p.address,
          city: p.city,
          state: p.state,
          zip: p.zip_code, // Map zip_code to zip
          country: p.country,
        },
        price: p.base_price, // Map base_price to price
        // Removed duplicated lines below
        bedrooms: p.bedrooms,
        bathrooms: p.bathrooms,
        maxGuests: p.max_guests, // Map max_guests to maxGuests
        amenities: p.amenities || [], // Handle potential null
        images: p.images || [], // Handle potential null
        status: p.status,
        owner_id: p.owner_id,
        // rating and reviews are omitted as they are not in the DB schema
      })) || [];

      setProperties(fetchedProperties);

    } catch (err: any) {
      console.error("Error fetching properties via API:", err);
      setError(err.message || "Failed to fetch properties");
      setProperties([]); // Clear properties on error
    } finally {
      setIsLoading(false);
    }
  }, []); // Dependency array is now empty as we don't depend on user/supabase client here

  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]); // fetchProperties is stable due to useCallback with empty deps

  return { properties, isLoading, error, refetch: fetchProperties }; // Expose error state and refetch function
}
