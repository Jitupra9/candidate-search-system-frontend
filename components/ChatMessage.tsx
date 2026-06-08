'use client'

import { Copy, Check } from 'lucide-react'
import { useState } from 'react'
import CandidateCard from './CandidateCard'

interface ChatMessageProps {
  message: {
    id: string
    role: 'user' | 'assistant'
    content: string
    timestamp: Date
    mode?: string
  }
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (message.role === 'user') {
    return (
      <div className="flex justify-end">
        <div className="bg-primary text-primary-foreground rounded-lg p-4 max-w-xl">
          <p className="text-sm leading-relaxed">{message.content}</p>
          <p className="text-xs opacity-70 mt-2">
            {message.timestamp.toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex justify-start gap-3">
      <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center flex-shrink-0 text-accent-foreground font-bold text-xs">
        AI
      </div>
      <div className="flex-1 max-w-2xl">
        <div className="bg-card rounded-lg p-4 border border-border">
          <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">
            {message.content}
          </p>

          {/* Sample candidate results */}
          {message.content.includes('results') && (
            <div className="mt-4 space-y-3 pt-4 border-t border-border">
              <CandidateCard
                name="Rahul Sharma"
                role="Senior Python Developer"
                skills={['Python', 'FastAPI', 'Redis']}
                experience={3}
                location="Bangalore"
              />
              <CandidateCard
                name="Anita Verma"
                role="Python Developer"
                skills={['Python', 'Django', 'PostgreSQL']}
                experience={2}
                location="Delhi"
              />
            </div>
          )}

          <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
            <p className="text-xs text-muted-foreground">
              {message.timestamp.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </p>
            <button
              onClick={handleCopy}
              className="p-1.5 hover:bg-muted rounded transition-colors"
              title="Copy message"
            >
              {copied ? (
                <Check className="w-4 h-4 text-accent" />
              ) : (
                <Copy className="w-4 h-4 text-muted-foreground" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
