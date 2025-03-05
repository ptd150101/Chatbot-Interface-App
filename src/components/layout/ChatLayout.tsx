import React, { useState } from "react";
import ThreadSidebar from "../thread/ThreadSidebar";
import ChatArea from "../chat/ChatArea";
import DocumentPanel from "../document/DocumentPanel";
import ThemeToggle from "../theme/ThemeToggle";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight, FileText } from "lucide-react";

interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
  model?: "GPT-4" | "Claude" | "Gemini";
}

interface Document {
  id: string;
  name: string;
  type: "pdf" | "docx" | "md" | "txt" | "image";
  dateModified: string;
  size: string;
  url?: string;
  content?: string;
}

const ChatLayout = () => {
  // State for managing the UI layout
  const [isThreadSidebarCollapsed, setIsThreadSidebarCollapsed] =
    useState(false);
  const [isDocumentPanelOpen, setIsDocumentPanelOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

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
  // Mock documents for the document panel
  const documents: Document[] = [
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
    // Example:
    // fetchThreadMessages(threadId).then(messages => setMessages(messages));
  };
  const handleSendMessage = async (message: string) => {
    try {
      // Create a new user message
      const userMessage: Message = {
        id: `user-${Date.now()}`,
        content: message,
        sender: "user",
        timestamp: new Date(),
      };

      // Add user message to the state
      setMessages(prev => [...prev, userMessage]);

      // In a real app, you would send the message to the backend here
      // Example:
      // const response = await sendMessageToBackend(message);
      // const aiMessage = {
      //   id: response.id,
      //   content: response.content,
      //   sender: "ai",
      //   timestamp: new Date(),
      //   model: response.model
      // };
      // setMessages(prev => [...prev, aiMessage]);

      // For now, simulate AI response
      setTimeout(() => {
        const aiMessage: Message = {
          id: `ai-${Date.now()}`,
          content: `I received your message: "${message}". This is a simulated response.`,
          sender: "ai",
          timestamp: new Date(),
          model: "GPT-4"
        };
        setMessages(prev => [...prev, aiMessage]);
      }, 1000);

    } catch (error) {
      console.error('Error sending message:', error);
      // Handle error appropriately
    }
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
