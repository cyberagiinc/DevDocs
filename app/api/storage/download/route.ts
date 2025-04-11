import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    // Correctly get the 'file_path' parameter sent by the frontend
    const filePath = searchParams.get('file_path')

    if (!filePath) {
      return NextResponse.json(
        { success: false, error: 'No file path provided' },
        { status: 400 }
      )
    }

    console.log(`[Download Debug] Received raw file path parameter: ${filePath}`)

    // Security check to ensure the path is within the storage directory
    const storagePath = path.join(process.cwd(), 'storage/markdown')
    // *** Problem Area: Construct the full path from the filename parameter ***
    // const normalizedPath = path.normalize(filePath) // Original incorrect line
    const normalizedPath = path.normalize(path.join(storagePath, filePath)) // Attempt to construct full path
    
    console.log(`[Download Debug] Calculated storagePath: ${storagePath}`)
    console.log(`[Download Debug] Constructed normalizedPath: ${normalizedPath}`)
    
    const isPathValid = normalizedPath.startsWith(storagePath)
    console.log(`[Download Debug] Security check (normalizedPath startsWith storagePath): ${isPathValid}`)

    if (!isPathValid) {
      console.error(`[Download Debug] Security check failed: Constructed path ${normalizedPath} is outside of allowed storage directory ${storagePath}`)
      return NextResponse.json(
        { success: false, error: 'Invalid file path requested' },
        { status: 403 }
      )
    }

    // Check if file exists
    try {
      await fs.access(normalizedPath)
    } catch {
      console.error(`File not found: ${normalizedPath}`)
      return NextResponse.json(
        { success: false, error: 'File not found' },
        { status: 404 }
      )
    }

    // Read the file
    const content = await fs.readFile(normalizedPath, 'utf-8')
    const fileSize = Buffer.byteLength(content, 'utf8')
    console.log(`File read successfully: ${normalizedPath} (${fileSize} bytes)`)

    // If it's a JSON file, verify it's valid JSON and check if it's a consolidated file
    if (path.extname(filePath) === '.json') {
      try {
        const jsonData = JSON.parse(content)
        
        // Check if this is a consolidated file
        if (jsonData.pages && Array.isArray(jsonData.pages)) {
          console.log(`Consolidated JSON file detected with ${jsonData.pages.length} pages`)
        }
      } catch (e) {
        console.error(`Invalid JSON file: ${normalizedPath}`, e)
        return NextResponse.json(
          { success: false, error: 'Invalid JSON file' },
          { status: 500 }
        )
      }
    } else if (path.extname(filePath) === '.md') {
      // For markdown files, check if it's a consolidated file by looking for section markers
      const sectionMatches = content.match(/## .+\nURL: .+/g)
      if (sectionMatches && sectionMatches.length > 0) {
        console.log(`Consolidated Markdown file detected with ${sectionMatches.length} sections`)
      }
    }
    
    // Determine content type based on file extension
    const contentType = path.extname(filePath) === '.json'
      ? 'application/json'
      : 'text/markdown'

    // Create response with appropriate headers for download
    return new NextResponse(content, {
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `attachment; filename="${path.basename(filePath)}"`,
      },
    })
  } catch (error) {
    console.error('Error downloading file:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to download file'
      },
      { status: 500 }
    )
  }
}