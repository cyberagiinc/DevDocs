'use client'

import { useState, useEffect, useCallback } from 'react' // Added useCallback
import UrlInput from '@/components/UrlInput'
// import ProcessingBlock from '@/components/ProcessingBlock' // Replaced by JobStatsSummary
import JobStatsSummary from '@/components/JobStatsSummary' // Import the new stats component
import SubdomainList from '@/components/SubdomainList'
import StoredFiles from '@/components/StoredFiles'
import ConfigSettings from '@/components/ConfigSettings'
import CrawlStatusMonitor from '@/components/CrawlStatusMonitor';
import CrawlUrls from '@/components/CrawlUrls'; // Import the new component
import { Button } from "@/components/ui/button"; // Import Button
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"; // Import Dialog components
import { Info, Settings } from 'lucide-react'; // Import icons
import { discoverSubdomains, crawlPages, validateUrl, formatBytes } from '@/lib/crawl-service'
import { saveMarkdown, loadMarkdown } from '@/lib/storage'
import { useToast } from "@/components/ui/use-toast"
import { DiscoveredPage, CrawlJobStatus, OverallStatus, UrlStatus } from '@/lib/types' // Import status types & UrlStatus
import ConsolidatedFiles from '@/components/ConsolidatedFiles'; // Import ConsolidatedFiles
import { MCPConfigDialog } from '@/components/MCPConfigDialog'; // Import the renamed MCP Config Dialog

