'use client'

import React, { useState, useEffect, useMemo } from 'react'; // Added useMemo
import { CrawlJobStatus, OverallStatus, UrlStatus, DiscoveredPage } from '@/lib/types'; // Import necessary types & DiscoveredPage
import { Button } from '@/components/ui/button'; // Import Button
import { crawlPages } from '@/lib/crawl-service'; // Import crawlPages service
import { useToast } from '@/components/ui/use-toast'; // Import useToast

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:24125';
const POLLING_INTERVAL = 3000; // Poll every 3 seconds

// Define the expected props for the component
interface CrawlStatusMonitorProps {
  jobId: string | null;
  status: CrawlJobStatus | null; // Receive status as prop
  error: string | null;         // Receive error as prop
  isLoading: boolean;           // Receive loading state as prop
  // Add props for lifted state and handlers
  selectedUrls: Set<string>;
  isCrawlingSelected: boolean;
  onSelectionChange: (newSelectedUrls: Set<string>) => void;
  onCrawlSelected: () => void; // Keep it simple, parent handles async/toast
}

const CrawlStatusMonitor: React.FC<CrawlStatusMonitorProps> = ({
  jobId,
  status,    // Destructure props
  error,     // Destructure props
  isLoading, // Destructure props
  // Destructure new props
  selectedUrls,
  isCrawlingSelected,
  onSelectionChange,
  onCrawlSelected,
}) => {
  // Keep internal state for the 'Select All' checkbox UI only
  const [isSelectAllChecked, setIsSelectAllChecked] = useState<boolean>(false);
  // Toast can remain here if needed for local feedback, or be handled entirely by parent
  const { toast } = useToast();

  // --- Moved Hooks and Derived State Calculations Before Early Returns ---
  // Memoize the list of URLs eligible for crawling (pending_crawl status)
  const crawlableUrls = useMemo(() => {
    // Add more defensive checks for status and status.urls
    if (!status || typeof status !== 'object' || !status.urls || typeof status.urls !== 'object' || status.overall_status !== 'discovery_complete') {
      return [];
    }
    try {
      // Now it should be safer to call Object.entries
      return Object.entries(status.urls)
        .filter(([_, urlStatus]) => urlStatus === 'pending_crawl')
        .map(([url]) => url);
    } catch (e) {
       console.error("Error processing status.urls in crawlableUrls useMemo:", e, status.urls);
       return []; // Return empty array on error
    }
  }, [status]); // Dependency is status prop

  // Calculate derived state (these are not hooks, just calculations)
  const totalUrlCount = status?.urls ? Object.keys(status.urls).length : 0;
  const selectedCount = selectedUrls.size; // Use prop
  const canCrawl = status?.overall_status === 'discovery_complete';
  // --- End Moved Section ---


  // Reset selection state effect (This hook is fine here as it doesn't affect render order)
  useEffect(() => {
      // Only reset internal UI state here. Parent resets selectedUrls/isCrawlingSelected.
      setIsSelectAllChecked(false);
  }, [jobId, status?.overall_status]); // Reset if job changes or status resets

  // Basic rendering logic (Step 4.4.4)
  if (!jobId) {
    return <p className="text-gray-500 italic">No active job to monitor.</p>;
  }

  // Show loading state (use prop) more reliably
  if (isLoading && !status && !error) { // Check the isLoading prop passed from parent
    return <p className="text-blue-400 animate-pulse">Loading status for Job ID: {jobId}...</p>;
  }

  if (error) { // Check error prop
    return <p className="text-red-500">Error fetching status: {error}</p>; // Display error prop
  }

  // If there's an error (prop) but no status (prop) yet
  if (error && !status) { // Check props
     return <p className="text-red-500">Error fetching initial status: {error}</p>;
  }

  // If somehow we have neither status (prop) nor error (prop) after loading (prop)
  if (!status) { // Check status prop
     return <p className="text-gray-500 italic">Waiting for status...</p>;
  }

  // Add logging before useMemo to inspect the status prop
  console.log("CrawlStatusMonitor rendering. Status prop:", status);

  // Hooks and derived state calculations were moved above the early returns.
  // Removing the duplicated declarations below:

  // --- Detailed Rendering Logic ---

  // Helper to format dates nicely
  const formatDate = (dateString: string | undefined | null): string => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleString();
    } catch {
      return 'Invalid Date';
    }
  };

  // Helper to get status color/icon (example)
  const getStatusIndicator = (urlStatus: string) => {
    switch (urlStatus) {
      case 'pending_discovery':
      case 'pending_crawl':
        return <span className="text-gray-400" title={urlStatus}>⏳</span>;
      case 'discovering':
      case 'crawling':
        return <span className="text-blue-400 animate-pulse" title={urlStatus}>⚙️</span>;
      case 'completed':
        return <span className="text-green-500" title={urlStatus}>✅</span>;
      case 'discovery_error':
      case 'crawl_error':
        return <span className="text-red-500" title={urlStatus}>❌</span>;
      default:
        return <span className="text-gray-500" title={urlStatus}>❓</span>;
    }
  };

  // --- Selection Logic Handlers ---
  const handleCheckboxChange = (url: string) => {
    // Calculate the new set based on the prop
    const newSelectedUrls = new Set(selectedUrls);
    if (newSelectedUrls.has(url)) {
      newSelectedUrls.delete(url);
    } else {
      newSelectedUrls.add(url);
    }

    // Update internal Select All checkbox state
    setIsSelectAllChecked(crawlableUrls.length > 0 && newSelectedUrls.size === crawlableUrls.length);

    // Call the callback prop to update the parent state
    onSelectionChange(newSelectedUrls);
  };

  const handleSelectAllChange = (isChecked: boolean) => {
    setIsSelectAllChecked(isChecked); // Update internal UI state
    let newSelectedUrls: Set<string>;
    if (isChecked) {
      // Select all crawlable URLs
      newSelectedUrls = new Set(crawlableUrls);
    } else {
      // Deselect all URLs
      newSelectedUrls = new Set();
    }
    // Call the callback prop to update the parent state
    onSelectionChange(newSelectedUrls);
  };

  // Remove the internal handleCrawlSelectedClick handler.
  // The button's onClick will now call props.onCrawlSelected directly.
  // --- End Selection Logic Handlers ---

  return (
    <div className="space-y-4 text-gray-300">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-green-400">Job Status: {jobId}</h3>
        {isLoading && <span className="text-sm text-blue-400 animate-pulse">Updating...</span>}
      </div>

      {/* Overall Status, Times, and Crawl Button */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2 text-sm items-center"> {/* Changed to 4 cols */}
        <div>Overall: <span className={`font-medium ${status.overall_status === 'error' ? 'text-red-500' : 'text-yellow-400'}`}>{status.overall_status}</span></div>
        <div>Start: <span className="text-gray-400">{formatDate(status.start_time)}</span></div>
        <div>End: <span className="text-gray-400">{formatDate(status.end_time)}</span></div>
        {/* Moved Crawl Selected Button Here */}
        {canCrawl && (
           <div className="md:justify-self-end"> {/* Align button to the right on medium+ screens */}
             <Button
                onClick={onCrawlSelected} // Use prop
                disabled={selectedCount === 0 || isCrawlingSelected} // Use props
                size="sm"
             >
                {isCrawlingSelected ? 'Initiating...' : `Crawl Selected (${selectedCount})`} {/* Use props */}
             </Button>
           </div>
        )}
      </div>

      {/* Overall Error Message */}
      {status.error && (
        <div className="bg-red-900/50 border border-red-700 p-3 rounded-md">
          <p className="text-red-400 font-semibold">Job Error:</p>
          <p className="text-red-300 text-sm">{status.error}</p>
        </div>
      )}

      {/* URL Status List */}
      <div className="max-h-60 overflow-y-auto bg-gray-900/50 p-3 rounded-md border border-gray-700">
        <h4 className="text-lg font-medium mb-2 text-cyan-400">
          URL Progress ({totalUrlCount} total)
        </h4>
        {/* Conditionally render Select All checkbox only when discovery is complete */}
        {canCrawl && Object.keys(status.urls).length > 0 && (
          <div className="mb-2 flex items-center"> {/* Removed justify-between, button moved */}
             <div className="flex items-center space-x-2">
               <input
                 type="checkbox"
                 id="select-all"
                 className="form-checkbox h-4 w-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                 checked={isSelectAllChecked}
                 onChange={(e) => handleSelectAllChange(e.target.checked)}
                 aria-label="Select all URLs"
               />
               <label htmlFor="select-all" className="text-sm text-gray-400">Select All ({crawlableUrls.length} crawlable)</label>
             </div>
             {/* Button removed from here */}
          </div>
        )}
        {Object.entries(status.urls).length > 0 ? (
           <ul className="space-y-1 text-sm">
             {Object.entries(status.urls).map(([url, urlStatus]) => {
               const isCrawlable = canCrawl && urlStatus === 'pending_crawl';
               return (
                 <li key={url} className={`flex items-center justify-between p-1 rounded ${isCrawlable ? 'hover:bg-gray-700/50' : 'opacity-60'}`}>
                   <div className="flex items-center space-x-2 flex-grow min-w-0">
                     {/* Render checkbox only if the URL is crawlable */}
                     {isCrawlable ? (
                       <input
                         type="checkbox"
                         className="form-checkbox h-4 w-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 flex-shrink-0"
                         checked={selectedUrls.has(url)} // Use prop
                         onChange={() => handleCheckboxChange(url)}
                         aria-label={`Select URL ${url}`}
                       />
                     ) : (
                       <div className="w-4 h-4 flex-shrink-0"></div> // Placeholder for alignment
                     )}
                     <span className="truncate" title={url}>{url}</span>
                   </div>
                   <span className="flex-shrink-0 ml-2">{getStatusIndicator(urlStatus)}</span>
                 </li>
               );
             })}
           </ul>
         ) : (
           <p className="text-gray-500 italic">No URLs being processed yet.</p>
         )}
      </div>

      {/* Optional: Raw Status Display for Debugging */}
      {/* <details className="mt-4">
        <summary className="text-xs text-gray-500 cursor-pointer">Show Raw Status</summary>
        <pre className="bg-gray-900 p-2 rounded text-xs overflow-auto mt-1">
          {JSON.stringify(status, null, 2)}
        </pre>
      </details> */}
    </div>
  );
};

export default CrawlStatusMonitor;