import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

// Get storage directory from environment variable with fallback to default
const getStoragePath = () => {
  const configuredPath = process.env.STORAGE_PATH || "storage/markdown";

  // If it's an absolute path, use it directly
  if (path.isAbsolute(configuredPath)) {
    return configuredPath;
  }

  // Otherwise, treat as relative to process.cwd()
  const storagePath = path.join(process.cwd(), configuredPath);

  // TEMP-DEBUG: Log the storage path being used
  console.log("TEMP-DEBUG: Storage path resolved to:", storagePath);
  console.log("TEMP-DEBUG: Current working directory:", process.cwd());
  console.log(
    "TEMP-DEBUG: Environment STORAGE_PATH:",
    process.env.STORAGE_PATH
  );

  return storagePath;
};

const STORAGE_DIR = getStoragePath();

export async function POST(request: Request) {
  try {
    const { url, content } = await request.json();

    // Create storage directory if it doesn't exist
    await fs.mkdir(STORAGE_DIR, { recursive: true });

    // Generate filename from URL
    const filename =
      url
        .replace(/^https?:\/\//, "")
        .replace(/[^a-z0-9]/gi, "_")
        .toLowerCase() + ".md";

    const filePath = path.join(STORAGE_DIR, filename);
    await fs.writeFile(filePath, content, "utf-8");

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : "Failed to save markdown",
      },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    // TEMP-DEBUG: Log the request URL
    console.log("TEMP-DEBUG: GET request URL:", request.url);

    const { searchParams } = new URL(request.url);
    const url = searchParams.get("url");

    console.log("TEMP-DEBUG: URL param:", url);
    console.log("TEMP-DEBUG: STORAGE_DIR:", STORAGE_DIR);

    // Handle list request
    if (!url) {
      // TEMP-DEBUG: Listing files
      console.log("TEMP-DEBUG: Listing files from directory:", STORAGE_DIR);

      try {
        // Only get .md files
        const files = await fs.readdir(STORAGE_DIR);
        console.log("TEMP-DEBUG: Directory contents:", files);

        const mdFiles = files.filter((f) => f.endsWith(".md"));
        const jsonFiles = files.filter((f) => f.endsWith(".json"));

        console.log("TEMP-DEBUG: Found MD files:", mdFiles.length);
        console.log("TEMP-DEBUG: Found JSON files:", jsonFiles.length);
      } catch (dirError) {
        console.error("TEMP-DEBUG: Error reading directory:", dirError);
        return NextResponse.json(
          {
            success: false,
            error: `Failed to read storage directory: ${dirError.message}`,
            debug: {
              storageDir: STORAGE_DIR,
              exists: false,
            },
          },
          { status: 500 }
        );
      }

      // Get disk files
      console.log("TEMP-DEBUG: Starting to process disk files");
      const diskFileDetails = await Promise.all(
        mdFiles.map(async (filename) => {
          const mdPath = path.join(STORAGE_DIR, filename);
          const jsonPath = path.join(
            STORAGE_DIR,
            filename.replace(".md", ".json")
          );

          console.log(`TEMP-DEBUG: Processing file: ${filename}`);
          console.log(`TEMP-DEBUG: MD Path: ${mdPath}`);
          console.log(`TEMP-DEBUG: JSON Path: ${jsonPath}`);

          const stats = await fs.stat(mdPath);
          const content = await fs.readFile(mdPath, "utf-8");
          console.log(
            `TEMP-DEBUG: File size: ${stats.size}, Modified: ${stats.mtime}`
          );

          // Check if this is a consolidated file by examining the JSON metadata
          let isConsolidated = false;
          let pagesCount = 0;
          let rootUrl = "";

          if (jsonFiles.includes(filename.replace(".md", ".json"))) {
            try {
              const jsonContent = await fs.readFile(jsonPath, "utf-8");
              const metadata = JSON.parse(jsonContent);

              // If the metadata has a "pages" array or is_consolidated flag, it's a consolidated file
              if (
                (metadata.pages && Array.isArray(metadata.pages)) ||
                metadata.is_consolidated === true
              ) {
                isConsolidated = true;
                pagesCount = metadata.pages ? metadata.pages.length : 1;
                rootUrl = metadata.root_url || "";
              }
            } catch (e) {
              console.error(`Error reading JSON metadata for ${filename}:`, e);
              // Create a default metadata file if it doesn't exist or is invalid
              try {
                const defaultMetadata = {
                  title: `Documentation for ${filename.replace(".md", "")}`,
                  timestamp: new Date().toISOString(),
                  pages: [
                    {
                      title: "Main Content",
                      url: `file://${filename.replace(".md", "")}`,
                      timestamp: new Date().toISOString(),
                      internal_links: 0,
                      external_links: 0,
                    },
                  ],
                  is_consolidated: true,
                  last_updated: new Date().toISOString(),
                };
                await fs.writeFile(
                  jsonPath,
                  JSON.stringify(defaultMetadata, null, 2),
                  "utf-8"
                );
                console.log(`Created default metadata for ${filename}`);
                isConsolidated = true;
                pagesCount = 1;
              } catch (writeError) {
                console.error(
                  `Error creating default metadata for ${filename}:`,
                  writeError
                );
              }
            }
          } else {
            // Create JSON file if it doesn't exist
            try {
              // Create a consolidated metadata file by default
              const defaultMetadata = {
                title: `Documentation for ${filename.replace(".md", "")}`,
                timestamp: new Date().toISOString(),
                content,
                pages: [
                  {
                    title: "Main Content",
                    url: `file://${filename.replace(".md", "")}`,
                    timestamp: new Date().toISOString(),
                    internal_links: 0,
                    external_links: 0,
                  },
                ],
                is_consolidated: true,
                last_updated: new Date().toISOString(),
                metadata: {
                  wordCount: content.split(/\s+/).length,
                  charCount: content.length,
                  timestamp: stats.mtime,
                },
              };
              await fs.writeFile(
                jsonPath,
                JSON.stringify(defaultMetadata, null, 2),
                "utf-8"
              );
              console.log(`Created consolidated metadata for ${filename}`);
              isConsolidated = true;
              pagesCount = 1;
            } catch (writeError) {
              console.error(
                `Error creating metadata for ${filename}:`,
                writeError
              );
            }
          }

          // Extract sections to count how many pages are included
          if (!pagesCount && isConsolidated) {
            // Count sections that start with "## " and have a URL: line after them
            const sectionMatches = content.match(/## .+\nURL: .+/g);
            pagesCount = sectionMatches ? sectionMatches.length : 0;
          }

          return {
            name: filename.replace(".md", ""),
            jsonPath,
            markdownPath: mdPath,
            timestamp: stats.mtime,
            size: stats.size,
            wordCount: content.split(/\s+/).length,
            charCount: content.length,
            isConsolidated,
            pagesCount: isConsolidated ? pagesCount : 1,
            rootUrl: rootUrl || "",
            isInMemory: false,
          };
        })
      );

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
      let memoryFiles = [];
      try {
        const memoryResponse = await fetch(
          "http://localhost:24125/api/memory-files"
        );
        if (memoryResponse.ok) {
          const memoryData = await memoryResponse.json();
          if (memoryData.success && Array.isArray(memoryData.files)) {
            // Convert in-memory files to the same format as disk files
            memoryFiles = memoryData.files
              .filter((file: MemoryFile) => !file.isJson) // Only include markdown files
              .map((file: MemoryFile) => ({
                name: file.name,
                jsonPath: file.path.replace(".md", ".json"),
                markdownPath: file.path,
                timestamp: new Date(file.timestamp),
                size: file.size,
                wordCount: file.wordCount,
                charCount: file.charCount,
                isConsolidated: false,
                pagesCount: 1,
                rootUrl: "",
                isInMemory: true,
              }));
          }
        }
      } catch (e) {
        console.error("Error fetching in-memory files:", e);
      }

      // Combine disk and memory files
      const allFiles = [...diskFileDetails, ...memoryFiles];
      console.log("TEMP-DEBUG: All files combined count:", allFiles.length);

      // Log details of each file
      console.log("TEMP-DEBUG: File details:");
      allFiles.forEach((file, index) => {
        console.log(`TEMP-DEBUG: File ${index + 1}:`, {
          name: file.name,
          isConsolidated: file.isConsolidated,
          pagesCount: file.pagesCount,
          isInMemory: file.isInMemory,
          size: file.size,
        });
      });

      // Filter out individual files (non-consolidated files)
      // Only show consolidated files in the Stored Files section
      const consolidatedFiles = allFiles.filter((file) => file.isConsolidated);
      console.log(
        "TEMP-DEBUG: Consolidated files count:",
        consolidatedFiles.length
      );

      // Additional filter to exclude files with UUID-like names
      // UUID pattern: 8-4-4-4-12 hex digits (e.g., 095104d8-8e90-48f0-8670-9e45c914f115)
      const uuidPattern =
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

      // Log consolidated files before UUID filtering
      console.log("TEMP-DEBUG: Consolidated files before UUID filtering:");
      consolidatedFiles.forEach((file, index) => {
        console.log(`TEMP-DEBUG: Consolidated file ${index + 1}:`, {
          name: file.name,
          isUUID: uuidPattern.test(file.name),
          pagesCount: file.pagesCount,
        });
      });

      // Keep only files with domain-like names (e.g., docs_crawl4ai_com)
      // These are files created through the crawling process
      const crawledFiles = consolidatedFiles.filter((file) => {
        // Check if the filename is NOT a UUID
        const isNotUUID = !uuidPattern.test(file.name);
        console.log(
          `TEMP-DEBUG: File ${file.name} is ${isNotUUID ? "NOT" : "IS"} a UUID`
        );
        return isNotUUID;
      });

      console.log(
        `TEMP-DEBUG: Found ${consolidatedFiles.length} consolidated files, ${crawledFiles.length} are crawled files`
      );

      // Log the final files being returned to the frontend
      console.log("TEMP-DEBUG: Final files being returned to frontend:");
      crawledFiles.forEach((file, index) => {
        console.log(`TEMP-DEBUG: Returned file ${index + 1}:`, {
          name: file.name,
          isConsolidated: file.isConsolidated,
          pagesCount: file.pagesCount,
          size: file.size,
          rootUrl: file.rootUrl || "none",
        });
      });

      // Return the files
      const response = {
        success: true,
        files: crawledFiles,
      };

      console.log(
        "TEMP-DEBUG: Final response:",
        JSON.stringify(response, null, 2).substring(0, 1000) + "..."
      );

      return NextResponse.json(response);
    }

    // Handle single file request
    const filename =
      url
        .replace(/^https?:\/\//, "")
        .replace(/[^a-z0-9]/gi, "_")
        .toLowerCase() + ".md";

    const filePath = path.join(STORAGE_DIR, filename);
    const content = await fs.readFile(filePath, "utf-8");

    return NextResponse.json({ success: true, content });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : "Failed to load markdown",
      },
      { status: 500 }
    );
  }
}
