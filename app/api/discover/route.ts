     import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { url, depth = 3 } = await request.json()

    if (!url) {
      return NextResponse.json(
        { error: 'URL is required' },
        { status: 400 }
      )
    }

    // Validate depth is between 1 and 5
    const validatedDepth = Math.min(5, Math.max(1, parseInt(String(depth)) || 3))
    
    console.log('Making discover request for URL:', url, 'with depth:', validatedDepth)
    
    // Make a direct request to the backend API instead of using the discoverSubdomains function
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || process.env.BACKEND_URL || 'http://localhost:24125'
    console.log('Using backend URL:', backendUrl)
    
    console.log('Sending request to backend API:', `${backendUrl}/api/discover`)
    const response = await fetch(`${backendUrl}/api/discover`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url, depth: validatedDepth }),
    })
    
    console.log('Response status from backend:', response.status)
    
    if (!response.ok) {
      const errorData = await response.json()
      console.error('Error response from backend:', errorData)
      return NextResponse.json(
        { error: errorData.error || 'Failed to discover pages' },
        { status: response.status }
      )
    }
    
    const data = await response.json()
    console.log('Received response from backend:', data)
    console.log('Discovered pages count:', data.pages?.length || 0)
    if (data.pages?.length > 0) {
      console.log('First discovered page:', data.pages[0])
    } else {
      console.warn('No pages were discovered')
    }

    // Even if we get an empty array, we should still return it with a 200 status
    return NextResponse.json({
      pages: data.pages || [],
      message: data.message || (data.pages?.length === 0 ? 'No pages discovered' : `Found ${data.pages?.length} pages`)
    })
    
  } catch (error) {
    console.error('Error in discover route:', error)
    
    // Log more detailed information about the error
    if (error instanceof Error) {
      console.error('Error name:', error.name)
      console.error('Error message:', error.message)
      console.error('Error stack:', error.stack)
      
      // Check for network-related errors
      if (error.message.includes('fetch') || error.message.includes('network') || error.message.includes('ECONNREFUSED')) {
        console.error('Network error detected - possible connection issue to backend service')
      }
      
      // Check for timeout errors
      if (error.message.includes('timeout')) {
        console.error('Timeout error detected - backend service might be taking too long to respond')
      }
    }
    
    // Check if it's a TypeError, which might indicate issues with the response format
    if (error instanceof TypeError) {
      console.error('TypeError detected - possible issue with response format or undefined values')
    }
    
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Failed to discover pages',
        details: error instanceof Error ? error.stack : undefined,
        errorType: error instanceof Error ? error.name : 'Unknown',
        pages: []
      },
      { status: 500 }
    )
  }
}