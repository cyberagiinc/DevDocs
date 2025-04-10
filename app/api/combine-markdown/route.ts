import { NextRequest, NextResponse } from 'next/server';
import { combineMarkdownContents } from '@/lib/markdown-utils';
import { promises as fs } from 'fs';
import path from 'path';
import { loadMarkdown } from '@/lib/storage';

// Define the storage directory path
const STORAGE_DIR = path.join(process.cwd(), 'storage/markdown');

// UUID pattern for detecting UUID-based filenames
const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json();
    
    // Validate required parameters
    if (!body.files || !Array.isArray(body.files) || body.files.length === 0) {
      return NextResponse.json(
        { error: 'Missing or invalid files parameter' },
        { status: 400 }
      );
    }

    // Get the list of files to combine
    let fileIds = body.files;
    let autoIncludeRelated = body.autoIncludeRelated !== false; // Default to true
    const contents: string[] = [];
    const filenames: string[] = [];
    const includedRelatedFiles: string[] = [];

    // If auto-include is enabled, find all related UUID files for each non-UUID file
    if (autoIncludeRelated) {
      const allMdFiles = await fs.readdir(STORAGE_DIR);
      const mdFiles = allMdFiles.filter(file => file.endsWith('.md'));
      
      // Clone the original file IDs before we modify the array
      const originalFileIds = [...fileIds];
      
      for (const fileId of originalFileIds) {
        // Skip UUID files as we're only expanding non-UUID files
        if (UUID_PATTERN.test(fileId)) continue;
        
        try {
          // For non-UUID files like templ_guide, find all related UUID files
          const jsonPath = path.join(STORAGE_DIR, `${fileId}.json`);
          
          // Check if the JSON metadata file exists
          if (allMdFiles.includes(`${fileId}.json`)) {
            // Read the root_url from the JSON file
            const jsonContent = await fs.readFile(jsonPath, 'utf-8');
            const metadata = JSON.parse(jsonContent);
            const rootUrl = metadata.root_url;
            
            if (rootUrl) {
              // Extract domain from rootUrl
              const rootDomain = extractDomain(rootUrl);
              
              // Find all UUID files with the same domain in their JSON metadata
              for (const mdFile of mdFiles) {
                const baseName = mdFile.replace('.md', '');
                
                // Skip the file itself and non-UUID files
                if (baseName === fileId || !UUID_PATTERN.test(baseName)) continue;
                
                // Check if this UUID file is related to the current file
                try {
                  const uuidJsonPath = path.join(STORAGE_DIR, `${baseName}.json`);
                  if (!allMdFiles.includes(`${baseName}.json`)) continue;
                  
                  const uuidJsonContent = await fs.readFile(uuidJsonPath, 'utf-8');
                  const uuidMetadata = JSON.parse(uuidJsonContent);
                  
                  // Get the UUID file's root URL and extract its domain
                  const uuidRootUrl = uuidMetadata.root_url;
                  if (!uuidRootUrl) continue;
                  
                  const uuidDomain = extractDomain(uuidRootUrl);
                  
                  // If the domains match, add this UUID file to our list
                  if (rootDomain && uuidDomain && rootDomain === uuidDomain) {
                    if (!fileIds.includes(baseName)) {
                      fileIds.push(baseName);
                      includedRelatedFiles.push(baseName);
                      console.log(`Auto-including related file: ${baseName} (matched domain: ${rootDomain})`);
                    }
                  }
                } catch (e) {
                  console.error(`Error checking UUID file ${baseName}:`, e);
                  // Continue to next file
                }
              }
            }
          }
        } catch (e) {
          console.error(`Error processing file ${fileId} for auto-include:`, e);
          // Continue with next file
        }
      }
    }

    // Load the content of each file
    for (const fileId of fileIds) {
      try {
        // Try to read the file directly from the storage directory
        const filePath = path.join(STORAGE_DIR, `${fileId}.md`);
        let content;
        
        try {
          // First try to read directly from filesystem
          content = await fs.readFile(filePath, 'utf-8');
        } catch (fsError) {
          // If file read fails, try using the loadMarkdown utility
          console.log(`Direct file read failed for ${fileId}, trying loadMarkdown...`);
          content = await loadMarkdown(fileId);
        }
        
        if (content && typeof content === 'string') {
          contents.push(content);
          filenames.push(`${fileId}.md`);
        } else {
          console.warn(`Content not found or invalid for file ID: ${fileId}`);
        }
      } catch (error) {
        console.error(`Error loading file ${fileId}:`, error);
        // Continue with other files instead of failing completely
      }
    }

    if (contents.length === 0) {
      return NextResponse.json(
        { error: 'No valid content found for the provided file IDs' },
        { status: 400 }
      );
    }

    // Combine the markdown contents
    const options = {
      contents,
      filenames,
      addFilenameHeaders: body.addFilenameHeaders !== false,  // Default to true
      addSeparators: body.addSeparators !== false,  // Default to true
      transformLinks: body.transformLinks !== false,  // Default to true
      customSeparator: body.customSeparator || '---',
      removeExtraNewlines: body.removeExtraNewlines !== false, // Default to true
      stripMetadata: body.stripMetadata === true, // Default to false
      removeLinks: body.removeLinks === true // Default to false
    };

    const result = combineMarkdownContents(options);

    // Return the combined content
    return NextResponse.json({
      combinedContent: result.content,
      stats: {
        fileCount: contents.length,
        totalCharacters: result.content.length,
        totalWords: result.content.split(/\s+/).filter(Boolean).length,
        includedRelatedFiles
      }
    });
  } catch (error) {
    console.error('Error combining markdown:', error);
    return NextResponse.json(
      { error: 'An error occurred while combining markdown files' },
      { status: 500 }
    );
  }
}

// Helper function to extract the domain from a URL
function extractDomain(url: string): string | null {
  if (!url) return null;
  
  try {
    // Remove protocol and possible trailing slash
    let domain = url.trim().toLowerCase();
    
    // Remove protocol
    domain = domain.replace(/^https?:\/\//, '');
    
    // Extract the domain part (before any path)
    const domainPart = domain.split('/')[0];
    
    return domainPart;
  } catch (e) {
    console.error(`Error extracting domain from ${url}:`, e);
    return null;
  }
} 