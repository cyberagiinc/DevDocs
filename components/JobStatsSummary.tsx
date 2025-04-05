'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CrawlJobStatus, UrlStatus } from '@/lib/types'; // Import necessary types
import { Globe, BookOpen, HardDrive, AlertTriangle } from 'lucide-react'; // Example icons

// Placeholder for metadata structure - might be needed for Data Extracted size
interface ConsolidatedMetadata {
  // Define properties needed, e.g., sizeKB or similar
  sizeKB?: number;
  pages?: any[]; // To get count if needed differently than status.urls
}

interface JobStatsSummaryProps {
  jobStatus: CrawlJobStatus | null;
  // consolidatedMetadata: ConsolidatedMetadata | null; // Pass metadata if needed for size
}

// Helper function to count URLs by status
const countUrlsByStatus = (urls: Record<string, UrlStatus> | undefined, targetStatus: UrlStatus | UrlStatus[]): number => {
  if (!urls) return 0;
  const targetStatuses = Array.isArray(targetStatus) ? targetStatus : [targetStatus];
  return Object.values(urls).filter(status => targetStatuses.includes(status)).length;
};

const JobStatsSummary: React.FC<JobStatsSummaryProps> = ({
  jobStatus,
  // consolidatedMetadata,
}) => {
  // Calculate stats based on jobStatus
  const subdomainsParsed = jobStatus?.urls ? Object.keys(jobStatus.urls).length : 0;
  const pagesCrawled = countUrlsByStatus(jobStatus?.urls, 'completed'); // Count successfully crawled pages
  const errorsEncountered = countUrlsByStatus(jobStatus?.urls, ['discovery_error', 'crawl_error']);

  // Placeholder for data extracted size - ideally comes from metadata or needs calculation
  // Use the data_extracted field from the jobStatus if available
  const dataExtracted = jobStatus?.data_extracted ?? 'N/A';

  // Determine if processing is active (can refine this logic)
  const isProcessing = jobStatus ? !['completed', 'completed_with_errors', 'error', 'discovery_complete'].includes(jobStatus.overall_status) : false;


  return (
    <Card className="bg-gray-800/50 backdrop-blur-lg border-gray-700 shadow-xl w-full">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-purple-400">Statistics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {/* Subdomains Parsed */}
          <div className="bg-gray-700/50 p-4 rounded-lg">
            <Globe className="mx-auto h-6 w-6 text-blue-400 mb-2" />
            <p className="text-xs text-gray-400 uppercase">URLs Discovered</p>
            <p className={`text-2xl font-bold ${isProcessing ? 'text-gray-400 animate-pulse' : 'text-blue-300'}`}>
              {subdomainsParsed}
            </p>
          </div>

          {/* Pages Crawled */}
          <div className="bg-gray-700/50 p-4 rounded-lg">
            <BookOpen className="mx-auto h-6 w-6 text-green-400 mb-2" />
            <p className="text-xs text-gray-400 uppercase">Pages Crawled</p>
             <p className={`text-2xl font-bold ${isProcessing ? 'text-gray-400 animate-pulse' : 'text-green-300'}`}>
               {pagesCrawled}
             </p>
          </div>

          {/* Data Extracted */}
          <div className="bg-gray-700/50 p-4 rounded-lg">
            <HardDrive className="mx-auto h-6 w-6 text-yellow-400 mb-2" />
            <p className="text-xs text-gray-400 uppercase">Data Extracted</p>
             <p className={`text-2xl font-bold ${isProcessing ? 'text-gray-400 animate-pulse' : 'text-yellow-300'}`}>
               {dataExtracted} {/* Placeholder */}
             </p>
          </div>

          {/* Errors Encountered */}
          <div className="bg-gray-700/50 p-4 rounded-lg">
            <AlertTriangle className="mx-auto h-6 w-6 text-red-400 mb-2" />
            <p className="text-xs text-gray-400 uppercase">Errors</p>
             <p className={`text-2xl font-bold ${errorsEncountered > 0 ? 'text-red-400' : (isProcessing ? 'text-gray-400 animate-pulse' : 'text-red-300')}`}>
               {errorsEncountered}
             </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default JobStatsSummary;