import { Message } from "@/lib/types";

interface MessageListProps {
  messages: Message[];
  currentUserId: string;
}

export function MessageList({ messages, currentUserId }: MessageListProps) {
  return (
    <div className="flex flex-col gap-2 p-4 overflow-y-auto flex-1">
      {messages.map((msg) => {
        const isOwn = msg.sender_id === currentUserId;
        return (
          <div
            key={msg.id}
            className={`max-w-[75%] rounded-lg px-3 py-2 ${
              isOwn
                ? "ml-auto bg-primary text-primary-foreground"
                : "mr-auto bg-muted text-foreground"
            }`}
          >
            <div className="text-sm whitespace-pre-wrap">{msg.content}</div>
            <div className="text-xs mt-1 text-muted-foreground text-right">
              {new Date(msg.created_at).toLocaleTimeString()}
            </div>
          </div>
        );
      })}
    </div>
  );
}
