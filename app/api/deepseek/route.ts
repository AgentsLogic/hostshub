import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
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

    const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
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

    if (!response.ok) {
      const error = await response.text();
      return NextResponse.json({ error }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json({ result: data });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
