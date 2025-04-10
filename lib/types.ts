export interface InternalLink {
  href: string
  text: string
  status?: 'pending' | 'crawled' | 'error'
}

export interface DiscoveredPage {
  url: string
  title?: string
  status: 'pending' | 'crawled' | 'error' | 'pending_crawl' // Added pending_crawl
  internalLinks?: InternalLink[]  // Add internal links to each discovered page
}

export interface CrawlStats {
  subdomainsParsed: number
  pagesCrawled: number
  dataExtracted: string
  errorsEncountered: number
}

export interface CrawlResult {
  markdown: string
  links: {
    internal: Array<{
      href: string
      text: string
    }>
    external: Array<{
      href: string
      text: string
    }>
  }
  error?: string
}

export interface DiscoverOptions {
  url: string
  depth?: number
}

// --- Types for Crawl Status Monitoring ---

// Literal types for possible statuses based on the plan
export type OverallStatus =
  | 'initializing'
  | 'discovering'
  | 'discovery_complete'
  | 'crawling'
  | 'completed'
  | 'completed_with_errors' // Added based on crawler.py logic
  | 'error';

export type UrlStatus =
  | 'pending_discovery'
  | 'discovering'
  | 'discovery_error'
  | 'pending_crawl'
  | 'crawling'
  | 'crawl_error'
  | 'completed';

// Interface for the job status object returned by /api/crawl-status/{job_id}
export interface CrawlJobStatus {
  job_id: string;
  root_url: string; // Added based on backend implementation
  overall_status: OverallStatus;
  urls: Record<string, UrlStatus>; // Dictionary mapping URL string to its status
  start_time?: string; // ISO 8601 datetime string
  end_time?: string; // ISO 8601 datetime string
  error?: string | null;
  data_extracted?: string | null; // Added field for extracted data size
}

// Response type for the updated discoverSubdomains service function
export interface DiscoverResponse {
  jobId: string;
  // success?: boolean; // Backend currently returns success, might be useful
  // message?: string; // Backend currently returns message
}

// Request type for the updated crawlPages service function
export interface CrawlRequest {
  pages: DiscoveredPage[];
  jobId: string;
}

// Response type for the updated crawlPages service function
export interface CrawlResponse {
  success: boolean;
  jobId: string;
  error?: string; // Include optional error message
  // message?: string; // Backend currently returns message
}

// --- Props for CrawlUrls Component ---
export interface CrawlUrlsProps {
  urls: Record<string, UrlStatus>; // Use existing UrlStatus type
  selectedUrls: Set<string>;
  onSelectionChange: (newSelectedUrls: Set<string>) => void;
  onCrawlSelected: () => void;
  isCrawlingSelected: boolean;
  jobId: string | null;
}