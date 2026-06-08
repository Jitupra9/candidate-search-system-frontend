'use client'

import { useState } from 'react'
import { Trash2, Plus, Search, Pin, Clock } from 'lucide-react'

interface ChatSession {
  id: string
  title: string
  timestamp: Date
  isPinned: boolean
}

interface ChatHistorySidebarProps {
  onNewChat: () => void
  onSelectChat: (chatId: string) => void
  currentChatId: string | null
}

export default function ChatHistorySidebar({ onNewChat, onSelectChat, currentChatId }: ChatHistorySidebarProps) {
  const [chats, setChats] = useState<ChatSession[]>([
    {
      id: '1',
      title: 'Q&A about candidates',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      isPinned: true,
    },
    {
      id: '2',
      title: 'Senior developers search',
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
      isPinned: false,
    },
    {
      id: '3',
      title: 'Technical skills matching',
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      isPinned: false,
    },
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  const handleDeleteChat = (e: React.MouseEvent, chatId: string) => {
    e.stopPropagation()
    setChats(chats.filter(chat => chat.id !== chatId))
  }

  const handlePinChat = (e: React.MouseEvent, chatId: string) => {
    e.stopPropagation()
    setChats(chats.map(chat =>
      chat.id === chatId ? { ...chat, isPinned: !chat.isPinned } : chat
    ))
  }

  const formatTime = (date: Date) => {
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 1) return 'Just now'
    if (diffMins < 60) return `${diffMins}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    if (diffDays < 7) return `${diffDays}d ago`
    return date.toLocaleDateString()
  }

  const pinnedChats = chats.filter(chat => chat.isPinned)
  const unpinnedChats = chats.filter(chat => !chat.isPinned)
  const filteredChats = chats.filter(chat =>
    chat.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="w-64 bg-card border-r border-border h-screen flex flex-col overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <button
          onClick={onNewChat}
          className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground px-3 py-2 rounded-lg hover:opacity-90 transition-opacity mb-3"
        >
          <Plus size={18} />
          <span className="text-sm font-medium">New Chat</span>
        </button>

        {/* Search */}
        <div className="relative">
          <Search size={16} className="absolute left-3 top-2.5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search chats..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-sm bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        {filteredChats.length === 0 ? (
          <div className="p-4 text-center text-muted-foreground text-sm">
            {searchTerm ? 'No chats found' : 'No chat history'}
          </div>
        ) : (
          <>
            {pinnedChats.length > 0 && (
              <div>
                <div className="px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Pinned
                </div>
                {pinnedChats.map(chat => (
                  <ChatItem
                    key={chat.id}
                    chat={chat}
                    isActive={chat.id === currentChatId}
                    isHovered={hoveredId === chat.id}
                    onSelect={() => onSelectChat(chat.id)}
                    onHover={() => setHoveredId(chat.id)}
                    onHoverLeave={() => setHoveredId(null)}
                    onDelete={(e) => handleDeleteChat(e, chat.id)}
                    onPin={(e) => handlePinChat(e, chat.id)}
                    formatTime={formatTime}
                  />
                ))}
              </div>
            )}

            {unpinnedChats.length > 0 && (
              <div>
                {pinnedChats.length > 0 && (
                  <div className="px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Recent
                  </div>
                )}
                {unpinnedChats.map(chat => (
                  <ChatItem
                    key={chat.id}
                    chat={chat}
                    isActive={chat.id === currentChatId}
                    isHovered={hoveredId === chat.id}
                    onSelect={() => onSelectChat(chat.id)}
                    onHover={() => setHoveredId(chat.id)}
                    onHoverLeave={() => setHoveredId(null)}
                    onDelete={(e) => handleDeleteChat(e, chat.id)}
                    onPin={(e) => handlePinChat(e, chat.id)}
                    formatTime={formatTime}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

interface ChatItemProps {
  chat: ChatSession
  isActive: boolean
  isHovered: boolean
  onSelect: () => void
  onHover: () => void
  onHoverLeave: () => void
  onDelete: (e: React.MouseEvent) => void
  onPin: (e: React.MouseEvent) => void
  formatTime: (date: Date) => string
}

function ChatItem({
  chat,
  isActive,
  isHovered,
  onSelect,
  onHover,
  onHoverLeave,
  onDelete,
  onPin,
  formatTime,
}: ChatItemProps) {
  return (
    <button
      onClick={onSelect}
      onMouseEnter={onHover}
      onMouseLeave={onHoverLeave}
      className={`w-full px-4 py-3 text-left border-b border-border/50 transition-colors ${
        isActive ? 'bg-primary/10 border-l-2 border-l-primary' : 'hover:bg-secondary/50'
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-foreground truncate">{chat.title}</p>
          <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
            <Clock size={12} />
            <span>{formatTime(chat.timestamp)}</span>
          </div>
        </div>

        {isHovered && (
          <div className="flex gap-1 flex-shrink-0">
            <button
              onClick={onPin}
              title={chat.isPinned ? 'Unpin' : 'Pin'}
              className="p-1 hover:bg-secondary rounded transition-colors"
            >
              <Pin size={14} className={chat.isPinned ? 'fill-accent text-accent' : 'text-muted-foreground'} />
            </button>
            <button
              onClick={onDelete}
              title="Delete"
              className="p-1 hover:bg-destructive/10 rounded transition-colors"
            >
              <Trash2 size={14} className="text-destructive" />
            </button>
          </div>
        )}
      </div>
    </button>
  )
}
