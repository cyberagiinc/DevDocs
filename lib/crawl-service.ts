import { DiscoveredPage, CrawlResult, DiscoverOptions, DiscoverResponse, CrawlRequest, CrawlResponse } from './types' // Added new types

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:24125'; // Use env variable
console.log(`Using backend URL: ${BACKEND_URL}`);

export async function discoverSubdomains({ url, depth = 3 }: DiscoverOptions): Promise<DiscoverResponse> { // Updated return type
  try {
    console.log('Making request to backend:', `${BACKEND_URL}/api/discover`)
    console.log('Request payload:', { url, depth })

    const response = await fetch(`${BACKEND_URL}/api/discover`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url, depth }),
    })

    console.log('Response status:', response.status)
    const data = await response.json()
    console.log('Response data:', data)

    if (!response.ok) {
      console.error('Error response:', data)
      throw new Error(data.detail || 'Failed to discover subdomains')
    }

    // Backend now returns a job ID immediately
    if (!data.job_id) {
      console.error('No job_id in response:', data)
      throw new Error('Backend did not return a job ID for discovery.')
    }

    console.log('Discovery initiated with job ID:', data.job_id)
    return { jobId: data.job_id } // Return the job ID
  } catch (error) {
    console.error('Error discovering subdomains:', error)
    // Re-throw the error to be handled by the UI
    throw error
  }
}

export async function crawlPages({ pages, jobId }: CrawlRequest): Promise<CrawlResponse> { // Accept jobId, updated return type
  try {
    console.log('Making request to backend for crawling:', pages.length, 'pages')
    console.log('Request payload:', { pages, job_id: jobId }) // Include job_id

    const response = await fetch(`${BACKEND_URL}/api/crawl`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ pages, job_id: jobId }), // Send job_id
    })

    console.log('Crawl response status:', response.status)
    const data = await response.json()
    console.log('Crawl response data:', data)

    if (!response.ok) {
      console.error('Error response:', data)
      throw new Error(data.detail || 'Failed to crawl pages')
    }

    // Backend now returns an acknowledgment
    if (!data.job_id || typeof data.success !== 'boolean') {
       console.error('Invalid crawl initiation response:', data)
       throw new Error('Backend did not return a valid acknowledgment for crawl initiation.')
    }

    console.log(`Crawl initiated acknowledgment for job ${data.job_id}:`, data.success)
    return { success: data.success, jobId: data.job_id } // Return acknowledgment

  } catch (error) {
    console.error('Error initiating crawl:', error)
    // Return a failure acknowledgment
    return {
        success: false,
        jobId: jobId, // Return the original job ID if available
        error: error instanceof Error ? error.message : 'Unknown error occurred while initiating crawl'
    }
  }
}

export function validateUrl(url: string): boolean {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

export function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 KB'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`
}