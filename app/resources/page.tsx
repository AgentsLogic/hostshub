"use client";

"use client";

import { useState } from "react";
import Link from "next/link";

const allArticles = [
  {
    slug: "5-ways-to-automate-your-airbnb-business",
    title: "5 Ways to Automate Your Airbnb Business",
    excerpt: "Save time and reduce stress with these automation tips for busy hosts.",
    image: "/images/blog/1.png",
    date: "April 1, 2025",
    author: "HostsHub Team",
    category: "Tips"
  },
  {
    slug: "how-sarah-became-a-superhost-in-3-months",
    title: "How Sarah Became a Superhost in 3 Months",
    excerpt: "Learn how one host used HostsHub.ai to grow her business fast.",
    image: "/images/blog/2.png",
    date: "March 20, 2025",
    author: "HostsHub Team",
    category: "Success Stories"
  },
  {
    slug: "new-feature-dynamic-pricing-engine",
    title: "New Feature: Dynamic Pricing Engine",
    excerpt: "Maximize your revenue with our latest AI-powered pricing tool.",
    image: "/images/blog/3.png",
    date: "March 10, 2025",
    author: "HostsHub Team",
    category: "Updates"
  },
  {
    slug: "the-ultimate-guide-to-guest-communication",
    title: "The Ultimate Guide to Guest Communication",
    excerpt: "Build better relationships and get more 5-star reviews.",
    image: "/images/blog/4.png",
    date: "February 28, 2025",
    author: "HostsHub Team",
    category: "Guides"
  },
  {
    slug: "streamline-your-cleaning-and-maintenance",
    title: "Streamline Your Cleaning and Maintenance",
    excerpt: "Keep your properties guest-ready with less effort.",
    image: "/images/blog/5.png",
    date: "February 15, 2025",
    author: "HostsHub Team",
    category: "Tips"
  },
  {
    slug: "expanding-to-multiple-platforms",
    title: "Expanding to Multiple Platforms",
    excerpt: "How to sync your listings and grow your reach.",
    image: "/images/blog/6.png",
    date: "February 1, 2025",
    author: "HostsHub Team",
    category: "Guides"
  },
  {
    slug: "how-to-handle-difficult-guests",
    title: "How to Handle Difficult Guests",
    excerpt: "Strategies for managing challenging situations with professionalism.",
    image: "/images/blog/7.png",
    date: "January 20, 2025",
    author: "HostsHub Team",
    category: "Tips"
  },
  {
    slug: "pricing-strategies-for-peak-seasons",
    title: "Pricing Strategies for Peak Seasons",
    excerpt: "Maximize your revenue during high-demand periods.",
    image: "/images/blog/8.png",
    date: "January 5, 2025",
    author: "HostsHub Team",
    category: "Updates"
  },
  {
    slug: "creating-a-memorable-guest-experience",
    title: "Creating a Memorable Guest Experience",
    excerpt: "Delight your guests and earn more 5-star reviews.",
    image: "/images/blog/9.png",
    date: "December 15, 2024",
    author: "HostsHub Team",
    category: "Guides"
  },
  {
    slug: "managing-multiple-properties-efficiently",
    title: "Managing Multiple Properties Efficiently",
    excerpt: "Scale your hosting business without the headaches.",
    image: "/images/blog/10.png",
    date: "December 1, 2024",
    author: "HostsHub Team",
    category: "Tips"
  }
];

export default function ResourcesPage() {
  const [visibleCount, setVisibleCount] = useState(6);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("newest");

  const filteredArticles = allArticles
    .filter((post) => {
      const matchesCategory = category === "All" || post.category === category;
      const matchesSearch =
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (sort === "newest") {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      } else if (sort === "oldest") {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      } else if (sort === "az") {
        return a.title.localeCompare(b.title);
      } else if (sort === "za") {
        return b.title.localeCompare(a.title);
      }
      return 0;
    });

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Banner */}
<section className="relative w-full py-12 md:py-16 lg:py-20 bg-gradient-to-r from-blue-100 via-white to-blue-100 border-b overflow-hidden">
        <div className="container px-4 md:px-6 space-y-6 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl text-primary">
            Resources for Hosts
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground">
            Tips, updates, and success stories to help you grow your hosting business.
          </p>
        </div>
      </section>

      <section className="w-full py-12 md:py-20 lg:py-28 bg-muted/5">
        <div className="container px-4 md:px-6 space-y-12">
          {/* Filters */}
          <div className="mb-8 flex flex-col md:flex-row gap-4 w-full">
            <input
              type="text"
              placeholder="Search articles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full md:w-1/3 border rounded-md px-4 py-2"
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full md:w-1/4 border rounded-md px-4 py-2"
            >
              <option value="All">All Categories</option>
              <option value="Tips">Tips</option>
              <option value="Updates">Updates</option>
              <option value="Success Stories">Success Stories</option>
              <option value="Guides">Guides</option>
            </select>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="w-full md:w-1/4 border rounded-md px-4 py-2"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="az">Title A-Z</option>
              <option value="za">Title Z-A</option>
            </select>
          </div>

          <div className="flex flex-col lg:flex-row gap-12">
            {/* Main content */}
            <div className="flex-1 space-y-12">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {filteredArticles.slice(0, visibleCount).map((post, i) => (
                <Link
                  key={i}
                  href={`/blog/${post.slug}`}
                  className="flex flex-col overflow-hidden rounded-xl border shadow-md bg-background hover:shadow-lg transition-all duration-300"
                >
                  <div className="aspect-[3/4] overflow-hidden">
                    <img src={post.image} alt={post.title} className="object-contain w-full h-full transition-transform duration-500 hover:scale-105" />
                  </div>
                  <div className="flex flex-col gap-3 p-6">
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span className="rounded-full border px-2 py-0.5 text-xs font-medium">{post.category}</span>
                      <span>{post.date}</span>
                    </div>
                    <h3 className="text-lg font-semibold">{post.title}</h3>
                    <p className="text-muted-foreground">{post.excerpt}</p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{post.author}</span>
                      <span className="text-primary font-medium hover:underline">
                        Read more →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            {visibleCount < allArticles.length && (
              <div className="flex justify-center">
                <button
                  onClick={() => setVisibleCount(visibleCount + 6)}
                  className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-primary-foreground font-semibold hover:bg-primary/90 transition"
                >
                  Load more articles
                </button>
              </div>
            )}
            </div>

            {/* Sidebar */}
            <aside className="w-full lg:w-64 space-y-8">
              <div className="space-y-4">
                <h4 className="font-semibold text-lg">Categories</h4>
                <ul className="space-y-2">
                  {["Tips", "Updates", "Success Stories", "Guides"].map((cat) => (
                    <li key={cat}>
                      <a href="#" className="hover:underline text-muted-foreground">{cat}</a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-4">
                <h4 className="font-semibold text-lg">Recent Posts</h4>
                <ul className="space-y-2">
                  {allArticles.slice(0, 3).map((post, i) => (
                    <li key={i}>
                      <a href="#" className="hover:underline text-muted-foreground">{post.title}</a>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
