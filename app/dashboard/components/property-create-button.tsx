import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"

export function PropertyCreateButton() {
  return (
    <Button variant="primary" asChild>
      <Link href="/dashboard/properties/new">
        <PlusCircle className="mr-2 h-4 w-4" />
        New Property
      </Link>
    </Button>
  )
}

