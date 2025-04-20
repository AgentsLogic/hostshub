"use client"

import React, { useRef } from 'react'
import { ChevronRight } from 'lucide-react'

interface BlogPost {
  title: string
  excerpt: string
  link: string
  image: string
}

interface BlogCarouselProps {
  posts: BlogPost[]
}

export function BlogCarousel({ posts }: BlogCarouselProps) {
  const scrollerRef = useRef<HTMLDivElement>(null)

  const scrollLeft = () => {
    if (scrollerRef.current) {
      scrollerRef.current.scrollBy({ left: -350, behavior: 'smooth' })
    }
  }

  const scrollRight = () => {
    if (scrollerRef.current) {
      scrollerRef.current.scrollBy({ left: 350, behavior: 'smooth' })
    }
  }

  return (
    <div className="relative max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold">Latest Articles</h3>
        <div className="flex gap-2">
          <button
            className="p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors inline-flex items-center justify-center"
            aria-label="Scroll left"
            onClick={scrollLeft}
          >
            <ChevronRight className="h-5 w-5 transform rotate-180" />
          </button>
          <button
            className="p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors inline-flex items-center justify-center"
            aria-label="Scroll right"
            onClick={scrollRight}
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
      <div
        ref={scrollerRef}
        className="flex overflow-x-auto gap-6 pb-4 snap-x scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {posts.map((post, i) => (
          <div
            key={i}
            className="flex-none w-full sm:w-[calc(50%-12px)] md:w-[350px] snap-start flex flex-col gap-3 p-6 rounded-xl border shadow-md bg-background hover:shadow-lg transition-all duration-300"
          >
                <div className="aspect-[3/4] overflow-hidden rounded-md mb-3">
                  <img
                    src={post.image}
                    alt={post.title}
                    width={400}
                    height={300}
                    className="w-full h-full object-contain"
                  />
                </div>
            <h3 className="text-xl font-semibold">{post.title}</h3>
            <p className="text-muted-foreground">{post.excerpt}</p>
            <a href={post.link} className="text-primary font-medium hover:underline mt-auto">
              Read more →
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}
