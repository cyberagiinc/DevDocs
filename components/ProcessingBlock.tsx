import {
  Loader2,
  Globe,
  FileText,
  Database,
  AlertTriangle,
  ArrowRight
} from 'lucide-react'

interface ProcessingStats {
  subdomainsParsed: number
  pagesCrawled: number
  dataExtracted: string
  errorsEncountered: number
}

interface ProcessingBlockProps {
  isProcessing: boolean
  stats?: ProcessingStats
}

export default function ProcessingBlock({ isProcessing, stats = {
  subdomainsParsed: 0,
  pagesCrawled: 0,
  dataExtracted: '0 KB',
  errorsEncountered: 0
} }: ProcessingBlockProps) {
  const progress = Math.min(
    ((stats.subdomainsParsed + stats.pagesCrawled) /
    (stats.subdomainsParsed > 0 ? stats.subdomainsParsed * 2 : 2)) * 100,
    100
  )

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
        flex items-center gap-3 p-3 mb-4 rounded-lg
        transition-all duration-300
        ${isProcessing
          ? 'bg-blue-500/10 text-blue-400'
          : 'bg-gray-800/50 text-gray-400'
        }
      `}>
        <div className="flex items-center gap-2">
          <Loader2 className={`
            h-5 w-5 transition-opacity duration-300
            ${isProcessing ? 'animate-spin opacity-100' : 'opacity-0'}
          `} />
          <span className="font-medium">
            {isProcessing ? 'Processing URL...' : 'Waiting for URL...'}
          </span>
        </div>
      </div>

      <div className="h-1 w-full bg-gray-700 rounded-full mb-6 overflow-hidden">
        <div
          className={`
            h-full bg-blue-500 transition-all duration-1000 ease-out
            ${isProcessing ? 'opacity-100' : 'opacity-50'}
          `}
          style={{ width: `${progress}%` }}
        />
      </div>

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
