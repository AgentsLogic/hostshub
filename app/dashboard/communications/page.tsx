"use client";

import { DashboardShell } from "@/app/dashboard/components/dashboard-shell";
import { CommunicationsPanel } from "@/components/communications/CommunicationsPanel";
import { MessageThread, Message } from "@/lib/types";

const mockThreads: MessageThread[] = [
  {
    id: "thread1",
    guest_id: "Guest A",
    channel: "airbnb",
    last_message: "Hello, I have a question about my booking.",
    last_updated: "2025-04-07T01:00:00.000Z",
    unread_count: 2,
  },
  {
    id: "thread2",
    guest_id: "Guest B",
    channel: "vrbo",
    last_message: "Thanks for the info!",
    last_updated: "2025-04-07T01:05:00.000Z",
    unread_count: 0,
  },
  {
    id: "thread3",
    guest_id: "Guest C",
    channel: "direct",
    last_message: "Can I get an early check-in?",
    last_updated: "2025-04-07T01:10:00.000Z",
    unread_count: 1,
  },
];

const mockMessages: Record<string, Message[]> = {
  thread1: [
    {
      id: "m1",
      thread_id: "thread1",
      sender_id: "guestA",
      sender_type: "guest",
      content: "Hello, I have a question about my booking.",
      created_at: "2025-04-07T01:00:00.000Z",
      read: true,
    },
    {
      id: "m2",
      thread_id: "thread1",
      sender_id: "host",
      sender_type: "host",
      content: "Sure, how can I help?",
      created_at: "2025-04-07T01:01:00.000Z",
      read: true,
    },
  ],
  thread2: [
    {
      id: "m3",
      thread_id: "thread2",
      sender_id: "guestB",
      sender_type: "guest",
      content: "Thanks for the info!",
      created_at: "2025-04-07T01:05:00.000Z",
      read: true,
    },
  ],
  thread3: [
    {
      id: "m4",
      thread_id: "thread3",
      sender_id: "guestC",
      sender_type: "guest",
      content: "Can I get an early check-in?",
      created_at: "2025-04-07T01:10:00.000Z",
      read: false,
    },
  ],
};

export default function CommunicationsPage() {
  return (
    <DashboardShell>
      <CommunicationsPanel
        threads={mockThreads}
        messagesByThread={mockMessages}
        currentUserId="host"
      />
    </DashboardShell>
  );
}
