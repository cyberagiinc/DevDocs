"use client";

import React, { useState, useCallback, ReactNode } from 'react';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2, AlertCircle } from "lucide-react"; // Standard lucide import
import { useMCPInfo } from '@/hooks/useMCPInfo'; // Assuming path based on file structure
import type { MCPConfig, MCPStatus } from '@/lib/types'; // Assuming path based on file structure

interface MCPSettingsPopoverProps {
  children: ReactNode; // Trigger element
}

export const MCPSettingsPopover: React.FC<MCPSettingsPopoverProps> = ({ children }) => {
  const { configData, statusData, isLoading, error, fetchMCPInfo } = useMCPInfo();
  const [hasFetched, setHasFetched] = useState(false); // Track if initial fetch occurred

  const handleOpenChange = useCallback((open: boolean) => {
    // Fetch data only when opening the popover for the first time
    // or if explicitly triggered by retry
    if (open && !hasFetched && !isLoading) {
      console.log("Popover opened, fetching MCP info...");
      fetchMCPInfo();
      setHasFetched(true); // Mark as fetched after initiating
    }
  }, [fetchMCPInfo, hasFetched, isLoading]);

  // Explicit retry function separate from open handler
  const handleRetry = () => {
    console.log("Retrying MCP info fetch...");
    fetchMCPInfo();
  };


  return (
    <Popover onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        {children}
      </PopoverTrigger>
      <PopoverContent className="w-80" aria-label="MCP Settings">
        <div className="space-y-4">
          {isLoading && (
            <div className="flex items-center justify-center p-4">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
              <span className="ml-2">Loading MCP Info...</span>
            </div>
          )}

          {error && !isLoading && (
            <div className="space-y-2 rounded-md border border-destructive bg-destructive/10 p-4">
              <div className="flex items-center text-destructive">
                <AlertCircle className="h-5 w-5 mr-2" />
                <h4 className="font-semibold">Error Fetching MCP Info</h4>
              </div>
              <p className="text-sm text-destructive/80">{error.message || 'An unknown error occurred.'}</p>
              <Button variant="destructive" size="sm" onClick={handleRetry}>
                Retry
              </Button>
            </div>
          )}

          {!isLoading && !error && (
            <>
              <div>
                <h4 className="font-medium leading-none mb-2">MCP Status</h4>
                {statusData ? (
                   <div className="text-sm text-muted-foreground space-y-1">
                     <p><span className="font-semibold">Status:</span> {statusData.status}</p>
                     <p><span className="font-semibold">Details:</span> {statusData.details || 'N/A'}</p>
                   </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No status data available.</p>
                )}
              </div>

              <div>
                <h4 className="font-medium leading-none mb-2">MCP Configuration</h4>
                {configData ? (
                  <ScrollArea className="h-40 w-full rounded-md border p-3">
                    <pre className="text-xs bg-gray-800 text-gray-300 rounded p-2"><code>{JSON.stringify(configData, null, 2)}</code></pre>
                  </ScrollArea>
                ) : (
                   <p className="text-sm text-muted-foreground">No configuration data available.</p>
                )}
              </div>
            </>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};

// Optional: Add display name for better debugging
MCPSettingsPopover.displayName = "MCPSettingsPopover";