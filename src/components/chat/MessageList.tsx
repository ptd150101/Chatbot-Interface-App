import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

type Message = {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
  model?: "GPT-4" | "Claude" | "Gemini";
  isLoading?: boolean;
};

type MessageListProps = {
  messages?: Message[];
  className?: string;
};

const MessageList = ({
  messages = [
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
  ],
  className,
}: MessageListProps) => {
  return (
    <div className={cn("w-full h-full bg-background flex flex-col", className)}>
      <ScrollArea className="flex-1 p-4">
        <div className="flex flex-col space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex items-start gap-3 max-w-[85%]",
                message.sender === "user" ? "ml-auto" : "mr-auto",
              )}
            >
              {message.sender === "ai" && (
                <Avatar className="h-8 w-8 mt-1">
                  <AvatarImage
                    src="https://api.dicebear.com/7.x/bottts/svg?seed=ai"
                    alt="AI"
                  />
                  <AvatarFallback>AI</AvatarFallback>
                </Avatar>
              )}

              <div
                className={cn(
                  "rounded-lg p-4",
                  message.sender === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted",
                )}
              >
                {message.isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="h-2 w-2 rounded-full bg-current animate-bounce" />
                    <div className="h-2 w-2 rounded-full bg-current animate-bounce delay-150" />
                    <div className="h-2 w-2 rounded-full bg-current animate-bounce delay-300" />
                  </div>
                ) : (
                  <div>
                    <div className="whitespace-pre-wrap">{message.content}</div>
                    {message.model && message.sender === "ai" && (
                      <div className="text-xs opacity-70 mt-2">
                        {message.model} •{" "}
                        {new Date(message.timestamp).toLocaleTimeString()}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {message.sender === "user" && (
                <Avatar className="h-8 w-8 mt-1">
                  <AvatarImage
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=user"
                    alt="User"
                  />
                  <AvatarFallback>You</AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default MessageList;
