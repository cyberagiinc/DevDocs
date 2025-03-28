'use client'

import { useState, useEffect, useRef } from 'react'
import UrlInput from '@/components/UrlInput'
import ProcessingBlock from '@/components/ProcessingBlock'
import SubdomainList from '@/components/SubdomainList'
import MarkdownOutput from '@/components/MarkdownOutput'
import StoredFiles from '@/components/StoredFiles'
import ConfigSettings from '@/components/ConfigSettings'
import { discoverSubdomains, crawlPages, validateUrl, formatBytes } from '@/lib/crawl-service'
import { saveMarkdown, loadMarkdown } from '@/lib/storage'
import { useToast } from "@/components/ui/use-toast"
import { DiscoveredPage } from '@/lib/types'
import { Button } from '@/components/ui/button'
export default function Home() {
  const [url, setUrl] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [discoveredPages, setDiscoveredPages] = useState<DiscoveredPage[]>([])
  const [isCrawling, setIsCrawling] = useState(false)
  const [markdown, setMarkdown] = useState('')
  const [stats, setStats] = useState({
    subdomainsParsed: 0,
    pagesCrawled: 0,
    dataExtracted: '0 KB',
    errorsEncountered: 0
  })
  // Define the ProgressInfo type to match the one in ProcessingBlock
  type ProgressStatus = 'idle' | 'discovering' | 'retrying' | 'processing' | 'completed' | 'error';
  
  interface ProgressInfo {
    status: ProgressStatus;
    message: string;
    percent: number;
    elapsedTime: number;
    estimatedTimeRemaining: number;
  }
  
  // Add state for progress tracking and cancellation
  const [progress, setProgress] = useState<ProgressInfo>({
    status: 'idle',
    message: '',
    percent: 0,
    elapsedTime: 0,
    estimatedTimeRemaining: 0
  })
  const [isCancellable, setIsCancellable] = useState(false)
  const abortControllerRef = useRef<AbortController | null>(null)
  const progressTimerRef = useRef<NodeJS.Timeout | null>(null)
  const startTimeRef = useRef<number>(0)
  
  // Cleanup function for timers and controllers
  useEffect(() => {
    return () => {
      if (progressTimerRef.current) {
        clearInterval(progressTimerRef.current);
      }
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);
  
  // Function to handle cancellation
  const handleCancel = () => {
    if (abortControllerRef.current) {
      console.log('Cancelling request...');
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
      
      // Clean up timer
      if (progressTimerRef.current) {
        clearInterval(progressTimerRef.current);
        progressTimerRef.current = null;
      }
      
      setIsProcessing(false);
      setIsCancellable(false);
      setProgress({
        status: 'idle',
        message: '',
        percent: 0,
        elapsedTime: 0,
        estimatedTimeRemaining: 0
      });
      
      toast({
        title: "Request Cancelled",
        description: "The discovery process was cancelled",
        variant: "default"
      });
    }
  };
  
  // Function to update progress timer
  const startProgressTimer = () => {
    startTimeRef.current = Date.now();
    
    // Clear any existing timer
    if (progressTimerRef.current) {
      clearInterval(progressTimerRef.current);
    }
    
    // Start a new timer that updates every second
    progressTimerRef.current = setInterval(() => {
      const elapsedSeconds = Math.floor((Date.now() - startTimeRef.current) / 1000);
      
      // For long-running requests, provide an estimate
      // Assuming discovery takes about 5-7 minutes on average
      const averageTimeSeconds = 6 * 60; // 6 minutes
      const estimatedProgress = Math.min(95, (elapsedSeconds / averageTimeSeconds) * 100);
      const estimatedTimeRemaining = Math.max(0, averageTimeSeconds - elapsedSeconds);
      
      setProgress(prev => ({
        ...prev,
        percent: estimatedProgress,
        elapsedTime: elapsedSeconds,
        estimatedTimeRemaining: estimatedTimeRemaining
      }));
      
      // Update message based on elapsed time
      if (elapsedSeconds > 300) { // 5 minutes
        setProgress(prev => ({
          ...prev,
          message: "This is taking longer than usual. Complex websites may require more time to process."
        }));
      } else if (elapsedSeconds > 120) { // 2 minutes
        setProgress(prev => ({
          ...prev,
          message: "Processing a large website. This may take a few more minutes."
        }));
      }
    }, 1000);
  };
  const { toast } = useToast()

  const handleSubmit = async (submittedUrl: string, depth: number) => {
    if (!validateUrl(submittedUrl)) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid URL including the protocol (http:// or https://)",
        variant: "destructive"
      })
      return
    }

    // Reset state
    setUrl(submittedUrl)
    setIsProcessing(true)
    setMarkdown('')
    setDiscoveredPages([])
    setIsCancellable(true)
    
    // Initialize progress tracking
    setProgress({
      status: 'discovering' as ProgressStatus,
      message: 'Starting discovery process...',
      percent: 0,
      elapsedTime: 0,
      estimatedTimeRemaining: 0
    })
    
    // Start progress timer
    startProgressTimer()
    
    // Create a new AbortController for this request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }
    abortControllerRef.current = new AbortController()
    
    try {
      console.log('Discovering pages for:', submittedUrl, 'with depth:', depth)
      
      // Make a direct request to the Next.js API route instead of the backend directly
      // This provides better error handling and logging
      console.log('Making request to Next.js API route: /api/discover')
      setProgress(prev => ({
        ...prev,
        status: 'discovering' as ProgressStatus,
        message: 'Sending request to discover pages...'
      }))
      
      const response = await fetch(`/api/discover`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: submittedUrl, depth }),
        signal: abortControllerRef.current.signal
      })
      
      console.log('Response status:', response.status)
      
      // Update progress
      setProgress(prev => ({
        ...prev,
        status: 'processing' as ProgressStatus,
        message: 'Processing response from server...'
      }))
      
      // Get the response data
      const data = await response.json()
      console.log('Response data:', data)
      
      if (!response.ok) {
        // Extract detailed error information if available
        const errorMessage = data.error || 'Failed to discover pages'
        const errorDetails = data.details || ''
        const errorType = data.errorType || 'Unknown'
        
        console.error('Error response:', {
          message: errorMessage,
          details: errorDetails,
          type: errorType
        })
        
        // Update progress to show error
        setProgress(prev => ({
          ...prev,
          status: 'error' as ProgressStatus,
          message: `Error: ${errorMessage}`
        }))
        
        // Show a more detailed error toast
        toast({
          title: `Error: ${errorType}`,
          description: errorMessage,
          variant: "destructive"
        })
        
        throw new Error(errorMessage)
      }
      
      const pages = data.pages || []
      console.log('Discovered pages count:', pages.length)
      
      // Update progress based on discovery results
      if (pages.length > 0) {
        console.log('First discovered page:', pages[0])
        
        // Update progress to show success
        setProgress(prev => ({
          ...prev,
          status: 'completed' as ProgressStatus,
          percent: 100,
          message: `Successfully discovered ${pages.length} pages`
        }))
        
        // Check if any pages have error status
        const errorPages = pages.filter((page: DiscoveredPage) => page.status === 'error')
        if (errorPages.length > 0) {
          console.warn(`${errorPages.length} pages have error status`)
          
          // Update progress to show partial success
          setProgress(prev => ({
            ...prev,
            message: `Discovered ${pages.length} pages (${errorPages.length} with errors)`
          }))
          
          // Show a warning toast if some pages have errors
          toast({
            title: "Warning",
            description: `${errorPages.length} pages encountered errors during discovery`,
            variant: "default"
          })
        }
      } else {
        console.warn('No pages were discovered')
        
        // Update progress to show no results
        setProgress(prev => ({
          ...prev,
          status: 'completed' as ProgressStatus,
          percent: 100,
          message: 'No pages were discovered'
        }))
        
        // Show a warning toast if no pages were discovered
        toast({
          title: "No Pages Found",
          description: "The crawler couldn't find any pages to process. This might be due to access restrictions or an invalid URL structure.",
          variant: "default"
        })
      }
      
      setDiscoveredPages(pages)
      setStats(prev => ({
        ...prev,
        subdomainsParsed: pages.length,
        errorsEncountered: pages.filter((page: DiscoveredPage) => page.status === 'error').length
      }))
      
      // Only show success toast if pages were actually discovered
      if (pages.length > 0) {
        toast({
          title: "Pages Discovered",
          description: `Found ${pages.length} related pages at depth ${depth}`
        })
      }
    } catch (error: unknown) {
      console.error('Error discovering pages:', error)
      
      // If we haven't already shown an error toast from the response data
      if (error instanceof Error && !error.message.includes('Failed to discover pages')) {
        toast({
          title: "Error",
          description: error.message || "Failed to discover pages. Check the console for more details.",
          variant: "destructive"
        })
      } else {
        // Fallback for non-Error objects
        toast({
          title: "Error",
          description: "Failed to discover pages. Check the console for more details.",
          variant: "destructive"
        })
      }
    } finally {
      // Clean up timer
      if (progressTimerRef.current) {
        clearInterval(progressTimerRef.current);
        progressTimerRef.current = null;
      }
      
      // Reset state
      setIsProcessing(false);
      setIsCancellable(false);
      
      // Keep the progress state for display purposes
      // but mark it as no longer active
      setProgress(prev => ({
        ...prev,
        status: prev.status === 'error' ? 'error' : 'completed'
      }));
    }
  }

  const handleCrawlSelected = async (selectedUrls: string[]) => {
    setIsCrawling(true)
    try {
      const selectedPages = discoveredPages.filter(page => selectedUrls.includes(page.url))
      console.log('Starting crawl for selected pages:', selectedPages)
      
      // Update status to pending for selected pages
      setDiscoveredPages(pages =>
        pages.map(page => ({
          ...page,
          status: selectedUrls.includes(page.url) ? 'pending' as const : page.status,
          internalLinks: page.internalLinks?.map(link => ({
            ...link,
            status: selectedUrls.includes(link.href) ? 'pending' as const : link.status || 'pending'
          }))
        }))
      )
      
      // Make a direct request to the backend API instead of using the crawlPages function
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || process.env.BACKEND_URL || 'http://localhost:24125'
      console.log('Making direct request to backend:', `${backendUrl}/api/crawl`)
      
      const response = await fetch(`${backendUrl}/api/crawl`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ pages: selectedPages }),
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to crawl pages')
      }
      
      const data = await response.json()
      console.log('Crawl response data:', data)
      
      const result = {
        markdown: data.markdown || '',
        links: data.links || { internal: [], external: [] },
        error: data.error
      }
      console.log('Crawl result:', result)
      
      if (result.error) {
        throw new Error(result.error)
      }
      
      try {
        await saveMarkdown(url, result.markdown)
        console.log('Saved content for:', url)
        
        setMarkdown(result.markdown)
        setStats(prev => ({
          ...prev,
          pagesCrawled: selectedPages.length,
          dataExtracted: formatBytes(result.markdown.length)
        }))

        // Update status to crawled for successfully crawled pages
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

        toast({
          title: "Content Saved",
          description: `Crawled content has been saved and can be loaded again later`
        })
      } catch (error) {
        console.error('Error saving content:', error)
        toast({
          title: "Error",
          description: "Failed to save content for later use",
          variant: "destructive"
        })
      }
      
      toast({
        title: "Crawling Complete",
        description: "All pages have been crawled and processed"
      })
    } catch (error) {
      console.error('Error crawling pages:', error)
      setStats(prev => ({
        ...prev,
        errorsEncountered: prev.errorsEncountered + 1
      }))
      // Update status to error for failed pages
      setDiscoveredPages(pages =>
        pages.map(page => ({
          ...page,
          status: selectedUrls.includes(page.url) ? 'error' as const : page.status,
          internalLinks: page.internalLinks?.map(link => ({
            ...link,
            status: selectedUrls.includes(link.href) ? 'error' as const : link.status || 'pending'
          }))
        }))
      )
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to crawl pages",
        variant: "destructive"
      })
    } finally {
      setIsCrawling(false)
    }
  }

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
          <h2 className="text-2xl font-semibold mb-4 text-purple-400">Processing Status</h2>
          <div className="flex gap-4">
            <ProcessingBlock
              isProcessing={isProcessing || isCrawling}
              stats={stats}
              progress={progress}
              isCancellable={isCancellable}
              onCancel={handleCancel}
            />
          </div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 border border-gray-700 shadow-xl">
          <h2 className="text-2xl font-semibold mb-4 text-blue-400">Start Exploration</h2>
          <UrlInput onSubmit={handleSubmit} />
        </div>

        <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 border border-gray-700 shadow-xl">
          <SubdomainList
            subdomains={discoveredPages}
            onCrawlSelected={handleCrawlSelected}
            isProcessing={isCrawling}
          />
        </div>

        <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 border border-gray-700 shadow-xl">
          <h2 className="text-2xl font-semibold mb-4 text-yellow-400">Extracted Content</h2>
          <MarkdownOutput
            markdown={markdown}
            isVisible={markdown !== ''}
          />
        </div>

        <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 border border-gray-700 shadow-xl">
          <h2 className="text-2xl font-semibold mb-4 text-blue-400">Consolidated Files</h2>
          <StoredFiles />
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
