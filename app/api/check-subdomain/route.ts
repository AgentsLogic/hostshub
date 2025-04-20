import { createSupabaseServerClient } from '@/lib/supabase-server'
import { NextResponse } from 'next/server'

// Mock data of already taken subdomains (for development mode only)
const takenSubdomains = [
  'luxury-beach', 
  'beachfront', 
  'oceanview', 
  'mountain-retreat',
  'downtown',
  'cityview',
  'forest-cabin',
  'lakehouse',
  'riverview',
  'desert-oasis'
];

export async function POST(request: Request) {
  const { subdomain } = await request.json()

  if (!subdomain) {
    return NextResponse.json(
      { error: 'Subdomain is required' },
      { status: 400 }
    )
  }

  // Check if we're in development environment
  const isDevelopment = process.env.NODE_ENV === 'development';

  try {
    // First validate the subdomain format
    const subdomainRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
    if (!subdomainRegex.test(subdomain)) {
      return NextResponse.json(
        { error: 'Subdomain can only contain lowercase letters, numbers and hyphens' },
        { status: 400 }
      );
    }

    // Check minimum length
    if (subdomain.length < 3) {
      return NextResponse.json(
        { error: 'Subdomain must be at least 3 characters' },
        { status: 400 }
      );
    }

    // Check reserved subdomains
    const reservedSubdomains = ['www', 'app', 'admin', 'api', 'test'];
    if (reservedSubdomains.includes(subdomain)) {
      return NextResponse.json(
        { error: 'This subdomain is reserved' },
        { status: 400 }
      );
    }

    // Special handling for development environment
    if (isDevelopment) {
      console.log('Development mode - checking subdomain against mock data:', subdomain);
      
      // Check if subdomain is in our mock "taken" list
      const isTaken = takenSubdomains.includes(subdomain);
      
      return NextResponse.json({
        available: !isTaken,
        message: isTaken ? 'Subdomain is already taken' : 'Subdomain is available'
      });
    } 
    
    // Production environment - check against actual database
    const supabase = await createSupabaseServerClient();
    
    const { data, error } = await supabase
      .from('websites')
      .select('subdomain')
      .eq('subdomain', subdomain)
      .maybeSingle();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { 
          error: 'Database error checking subdomain',
          details: error.message 
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      available: !data,
      message: data ? 'Subdomain is already taken' : 'Subdomain is available'
    });
  } catch (error) {
    console.error('Error checking subdomain:', error);
    return NextResponse.json(
      { 
        error: 'Failed to check subdomain availability',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
