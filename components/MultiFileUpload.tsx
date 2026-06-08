'use client'

import { useState, useRef } from 'react'
import { Upload, X } from 'lucide-react'
import UploadProgressItem from './UploadProgressItem'
import { isValidFileType } from '@/lib/fileTypeDetector'

interface UploadingFile {
  id: string
  file: File
  progress: number
  status: 'pending' | 'uploading' | 'success' | 'error'
  speed?: string
  timeRemaining?: string
  error?: string
}

interface MultiFileUploadProps {
  onFilesSelected: (files: File[]) => void
  accept?: string
  multiple?: boolean
}

export default function MultiFileUpload({
  onFilesSelected,
  accept = '.pdf,.xlsx,.xls,.csv,.docx,.doc,.json,.txt',
  multiple = true,
}: MultiFileUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [uploadingFiles, setUploadingFiles] = useState<UploadingFile[]>([])
  const [isDragging, setIsDragging] = useState(false)

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return

    const validFiles: File[] = []
    const newUploads: UploadingFile[] = []

    Array.from(files).forEach(file => {
      if (isValidFileType(file)) {
        validFiles.push(file)
        newUploads.push({
          id: Math.random().toString(36).substr(2, 9),
          file,
          progress: 0,
          status: 'pending',
        })
      }
    })

    if (newUploads.length > 0) {
      setUploadingFiles(prev => [...prev, ...newUploads])
      onFilesSelected(validFiles)

      // Simulate upload progress
      newUploads.forEach(upload => {
        simulateUpload(upload.id)
      })
    }
  }

  const simulateUpload = (uploadId: string) => {
    let progress = 0
    const interval = setInterval(() => {
      progress += Math.random() * 30
      if (progress >= 100) {
        progress = 100
        setUploadingFiles(prev =>
          prev.map(u =>
            u.id === uploadId
              ? { ...u, progress: 100, status: 'success' }
              : u
          )
        )
        clearInterval(interval)
      } else {
        setUploadingFiles(prev =>
          prev.map(u =>
            u.id === uploadId
              ? {
                  ...u,
                  progress,
                  status: 'uploading',
                  speed: `${(Math.random() * 5).toFixed(1)} MB/s`,
                  timeRemaining: `${Math.ceil((100 - progress) / 20)}s`,
                }
              : u
          )
        )
      }
    }, 500)
  }

  const handleCancel = (uploadId: string) => {
    setUploadingFiles(prev => prev.filter(u => u.id !== uploadId))
  }

  const handleCancelAll = () => {
    setUploadingFiles([])
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    handleFileSelect(e.dataTransfer.files)
  }

  const activeUploads = uploadingFiles.filter(
    u => u.status === 'uploading' || u.status === 'pending'
  )

  return (
    <div className="space-y-4">
      {/* Upload Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-colors cursor-pointer ${
          isDragging
            ? 'border-primary bg-primary/10'
            : 'border-border hover:border-primary/50'
        }`}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple={multiple}
          accept={accept}
          onChange={(e) => handleFileSelect(e.target.files)}
          className="hidden"
        />

        <Upload className="mx-auto mb-3 text-primary" size={32} />
        <p className="text-sm font-medium text-foreground mb-1">
          Drag files here or click to browse
        </p>
        <p className="text-xs text-muted-foreground mb-3">
          Supported: PDF, Excel, CSV, Word, JSON, Text
        </p>
        <button
          onClick={(e) => {
            e.stopPropagation()
            fileInputRef.current?.click()
          }}
          className="inline-block px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity text-sm font-medium"
        >
          Choose Files
        </button>
      </div>

      {/* Upload Progress */}
      {uploadingFiles.length > 0 && (
        <div className="bg-card border border-border rounded-lg p-4 space-y-3">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-semibold text-foreground">
              Uploading ({activeUploads.length} active)
            </h4>
            {activeUploads.length > 0 && (
              <button
                onClick={handleCancelAll}
                className="text-xs px-3 py-1 hover:bg-destructive/20 text-destructive rounded transition-colors"
              >
                Cancel All
              </button>
            )}
          </div>

          <div className="space-y-2 max-h-64 overflow-y-auto">
            {uploadingFiles.map(upload => (
              <UploadProgressItem
                key={upload.id}
                fileName={upload.file.name}
                progress={upload.progress}
                status={upload.status}
                speed={upload.speed}
                timeRemaining={upload.timeRemaining}
                error={upload.error}
                onCancel={() => handleCancel(upload.id)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
