'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Download } from 'lucide-react'; // Keep Download, remove Eye, FileText will be replaced by Download icon later

// Interface for the processed file data
interface ProcessedFile {
  baseName: string;
  hasMd: boolean;
  hasJson: boolean;
}

// No props needed anymore
interface ConsolidatedFilesProps {}

const ConsolidatedFiles: React.FC<ConsolidatedFilesProps> = () => {
  const [files, setFiles] = useState<ProcessedFile[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Define fetchFiles logic (can remain mostly the same)
  const fetchFiles = async () => {
    // Don't set isLoading to true on subsequent polls, only on initial load?
    // Let's keep it simple for now and set loading each time.
    // Consider only setting loading on the *first* fetch if jitter is an issue.
    setIsLoading(true);
    setError(null);
    // Don't clear files immediately on poll, only update when data arrives
    // setFiles([]); // Avoid clearing on poll

    try {
      console.log('Polling file list from: /api/all-files');
      const response = await fetch('/api/all-files', { cache: 'no-store' });

      if (!response.ok) {
        // Don't necessarily clear files on a failed poll, maybe show stale data + error?
        throw new Error(`Failed to fetch file list: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();

      if (!result.success || !Array.isArray(result.files)) {
        throw new Error('API response format error when fetching file list.');
      }

      console.log(`Received ${result.files.length} file entries from API.`);

      // Process the API response
      const processedData: ProcessedFile[] = result.files.map((apiFile: any) => {
         const baseName = typeof apiFile.name === 'string' ? apiFile.name : 'invalid_name';
         const hasJson = typeof apiFile.jsonPath === 'string' && apiFile.jsonPath.endsWith('.json');
         return {
           baseName: baseName,
           hasMd: true,
           hasJson: hasJson,
         };
      }).filter((file: ProcessedFile) => file.baseName !== 'invalid_name');

      // Deduplicate based on baseName
      const uniqueFilesMap = new Map<string, ProcessedFile>();
      processedData.forEach(file => {
          if (!uniqueFilesMap.has(file.baseName)) {
              uniqueFilesMap.set(file.baseName, file);
          } else {
              const existing = uniqueFilesMap.get(file.baseName)!;
              existing.hasJson = existing.hasJson || file.hasJson;
          }
      });
      const uniqueProcessedData = Array.from(uniqueFilesMap.values());

      console.log(`Processed ${uniqueProcessedData.length} unique base filenames.`);
      setFiles(uniqueProcessedData); // Update state with new list

    } catch (err) {
      console.error('Error fetching or processing file list during poll:', err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      // Decide if files should be cleared on error during poll
      // setFiles([]); // Optional: Clear data on error
    } finally {
      setIsLoading(false); // Set loading false after fetch attempt
    }
  };

  // useEffect for initial fetch and setting up polling interval
  useEffect(() => {
    fetchFiles(); // Initial fetch

    const intervalId = setInterval(() => {
      console.log('Polling for file updates...');
      fetchFiles();
    }, 10000); // Poll every 10 seconds

    // Cleanup function to clear the interval when the component unmounts
    return () => {
      console.log('Clearing file polling interval.');
      clearInterval(intervalId);
    };
  }, []); // Empty dependency array ensures this effect runs only once on mount and cleanup runs on unmount

  // --- Render Logic ---

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Consolidated Files Browser</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-400 animate-pulse">Loading file list from storage/markdown...</p>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Consolidated Files Browser</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-red-500">Error loading file list: {error}</p>
        </CardContent>
      </Card>
    );
  }

  if (files.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Consolidated Files Browser</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500 italic">No consolidated files found in storage/markdown.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gray-800 border-gray-700 text-gray-300">
      <CardHeader>
        <CardTitle className="text-lg text-cyan-400">Consolidated Files Browser</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {files.map((file) => {
            // Define download URLs
            const downloadUrlMd = `/api/storage/download?file_path=${encodeURIComponent(file.baseName)}.md`;
            const downloadUrlJson = `/api/storage/download?file_path=${encodeURIComponent(file.baseName)}.json`;

            return (
              <li key={file.baseName} className="flex items-center gap-4 p-2 bg-gray-700/30 rounded hover:bg-gray-700/50">
                <div className="flex items-center gap-2 flex-shrink min-w-0">
                  {/* Allow filename to truncate if necessary */}
                  <span className="font-medium text-green-400 truncate" title={file.baseName}>{file.baseName}</span>
                  {/* Badges container */}
                  <span className="flex-shrink-0 text-xs text-gray-400">
                    {file.hasMd && <span className="mr-1 p-1 bg-yellow-600/50 text-yellow-200 rounded text-[10px]">MD</span>}
                    {file.hasJson && <span className="mr-1 p-1 bg-green-600/50 text-green-200 rounded text-[10px]">JSON</span>}
                  </span>
                </div>
                <div className="flex items-center space-x-1 flex-shrink-0 ml-auto">
                   {/* Download Buttons */}
                   {file.hasMd && (
                     <Button variant="outline" size="icon" className="h-7 w-7 border-yellow-600 hover:bg-yellow-600/20" title="Download Markdown" asChild>
                         {/* Add download attribute */}
                         <a href={downloadUrlMd} download={`${file.baseName}.md`}><Download size={14} className="text-yellow-500"/></a>
                     </Button>
                   )}
                   {file.hasJson && (
                     <Button variant="outline" size="icon" className="h-7 w-7 border-green-600 hover:bg-green-600/20" title="Download JSON" asChild>
                         {/* Add download attribute */}
                         <a href={downloadUrlJson} download={`${file.baseName}.json`}><Download size={14} className="text-green-500"/></a>
                     </Button>
                   )}
                </div>
              </li>
            );
          })}
        </ul>
      </CardContent>
    </Card>
  );
};

export default ConsolidatedFiles;