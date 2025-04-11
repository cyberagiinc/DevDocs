import { NextResponse } from 'next/server';

// Define the backend URL, using environment variable or a default
const INTERNAL_BACKEND_URL = process.env.BACKEND_URL || 'http://backend:24125';

export async function GET(
    request: Request, // Keep request parameter even if unused for standard signature
    { params }: { params: { job_id: string } }
) {
    const { job_id } = params;

    if (!job_id) {
        return NextResponse.json({ error: 'Job ID is required' }, { status: 400 });
    }

    const targetUrl = `${INTERNAL_BACKEND_URL}/api/crawl-status/${job_id}`;
    console.log(`[API Route] GET /api/crawl-status/${job_id} - Proxying to: ${targetUrl}`);

    try {
        const response = await fetch(targetUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            cache: 'no-store', // Ensure fresh data is fetched every time
        });

        if (!response.ok) {
            console.error(`[API Route] Backend request failed for job ${job_id}: ${response.status} ${response.statusText}`);
            // Attempt to read error body from backend if available
            let errorBody = { error: 'Failed to fetch status from backend' };
            try {
                errorBody = await response.json();
            } catch (parseError) {
                console.error(`[API Route] Could not parse error response body from backend for job ${job_id}`);
            }
            return NextResponse.json(errorBody, { status: response.status });
        }

        const data = await response.json();
        // console.log(`[API Route] Successfully fetched status for job ${job_id}:`, data); // Optional: Log successful data
        return NextResponse.json(data);

    } catch (error) {
        console.error(`[API Route] Network or other error fetching status for job ${job_id}:`, error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}