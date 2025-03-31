import React, { useEffect, useState } from 'react';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { Button } from './ui/button';
import { toast } from './ui/use-toast';

interface ServerStatus {
  status: 'running' | 'stopped' | 'partial' | 'error';
  pid?: number;
  details?: string;
}

const MCPServerStatus = () => {
  const [status, setStatus] = useState<ServerStatus>({ status: 'stopped' });
  const [logs, setLogs] = useState<string[]>([]);
  
  // Use the exact configuration specified by the user
  const exactConfig = {
    "mcpServers": {
      "fast-markdown": {
        "command": "docker",
        "args": [
          "exec",
          "-i",
          "devdocs-mcp",
          "python",
          "-m",
          "fast_markdown_mcp.server",
          "/app/storage/markdown"
        ],
        "env": {},
        "disabled": false,
        "alwaysAllow": [
          "sync_file",
          "get_status",
          "list_files",
          "read_file",
          "search_files",
          "search_by_tag",
          "get_stats",
          "get_section",
          "get_table_of_contents"
        ]
      }
    }
  };

  useEffect(() => {

    const checkStatus = async () => {
      try {
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || process.env.BACKEND_URL || 'http://localhost:24125';
        const response = await fetch(`${backendUrl}/api/mcp/status`);
        const data = await response.json();
        setStatus({
          status: data.status,
          pid: data.pid,
          details: data.details
        });
      } catch (error) {
        setStatus({
          status: 'error',
          details: error instanceof Error ? error.message : 'Failed to check status'
        });
      }
    };

    const getLogs = async () => {
      try {
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || process.env.BACKEND_URL || 'http://localhost:24125';
        const response = await fetch(`${backendUrl}/api/mcp/logs`);
        if (response.ok) {
          const data = await response.json();
          setLogs(data.logs);
        }
      } catch (error) {
        console.error('Error fetching logs:', error);
      }
    };

    // Initial fetch
    checkStatus();
    getLogs();

    // Set up polling
    const interval = setInterval(() => {
      checkStatus();
      getLogs();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getStatusBadge = () => {
    switch (status.status) {
      case 'running':
        return <Badge className="bg-green-500">●&nbsp;Running</Badge>;
      case 'partial':
        return <Badge className="bg-yellow-500">◐&nbsp;Partial</Badge>;
      case 'error':
        return <Badge variant="destructive">✕&nbsp;Error</Badge>;
      default:
        return <Badge variant="destructive">○&nbsp;Stopped</Badge>;
    }
  };

  const copyConfig = () => {
    navigator.clipboard.writeText(JSON.stringify(exactConfig, null, 2))
      .then(() => {
        toast({
          title: "Configuration Copied",
          description: "Configuration copied to clipboard",
        });
      })
      .catch((error) => {
        console.error('Error copying config:', error);
        toast({
          title: "Error",
          description: "Failed to copy configuration",
          variant: "destructive",
        });
      });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">MCP Server Status</h3>
        {getStatusBadge()}
      </div>

      {status.details && (
        <div className="text-sm text-gray-300 bg-gray-900/50 rounded-xl p-3 border border-gray-700/50">
          {status.details}
        </div>
      )}

      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-white">Configuration</h3>
          <Button
            variant="outline"
            size="sm"
            onClick={copyConfig}
            className="text-xs"
          >
            Copy Config
          </Button>
        </div>
        <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-700/50">
          <pre className="text-sm font-mono text-gray-300 whitespace-pre-wrap overflow-x-auto">
            {JSON.stringify(exactConfig, null, 2)}
          </pre>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3 text-white">Server Logs</h3>
        <ScrollArea className="h-[200px] bg-gray-900/50 rounded-xl p-4 border border-gray-700/50">
          {logs.length > 0 ? (
            logs.map((log, index) => (
              <div key={index} className="text-sm text-gray-300 mb-1 font-mono">
                {log}
              </div>
            ))
          ) : (
            <div className="text-sm text-gray-500 italic">No logs available</div>
          )}
        </ScrollArea>
      </div>
    </div>
  );
};

export default MCPServerStatus;