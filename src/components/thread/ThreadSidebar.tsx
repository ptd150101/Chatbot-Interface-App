import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import ThreadList from "./ThreadList";
import ThreadActions from "./ThreadActions";
import { PlusCircle, Settings } from "lucide-react";

interface ThreadSidebarProps {
  threads?: Array<{
    id: string;
    title: string;
    lastMessage: string;
    timestamp: string;
    isPinned: boolean;
    isActive?: boolean;
  }>;
  onSelectThread?: (threadId: string) => void;
  onCreateThread?: () => void;
  onRenameThread?: (threadId: string) => void;
  onPinThread?: (threadId: string, isPinned: boolean) => void;
  onDeleteThread?: (threadId: string) => void;
  onSearch?: (query: string) => void;
  className?: string;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

const ThreadSidebar = ({
  threads = [
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
  ],
  onSelectThread = () => {},
  onCreateThread = () => {},
  onRenameThread = () => {},
  onPinThread = () => {},
  onDeleteThread = () => {},
  onSearch = () => {},
  className = "",
  isCollapsed = false,
  onToggleCollapse = () => {},
}: ThreadSidebarProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    onSearch(query);
  };

  return (
    <div
      className={cn(
        "flex flex-col h-full border-r bg-background",
        isCollapsed ? "w-16" : "w-80",
        className,
      )}
    >
      <div className="flex items-center justify-between p-4 border-b">
        {!isCollapsed && (
          <h2 className="text-lg font-semibold">Conversations</h2>
        )}
        <div className="flex items-center space-x-2">
          {isCollapsed && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onCreateThread}
              className="h-8 w-8"
            >
              <PlusCircle className="h-5 w-5" />
              <span className="sr-only">New Conversation</span>
            </Button>
          )}
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Settings className="h-5 w-5" />
            <span className="sr-only">Settings</span>
          </Button>
        </div>
      </div>

      {!isCollapsed ? (
        <>
          <div className="flex-1 overflow-hidden">
            <ThreadList
              threads={threads}
              onSelectThread={onSelectThread}
              onRenameThread={onRenameThread}
              onPinThread={onPinThread}
              onDeleteThread={onDeleteThread}
            />
          </div>
          <ThreadActions
            onCreateThread={onCreateThread}
            onSearch={handleSearch}
            searchPlaceholder="Search conversations..."
          />
        </>
      ) : (
        <ScrollArea className="flex-1 py-2">
          <div className="flex flex-col items-center space-y-2">
            {threads.map((thread) => (
              <Button
                key={thread.id}
                variant={thread.isActive ? "default" : "ghost"}
                size="icon"
                className="h-10 w-10 rounded-full"
                onClick={() => onSelectThread(thread.id)}
                title={thread.title}
              >
                {thread.title.charAt(0).toUpperCase()}
              </Button>
            ))}
          </div>
        </ScrollArea>
      )}
    </div>
  );
};

export default ThreadSidebar;
