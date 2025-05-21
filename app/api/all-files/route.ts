export const dynamic = 'force-dynamic';

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
    // Read all files from the storage directory
    const files = await fs.readdir(STORAGE_DIR);
    const mdFiles = files.filter(f => f.endsWith('.md'));
    // Create a Set of existing JSON filenames for efficient lookup
    const jsonFileSet = new Set(files.filter(f => f.endsWith('.json')));

    // Process only .md files that have a corresponding .json file
    const fileDetailsPromises = mdFiles.map(async (mdFilename): Promise<FileDetails | null> => {
      const baseName = mdFilename.replace('.md', '');
      const jsonFilename = `${baseName}.json`;
      const mdPath = path.join(STORAGE_DIR, mdFilename);
      const jsonPath = path.join(STORAGE_DIR, jsonFilename);

      // Check if the corresponding JSON file exists
      if (!jsonFileSet.has(jsonFilename)) {
        console.warn(`[API /api/all-files] Skipping MD file '${mdFilename}' because corresponding JSON file '${jsonFilename}' does not exist.`);
        return null; // Skip this file
      }

      try {
        // Get stats for the MD file
        const stats = await fs.stat(mdPath);
        // Read MD content (needed for word/char count, maybe fallback page count)
        const mdContent = await fs.readFile(mdPath, 'utf-8');

        // Read JSON metadata
        let isConsolidated = false;
        let pagesCount = 0;
        let rootUrl = '';
        let metadata: any = {}; // Initialize metadata

        try {
          const jsonContent = await fs.readFile(jsonPath, 'utf-8');
          metadata = JSON.parse(jsonContent);

          // Determine consolidation status and page count from JSON
          if (metadata.pages && Array.isArray(metadata.pages)) {
            isConsolidated = true;
            pagesCount = metadata.pages.length;
            rootUrl = metadata.root_url || '';
          } else if (metadata.is_consolidated === true) {
             // Fallback check if 'is_consolidated' flag exists but 'pages' array doesn't (maybe older format?)
             isConsolidated = true;
             rootUrl = metadata.root_url || '';
             // Attempt to count pages from MD content as a fallback
             const sectionMatches = mdContent.match(/## .+\nURL: .+/g);
             pagesCount = sectionMatches ? sectionMatches.length : 0; // Default to 0 if no sections found
          }

        } catch (jsonError) {
          console.error(`[API /api/all-files] Error reading or parsing JSON metadata for ${jsonFilename}:`, jsonError);
          // Decide how to handle JSON errors: skip the file or return partial data?
          // For now, let's skip it to ensure data integrity in the list.
          return null;
        }

        // Calculate word/char count from MD content
        const wordCount = mdContent.split(/\s+/).filter(Boolean).length; // More robust word count
        const charCount = mdContent.length;

        return {
          name: baseName,
          jsonPath,
          markdownPath: mdPath,
          timestamp: stats.mtime, // Use MD file modification time as primary timestamp
          size: stats.size, // Use MD file size
          wordCount: wordCount,
          charCount: charCount,
          isConsolidated,
          pagesCount: isConsolidated ? pagesCount : 1, // Ensure non-consolidated files show 1 page
          rootUrl: rootUrl,
          isInMemory: false // Always false now
        };
      } catch (fileError) {
        console.error(`[API /api/all-files] Error processing file pair (${mdFilename}, ${jsonFilename}):`, fileError);
        return null; // Skip file pair if any error occurs during processing
      }
    });

    // Wait for all promises to resolve and filter out null values (skipped files)
    const diskFileDetails = (await Promise.all(fileDetailsPromises)).filter((details): details is FileDetails => details !== null);

    // Memory files are deprecated
    const memoryFiles: FileDetails[] = [];

    // Combine results (memoryFiles is always empty now)
    const allFiles = [...diskFileDetails, ...memoryFiles];

    console.log(`[API /api/all-files] Returning details for ${allFiles.length} file(s).`);
    return NextResponse.json({
      success: true,
      files: allFiles
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Failed to load files' },
      { status: 500 }
    )
  }
}