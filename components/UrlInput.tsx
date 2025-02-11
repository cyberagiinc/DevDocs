'use client'

import { useState } from 'react'
import { Globe, ArrowRight, AlertCircle, Layers } from 'lucide-react'
import { Button, Input } from "@/components/ui"
import { validateUrl } from '@/lib/crawl-service'

interface UrlInputProps {
  onSubmit: (url: string, depth: number) => void
}

export default function UrlInput({ onSubmit }: UrlInputProps) {
  const [inputUrl, setInputUrl] = useState('')
  const [depth, setDepth] = useState(3)
  const [error, setError] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted with URL:', inputUrl, 'depth:', depth)
    setError('')

    if (!inputUrl.trim()) {
      setError('Please enter a URL')
      console.log('Form validation failed: Empty URL')
      return
    }

    if (!validateUrl(inputUrl)) {
      setError('Please enter a valid URL including the protocol (http:// or https://)')
      console.log('Form validation failed: Invalid URL format')
      return
    }

    try {
      setIsSubmitting(true)
      console.log('URL validation passed, calling onSubmit')
      await onSubmit(inputUrl.trim(), depth)
    } catch (error) {
      console.error('Error in form submission:', error)
      setError(error instanceof Error ? error.message : 'Failed to process URL')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-4">
      <div className="relative">
        {/* Input Container */}
        <div
          className={`transform transition-all duration-300 ease-in-out
            flex items-center gap-3 p-3 rounded-xl
            bg-gray-900/50 backdrop-blur-sm border-2
            ${isFocused ? 'border-blue-500/50 shadow-lg shadow-blue-500/20 translate-y-0' : 'border-gray-700'}
            ${error ? 'border-red-500/50 shadow-lg shadow-red-500/20' : ''}
          `}
        >
          {/* Icon */}
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gray-800">
            <Globe
              className={`w-5 h-5 transition-colors duration-300 ${
                isFocused ? 'text-blue-400' : error ? 'text-red-400' : 'text-gray-400'
              }`}
            />
          </div>

          {/* Input Field */}
          <Input
            type="text"
            placeholder="Enter URL to crawl (e.g., https://example.com)..."
            value={inputUrl}
            onChange={(e) => {
              setInputUrl(e.target.value)
              setError('')
            }}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="flex-1 bg-transparent border-none text-lg text-white placeholder:text-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0"
            aria-invalid={!!error}
            disabled={isSubmitting}
          />

          {/* Depth Selector */}
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-800">
            <Layers className="w-4 h-4 text-gray-400" />
            <Input
              type="number"
              min={1}
              max={5}
              value={depth}
              onChange={(e) => setDepth(Math.min(5, Math.max(1, parseInt(e.target.value) || 1)))}
              className="w-16 bg-transparent border-none text-white text-center focus-visible:ring-0 focus-visible:ring-offset-0"
              title="Crawl depth (1-5)"
              disabled={isSubmitting}
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className={`flex items-center gap-2 px-6 py-2 rounded-lg font-medium transition-all duration-300
              ${inputUrl.trim()
                ? 'bg-blue-500 hover:bg-blue-600 text-white transform hover:scale-105'
                : 'bg-gray-700 text-gray-300'
              }
            `}
            disabled={!inputUrl.trim() || isSubmitting}
          >
            {isSubmitting ? (
              <>
                <ArrowRight className="w-4 h-4 animate-spin" />
                <span>Processing...</span>
              </>
            ) : (
              <>
                <span>Discover</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </Button>
        </div>

        {/* Error Message with Animation */}
        <div className={`
          transform transition-all duration-300 ease-in-out
          mt-2 pl-14
          ${error ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}
        `}>
          {error && (
            <div className="flex items-center gap-2 text-red-400">
              <AlertCircle className="w-4 h-4" />
              <p className="text-sm">{error}</p>
            </div>
          )}
        </div>

        {/* Helper Text */}
        <div className={`
          transform transition-all duration-300 ease-in-out
          mt-2 pl-14
          ${!error ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}
        `}>
          <p className="text-sm text-gray-400">
            Enter a complete URL including http:// or https:// and select crawl depth (1-5)
          </p>
        </div>
      </div>
    </form>
  )
}
