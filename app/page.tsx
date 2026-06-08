'use client'

import { useState } from 'react'
import Sidebar from '@/components/Sidebar'
import ChatHistorySidebar from '@/components/ChatHistorySidebar'
import ChatInterface from '@/components/ChatInterface'
import MultiFileUpload from '@/components/MultiFileUpload'
import EnhancedDocumentList from '@/components/EnhancedDocumentList'
import CandidateUploadSection from '@/components/CandidateUploadSection'
import EnhancedCandidateList from '@/components/EnhancedCandidateList'

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

interface Candidate {
  id: string
  name: string
  email: string
  phone?: string
  position: string
  experience: number
  skills: string[]
  status: 'applied' | 'shortlisted' | 'interviewed' | 'rejected'
  resumeUrl?: string
  uploadDate: Date
}

export default function Home() {
  const [activeTab, setActiveTab] = useState('chat')
  const [currentChatId, setCurrentChatId] = useState<string | null>('1')
  const [documents, setDocuments] = useState<Document[]>([])
  const [candidates, setCandidates] = useState<Candidate[]>([])

  const handleFilesUpload = (files: File[]) => {
    const newDocs = files.map((file, idx) => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      type: file.type,
      size: file.size,
      status: 'processing' as const,
      uploadDate: new Date(),
      pages: Math.floor(Math.random() * 20) + 1,
      rows: file.name.includes('.xlsx') ? Math.floor(Math.random() * 1000) + 100 : undefined,
    }))
    setDocuments([...documents, ...newDocs])
  }

  const handleDocumentDelete = (id: string) => {
    setDocuments(documents.filter(d => d.id !== id))
  }

  const handleDocumentUpdate = (id: string, updates: Partial<Document>) => {
    setDocuments(documents.map(d => d.id === id ? { ...d, ...updates } : d))
  }

  const handleCandidateUpload = (newCandidates: any[]) => {
    setCandidates([...candidates, ...newCandidates])
  }

  const handleCandidateDelete = (id: string) => {
    setCandidates(candidates.filter(c => c.id !== id))
  }

  const handleCandidateUpdate = (id: string, updates: Partial<Candidate>) => {
    setCandidates(candidates.map(c => c.id === id ? { ...c, ...updates } : c))
  }

  const handleNewChat = () => {
    setCurrentChatId(null)
    // Reset chat to new state
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Chat History Sidebar - Only shown on chat tab */}
      {activeTab === 'chat' && (
        <ChatHistorySidebar
          onNewChat={handleNewChat}
          onSelectChat={setCurrentChatId}
          currentChatId={currentChatId}
        />
      )}

      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main className="flex-1 flex flex-col overflow-hidden">
        {activeTab === 'chat' && (
          <ChatInterface documentsCount={documents.length} candidatesCount={candidates.length} />
        )}
        
        {activeTab === 'documents' && (
          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="border-b border-border">
              <div className="max-w-7xl mx-auto px-6 py-6">
                <h1 className="text-2xl font-bold text-foreground mb-2">Documents</h1>
                <p className="text-muted-foreground">Upload PDF, Excel, CSV, Word, JSON, and text documents for RAG processing</p>
              </div>
            </div>
            <div className="flex-1 overflow-auto">
              <div className="max-w-7xl mx-auto px-6 py-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div>
                  <MultiFileUpload onFilesSelected={handleFilesUpload} />
                </div>
                <div className="lg:col-span-2">
                  <EnhancedDocumentList
                    documents={documents}
                    onDelete={handleDocumentDelete}
                    onUpdate={handleDocumentUpdate}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'candidates' && (
          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="border-b border-border">
              <div className="max-w-7xl mx-auto px-6 py-6">
                <h1 className="text-2xl font-bold text-foreground mb-2">Candidates</h1>
                <p className="text-muted-foreground">Upload resumes or add candidate information manually</p>
              </div>
            </div>
            <div className="flex-1 overflow-auto">
              <div className="max-w-7xl mx-auto px-6 py-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
                <CandidateUploadSection onUpload={handleCandidateUpload} />
                <div className="lg:col-span-2">
                  <EnhancedCandidateList
                    candidates={candidates}
                    onDelete={handleCandidateDelete}
                    onUpdate={handleCandidateUpdate}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
