import React, { useState } from "react";
import MessageList from "./MessageList";
import ChatControls from "./ChatControls";

type Message = {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
  model?: "GPT-4" | "Claude" | "Gemini";
  isLoading?: boolean;
};

interface ChatAreaProps {
  messages?: Message[];
  onSendMessage?: (message: string) => void;
  onVoiceInput?: () => void;
  onModelChange?: (model: string) => void;
  isRecording?: boolean;
  selectedModel?: string;
  className?: string;
}

const ChatArea = ({
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
  onSendMessage = (message) => {
    console.log("Message sent:", message);
  },
  onVoiceInput = () => {
    console.log("Voice input toggled");
  },
  onModelChange = (model) => {
    console.log("Model changed to:", model);
  },
  isRecording = false,
  selectedModel = "GPT-4",
  className,
}: ChatAreaProps) => {
  const [localMessages, setLocalMessages] = useState<Message[]>(messages);

  // Handle sending a new message
  const handleSendMessage = (message: string) => {
    // Create a new user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content: message,
      sender: "user",
      timestamp: new Date(),
    };

    // Create a loading message from AI
    const loadingMessage: Message = {
      id: `ai-${Date.now()}`,
      content: "",
      sender: "ai",
      timestamp: new Date(),
      model: selectedModel,
      isLoading: true,
    };

    // Update messages with user message and loading indicator
    setLocalMessages((prev) => [...prev, userMessage, loadingMessage]);

    // Call the parent's onSendMessage handler
    onSendMessage(message);

    // Simulate AI response after a delay
    setTimeout(() => {
      // Remove loading message and add actual response
      setLocalMessages((prev) => {
        const filtered = prev.filter((msg) => msg.id !== loadingMessage.id);
        return [
          ...filtered,
          {
            id: `ai-response-${Date.now()}`,
            content: `I'm responding to your message: "${message}"`,
            sender: "ai",
            timestamp: new Date(),
            model: selectedModel,
          },
        ];
      });
    }, 1500);
  };

  return (
    <div className="flex flex-col w-full h-full bg-background">
      <div className="flex-1 overflow-hidden">
        <MessageList messages={localMessages} />
      </div>
      <ChatControls
        onSendMessage={handleSendMessage}
        onVoiceInput={onVoiceInput}
        onModelChange={onModelChange}
        isRecording={isRecording}
        selectedModel={selectedModel}
      />
    </div>
  );
};

export default ChatArea;
