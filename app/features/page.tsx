import Link from "next/link";
import { Building, CalendarDays, BarChart3, MessageSquare, ClipboardList, Star, Share2, PieChart, Users, Globe, Shield, Award, ArrowRight } from "lucide-react";

export default function FeaturesPage() {
  // Define feature categories with their respective features
  const featureCategories = [
    {
      title: "Core Platform Features",
      features: [
        {
          icon: <Building className="h-10 w-10 text-blue-500" />,
          title: "Beautiful Websites",
          desc: "Create stunning, customizable websites for each of your properties with our easy-to-use templates and design tools.",
          color: "bg-blue-50 dark:bg-blue-950/40",
          borderColor: "border-blue-100 dark:border-blue-900",
        },
        {
          icon: <CalendarDays className="h-10 w-10 text-green-500" />,
          title: "Smart Calendar",
          desc: "Sync bookings across platforms and manage your schedule effortlessly with our intelligent calendar system.",
          color: "bg-green-50 dark:bg-green-950/40",
          borderColor: "border-green-100 dark:border-green-900",
        },
        {
          icon: <BarChart3 className="h-10 w-10 text-purple-500" />,
          title: "Dynamic Pricing",
          desc: "Maximize revenue with AI-powered pricing adjustments that respond to market demand, local events, and seasonal trends.",
          color: "bg-purple-50 dark:bg-purple-950/40",
          borderColor: "border-purple-100 dark:border-purple-900",
        },
      ],
    },
    {
      title: "Automation & Efficiency",
      features: [
        {
          icon: <MessageSquare className="h-10 w-10 text-yellow-500" />,
          title: "Automated Messaging",
          desc: "Send personalized messages to guests automatically at key moments like booking confirmation, check-in instructions, and follow-ups.",
          color: "bg-yellow-50 dark:bg-yellow-950/40",
          borderColor: "border-yellow-100 dark:border-yellow-900",
        },
        {
          icon: <ClipboardList className="h-10 w-10 text-indigo-500" />,
          title: "Task Management",
          desc: "Coordinate cleaning, maintenance, and team tasks with ease using our comprehensive task management system.",
          color: "bg-indigo-50 dark:bg-indigo-950/40",
          borderColor: "border-indigo-100 dark:border-indigo-900",
        },
        {
          icon: <Star className="h-10 w-10 text-amber-500" />,
          title: "Review Management",
          desc: "Monitor and respond to guest reviews from all platforms in one centralized dashboard to maintain your stellar reputation.",
          color: "bg-amber-50 dark:bg-amber-950/40",
          borderColor: "border-amber-100 dark:border-amber-900",
        },
      ],
    },
    {
      title: "Integrations & Analytics",
      features: [
        {
          icon: <Share2 className="h-10 w-10 text-rose-500" />,
          title: "Channel Manager",
          desc: "Connect Airbnb, Vrbo, Booking.com, and more in one place with automated synchronization across all platforms.",
          color: "bg-rose-50 dark:bg-rose-950/40",
          borderColor: "border-rose-100 dark:border-rose-900",
        },
        {
          icon: <PieChart className="h-10 w-10 text-cyan-500" />,
          title: "Analytics & Reports",
          desc: "Track revenue, occupancy, and performance metrics with intuitive dashboards and downloadable reports.",
          color: "bg-cyan-50 dark:bg-cyan-950/40",
          borderColor: "border-cyan-100 dark:border-cyan-900",
        },
        {
          icon: <Users className="h-10 w-10 text-teal-500" />,
          title: "Team Collaboration",
          desc: "Assign roles, permissions, and communicate with your team through our streamlined collaboration tools.",
          color: "bg-teal-50 dark:bg-teal-950/40",
          borderColor: "border-teal-100 dark:border-teal-900",
        },
      ],
    },
    {
      title: "Premium Solutions",
      features: [
        {
          icon: <Globe className="h-10 w-10 text-emerald-500" />,
          title: "Global Reach",
          desc: "Expand your visibility with multi-platform synchronization and international booking support for worldwide guests.",
          color: "bg-emerald-50 dark:bg-emerald-950/40",
          borderColor: "border-emerald-100 dark:border-emerald-900",
        },
        {
          icon: <Shield className="h-10 w-10 text-red-500" />,
          title: "Trust & Safety",
          desc: "Keep your properties and guests safe with our advanced security features and verification system.",
          color: "bg-red-50 dark:bg-red-950/40",
          borderColor: "border-red-100 dark:border-red-900",
        },
        {
          icon: <Award className="h-10 w-10 text-orange-500" />,
          title: "Superhost Tools",
          desc: "Access premium tools designed specifically for professional hosts to maintain Superhost status across platforms.",
          color: "bg-orange-50 dark:bg-orange-950/40",
          borderColor: "border-orange-100 dark:border-orange-900",
        },
      ],
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full py-8 md:py-12 lg:py-16 overflow-hidden bg-gradient-to-b from-primary/5 via-background to-background border-b">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
          <div className="absolute top-1/3 -right-24 w-96 h-96 bg-accent-red/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full h-1/2 bg-gradient-to-t from-background to-transparent"></div>
          
          {/* Decorative grid pattern */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGZpbGw9IiMwMDAwMDAiIGZpbGwtb3BhY2l0eT0iMC4wMiIgZD0iTTAgMGg2MHY2MEgweiIvPjxwYXRoIGQ9Ik0zNiAxOGMwLTkuOTQtOC4wNi0xOC0xOC0xOHY2YzYuNjMgMCAxMiA1LjM3IDEyIDEyaC02YzAgNi42MyA1LjM3IDEyIDEyIDEydjZjOS45NCAwIDE4LTguMDYgMTgtMThoLTZjMCA2LjYzLTUuMzcgMTItMTIgMTJ2LTZjLTYuNjMgMC0xMi01LjM3LTEyLTEyaDZ6IiBmaWxsPSIjMDAwMDAwIiBmaWxsLW9wYWNpdHk9IjAuMDQiIGZpbGwtcnVsZT0ibm9uemVybyIvPjwvZz48L3N2Zz4=')] opacity-10"></div>
        </div>

        <div className="container px-4 md:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-10">
            {/* Heading with animated gradient border */}
            <div className="relative inline-block">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary via-accent-red to-primary rounded-xl opacity-70 blur-lg group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-gradient-x"></div>
              <div className="relative px-8 py-6 rounded-lg">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-primary drop-shadow">
                  Powerful Features for Professional Hosts
                </h1>
              </div>
            </div>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
              Automate your hosting business with our all-in-one platform, save time and make more money.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <a
                href="/signup"
                className="inline-flex items-center gap-2 rounded-md bg-primary text-primary-foreground px-8 py-3 font-semibold hover:bg-primary/90 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-1"
              >
                Get Started <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="/dashboard/pricing"
                className="inline-flex items-center gap-2 rounded-md border border-primary/20 bg-background text-foreground px-8 py-3 font-semibold hover:bg-primary/10 transition-all"
              >
                View Pricing
              </a>
            </div>
            
            {/* Feature highlights */}
            <div className="grid grid-cols-3 gap-4 pt-8 text-sm text-muted-foreground max-w-3xl mx-auto">
              <div className="flex items-center justify-center gap-2">
                <CalendarDays className="h-4 w-4 text-primary" />
                <span>Smart Calendar</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <BarChart3 className="h-4 w-4 text-primary" />
                <span>Dynamic Pricing</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Share2 className="h-4 w-4 text-primary" />
                <span>Channel Manager</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Sections */}
      {featureCategories.map((category, categoryIndex) => (
        <section 
          key={categoryIndex} 
          className={`w-full py-8 md:py-12 ${categoryIndex % 2 !== 0 ? 'bg-muted/10' : ''}`}
        >
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold text-center mb-12 text-primary">{category.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {category.features.map((feature, featureIndex) => (
                <Link
                  key={featureIndex}
                  href={`/features/${feature.title.toLowerCase().replace(/\s+/g, "-")}`}
                  className={`flex flex-col gap-4 p-8 rounded-xl border ${feature.borderColor} shadow-sm ${feature.color} hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group`}
                >
                  <div className="flex items-center justify-center w-16 h-16 rounded-full bg-background shadow-sm mb-2">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Testimonials Section */}
      <section className="w-full py-8 md:py-12 bg-muted/5 border-y">
        <div className="container px-4 md:px-6 space-y-8">
          <h2 className="text-3xl font-bold text-center text-primary mb-8">What Our Hosts Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                quote: "Since using HostsHub, I've doubled my bookings while cutting my management time in half. The dynamic pricing feature alone paid for itself in the first month.",
                author: "Sarah K.",
                role: "Property Manager, 12 listings"
              },
              {
                quote: "The channel manager is a game-changer. I no longer worry about double bookings, and all my properties sync perfectly across Airbnb, VRBO, and Booking.com.",
                author: "Michael T.",
                role: "Vacation Rental Owner"
              },
              {
                quote: "The automated messaging and task management features help me maintain my Superhost status without the burnout. My guests love the consistent communication.",
                author: "Jessica M.",
                role: "Superhost, 8 properties"
              }
            ].map((testimonial, i) => (
              <div 
                key={i} 
                className="flex flex-col p-6 rounded-xl border bg-background shadow-sm hover:shadow-md transition-all"
              >
                <div className="text-4xl text-primary mb-4">"</div>
                <p className="italic text-muted-foreground mb-6">{testimonial.quote}</p>
                <div className="mt-auto">
                  <p className="font-semibold">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-8 md:py-12 lg:py-16 bg-primary text-primary-foreground text-center">
        <div className="container px-4 md:px-6 space-y-8">
          <h2 className="text-3xl md:text-4xl font-extrabold">
            Ready to Automate Your Hosting Business?
          </h2>
          <p className="max-w-2xl mx-auto text-lg md:text-xl">
            Sign up today and start saving time, increasing revenue, and delighting your guests.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <a
              href="/signup"
              className="inline-flex items-center gap-2 rounded-md bg-primary-foreground text-primary px-8 py-3 font-semibold hover:bg-primary-foreground/90 transition"
            >
              Get Started <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="/dashboard/pricing"
              className="inline-flex items-center gap-2 rounded-md bg-primary/20 border border-primary-foreground/20 text-primary-foreground px-8 py-3 font-semibold hover:bg-primary/30 transition"
            >
              View Pricing
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
