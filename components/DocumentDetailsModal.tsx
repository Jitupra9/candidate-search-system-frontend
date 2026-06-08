'use client'

import ActionModal from './ActionModal'

interface Document {
  id: string
  name: string
  type: string
  size: number
  status: 'processing' | 'done' | 'failed'
  uploadDate: Date
  extractedText?: string
  pages?: number
  rows?: number
}

interface DocumentDetailsModalProps {
  isOpen: boolean
  document: Document
  onClose: () => void
}

export default function DocumentDetailsModal({
  isOpen,
  document,
  onClose,
}: DocumentDetailsModalProps) {
  return (
    <ActionModal
      isOpen={isOpen}
      title="Document Details"
      onClose={onClose}
      size="lg"
    >
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">
              File Name
            </p>
            <p className="text-sm text-foreground">{document.name}</p>
          </div>

          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">
              File Type
            </p>
            <p className="text-sm text-foreground capitalize">{document.type}</p>
          </div>

          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">
              File Size
            </p>
            <p className="text-sm text-foreground">{(document.size / 1024).toFixed(2)} KB</p>
          </div>

          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">
              Upload Date
            </p>
            <p className="text-sm text-foreground">{document.uploadDate.toLocaleString()}</p>
          </div>

          {document.pages && (
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">
                Pages
              </p>
              <p className="text-sm text-foreground">{document.pages}</p>
            </div>
          )}

          {document.rows && (
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">
                Rows
              </p>
              <p className="text-sm text-foreground">{document.rows}</p>
            </div>
          )}
        </div>

        {document.extractedText && (
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">
              Extracted Text Preview
            </p>
            <div className="bg-secondary/30 border border-border rounded-lg p-3 max-h-48 overflow-y-auto">
              <p className="text-sm text-foreground whitespace-pre-wrap leading-relaxed">
                {document.extractedText.substring(0, 500)}
                {document.extractedText.length > 500 && '...'}
              </p>
            </div>
          </div>
        )}

        <div>
          <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">
            Processing Status
          </p>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${
              document.status === 'done' ? 'bg-green-400' :
              document.status === 'failed' ? 'bg-red-400' :
              'bg-yellow-400'
            }`} />
            <p className="text-sm text-foreground capitalize">{document.status}</p>
          </div>
        </div>
      </div>
    </ActionModal>
  )
}
