"use client"; // Make this a Client Component

import React from "react"; // Import React

// Removed TypeScript interface and type annotations
export function DashboardShell({ children }) {
  return <div className="flex flex-col gap-8 p-4 md:p-8">{children}</div>;
}
