'use client'

import React, { useState, useEffect, useMemo, useRef } from 'react'; // Added useRef
import { CrawlJobStatus, OverallStatus, UrlStatus, DiscoveredPage } from '@/lib/types'; // Import necessary types & DiscoveredPage
interface CrawlStatusMonitorProps {
  jobId: string | null;
}

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
  onStatusUpdate: (status: CrawlJobStatus) => void; // Keep status updates
}

const CrawlStatusMonitor: React.FC<CrawlStatusMonitorProps> = ({
  jobId,
  status,    // Destructure props
  error,     // Destructure props
  isLoading, // Destructure props
  // Destructure new props
  onStatusUpdate, // Keep status updates
}) => {
  // Removed internal state related to selection
  // Toast can remain here if needed for local feedback, or be handled entirely by parent
  const { toast } = useToast();
  const pollIntervalRef = useRef<NodeJS.Timeout | null>(null); // Ref to store interval ID

  // --- Polling logic REMOVED ---
  // Polling is now handled by the parent component (app/page.tsx)
  // This useEffect and the one below (lines 140-165) caused the 404 errors.

  // --- Redundant polling restart logic REMOVED ---
  // This was also causing 404s as polling is handled by the parent.
  // --- Removed Hooks and Derived State Calculations related to URL list ---


  // Removed effect related to selection state

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

  // --- Removed Selection Logic Handlers ---

  return (
    <div className="space-y-4 text-gray-300">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-green-400">Job Status: {jobId}</h3>
        {isLoading && <span className="text-sm text-blue-400 animate-pulse">Updating...</span>}
      </div>

      {/* Simplified grid, removed Crawl Selected button */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm items-center">
        <div>Overall: <span className={`font-medium ${status.overall_status === 'error' ? 'text-red-500' : 'text-yellow-400'}`}>{status.overall_status}</span></div>
        <div>Start: <span className="text-gray-400">{formatDate(status.start_time)}</span></div>
        <div>End: <span className="text-gray-400">{formatDate(status.end_time)}</span></div>
      </div>

      {/* Overall Error Message */}
      {status.error && (
        <div className="bg-red-900/50 border border-red-700 p-3 rounded-md">
          <p className="text-red-400 font-semibold">Job Error:</p>
          <p className="text-red-300 text-sm">{status.error}</p>
        </div>
      )}

      {/* Removed URL Status List */}

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