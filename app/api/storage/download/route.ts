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
  return path.join(process.cwd(), configuredPath);
};

const STORAGE_DIR = getStoragePath();

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const filePath = searchParams.get("path");

    if (!filePath) {
      return NextResponse.json(
        { success: false, error: "No file path provided" },
        { status: 400 }
      );
    }

    console.log(`Download requested for file: ${filePath}`);

    // Security check to ensure the path is within the storage directory
    const normalizedPath = path.normalize(filePath);
    if (!normalizedPath.startsWith(STORAGE_DIR)) {
      console.error(
        `Security check failed: ${normalizedPath} is outside of ${STORAGE_DIR}`
      );
      return NextResponse.json(
        { success: false, error: "Invalid file path" },
        { status: 403 }
      );
    }

    // Check if file exists
    try {
      await fs.access(normalizedPath);
    } catch {
      console.error(`File not found: ${normalizedPath}`);
      return NextResponse.json(
        { success: false, error: "File not found" },
        { status: 404 }
      );
    }

    // Read the file
    const content = await fs.readFile(normalizedPath, "utf-8");
    const fileSize = Buffer.byteLength(content, "utf8");
    console.log(
      `File read successfully: ${normalizedPath} (${fileSize} bytes)`
    );

    // If it's a JSON file, verify it's valid JSON and check if it's a consolidated file
    if (path.extname(filePath) === ".json") {
      try {
        const jsonData = JSON.parse(content);

        // Check if this is a consolidated file
        if (jsonData.pages && Array.isArray(jsonData.pages)) {
          console.log(
            `Consolidated JSON file detected with ${jsonData.pages.length} pages`
          );
        }
      } catch (e) {
        console.error(`Invalid JSON file: ${normalizedPath}`, e);
        return NextResponse.json(
          { success: false, error: "Invalid JSON file" },
          { status: 500 }
        );
      }
    } else if (path.extname(filePath) === ".md") {
      // For markdown files, check if it's a consolidated file by looking for section markers
      const sectionMatches = content.match(/## .+\nURL: .+/g);
      if (sectionMatches && sectionMatches.length > 0) {
        console.log(
          `Consolidated Markdown file detected with ${sectionMatches.length} sections`
        );
      }
    }

    // Determine content type based on file extension
    const contentType =
      path.extname(filePath) === ".json" ? "application/json" : "text/markdown";

    // Create response with appropriate headers for download
    return new NextResponse(content, {
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `attachment; filename="${path.basename(
          filePath
        )}"`,
      },
    });
  } catch (error) {
    console.error("Error downloading file:", error);
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : "Failed to download file",
      },
      { status: 500 }
    );
  }
}
