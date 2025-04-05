'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { OverallStatus } from '@/lib/types'; // Assuming Metadata type will be defined here or imported
import { url_to_filename } from '@/lib/utils'; // Assuming helper exists or will be created
import { Globe, FileText, BookOpen, HardDrive, Clock, Download, Eye } from 'lucide-react'; // Example icons

// Placeholder for the actual metadata structure - needs definition
interface ConsolidatedMetadata {
  title: string;
  root_url: string;
  timestamp: string;
  last_updated?: string;
  pages: Array<{
    title: string;
    url: string;
    timestamp: string;
    internal_links: number;
    external_links: number;
  }>;
  is_consolidated: boolean;
  // Add size property if calculated/stored
  sizeKB?: number;
}


interface ConsolidatedFilesProps {
  jobId: string | null;
  rootUrl: string | null;
  jobStatus: OverallStatus | null;
}

const ConsolidatedFiles: React.FC<ConsolidatedFilesProps> = ({
  jobId,
  rootUrl,
  jobStatus,
}) => {
  const [metadata, setMetadata] = useState<ConsolidatedMetadata | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [filenameBase, setFilenameBase] = useState<string | null>(null);

  useEffect(() => {
    // Reset state if essential props are missing or change
    if (!rootUrl || !jobId) {
      setMetadata(null);
      setError(null);
      setFilenameBase(null);
      return; // Don't fetch if we don't have the necessary info
    }

    const fetchMetadata = async () => {
      setIsLoading(true);
      setError(null);
      setMetadata(null); // Clear previous metadata

      try {
        // Derive filename - Assuming url_to_filename is available client-side or via API
        // For now, let's assume it's in lib/utils
        const base = url_to_filename(rootUrl);
        setFilenameBase(base);
        const metadataPath = `${base}.json`;
        console.log(`Fetching metadata from: /api/storage/file-content?file_path=${metadataPath}`);

        const response = await fetch(`/api/storage/file-content?file_path=${encodeURIComponent(metadataPath)}`);

        if (!response.ok) {
          if (response.status === 404) {
             console.log(`Metadata file not found for job ${jobId} (${metadataPath}). This might be expected if no crawl occurred.`);
             // Don't set an error, just means no file exists yet
             setError(null); // Explicitly clear error
          } else {
             throw new Error(`Failed to fetch metadata: ${response.status} ${response.statusText}`);
          }
        } else {
            const text = await response.text();
            try {
                const data: ConsolidatedMetadata = JSON.parse(text);
                // Optionally calculate size here if needed, or assume it's in metadata
                setMetadata(data);
            } catch (parseError) {
                console.error("Error parsing metadata JSON:", parseError);
                throw new Error("Failed to parse metadata file.");
            }
        }
      } catch (err) {
        console.error('Error fetching consolidated file metadata:', err);
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        setMetadata(null); // Clear metadata on error
      } finally {
        setIsLoading(false);
      }
    };

    fetchMetadata();
  }, [jobId, rootUrl]); // Rerun when job ID or root URL changes

  // Render nothing if essential props are missing
  if (!jobId || !rootUrl) {
    // Optionally, render a placeholder indicating waiting for a job ID
    // return <Card><CardContent><p>Waiting for job details...</p></CardContent></Card>;
    return null; // Keep it simple for now
  }

  // Handle loading and error states
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Consolidated Files</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-400 animate-pulse">Loading consolidated file info...</p>
        </CardContent>
      </Card>
    );
  }

  // If there was an error fetching (other than 404)
  if (error) {
     return (
       <Card>
         <CardHeader>
           <CardTitle>Consolidated Files</CardTitle>
         </CardHeader>
         <CardContent>
           <p className="text-red-500">Error loading consolidated file info: {error}</p>
         </CardContent>
       </Card>
     );
  }

  // If job is finished but no metadata was found (and no error occurred)
  if (!metadata) {
     return (
       <Card>
         <CardHeader>
           <CardTitle>Consolidated Files</CardTitle>
         </CardHeader>
         <CardContent>
           <p className="text-gray-500 italic">No consolidated file found for this job (perhaps no URLs were crawled).</p>
         </CardContent>
       </Card>
     );
  }

  // --- Render Metadata Display ---
  const pagesCount = metadata.pages?.length ?? 0;
  // Format date nicely (implement helper if needed)
  const lastUpdated = metadata.last_updated ? new Date(metadata.last_updated).toLocaleString() : 'N/A';
  const sizeDisplay = metadata.sizeKB ? `${metadata.sizeKB.toFixed(1)} KB` : 'N/A'; // Placeholder for size

  const viewUrlMd = filenameBase ? `/api/storage/file-content?file_path=${encodeURIComponent(filenameBase)}.md` : '#';
  const viewUrlJson = filenameBase ? `/api/storage/file-content?file_path=${encodeURIComponent(filenameBase)}.json` : '#';


  return (
    <Card className="bg-gray-800 border-gray-700 text-gray-300">
      <CardHeader>
        <CardTitle className="text-lg text-cyan-400">Consolidated Files</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-400 uppercase bg-gray-700/50">
              <tr>
                <th scope="col" className="px-4 py-2"><Globe size={14} className="inline mr-1"/> Project Name</th>
                {/* <th scope="col" className="px-4 py-2"><FileText size={14} className="inline mr-1"/> Words</th> */}
                <th scope="col" className="px-4 py-2"><BookOpen size={14} className="inline mr-1"/> Pages</th>
                <th scope="col" className="px-4 py-2"><HardDrive size={14} className="inline mr-1"/> Size</th>
                <th scope="col" className="px-4 py-2"><Clock size={14} className="inline mr-1"/> Last Updated</th>
                <th scope="col" className="px-4 py-2"><Download size={14} className="inline mr-1"/> Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-700 hover:bg-gray-700/30">
                <td className="px-4 py-2 font-medium whitespace-nowrap text-green-400 flex items-center">
                   <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                   {filenameBase || 'N/A'}
                </td>
                {/* <td className="px-4 py-2">N/A</td> Placeholder for words */}
                <td className="px-4 py-2">
                    <span className="bg-yellow-600 text-yellow-100 text-xs font-medium px-2.5 py-0.5 rounded">
                        {pagesCount} pages
                    </span>
                </td>
                <td className="px-4 py-2">{sizeDisplay}</td>
                <td className="px-4 py-2">{lastUpdated}</td>
                <td className="px-4 py-2 space-x-1">
                   {/* View Buttons */}
                   <Button variant="outline" size="icon" className="h-7 w-7 border-yellow-600 hover:bg-yellow-600/20" title="View Raw Markdown" asChild>
                       <a href={viewUrlMd} target="_blank" rel="noopener noreferrer"><FileText size={14} className="text-yellow-500"/></a>
                   </Button>
                   <Button variant="outline" size="icon" className="h-7 w-7 border-green-600 hover:bg-green-600/20" title="View Metadata (JSON)" asChild>
                       <a href={viewUrlJson} target="_blank" rel="noopener noreferrer"><span className="text-green-500 font-mono text-xs">{'{ }'}</span></a>
                   </Button>
                   {/* Add Download buttons later if needed */}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConsolidatedFiles;