"use client";

import { useParams } from "next/navigation";

const featureDetails: Record<string, { title: string; description: string }> = {
  "beautiful-websites": {
    title: "Beautiful Websites",
    description: "Create stunning, customizable websites for each of your properties with our easy-to-use templates and design tools."
  },
  "smart-calendar": {
    title: "Smart Calendar",
    description: "Sync bookings across platforms and manage your schedule effortlessly with our intelligent calendar system."
  },
  "dynamic-pricing": {
    title: "Dynamic Pricing",
    description: "Maximize revenue with AI-powered pricing adjustments that respond to market demand, local events, and seasonal trends."
  },
  "automated-messaging": {
    title: "Automated Messaging",
    description: "Send personalized messages to guests automatically at key moments like booking confirmation, check-in instructions, and follow-ups."
  },
  "task-management": {
    title: "Task Management",
    description: "Coordinate cleaning, maintenance, and team tasks with ease using our comprehensive task management system."
  },
  "review-management": {
    title: "Review Management",
    description: "Monitor and respond to guest reviews from all platforms in one centralized dashboard to maintain your stellar reputation."
  },
  "channel-manager": {
    title: "Channel Manager",
    description: "Connect Airbnb, Vrbo, Booking.com, and more in one place with automated synchronization across all platforms."
  },
  "analytics-reports": {
    title: "Analytics & Reports",
    description: "Track revenue, occupancy, and performance metrics with intuitive dashboards and downloadable reports."
  },
  "team-collaboration": {
    title: "Team Collaboration",
    description: "Assign roles, permissions, and communicate with your team through our streamlined collaboration tools."
  },
  "global-reach": {
    title: "Global Reach",
    description: "Expand your visibility with multi-platform synchronization and international booking support for worldwide guests."
  },
  "trust-safety": {
    title: "Trust & Safety",
    description: "Keep your properties and guests safe with our advanced security features and verification system."
  },
  "superhost-tools": {
    title: "Superhost Tools",
    description: "Access premium tools designed specifically for professional hosts to maintain Superhost status across platforms."
  }
};

export default function FeatureDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const feature = featureDetails[slug];

  if (!feature) {
    return (
      <div className="container py-12">
        <h1 className="text-3xl font-bold mb-4">Feature Not Found</h1>
        <p>The feature you're looking for does not exist.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <section className="relative w-full py-16 md:py-24 lg:py-32 bg-gradient-to-r from-blue-100 via-white to-blue-100 border-b overflow-hidden">
        <div className="container px-4 md:px-6 space-y-6 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-primary">
            {feature.title}
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground">
            {feature.description}
          </p>
        </div>
      </section>

      <section className="container py-12 md:py-20 lg:py-28">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">How {feature.title} Helps You</h2>
        {slug === "beautiful-websites" ? (
          <div className="space-y-6 text-lg leading-relaxed">
            <p>
              Create a stunning website for a single property or showcase your entire portfolio. Use our professional templates or customize your own design with our drag-and-drop editor.
            </p>
            <p>
              Your website is mobile-friendly, SEO optimized, and integrates seamlessly with your booking engine and calendar. Showcase photos, amenities, reviews, and location to attract more guests.
            </p>
            <p>
              Use your own domain or a free subdomain. Increase direct bookings, build your brand, and reduce fees from third-party platforms.
            </p>
            <ul className="grid gap-4 md:grid-cols-2 list-disc pl-6">
              <li>Single property or portfolio websites</li>
              <li>Professional templates or custom designs</li>
              <li>Drag-and-drop editor</li>
              <li>Mobile-friendly and SEO optimized</li>
              <li>Integrated booking engine</li>
              <li>Showcase photos, amenities, reviews</li>
              <li>Use your own domain or free subdomain</li>
              <li>Increase direct bookings and revenue</li>
            </ul>
            <div className="pt-6">
              <a
                href="/dashboard/websites"
                className="inline-flex items-center gap-2 rounded-md bg-primary text-primary-foreground px-8 py-3 font-semibold hover:bg-primary/90 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-1"
              >
                Build Your Website
              </a>
            </div>
          </div>
        ) : slug === "smart-calendar" ? (
          <div className="space-y-6 text-lg leading-relaxed">
            <p>
              Manage all your bookings in one place with our Smart Calendar. Sync reservations from Airbnb, Vrbo, Booking.com, and your own website automatically.
            </p>
            <p>
              Avoid double bookings with real-time updates. Block dates, adjust availability, and drag-and-drop to reschedule with ease.
            </p>
            <p>
              Filter by property, channel, or booking status. Color-coded events give you instant insights into your schedule.
            </p>
            <ul className="grid gap-4 md:grid-cols-2 list-disc pl-6">
              <li>Sync bookings across all platforms</li>
              <li>Real-time updates to avoid double bookings</li>
              <li>Drag-and-drop to adjust reservations</li>
              <li>Block dates and manage availability</li>
              <li>Color-coded calendar for quick insights</li>
              <li>Filter by property, channel, or status</li>
              <li>Mobile-friendly calendar management</li>
              <li>Automated reminders and notifications</li>
            </ul>
          </div>
        ) : slug === "dynamic-pricing" ? (
          <div className="space-y-6 text-lg leading-relaxed">
            <p>
              Maximize your revenue with AI-powered dynamic pricing. Our system automatically adjusts your nightly rates based on market demand, local events, seasonality, and competitor pricing.
            </p>
            <p>
              Set your minimum and maximum prices, customize your pricing strategy, and let the system optimize your rates daily to increase occupancy and profits.
            </p>
            <p>
              Stay competitive without manual work. Boost bookings during slow periods and capitalize on high demand automatically.
            </p>
            <ul className="grid gap-4 md:grid-cols-2 list-disc pl-6">
              <li>AI-powered pricing adjustments</li>
              <li>Factors in demand, events, seasonality, competitors</li>
              <li>Daily automatic price updates</li>
              <li>Set minimum and maximum rates</li>
              <li>Customize pricing strategies</li>
              <li>Increase occupancy during slow periods</li>
              <li>Boost profits during high demand</li>
              <li>Works across all connected channels</li>
            </ul>
          </div>
        ) : (
          <>
            <p className="mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel tincidunt
              fermentum, nunc sapien aliquam nisl, eget aliquam nunc nisl eu nisl. Sed euismod, nisl vel
              tincidunt fermentum, nunc sapien aliquam nisl, eget aliquam nunc nisl eu nisl.
            </p>
            <p className="mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel tincidunt
              fermentum, nunc sapien aliquam nisl, eget aliquam nunc nisl eu nisl.
            </p>
            <p className="mb-8">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel tincidunt
              fermentum, nunc sapien aliquam nisl, eget aliquam nunc nisl eu nisl.
            </p>
          </>
        )}
      </section>
    </div>
  );
}

