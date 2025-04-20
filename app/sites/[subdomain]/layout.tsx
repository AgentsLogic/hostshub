import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | HostsHub",
    default: "HostsHub - Property Website",
  },
  description: "Property website hosted on HostsHub",
};

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // No HTML/body tags - just a simple div wrapper
  // that doesn't affect the overall page structure
  return children;
}
