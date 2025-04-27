import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
// Removed logger import as it doesn't exist

export async function POST(
    request: NextRequest,
    { params }: { params: { job_id: string } }
) {
    const jobId = params.job_id;

    if (!jobId) {
        console.warn('crawl-cancel API route called without job_id');
        return NextResponse.json({ detail: 'Job ID is required' }, { status: 400 });
    }

    const backendUrl = process.env.BACKEND_API_URL;
    if (!backendUrl) {
        console.error('BACKEND_API_URL environment variable is not set.');
        return NextResponse.json({ detail: 'Backend service URL is not configured' }, { status: 500 });
    }

    const targetUrl = `${backendUrl}/api/crawl-cancel/${jobId}`;
    console.log(`Proxying cancellation request for job ${jobId} to backend: ${targetUrl}`);

    try {
        const backendResponse = await fetch(targetUrl, {
            method: 'POST',
            headers: {
                // Forward any necessary headers if needed, e.g., Authorization
                // 'Content-Type': 'application/json', // No body for this request
            },
            // No body needed for this specific backend endpoint
        });

        // Attempt to parse the JSON body regardless of status code,
        // as the backend might return error details in JSON format.
        let responseBody;
        try {
            responseBody = await backendResponse.json();
        } catch (e) {
            // If parsing fails, the body might be empty or not JSON.
            console.warn(`Failed to parse JSON response from backend for job ${jobId} cancellation. Status: ${backendResponse.status}. Body might be empty or non-JSON.`);
            responseBody = { detail: backendResponse.statusText || 'Backend returned non-JSON response' }; // Provide a default error detail
        }

        // Forward the backend's status code and parsed body (or default error)
        console.log(`Backend response for job ${jobId} cancellation: Status=${backendResponse.status}, Body=${JSON.stringify(responseBody)}`);
        return NextResponse.json(responseBody, { status: backendResponse.status });

    } catch (error) {
        // Handle network errors or other issues connecting to the backend
        console.error(`Error proxying cancellation request for job ${jobId} to backend: ${error}`);
        // Distinguish network error from backend application error
        return NextResponse.json({ detail: `Failed to connect to backend service: ${error instanceof Error ? error.message : 'Unknown error'}` }, { status: 502 }); // 502 Bad Gateway indicates proxy failure
    }
}