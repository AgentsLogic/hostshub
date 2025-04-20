"use client";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-4">
      <h2 className="text-2xl font-semibold text-destructive">Something went wrong</h2>
      <p className="text-muted-foreground">{error.message}</p>
      <button
        onClick={() => reset()}
        className="px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition"
      >
        Try again
      </button>
    </div>
  );
}
