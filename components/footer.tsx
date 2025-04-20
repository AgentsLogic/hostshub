import Link from "next/link"
import { Button } from "@/components/ui/button"

interface FooterProps {
  className?: string
}

export function Footer({ className }: FooterProps) {
  return (
    <footer className={`bg-gradient-to-br from-primary/80 to-primary text-primary-foreground mt-auto ${className || ''}`}>
      <div className="container flex flex-col md:flex-row flex-wrap items-center justify-end gap-4 py-6 px-4">
        <div className="flex flex-col items-center gap-3 md:flex-row md:gap-6">
          <p className="text-center text-sm leading-loose md:text-left">
            © 2025 HostsHub.ai. All rights reserved.
          </p>
          <nav className="flex flex-wrap justify-center gap-4">
            <Link className="text-sm font-medium hover:underline" href="/terms">
              Terms
            </Link>
            <Link className="text-sm font-medium hover:underline" href="/privacy">
              Privacy
            </Link>
            <Link className="text-sm font-medium hover:underline" href="/dashboard/pricing">
              Pricing
            </Link>
            <Link className="text-sm font-medium hover:underline" href="/features">
              Features
            </Link>
            <Link className="text-sm font-medium hover:underline" href="/resources">
              Resources
            </Link>
            <Link className="text-sm font-medium hover:underline" href="/testimonials">
              Testimonials
            </Link>
            <Link className="text-sm font-medium hover:underline" href="/findr">
              Findr
            </Link>
          </nav>
        </div>
        <div className="flex flex-col items-center gap-3 md:flex-row md:gap-4">
          <nav className="flex gap-3">
            <a href="#" aria-label="X" className="hover:text-accent-red transition-colors">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M4 4l16 16M20 4L4 20" />
              </svg>
            </a>
            <a href="#" aria-label="Facebook" className="hover:text-accent-red transition-colors">
              <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24"><path d="M22 12a10 10 0 10-11.5 9.9v-7h-2v-3h2v-2.3c0-2 1.2-3.1 3-3.1.9 0 1.8.1 1.8.1v2h-1c-1 0-1.3.6-1.3 1.2V12h2.2l-.4 3h-1.8v7A10 10 0 0022 12z"/></svg>
            </a>
            <a href="#" aria-label="LinkedIn" className="hover:text-accent-red transition-colors">
              <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24"><path d="M20.45 20.45h-3.55v-5.4c0-1.3-.02-3-1.83-3-1.83 0-2.11 1.43-2.11 2.9v5.5H9.4V9h3.4v1.56h.05c.47-.9 1.62-1.83 3.33-1.83 3.56 0 4.22 2.34 4.22 5.38v6.34zM5.34 7.43a2.06 2.06 0 110-4.12 2.06 2.06 0 010 4.12zM7.12 20.45H3.56V9h3.56v11.45z"/></svg>
            </a>
          </nav>
          <Link href="/white-label/demo">
            <Button variant="secondary" size="sm" className="font-semibold">
              Become a Reseller
            </Button>
          </Link>
        </div>
      </div>
    </footer>
  )
}
