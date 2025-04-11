import { DiscoveredPage, CrawlResult, DiscoverOptions, DiscoverResponse, CrawlRequest, CrawlResponse } from './types' // Added new types


export async function discoverSubdomains({ url, depth = 3 }: DiscoverOptions): Promise<DiscoverResponse> { // Updated return type
  try {
    console.log('Making request to Next.js API route: /api/discover')
    console.log('Request payload:', { url, depth })

    const response = await fetch(`/api/discover`, {
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
    // Note: DiscoverResponse uses jobId, but backend returns job_id. Adjusting here.
    return { jobId: data.job_id } // Return the job ID
  } catch (error) {
    console.error('Error discovering subdomains:', error)
    // Re-throw the error to be handled by the UI
    throw error
  }
}

// Corrected function signature and internal variable usage
export async function crawlPages({ pages, job_id }: CrawlRequest): Promise<CrawlResponse> { // Accept job_id
  try {
    console.log('Making request to Next.js API route: /api/crawl');
    console.log('Request payload:', { pages, job_id: job_id }); // Use job_id

    const response = await fetch('/api/crawl', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ pages, job_id: job_id }), // Use job_id
    });

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
    // Return acknowledgment using jobId property name as defined in CrawlResponse
    return { success: data.success, jobId: data.job_id }

  } catch (error) {
    console.error('Error initiating crawl:', error)
    // Return a failure acknowledgment
    return {
        success: false,
        jobId: job_id, // Use job_id variable, return as jobId property
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