'use client'

import React, { useState, useMemo, useCallback, useEffect } from 'react';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table"; // Assuming table components are here
import { Checkbox } from "@/components/ui/checkbox"; // Assuming checkbox is here
import { Badge } from "@/components/ui/badge"; // Assuming badge is here
import { Button } from "@/components/ui/button"; // Assuming button is here
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"; // Assuming tooltip is here
import { CrawlUrlsProps, UrlStatus } from '@/lib/types'; // Import props and status type

// Helper function to map status to badge variant AND apply custom styles
// Returns an object { variant, className }
const getStatusBadgeStyle = (status: UrlStatus): { variant: 'default' | 'secondary' | 'destructive' | 'outline', className: string } => {
  switch (status) {
    case 'pending_crawl':
      // Yellow background, black text
      return { variant: 'default', className: 'bg-yellow-400 text-black hover:bg-yellow-500' };
    case 'crawling':
       // Blue background, white text (default variant might be blue)
      return { variant: 'default', className: 'bg-blue-600 text-white' };
    case 'completed':
       // Green background, white text
      return { variant: 'default', className: 'bg-green-600 text-white hover:bg-green-700' };
    case 'crawl_error':
    case 'discovery_error':
       // Red background, white text (destructive variant might be red)
      return { variant: 'destructive', className: 'bg-red-600 text-white' };
    case 'discovering':
    case 'pending_discovery':
    default:
       // Grey background, lighter text
      return { variant: 'secondary', className: 'bg-gray-600 text-gray-100' };
  }
};

// Helper function for status tooltips (can be moved to utils)
const getStatusTooltip = (status: UrlStatus): string => {
  switch (status) {
    case 'pending_crawl':
      return 'Ready to be crawled.';
    case 'crawling':
      return 'Currently being crawled.';
    case 'completed':
      return 'Crawling completed successfully.';
    case 'crawl_error':
      return 'An error occurred during crawling.';
    case 'discovery_error':
      return 'An error occurred during discovery.';
    case 'discovering':
      return 'Currently discovering links on this page.';
    case 'pending_discovery':
      return 'Waiting for discovery process.';
    default:
      return 'Unknown status.';
  }
};


