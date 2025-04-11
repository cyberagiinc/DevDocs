"use client";

import React, { useState, useCallback, ReactNode, useEffect } from 'react'; // Import useEffect
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription, // Optional: Add if needed for more context
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2, AlertCircle } from "lucide-react"; // Standard lucide import
import { useMCPInfo } from '@/hooks/useMCPInfo'; // Assuming path based on file structure
import type { MCPConfigResponse, MCPStatus } from '@/lib/types'; // Use the new MCPConfigResponse type

interface MCPConfigDialogProps {
  children: ReactNode; // Trigger element
}

export const MCPConfigDialog: React.FC<MCPConfigDialogProps> = ({ children }) => {
  const { configData, statusData, isLoading, error, fetchMCPInfo } = useMCPInfo();
  // console.log('[MCPConfigDialog] Hook State:', { configData, statusData, isLoading, error }); // Roo Debug Log Removed
  const [isOpen, setIsOpen] = useState(false); // Track dialog open state
  // const [hasFetched, setHasFetched] = useState(false); // No longer needed with fetch on open

  // DialogTrigger handles opening. Fetch logic is in the hook, triggered on mount or retry.
  // We might want to trigger fetch explicitly on Dialog open if the hook doesn't already.
  // For now, assume the hook handles initial fetch or we rely on retry.
  // const handleOpenChange = useCallback((open: boolean) => {
  //   if (open && !configData && !statusData && !isLoading && !error) { // Fetch if dialog opens and no data/error exists
  //     console.log("Dialog opened, fetching MCP info...");
  //     fetchMCPInfo();
  //   }
  // }, [fetchMCPInfo, isLoading, configData, statusData, error]);
  // Removed hasFetched state as it's less relevant for Dialogs compared to Popovers triggering on hover/focus

  // Explicit retry function separate from open handler
  const handleRetry = () => {
    console.log("Retrying MCP info fetch...");
    fetchMCPInfo();
  };

// Effect to fetch data ONLY when the dialog opens for the first time OR if data is missing
useEffect(() => {
  // Fetch if the dialog is open AND we don't have configData yet (or statusData, as a fallback check)
  // AND we are not currently in a loading state (to avoid redundant fetches)
  if (isOpen && !configData && !statusData && !isLoading) {
    console.log("[MCPConfigDialog] Dialog opened and data missing, fetching MCP info..."); // Added console log for clarity
    fetchMCPInfo();
  }
  // Dependencies: Only re-run if isOpen changes, or if data/loading state necessitates a fetch
  // fetchMCPInfo is stable due to useCallback([]) in the hook, so it doesn't cause re-runs.
}, [isOpen, configData, statusData, isLoading, fetchMCPInfo]);

return (
  <Dialog open={isOpen} onOpenChange={setIsOpen}> {/* Control open state and add handler */}
    {/* <Dialog> // Roo Fix: Removed extra nested Dialog tag */}
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]" aria-describedby="mcp-config-description">
        <DialogHeader>
          <DialogTitle>MCP Server Configuration & Status</DialogTitle>
          {/* Optional: Add a description if helpful */}
          {/* <DialogDescription id="mcp-config-description">
            Current status and connection details for the connected MCP servers.
          </DialogDescription> */}
        </DialogHeader>
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
                <h4 className="font-semibold">Failed to Load Configuration</h4>
              </div>
              <p className="text-sm text-destructive/80">{error.message || 'Could not retrieve MCP server status or configuration.'}</p>
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
                {configData ? ( // Roo Debug Log Wrapper Removed
                  <ScrollArea className="h-40 w-full rounded-md border p-3">
                    {/* Using bg-muted and text-muted-foreground for theme consistency */}
                    <pre className="text-xs bg-muted text-muted-foreground rounded p-2 overflow-x-auto"><code>{JSON.stringify(configData, null, 2)}</code></pre>
                  </ScrollArea>
                ) : (
                   <p className="text-sm text-muted-foreground">No configuration data available.</p>
                )}
              </div>
            </>
          )}
        </div>
      </DialogContent>
    {/* </Dialog> // Roo Fix: Removed extra nested Dialog tag */}
  </Dialog> // Roo Fix: Added closing tag for the main Dialog element from line 54
  );
};

// Optional: Add display name for better debugging
MCPConfigDialog.displayName = "MCPConfigDialog";