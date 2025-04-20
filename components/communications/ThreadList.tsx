import { MessageThread } from "@/lib/types";

interface ThreadListProps {
  threads: MessageThread[];
  selectedThreadId?: string;
  onSelect: (threadId: string) => void;
}

export function ThreadList({ threads, selectedThreadId, onSelect }: ThreadListProps) {
  return (
    <div className="flex flex-col border-r w-full max-w-xs overflow-y-auto">
      {threads.map((thread) => (
        <button
          key={thread.id}
          onClick={() => onSelect(thread.id)}
          className={`flex flex-col items-start p-3 border-b text-left hover:bg-muted ${
            selectedThreadId === thread.id ? "bg-muted" : ""
          }`}
        >
          <div className="flex justify-between w-full items-center mb-1">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center text-xs font-bold">
                {thread.guest_id.charAt(0)}
              </div>
              <span className="font-medium">{thread.guest_id}</span>
              <span className="text-xs rounded px-1 py-0.5 bg-blue-100 text-blue-800 capitalize">
                {thread.channel ?? "direct"}
              </span>
            </div>
            {thread.unread_count > 0 && (
              <span className="text-xs bg-red-500 text-white rounded-full px-2 py-0.5">
                {thread.unread_count}
              </span>
            )}
          </div>
          <div className="text-sm text-muted-foreground truncate w-full mb-1">
            {thread.last_message}
          </div>
          <div className="text-xs text-muted-foreground">
            <time dateTime={thread.last_updated}>{thread.last_updated}</time>
          </div>
        </button>
      ))}
    </div>
  );
}
