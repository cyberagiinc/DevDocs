'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/components/ui/use-toast"
import { FileText, Download, Copy, Check } from 'lucide-react'
import { ScrollArea } from '@/components/ui/scroll-area'

interface StoredFile {
  id: string
  title?: string
  name?: string // Add this for backwards compatibility
  timestamp?: string
}

export default function MarkdownCombiner() {
  const [files, setFiles] = useState<StoredFile[]>([])
  const [selectedFiles, setSelectedFiles] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [combinedMarkdown, setCombinedMarkdown] = useState('')
  const [addFilenameHeaders, setAddFilenameHeaders] = useState(true)
  const [addSeparators, setAddSeparators] = useState(true)
  const [transformLinks, setTransformLinks] = useState(true)
  const [customSeparator, setCustomSeparator] = useState('---')
  const [autoIncludeRelated, setAutoIncludeRelated] = useState(true)
  const [removeExtraNewlines, setRemoveExtraNewlines] = useState(true)
  const [stripMetadata, setStripMetadata] = useState(false)
  const [removeLinks, setRemoveLinks] = useState(false)
  const [includedRelatedFiles, setIncludedRelatedFiles] = useState<string[]>([])
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  // Load the list of available markdown files
  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await fetch('/api/storage')
        if (!response.ok) {
          throw new Error('Failed to fetch stored files')
        }
        const data = await response.json()
        
        // Handle different API response formats
        let filesData = data.files || [];
        
        // Transform data if needed to ensure it matches StoredFile interface
        const transformedFiles = filesData.map((file: any) => ({
          id: file.id || file.name || '',
          title: file.title || file.name || '',
          name: file.name || '',
          timestamp: file.timestamp || new Date().toISOString()
        }));
        
        console.log('Fetched files:', transformedFiles);
        setFiles(transformedFiles)
      } catch (error) {
        console.error('Error fetching files:', error)
        toast({
          title: 'Error',
          description: 'Failed to load stored files. Please try again.',
          variant: 'destructive'
        })
      }
    }

    fetchFiles()
  }, [toast])

  const handleFileToggle = (fileId: string) => {
    setSelectedFiles(prev => {
      if (prev.includes(fileId)) {
        return prev.filter(id => id !== fileId)
      } else {
        return [...prev, fileId]
      }
    })
  }

  const handleCombine = async () => {
    if (selectedFiles.length === 0) {
      toast({
        title: 'No Files Selected',
        description: 'Please select at least one file to combine.',
        variant: 'destructive'
      })
      return
    }

    setIsLoading(true)
    setCombinedMarkdown('')
    setIncludedRelatedFiles([])

    try {
      const response = await fetch('/api/combine-markdown', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          files: selectedFiles,
          addFilenameHeaders,
          addSeparators,
          transformLinks,
          customSeparator,
          autoIncludeRelated,
          removeExtraNewlines,
          stripMetadata,
          removeLinks
        })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to combine markdown files')
      }

      const data = await response.json()
      setCombinedMarkdown(data.combinedContent || '')
      
      // Set any related files that were automatically included
      if (data.stats?.includedRelatedFiles && data.stats.includedRelatedFiles.length > 0) {
        setIncludedRelatedFiles(data.stats.includedRelatedFiles)
      }

      toast({
        title: 'Markdown Combined',
        description: `Successfully combined ${data.stats?.fileCount || selectedFiles.length} files into one document.`
      })
    } catch (error: any) {
      console.error('Error combining markdown:', error)
      toast({
        title: 'Error',
        description: error.message || 'Failed to combine markdown files',
        variant: 'destructive'
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDownload = () => {
    if (!combinedMarkdown) return

    const blob = new Blob([combinedMarkdown], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'combined-document.md'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleCopy = async () => {
    if (!combinedMarkdown) return

    await navigator.clipboard.writeText(combinedMarkdown)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const getDisplayName = (file: StoredFile) => {
    if (file.title && file.title.trim() !== '') return file.title;
    if (file.name && file.name.trim() !== '') return file.name;
    return file.id;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700">
        <div className="flex items-center gap-3">
          <FileText className="w-5 h-5 text-blue-400" />
          <h2 className="text-xl font-semibold text-blue-400">Combine Markdown Files</h2>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* File Selection Panel */}
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-lg p-4 border border-gray-700 space-y-4">
          <h3 className="text-lg font-medium">Select Files to Combine</h3>
          
          <ScrollArea className="h-[300px] w-full pr-4">
            {files.length > 0 ? (
              <div className="space-y-2">
                {files.map((file, index) => (
                  <div key={`${file.id}-${index}`} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`file-${file.id}-${index}`}
                      checked={selectedFiles.includes(file.id)}
                      onCheckedChange={() => handleFileToggle(file.id)}
                    />
                    <Label 
                      htmlFor={`file-${file.id}-${index}`}
                      className="text-sm cursor-pointer flex-1"
                    >
                      {getDisplayName(file)}
                    </Label>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400 text-sm">No stored files found</p>
            )}
          </ScrollArea>
          
          <div className="text-sm text-gray-400">
            {selectedFiles.length} of {files.length} files selected
          </div>
        </div>

        {/* Options Panel */}
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-lg p-4 border border-gray-700 space-y-4">
          <h3 className="text-lg font-medium">Combination Options</h3>
          
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="addFilenameHeaders"
                checked={addFilenameHeaders}
                onCheckedChange={(checked: boolean | 'indeterminate') => setAddFilenameHeaders(checked === true)}
              />
              <Label htmlFor="addFilenameHeaders">Add filename headers</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="addSeparators"
                checked={addSeparators}
                onCheckedChange={(checked: boolean | 'indeterminate') => setAddSeparators(checked === true)}
              />
              <Label htmlFor="addSeparators">Add separators between files</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="transformLinks"
                checked={transformLinks}
                onCheckedChange={(checked: boolean | 'indeterminate') => setTransformLinks(checked === true)}
              />
              <Label htmlFor="transformLinks">Transform internal links</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="removeLinks"
                checked={removeLinks}
                onCheckedChange={(checked: boolean | 'indeterminate') => setRemoveLinks(checked === true)}
              />
              <Label htmlFor="removeLinks">Remove all links (keep only text)</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="autoIncludeRelated"
                checked={autoIncludeRelated}
                onCheckedChange={(checked: boolean | 'indeterminate') => setAutoIncludeRelated(checked === true)}
              />
              <Label htmlFor="autoIncludeRelated">Auto-include related UUID files</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="removeExtraNewlines"
                checked={removeExtraNewlines}
                onCheckedChange={(checked: boolean | 'indeterminate') => setRemoveExtraNewlines(checked === true)}
              />
              <Label htmlFor="removeExtraNewlines">Remove extra newlines</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="stripMetadata"
                checked={stripMetadata}
                onCheckedChange={(checked: boolean | 'indeterminate') => setStripMetadata(checked === true)}
              />
              <Label htmlFor="stripMetadata">Strip YAML front matter</Label>
            </div>
            
            {addSeparators && (
              <div className="pt-2">
                <Label htmlFor="customSeparator" className="text-sm pb-1 block">Custom separator</Label>
                <Input 
                  id="customSeparator"
                  value={customSeparator}
                  onChange={(e) => setCustomSeparator(e.target.value)}
                  className="bg-gray-800 text-white border-gray-700"
                />
              </div>  
            )}
          </div>
          
          <Button 
            onClick={handleCombine} 
            disabled={isLoading || selectedFiles.length === 0}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            {isLoading ? 'Combining...' : 'Combine Selected Files'}
          </Button>
        </div>
      </div>

      {/* Output Area */}
      {combinedMarkdown && (
        <div className="space-y-4 animate-in fade-in duration-500">
          <div className="flex justify-between items-center bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700">
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-green-400" />
              <h2 className="text-xl font-semibold text-green-400">Combined Document</h2>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={handleCopy}
                variant="outline"
                className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-green-400" />
                    <span className="text-green-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-white" />
                    <span className="text-white">Copy</span>
                  </>
                )}
              </Button>
              <Button
                onClick={handleDownload}
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
              >
                <Download className="w-4 h-4" />
                <span>Download</span>
              </Button>
            </div>
          </div>

          {includedRelatedFiles.length > 0 && (
            <div className="p-4 bg-gray-800/50 backdrop-blur-sm rounded-lg border border-blue-700">
              <p className="text-blue-400 font-medium mb-2">
                {includedRelatedFiles.length} related files were automatically included:
              </p>
              <div className="text-sm text-gray-300">
                {includedRelatedFiles.map((file, index) => (
                  <span key={file} className="inline-block mr-2 mb-1 px-2 py-1 bg-gray-700 rounded">
                    {file}
                  </span>
                ))}
              </div>
            </div>
          )}

          <ScrollArea className="h-[400px] w-full rounded-xl border border-gray-700 bg-gray-900/50 backdrop-blur-sm">
            <div className="p-4">
              <pre className="font-mono text-sm whitespace-pre-wrap text-gray-300">
                {combinedMarkdown}
              </pre>
            </div>
          </ScrollArea>
        </div>
      )}
    </div>
  )
} 