'use client'

import { useState, useEffect } from 'react'
import UrlInput from '@/components/UrlInput'
// import ProcessingBlock from '@/components/ProcessingBlock' // Replaced by JobStatsSummary
import JobStatsSummary from '@/components/JobStatsSummary' // Import the new stats component
import SubdomainList from '@/components/SubdomainList'
import StoredFiles from '@/components/StoredFiles'
import ConfigSettings from '@/components/ConfigSettings'
import CrawlStatusMonitor from '@/components/CrawlStatusMonitor'
import { discoverSubdomains, crawlPages, validateUrl, formatBytes } from '@/lib/crawl-service'
import { saveMarkdown, loadMarkdown } from '@/lib/storage'
import { useToast } from "@/components/ui/use-toast"
import { DiscoveredPage, CrawlJobStatus, OverallStatus } from '@/lib/types' // Import status types
import ConsolidatedFiles from '@/components/ConsolidatedFiles' // Import ConsolidatedFiles

export default function Home() {
  const [url, setUrl] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [discoveredPages, setDiscoveredPages] = useState<DiscoveredPage[]>([])
  const [isCrawling, setIsCrawling] = useState(false)
  const [markdown, setMarkdown] = useState('') // Keep markdown state for potential display elsewhere if needed
  // Remove old stats state, it's now derived in JobStatsSummary from jobStatus
  // const [stats, setStats] = useState({
  //   subdomainsParsed: 0,
  //   pagesCrawled: 0,
  //   dataExtracted: '0 KB',
  //   errorsEncountered: 0
  // })
  const [currentJobId, setCurrentJobId] = useState<string | null>(null); // Add state for Job ID
  const { toast } = useToast()
  // Lifted state from CrawlStatusMonitor
  const [jobStatus, setJobStatus] = useState<CrawlJobStatus | null>(null);
  const [jobError, setJobError] = useState<string | null>(null);
  const [isPollingLoading, setIsPollingLoading] = useState<boolean>(false);
  // State lifted for selective crawl
  const [selectedUrls, setSelectedUrls] = useState<Set<string>>(new Set());
  const [isCrawlingSelected, setIsCrawlingSelected] = useState<boolean>(false);

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
        subdomainsParsed: pages.length
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
      const crawlResponse = await crawlPages({ pages: pagesToCrawl, jobId: currentJobId })
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
    const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:24125';


    const fetchStatus = async () => {
      if (isFetching) return; // Don't fetch if already fetching
      isFetching = true;
      setIsPollingLoading(true); // Indicate loading at the start of fetch

      try {
        console.log(`(Page) Fetching status for job: ${currentJobId}`);
        const response = await fetch(`${BACKEND_URL}/api/crawl-status/${currentJobId}`);
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
            DevDocs
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Discover and extract documentation for quicker development
          </p>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 space-y-6">
        <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 border border-gray-700 shadow-xl">
          {/* Replace ProcessingBlock with JobStatsSummary */}
          {/* <h2 className="text-2xl font-semibold mb-4 text-purple-400">Processing Status</h2> */}
          {/* The title is now inside JobStatsSummary */}
          <JobStatsSummary jobStatus={jobStatus} />
        </div>

        <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 border border-gray-700 shadow-xl">
          <h2 className="text-2xl font-semibold mb-4 text-blue-400">Start Exploration</h2>
          <UrlInput onSubmit={handleSubmit} />
        </div>

        {/* Render CrawlStatusMonitor and pass the currentJobId */}
        <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 border border-gray-700 shadow-xl">
           <h2 className="text-2xl font-semibold mb-4 text-green-400">Discovered Pages</h2>
           {/* Log jobStatus before passing to monitor */}
           {(() => {
             if (jobStatus) {
               console.log("page.tsx: Passing jobStatus to CrawlStatusMonitor:", JSON.stringify(jobStatus));
             }
             return null; // Return null to render nothing
           })()}
           <CrawlStatusMonitor
             jobId={currentJobId}
             status={jobStatus}
             error={jobError}
             isLoading={isPollingLoading}
             selectedUrls={selectedUrls}
             isCrawlingSelected={isCrawlingSelected}
             onSelectionChange={handleSelectionChange}
             onCrawlSelected={handleCrawlSelectedClick}
           />
        </div>

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
        
        {/* Config and Settings popup with MCP Server and Discovered Pages */}
        <ConfigSettings />
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
