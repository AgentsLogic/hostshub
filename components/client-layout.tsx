"use client"

import { usePathname } from "next/navigation"
import { MainHeader } from "@/components/main-header"
import { NotificationProvider } from "@/contexts/notification-context"
import { ThemeProvider } from "@/components/theme-provider"

export function ClientLayout({ 
  children,
  interClass 
}: { 
  children: React.ReactNode,
  interClass: string
}) {
  const pathname = usePathname() || ""
  const isDashboard = pathname.startsWith("/dashboard")
  
  return (
    <div className={`${interClass} min-h-screen`}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
        suppressHydrationWarning
      >
        <NotificationProvider>
          {isDashboard ? (
            <main className="h-screen overflow-hidden">
              {children}
            </main>
          ) : (
            <>
              <MainHeader />
              <main>{children}</main>
            </>
          )}
        </NotificationProvider>
      </ThemeProvider>
    </div>
  )
}
