export interface InternalLink {
  href: string
  text: string
}

export interface DiscoveredPage {
  url: string
  title?: string
  status: 'pending' | 'crawled' | 'error'
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