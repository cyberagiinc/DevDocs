import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

const STORAGE_DIR = path.join(process.cwd(), 'storage/markdown')

export async function GET(request: Request) {
  try {
    // Only get .md files
    const files = await fs.readdir(STORAGE_DIR)
    const mdFiles = files.filter(f => f.endsWith('.md'))
    const jsonFiles = files.filter(f => f.endsWith('.json'))
    
    // Get disk files
    const diskFileDetails = await Promise.all(
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
    
    // Get in-memory files from the backend
    let memoryFiles = []
    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || process.env.BACKEND_URL || 'http://localhost:24125'
      const memoryResponse = await fetch(`${backendUrl}/api/memory-files`)
      if (memoryResponse.ok) {
        const memoryData = await memoryResponse.json()
        if (memoryData.success && Array.isArray(memoryData.files)) {
          // Convert in-memory files to the same format as disk files
          memoryFiles = memoryData.files
            .filter((file: MemoryFile) => !file.isJson) // Only include markdown files
            .map((file: MemoryFile) => ({
              name: file.name,
              jsonPath: file.path.replace('.md', '.json'),
              markdownPath: file.path,
              timestamp: new Date(file.timestamp),
              size: file.size,
              wordCount: file.wordCount,
              charCount: file.charCount,
              isConsolidated: false,
              pagesCount: 1,
              rootUrl: '',
              isInMemory: true
            }))
        }
      }
    } catch (e) {
      console.error('Error fetching in-memory files:', e)
    }
    
    // Combine disk and memory files - return ALL files, not just consolidated ones
    const allFiles = [...diskFileDetails, ...memoryFiles]
    
    return NextResponse.json({
      success: true,
      files: allFiles
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Failed to load files' },
      { status: 500 }
    )
  }
}