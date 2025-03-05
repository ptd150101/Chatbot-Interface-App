import React, { useState } from "react";
import ThreadSidebar from "../thread/ThreadSidebar";
import ChatArea from "../chat/ChatArea";
import DocumentPanel from "../document/DocumentPanel";
import ThemeToggle from "../theme/ThemeToggle";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight, FileText } from "lucide-react";

const ChatLayout = () => {
  // State for managing the UI layout
  const [isThreadSidebarCollapsed, setIsThreadSidebarCollapsed] =
    useState(false);
  const [isDocumentPanelOpen, setIsDocumentPanelOpen] = useState(false);

  // Mock data for threads
  const threads = [
    {
      id: "1",
      title: "Chat about AI capabilities",
      lastMessage: "What can you tell me about large language models?",
      timestamp: "2 hours ago",
      isPinned: true,
      isActive: true,
    },
    {
      id: "2",
      title: "Document analysis",
      lastMessage: "Can you summarize this research paper?",
      timestamp: "Yesterday",
      isPinned: true,
      isActive: false,
    },
    {
      id: "3",
      title: "Project planning",
      lastMessage: "Help me create a timeline for my project",
      timestamp: "3 days ago",
      isPinned: false,
      isActive: false,
    },
  ];

  // Mock messages for the chat area
  const messages = [
    {
      id: "1",
      content: "Hello! How can I help you today?",
      sender: "ai",
      timestamp: new Date(),
      model: "GPT-4",
    },
    {
      id: "2",
      content:
        "I need help with document management. Can you show me how to upload and preview files?",
      sender: "user",
      timestamp: new Date(Date.now() - 60000),
    },
    {
      id: "3",
      content:
        "Of course! To upload documents, click the upload button in the document panel on the right side. You can then preview PDFs, DOCX, Markdown, and TXT files directly in the application. Would you like me to explain more about specific file types?",
      sender: "ai",
      timestamp: new Date(Date.now() - 30000),
      model: "GPT-4",
    },
  ];

  // Mock documents for the document panel
  const documents = [
    {
      id: "1",
      name: "Project Proposal.pdf",
      type: "pdf",
      dateModified: "2023-06-15",
      size: "2.4 MB",
      url: "https://images.unsplash.com/photo-1706126187482-6ba20ca1d8b7?w=800&q=80",
    },
    {
      id: "2",
      name: "Meeting Notes.docx",
      type: "docx",
      dateModified: "2023-06-10",
      size: "345 KB",
    },
    {
      id: "3",
      name: "README.md",
      type: "md",
      dateModified: "2023-06-05",
      size: "128 KB",
      content:
        "# Project Documentation\n\nThis is a sample markdown file with documentation for the project.\n\n## Features\n\n- Multi-modal chat interface\n- Document management\n- Thread organization",
    },
  ];

  // Event handlers
  const handleToggleThreadSidebar = () => {
    setIsThreadSidebarCollapsed(!isThreadSidebarCollapsed);
  };

  const handleToggleDocumentPanel = () => {
    setIsDocumentPanelOpen(!isDocumentPanelOpen);
  };

  const handleSelectThread = (threadId: string) => {
    console.log(`Thread selected: ${threadId}`);
    // In a real app, you would load the selected thread's messages here
  };

  const handleSendMessage = (message: string) => {
    console.log(`Message sent: ${message}`);
    // In a real app, you would send the message to the backend here
  };

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden">
      {/* Thread Sidebar */}
      <ThreadSidebar
        threads={threads}
        onSelectThread={handleSelectThread}
        isCollapsed={isThreadSidebarCollapsed}
        onToggleCollapse={handleToggleThreadSidebar}
      />

      {/* Toggle button for thread sidebar */}
      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleToggleThreadSidebar}
          className="h-8 w-8 rounded-full bg-accent/50 shadow-md ml-1"
        >
          {isThreadSidebarCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col relative">
        <div className="absolute top-4 right-4 z-10">
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={handleToggleDocumentPanel}
              className="h-8 w-8 rounded-full"
              aria-label="Toggle document panel"
            >
              <FileText className="h-4 w-4" />
            </Button>
            <ThemeToggle />
          </div>
        </div>
        <ChatArea
          messages={messages}
          onSendMessage={handleSendMessage}
          selectedModel="GPT-4"
        />
      </div>

      {/* Document Panel */}
      {isDocumentPanelOpen && (
        <div className="w-80 h-full">
          <DocumentPanel
            isOpen={isDocumentPanelOpen}
            onClose={handleToggleDocumentPanel}
            documents={documents}
          />
        </div>
      )}
    </div>
  );
};

export default ChatLayout;
