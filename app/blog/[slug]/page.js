// Server component (default)
import { notFound } from "next/navigation";
import ClientPage from "./client";
import { generateMetadata } from "./metadata";

// Re-export the metadata function
export { generateMetadata };

const blogPosts = [
  {
    slug: "5-ways-to-automate-your-airbnb-business",
    title: "5 Ways to Automate Your Airbnb Business",
    excerpt: "Save time and reduce stress with these automation tips for busy hosts.",
    image: "/images/blog/1.png",
    date: "April 1, 2025",
    author: "HostsHub Team",
    category: "Tips",
    content: `
### Automate Messaging
Use automated guest messaging to save hours each week.

### Smart Pricing
Leverage dynamic pricing tools to maximize revenue.

### Task Scheduling
Automate cleaning and maintenance reminders.

### Channel Management
Sync calendars and listings across platforms.

### Review Requests
Automatically request reviews after checkout.
`
  },
  {
    slug: "how-sarah-became-a-superhost-in-3-months",
    title: "How Sarah Became a Superhost in 3 Months",
    excerpt: "Learn how one host used HostsHub.ai to grow her business fast.",
    image: "/images/blog/2.png",
    date: "March 20, 2025",
    author: "HostsHub Team",
    category: "Success Stories",
    content: `
Sarah streamlined her operations with HostsHub.ai:

- Automated guest communication
- Dynamic pricing
- Centralized calendar
- Review management

She increased bookings by 40% and earned Superhost status in just 3 months.
`
  },
  {
    slug: "new-feature-dynamic-pricing-engine",
    title: "New Feature: Dynamic Pricing Engine",
    excerpt: "Maximize your revenue with our latest AI-powered pricing tool.",
    image: "/images/blog/3.png",
    date: "March 10, 2025",
    author: "HostsHub Team",
    category: "Updates",
    content: `
Our new dynamic pricing engine uses AI to:

- Analyze market demand
- Adjust prices daily
- Maximize occupancy and revenue

Try it now in your dashboard.
`
  },
  {
    slug: "the-ultimate-guide-to-guest-communication",
    title: "The Ultimate Guide to Guest Communication",
    excerpt: "Build better relationships and grow your rental business.",
    image: "/images/blog/4.png",
    date: "February 28, 2025",
    author: "HostsHub Team",
    category: "Guides",
    content: `
Learn how to:

- Set clear expectations
- Automate check-in instructions
- Handle guest issues professionally
- Encourage positive reviews
`
  }
];

const authors = {
  "HostsHub Team": {
    name: "HostsHub Team",
    bio: "Experts in property management, automation, and hospitality.",
    avatar: "/images/logo-icon.png"
  }
};

export default function BlogArticlePage({ params }) {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  const author = authors[post.author];

  // Pass all the necessary data to the client component
  return (
    <ClientPage 
      post={post} 
      author={author}
    />
  );
}
