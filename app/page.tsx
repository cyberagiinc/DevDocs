'use client'

import { useState, useEffect } from 'react'
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

    setUrl(submittedUrl)
    setIsProcessing(true)
    setMarkdown('')
    setDiscoveredPages([])
    
    try {
      console.log('Discovering pages for:', submittedUrl, 'with depth:', depth)
      
      // Make a direct request to the Next.js API route instead of the backend directly
      // This provides better error handling and logging
      console.log('Making request to Next.js API route: /api/discover')
      
      const response = await fetch(`/api/discover`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: submittedUrl, depth }),
      })
      
      console.log('Response status:', response.status)
      
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
      
      if (pages.length > 0) {
        console.log('First discovered page:', pages[0])
        
        // Check if any pages have error status
        const errorPages = pages.filter((page: DiscoveredPage) => page.status === 'error')
        if (errorPages.length > 0) {
          console.warn(`${errorPages.length} pages have error status`)
          
          // Show a warning toast if some pages have errors
          toast({
            title: "Warning",
            description: `${errorPages.length} pages encountered errors during discovery`,
            variant: "default"
          })
        }
      } else {
        console.warn('No pages were discovered')
        
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
      setIsProcessing(false)
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
