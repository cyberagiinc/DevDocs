'use client'

import React, { useState, useEffect } from 'react'
import { Button, ScrollArea } from "@/components/ui"
import { DiscoveredPage } from "@/lib/types"
import { Globe, Loader2, CheckCircle2, AlertCircle, Link as LinkIcon, ChevronDown, ChevronRight } from 'lucide-react'

interface SubdomainListProps {
  subdomains: DiscoveredPage[]
  onCrawlSelected: (selectedUrls: string[]) => void
  isProcessing: boolean
}

export default function SubdomainList({ subdomains, onCrawlSelected, isProcessing }: SubdomainListProps) {
  const [selectedPages, setSelectedPages] = useState<Set<string>>(new Set())
  const [expandedPages, setExpandedPages] = useState<Set<string>>(new Set())

  // Reset selection when subdomains change
  useEffect(() => {
    setSelectedPages(new Set())
    setExpandedPages(new Set())
  }, [subdomains])

  const togglePage = (url: string, page?: DiscoveredPage, isInternalLink: boolean = false) => {
    const newSelected = new Set(selectedPages)

    if (isInternalLink) {
      // Handle internal link selection
      if (newSelected.has(url)) {
        newSelected.delete(url)
      } else {
        newSelected.add(url)
      }
    } else {
      // Handle parent URL selection
      if (newSelected.has(url)) {
        // When deselecting a parent URL, remove it and its internal links
        newSelected.delete(url)
        if (page?.internalLinks) {
          page.internalLinks.forEach(link => newSelected.delete(link.href))
        }
      } else {
        // When selecting a parent URL, add it and its internal links
        newSelected.add(url)
        if (page?.internalLinks) {
          page.internalLinks.forEach(link => newSelected.add(link.href))
          setExpandedPages(prev => new Set([...prev, url]))
        }
      }
    }

    setSelectedPages(newSelected)
  }

  const toggleExpand = (url: string) => {
    const newExpanded = new Set(expandedPages)
    if (newExpanded.has(url)) {
      newExpanded.delete(url)
    } else {
      newExpanded.add(url)
    }
    setExpandedPages(newExpanded)
  }

  const toggleAll = () => {
    const allUrls = new Set<string>()
    const allSelected = subdomains.every(page => {
      const hasAllLinks = page.internalLinks ? 
        page.internalLinks.every(link => selectedPages.has(link.href)) : 
        selectedPages.has(page.url)
      return hasAllLinks && selectedPages.has(page.url)
    })

    if (allSelected) {
      setSelectedPages(new Set())
    } else {
      subdomains.forEach(page => {
        allUrls.add(page.url)
        if (page.internalLinks) {
          page.internalLinks.forEach(link => allUrls.add(link.href))
        }
      })
      setSelectedPages(allUrls)
    }
  }

  const getTotalUrls = () => {
    let total = 0
    subdomains.forEach(page => {
      total++ // Count the main page
      if (page.internalLinks) {
        total += page.internalLinks.length // Count internal links
      }
    })
    return total
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'crawled':
        return <CheckCircle2 className="w-4 h-4 text-green-400" />
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-400" />
      default:
        return <Loader2 className="w-4 h-4 text-blue-400 animate-spin" />
    }
  }

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'crawled':
        return 'bg-green-500/10 text-green-400 border-green-500/20'
      case 'error':
        return 'bg-red-500/10 text-red-400 border-red-500/20'
      default:
        return 'bg-blue-500/10 text-blue-400 border-blue-500/20'
    }
  }

  return (
    <div className="space-y-4 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex justify-between items-center bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700">
        <div className="flex items-center gap-3">
          <Globe className="w-5 h-5 text-purple-400" />
          <h2 className="text-xl font-semibold text-purple-400">Discovered Pages</h2>
          <div className="flex items-center gap-3">
            <span className="px-2 py-1 rounded-lg bg-purple-500/10 text-purple-400 text-sm">
              {subdomains.length} pages
            </span>
            {selectedPages.size > 0 && selectedPages.size !== getTotalUrls() && (
              <span className="px-2 py-1 rounded-lg bg-purple-600/20 text-purple-400 text-sm font-medium">
                {selectedPages.size} selected
              </span>
            )}
          </div>
        </div>
        <Button
          onClick={() => onCrawlSelected(Array.from(selectedPages))}
          disabled={isProcessing || selectedPages.size === 0}
          className={`
            flex items-center gap-2 transition-all duration-300
            ${isProcessing ? 'bg-purple-500/50' : 'bg-purple-500 hover:bg-purple-600'}
          `}
        >
          {isProcessing ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Processing...</span>
            </>
          ) : (
            <>
              <Globe className="w-4 h-4" />
              <span>
                {selectedPages.size === getTotalUrls()
                  ? `Crawl All Pages (${getTotalUrls()})`
                  : `Crawl Selected (${selectedPages.size}/${getTotalUrls()})`}
              </span>
            </>
          )}
        </Button>
      </div>
      
      {/* Table Container */}
      <div className="rounded-xl border border-gray-700 overflow-hidden bg-gray-900/50 backdrop-blur-sm">
        <ScrollArea className="h-[600px]">
          <table className="w-full">
            <thead className="bg-gray-800/50 sticky top-0">
              <tr>
                <th className="px-4 py-3 text-left text-gray-400 font-medium w-[140px]">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="rounded border-gray-600 bg-gray-800 text-purple-500 focus:ring-purple-500"
                      checked={selectedPages.size === getTotalUrls() && getTotalUrls() > 0}
                      onChange={toggleAll}
                    />
                    <span className="text-sm">
                      {selectedPages.size === getTotalUrls()
                        ? "Unselect All"
                        : "Select All"}
                    </span>
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-gray-400 font-medium">URL</th>
                <th className="px-4 py-3 text-left text-gray-400 font-medium">Title</th>
                <th className="px-4 py-3 text-left text-gray-400 font-medium">Internal Links</th>
                <th className="px-4 py-3 text-left text-gray-400 font-medium w-[120px]">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700/50">
              {subdomains.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-gray-400">
                    <div className="flex flex-col items-center gap-2">
                      <Globe className="w-8 h-8 text-gray-500" />
                      <p>No pages discovered yet. Enter a URL to start.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                subdomains.map((page) => (
                  <React.Fragment key={page.url}>
                    <tr className="transition-colors hover:bg-gray-800/30">
                      <td className="px-4 py-3">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            className="rounded border-gray-600 bg-gray-800 text-purple-500 focus:ring-purple-500"
                            checked={selectedPages.has(page.url)}
                            onChange={() => togglePage(page.url, page)}
                            aria-label={`Select ${page.title || 'page'}`}
                          />
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <LinkIcon className="w-4 h-4 text-gray-500 flex-shrink-0" />
                          <span className="font-mono text-sm text-gray-300 break-all">
                            {page.url}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-gray-300">
                        {page.title || 'Untitled'}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => toggleExpand(page.url)}
                            className="p-1 hover:bg-gray-700 rounded"
                            disabled={!page.internalLinks?.length}
                          >
                            {expandedPages.has(page.url) ? (
                              <ChevronDown className="w-4 h-4 text-gray-400" />
                            ) : (
                              <ChevronRight className="w-4 h-4 text-gray-400" />
                            )}
                          </button>
                          <span className="text-gray-400">
                            {page.internalLinks?.length || 0} links
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className={`
                          inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium
                          border ${getStatusStyle(page.status)}
                        `}>
                          {getStatusIcon(page.status)}
                          <span>{page.status}</span>
                        </div>
                      </td>
                    </tr>
                    {/* Internal Links */}
                    {expandedPages.has(page.url) && page.internalLinks?.map((link) => (
                      <tr
                        key={link.href}
                        className="bg-gray-800/20 border-t border-gray-700/30"
                      >
                        <td className="px-4 py-3">
                          <div className="flex items-center pl-4">
                            <input
                              type="checkbox"
                              className="rounded border-gray-600 bg-gray-800 text-purple-500 focus:ring-purple-500"
                              checked={selectedPages.has(link.href)}
                              onChange={() => togglePage(link.href, undefined, true)}
                              aria-label={`Select ${link.text || 'link'}`}
                            />
                          </div>
                        </td>
                        <td className="px-4 py-3" colSpan={3}>
                          <div className="flex items-center gap-2 pl-4">
                            <LinkIcon className="w-3 h-3 text-gray-500 flex-shrink-0" />
                            <div className="flex flex-col">
                              <span className="font-mono text-sm text-gray-400 break-all">
                                {link.href}
                              </span>
                              {link.text && (
                                <span className="text-sm text-gray-500 mt-1">
                                  {link.text}
                                </span>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className={`
                            inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium
                            border ${getStatusStyle(link.status || 'pending')}
                          `}>
                            {getStatusIcon(link.status || 'pending')}
                            <span>{link.status || 'pending'}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))
              )}
            </tbody>
          </table>
        </ScrollArea>
      </div>
    </div>
  )
}