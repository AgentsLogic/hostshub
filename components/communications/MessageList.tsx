import { Message } from "@/lib/types";
import { cn } from "@/lib/utils"; // Import cn

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
            className={cn( // Use cn for conditional classes
              "max-w-[75%] rounded-lg px-3 py-1.5 border", // Adjusted padding, added border
              isOwn
                ? "ml-auto bg-primary text-primary-foreground"
                : "mr-auto bg-muted text-foreground"
            )}
          >
            <div className="text-sm whitespace-pre-wrap">{msg.content}</div>
            <div className="text-xs mt-0.5 text-muted-foreground/80 text-right"> {/* Adjusted margin and opacity */}
              {new Date(msg.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} {/* Formatted time */}
            </div>
          </div>
        );
      })}
    </div>
  );
}