// Generate metadata for SEO
export function generateMetadata({ params }: { params: { slug: string } }) {
  const featureDetails: Record<string, { title: string; description: string }> = {
    "beautiful-websites": {
      title: "Beautiful Websites",
      description: "Create stunning, customizable websites for each of your properties with our easy-to-use templates and design tools."
    },
    "smart-calendar": {
      title: "Smart Calendar",
      description: "Sync bookings across platforms and manage your schedule effortlessly with our intelligent calendar system."
    },
    "dynamic-pricing": {
      title: "Dynamic Pricing",
      description: "Maximize revenue with AI-powered pricing adjustments that respond to market demand, local events, and seasonal trends."
    },
    "automated-messaging": {
      title: "Automated Messaging",
      description: "Send personalized messages to guests automatically at key moments like booking confirmation, check-in instructions, and follow-ups."
    },
    "task-management": {
      title: "Task Management",
      description: "Coordinate cleaning, maintenance, and team tasks with ease using our comprehensive task management system."
    },
    "review-management": {
      title: "Review Management",
      description: "Monitor and respond to guest reviews from all platforms in one centralized dashboard to maintain your stellar reputation."
    },
    "channel-manager": {
      title: "Channel Manager",
      description: "Connect Airbnb, Vrbo, Booking.com, and more in one place with automated synchronization across all platforms."
    },
    "analytics-reports": {
      title: "Analytics & Reports",
      description: "Track revenue, occupancy, and performance metrics with intuitive dashboards and downloadable reports."
    },
    "team-collaboration": {
      title: "Team Collaboration",
      description: "Assign roles, permissions, and communicate with your team through our streamlined collaboration tools."
    },
    "global-reach": {
      title: "Global Reach",
      description: "Expand your visibility with multi-platform synchronization and international booking support for worldwide guests."
    },
    "trust-safety": {
      title: "Trust & Safety",
      description: "Keep your properties and guests safe with our advanced security features and verification system."
    },
    "superhost-tools": {
      title: "Superhost Tools",
      description: "Access premium tools designed specifically for professional hosts to maintain Superhost status across platforms."
    }
  };
  
  const slug = params.slug;
  const feature = featureDetails[slug];
  
  if (!feature) {
    return {
      title: 'Feature Not Found',
      description: 'The feature you are looking for could not be found.'
    };
  }
  
  return {
    title: `${feature.title} - HostsHub Feature`,
    description: feature.description,
    openGraph: {
      title: feature.title,
      description: feature.description,
      type: 'website'
    }
  };
}
