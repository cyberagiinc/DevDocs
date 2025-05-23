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
  | 'cancelling' // Added for kill switch
  | 'cancelled' // Added for kill switch
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
// Interface for detailed URL status including HTTP status code
export interface UrlDetails {
  status: UrlStatus;
  statusCode: number | null; // HTTP status code, null if not applicable/available
  errorMessage?: string | null; // Specific error message for this URL, if any
}

// Interface for the job status object returned by /api/crawl-status/{job_id}
export interface CrawlJobStatus {
  job_id: string;
  root_url: string; // Added based on backend implementation
  overall_status: OverallStatus;
  urls: Record<string, UrlDetails>; // Dictionary mapping URL string to its detailed status
  start_time?: string; // ISO 8601 datetime string
  end_time?: string; // ISO 8601 datetime string
  error?: string | null;
  data_extracted?: string | null; // Added field for extracted data size
}

// Response type for the updated discoverSubdomains service function
export interface DiscoverResponse {
  jobId: string; // Note: This might need changing to job_id if backend expects snake_case here too
  // success?: boolean; // Backend currently returns success, might be useful
  // message?: string; // Backend currently returns message
}

// Request type for the updated crawlPages service function
export interface CrawlRequest {
  pages: DiscoveredPage[];
  job_id: string; // Corrected from jobId to job_id
}

// Response type for the updated crawlPages service function
export interface CrawlResponse {
  success: boolean;
  jobId: string; // Note: This might need changing to job_id if backend expects snake_case here too
  error?: string; // Include optional error message
  // message?: string; // Backend currently returns message
}

// --- Props for CrawlUrls Component ---
export interface CrawlUrlsProps {
  urls: Record<string, UrlDetails>; // Use new UrlDetails type
  selectedUrls: Set<string>;
  onSelectionChange: (newSelectedUrls: Set<string>) => void;
  onCrawlSelected: () => void;
  isCrawlingSelected: boolean;
  jobId: string | null;
  // Added for Cancel Button
  onCancelCrawl: () => void;
  overallStatus: OverallStatus | null; // Needed to determine if cancellation is possible
  isCancelling: boolean; // To disable button during cancellation request
}

// --- Types for MCP Settings ---

// Old config structure (host/port based) - Commented out as it's replaced by MCPServerConfig
// export interface MCPServerInfo {
//   host: string;
//   port: number;
//   disabled: boolean;
//   containerized: boolean;
//   // Add other potential fields if needed in the future
// }
//
// export interface MCPConfig {
//   mcpServers: {
//     [serverName: string]: MCPServerInfo;
//   };
// }

// New config structure (command/args based for stdio/docker exec)
export interface MCPServerConfig {
  command: string;
  args: string[];
  env: Record<string, string>; // Environment variables
  disabled: boolean;
  alwaysAllow?: string[]; // Optional list of always allowed tools
}

export interface MCPConfigResponse {
  mcpServers: {
    [serverName: string]: MCPServerConfig;
  };
}

export type MCPStatusCode = 'running' | 'stopped' | 'error' | 'unknown'; // Added 'unknown' for initial/default state

export interface MCPStatus {
  status: MCPStatusCode;
  details?: string | null;
}