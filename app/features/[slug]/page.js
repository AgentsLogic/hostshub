import { notFound } from "next/navigation";
import Link from "next/link";

// Define the feature details
const featureDetails = {
  "beautiful-websites": {
    title: "Beautiful Websites",
    description: "Stunning websites for your vacation rental business.",
    content: `
      <h2>Elevate Your Vacation Rental Business with Professional Websites</h2>
      <p>First impressions matter. Our beautiful, professionally designed websites help you showcase your property in the best light possible.</p>
      <p>With HostsHub, you can create a stunning website in minutes without any technical knowledge required.</p>
      
      <h3>Key Website Features</h3>
      <ul>
        <li><strong>Mobile Responsive Design</strong> - Your website will look great on any device</li>
        <li><strong>Fast Loading Times</strong> - Keep potential guests engaged with lightning fast page loads</li>
        <li><strong>SEO Optimized</strong> - Get found by more potential guests through search engines</li>
        <li><strong>Easy Customization</strong> - Change colors, fonts, and layouts with a few clicks</li>
        <li><strong>Direct Booking Integration</strong> - Allow guests to book directly on your website</li>
      </ul>
      
      <h3>Stand Out from the Competition</h3>
      <p>With so many vacation rentals available, having a professional website helps you stand out from the crowd. Showcase your property's unique features and create a memorable brand that guests will remember and recommend.</p>
      
      <h3>No Technical Skills Required</h3>
      <p>Our intuitive drag-and-drop editor makes it easy to create and update your website without any coding knowledge. If you can use a word processor, you can build a beautiful website with HostsHub.</p>
    `,
    image: "/images/feature-websites.jpg",
  },
  "channel-manager": {
    title: "Channel Manager",
    description: "Manage all your listings from one dashboard.",
    content: `
      <h2>Effortlessly Manage All Your Listings</h2>
      <p>Managing properties across multiple platforms can be time-consuming and prone to errors. Our powerful Channel Manager simplifies this process by syncing your availability, rates, and bookings across all major platforms from a single dashboard.</p>
      
      <h3>Key Channel Manager Features</h3>
      <ul>
        <li><strong>Centralized Calendar</strong> - View and manage all your bookings in one place</li>
        <li><strong>Real-time Synchronization</strong> - Automatic updates across Airbnb, Vrbo, Booking.com and more</li>
        <li><strong>Smart Pricing</strong> - Optimize your rates based on demand, seasonality, and local events</li>
        <li><strong>Instant Booking Updates</strong> - No more double bookings or manual updates</li>
        <li><strong>Performance Analytics</strong> - Track your properties' performance across all channels</li>
      </ul>
      
      <h3>Save Hours Every Week</h3>
      <p>Hosts report saving an average of 5-10 hours per week by using our Channel Manager. That's time you can spend improving your properties, communicating with guests, or simply enjoying life.</p>
      
      <h3>Prevent Costly Mistakes</h3>
      <p>Double bookings and calendar errors can cost you money and damage your reputation. Our Channel Manager ensures your availability is always in sync, preventing these costly mistakes.</p>
    `,
    image: "/images/feature-channel.jpg",
  },
  "automated-messaging": {
    title: "Automated Messaging",
    description: "Keep guests informed with automatic messages.",
    content: `
      <h2>Communicate Efficiently with Automated Messaging</h2>
      <p>Delivering exceptional guest experiences starts with clear, timely communication. Our Automated Messaging feature ensures your guests receive the right information at the right time, without requiring your constant attention.</p>
      
      <h3>Key Automated Messaging Features</h3>
      <ul>
        <li><strong>Personalized Templates</strong> - Customize messages to match your style and brand</li>
        <li><strong>Booking Triggers</strong> - Automatically send messages at key points in the guest journey</li>
        <li><strong>Multi-Channel Support</strong> - Send messages via email, SMS, or platform messaging</li>
        <li><strong>Quick Responses</strong> - Create saved responses for common questions</li>
        <li><strong>AI-Powered Suggestions</strong> - Get help crafting the perfect response</li>
      </ul>
      
      <h3>Enhanced Guest Experience</h3>
      <p>Guests appreciate timely information about check-in procedures, local recommendations, and other important details. Automated messaging ensures nothing falls through the cracks, leading to better reviews and more repeat bookings.</p>
      
      <h3>More Free Time</h3>
      <p>Responding to routine questions and sending check-in instructions manually can eat up hours of your day. Automation handles these tasks for you, freeing up your time for more important matters.</p>
    `,
    image: "/images/feature-messaging.jpg",
  },
  "dynamic-pricing": {
    title: "Dynamic Pricing",
    description: "Maximize revenue with smart pricing strategies.",
    content: `
      <h2>Maximize Your Revenue with Smart Dynamic Pricing</h2>
      <p>Setting the right price for your vacation rental is crucial for maximizing revenue and occupancy. Our Dynamic Pricing tool uses advanced algorithms and real-time market data to optimize your rates automatically.</p>
      
      <h3>Key Dynamic Pricing Features</h3>
      <ul>
        <li><strong>Market-Based Pricing</strong> - Adjust rates based on local demand and competition</li>
        <li><strong>Seasonal Adjustments</strong> - Automatically optimize for high and low seasons</li>
        <li><strong>Event Detection</strong> - Increase rates during local events and peak times</li>
        <li><strong>Minimum Stay Requirements</strong> - Adjust minimum stays based on demand patterns</li>
        <li><strong>Customizable Rules</strong> - Set your own parameters and overrides</li>
      </ul>
      
      <h3>Proven Revenue Increases</h3>
      <p>Hosts using our Dynamic Pricing tool report an average revenue increase of 15-40% compared to static pricing strategies. The system continuously learns and improves, ensuring you're always getting the best possible returns.</p>
      
      <h3>Save Time on Research</h3>
      <p>Manually researching market rates and adjusting your prices takes significant time and expertise. Our automated system handles this for you, giving you professional pricing optimization without the effort.</p>
    `,
    image: "/images/feature-pricing.jpg",
  },
};

// Generate static params for pre-rendering
export async function generateStaticParams() {
  return Object.keys(featureDetails).map((slug) => ({
    slug: slug,
  }));
}

export default function FeaturePage({ params }) {
  const { slug } = params;
  const feature = featureDetails[slug];

  if (!feature) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 md:px-6">
      <Link href="/features" className="text-primary hover:underline mb-6 inline-block transition duration-300 ease-in-out hover:scale-105">&larr; Back to Features</Link>
      <h1 className="text-4xl font-extrabold mb-4">{feature.title}</h1>
      <p className="text-xl text-muted-foreground mb-8">{feature.description}</p>
      
      {feature.image && (
        <img 
          src={feature.image} 
          alt={feature.title} 
          className="rounded-lg mb-8 w-full h-auto object-cover shadow-md transition duration-500 hover:scale-105" 
        />
      )}
      
      <article 
        className="prose prose-neutral max-w-none text-lg leading-relaxed" 
        dangerouslySetInnerHTML={{ __html: feature.content }} 
      />
      
      <div className="mt-12 pt-8 border-t">
        <Link href="/features" className="text-primary hover:underline transition duration-300 ease-in-out hover:scale-105">&larr; Back to Features</Link>
      </div>
    </div>
  );
}

// Generate metadata for SEO
export function generateMetadata({ params }) {
  const feature = featureDetails[params.slug];
  
  if (!feature) {
    return {
      title: "Feature Not Found - HostsHub",
      description: "The requested feature could not be found."
    };
  }
  
  return {
    title: `${feature.title} - HostsHub`,
    description: feature.description
  };
}
