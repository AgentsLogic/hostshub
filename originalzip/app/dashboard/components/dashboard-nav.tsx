"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Home,
  Globe,
  LayoutGrid,
  Calendar,
  MessageSquare,
  Wrench,
  BarChart,
  DollarSign,
  Lightbulb,
  CreditCard,
  Users,
  Settings,
} from "lucide-react"

interface NavItem {
  title: string
  href: string
  icon: React.ReactNode
}

const navItems: NavItem[] = [
  {
    title: "Properties",
    href: "/dashboard/properties",
    icon: <Home className="mr-2 h-4 w-4" />,
  },
  {
    title: "Websites",
    href: "/dashboard/websites",
    icon: <Globe className="mr-2 h-4 w-4" />,
  },
  {
    title: "Channel Manager",
    href: "/dashboard/channel-manager",
    icon: <LayoutGrid className="mr-2 h-4 w-4" />,
  },
  {
    title: "Bookings",
    href: "/dashboard/bookings",
    icon: <Calendar className="mr-2 h-4 w-4" />,
  },
  {
    title: "Check-in/out",
    href: "/dashboard/check-in",
    icon: <Calendar className="mr-2 h-4 w-4" />,
  },
  {
    title: "Communications",
    href: "/dashboard/communications",
    icon: <MessageSquare className="mr-2 h-4 w-4" />,
  },
  {
    title: "Maintenance",
    href: "/dashboard/maintenance",
    icon: <Wrench className="mr-2 h-4 w-4" />,
  },
  {
    title: "Analytics",
    href: "/dashboard/analytics",
    icon: <BarChart className="mr-2 h-4 w-4" />,
  },
  {
    title: "Financial",
    href: "/dashboard/financial",
    icon: <DollarSign className="mr-2 h-4 w-4" />,
  },
  {
    title: "Smart Insights",
    href: "/dashboard/smart-insights",
    icon: <Lightbulb className="mr-2 h-4 w-4" />,
  },
  {
    title: "Billing",
    href: "/dashboard/billing",
    icon: <CreditCard className="mr-2 h-4 w-4" />,
  },
  {
    title: "Team",
    href: "/dashboard/team",
    icon: <Users className="mr-2 h-4 w-4" />,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: <Settings className="mr-2 h-4 w-4" />,
  },
]

export function DashboardNav() {
  const pathname = usePathname()

  return (
    <nav className="grid items-start gap-2">
      {navItems.map((item, index) => (
        <Link key={index} href={item.href}>
          <Button
            variant="ghost"
            className={cn("w-full justify-start", pathname === item.href && "bg-muted hover:bg-muted")}
          >
            {item.icon}
            {item.title}
          </Button>
        </Link>
      ))}
    </nav>
  )
}

