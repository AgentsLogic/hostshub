"use client";

import { useState } from "react";
import { ThreadList } from "@/components/communications/ThreadList";
import { MessageList } from "@/components/communications/MessageList";
import { ComposeMessage } from "@/components/communications/ComposeMessage";
import { MessageThread, Message } from "@/lib/types";

interface CommunicationsPanelProps {
  threads: MessageThread[];
  messagesByThread: Record<string, Message[]>;
  currentUserId: string;
}

export function CommunicationsPanel({ threads, messagesByThread, currentUserId }: CommunicationsPanelProps) {
  const [selectedThreadId, setSelectedThreadId] = useState<string | null>(threads[0]?.id ?? null);
  const [messages, setMessages] = useState<Message[]>(messagesByThread[selectedThreadId ?? ""] ?? []);

  const handleSelectThread = (threadId: string) => {
    setSelectedThreadId(threadId);
    setMessages(messagesByThread[threadId] ?? []);
  };

  const handleSendMessage = (content: string) => {
    if (!selectedThreadId) return;
    const newMessage: Message = {
      id: Date.now().toString(),
      thread_id: selectedThreadId,
      sender_id: currentUserId,
      sender_type: "host",
      content,
      created_at: new Date().toISOString(),
      read: true,
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  return (
    <div className="flex h-[80vh] border rounded overflow-hidden">
      <ThreadList
        threads={threads}
        selectedThreadId={selectedThreadId ?? undefined}
        onSelect={handleSelectThread}
      />
      <div className="flex flex-col flex-1">
        {selectedThreadId ? (
          <>
            <MessageList messages={messages} currentUserId={currentUserId} />
            <ComposeMessage onSend={handleSendMessage} />
          </>
        ) : (
          <div className="flex items-center justify-center flex-1 text-muted-foreground">
            Select a conversation
          </div>
        )}
      </div>
    </div>
  );
}
