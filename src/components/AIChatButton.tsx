"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Bot } from "lucide-react";
import AIChatBox from "./AIChatBox";

export default function AIChatButton() {
  const [chatBoxOpen, setChatBoxOpen] = useState<boolean>(false);
  return (
    <>
      <Button
        onClick={() => {
          setChatBoxOpen(true);
        }}
      >
        <Bot size={20} className="mr-2" />
        AIChat
      </Button>
      <AIChatBox
        open={chatBoxOpen}
        onClose={() => {
          setChatBoxOpen(false);
        }}
      />
    </>
  );
}
