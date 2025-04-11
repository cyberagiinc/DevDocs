import { NextRequest, NextResponse } from 'next/server';

// Define the internal backend URL with a fallback
const INTERNAL_BACKEND_URL = process.env.BACKEND_URL || 'http://backend:24125';
const CONFIG_ENDPOINT = `${INTERNAL_BACKEND_URL}/api/mcp/config`;

export async function GET(request: NextRequest) {
  console.log(`[API MCP Config] Received GET request`);

  try {
    console.log(`[API MCP Config] Fetching config from: ${CONFIG_ENDPOINT}`);
    const response = await fetch(CONFIG_ENDPOINT, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            // Forward any relevant headers if needed in the future
        },
        cache: 'no-store', // Ensure fresh data is fetched
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`[API MCP Config] Backend request failed: ${response.status} ${response.statusText}`, errorText);
      return NextResponse.json(
        { error: `Failed to fetch MCP config from backend: ${response.statusText}`, details: errorText },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log(`[API MCP Config] Successfully fetched config. Data received from backend:`, JSON.stringify(data)); // Roo Debug Log
    return NextResponse.json(data);

  } catch (error) {
    console.error('[API MCP Config] Error fetching MCP config:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json(
        { error: 'Internal Server Error fetching MCP config', details: errorMessage },
        { status: 500 }
    );
  }
}