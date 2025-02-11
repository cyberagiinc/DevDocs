import { NextResponse } from 'next/server'
import { discoverSubdomains } from '@/lib/crawl-service'

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
    const pages = await discoverSubdomains({ url, depth: validatedDepth })
    console.log('Received pages from backend:', pages)

    // Even if we get an empty array, we should still return it with a 200 status
    return NextResponse.json({ 
      pages,
      message: pages.length === 0 ? 'No pages discovered' : `Found ${pages.length} pages`
    })
    
  } catch (error) {
    console.error('Error in discover route:', error)
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : 'Failed to discover pages',
        details: error instanceof Error ? error.stack : undefined
      },
      { status: 500 }
    )
  }
}