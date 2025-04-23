import { MessageThread } from "@/lib/types";

interface ThreadListProps {
  threads: MessageThread[];
  selectedThreadId?: string;
  onSelect: (threadId: string) => void;
}

import { Badge } from "@/components/ui/badge"; // Import Badge
import { cn } from "@/lib/utils"; // Import cn

export function ThreadList({ threads, selectedThreadId, onSelect }: ThreadListProps) {
  return (
    <div className="flex flex-col border-r w-full max-w-xs overflow-y-auto">
      {threads.map((thread) => (
        <button
          key={thread.id}
          onClick={() => onSelect(thread.id)}
          className={cn( // Use cn for conditional classes
            "flex flex-col items-start p-2 border-b text-left hover:bg-muted w-full", // Adjusted padding
            selectedThreadId === thread.id ? "bg-muted" : "",
            "border-b" // Ensure border-b is always present
          )}
        >
          <div className="flex justify-between w-full items-center mb-0.5"> {/* Adjusted margin */}
            <div className="flex items-center gap-1.5"> {/* Adjusted gap */}
              <div className="w-5 h-5 rounded-full bg-gray-300 flex items-center justify-center text-xs font-bold"> {/* Adjusted size */}
                {thread.guest_id.charAt(0)}
              </div>
              <span className="font-medium text-sm">{thread.guest_id}</span> {/* Adjusted text size */}
              <Badge variant="secondary" className="text-xs capitalize px-1 py-0.5"> {/* Use Badge for channel */}
                {thread.channel ?? "direct"}
              </Badge>
            </div>
            {thread.unread_count > 0 && (
              <Badge variant="destructive" className="text-xs rounded-full px-1.5 py-0.5"> {/* Use Badge for unread count */}
                {thread.unread_count}
              </Badge>
            )}
          </div>
          <div className="text-sm text-muted-foreground truncate w-full mb-0.5"> {/* Adjusted margin */}
            {thread.last_message}
          </div>
          <div className="text-xs text-muted-foreground">
            <time dateTime={thread.last_updated}>{new Date(thread.last_updated).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</time> {/* Formatted time */}
          </div>
        </button>
      ))}
    </div>
  );
}