const CrawlUrls: React.FC<CrawlUrlsProps> = ({
  urls,
  selectedUrls,
  onSelectionChange,
  onCrawlSelected,
  isCrawlingSelected,
  jobId // Keep jobId for context if needed later
}) => {

  // Log prop changes for debugging
  useEffect(() => {
    console.log('[CrawlUrls] Props updated:', { jobId, urlsCount: Object.keys(urls).length, selectedCount: selectedUrls.size, isCrawlingSelected });
  }, [urls, selectedUrls, isCrawlingSelected, jobId]);

  // Memoize the list of URLs to render and filter pending ones
  const urlEntries = useMemo(() => {
    console.log('[CrawlUrls] Memoizing urlEntries...');
    return Object.entries(urls)
           // Optional: Add sorting logic here if needed
           // .sort(([urlA], [urlB]) => urlA.localeCompare(urlB));
  }, [urls]);

  const pendingUrls = useMemo(() => {
    return urlEntries.filter(([_, status]) => status === 'pending_crawl').map(([url]) => url);
  }, [urlEntries]);

  const selectedPendingCount = useMemo(() => {
    let count = 0;
    selectedUrls.forEach(url => {
      if (urls[url] === 'pending_crawl') {
        count++;
      }
    });
    return count;
  }, [selectedUrls, urls]);

  // --- Handlers ---
  const handleUrlSelectionChange = useCallback((url: string, checked: boolean | 'indeterminate') => {
    console.log(`[CrawlUrls] Checkbox change for ${url}: ${checked}`);
    const newSelectedUrls = new Set(selectedUrls);
    if (checked === true) {
      newSelectedUrls.add(url);
    } else {
      newSelectedUrls.delete(url);
    }
    onSelectionChange(newSelectedUrls);
    console.log(`[CrawlUrls] Called onSelectionChange with ${newSelectedUrls.size} URLs.`);
  }, [selectedUrls, onSelectionChange]);

  const handleSelectAllChange = useCallback((checked: boolean | 'indeterminate') => {
    console.log(`[CrawlUrls] Select All change: ${checked}`);
    let newSelectedUrls: Set<string>;
    if (checked === true) {
      // Select all *currently pending* URLs
      newSelectedUrls = new Set([...selectedUrls, ...pendingUrls]);
    } else {
      // Deselect all *currently pending* URLs, keep others selected
      newSelectedUrls = new Set(selectedUrls);
      pendingUrls.forEach(url => newSelectedUrls.delete(url));
    }
    onSelectionChange(newSelectedUrls);
    console.log(`[CrawlUrls] Called onSelectionChange (Select All) with ${newSelectedUrls.size} URLs.`);
  }, [selectedUrls, onSelectionChange, pendingUrls]);

  const handleCrawlClick = useCallback(() => {
    console.log(`[CrawlUrls] Crawl Selected button clicked.`);
    onCrawlSelected();
  }, [onCrawlSelected]);

  // --- Select All Checkbox State ---
  const isAllPendingSelected = pendingUrls.length > 0 && pendingUrls.every(url => selectedUrls.has(url));
  const isSomePendingSelected = pendingUrls.some(url => selectedUrls.has(url));
  const selectAllState = isAllPendingSelected ? true : (isSomePendingSelected ? 'indeterminate' : false);

  // --- Render ---
  if (urlEntries.length === 0) {
    return <p className="text-gray-500 italic text-center py-4">No URLs discovered yet for this job.</p>;
  }

  return (
    <div className="space-y-4">
       {/* Optional: Add a clear heading */}
       {/* <h3 className="text-lg font-semibold text-cyan-400">Crawl Queue</h3> */}

      <div className="flex items-center justify-between mb-2">
        {/* Select All Checkbox */}
        {pendingUrls.length > 0 && (
           <div className="flex items-center space-x-2">
             <Checkbox
               id="select-all-crawl"
               checked={selectAllState}
               onCheckedChange={handleSelectAllChange}
               disabled={isCrawlingSelected || pendingUrls.length === 0}
               aria-label="Select all pending URLs"
               className="border-white" // Added white border
             />
             <label htmlFor="select-all-crawl" className="text-sm text-gray-400">
               Select All Pending ({pendingUrls.length})
             </label>
           </div>
        )}
        {/* Crawl Selected Button */}
        <Button
          onClick={handleCrawlClick}
          disabled={isCrawlingSelected || selectedPendingCount === 0}
          size="sm"
        >
          {isCrawlingSelected ? 'Initiating...' : `Crawl Selected (${selectedPendingCount})`}
        </Button>
      </div>

      <div className="rounded-md border border-gray-700 max-h-96 overflow-y-auto">
        <Table>
          <TableHeader className="sticky top-0 bg-gray-800/80 backdrop-blur-sm">
            <TableRow>
              <TableHead className="w-[50px] text-white">Select</TableHead>
              <TableHead className="text-white">URL</TableHead>
              <TableHead className="w-[150px] text-center text-white">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {urlEntries.map(([url, status]) => {
              const isPending = status === 'pending_crawl';
              return (
                <TableRow key={url}>
                  <TableCell className="text-center">
                    {isPending ? (
                      <Checkbox
                        id={`select-${url}`}
                        checked={selectedUrls.has(url)}
                        onCheckedChange={(checked) => handleUrlSelectionChange(url, checked)}
                        disabled={isCrawlingSelected}
                        aria-label={`Select URL ${url}`}
                        className="border-white" // Added white border for visibility
                      />
                    ) : (
                      // Render placeholder or nothing if not pending
                      <div className="h-4 w-4"></div> // Placeholder to maintain alignment
                    )}
                  </TableCell>
                  <TableCell className="font-medium text-white"> {/* Added text-white */}
                     <TooltipProvider>
                       <Tooltip>
                         <TooltipTrigger asChild>
                           <span className="block truncate max-w-md xl:max-w-xl"> {/* Adjust max-w as needed */}
                             {url}
                           </span>
                         </TooltipTrigger>
                         <TooltipContent className="bg-black text-white"> {/* Black bg, white text */}
                           <p>{url}</p>
                         </TooltipContent>
                       </Tooltip>
                     </TooltipProvider>
                  </TableCell>
                  <TableCell className="text-center">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          {(() => { // Immediately invoked function to get style object
                            const { variant, className } = getStatusBadgeStyle(status as UrlStatus);
                            return (
                              <Badge variant={variant} className={className}>
                                {status.replace(/_/g, ' ')} {/* Basic formatting */}
                              </Badge>
                            );
                          })()}
                        </TooltipTrigger>
                        <TooltipContent className="bg-black text-white"> {/* Black bg, white text */}
                          <p>{getStatusTooltip(status as UrlStatus)}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default CrawlUrls;