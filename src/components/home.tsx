import React from "react";
import ChatLayout from "./layout/ChatLayout";
import { ThemeProvider } from "./theme/ThemeProvider";

const Home = () => {
  return (
    <ThemeProvider defaultTheme="light" storageKey="chat-ui-theme">
      <div className="bg-background min-h-screen w-full">
        <ChatLayout />
      </div>
    </ThemeProvider>
  );
};

export default Home;
