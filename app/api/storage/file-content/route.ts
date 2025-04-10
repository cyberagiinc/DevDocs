import { NextResponse } from 'next/server'
import { type NextRequest } from 'next/server'

// Determine backend URL (consider containerized vs. local development)
// In Docker, use the service name 'backend'. Locally, use localhost.
// Force using the service name for Docker context, as env var might not be reliable here.
const backendHost = 'http://backend:24125';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const filePath = searchParams.get('file_path'); // Expecting file_path relative to storage/markdown

    if (!filePath) {
      return NextResponse.json(
        { success: false, error: 'Missing file path parameter' },
        { status: 400 }
      );
    }

    // Basic validation/sanitization (more robust checks might be needed depending on usage)
    if (filePath.includes('..')) {
       return NextResponse.json(
        { success: false, error: 'Invalid file path' },
        { status: 400 }
      );
    }

    // Construct the backend URL
    // The backend endpoint expects 'file_path' query parameter
    const backendUrl = new URL(`${backendHost}/api/storage/file-content`);
    backendUrl.searchParams.append('file_path', filePath);

    console.log(`Fetching from backend: ${backendUrl.toString()}`); // Log the backend URL being called

    // Fetch the file content from the backend
    const response = await fetch(backendUrl.toString());

    if (!response.ok) {
      let errorData;
      try {
        // Try to parse JSON error from backend first
        errorData = await response.json();
      } catch (parseError) {
        // If backend didn't send JSON, use text
        errorData = { error: await response.text() };
      }
      console.error(`Backend fetch failed (${response.status}):`, errorData.error);
      return NextResponse.json(
        { success: false, error: errorData.error || `Failed to fetch file content (Status: ${response.status})` },
        { status: response.status }
      );
    }

    // Get content as text (backend returns PlainTextResponse)
    const content = await response.text();

    // Return content directly (assuming frontend handles rendering)
    // Set appropriate content type if needed, e.g., 'text/markdown'
    return new NextResponse(content, {
      status: 200,
      headers: {
        'Content-Type': filePath.endsWith('.json') ? 'application/json' : 'text/plain; charset=utf-8', // Adjust content type based on file extension
      },
    });

  } catch (error) {
    console.error('Error fetching storage file content:', error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Failed to fetch file content' },
      { status: 500 }
    );
  }
}