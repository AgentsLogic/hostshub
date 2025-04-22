export default function FeatureLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

// Metadata function for SEO
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
