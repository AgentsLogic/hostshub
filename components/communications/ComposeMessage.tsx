import { useState } from "react";

interface ComposeMessageProps {
  onSend: (content: string) => void;
  disabled?: boolean;
}

export function ComposeMessage({ onSend, disabled }: ComposeMessageProps) {
  const [content, setContent] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    onSend(content.trim());
    setContent("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 p-4 border-t">
      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Type a message..."
        className="flex-1 rounded border p-2"
        disabled={disabled}
      />
      <button
        type="submit"
        disabled={disabled || !content.trim()}
        className="px-4 py-2 rounded bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
      >
        Send
      </button>
    </form>
  );
}
