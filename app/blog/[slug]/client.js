"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { User } from "lucide-react";

// Placeholder comments data
const initialComments = [
  {
    id: 1,
    name: "Alice",
    date: "April 10, 2025",
    content: "Great tips! Automating guest messaging saved me so much time."
  },
  {
    id: 2,
    name: "Bob",
    date: "April 12, 2025",
    content: "Looking forward to trying the dynamic pricing engine."
  }
];

export default function ClientPage({ post, author }) {
  // Comments state (UI only, no backend)
  const [comments, setComments] = useState(initialComments);
  const [commentName, setCommentName] = useState("");
  const [commentContent, setCommentContent] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Blog posts data for related posts
  const blogPosts = [
    {
      slug: "5-ways-to-automate-your-airbnb-business",
      title: "5 Ways to Automate Your Airbnb Business",
      excerpt: "Save time and reduce stress with these automation tips for busy hosts.",
      image: "/images/blog/1.png",
      category: "Tips",
    },
    {
      slug: "how-sarah-became-a-superhost-in-3-months",
      title: "How Sarah Became a Superhost in 3 Months",
      excerpt: "Learn how one host used HostsHub.ai to grow her business fast.",
      image: "/images/blog/2.png",
      category: "Success Stories",
    },
    {
      slug: "new-feature-dynamic-pricing-engine",
      title: "New Feature: Dynamic Pricing Engine",
      excerpt: "Maximize your revenue with our latest AI-powered pricing tool.",
      image: "/images/blog/3.png",
      category: "Updates",
    },
    {
      slug: "the-ultimate-guide-to-guest-communication",
      title: "The Ultimate Guide to Guest Communication",
      excerpt: "Build better relationships and grow your rental business.",
      image: "/images/blog/4.png",
      category: "Guides",
    }
  ];

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!commentName.trim() || !commentContent.trim()) return;
    setSubmitting(true);
    setTimeout(() => {
      setComments([
        ...comments,
        {
          id: comments.length + 1,
          name: commentName,
          date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
          content: commentContent
        }
      ]);
      setCommentName("");
      setCommentContent("");
      setSubmitting(false);
    }, 600);
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 md:px-6">
      <Link href="/resources" className="text-primary hover:underline mb-6 inline-block transition duration-300 ease-in-out hover:scale-105">&larr; Back to Resources</Link>
      <h1 className="text-4xl font-extrabold mb-4">{post.title}</h1>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm text-muted-foreground mb-6 gap-2">
        <span className="rounded-full border px-2 py-0.5">{post.category}</span>
        <span>{post.date}</span>
      </div>
      <img src={post.image} alt={post.title} className="rounded-lg mb-8 w-full h-auto object-cover transition duration-500 hover:scale-105" />
      <article className="prose prose-neutral max-w-none mb-12 text-lg leading-relaxed" dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, "<br/>") }} />

      {/* Author bio */}
      {author && (
        <div className="flex items-center gap-4 border-t pt-6 mt-6">
          <img src={author.avatar} alt={author.name} className="w-12 h-12 rounded-full object-contain bg-white p-1" />
          <div>
            <p className="font-semibold">{author.name}</p>
            <p className="text-muted-foreground text-sm">{author.bio}</p>
          </div>
        </div>
      )}

      {/* Related posts */}
      <div className="mt-12 border-t pt-8">
        <h3 className="text-2xl font-bold mb-6">Related Posts</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {blogPosts
            .filter((p) => p.slug !== post.slug && p.category === post.category)
            .slice(0, 2)
            .map((related) => (
              <Link
                key={related.slug}
                href={`/blog/${related.slug}`}
                className="flex flex-col gap-3 border rounded-lg p-4 hover:shadow transition duration-300 ease-in-out hover:scale-[1.02]"
              >
                <img src={related.image} alt={related.title} className="rounded-md object-cover w-full h-40 transition duration-500 hover:scale-105" />
                <h4 className="font-semibold">{related.title}</h4>
                <p className="text-muted-foreground text-sm">{related.excerpt}</p>
              </Link>
            ))}
        </div>
      </div>

      {/* Comments section */}
      <div className="mt-12 border-t pt-8">
        <h3 className="text-2xl font-bold mb-6">Comments</h3>
        {comments.length === 0 ? (
          <p className="text-muted-foreground">No comments yet. Be the first to comment!</p>
        ) : (
          <div className="space-y-6 mb-8">
            {comments.map((comment) => (
              <Card key={comment.id}>
                <CardHeader className="flex flex-row items-center gap-3 pb-2">
                  <User className="h-5 w-5 text-blue-500" />
                  <CardTitle className="text-base font-semibold">{comment.name}</CardTitle>
                  <span className="text-xs text-muted-foreground ml-auto">{comment.date}</span>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">{comment.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
        <form onSubmit={handleCommentSubmit} className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <Input
              placeholder="Your name"
              value={commentName}
              onChange={(e) => setCommentName(e.target.value)}
              required
              className="sm:w-1/3"
            />
            <Textarea
              placeholder="Add a comment..."
              value={commentContent}
              onChange={(e) => setCommentContent(e.target.value)}
              required
              className="flex-1"
              rows={2}
            />
          </div>
          <Button type="submit" disabled={submitting || !commentName.trim() || !commentContent.trim()}>
            {submitting ? "Posting..." : "Post Comment"}
          </Button>
        </form>
      </div>

      <div className="mt-12">
        <Link href="/resources" className="text-primary hover:underline transition duration-300 ease-in-out hover:scale-105">&larr; Back to Resources</Link>
      </div>
    </div>
  );
}
