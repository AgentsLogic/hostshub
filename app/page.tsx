import React from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { 
  ChevronRight, 
  Home, 
  Star, 
  Globe, 
  BarChart3, 
  Shield, 
  Calendar, 
  MessageSquare, 
  Zap, 
  Users, 
  Award 
} from "lucide-react"
import { ScheduleDemo } from "./components/schedule-demo"
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent
} from "@/components/ui/tabs"
import { BlogCarousel } from "@/components/blog-carousel"

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full py-12 md:py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-red-100 via-white to-blue-100" />
        <div className="container px-4 md:px-6">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
            <div className="flex flex-col justify-center space-y-6">
              <div className="space-y-4">
                <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl text-primary">
                  Automate Your Hosting, Simplify Your Success
                </h1>
                <p className="max-w-[600px] text-lg md:text-xl text-muted-foreground">
                  Our all-in-one platform handles bookings, guest communication, daily operations, and even dynamic pricing—so you can focus on growing your business, not managing it.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link href="/signup">
                  <Button size="lg" className="w-full sm:w-auto shadow-lg hover:scale-105 transition-transform duration-200">
                    Start Automating Today
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="#demo">
                  <Button size="lg" className="w-full sm:w-auto bg-accent-red text-accent-red-foreground hover:bg-accent-red/90 shadow-lg hover:scale-105 transition-transform duration-200">
                    See How It Works
                  </Button>
                </Link>
              </div>
            </div>
            <div className="mx-auto w-full max-w-[500px] lg:max-w-none relative">
              <div className="aspect-video overflow-hidden rounded-xl border bg-background shadow-2xl ring-1 ring-muted/20 animate-fade-in-up">
                <img
                  src="/images/cm.png"
                  alt="Dashboard preview"
                  width={1920}
                  height={1080}
                  className="object-cover w-full transition-transform duration-500 hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
        {/* Trust Badges/Logos Row */}
        <div className="container px-4 md:px-6 mt-12">
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-80">
            <img src="/images/airbnb-logo.png" alt="Airbnb" className="h-8 w-auto grayscale hover:grayscale-0 transition" />
            <img src="/images/vrbo-logo.png" alt="VRBO" className="h-8 w-auto grayscale hover:grayscale-0 transition" />
            <img src="/images/booking-logo.png" alt="Booking.com" className="h-8 w-auto grayscale hover:grayscale-0 transition" />
            <img src="/images/expedia-logo.png" alt="Expedia" className="h-8 w-auto grayscale hover:grayscale-0 transition" />
            <img src="/images/tripadvisor-logo.png" alt="Tripadvisor" className="h-8 w-auto grayscale hover:grayscale-0 transition" />
          </div>
        </div>
      </section>

      {/* Everything You Need */}
      <section className="relative w-full py-12 md:py-20 lg:py-28 bg-muted/10">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-6 text-center">
            <div className="space-y-3">
            <h2 className="text-4xl font-extrabold tracking-tight md:text-5xl text-primary">
              Everything you need
            </h2>
              <p className="max-w-[900px] text-lg md:text-xl text-muted-foreground">
                Powerful tools for professional hosts
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 pt-16">
            {[
              { icon: Globe, title: "Beautiful Websites", desc: "Create stunning, custom websites for each of your properties with our easy-to-use templates and design tools." },
              { icon: Calendar, title: "Smart Calendar", desc: "Manage all your bookings in one place with our intelligent calendar system that syncs across platforms." },
              { icon: BarChart3, title: "Analytics & Insights", desc: "Make data-driven decisions with our comprehensive analytics dashboard and revenue tracking." },
              { icon: Zap, title: "Automated Operations", desc: "Streamline your business with automated messaging, cleaning schedules, and maintenance tracking." },
              { icon: Users, title: "Guest Management", desc: "Provide an exceptional experience with automated check-ins, local guides, and personalized communication." },
              { icon: MessageSquare, title: "Review Management", desc: "Monitor and respond to reviews across all platforms, maintaining your stellar reputation." },
              { icon: Globe, title: "Global Reach", desc: "Expand your visibility with multi-platform synchronization and international booking support." },
              { icon: Shield, title: "Trust & Safety", desc: "Keep your properties and guests safe with our advanced security features and verification system." },
              { icon: Award, title: "Superhost Tools", desc: "Access premium tools designed specifically for professional hosts to maintain Superhost status." }
            ].map((feature, i) => (
              <div
                key={i}
                className="group flex flex-col gap-4 p-6 rounded-xl border bg-background transition-all duration-300 hover:shadow-xl hover:-translate-y-1 relative overflow-hidden animate-fade-in-up"
              >
                {/* Subtle gradient background that shows on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent-red/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Accent border top */}
                <div className={`absolute top-0 left-0 right-0 h-0.5 ${
                  i % 3 === 0 ? 'bg-primary' : i % 3 === 1 ? 'bg-accent-red' : 'bg-blue-500'
                } transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300`} />
                
                {/* Improved icon container with subtle animation */}
                <div
                  className={`relative flex h-14 w-14 items-center justify-center rounded-full ${
                    i % 9 === 0
                      ? 'bg-gradient-to-br from-primary/20 to-primary/10 text-primary'
                      : i % 9 === 1
                        ? 'bg-red-500 text-white shadow-red-500/20'
                        : i % 9 === 2
                          ? 'bg-gradient-to-br from-blue-500/20 to-blue-500/10 text-blue-500'
                          : i % 9 === 3
                            ? 'bg-green-500 text-white shadow-green-500/20'
                            : i % 9 === 4
                              ? 'bg-yellow-500 text-black shadow-yellow-500/20'
                              : i % 9 === 5
                                ? 'bg-purple-500 text-white shadow-purple-500/20'
                                : i % 9 === 6
                                  ? 'bg-orange-500 text-white shadow-orange-500/20'
                                  : i % 9 === 7
                                    ? 'bg-pink-500 text-white shadow-pink-500/20'
                                    : 'bg-teal-500 text-white shadow-teal-500/20'
                  } shadow-sm group-hover:shadow-md transition-all duration-300 group-hover:scale-105`}
                  title={feature.title}
                >
                  <div className="absolute inset-0 rounded-full bg-white/50 opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
                  {React.createElement(feature.icon, { className: "h-6 w-6 relative z-10" })}
                </div>
                
                {/* Title with improved spacing and subtle animation */}
                <h3 className="text-xl font-bold tracking-tight group-hover:translate-x-0.5 transition-transform duration-300">
                  {feature.title}
                </h3>
                
                {/* Description with improved typography */}
                <p className="text-muted-foreground/90 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mid-Page CTA Section */}
      <section className="w-full py-12 md:py-20 lg:py-28 bg-primary text-primary-foreground">
        <div className="container px-4 md:px-6 text-center space-y-6">
          <h2 className="text-4xl font-extrabold tracking-tight md:text-5xl">Ready to simplify your hosting?</h2>
          <p className="max-w-[800px] mx-auto text-lg md:text-xl">Join thousands of hosts who are automating their business and achieving greater success with HostsHub.ai.</p>
          <div className="flex flex-col gap-3 sm:flex-row justify-center">
            <Link href="/signup">
              <Button size="lg" className="w-full sm:w-auto shadow-lg hover:scale-105 transition-transform duration-200 bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                Start Your Free Trial
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="#demo">
              <Button size="lg" className="w-full sm:w-auto shadow-lg hover:scale-105 transition-transform duration-200 bg-accent-red text-accent-red-foreground hover:bg-accent-red/90">
                See a Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative w-full py-12 md:py-20 lg:py-28 overflow-hidden border-t">
        <div className="absolute inset-0 -z-10">
          <div id="parallax-bg" className="w-full h-full bg-gradient-to-br from-red-50 via-white to-blue-50 transition-all duration-500"></div>
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/20 rounded-full mix-blend-multiply filter blur-3xl"></div>
          <div className="absolute top-1/2 -right-24 w-96 h-96 bg-accent-red/20 rounded-full mix-blend-multiply filter blur-3xl"></div>
        </div>
        <div className="container px-4 md:px-6 space-y-12 relative z-10">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <h2 className="text-4xl font-extrabold tracking-tight md:text-5xl text-primary">
              Trusted by Professional Hosts
            </h2>
            <p className="max-w-[800px] text-lg md:text-xl text-muted-foreground">
              See how HostsHub.ai is transforming hosting businesses worldwide.
            </p>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                quote: "HostsHub.ai automated 90% of my daily tasks. I finally have time to focus on growing my business.",
                name: "Sarah, Superhost in Austin",
                image: "/images/placeholder-user.jpg" // Replace with actual image path
              },
              {
                quote: "Dynamic pricing boosted my revenue by 30% in just a few months. It's a game changer.",
                name: "James, Property Manager in Miami",
                image: "/images/placeholder-user.jpg" // Replace with actual image path
              },
              {
                quote: "The platform is so easy to use. I set it up in a day and it runs everything for me.",
                name: "Lena, Boutique Hotel Owner",
                image: "/images/placeholder-user.jpg" // Replace with actual image path
              }
            ].map((t, i) => (
              <div key={i} className="flex flex-col gap-4 p-6 rounded-xl border shadow-md bg-muted/10 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center gap-4">
                  <Image
                    src={t.image}
                    alt={t.name}
                    width={56}
                    height={56}
                    className="rounded-full object-cover"
                  />
                  <div className="flex flex-col">
                    <p className="text-muted-foreground">&ldquo;{t.quote}&rdquo;</p>
                    <p className="font-semibold mt-2">{t.name}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog/Resources Section */}
      <section className="w-full py-12 md:py-20 lg:py-28 bg-muted/5 border-t">
        <div className="container px-4 md:px-6 space-y-12">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <h2 className="text-4xl font-extrabold tracking-tight md:text-5xl text-primary">
              Resources for Hosts
            </h2>
            <p className="max-w-[800px] text-lg md:text-xl text-muted-foreground">
              Tips, updates, and success stories to help you grow your hosting business.
            </p>
          </div>
          {/* Blog carousel component - client component for interactivity */}
          <BlogCarousel 
            posts={[
              {
                title: "5 Ways to Automate Your Airbnb Business",
                excerpt: "Save time and reduce stress with these automation tips for busy hosts.",
                link: "#",
                image: "/images/blog/1.png"
              },
              {
                title: "How Sarah Became a Superhost in 3 Months",
                excerpt: "Learn how one host used HostsHub.ai to grow her business fast.",
                link: "#",
                image: "/images/blog/2.png"
              },
              {
                title: "New Feature: Dynamic Pricing Engine",
                excerpt: "Maximize your revenue with our latest AI-powered pricing tool.",
                link: "#",
                image: "/images/blog/3.png"
              },
              {
                title: "The Ultimate Guide to Guest Communication",
                excerpt: "Build better relationships and grow your rental business.",
                link: "#",
                image: "/images/blog/4.png"
              },
              {
                title: "Streamline Your Cleaning and Maintenance",
                excerpt: "Keep your properties guest-ready with less effort.",
                link: "#",
                image: "/images/blog/5.png"
              },
              {
                title: "Expanding to Multiple Platforms",
                excerpt: "How to sync your listings and grow your reach.",
                link: "#",
                image: "/images/blog/6.png"
              }
            ]}
          />
          <div className="flex justify-center">
            <a href="/resources" className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-primary-foreground font-semibold hover:bg-primary/90 transition">
              View all resources
            </a>
          </div>
        </div>
      </section>

    </div>
  )
}
