"use client";

import { useState } from "react";
import UnifiedSidebar from "@/components/UnifiedSidebar";
import Header from "@/components/Header";
import ChatMessage from "@/components/ChatMessage";
import ChatInput from "@/components/ChatInput";
import EmptyState from "@/components/EmptyState";
import UploadModal from "@/components/UploadModal";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export default function Home() {
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [chatHistories, setChatHistories] = useState<{
    [key: string]: Message[];
  }>({
    "1": [
      {
        id: "msg-1",
        role: "user",
        content: "Find Python developers with 5+ years experience",
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      },
      {
        id: "msg-2",
        role: "assistant",
        content:
          "I found 3 Python developers matching your criteria with strong backend experience in FastAPI and Django.",
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000 + 5000),
      },
    ],
    "2": [
      {
        id: "msg-3",
        role: "user",
        content: "Looking for senior-level developers",
        timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
      },
      {
        id: "msg-4",
        role: "assistant",
        content:
          "Found 5 senior developers with 10+ years of experience. Would you like more details?",
        timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000 + 5000),
      },
    ],
    "3": [
      {
        id: "msg-5",
        role: "user",
        content: "Technical skills matching for frontend roles",
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      },
      {
        id: "msg-6",
        role: "assistant",
        content:
          "I found several candidates with expertise in React, Vue, and Angular.",
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000 + 5000),
      },
    ],
  });

  const handleNewChat = () => {
    const newChatId = `chat-${Date.now()}`;
    setCurrentChatId(newChatId);
    setMessages([
      {
        id: `msg-${Date.now()}`,
        role: "assistant",
        content:
          "Hello! I'm ready to help you find and analyze candidates. You can ask me questions about their skills, experience, and qualifications.",
        timestamp: new Date(),
      },
    ]);
    setChatHistories((prev) => ({ ...prev, [newChatId]: messages }));
  };

  const handleSendMessage = (message: string, model: string) => {
    const userMessage: Message = {
      id: `msg-${Date.now()}`,
      role: "user",
      content: message,
      timestamp: new Date(),
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: `msg-${Date.now() + 1}`,
        role: "assistant",
        content: `I've analyzed your query about candidates using ${model}. Based on the uploaded resumes and your search criteria, I found several matching candidates with relevant skills and experience. You can further refine the search by specifying skills, experience level, or other requirements.`,
        timestamp: new Date(),
      };
      const finalMessages = [...updatedMessages, aiMessage];
      setMessages(finalMessages);
      if (currentChatId) {
        setChatHistories((prev) => ({
          ...prev,
          [currentChatId]: finalMessages,
        }));
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleSelectChat = (chatId: string) => {
    setCurrentChatId(chatId);
    setMessages(chatHistories[chatId] || []);
  };

  const isChatStarted = currentChatId !== null && messages.length > 0;

  return (
    <div className="flex h-screen bg-background">
      {/* Unified Sidebar */}
      <UnifiedSidebar
        onNewChat={handleNewChat}
        onSelectChat={handleSelectChat}
        currentChatId={currentChatId}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onUploadClick={() => setIsUploadModalOpen(true)} />
        <div className="flex-1 flex flex-col overflow-hidden">
          {!isChatStarted ? (
            <EmptyState
              onNewChat={handleNewChat}
              onSendMessage={handleSendMessage}
              onUploadClick={() => setIsUploadModalOpen(true)}
            />
          ) : (
            <>
              <div className="flex-1 overflow-y-auto p-6">
                <div className="max-w-3xl mx-auto">
                  {messages.map((msg) => (
                    <ChatMessage key={msg.id} message={msg} />
                  ))}
                  {isLoading && (
                    <div className="flex justify-start mb-4 gap-3">
                      <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center shrink-0 text-accent-foreground font-bold text-xs">
                        AI
                      </div>
                      <div className="bg-card rounded-xl px-4 py-3 border border-border">
                        <div className="flex gap-2">
                          <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" />
                          <div
                            className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce"
                            style={{ animationDelay: "0.1s" }}
                          />
                          <div
                            className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <ChatInput
                onSendMessage={handleSendMessage}
                onUploadClick={() => setIsUploadModalOpen(true)}
                isLoading={isLoading}
              />
            </>
          )}
        </div>
      </div>

      <UploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
      />
    </div>
  );
}
