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
  messages = [],
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
  const [isError, setIsError] = useState(false);

  // Handle sending a new message
  const handleSendMessage = async (message: string) => {
    // Create a loading message from AI
    const loadingMessage: Message = {
      id: `ai-${Date.now()}`,
      content: "",
      sender: "ai",
      timestamp: new Date(),
      model: selectedModel as "GPT-4" | "Claude" | "Gemini",
      isLoading: true,
    };
  try {
    // Create a new user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content: message,
      sender: "user",
      timestamp: new Date(),
    };
  // Update messages with user message and loading indicator
  setLocalMessages((prev) => [...prev, userMessage, loadingMessage]);

      // Call the backend API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message,
          model: selectedModel,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response from API');
      }

      const data = await response.json();

      // Remove loading message and add actual response
      setLocalMessages((prev) => {
        const filtered = prev.filter((msg) => msg.id !== loadingMessage.id);
        return [
          ...filtered,
          {
            id: `ai-response-${Date.now()}`,
            content: data.response,
            sender: "ai",
            timestamp: new Date(),
            model: selectedModel as "GPT-4" | "Claude" | "Gemini",
          },
        ];
      });

      // Reset error state if successful
      setIsError(false);

      // Call the parent's onSendMessage handler
      onSendMessage(message);
    } catch (error) {
      console.error('Error sending message:', error);
      setIsError(true);
      
      // Remove loading message and add error message
      setLocalMessages((prev) => {
        const filtered = prev.filter((msg) => msg.id !== loadingMessage.id);
        return [
          ...filtered,
          {
            id: `error-${Date.now()}`,
            content: "Sorry, there was an error processing your message. Please try again.",
            sender: "ai",
            timestamp: new Date(),
            model: selectedModel as "GPT-4" | "Claude" | "Gemini",
          },
        ];
      });
    }
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
        disabled={isError}
      />
    </div>
  );
};

export default ChatArea;
