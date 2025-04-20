
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { MainHeader } from "@/components/main-header"
import { Footer } from "@/components/footer"
import { NotificationProvider } from "@/contexts/notification-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "HostsHub",
  description: "Property management platform",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/images/fav.png" />
      </head>
      <body 
        className={`${inter.className} h-[100dvh] flex flex-col`}
        suppressHydrationWarning
      >
        <NotificationProvider>
          <ThemeProvider>
            <MainHeader />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </ThemeProvider>
        </NotificationProvider>
      </body>
    </html>
  )
}
