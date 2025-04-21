"use client";

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/logo"
import { usePathname } from "next/navigation"

interface MainHeaderProps {
  className?: string
}

export function MainHeader({ className }: MainHeaderProps) {
  const pathname = usePathname()
  const hideLogo = pathname.startsWith("/dashboard")

  return (
    <header className={`border-b ${className || ''}`}>
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link
          href="/"
          className={`flex items-center gap-2 font-bold text-xl hover:underline underline-offset-4 ${hideLogo ? 'invisible' : ''}`}
        >
          <Logo />
        </Link>
        <nav className="hidden md:flex gap-6">
          <Link href="/features" className="text-sm font-medium hover:underline underline-offset-4">
            Features
          </Link>
          <Link href="/dashboard/pricing" className="text-sm font-medium hover:underline underline-offset-4">
            Pricing
          </Link>
          <Link href="/resources" className="text-sm font-medium hover:underline underline-offset-4">
            Resources
          </Link>
          <Link href="/testimonials" className="text-sm font-medium hover:underline underline-offset-4">
            Testimonials
          </Link>
          <Link href="/findr" className="text-sm font-medium hover:underline underline-offset-4">
            Findr
          </Link>
          <Link href="/help" className="text-sm font-medium hover:underline underline-offset-4">
            Help
          </Link>
          <Link href="#" className="text-sm font-medium hover:underline underline-offset-4">
            Forum
          </Link>
        </nav>
        <div className="flex gap-4">
          <Link href="/login">
            <Button variant="outline">Log in</Button>
          </Link>
          <Link href="/signup">
            <Button>Sign up</Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
