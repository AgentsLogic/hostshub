import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Footer() {
  return (
    <footer className="border-t py-6 md:py-8">
      <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
        <div className="flex flex-col items-center gap-4 md:flex-row md:gap-6">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © 2025 HostsHub.ai. All rights reserved.
          </p>
          <nav className="flex gap-4 sm:gap-6">
            <Link className="text-sm font-medium hover:underline" href="/terms">
              Terms
            </Link>
            <Link className="text-sm font-medium hover:underline" href="/privacy">
              Privacy
            </Link>
            <Link className="text-sm font-medium hover:underline" href="/dashboard/white-label">
              White-Label
            </Link>
          </nav>
        </div>
        <div className="flex items-center">
          <Link href="/white-label/demo">
            <Button variant="outline" size="sm">
              Become a Reseller
            </Button>
          </Link>
        </div>
      </div>
    </footer>
  )
}

