'use client'

import { useState } from 'react'
import { Trash2, Eye, Download, Edit2, FileText } from 'lucide-react'
import { getFileMetadata, formatFileSize } from '@/lib/fileTypeDetector'
import EditDocumentModal from './EditDocumentModal'
import DocumentDetailsModal from './DocumentDetailsModal'

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

interface EnhancedDocumentListProps {
  documents: Document[]
  onDelete: (id: string) => void
  onUpdate: (id: string, updates: Partial<Document>) => void
}

export default function EnhancedDocumentList({
  documents,
  onDelete,
  onUpdate,
}: EnhancedDocumentListProps) {
  const [editingId, setEditingId] = useState<string | null>(null)
  const [viewingId, setViewingId] = useState<string | null>(null)
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  const editingDoc = documents.find(d => d.id === editingId)
  const viewingDoc = documents.find(d => d.id === viewingId)

  const getStatusBadge = (status: string) => {
    const badges = {
      processing: 'bg-blue-500/20 text-blue-400 border border-blue-500/50',
      done: 'bg-green-500/20 text-green-400 border border-green-500/50',
      failed: 'bg-red-500/20 text-red-400 border border-red-500/50',
    }
    return badges[status as keyof typeof badges] || badges.processing
  }

  const getTypeIcon = (fileName: string) => {
    const metadata = getFileMetadata(new File([new ArrayBuffer(0)], fileName))
    return metadata.icon
  }

  return (
    <div className="space-y-4">
      {documents.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <FileText size={48} className="mx-auto mb-3 opacity-50" />
          <p>No documents uploaded yet</p>
        </div>
      ) : (
        <div className="bg-card border border-border rounded-lg overflow-hidden flex flex-col max-h-96 overflow-y-auto">
          <div className="sticky top-0 bg-secondary/50 border-b border-border">
            <div className="grid grid-cols-12 gap-4 px-4 py-3 text-xs font-semibold text-muted-foreground">
              <div className="col-span-4">Name</div>
              <div className="col-span-2">Size</div>
              <div className="col-span-2">Status</div>
              <div className="col-span-2">Date</div>
              <div className="col-span-2">Actions</div>
            </div>
          </div>

          <div className="divide-y divide-border">
            {documents.map(doc => (
              <div
                key={doc.id}
                onMouseEnter={() => setHoveredId(doc.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="grid grid-cols-12 gap-4 px-4 py-4 items-center hover:bg-secondary/30 transition-colors"
              >
                <div className="col-span-4">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{getTypeIcon(doc.name)}</span>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{doc.name}</p>
                    </div>
                  </div>
                </div>

                <div className="col-span-2">
                  <p className="text-sm text-muted-foreground">{formatFileSize(doc.size)}</p>
                </div>

                <div className="col-span-2">
                  <span className={`text-xs px-2 py-1 rounded-full ${getStatusBadge(doc.status)}`}>
                    {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                  </span>
                </div>

                <div className="col-span-2">
                  <p className="text-sm text-muted-foreground">{doc.uploadDate.toLocaleDateString()}</p>
                </div>

                <div className="col-span-2 flex gap-1 justify-end">
                  {hoveredId === doc.id && (
                    <div className="flex gap-1">
                      <button
                        onClick={() => setViewingId(doc.id)}
                        className="p-1.5 hover:bg-secondary rounded transition-colors"
                        title="View details"
                      >
                        <Eye size={16} className="text-blue-400" />
                      </button>
                      <button
                        onClick={() => setEditingId(doc.id)}
                        className="p-1.5 hover:bg-secondary rounded transition-colors"
                        title="Edit"
                      >
                        <Edit2 size={16} className="text-cyan-400" />
                      </button>
                      <button
                        className="p-1.5 hover:bg-secondary rounded transition-colors"
                        title="Download"
                      >
                        <Download size={16} className="text-green-400" />
                      </button>
                      <button
                        onClick={() => onDelete(doc.id)}
                        className="p-1.5 hover:bg-red-500/20 rounded transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={16} className="text-red-400" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {editingDoc && (
        <EditDocumentModal
          isOpen={!!editingId}
          document={editingDoc}
          onClose={() => setEditingId(null)}
          onSave={(updates) => {
            onUpdate(editingDoc.id, updates)
            setEditingId(null)
          }}
        />
      )}

      {viewingDoc && (
        <DocumentDetailsModal
          isOpen={!!viewingId}
          document={viewingDoc}
          onClose={() => setViewingId(null)}
        />
      )}
    </div>
  )
}
