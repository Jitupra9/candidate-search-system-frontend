'use client'

import { Users, Loader2, Check, X } from 'lucide-react'

interface Candidate {
  id: string
  name: string
  email?: string
  phone?: string
  location?: string
  experience?: number
  skills?: string[]
  role?: string
  resumeFile?: string
  status: 'processing' | 'done' | 'failed' | 'uploaded'
  uploadedAt: string
}

interface CandidateListProps {
  candidates: Candidate[]
}

export default function CandidateList({ candidates }: CandidateListProps) {
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

  if (candidates.length === 0) {
    return (
      <div className="bg-card border border-border rounded-lg p-8 text-center">
        <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center mx-auto mb-4">
          <Users className="w-6 h-6 text-muted-foreground" />
        </div>
        <h3 className="font-semibold text-foreground mb-2">No candidates yet</h3>
        <p className="text-sm text-muted-foreground">
          Upload candidate resumes or add candidates manually
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <h3 className="font-semibold text-foreground">Candidates ({candidates.length})</h3>
      <div className="space-y-2">
        {candidates.map((candidate) => (
          <div
            key={candidate.id}
            className="bg-card border border-border rounded-lg p-4 hover:border-primary/50 transition-colors"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-foreground">{candidate.name}</h4>
                {candidate.role && (
                  <p className="text-sm text-muted-foreground mt-0.5">{candidate.role}</p>
                )}
                <div className="flex flex-wrap gap-2 mt-2">
                  {candidate.experience && (
                    <span className="inline-block px-2 py-1 bg-primary/10 text-primary text-xs rounded">
                      {candidate.experience} years exp
                    </span>
                  )}
                  {candidate.location && (
                    <span className="inline-block px-2 py-1 bg-accent/10 text-accent text-xs rounded">
                      {candidate.location}
                    </span>
                  )}
                </div>
                {candidate.skills && candidate.skills.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {candidate.skills.slice(0, 3).map((skill) => (
                      <span
                        key={skill}
                        className="inline-block px-2 py-0.5 bg-muted text-muted-foreground text-xs rounded"
                      >
                        {skill}
                      </span>
                    ))}
                    {candidate.skills.length > 3 && (
                      <span className="inline-block px-2 py-0.5 bg-muted text-muted-foreground text-xs rounded">
                        +{candidate.skills.length - 3} more
                      </span>
                    )}
                  </div>
                )}
              </div>
              <div
                className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 whitespace-nowrap flex-shrink-0 ${getStatusColor(
                  candidate.status
                )}`}
              >
                {getStatusIcon(candidate.status)}
                {candidate.status.charAt(0).toUpperCase() + candidate.status.slice(1)}
              </div>
            </div>
            {candidate.email && (
              <p className="text-xs text-muted-foreground mt-3">{candidate.email}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
