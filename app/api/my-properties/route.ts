import { createSupabaseServerClient } from '@/lib/supabase-server';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// Mock property data for development environment
const mockProperties = [
  {
    id: "a1b2c3d4-e5f6-7890-1234-567890abcdef", // Sample UUID
    owner_id: "test-user-id",
    name: "Luxury Beach House",
    description: "Beautiful beachfront property with stunning ocean views",
    address: "123 Ocean Drive",
    city: "Malibu",
    state: "CA",
    zip_code: "90210",
    country: "USA",
    bedrooms: 4,
    bathrooms: 3,
    max_guests: 8,
    amenities: ["Wi-Fi", "Pool", "Beach Access", "Kitchen", "Air Conditioning"],
    images: ["/placeholder.svg?height=300&width=500"],
    base_price: 350,
    status: "active"
  },
  {
    id: "b2c3d4e5-f678-9012-3456-7890abcdef12", // Sample UUID
    owner_id: "test-user-id",
    name: "Downtown Loft",
    description: "Modern loft in the heart of the city",
    address: "456 Main Street",
    city: "New York",
    state: "NY",
    zip_code: "10001",
    country: "USA",
    bedrooms: 2,
    bathrooms: 2,
    max_guests: 4,
    amenities: ["Wi-Fi", "Gym", "Parking", "Kitchen", "Air Conditioning"],
    images: ["/placeholder.svg?height=300&width=500"],
    base_price: 200,
    status: "active"
  },
  {
    id: "c3d4e5f6-7890-1234-5678-90abcdef1234", // Sample UUID
    owner_id: "test-user-id",
    name: "Mountain Cabin",
    description: "Cozy cabin with mountain views",
    address: "789 Pine Road",
    city: "Aspen",
    state: "CO",
    zip_code: "81611",
    country: "USA",
    bedrooms: 3,
    bathrooms: 2,
    max_guests: 6,
    amenities: ["Wi-Fi", "Fireplace", "Hot Tub", "Kitchen", "Heating"],
    images: ["/placeholder.svg?height=300&width=500"],
    base_price: 180,
    status: "active"
  }
];

export async function GET() {
  // Check if we're in development environment
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  // If in development, return mock data without authentication
  if (isDevelopment) {
    console.log('Development mode - returning mock properties data');
    return NextResponse.json(mockProperties);
  }
  
  // Otherwise, continue with normal authentication and real data fetching
  const supabase = await createSupabaseServerClient();

  try {
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();

    if (sessionError) {
      console.error('Session error:', sessionError);
      return NextResponse.json({ error: 'Failed to get user session', details: sessionError.message }, { status: 500 });
    }

    if (!session?.user) {
      return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
    }

    const userId = session.user.id;

    // Fetch properties for the authenticated user
    const { data: properties, error: dbError } = await supabase
      .from('properties')
      .select(`
        id,
        owner_id,
        name,
        description,
        address,
        city,
        state,
        zip_code,
        country,
        bedrooms,
        bathrooms,
        max_guests,
        amenities,
        images,
        base_price,
        status
      `)
      .eq('owner_id', userId);

    if (dbError) {
      console.error('Supabase error fetching properties:', dbError);
      // Check if it's an RLS issue (though server client might bypass if configured, good to check)
      if (dbError.code === '42501') { // permission denied for table properties
         return NextResponse.json({ error: 'Permission denied. Check Row Level Security policies for properties table.', details: dbError.message }, { status: 403 });
      }
      return NextResponse.json({ error: 'Database error fetching properties', details: dbError.message }, { status: 500 });
    }

    // Return the fetched properties
    return NextResponse.json(properties || []);

  } catch (error: any) {
    console.error('API route error:', error);
    return NextResponse.json({ error: 'Internal server error', details: error.message }, { status: 500 });
  }
}