export default function Home() {
  // --- LocalStorage Persistence Constants (defined earlier) ---
  const LOCALSTORAGE_VERSION = '1';
  const localStorageKey = {
      VERSION: 'crawlAppStateVersion',
      JOB_ID: 'crawlJobId',
      JOB_STATUS: 'crawlJobStatus',
      SELECTED_URLS: 'crawlSelectedUrls',
      URL_INPUT: 'crawlUrlInput',
      DISCOVERED_PAGES: 'crawlDiscoveredPages',
  };

  // --- Helper function for safe localStorage getItem ---
  const safeLocalStorageGetItem = (key: string, defaultValue: any = null) => {
      if (typeof window === 'undefined') {
          return defaultValue;
      }
      try {
          const item = localStorage.getItem(key);
          if (!item) {
              return defaultValue;
          }
          const parsed = JSON.parse(item);
          if (parsed.version !== LOCALSTORAGE_VERSION) {
              console.warn(`LocalStorage version mismatch for key ${key}. Expected ${LOCALSTORAGE_VERSION}, found ${parsed.version}. Discarding stored data.`);
              localStorage.removeItem(key); // Remove outdated data
              return defaultValue;
          }
          return parsed.data;
      } catch (error) {
          console.error(`Error reading state from localStorage (key: ${key}):`, error);
          localStorage.removeItem(key); // Remove corrupted data
          return defaultValue;
      }
  };

  // --- State Initialization with Hydration ---
  const [url, setUrl] = useState<string>(() => safeLocalStorageGetItem(localStorageKey.URL_INPUT, ''));
  const [isProcessing, setIsProcessing] = useState(false); // Transient state, not persisted
  const [discoveredPages, setDiscoveredPages] = useState<DiscoveredPage[]>(() => safeLocalStorageGetItem(localStorageKey.DISCOVERED_PAGES, []));
  const [isCrawling, setIsCrawling] = useState(false); // Transient state, not persisted
  const [markdown, setMarkdown] = useState('') // Keep markdown state for potential display elsewhere if needed
  // Remove old stats state, it's now derived in JobStatsSummary from jobStatus
  // const [stats, setStats] = useState({...}) // Old stats state removed
  const [currentJobId, setCurrentJobId] = useState<string | null>(() => safeLocalStorageGetItem(localStorageKey.JOB_ID, null));
  const { toast } = useToast();
  // Lifted state from CrawlStatusMonitor
  const [jobStatus, setJobStatus] = useState<CrawlJobStatus | null>(() => safeLocalStorageGetItem(localStorageKey.JOB_STATUS, null));
  const [jobError, setJobError] = useState<string | null>(null); // Transient state
  const [isPollingLoading, setIsPollingLoading] = useState<boolean>(false); // Transient state
  // State lifted for selective crawl
  const [selectedUrls, setSelectedUrls] = useState<Set<string>>(() => {
      const storedArray = safeLocalStorageGetItem(localStorageKey.SELECTED_URLS, []);
      return new Set(Array.isArray(storedArray) ? storedArray : []); // Ensure it's an array before creating Set
  });
  const [isCrawlingSelected, setIsCrawlingSelected] = useState<boolean>(false); // Transient state
  const [isCancelling, setIsCancelling] = useState<boolean>(false); // Added state for cancellation UI

  // --- LocalStorage Persistence (Saving Logic - defined earlier) ---
  // Removed duplicate declarations of LOCALSTORAGE_VERSION and localStorageKey

  // Helper function for safe localStorage setItem
  const safeLocalStorageSetItem = useCallback((key: string, value: any) => {
    try {
      const dataToStore = JSON.stringify({ version: LOCALSTORAGE_VERSION, data: value });
      localStorage.setItem(key, dataToStore);
    } catch (error) {
      console.error(`Error saving state to localStorage (key: ${key}):`, error);
      // Optionally, show a toast notification about storage issues
      // toast({ title: "Storage Error", description: `Could not save state for ${key}. Storage might be full.`, variant: "destructive" });
    }
  }, []); // No dependencies, function is stable

  // Save currentJobId
  useEffect(() => {
    if (typeof window !== 'undefined') {
      safeLocalStorageSetItem(localStorageKey.JOB_ID, currentJobId);
    }
  }, [currentJobId, safeLocalStorageSetItem, localStorageKey.JOB_ID]);

  // Save jobStatus
  useEffect(() => {
    if (typeof window !== 'undefined') {
      safeLocalStorageSetItem(localStorageKey.JOB_STATUS, jobStatus);
    }
  }, [jobStatus, safeLocalStorageSetItem, localStorageKey.JOB_STATUS]);

  // Save selectedUrls (convert Set to Array)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      safeLocalStorageSetItem(localStorageKey.SELECTED_URLS, Array.from(selectedUrls));
    }
  }, [selectedUrls, safeLocalStorageSetItem, localStorageKey.SELECTED_URLS]);

  // Save url input value
  useEffect(() => {
    if (typeof window !== 'undefined') {
      safeLocalStorageSetItem(localStorageKey.URL_INPUT, url);
    }
  }, [url, safeLocalStorageSetItem, localStorageKey.URL_INPUT]);

  // Save discoveredPages (potentially large)
  useEffect(() => {
    // Avoid saving during initial discovery phase if it's empty or resetting
    if (typeof window !== 'undefined' && discoveredPages.length > 0) {
       safeLocalStorageSetItem(localStorageKey.DISCOVERED_PAGES, discoveredPages);
    } else if (typeof window !== 'undefined' && discoveredPages.length === 0 && localStorage.getItem(localStorageKey.DISCOVERED_PAGES)) {
       // If discoveredPages is reset to empty, remove from storage
       localStorage.removeItem(localStorageKey.DISCOVERED_PAGES);
    }
  }, [discoveredPages, safeLocalStorageSetItem, localStorageKey.DISCOVERED_PAGES]);

  // --- End LocalStorage Persistence (Saving Logic) ---

  // --- Revalidation Logic ---
  useEffect(() => {
    const initialJobId = safeLocalStorageGetItem(localStorageKey.JOB_ID, null);
    const initialJobStatus: CrawlJobStatus | null = safeLocalStorageGetItem(localStorageKey.JOB_STATUS, null);

    if (initialJobId && initialJobStatus) {
      const ongoingStates: OverallStatus[] = ['discovering', 'crawling', 'cancelling']; // States that might be stale
      if (ongoingStates.includes(initialJobStatus.overall_status)) {
        console.log(`(Page Hydration) Revalidating status for ongoing job ${initialJobId} (status: ${initialJobStatus.overall_status})`);
        // Define async function inside useEffect
        const revalidateStatus = async () => {
          try {
            const response = await fetch(`/api/crawl-status/${initialJobId}`);
            const latestStatus: CrawlJobStatus = await response.json();
            if (response.ok) {
              console.log(`(Page Hydration) Revalidated status for job ${initialJobId}:`, latestStatus.overall_status);
              setJobStatus(latestStatus); // Update state with fresh status
            } else {
              console.warn(`(Page Hydration) Failed to revalidate status for job ${initialJobId}: ${response.status} - ${latestStatus.error || 'Unknown error'}`);
              // Optionally handle error, maybe clear state if 404?
              if (response.status === 404) {
                 setCurrentJobId(null);
                 setJobStatus(null);
                 // Clear relevant localStorage?
                 localStorage.removeItem(localStorageKey.JOB_ID);
                 localStorage.removeItem(localStorageKey.JOB_STATUS);
              }
            }
          } catch (err) {
            console.error(`(Page Hydration) Network error revalidating status for job ${initialJobId}:`, err);
          }
        };
        // Call the async function
        revalidateStatus();
      }
    }
    // Run only once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // --- End Revalidation Logic ---


  const handleSubmit = async (submittedUrl: string, depth: number) => {
    if (!validateUrl(submittedUrl)) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid URL including the protocol (http:// or https://)",
        variant: "destructive"
      })
      return
    }

    setUrl(submittedUrl)
    setIsProcessing(true)
    setMarkdown('')
    setDiscoveredPages([])
    setCurrentJobId(null); // Reset job ID for new discovery
    setJobStatus(null); // Explicitly reset job status state
    setSelectedUrls(new Set()); // Reset selected URLs state

    // --- Clear relevant localStorage on new discovery ---
    if (typeof window !== 'undefined') {
        console.log("Clearing localStorage for new discovery...");
        localStorage.removeItem(localStorageKey.JOB_ID);
        localStorage.removeItem(localStorageKey.JOB_STATUS);
        localStorage.removeItem(localStorageKey.SELECTED_URLS);
        localStorage.removeItem(localStorageKey.DISCOVERED_PAGES);
        // Keep URL_INPUT? Maybe, maybe not. Let's clear it for now.
        // localStorage.removeItem(localStorageKey.URL_INPUT);
        // Remove version key as well? No, keep it to check on next load.
    }
    // --- End Clear localStorage ---

    try {
      console.log('Initiating discovery for:', submittedUrl, 'with depth:', depth)
      // Call updated service function, expect jobId back
      const { jobId } = await discoverSubdomains({ url: submittedUrl, depth })
      console.log('Discovery initiated. Job ID:', jobId)
      setCurrentJobId(jobId); // Store the job ID

      // Note: We no longer get pages directly. The CrawlStatusMonitor will poll for status.
      // We might want to show a message indicating discovery is in progress.
      toast({
        title: "Discovery Initiated",
        description: `Started discovery process with Job ID: ${jobId}. Status updates will appear below.`
      })

      // Clear previous results shown by SubdomainList? Or wait for polling?
      // For now, let's clear discoveredPages, the monitor will show progress.
      setDiscoveredPages([])
      // No need to reset old stats state anymore
      // setStats({
      //   subdomainsParsed: 0,
      //   pagesCrawled: 0,
      //   dataExtracted: '0 KB',
      //   errorsEncountered: 0
      // })


      /* --- Old logic expecting direct page results ---
      const pages = await discoverSubdomains({ url: submittedUrl, depth })
      console.log('Discovered pages:', pages)
      
      setDiscoveredPages(pages) // This is now handled by polling/status monitor
      setStats(prev => ({ // Stats are now part of the job status
        ...prev,
        subdomainsParsed: pages.length,
        errorsEncountered: pages.filter((page: DiscoveredPage) => page.status === 'error').length
      }))

      toast({ // Toast is now handled above when job starts
        title: "Pages Discovered",
        description: `Found ${pages.length} related pages at depth ${depth}`
      })
      */ // --- End of old logic ---
    } catch (error) {
      console.error('Error initiating discovery:', error)
      setCurrentJobId(null); // Clear job ID on initiation error
      toast({
        title: "Discovery Error",
        description: error instanceof Error ? error.message : "Failed to initiate discovery process",
        variant: "destructive"
      })
    } finally {
      setIsProcessing(false)
    }
  }
