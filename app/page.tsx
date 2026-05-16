"use client";
import React, { useState, useRef, useEffect, useCallback } from "react";
import { AVAILABLE_MODELS, PROJECT_COLORS } from "@/lib/constant";
import Link from "next/link";
import {
  BookOpen,
  Menu,
  Plus,
  Send,
  MessageSquare,
  Trash2,
  Moon,
  Sun,
  User,
  Bot,
  Leaf,
  ChevronRight,
  Paperclip,
  Image as ImageIcon,
  FileText,
  X,
  Upload,
  File,
  Mic,
  StopCircle,
  ChevronDown,
  Cpu,
  LogIn,
  Settings,
  Crown,
  Zap,
  Search,
  FolderPlus,
  Globe,
  Code,
  Check,
  MoreHorizontal,
  Edit3,
  Copy,
  Pin,
  Archive,
  Keyboard,
  ChevronLeft,
  PanelLeftClose,
  PanelLeft,
  EyeOff,
  Mail,
  MessageCircle,
  Download,
  RefreshCw,
  Star,
  ThumbsUp,
  ThumbsDown,
  Pencil,
  RotateCcw,
} from "lucide-react";
import { getAIResponse } from "@/components/Mock/MockResponse";
import VoiceListeningModal from "@/components/Models/VoiceListeningModal";
import VoiceRecoder from "@/components/VoiceRecoder";
import ModelSelector from "@/components/Models/ModelSelector";
import PendingAttachment from "@/components/Models/PendingAttachment";
import CodeSnippetBox from "@/components/Models/CodeSnippetBox";
import ChatMessage from "@/components/ChatMessage";
import TypingLoader from "@/components/skeleton/TypingLoader";
import FileUploadModal from "@/components/Models/FileUploadModal";
import CodeInputModal from "@/components/Models/CodeInputModal";
import ProjectModel from "@/components/Models/ProjectModel";
import SettingsModal from "@/components/Models/SettingsModal";
import SearchModal from "@/components/Models/SearchModal";
import UpgradeModal from "@/components/Models/UpgradeModal";
import DeleteModal from "@/components/Models/DeleteModal";
import ChatContextMenu from "@/components/Models/ChatContextMenu";

