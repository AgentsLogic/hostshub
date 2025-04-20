import type React from "react"

interface EmptyPlaceholderProps {
  children: React.ReactNode
}

function EmptyPlaceholder({ children }: EmptyPlaceholderProps) {
  return <div className="flex flex-col items-center justify-center h-[400px] text-center">{children}</div>
}

EmptyPlaceholder.Icon = function EmptyPlaceholderIcon({ name }: { name: string }) {
  const iconMap: { [key: string]: string } = {
    post: "post",
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-6 w-6 text-muted-foreground mb-2"
    >
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <line x1="9" y1="3" x2="9" y2="21" />
      <line x1="15" y1="3" x2="15" y2="21" />
    </svg>
  )
}

EmptyPlaceholder.Title = function EmptyPlaceholderTitle({ children }: { children: React.ReactNode }) {
  return <h3 className="font-semibold text-lg">{children}</h3>
}

EmptyPlaceholder.Description = function EmptyPlaceholderDescription({ children }: { children: React.ReactNode }) {
  return <p className="text-sm text-muted-foreground">{children}</p>
}

export { EmptyPlaceholder }

