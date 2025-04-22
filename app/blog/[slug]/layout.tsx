import type { Metadata } from 'next';

export default function BlogLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { slug: string };
}) {
  return children;
}

// Metadata function for SEO
export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const blogPosts = [
    {
      slug: "5-ways-to-automate-your-airbnb-business",
      title: "5 Ways to Automate Your Airbnb Business",
      excerpt: "Save time and reduce stress with these automation tips for busy hosts.",
      image: "/images/blog/1.png",
      date: "April 1, 2025",
      author: "HostsHub Team",
      category: "Tips",
    },
    {
      slug: "how-sarah-became-a-superhost-in-3-months",
      title: "How Sarah Became a Superhost in 3 Months",
      excerpt: "Learn how one host used HostsHub.ai to grow her business fast.",
      image: "/images/blog/2.png",
      date: "March 20, 2025",
      author: "HostsHub Team",
      category: "Success Stories",
    },
    {
      slug: "new-feature-dynamic-pricing-engine",
      title: "New Feature: Dynamic Pricing Engine",
      excerpt: "Maximize your revenue with our latest AI-powered pricing tool.",
      image: "/images/blog/3.png",
      date: "March 10, 2025",
      author: "HostsHub Team",
      category: "Updates",
    },
    {
      slug: "the-ultimate-guide-to-guest-communication",
      title: "The Ultimate Guide to Guest Communication",
      excerpt: "Build better relationships and grow your rental business.",
      image: "/images/blog/4.png",
      date: "February 28, 2025",
      author: "HostsHub Team",
      category: "Guides",
    }
  ];
  
  const post = blogPosts.find((p) => p.slug === params.slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The requested blog post could not be found.'
    };
  }

  return {
    title: `${post.title} | HostsHub Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.image],
      type: 'article'
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.image]
    }
  };
}
