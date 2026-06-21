"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Pin, Search } from "lucide-react";

interface ChatSession {
  id: string;
  title: string;
  timestamp: Date;
  isPinned: boolean;
}

interface UnifiedSidebarProps {
  onNewChat: () => void;
  onSelectChat: (chatId: string) => void;
  currentChatId: string | null;
}

export default function UnifiedSidebar({
  onNewChat,
  onSelectChat,
  currentChatId,
}: UnifiedSidebarProps) {
  const [chats, setChats] = useState<ChatSession[]>([
    {
      id: "1",
      title: "Q&A about candidates",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      isPinned: true,
    },
    {
      id: "2",
      title: "Senior developers search",
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
      isPinned: false,
    },
    {
      id: "3",
      title: "Technical skills matching",
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      isPinned: false,
    },
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleDeleteChat = (e: React.MouseEvent, chatId: string) => {
    e.stopPropagation();
    setChats(chats.filter((chat) => chat.id !== chatId));
  };

  const handlePinChat = (e: React.MouseEvent, chatId: string) => {
    e.stopPropagation();
    setChats(
      chats.map((chat) =>
        chat.id === chatId ? { ...chat, isPinned: !chat.isPinned } : chat,
      ),
    );
  };

  const handleRowKeyDown = (e: React.KeyboardEvent, chatId: string) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onSelectChat(chatId);
    }
  };

  const formatTime = (date: Date) => {
    if (!isMounted) return "--";
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m`;
    if (diffHours < 24) return `${diffHours}h`;
    if (diffDays < 7) return `${diffDays}d`;
    return date.toLocaleDateString();
  };

  const pinnedChats = chats.filter((c) => c.isPinned);
  const recentChats = chats.filter((c) => !c.isPinned);
  const filteredRecent = recentChats.filter((c) =>
    c.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="w-64 bg-card border-r border-border flex flex-col h-screen">
      {/* Header */}
      <div className="p-4 border-b border-border space-y-3">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
            AI
          </div>
          <div className="flex-1">
            <h1 className="text-lg font-bold text-foreground">Candidate AI</h1>
            <p className="text-xs text-muted-foreground">
              Find & match with AI
            </p>
          </div>
        </div>
        <button
          onClick={onNewChat}
          className="w-full px-3 py-2 bg-primary text-primary-foreground rounded-lg font-medium text-sm hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" />
          New Chat
        </button>
      </div>

      {/* Search */}
      <div className="p-3 border-b border-border">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search chats..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-8 pr-3 py-2 bg-muted border border-border rounded-lg text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        {/* Pinned Chats */}
        {pinnedChats.length > 0 && (
          <div className="px-2 py-3">
            <p className="text-xs font-semibold text-muted-foreground px-2 mb-2 uppercase tracking-wider">
              Pinned
            </p>
            <div className="space-y-2">
              {pinnedChats.map((chat) => (
                <div
                  key={chat.id}
                  role="button"
                  tabIndex={0}
                  onClick={() => onSelectChat(chat.id)}
                  onKeyDown={(e) => handleRowKeyDown(e, chat.id)}
                  className={`w-full text-left px-3 py-2.5 rounded-lg transition-colors group cursor-pointer ${
                    currentChatId === chat.id
                      ? "bg-primary/20 text-foreground"
                      : "text-foreground/70 hover:bg-muted"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {chat.title}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {formatTime(chat.timestamp)}
                      </p>
                    </div>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                      <button
                        onClick={(e) => handlePinChat(e, chat.id)}
                        className="p-1 hover:bg-background rounded"
                        title="Unpin"
                      >
                        <Pin className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={(e) => handleDeleteChat(e, chat.id)}
                        className="p-1 hover:bg-background rounded"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recent Chats */}
        {filteredRecent.length > 0 && (
          <div className="px-2 py-3">
            <p className="text-xs font-semibold text-muted-foreground px-2 mb-2 uppercase tracking-wider">
              Recent
            </p>
            <div className="space-y-2">
              {filteredRecent.map((chat) => (
                <div
                  key={chat.id}
                  role="button"
                  tabIndex={0}
                  onClick={() => onSelectChat(chat.id)}
                  onKeyDown={(e) => handleRowKeyDown(e, chat.id)}
                  className={`w-full text-left px-3 py-2.5 rounded-lg transition-colors group cursor-pointer ${
                    currentChatId === chat.id
                      ? "bg-primary/20 text-foreground"
                      : "text-foreground/70 hover:bg-muted"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {chat.title}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {formatTime(chat.timestamp)}
                      </p>
                    </div>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                      <button
                        onClick={(e) => handlePinChat(e, chat.id)}
                        className="p-1 hover:bg-background rounded"
                        title="Pin"
                      >
                        <Pin className="w-3.5 h-3.5 opacity-50" />
                      </button>
                      <button
                        onClick={(e) => handleDeleteChat(e, chat.id)}
                        className="p-1 hover:bg-background rounded"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {filteredRecent.length === 0 && pinnedChats.length === 0 && (
          <div className="px-4 py-8 text-center">
            <p className="text-sm text-muted-foreground">No chats yet</p>
          </div>
        )}
      </div>
    </div>
  );
}
