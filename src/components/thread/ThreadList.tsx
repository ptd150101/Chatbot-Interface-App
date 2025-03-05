import React, { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import {
  MoreHorizontal,
  MessageSquare,
  Pin,
  PinOff,
  Edit,
  Trash2,
} from "lucide-react";

interface Thread {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: string;
  isPinned: boolean;
  isActive?: boolean;
}

interface ThreadListProps {
  threads?: Thread[];
  onSelectThread?: (threadId: string) => void;
  onRenameThread?: (threadId: string) => void;
  onPinThread?: (threadId: string, isPinned: boolean) => void;
  onDeleteThread?: (threadId: string) => void;
}

const ThreadList = ({
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
    {
      id: "4",
      title: "Code review",
      lastMessage: "Can you explain this function?",
      timestamp: "Last week",
      isPinned: false,
      isActive: false,
    },
    {
      id: "5",
      title: "Learning resources",
      lastMessage: "What are some good resources to learn React?",
      timestamp: "2 weeks ago",
      isPinned: false,
      isActive: false,
    },
  ],
  onSelectThread = () => {},
  onRenameThread = () => {},
  onPinThread = () => {},
  onDeleteThread = () => {},
}: ThreadListProps) => {
  // Sort threads: pinned first, then by timestamp (assuming newer is first)
  const sortedThreads = [...threads].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return 0; // In a real app, you'd compare timestamps here
  });

  return (
    <div className="w-full h-full bg-background border-r">
      <ScrollArea className="h-full">
        <div className="p-2 space-y-1">
          {sortedThreads.map((thread) => (
            <ThreadItem
              key={thread.id}
              thread={thread}
              onSelect={() => onSelectThread(thread.id)}
              onRename={() => onRenameThread(thread.id)}
              onPin={() => onPinThread(thread.id, !thread.isPinned)}
              onDelete={() => onDeleteThread(thread.id)}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

interface ThreadItemProps {
  thread: Thread;
  onSelect: () => void;
  onRename: () => void;
  onPin: () => void;
  onDelete: () => void;
}

const ThreadItem = ({
  thread,
  onSelect,
  onRename,
  onPin,
  onDelete,
}: ThreadItemProps) => {
  return (
    <div
      className={cn(
        "group flex items-start justify-between p-3 rounded-md cursor-pointer hover:bg-accent/50 transition-colors",
        thread.isActive && "bg-accent",
      )}
      onClick={onSelect}
    >
      <div className="flex items-start space-x-3 overflow-hidden">
        <MessageSquare className="h-5 w-5 mt-0.5 text-muted-foreground flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center">
            <h3 className="font-medium text-sm truncate">{thread.title}</h3>
            {thread.isPinned && (
              <Pin className="h-3 w-3 ml-1 text-muted-foreground" />
            )}
          </div>
          <p className="text-xs text-muted-foreground truncate">
            {thread.lastMessage}
          </p>
          <span className="text-xs text-muted-foreground mt-1">
            {thread.timestamp}
          </span>
        </div>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 opacity-0 group-hover:opacity-100 focus:opacity-100"
            onClick={(e) => e.stopPropagation()}
          >
            <MoreHorizontal className="h-4 w-4" />
            <span className="sr-only">Thread options</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onClick={(e) => {
              e.stopPropagation();
              onRename();
            }}
          >
            <Edit className="h-4 w-4 mr-2" />
            Rename
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={(e) => {
              e.stopPropagation();
              onPin();
            }}
          >
            {thread.isPinned ? (
              <>
                <PinOff className="h-4 w-4 mr-2" />
                Unpin
              </>
            ) : (
              <>
                <Pin className="h-4 w-4 mr-2" />
                Pin
              </>
            )}
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-destructive focus:text-destructive"
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ThreadList;
