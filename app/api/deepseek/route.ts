import { NextRequest, NextResponse } from "next/server";

export const maxDuration = 300; // 5 minutes in seconds

export async function POST(req: NextRequest) {
  const startTime = Date.now();
  console.log('Deepseek API request started');
  try {
    const body = await req.json();

    const {
      location,
      minPrice,
      maxPrice,
      propertyType,
      roi,
      bedrooms,
      bathrooms,
      size,
      rentalDemand,
      attractions,
      strategy,
      financing,
      preferences
    } = body;

    const apiKey = process.env.DEEPSEEK_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "DeepSeek API key not configured" }, { status: 500 });
    }

    const initialPrompt = `
Find profitable Airbnb investment properties with the following criteria:
- Location: ${location}
- Price Range: ${minPrice} to ${maxPrice}
- Property Type: ${propertyType}
- Expected ROI: ${roi}%
- Bedrooms: ${bedrooms}
- Bathrooms: ${bathrooms}
- Size: ${size} sqft/sqm
- Rental Demand: ${rentalDemand}
- Nearby Attractions: ${attractions}
- Investment Strategy: ${strategy}
- Financing: ${financing}
- Additional Preferences: ${preferences}
Provide detailed suggestions with estimated ROI and reasons why these properties are good investments.
    `;

    const messages = [
      { role: "system", content: "You are an expert real estate investment advisor." },
      { role: "user", content: initialPrompt }
    ];

    console.log('Starting Deepseek API request with timeout:', 300000);
    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      console.log('Timeout triggered - aborting request');
      controller.abort();
    }, 300000); // 300 seconds
    
    const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
      signal: controller.signal,
      keepalive: true,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages,
        temperature: 0.7,
        max_tokens: 800
      })
    });

    clearTimeout(timeoutId);
    
    if (!response.ok) {
      const error = await response.text();
      console.error('Deepseek API response error:', {
        status: response.status,
        error: error,
        headers: Object.fromEntries(response.headers.entries())
      });
      return NextResponse.json({ 
        error: "API request failed",
        details: error,
        status: response.status 
      }, { status: response.status });
    }

    const data = await response.json();
    console.log(`Deepseek API request completed in ${Date.now() - startTime}ms`);
    return NextResponse.json({ result: data });
  } catch (error) {
    console.error('Deepseek API error:', error);
    if (error instanceof Error && error.name === 'AbortError') {
      const duration = Date.now() - startTime;
      console.log(`Deepseek API request timed out after ${duration}ms`);
      return NextResponse.json(
        { 
          error: "Request timed out",
          duration: duration,
          timeoutMs: 300000
        }, 
        { status: 504 }
      );
    }
    return NextResponse.json(
      { error: "Internal server error" }, 
      { status: 500 }
    );
  }
}
