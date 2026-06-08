'use client'

import { Brain, FileText, Users, MessageSquare, Settings } from 'lucide-react'

interface SidebarProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export default function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  const navItems = [
    { id: 'chat', label: 'Chat & Search', icon: MessageSquare },
    { id: 'documents', label: 'Documents', icon: FileText },
    { id: 'candidates', label: 'Candidates', icon: Users },
  ]

  return (
    <aside className="w-64 border-r border-border bg-card flex flex-col">
      {/* Logo */}
      <div className="px-6 py-6 border-b border-border flex items-center gap-3">
        <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
          <Brain className="w-6 h-6 text-primary-foreground" />
        </div>
        <div>
          <h1 className="font-bold text-foreground text-sm">Candidate AI</h1>
          <p className="text-xs text-muted-foreground">RAG System</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-6 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.id

          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-foreground hover:bg-muted'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium text-sm">{item.label}</span>
            </button>
          )
        })}
      </nav>

      {/* Settings */}
      <div className="px-3 py-6 border-t border-border space-y-2">
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-foreground hover:bg-muted transition-colors">
          <Settings className="w-5 h-5" />
          <span className="font-medium text-sm">Settings</span>
        </button>
      </div>
    </aside>
  )
}
