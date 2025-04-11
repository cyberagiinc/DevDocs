"use client"; // Hooks are client-side

import { useState, useCallback } from 'react';
import { MCPConfigResponse, MCPStatus } from '@/lib/types'; // Use the new MCPConfigResponse type

// Define the state structure for the hook
interface MCPInfoState {
  configData: MCPConfigResponse | null; // Use the new MCPConfigResponse type
  statusData: MCPStatus | null;
  isLoading: boolean;
  error: Error | null;
}

// Define the return type of the hook
interface UseMCPInfoReturn extends MCPInfoState {
  fetchMCPInfo: () => Promise<void>;
}

// Removed API_BASE_URL definition, using relative paths for fetch
export function useMCPInfo(): UseMCPInfoReturn {
  const [state, setState] = useState<MCPInfoState>({
    configData: null,
    statusData: null,
    isLoading: false,
    error: null,
  });

  const fetchMCPInfo = useCallback(async () => {
    console.log("useMCPInfo: Fetching MCP config and status..."); // Add console log
    setState(prevState => ({ ...prevState, isLoading: true, error: null }));

    try {
      console.log(`useMCPInfo: Fetching from /api/mcp/config and /api/mcp/status`); // Updated console log

      const [configResponse, statusResponse] = await Promise.all([
        fetch('/api/mcp/config'), // Use relative path
        fetch('/api/mcp/status'), // Use relative path
      ]);

      // Check for network errors first
      if (!configResponse.ok) {
        // Try to get error details from response body if possible
        let errorDetails = `Status: ${configResponse.status} ${configResponse.statusText}`;
        try {
            const errorJson = await configResponse.json();
            if (errorJson.detail) {
                errorDetails += ` - ${errorJson.detail}`;
            }
        } catch (e) { /* Ignore if response body is not JSON */ }
        throw new Error(`Failed to fetch MCP config: ${errorDetails}`);
      }
      if (!statusResponse.ok) {
        let errorDetails = `Status: ${statusResponse.status} ${statusResponse.statusText}`;
         try {
            const errorJson = await statusResponse.json();
            if (errorJson.detail) {
                errorDetails += ` - ${errorJson.detail}`;
            }
        } catch (e) { /* Ignore if response body is not JSON */ }
        throw new Error(`Failed to fetch MCP status: ${errorDetails}`);
      }

      // Parse JSON data
      const configData: MCPConfigResponse = await configResponse.json(); // Use the new MCPConfigResponse type
      const statusData: MCPStatus = await statusResponse.json();

      console.log("useMCPInfo: Fetch successful. Preparing to set state:", { configData, statusData, isLoading: false }); // Roo Debug Log: Before success setState

      setState({
        configData,
        statusData,
        isLoading: false, // Explicitly setting isLoading to false
        error: null,
      });
      console.log("useMCPInfo: State update called for success."); // Roo Debug Log: After success setState call

    } catch (err) {
      console.error("useMCPInfo: Error fetching MCP info:", err); // Add console log for error
      const error = err instanceof Error ? err : new Error('An unknown error occurred during fetch');
      console.log("useMCPInfo: Error caught. Preparing to set error state:", { error, isLoading: false }); // Roo Debug Log: Before error setState
      setState(prevState => ({
        ...prevState,
        isLoading: false, // Explicitly setting isLoading to false
        error: error, // Store the actual Error object
        configData: null, // Clear data on error
        statusData: null, // Clear data on error
      }));
      console.log("useMCPInfo: State update called for error."); // Roo Debug Log: After error setState call
    }
  }, []); // Empty dependency array means this function is created once

  return {
    ...state,
    fetchMCPInfo,
  };
}