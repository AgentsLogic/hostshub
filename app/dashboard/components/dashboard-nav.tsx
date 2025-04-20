"use client"
import type React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
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
  CalendarCheck,
} from "lucide-react"

const navItems = [
  {
    title: "Properties",
    href: "/dashboard/properties",
    icon: <Home className="h-4 w-4" />,
  },
  {
    title: "Websites",
    href: "/dashboard/websites",
    icon: <Globe className="h-4 w-4" />,
  },
  {
    title: "Channel Manager",
    href: "/dashboard/channel-manager",
    icon: <LayoutGrid className="h-4 w-4" />,
  },
  {
    title: "Bookings",
    href: "/dashboard/bookings",
    icon: <Calendar className="h-4 w-4" />,
  },
  {
    title: "Check-in/out",
    href: "/dashboard/check-in",
    icon: <CalendarCheck className="h-4 w-4" />,
  },
  {
    title: "Communications",
    href: "/dashboard/communications",
    icon: <MessageSquare className="h-4 w-4" />,
  },
  {
    title: "Maintenance",
    href: "/dashboard/maintenance",
    icon: <Wrench className="h-4 w-4" />,
  },
  {
    title: "Analytics",
    href: "/dashboard/analytics",
    icon: <BarChart className="h-4 w-4" />,
  },
  {
    title: "Financial",
    href: "/dashboard/financial",
    icon: <DollarSign className="h-4 w-4" />,
  },
  {
    title: "Smart Insights",
    href: "/dashboard/smart-insights",
    icon: <Lightbulb className="h-4 w-4" />,
  },
  {
    title: "Billing",
    href: "/dashboard/billing",
    icon: <CreditCard className="h-4 w-4" />,
  },
  {
    title: "Team",
    href: "/dashboard/team",
    icon: <Users className="h-4 w-4" />,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: <Settings className="h-4 w-4" />,
  },
]

export function DashboardNav() {
  const pathname = usePathname()

  return (
    <nav className="px-2 py-2">
      {navItems.map((item, index) => {
        const isActive = pathname === item.href || pathname?.startsWith(item.href + "/")
        return (
          <Link 
            key={index} 
            href={item.href}
          >
            <div
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent",
                isActive && "bg-accent"
              )}
            >
              <span className={cn(
                "flex items-center gap-x-2",
                isActive && "font-medium text-primary"
              )}>
                {item.icon}
                {item.title}
              </span>
            </div>
          </Link>
        )
      })}
    </nav>
  )
}


