import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

const STORAGE_DIR = path.join(process.cwd(), 'storage/markdown')

// Define the structure for file details returned by this API
interface FileDetails {
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

export async function GET(request: Request) {
  console.log('[API] /api/all-files route called at', new Date().toISOString());
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
    
    // Removed fetch for /api/memory-files as the endpoint no longer exists in the backend.
    // The concept of separate "memory files" fetched via API is deprecated.
    // The 'memoryFiles' array remains empty, and the route now only lists files from disk.
    const memoryFiles: FileDetails[] = [] // Explicitly type the empty array
    
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