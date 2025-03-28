import {
  Loader2,
  Globe,
  FileText,
  Database,
  AlertTriangle,
  ArrowRight,
  XCircle,
  Clock,
  CheckCircle,
  AlertOctagon
} from 'lucide-react'
import { Button } from './ui/button'

interface ProcessingStats {
  subdomainsParsed: number
  pagesCrawled: number
  dataExtracted: string
  errorsEncountered: number
}

interface ProgressInfo {
  status: 'idle' | 'discovering' | 'retrying' | 'processing' | 'completed' | 'error'
  message: string
  percent: number
  elapsedTime: number
  estimatedTimeRemaining: number
}

interface ProcessingBlockProps {
  isProcessing: boolean
  stats?: ProcessingStats
  progress?: ProgressInfo
  isCancellable?: boolean
  onCancel?: () => void
}

export default function ProcessingBlock({
  isProcessing,
  stats = {
    subdomainsParsed: 0,
    pagesCrawled: 0,
    dataExtracted: '0 KB',
    errorsEncountered: 0
  },
  progress = {
    status: 'idle',
    message: '',
    percent: 0,
    elapsedTime: 0,
    estimatedTimeRemaining: 0
  },
  isCancellable = false,
  onCancel
}: ProcessingBlockProps) {
  // Use the provided progress percent if available, otherwise calculate from stats
  const progressPercent = progress.status !== 'idle'
    ? progress.percent
    : Math.min(
        ((stats.subdomainsParsed + stats.pagesCrawled) /
        (stats.subdomainsParsed > 0 ? stats.subdomainsParsed * 2 : 2)) * 100,
        100
      )
      
  // Get status icon based on progress status
  const getStatusIcon = () => {
    switch (progress.status) {
      case 'discovering':
      case 'processing':
      case 'retrying':
        return <Loader2 className="h-5 w-5 animate-spin" />
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-400" />
      case 'error':
        return <AlertOctagon className="h-5 w-5 text-red-400" />
      default:
        return <Loader2 className={`h-5 w-5 transition-opacity duration-300 ${isProcessing ? 'animate-spin opacity-100' : 'opacity-0'}`} />
    }
  }
  
  // Get status text based on progress status
  const getStatusText = () => {
    if (progress.status === 'idle') {
      return isProcessing ? 'Processing URL...' : 'Waiting for URL...'
    }
    
    switch (progress.status) {
      case 'discovering':
        return 'Discovering pages...'
      case 'processing':
        return 'Processing response...'
      case 'retrying':
        return 'Retrying request...'
      case 'completed':
        return 'Discovery completed'
      case 'error':
        return 'Error occurred'
      default:
        return isProcessing ? 'Processing URL...' : 'Waiting for URL...'
    }
  }
  
  // Format time remaining
  const formatTimeRemaining = (seconds: number) => {
    if (seconds <= 0) return 'Almost done'
    if (seconds < 60) return `${seconds} seconds remaining`
    return `${Math.ceil(seconds / 60)} minutes remaining`
  }

  const statItems = [
    {
      icon: Globe,
      label: "Subdomains Parsed",
      value: stats.subdomainsParsed,
      color: "text-blue-400"
    },
    {
      icon: FileText,
      label: "Pages Crawled",
      value: stats.pagesCrawled,
      color: "text-purple-400"
    },
    {
      icon: Database,
      label: "Data Extracted",
      value: stats.dataExtracted,
      color: "text-green-400"
    },
    {
      icon: AlertTriangle,
      label: "Errors Encountered",
      value: stats.errorsEncountered,
      color: "text-yellow-400"
    }
  ]

  return (
    <div className="w-full">
      <div className={`
        flex items-center justify-between gap-3 p-3 mb-4 rounded-lg
        transition-all duration-300
        ${progress.status === 'error'
          ? 'bg-red-500/10 text-red-400'
          : isProcessing
            ? 'bg-blue-500/10 text-blue-400'
            : 'bg-gray-800/50 text-gray-400'
        }
      `}>
        <div className="flex items-center gap-2">
          {getStatusIcon()}
          <span className="font-medium">
            {getStatusText()}
          </span>
          
          {/* Show progress message if available */}
          {progress.message && (
            <span className="text-sm opacity-80 ml-2">
              {progress.message}
            </span>
          )}
        </div>
        
        {/* Show cancel button if cancellable */}
        {isCancellable && onCancel && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onCancel}
            className="text-gray-400 hover:text-red-400"
          >
            <XCircle className="h-4 w-4 mr-1" />
            Cancel
          </Button>
        )}
      </div>

      {/* Progress bar */}
      <div className="h-1 w-full bg-gray-700 rounded-full mb-2 overflow-hidden">
        <div
          className={`
            h-full transition-all duration-1000 ease-out
            ${progress.status === 'error'
              ? 'bg-red-500'
              : progress.status === 'completed'
                ? 'bg-green-500'
                : 'bg-blue-500'
            }
            ${isProcessing ? 'opacity-100' : 'opacity-50'}
          `}
          style={{ width: `${progressPercent}%` }}
        />
      </div>
      
      {/* Time information */}
      {progress.status !== 'idle' && progress.status !== 'completed' && progress.status !== 'error' && (
        <div className="flex justify-between text-xs text-gray-500 mb-4">
          <div className="flex items-center">
            <Clock className="h-3 w-3 mr-1" />
            <span>Elapsed: {progress.elapsedTime}s</span>
          </div>
          {progress.estimatedTimeRemaining > 0 && (
            <div>
              <span>{formatTimeRemaining(progress.estimatedTimeRemaining)}</span>
            </div>
          )}
        </div>
      )}

      <div className="flex gap-4">
        {statItems.map((item) => (
          <div
            key={item.label}
            className={`
              flex-1 p-4 rounded-xl bg-gray-800/50 backdrop-blur-sm
              border border-gray-700/50
              transition-all duration-300
              ${isProcessing ? 'transform hover:scale-105' : ''}
            `}
          >
            <div className="flex items-center gap-2 mb-2">
              <item.icon className={`w-4 h-4 ${item.color}`} />
              <span className="text-xs text-gray-400">{item.label}</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className={`text-xl font-bold ${item.color}`}>
                {item.value}
              </span>
              {isProcessing && (
                <ArrowRight className={`w-3 h-3 ${item.color} animate-pulse`} />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