// Handler for selection changes from CrawlStatusMonitor
const handleSelectionChange = (newSelectedUrls: Set<string>) => {
  setSelectedUrls(newSelectedUrls);
};

// Handler for status updates from the polling logic
const handleStatusUpdate = (newStatus: CrawlJobStatus) => {
  setJobStatus(newStatus);
};

// Renamed and refactored handler for the "Crawl Selected" button click
const handleCrawlSelectedClick = async () => {
  // Removed erroneous inner function declaration
    // Maybe this button should only appear *after* discovery is complete and pages are shown by the monitor?
    // Or maybe the crawl action is triggered differently now?
    // For now, let's assume we still select pages and trigger crawl, but using the currentJobId.

    // Use state variables directly
    if (!currentJobId || selectedUrls.size === 0) {
      toast({
        title: "Cannot Initiate Crawl",
        description: !currentJobId ? "No active job found." : "No URLs selected.",
        variant: "default" // Changed from "warning" as it's not a valid variant
      })
      return;
    }

    setIsCrawlingSelected(true); // Use the specific state for the button
    try {
      // Convert the Set of URLs to the array of DiscoveredPage objects expected by crawlPages
      // Note: We only strictly need the 'url' property for the backend endpoint currently.
      const pagesToCrawl: DiscoveredPage[] = Array.from(selectedUrls).map(url => ({
          url: url,
          status: 'pending_crawl' // Initial status for the request object
          // title and internalLinks are not strictly needed by the backend crawl_pages endpoint
      }));

      console.log(`Initiating crawl for job ${currentJobId} with ${pagesToCrawl.length} selected URLs:`, pagesToCrawl.map(p => p.url));

      // Remove manual status updates - polling handles this
      // setDiscoveredPages(...)
      
      // Call updated service function, passing job ID
      const crawlResponse = await crawlPages({ pages: pagesToCrawl, job_id: currentJobId }) // Changed jobId to job_id
      console.log('Crawl initiation response:', crawlResponse)

      if (!crawlResponse.success || crawlResponse.error) {
        throw new Error(crawlResponse.error || 'Failed to initiate crawl process')
      }

      // Crawling is now happening in the background. We don't get markdown directly.
      // The CrawlStatusMonitor will show progress.
      toast({
        title: "Crawl Request Sent",
        description: `Backend acknowledged crawl request for job ${crawlResponse.jobId}. Monitor progress below.`
      })
      // Clear selection after initiating crawl
      setSelectedUrls(new Set());

      // Clear local markdown state?
      setMarkdown('')
      // No need to reset old stats state anymore
      // setStats(prev => ({
      //   ...prev,
      //   pagesCrawled: 0,
      //   dataExtracted: '0 KB',
      //   errorsEncountered: 0
      // }))


      /* --- Old logic expecting direct crawl results ---
      const result = await crawlPages(selectedPages)
      console.log('Crawl result:', result)

      if (result.error) {
        throw new Error(result.error)
      }
      
      try {
        await saveMarkdown(url, result.markdown) // Saving happens on backend now based on crawl results
        console.log('Saved content for:', url)

        setMarkdown(result.markdown) // Markdown is not returned directly
        setStats(prev => ({ // Stats are part of job status
          ...prev,
          pagesCrawled: selectedPages.length,
          dataExtracted: formatBytes(result.markdown.length)
        }))

        // Update status to crawled for successfully crawled pages // Status updated via polling
        setDiscoveredPages(pages =>
          pages.map(page => ({
            ...page,
            status: selectedUrls.includes(page.url) ? 'crawled' as const : page.status,
            internalLinks: page.internalLinks?.map(link => ({
              ...link,
              status: selectedUrls.includes(link.href) ? 'crawled' as const : link.status || 'pending'
            }))
          }))
        )

        toast({ // Saving is handled by backend
          title: "Content Saved",
          description: `Crawled content has been saved and can be loaded again later`
        })
      } catch (error) { // Saving is handled by backend
        console.error('Error saving content:', error)
        toast({
          title: "Error",
          description: "Failed to save content for later use",
          variant: "destructive"
        })
      }

      toast({ // Crawling completion is tracked by monitor
        title: "Crawling Complete",
        description: "All pages have been crawled and processed"
      })
      */ // --- End of old logic ---
    } catch (error) {
      console.error('Error initiating crawl:', error)
      // Remove manual status updates
      toast({
        title: "Crawl Error",
        description: error instanceof Error ? error.message : "Failed to initiate crawl process",
        variant: "destructive"
      })
    } finally {
      setIsCrawlingSelected(false); // Use the specific state for the button
    }

  }; // Added back closing brace for handleCrawlSelectedClick

  // --- Cancel Crawl Handler ---
  const handleCancelCrawl = async () => {
    if (!currentJobId) {
      toast({ title: "Error", description: "No active job to cancel.", variant: "destructive" });
      return;
    }
    if (isCancelling) {
      return; // Prevent double clicks
    }

    setIsCancelling(true);
    console.log(`(Page) Initiating cancellation for job ${currentJobId}`);
    try {
      const response = await fetch(`/api/crawl-cancel/${currentJobId}`, {
        method: 'POST',
      });

      const result = await response.json(); // Attempt to parse JSON regardless of status

      if (!response.ok) {
        // Use detail from backend response if available, otherwise use status text
        const errorDetail = result?.detail || response.statusText || `HTTP error ${response.status}`;
        throw new Error(errorDetail);
      }

      // Success: Update local status immediately for responsiveness
      setJobStatus(prevStatus => prevStatus ? { ...prevStatus, overall_status: 'cancelling' } : null);
      toast({
        title: "Cancellation Requested",
        description: `Sent cancellation request for job ${currentJobId}. Status will update shortly.`,
      });
      // Button remains disabled via isCancelling state and eventually status change

      // Optional: Trigger an immediate status fetch? Polling should pick it up anyway.
      // fetchStatus(); // Consider if needed for faster feedback than polling interval

    } catch (error) {
      console.error(`(Page) Error cancelling job ${currentJobId}:`, error);
      toast({
        title: "Cancellation Failed",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
      // Re-enable button only if it was a potentially recoverable error?
      // For now, let the status polling eventually correct the UI state.
    } finally {
      setIsCancelling(false); // Reset cancelling state after attempt
    }
  };
  // --- End Cancel Crawl Handler ---

  // --- Lifted Polling Logic from CrawlStatusMonitor ---
  useEffect(() => {
    // Clear previous status and error when jobId changes or becomes null
    setJobStatus(null);
    setJobError(null);
    setIsPollingLoading(false);

    if (!currentJobId) {
      return; // No job to monitor
    }

    let intervalId: NodeJS.Timeout | null = null;
    let isFetching = false; // Prevent overlapping fetches
    const POLLING_INTERVAL = 3000; // Poll every 3 seconds


    const fetchStatus = async () => {
      if (isFetching) return; // Don't fetch if already fetching
      isFetching = true;
      setIsPollingLoading(true); // Indicate loading at the start of fetch

      try {
        console.log(`(Page) Fetching status for job: ${currentJobId}`);
        const response = await fetch(`/api/crawl-status/${currentJobId}`);
        const data: CrawlJobStatus = await response.json();

        if (!response.ok) {
          const errorMsg = data.error || `HTTP error! status: ${response.status}`;
          console.error(`(Page) Error fetching status for job ${currentJobId}:`, errorMsg);
          setJobError(errorMsg);
          if (response.status === 404 && intervalId) {
             clearInterval(intervalId);
             intervalId = null;
             console.log(`(Page) Polling stopped for job ${currentJobId} due to 404.`);
          }
        } else {
          console.log(`(Page) Status received for job ${currentJobId}:`, data.overall_status);
          // Log full status object for debugging icon updates
          console.log(`(Page) Full status data for job ${currentJobId}:`, JSON.stringify(data, null, 2));
          setJobStatus(data);
          setJobError(null); // Clear previous errors on success

          const terminalStates: OverallStatus[] = ['completed', 'completed_with_errors', 'error'];
          if (terminalStates.includes(data.overall_status) && intervalId) {
            clearInterval(intervalId);
            intervalId = null;
            console.log(`(Page) Polling stopped for job ${currentJobId} as it reached terminal state: ${data.overall_status}`);
          }
        }
      } catch (err) {
        console.error(`(Page) Network or other error fetching status for job ${currentJobId}:`, err);
        setJobError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        isFetching = false;
        setIsPollingLoading(false); // Stop loading indicator after fetch attempt
      }
    };

    // Fetch immediately on jobId change
    fetchStatus();

    // Set up the interval polling only if not already in a terminal state
    if (!jobStatus || !['completed', 'completed_with_errors', 'error'].includes(jobStatus.overall_status)) {
        intervalId = setInterval(fetchStatus, POLLING_INTERVAL);
        console.log(`(Page) Polling started for job ${currentJobId} with interval ${POLLING_INTERVAL}ms`);
    } else {
         console.log(`(Page) Polling not started for job ${currentJobId} as it's already in terminal state: ${jobStatus.overall_status}`);
    }


    // Cleanup function
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
        console.log(`(Page) Polling stopped for job ${currentJobId} due to cleanup.`);
      }
    };
  }, [currentJobId]); // Re-run effect if currentJobId changes
  // --- End Lifted Polling Logic ---

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      <header className="w-full py-12 bg-gradient-to-r from-gray-900/50 to-gray-800/50 backdrop-blur-sm border-b border-gray-700">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 mb-4">
            DevDocs by CyberAGI
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Discover and extract documentation for quicker development
          </p>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 space-y-6">
        {/* Removed outer container div for Statistics/Data section */}
          {/* Header for Statistics section - Title only */}
          {/* Removed Statistics header */}
          {/* Container for Data Label (implicit in JobStatsSummary) + Icon + Stats */}
          {/* Container for Data Label (implicit in JobStatsSummary) + Icon */}
          {/* Use flex to align the (implicit) Data label and the icon */}
          {/* Container for implicit "Data" label (from JobStatsSummary) and the settings icon */}
          <div className="flex justify-between items-center mb-4">
            {/* Placeholder for the "Data" label which should be rendered by JobStatsSummary */}
            {/* We might need to adjust JobStatsSummary later if it doesn't render the label */}
            <div></div>
            {/* Settings Icon aligned to the right */}
            <MCPConfigDialog>
              <Button variant="outline" size="icon" aria-label="MCP Server Configuration" className="bg-white text-black hover:bg-gray-100 hover:text-black">
                <Settings className="h-4 w-4" />
              </Button>
            </MCPConfigDialog>
          </div>
          {/* Render JobStatsSummary below the header */}
          <JobStatsSummary jobStatus={jobStatus} />
        {/* Removed closing tag for the outer container div */}

        <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 border border-gray-700 shadow-xl">
          <h2 className="text-2xl font-semibold mb-4 text-blue-400">Start Exploration</h2>
          <UrlInput onSubmit={handleSubmit} />
        </div>

        {/* Render the new CrawlUrls component and the Dialog trigger */}
        {currentJobId && ( // Only render if there's an active job
          <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 border border-gray-700 shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-cyan-400">Crawl Queue</h2>
              {/* Dialog Trigger Button */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="icon" className="bg-white text-black hover:bg-gray-100 hover:text-black">
                    <Info className="h-4 w-4" />
                    <span className="sr-only">View Overall Job Status</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[625px] bg-gray-900 border-gray-700 text-gray-300">
                  <DialogHeader>
                    <DialogTitle className="text-green-400">Overall Job Status</DialogTitle>
                    <DialogDescription>
                      Detailed status for Job ID: {currentJobId}
                    </DialogDescription>
                  </DialogHeader>
                  {/* Render CrawlStatusMonitor inside the Dialog */}
                  <CrawlStatusMonitor
                    jobId={currentJobId}
                    status={jobStatus}
                    error={jobError}
                    isLoading={isPollingLoading}
                    onStatusUpdate={handleStatusUpdate} // Keep this handler
                  />
                </DialogContent>
              </Dialog>
            </div>
            {/* CrawlUrls Component */}
            <CrawlUrls
              jobId={currentJobId}
              urls={jobStatus?.urls || {}}
              selectedUrls={selectedUrls}
              onSelectionChange={handleSelectionChange}
              onCrawlSelected={handleCrawlSelectedClick}
              isCrawlingSelected={isCrawlingSelected}
              // Pass new props for cancellation
              onCancelCrawl={handleCancelCrawl}
              overallStatus={jobStatus?.overall_status ?? null} // Pass overall status from jobStatus
              isCancelling={isCancelling}
            />
          </div>
        )}

        {/* Removed the separate temporary container for CrawlStatusMonitor */}

        {/* Keep SubdomainList for now, but it might be replaced by CrawlStatusMonitor's display */}
        {/* Log if legacy SubdomainList condition is met */}
        {(() => {
          console.log(`page.tsx: discoveredPages.length = ${discoveredPages.length}. Rendering legacy SubdomainList? ${discoveredPages.length > 0}`);
          return null; // Return null to render nothing
        })()}
        {discoveredPages.length > 0 && (
          <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 border border-gray-700 shadow-xl">
            <h2 className="text-2xl font-semibold mb-4 text-cyan-400">Discovered Pages (Legacy Display)</h2>
            <SubdomainList
              subdomains={discoveredPages}
              // onCrawlSelected={handleCrawlSelected} // Remove this prop, button moved
              isProcessing={isCrawling} // isCrawling state might also become redundant
            />
          </div>
        )}


        <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 border border-gray-700 shadow-xl">
          {/* Render ConsolidatedFiles conditionally */}
          <ConsolidatedFiles />
        </div>
        
        {/* Config and Settings popup - Ensure it remains commented out */}
        {/* <ConfigSettings /> */}
      </div>

      <footer className="py-8 text-center text-gray-400">
        <p className="flex items-center justify-center gap-2">
          Made with <span className="text-red-500">❤️</span> by{' '}
          <a 
            href="https://www.cyberagi.ai/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 transition-colors"
          >
            CyberAGI Inc
          </a>{' '}
          in <span>🇺🇸</span>
        </p>
      </footer>
    </main>
  )
}
