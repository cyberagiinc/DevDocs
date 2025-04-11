import { NextResponse } from 'next/server'
import { DiscoveredPage, CrawlRequest } from '@/lib/types' // Added CrawlRequest

export async function POST(request: Request) {
  try {
    // Extract pages and job_id from the request
    const { pages, job_id }: CrawlRequest = await request.json()

    // Validate input
    if (!Array.isArray(pages) || !job_id) {
      return NextResponse.json(
        { error: 'Pages array and job_id are required' },
        { status: 400 }
      )
    }

    // Define backend URL
    const INTERNAL_BACKEND_URL = process.env.BACKEND_URL || 'http://backend:24125';
    const backendCrawlUrl = `${INTERNAL_BACKEND_URL}/api/crawl`;

    console.log(`Proxying crawl request for job_id: ${job_id} to ${backendCrawlUrl} with ${pages.length} pages.`);

    // Make the actual backend call
    const response = await fetch(backendCrawlUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ pages, job_id }),
    });

    // Handle backend error response
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Backend crawl request failed for job_id: ${job_id}. Status: ${response.status}, Body: ${errorText}`);
      return NextResponse.json(
        { error: `Backend request failed: ${response.statusText}`, details: errorText },
        { status: response.status }
      );
    }

    // Parse and forward the successful backend response
    const backendData = await response.json();
    console.log(`Backend crawl request successful for job_id: ${job_id}. Response:`, backendData);
    return NextResponse.json(backendData); // Forward backend response directly

  } catch (error) {
    console.error('Error in Next.js /api/crawl route:', error)
    // Ensure error is an instance of Error before accessing message
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json(
      { error: 'Failed to proxy crawl request', details: errorMessage },
      { status: 500 }
    )
  }
}