'use client'

import { useState } from 'react'
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

interface EditDocumentModalProps {
  isOpen: boolean
  document: Document
  onClose: () => void
  onSave: (updates: Partial<Document>) => void
}

export default function EditDocumentModal({
  isOpen,
  document,
  onClose,
  onSave,
}: EditDocumentModalProps) {
  const [name, setName] = useState(document.name)
  const [category, setCategory] = useState('uncategorized')
  const [tags, setTags] = useState('')

  const handleSave = () => {
    onSave({
      name,
    })
  }

  return (
    <ActionModal
      isOpen={isOpen}
      title="Edit Document"
      onClose={onClose}
      size="md"
      actions={[
        {
          label: 'Save',
          onClick: handleSave,
          variant: 'primary',
        },
      ]}
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Document Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
          >
            <option value="uncategorized">Uncategorized</option>
            <option value="resumes">Resumes</option>
            <option value="job-descriptions">Job Descriptions</option>
            <option value="guidelines">Guidelines</option>
            <option value="contracts">Contracts</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Tags (comma separated)
          </label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="senior, python, remote"
            className="w-full px-3 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
          />
        </div>

        <div className="bg-secondary/30 border border-border rounded-lg p-3 space-y-2">
          <p className="text-xs font-semibold text-muted-foreground uppercase">Document Info</p>
          <div className="text-xs text-muted-foreground space-y-1">
            <p>Type: {document.type}</p>
            <p>Size: {(document.size / 1024).toFixed(1)} KB</p>
            <p>Status: {document.status}</p>
          </div>
        </div>
      </div>
    </ActionModal>
  )
}
