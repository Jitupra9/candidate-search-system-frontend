'use client'

import { useState } from 'react'
import { Upload, FileText } from 'lucide-react'

interface DocumentUploadSectionProps {
  onUpload: (documents: any[]) => void
}

export default function DocumentUploadSection({ onUpload }: DocumentUploadSectionProps) {
  const [dragActive, setDragActive] = useState(false)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    const files = Array.from(e.dataTransfer.files)
    const documents = files
      .filter((file) => file.type === 'application/pdf' || file.type === 'text/plain')
      .map((file) => ({
        id: `doc_${Date.now()}_${Math.random()}`,
        fileName: file.name,
        fileType: file.type === 'application/pdf' ? 'pdf' : 'txt',
        status: 'processing',
        uploadedAt: new Date().toISOString(),
        pages: Math.floor(Math.random() * 20) + 5,
      }))

    if (documents.length > 0) {
      onUpload(documents)
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    const documents = files
      .filter((file) => file.type === 'application/pdf' || file.type === 'text/plain')
      .map((file) => ({
        id: `doc_${Date.now()}_${Math.random()}`,
        fileName: file.name,
        fileType: file.type === 'application/pdf' ? 'pdf' : 'txt',
        status: 'processing',
        uploadedAt: new Date().toISOString(),
        pages: Math.floor(Math.random() * 20) + 5,
      }))

    if (documents.length > 0) {
      onUpload(documents)
    }
  }

  return (
    <div className="h-full">
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors h-full flex flex-col items-center justify-center ${
          dragActive ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
        }`}
      >
        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
          <Upload className="w-6 h-6 text-primary" />
        </div>
        <h3 className="font-semibold text-foreground mb-2">Upload Documents</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Drag and drop PDF or TXT files here
        </p>
        <label className="relative">
          <input
            type="file"
            multiple
            accept=".pdf,.txt"
            onChange={handleFileInput}
            className="hidden"
          />
          <span className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium text-sm cursor-pointer hover:bg-primary/90 transition-colors inline-block">
            Choose Files
          </span>
        </label>
        <p className="text-xs text-muted-foreground mt-4">
          Supports PDF and TXT files
        </p>
      </div>
    </div>
  )
}
