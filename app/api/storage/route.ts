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
              
              // If the metadata has a "pages" array or is_consolidated flag, it's a consolidated file
              if ((metadata.pages && Array.isArray(metadata.pages)) || metadata.is_consolidated === true) {
                isConsolidated = true
                pagesCount = metadata.pages ? metadata.pages.length : 1
                rootUrl = metadata.root_url || ''
              }
            } catch (e) {
              console.error(`Error reading JSON metadata for ${filename}:`, e)
              // Create a default metadata file if it doesn't exist or is invalid
              try {
                const defaultMetadata = {
                  title: `Documentation for ${filename.replace('.md', '')}`,
                  timestamp: new Date().toISOString(),
                  pages: [
                    {
                      title: "Main Content",
                      url: `file://${filename.replace('.md', '')}`,
                      timestamp: new Date().toISOString(),
                      internal_links: 0,
                      external_links: 0
                    }
                  ],
                  is_consolidated: true,
                  last_updated: new Date().toISOString()
                }
                await fs.writeFile(jsonPath, JSON.stringify(defaultMetadata, null, 2), 'utf-8')
                console.log(`Created default metadata for ${filename}`)
                isConsolidated = true
                pagesCount = 1
              } catch (writeError) {
                console.error(`Error creating default metadata for ${filename}:`, writeError)
              }
            }
          } else {
            // Create JSON file if it doesn't exist
            try {
              // Create a consolidated metadata file by default
              const defaultMetadata = {
                title: `Documentation for ${filename.replace('.md', '')}`,
                timestamp: new Date().toISOString(),
                content,
                pages: [
                  {
                    title: "Main Content",
                    url: `file://${filename.replace('.md', '')}`,
                    timestamp: new Date().toISOString(),
                    internal_links: 0,
                    external_links: 0
                  }
                ],
                is_consolidated: true,
                last_updated: new Date().toISOString(),
                metadata: {
                  wordCount: content.split(/\s+/).length,
                  charCount: content.length,
                  timestamp: stats.mtime
                }
              }
              await fs.writeFile(jsonPath, JSON.stringify(defaultMetadata, null, 2), 'utf-8')
              console.log(`Created consolidated metadata for ${filename}`)
              isConsolidated = true
              pagesCount = 1
            } catch (writeError) {
              console.error(`Error creating metadata for ${filename}:`, writeError)
            }
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
      
      // Additional filter to exclude files with UUID-like names
      // UUID pattern: 8-4-4-4-12 hex digits (e.g., 095104d8-8e90-48f0-8670-9e45c914f115)
      const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
      
      // Keep only files with domain-like names (e.g., docs_crawl4ai_com)
      // These are files created through the crawling process
      const crawledFiles = consolidatedFiles.filter(file => {
        // Check if the filename is NOT a UUID
        return !uuidPattern.test(file.name)
      })
      
      console.log(`Found ${consolidatedFiles.length} consolidated files, ${crawledFiles.length} are crawled files`)
      
      return NextResponse.json({
        success: true,
        files: crawledFiles
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