'use client'

import { FileText, Loader2, Check, X } from 'lucide-react'

interface Document {
  id: string
  fileName: string
  fileType: string
  status: 'processing' | 'done' | 'failed' | 'uploaded'
  uploadedAt: string
  pages?: number
}

interface DocumentListProps {
  documents: Document[]
}

export default function DocumentList({ documents }: DocumentListProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'done':
        return 'bg-green-500/10 text-green-400'
      case 'processing':
        return 'bg-yellow-500/10 text-yellow-400'
      case 'failed':
        return 'bg-red-500/10 text-red-400'
      default:
        return 'bg-blue-500/10 text-blue-400'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'done':
        return <Check className="w-4 h-4" />
      case 'processing':
        return <Loader2 className="w-4 h-4 animate-spin" />
      case 'failed':
        return <X className="w-4 h-4" />
      default:
        return null
    }
  }

  if (documents.length === 0) {
    return (
      <div className="bg-card border border-border rounded-lg p-8 text-center">
        <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center mx-auto mb-4">
          <FileText className="w-6 h-6 text-muted-foreground" />
        </div>
        <h3 className="font-semibold text-foreground mb-2">No documents yet</h3>
        <p className="text-sm text-muted-foreground">
          Upload documents to get started with document search
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <h3 className="font-semibold text-foreground">Uploaded Documents ({documents.length})</h3>
      <div className="space-y-2">
        {documents.map((doc) => (
          <div
            key={doc.id}
            className="bg-card border border-border rounded-lg p-4 hover:border-primary/50 transition-colors"
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                <FileText className="w-5 h-5 text-muted-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-foreground truncate">{doc.fileName}</h4>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-muted-foreground">
                    {doc.fileType.toUpperCase()}
                  </span>
                  {doc.pages && (
                    <>
                      <span className="text-xs text-muted-foreground">•</span>
                      <span className="text-xs text-muted-foreground">{doc.pages} pages</span>
                    </>
                  )}
                  <span className="text-xs text-muted-foreground">•</span>
                  <span className="text-xs text-muted-foreground">
                    {new Date(doc.uploadedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <div
                className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 whitespace-nowrap ${getStatusColor(
                  doc.status
                )}`}
              >
                {getStatusIcon(doc.status)}
                {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
