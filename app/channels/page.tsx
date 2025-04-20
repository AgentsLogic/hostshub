import type { Metadata } from "next"
import { ChannelsDashboard } from "@/components/channels/channels-dashboard"

export const metadata: Metadata = {
  title: "Channels",
  description: "Manage your distribution channels",
}

export default function ChannelsPage() {
  return <ChannelsDashboard />
}

