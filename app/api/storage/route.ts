import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

const STORAGE_DIR = path.join(process.cwd(), 'storage/markdown')

export async function POST(request: Request) {
  try {
    const { url, content } = await request.json()
    
    // Create storage directory if it doesn't exist
    await fs.mkdir(STORAGE_DIR, { recursive: true })
    
    // Generate filename from URL
    const filename = url
      .replace(/^https?:\/\//, '')
      .replace(/[^a-z0-9]/gi, '_')
      .toLowerCase() + '.md'
    
    const filePath = path.join(STORAGE_DIR, filename)
    await fs.writeFile(filePath, content, 'utf-8')
    
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Failed to save markdown' },
      { status: 500 }
    )
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const url = searchParams.get('url')
    
    // Handle list request
    if (!url) {
      // Only get .md files
      const files = await fs.readdir(STORAGE_DIR)
      const mdFiles = files.filter(f => f.endsWith('.md'))
      const jsonFiles = files.filter(f => f.endsWith('.json'))
      
      // Define interface for disk file details
      interface DiskFileDetail {
        name: string;
        jsonPath: string;
        markdownPath: string;
        timestamp: Date;
        size: number;
        wordCount: number;
        charCount: number;
        isConsolidated: boolean;
        pagesCount: number;
        rootUrl: string;
        isInMemory: boolean;
      }

      // Get disk files
      const diskFileDetails: DiskFileDetail[] = await Promise.all(
        mdFiles.map(async (filename) => {
          const mdPath = path.join(STORAGE_DIR, filename)
          const jsonPath = path.join(STORAGE_DIR, filename.replace('.md', '.json'))
          const stats = await fs.stat(mdPath)
          const content = await fs.readFile(mdPath, 'utf-8')
          
          // Check if this is a consolidated file by examining the JSON metadata
          let isConsolidated = false
          let pagesCount = 0
          let rootUrl = ''
          
          if (jsonFiles.includes(filename.replace('.md', '.json'))) {
            try {
              const jsonContent = await fs.readFile(jsonPath, 'utf-8')
              const metadata = JSON.parse(jsonContent)
              
              // If the metadata has a "pages" array, it's a consolidated file
              if (metadata.pages && Array.isArray(metadata.pages)) {
                isConsolidated = true
                pagesCount = metadata.pages.length
                rootUrl = metadata.root_url || ''
              }
            } catch (e) {
              console.error(`Error reading JSON metadata for ${filename}:`, e)
            }
          } else {
            // Create JSON file if it doesn't exist
            const jsonContent = JSON.stringify({
              content,
              metadata: {
                wordCount: content.split(/\s+/).length,
                charCount: content.length,
                timestamp: stats.mtime
              }
            }, null, 2)
            await fs.writeFile(jsonPath, jsonContent, 'utf-8')
          }
          
          // Extract sections to count how many pages are included
          if (!pagesCount && isConsolidated) {
            // Count sections that start with "## " and have a URL: line after them
            const sectionMatches = content.match(/## .+\nURL: .+/g)
            pagesCount = sectionMatches ? sectionMatches.length : 0
          }
          
          return {
            name: filename.replace('.md', ''),
            jsonPath,
            markdownPath: mdPath,
            timestamp: stats.mtime,
            size: stats.size,
            wordCount: content.split(/\s+/).length,
            charCount: content.length,
            isConsolidated,
            pagesCount: isConsolidated ? pagesCount : 1,
            rootUrl: rootUrl || '',
            isInMemory: false
          }
        })
      )
      
      // Define interface for in-memory file
      interface MemoryFile {
        name: string;
        path: string;
        timestamp: string;
        size: number;
        wordCount: number;
        charCount: number;
        isInMemory: boolean;
        isJson: boolean;
        metadata?: any;
      }
      
      // Removed fetching and combining of in-memory files as that feature was removed.
      // We now only work with files read from disk.
      const allFiles = diskFileDetails // Keep variable name for minimal diff, even though it's just disk files now

      // Filter out individual files (non-consolidated files)
      // Only show consolidated files in the Stored Files section
      const consolidatedFiles = allFiles.filter((file: DiskFileDetail) => file.isConsolidated)
      
      return NextResponse.json({
        success: true,
        files: consolidatedFiles
      })
    }
    
    // Handle single file request
    const filename = url
      .replace(/^https?:\/\//, '')
      .replace(/[^a-z0-9]/gi, '_')
      .toLowerCase() + '.md'
    
    const filePath = path.join(STORAGE_DIR, filename)
    const content = await fs.readFile(filePath, 'utf-8')
    
    return NextResponse.json({ success: true, content })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Failed to load markdown' },
      { status: 500 }
    )
  }
}