// ============ Header Component ============
const Header = ({
  onToggleSidebar,
  onOpenSearch,
  onOpenSettings,
  isTemporaryChat,
  onToggleTemporaryChat,
}: {
  onToggleSidebar: () => void;
  onOpenSearch: () => void;
  onOpenSettings: () => void;
  isTemporaryChat: boolean;
  onToggleTemporaryChat: () => void;
}) => {
  const [showLoginModal, setShowLoginModal] = useState(false);

  return (
    <>
      <header className="h-14 border-b border-border bg-card/80 backdrop-blur-xl flex items-center justify-between px-4 sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <button
            onClick={onToggleSidebar}
            className="p-2 rounded-xl hover:bg-secondary transition-colors md:hidden"
          >
            <Menu className="w-5 h-5" />
          </button>
          <button
            onClick={onOpenSearch}
            className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-secondary/50 hover:bg-secondary border border-border/50 rounded-xl text-sm text-muted-foreground transition-colors"
          >
            <Search className="w-4 h-4" />
            <span>Search previous chat</span>
            <kbd className="ml-4 px-1.5 py-0.5 bg-background border border-border rounded text-xs">
              ⌘K
            </kbd>
          </button>
        </div>

        <div className="flex items-center gap-1">
          <div className="relative group">
            <button
              onClick={onToggleTemporaryChat}
              className={`p-2 rounded-xl transition-colors flex items-center gap-1.5 ${
                isTemporaryChat
                  ? "bg-accent/20 text-accent"
                  : "hover:bg-secondary text-muted-foreground"
              }`}
            >
              <EyeOff className="w-5 h-5" />
            </button>
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-2 bg-foreground text-background text-xs rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 shadow-lg">
              {isTemporaryChat
                ? "Temporary chat ON - History won't be saved"
                : "Open temporary chat"}
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-foreground rotate-45" />
            </div>
          </div>
          <button
            onClick={onOpenSettings}
            className="p-2 rounded-xl hover:bg-secondary transition-colors"
          >
            <Settings className="w-5 h-5 text-muted-foreground" />
          </button>
          <button
            onClick={() => setShowLoginModal(true)}
            className="ml-2 flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-xl font-medium text-sm hover:opacity-90 transition-all shadow-lg shadow-primary/20"
          >
            <LogIn className="w-4 h-4" />
            <span className="hidden sm:inline">Sign In</span>
          </button>
        </div>
      </header>

      {showLoginModal && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-2xl max-w-md w-full p-8 border border-border shadow-2xl relative">
            <button
              onClick={() => setShowLoginModal(false)}
              className="absolute top-4 right-4 p-2 hover:bg-secondary rounded-xl transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-primary to-accent flex items-center justify-center mx-auto mb-4 shadow-lg shadow-primary/20">
                <Leaf className="w-8 h-8 text-primary-foreground" />
              </div>
              <h2 className="text-2xl font-bold">Welcome to MindLeaf</h2>
              <p className="text-muted-foreground text-sm mt-2">
                Sign in to unlock all features
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full mt-2 px-4 py-3 bg-secondary border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full mt-2 px-4 py-3 bg-secondary border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
              <button className="w-full py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:opacity-90 transition-all shadow-lg shadow-primary/20">
                Sign In
              </button>
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border"></div>
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="px-2 bg-card text-muted-foreground">
                    or continue with
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <button className="flex items-center justify-center gap-2 py-3 border border-border rounded-xl hover:bg-secondary transition-colors text-sm font-medium">
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Google
                </button>
                <button className="flex items-center justify-center gap-2 py-3 border border-border rounded-xl hover:bg-secondary transition-colors text-sm font-medium">
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  GitHub
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// ============ Sidebar Component ============
const ChatSidebar = ({
  chats,
  currentChatId,
  projects,
  currentProjectId,
  onNewChat,
  onSelectChat,
  onDeleteChat,
  onRenameChat,
  onPinChat,
  onArchiveChat,
  onExportChat,
  onClearAllChats,
  isOpen,
  onToggle,
  onUpgradeClick,
  showUpgradeBanner,
  onCloseUpgradeBanner,
  onCreateProject,
  onEditProject,
  onDeleteProject,
  onSelectProject,
  isCollapsed,
  onToggleCollapse,
}: {
  chats: ChatSession[];
  currentChatId: string | null;
  projects: Project[];
  currentProjectId: string | null;
  onNewChat: () => void;
  onSelectChat: (id: string) => void;
  onDeleteChat: (id: string) => void;
  onRenameChat: (id: string, title: string) => void;
  onPinChat: (id: string) => void;
  onArchiveChat: (id: string) => void;
  onExportChat: (id: string) => void;
  onClearAllChats: () => void;
  isOpen: boolean;
  onToggle: () => void;
  onUpgradeClick?: () => void;
  showUpgradeBanner?: boolean;
  onCloseUpgradeBanner?: () => void;
  onCreateProject: () => void;
  onEditProject: (project: Project) => void;
  onDeleteProject: (id: string) => void;
  onSelectProject: (id: string | null) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}) => {
  const [contextMenu, setContextMenu] = useState<{
    chat: ChatSession;
    position: { x: number; y: number };
  } | null>(null);
  const [projectMenuOpen, setProjectMenuOpen] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<"chats" | "projects">(
    "chats",
  );

  const filteredChats = chats.filter((c) => {
    if (currentProjectId) return c.projectId === currentProjectId;
    return !c.isArchived;
  });

  const pinnedChats = filteredChats.filter((c) => c.isPinned);
  const regularChats = filteredChats.filter((c) => !c.isPinned);

  if (isCollapsed) {
    return (
      <aside className="hidden md:flex w-16 bg-sidebar border-r border-sidebar-border flex-col h-full">
        <div className="p-3 border-b border-sidebar-border flex items-center justify-center">
          <button
            onClick={onToggleCollapse}
            className="w-10 h-10 rounded-xl bg-sidebar-accent hover:bg-primary/20 flex items-center justify-center transition-all"
            title="Expand sidebar"
          >
            <PanelLeft className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>
        <div className="p-2">
          <button
            onClick={onNewChat}
            className="w-full flex items-center justify-center p-3 bg-primary hover:opacity-90 text-primary-foreground rounded-xl transition-all shadow-lg shadow-primary/20"
            title="New Chat"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
        <div className="px-2 py-1">
          <button
            onClick={onCreateProject}
            className="w-full flex items-center justify-center p-3 hover:bg-sidebar-accent rounded-xl transition-colors text-muted-foreground hover:text-foreground"
            title="Create Project"
          >
            <FolderPlus className="w-5 h-5" />
          </button>
        </div>
        <div className="flex-1" />
        <div className="p-2 border-t border-sidebar-border">
          <button
            className="w-full flex items-center justify-center p-2 hover:bg-sidebar-accent rounded-xl transition-colors"
            title="Guest User"
          >
            <div className="w-8 h-8 rounded-xl bg-linear-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-semibold text-sm">
              G
            </div>
          </button>
        </div>
      </aside>
    );
  }

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
          onClick={onToggle}
        />
      )}
      <aside
        className={`fixed top-0 left-0 h-full w-72 bg-sidebar border-r border-sidebar-border transform transition-transform duration-300 z-50 flex flex-col ${
          isOpen ? "translate-x-0" : "-translate-x-72"
        } md:relative md:translate-x-0`}
      >
        <div className="p-4 border-b border-sidebar-border flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-linear-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/20">
              <Leaf className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-bold text-base">MindLeaf</h1>
              <p className="text-xs text-muted-foreground">
                Intelligent Assistant
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={onToggleCollapse}
              className="hidden md:flex p-2 rounded-xl hover:bg-sidebar-accent transition-colors"
              title="Collapse sidebar"
            >
              <PanelLeftClose className="w-5 h-5 text-muted-foreground" />
            </button>
            <button
              onClick={onToggle}
              className="p-2 rounded-xl hover:bg-sidebar-accent transition-colors md:hidden"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="px-3 pt-3 pb-2">
          <button
            onClick={onNewChat}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-primary hover:opacity-90 text-primary-foreground rounded-xl font-medium text-sm transition-all shadow-lg shadow-primary/20"
          >
            <Plus className="w-4 h-4" /> New Chat
          </button>
        </div>

        <div className="px-3 py-2">
          <div className="flex rounded-xl bg-sidebar-accent/50 p-1">
            <button
              onClick={() => {
                setActiveSection("chats");
                onSelectProject(null);
              }}
              className={`flex-1 py-2 px-3 text-sm font-medium rounded-lg transition-all ${
                activeSection === "chats"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Chats
            </button>
            <button
              onClick={() => setActiveSection("projects")}
              className={`flex-1 py-2 px-3 text-sm font-medium rounded-lg transition-all ${
                activeSection === "projects"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Projects
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-3 py-2">
          {activeSection === "chats" ? (
            <>
              {pinnedChats.length > 0 && (
                <>
                  <p className="px-2 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1">
                    <Pin className="w-3 h-3" /> Pinned
                  </p>
                  <div className="space-y-0.5 mb-3">
                    {pinnedChats.map((chat) => (
                      <div
                        key={chat.id}
                        className={`group flex items-center gap-2 px-3 py-2.5 rounded-xl cursor-pointer transition-all duration-200 ${
                          currentChatId === chat.id
                            ? "bg-sidebar-accent text-sidebar-accent-foreground"
                            : "hover:bg-sidebar-accent/50"
                        }`}
                        onClick={() => onSelectChat(chat.id)}
                        onContextMenu={(e) => {
                          e.preventDefault();
                          setContextMenu({
                            chat,
                            position: { x: e.clientX, y: e.clientY },
                          });
                        }}
                      >
                        <span className="flex-1 text-sm truncate">
                          {chat.title}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setContextMenu({
                              chat,
                              position: { x: e.clientX, y: e.clientY },
                            });
                          }}
                          className="opacity-0 group-hover:opacity-100 p-1 rounded-lg hover:bg-secondary transition-all"
                        >
                          <MoreHorizontal className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </>
              )}

              <div className="flex items-center justify-between px-2 py-1.5">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Recent
                </p>
                {regularChats.length > 0 && (
                  <button
                    onClick={onClearAllChats}
                    className="p-1 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
                    title="Clear all chats"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
              {regularChats.length === 0 ? (
                <div className="text-center text-muted-foreground text-sm py-8">
                  <p>No conversations yet</p>
                  <p className="text-xs mt-1">Start a new chat to begin</p>
                </div>
              ) : (
                <div className="space-y-0.5">
                  {regularChats.map((chat) => (
                    <div
                      key={chat.id}
                      className={`group flex items-center gap-2 px-3 py-2.5 rounded-xl cursor-pointer transition-all duration-200 ${
                        currentChatId === chat.id
                          ? "bg-sidebar-accent text-sidebar-accent-foreground"
                          : "hover:bg-sidebar-accent/50"
                      }`}
                      onClick={() => onSelectChat(chat.id)}
                      onContextMenu={(e) => {
                        e.preventDefault();
                        setContextMenu({
                          chat,
                          position: { x: e.clientX, y: e.clientY },
                        });
                      }}
                    >
                      <span className="flex-1 text-sm truncate">
                        {chat.title}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setContextMenu({
                            chat,
                            position: { x: e.clientX, y: e.clientY },
                          });
                        }}
                        className="opacity-0 group-hover:opacity-100 p-1 rounded-lg hover:bg-secondary transition-all"
                      >
                        <MoreHorizontal className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            <>
              <div className="flex items-center justify-between px-2 py-1.5">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Your Projects
                </p>
                <button
                  onClick={onCreateProject}
                  className="p-1 rounded-lg hover:bg-sidebar-accent text-muted-foreground hover:text-foreground transition-colors"
                  title="Create Project"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {projects.length === 0 ? (
                <div className="text-center text-muted-foreground text-sm py-8">
                  <FolderPlus className="w-8 h-8 mx-auto mb-2 opacity-40" />
                  <p>No projects yet</p>
                  <button
                    onClick={onCreateProject}
                    className="text-xs mt-2 text-primary hover:underline"
                  >
                    Create your first project
                  </button>
                </div>
              ) : (
                <div className="space-y-0.5">
                  {projects.map((project) => (
                    <div key={project.id} className="relative group">
                      <button
                        onClick={() => {
                          onSelectProject(project.id);
                          setActiveSection("chats");
                        }}
                        className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm transition-colors ${
                          currentProjectId === project.id
                            ? "bg-sidebar-accent text-sidebar-accent-foreground"
                            : "hover:bg-sidebar-accent/50"
                        }`}
                      >
                        <div
                          className={`w-3 h-3 rounded-sm ${project.color}`}
                        ></div>
                        <span className="flex-1 text-left truncate">
                          {project.name}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {project.chatCount}
                        </span>
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setProjectMenuOpen(
                            projectMenuOpen === project.id ? null : project.id,
                          );
                        }}
                        className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 p-1 rounded-lg hover:bg-secondary transition-all"
                      >
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                      {projectMenuOpen === project.id && (
                        <div className="absolute right-0 top-full mt-1 bg-card border border-border rounded-xl shadow-xl py-1 z-50 min-w-32">
                          <button
                            onClick={() => {
                              onEditProject(project);
                              setProjectMenuOpen(null);
                            }}
                            className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-secondary"
                          >
                            <Edit3 className="w-4 h-4" />
                            Edit
                          </button>
                          <button
                            onClick={() => {
                              onDeleteProject(project.id);
                              setProjectMenuOpen(null);
                            }}
                            className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-secondary text-destructive"
                          >
                            <Trash2 className="w-4 h-4" />
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        {showUpgradeBanner && (
          <div className="p-3 ">
            <div className="relative bg-linear-to-br from-primary/10 to-accent/10 rounded-xl p-3 border border-primary/20">
              <button
                onClick={onCloseUpgradeBanner}
                className="absolute top-2 right-2 p-1 rounded-lg hover:bg-sidebar-accent/50 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
              <div className="flex items-center gap-2 mb-1">
                <Crown className="w-4 h-4 text-primary" />
                <span className="font-semibold text-sm">Upgrade to Pro</span>
              </div>
              <p className="text-xs text-muted-foreground mb-2">
                Unlock unlimited chats & more
              </p>
              <button
                onClick={onUpgradeClick}
                className="w-full flex items-center justify-center gap-1 py-2 bg-primary text-primary-foreground rounded-lg text-xs font-medium hover:opacity-90 transition-all"
              >
                <Zap className="w-3 h-3" />
                Upgrade Now
              </button>
            </div>
          </div>
        )}

        <div className="p-3 border-t border-sidebar-border space-y-2">
          <button className="w-full flex items-center gap-2 hover:bg-sidebar-accent px-2 py-2 rounded-xl transition-colors">
            <div className="w-8 h-8 rounded-xl bg-linear-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-semibold text-sm">
              G
            </div>
            <div className="flex-1 text-left">
              <p className="text-sm font-medium">Guest User</p>
              <p className="text-xs text-muted-foreground">Free Plan</p>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
      </aside>

      {contextMenu && (
        <ChatContextMenu
          chat={contextMenu.chat}
          position={contextMenu.position}
          onRename={() => {
            const newTitle = prompt("Enter new title:", contextMenu.chat.title);
            if (newTitle) onRenameChat(contextMenu.chat.id, newTitle);
          }}
          onPin={() => onPinChat(contextMenu.chat.id)}
          onArchive={() => onArchiveChat(contextMenu.chat.id)}
          onExport={() => onExportChat(contextMenu.chat.id)}
          onDelete={() => onDeleteChat(contextMenu.chat.id)}
          onClose={() => setContextMenu(null)}
        />
      )}
    </>
  );
};

// ============ Main Component ============
export default function Home() {
  const [chats, setChats] = useState<ChatSession[]>([]);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentProjectId, setCurrentProjectId] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isFileUploadOpen, setIsFileUploadOpen] = useState(false);
  const [pendingFiles, setPendingFiles] = useState<UploadedFile[]>([]);
  const [selectedModel, setSelectedModel] = useState<AIModel>(
    AVAILABLE_MODELS[0],
  );
  const [webSearchEnabled, setWebSearchEnabled] = useState(false);
  const [codeSnippets, setCodeSnippets] = useState<CodeSnippet[]>([]);
  const [isCodeModalOpen, setIsCodeModalOpen] = useState(false);
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
  const [showUpgradeBanner, setShowUpgradeBanner] = useState(true);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState<{
    type: "chat" | "project";
    id: string;
  } | null>(null);
  const [copiedMessage, setCopiedMessage] = useState(false);
  const [isTemporaryChat, setIsTemporaryChat] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const currentChat = chats.find((chat) => chat.id === currentChatId);
  const messages = currentChat?.messages || [];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  useEffect(() => {
    const savedChats = localStorage.getItem("nexus-chats");
    if (savedChats) {
      try {
        const parsed = JSON.parse(savedChats);
        const restored = parsed.map((chat: ChatSession) => ({
          ...chat,
          createdAt: new Date(chat.createdAt),
          updatedAt: new Date(chat.updatedAt),
          messages: chat.messages.map((msg: Message) => ({
            ...msg,
            timestamp: new Date(msg.timestamp),
            attachments: msg.attachments || [],
          })),
        }));
        setChats(restored);
        if (restored.length > 0) setCurrentChatId(restored[0].id);
      } catch {
        // ignore
      }
    }

    const savedProjects = localStorage.getItem("nexus-projects");
    if (savedProjects) {
      try {
        const parsed = JSON.parse(savedProjects);
        setProjects(
          parsed.map((p: Project) => ({
            ...p,
            createdAt: new Date(p.createdAt),
          })),
        );
      } catch {
        // ignore
      }
    }

    const isDarkMode =
      localStorage.getItem("theme") === "dark" ||
      (!localStorage.getItem("theme") &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);
    setIsDark(isDarkMode);
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, []);

  useEffect(() => {
    if (chats.length > 0)
      localStorage.setItem("nexus-chats", JSON.stringify(chats));
    else localStorage.removeItem("nexus-chats");
  }, [chats]);

  useEffect(() => {
    if (projects.length > 0)
      localStorage.setItem("nexus-projects", JSON.stringify(projects));
    else localStorage.removeItem("nexus-projects");
  }, [projects]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey) {
        if (e.key === "k") {
          e.preventDefault();
          setIsSearchOpen(true);
        } else if (e.key === "n") {
          e.preventDefault();
          createNewChat();
        } else if (e.key === "b") {
          e.preventDefault();
          setIsSidebarCollapsed((prev) => !prev);
        }
      }
      if (e.key === "Escape") {
        setIsSearchOpen(false);
        setIsSettingsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const createNewChat = useCallback(() => {
    const newChat: ChatSession = {
      id: Date.now().toString(),
      title: `New Chat`,
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      modelId: selectedModel.id,
      projectId: currentProjectId || undefined,
    };
    setChats((prev) => [newChat, ...prev]);
    setCurrentChatId(newChat.id);
    setPendingFiles([]);
    setInputValue("");
    if (window.innerWidth < 768) setIsSidebarOpen(false);
  }, [selectedModel.id, currentProjectId]);

  const deleteChat = (id: string) => {
    setChats((prev) => prev.filter((chat) => chat.id !== id));
    if (currentChatId === id) {
      const remaining = chats.filter((c) => c.id !== id);
      setCurrentChatId(remaining[0]?.id || null);
    }
  };

  const renameChat = (id: string, title: string) => {
    setChats((prev) =>
      prev.map((chat) => (chat.id === id ? { ...chat, title } : chat)),
    );
  };

  const pinChat = (id: string) => {
    setChats((prev) =>
      prev.map((chat) =>
        chat.id === id ? { ...chat, isPinned: !chat.isPinned } : chat,
      ),
    );
  };

  const archiveChat = (id: string) => {
    setChats((prev) =>
      prev.map((chat) =>
        chat.id === id ? { ...chat, isArchived: !chat.isArchived } : chat,
      ),
    );
  };

  const exportChat = (id: string) => {
    const chat = chats.find((c) => c.id === id);
    if (!chat) return;

    const exportData = {
      title: chat.title,
      exportedAt: new Date().toISOString(),
      messages: chat.messages.map((m) => ({
        role: m.role,
        content: m.content,
        timestamp: m.timestamp.toISOString(),
        model: m.model,
      })),
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${chat.title.replace(/[^a-z0-9]/gi, "_")}_${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const clearAllChats = () => {
    setChats([]);
    setCurrentChatId(null);
  };

  const toggleFavoriteMessage = (chatId: string, messageId: string) => {
    setChats((prev) =>
      prev.map((chat) =>
        chat.id === chatId
          ? {
              ...chat,
              messages: chat.messages.map((msg) =>
                msg.id === messageId
                  ? { ...msg, isFavorite: !msg.isFavorite }
                  : msg,
              ),
            }
          : chat,
      ),
    );
  };

  const likeMessage = (chatId: string, messageId: string) => {
    setChats((prev) =>
      prev.map((chat) =>
        chat.id === chatId
          ? {
              ...chat,
              messages: chat.messages.map((msg) =>
                msg.id === messageId
                  ? { ...msg, isLiked: !msg.isLiked, isDisliked: false }
                  : msg,
              ),
            }
          : chat,
      ),
    );
  };

  const dislikeMessage = (chatId: string, messageId: string) => {
    setChats((prev) =>
      prev.map((chat) =>
        chat.id === chatId
          ? {
              ...chat,
              messages: chat.messages.map((msg) =>
                msg.id === messageId
                  ? { ...msg, isDisliked: !msg.isDisliked, isLiked: false }
                  : msg,
              ),
            }
          : chat,
      ),
    );
  };

  const editMessage = async (messageId: string, newContent: string) => {
    if (!currentChatId || isLoading) return;

    // Find the message index
    const chat = chats.find((c) => c.id === currentChatId);
    if (!chat) return;
    const msgIndex = chat.messages.findIndex((m) => m.id === messageId);
    if (msgIndex === -1) return;

    // Update the message content and remove all messages after it
    setChats((prev) =>
      prev.map((c) =>
        c.id === currentChatId
          ? {
              ...c,
              messages: c.messages.slice(0, msgIndex).concat({
                ...c.messages[msgIndex],
                content: newContent,
              }),
              updatedAt: new Date(),
            }
          : c,
      ),
    );

    // Regenerate the response
    setIsLoading(true);
    const aiResponse = await getAIResponse(
      newContent,
      chat.messages[msgIndex].attachments || [],
      selectedModel,
    );

    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: aiResponse,
      timestamp: new Date(),
      model: selectedModel.name,
    };

    setChats((prev) =>
      prev.map((c) =>
        c.id === currentChatId
          ? {
              ...c,
              messages: [...c.messages, assistantMessage],
              updatedAt: new Date(),
            }
          : c,
      ),
    );
    setIsLoading(false);
  };

  const resendMessage = async (messageId: string) => {
    if (!currentChatId || isLoading) return;

    const chat = chats.find((c) => c.id === currentChatId);
    if (!chat) return;
    const msgIndex = chat.messages.findIndex((m) => m.id === messageId);
    if (msgIndex === -1) return;

    const userMsg = chat.messages[msgIndex];

    // Remove all messages after this user message
    setChats((prev) =>
      prev.map((c) =>
        c.id === currentChatId
          ? {
              ...c,
              messages: c.messages.slice(0, msgIndex + 1),
              updatedAt: new Date(),
            }
          : c,
      ),
    );

    // Regenerate the response
    setIsLoading(true);
    const aiResponse = await getAIResponse(
      userMsg.content,
      userMsg.attachments || [],
      selectedModel,
    );

    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: aiResponse,
      timestamp: new Date(),
      model: selectedModel.name,
    };

    setChats((prev) =>
      prev.map((c) =>
        c.id === currentChatId
          ? {
              ...c,
              messages: [...c.messages, assistantMessage],
              updatedAt: new Date(),
            }
          : c,
      ),
    );
    setIsLoading(false);
  };

  const regenerateResponse = async () => {
    if (!currentChatId || isLoading) return;
    const chat = chats.find((c) => c.id === currentChatId);
    if (!chat || chat.messages.length < 2) return;

    const lastUserMsgIndex = [...chat.messages]
      .reverse()
      .findIndex((m) => m.role === "user");
    if (lastUserMsgIndex === -1) return;

    const lastUserMsg =
      chat.messages[chat.messages.length - 1 - lastUserMsgIndex];

    setChats((prev) =>
      prev.map((c) =>
        c.id === currentChatId
          ? {
              ...c,
              messages: c.messages.slice(0, -1),
            }
          : c,
      ),
    );

    setIsLoading(true);
    const aiResponse = await getAIResponse(
      lastUserMsg.content,
      lastUserMsg.attachments || [],
      selectedModel,
    );

    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: aiResponse,
      timestamp: new Date(),
      model: selectedModel.name,
    };

    setChats((prev) =>
      prev.map((c) =>
        c.id === currentChatId
          ? {
              ...c,
              messages: [...c.messages, assistantMessage],
              updatedAt: new Date(),
            }
          : c,
      ),
    );
    setIsLoading(false);
  };

  const createProject = (
    data: Omit<Project, "id" | "createdAt" | "chatCount">,
  ) => {
    const newProject: Project = {
      id: Date.now().toString(),
      ...data,
      createdAt: new Date(),
      chatCount: 0,
    };
    setProjects((prev) => [...prev, newProject]);
  };

  const updateProject = (
    data: Omit<Project, "id" | "createdAt" | "chatCount">,
  ) => {
    if (!editingProject) return;
    setProjects((prev) =>
      prev.map((p) => (p.id === editingProject.id ? { ...p, ...data } : p)),
    );
    setEditingProject(null);
  };

  const deleteProject = (id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
    setChats((prev) =>
      prev.map((c) =>
        c.projectId === id ? { ...c, projectId: undefined } : c,
      ),
    );
    if (currentProjectId === id) setCurrentProjectId(null);
  };

  const copyMessage = (content: string) => {
    navigator.clipboard.writeText(content);
    setCopiedMessage(true);
    setTimeout(() => setCopiedMessage(false), 2000);
  };

  const sendMessage = async () => {
    if ((!inputValue.trim() && pendingFiles.length === 0) || isLoading) return;

    const attachments: Attachment[] = pendingFiles.map((file) => ({
      id: file.id,
      type: file.type,
      name: file.name,
      url: file.preview,
      size: file.size,
    }));
    const userQuery =
      inputValue.trim() ||
      (attachments.length > 0 ? "Can you analyze these files?" : "");

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: userQuery,
      timestamp: new Date(),
      attachments: attachments.length > 0 ? attachments : undefined,
    };

    let targetChatId = currentChatId;
    if (!targetChatId) {
      const newChat: ChatSession = {
        id: Date.now().toString(),
        title: userQuery.slice(0, 30) || "New Chat",
        messages: [],
        createdAt: new Date(),
        updatedAt: new Date(),
        modelId: selectedModel.id,
        projectId: currentProjectId || undefined,
      };
      setChats((prev) => [newChat, ...prev]);
      targetChatId = newChat.id;
      setCurrentChatId(newChat.id);
    }

    setChats((prev) =>
      prev.map((chat) =>
        chat.id === targetChatId
          ? {
              ...chat,
              messages: [...chat.messages, userMessage],
              updatedAt: new Date(),
              modelId: selectedModel.id,
            }
          : chat,
      ),
    );
    setInputValue("");
    setPendingFiles([]);
    setCodeSnippets([]);
    setIsLoading(true);

    const aiResponse = await getAIResponse(
      userQuery,
      attachments,
      selectedModel,
    );
    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: aiResponse,
      timestamp: new Date(),
      model: selectedModel.name,
    };

    setChats((prev) =>
      prev.map((chat) => {
        if (chat.id === targetChatId) {
          const updatedMessages = [...chat.messages, assistantMessage];
          if (chat.messages.length === 1 && userQuery) {
            return {
              ...chat,
              messages: updatedMessages,
              title:
                userQuery.slice(0, 30) + (userQuery.length > 30 ? "..." : ""),
              updatedAt: new Date(),
            };
          }
          return { ...chat, messages: updatedMessages, updatedAt: new Date() };
        }
        return chat;
      }),
    );
    setIsLoading(false);
  };

  const projectsWithCounts = projects.map((p) => ({
    ...p,
    chatCount: chats.filter((c) => c.projectId === p.id).length,
  }));

  return (
    <div className="flex h-screen bg-background">
      <ChatSidebar
        chats={chats}
        currentChatId={currentChatId}
        projects={projectsWithCounts}
        currentProjectId={currentProjectId}
        onNewChat={createNewChat}
        onSelectChat={(id) => {
          setCurrentChatId(id);
          setPendingFiles([]);
          setInputValue("");
          if (window.innerWidth < 768) setIsSidebarOpen(false);
        }}
        onDeleteChat={(id) => setDeleteModal({ type: "chat", id })}
        onRenameChat={renameChat}
        onPinChat={pinChat}
        onArchiveChat={archiveChat}
        onExportChat={exportChat}
        onClearAllChats={clearAllChats}
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(false)}
        onUpgradeClick={() => setIsUpgradeModalOpen(true)}
        showUpgradeBanner={showUpgradeBanner}
        onCloseUpgradeBanner={() => setShowUpgradeBanner(false)}
        onCreateProject={() => {
          setEditingProject(null);
          setIsProjectModalOpen(true);
        }}
        onEditProject={(project) => {
          setEditingProject(project);
          setIsProjectModalOpen(true);
        }}
        onDeleteProject={(id) => setDeleteModal({ type: "project", id })}
        onSelectProject={setCurrentProjectId}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />

      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <Header
          onToggleSidebar={() => setIsSidebarOpen(true)}
          onOpenSearch={() => setIsSearchOpen(true)}
          onOpenSettings={() => setIsSettingsOpen(true)}
          isTemporaryChat={isTemporaryChat}
          onToggleTemporaryChat={() => setIsTemporaryChat(!isTemporaryChat)}
        />

        <div className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto">
            {messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center px-4 min-h-[70vh]">
                <div className="w-20 h-20 bg-linear-to-br from-primary/20 to-accent/20 rounded-3xl flex items-center justify-center mb-6 shadow-2xl">
                  <Leaf className="w-10 h-10 text-primary" />
                </div>
                <h2 className="text-3xl font-bold mb-3 text-balance">
                  How can I help you today?
                </h2>
                <p className="text-muted-foreground max-w-md mb-8 text-balance">
                  Ask me anything! I can analyze images, read documents, and
                  answer your questions with advanced AI models.
                </p>
                <div className="flex gap-3 flex-wrap justify-center">
                  {[
                    { icon: Mic, label: "Voice Input" },
                    { icon: ImageIcon, label: "Image Analysis" },
                    { icon: FileText, label: "Document Reading" },
                    { icon: Cpu, label: `${AVAILABLE_MODELS.length}+ Models` },
                  ].map((feature) => (
                    <div
                      key={feature.label}
                      className="flex items-center gap-2 px-4 py-2 bg-secondary/50 rounded-xl text-sm border border-border/50"
                    >
                      <feature.icon className="w-4 h-4 text-primary" />
                      {feature.label}
                    </div>
                  ))}
                </div>

                <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-2xl">
                  {[
                    "Explain quantum computing simply",
                    "Write a professional email",
                    "Debug my code",
                    "Creative writing ideas",
                  ].map((prompt) => (
                    <button
                      key={prompt}
                      onClick={() => setInputValue(prompt)}
                      className="text-left px-4 py-3 bg-card border border-border rounded-xl text-sm hover:bg-secondary/50 hover:border-primary/30 transition-all"
                    >
                      <span className="text-muted-foreground">{prompt}</span>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <>
                {messages.map((msg, index) => {
                  const isLastAssistant =
                    msg.role === "assistant" && index === messages.length - 1;
                  return (
                    <ChatMessage
                      key={msg.id}
                      message={msg}
                      onCopy={copyMessage}
                      onToggleFavorite={() =>
                        currentChatId &&
                        toggleFavoriteMessage(currentChatId, msg.id)
                      }
                      isFavorite={msg.isFavorite}
                      isLastAssistant={isLastAssistant}
                      onRegenerate={
                        isLastAssistant ? regenerateResponse : undefined
                      }
                      onEdit={editMessage}
                      onResend={resendMessage}
                      onLike={
                        currentChatId
                          ? (messageId) => likeMessage(currentChatId, messageId)
                          : undefined
                      }
                      onDislike={
                        currentChatId
                          ? (messageId) =>
                              dislikeMessage(currentChatId, messageId)
                          : undefined
                      }
                    />
                  );
                })}
                {isLoading && <TypingLoader />}
                <div ref={messagesEndRef} />
              </>
            )}
          </div>
        </div>

        {/* Input Area */}
        <div className="border-t border-border bg-card/80 backdrop-blur-xl">
          <div className="max-w-4xl mx-auto px-4 py-3">
            {codeSnippets.length > 0 && (
              <div className="space-y-2 mb-3">
                {codeSnippets.map((snippet) => (
                  <CodeSnippetBox
                    key={snippet.id}
                    snippet={snippet}
                    onRemove={() =>
                      setCodeSnippets((prev) =>
                        prev.filter((s) => s.id !== snippet.id),
                      )
                    }
                  />
                ))}
              </div>
            )}

            {pendingFiles.length > 0 && (
              <div className="flex gap-2 flex-wrap mb-2 pb-2 border-b border-border">
                {pendingFiles.map((file) => (
                  <PendingAttachment
                    key={file.id}
                    file={file}
                    onRemove={() =>
                      setPendingFiles((prev) =>
                        prev.filter((f) => f.id !== file.id),
                      )
                    }
                  />
                ))}
              </div>
            )}

            <div className="flex items-center gap-2 mb-2">
              <button
                onClick={() => setWebSearchEnabled(!webSearchEnabled)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  webSearchEnabled
                    ? "bg-accent text-accent-foreground"
                    : "bg-secondary/50 text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}
              >
                <Globe className="w-3.5 h-3.5" />
                Web Search
              </button>
              <button
                onClick={() => setIsCodeModalOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-secondary/50 text-muted-foreground hover:text-foreground hover:bg-secondary transition-all"
              >
                <Code className="w-3.5 h-3.5" />
                Add Code
              </button>
            </div>

            <div className="flex items-center gap-2 bg-secondary/30 rounded-2xl border border-border shadow-sm px-2 py-1.5">
              <ModelSelector
                selectedModel={selectedModel}
                onModelChange={setSelectedModel}
              />
              <button
                onClick={() => setIsFileUploadOpen(true)}
                className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary transition-all"
                title="Attach files"
              >
                <Paperclip className="w-4 h-4" />
              </button>
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      sendMessage();
                    }
                  }}
                  placeholder={
                    codeSnippets.length > 0
                      ? "Ask about your code..."
                      : pendingFiles.length > 0
                        ? "Ask about your files..."
                        : "Message MindLeaf..."
                  }
                  className="w-full bg-transparent outline-none text-foreground text-sm placeholder:text-muted-foreground"
                  maxLength={4000}
                />
              </div>
              {inputValue.length > 0 && (
                <span
                  className={`text-xs ${inputValue.length > 3500 ? "text-destructive" : "text-muted-foreground"}`}
                >
                  {inputValue.length}/4000
                </span>
              )}
              <VoiceRecoder
                onTranscript={(text: any) =>
                  setInputValue((prev) => prev + (prev ? " " : "") + text)
                }
                isListening={isListening}
                setIsListening={setIsListening}
              />
              <button
                onClick={sendMessage}
                disabled={
                  (!inputValue.trim() &&
                    pendingFiles.length === 0 &&
                    codeSnippets.length === 0) ||
                  isLoading
                }
                className={`p-2.5 rounded-xl transition-all duration-200 ${
                  (inputValue.trim() ||
                    pendingFiles.length > 0 ||
                    codeSnippets.length > 0) &&
                  !isLoading
                    ? "bg-primary text-primary-foreground hover:opacity-90 shadow-lg shadow-primary/20"
                    : "bg-muted text-muted-foreground cursor-not-allowed"
                }`}
              >
                <Send className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-center text-muted-foreground mt-2">
              MindLeaf may produce inaccurate information. Verify important
              facts.
            </p>
          </div>
        </div>
      </div>

      {/* Modals */}
      <FileUploadModal
        isOpen={isFileUploadOpen}
        onClose={() => setIsFileUploadOpen(false)}
        onUpload={(files) => setPendingFiles((prev) => [...prev, ...files])}
      />

      {isCodeModalOpen && (
        <CodeInputModal
          onClose={() => setIsCodeModalOpen(false)}
          onAdd={(snippet) => {
            setCodeSnippets((prev) => [...prev, snippet]);
            setIsCodeModalOpen(false);
          }}
        />
      )}

      {isUpgradeModalOpen && (
        <UpgradeModal onClose={() => setIsUpgradeModalOpen(false)} />
      )}

      <ProjectModel
        isOpen={isProjectModalOpen}
        onClose={() => {
          setIsProjectModalOpen(false);
          setEditingProject(null);
        }}
        onSave={editingProject ? updateProject : createProject}
        editProject={editingProject}
      />

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        isDark={isDark}
        onToggleTheme={() => setIsDark(!isDark)}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        chats={chats}
        onSelectChat={(id) => {
          setCurrentChatId(id);
          setIsSearchOpen(false);
        }}
      />

      <DeleteModal
        isOpen={!!deleteModal}
        onClose={() => setDeleteModal(null)}
        onConfirm={() => {
          if (deleteModal?.type === "chat") {
            deleteChat(deleteModal.id);
          } else if (deleteModal?.type === "project") {
            deleteProject(deleteModal.id);
          }
        }}
        title={deleteModal?.type === "chat" ? "Delete Chat" : "Delete Project"}
        description={
          deleteModal?.type === "chat"
            ? "Are you sure you want to delete this chat? This action cannot be undone."
            : "Are you sure you want to delete this project? All associated chats will be moved to All Chats."
        }
      />

      <VoiceListeningModal
        isOpen={isListening}
        onClose={() => setIsListening(false)}
      />

      {copiedMessage && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 px-4 py-2 bg-foreground text-background rounded-xl text-sm font-medium shadow-xl z-50 animate-in fade-in slide-in-from-bottom-2">
          Copied to clipboard
        </div>
      )}
    </div>
  );
}
