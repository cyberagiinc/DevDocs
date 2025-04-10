import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Missing file ID' },
        { status: 400 }
      )
    }
    
    // Fetch the in-memory file from the backend
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || process.env.BACKEND_URL || 'http://localhost:24125'
    const response = await fetch(`${backendUrl}/api/memory-files/${id}`)
    
    if (!response.ok) {
      const errorData = await response.json()
      return NextResponse.json(
        { success: false, error: errorData.error || 'Failed to fetch in-memory file' },
        { status: response.status }
      )
    }
    
    const data = await response.json()
    
    if (!data.success) {
      return NextResponse.json(
        { success: false, error: data.error || 'Failed to fetch in-memory file' },
        { status: 500 }
      )
    }
    
    return NextResponse.json({
      success: true,
      content: data.content,
      metadata: data.metadata
    })
  } catch (error) {
    console.error('Error fetching in-memory file:', error)
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Failed to fetch in-memory file' },
      { status: 500 }
    )
  }
}