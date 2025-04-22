import { notFound } from "next/navigation";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Blog posts data
const blogPosts = [
  {
    slug: "maximize-bookings",
    title: "10 Ways to Maximize Your Vacation Rental Bookings",
    date: "April 15, 2025",
    author: "HostsHub Team",
    category: "Marketing",
    excerpt: "Learn proven strategies to increase your vacation rental bookings and stand out from the competition.",
    image: "/images/blog-bookings.jpg",
    content: `
      <h2>Why Booking Optimization Matters</h2>
      <p>In today's competitive vacation rental market, simply listing your property isn't enough. To maximize your bookings and revenue, you need a strategic approach that helps you stand out from the crowd.</p>
      
      <p>Here are our top 10 strategies to boost your bookings:</p>
      
      <h3>1. Professional Photography</h3>
      <p>High-quality photos are non-negotiable. Invest in professional photography to showcase your property in the best light. Include wide-angle shots of each room, detailed images of special features, and photos of the surrounding area and amenities.</p>
      
      <h3>2. Optimize Your Listing Title</h3>
      <p>Your listing title is prime real estate. Use it to highlight your property's most appealing features and unique selling points. Include keywords that travelers might search for, such as "beachfront," "private pool," or "family-friendly."</p>
      
      <h3>3. Detailed, Accurate Descriptions</h3>
      <p>Be thorough and honest in your property description. Highlight the benefits of staying at your property, not just the features. Include information about the neighborhood, nearby attractions, and transportation options.</p>
      
      <h3>4. Competitive Pricing</h3>
      <p>Research comparable properties in your area and price accordingly. Consider using dynamic pricing tools to adjust your rates based on demand, seasonality, and local events.</p>
      
      <h3>5. Quick Response Times</h3>
      <p>Respond to inquiries promptly. Many platforms boost listings with fast response times, and guests often book with the first host who responds to their questions.</p>
      
      <h3>6. Flexible Policies</h3>
      <p>When possible, offer flexible cancellation policies. This can encourage bookings, especially during uncertain times. Consider offering discounts for longer stays or last-minute bookings to fill gaps in your calendar.</p>
      
      <h3>7. Outstanding Guest Experience</h3>
      <p>Go above and beyond to create a memorable stay. Small touches like a welcome basket, local recommendations, or clear check-in instructions can make a big difference.</p>
      
      <h3>8. Collect and Showcase Reviews</h3>
      <p>Positive reviews build trust with potential guests. Always ask satisfied guests to leave a review, and respond thoughtfully to all reviews, both positive and negative.</p>
      
      <h3>9. Create a Property Website</h3>
      <p>Having your own website gives you more control over your brand and allows guests to book directly, avoiding platform fees. It also helps with SEO, making your property more discoverable online.</p>
      
      <h3>10. Leverage Social Media</h3>
      <p>Build a presence on platforms like Instagram and Facebook to showcase your property and connect with potential guests. Share photos, local tips, and guest experiences to build an engaged following.</p>
      
      <h2>Putting It All Together</h2>
      <p>Implementing these strategies requires consistent effort, but the results are worth it. By optimizing your listing, providing exceptional service, and building your online presence, you can significantly increase your bookings and revenue.</p>
      
      <p>Remember, the vacation rental market is always evolving, so stay updated on industry trends and be willing to adapt your approach as needed.</p>
    `,
  },
  {
    slug: "guest-communication",
    title: "The Ultimate Guide to Guest Communication",
    date: "April 8, 2025",
    author: "HostsHub Team",
    category: "Guest Relations",
    excerpt: "Discover how effective communication can improve your reviews and increase repeat bookings.",
    image: "/images/blog-communication.jpg",
    content: `
      <h2>The Foundation of Great Hosting</h2>
      <p>Effective communication is perhaps the most important skill for vacation rental hosts. It sets expectations, builds trust, and creates a positive experience from inquiry to check-out and beyond.</p>
      
      <h3>Pre-Booking Communication</h3>
      <p>Your initial interactions with potential guests can make or break a booking decision. Respond quickly and thoroughly to inquiries, addressing any questions or concerns. Be friendly and professional, and provide all the information they need to feel confident in their booking decision.</p>
      
      <p>Key information to share at this stage includes:</p>
      <ul>
        <li>Detailed property features and amenities</li>
        <li>House rules and policies</li>
        <li>Availability and pricing</li>
        <li>Local attractions and transportation options</li>
      </ul>
      
      <h3>Pre-Arrival Communication</h3>
      <p>Once a booking is confirmed, maintain contact to build excitement and provide necessary information. This is the time to share:</p>
      <ul>
        <li>Check-in procedures and access information</li>
        <li>Directions to the property</li>
        <li>Contact details for emergencies</li>
        <li>Local recommendations and tips</li>
      </ul>
      
      <p>Consider sending a countdown message a few days before arrival to confirm details and answer any last-minute questions.</p>
      
      <h3>During-Stay Communication</h3>
      <p>Strike the right balance between being available and respecting your guests' privacy. Make it clear how and when they can reach you, and respond promptly to any issues that arise.</p>
      
      <p>A brief check-in message after their first night can demonstrate your commitment to their comfort without being intrusive.</p>
      
      <h3>Post-Stay Communication</h3>
      <p>After check-out, send a thank-you message and ask for feedback. This is also an excellent opportunity to request a review and invite them to return in the future.</p>
      
      <p>For particularly positive guest experiences, consider offering a return guest discount to encourage repeat bookings.</p>
      
      <h3>Communication Tools and Automation</h3>
      <p>While personal communication is important, automation can help ensure consistency and save time. Consider using:</p>
      <ul>
        <li>Message templates for common situations</li>
        <li>Automated messaging based on booking status</li>
        <li>Digital guidebooks for your property and area</li>
        <li>Communication scheduling tools</li>
      </ul>
      
      <h3>Handling Difficult Situations</h3>
      <p>Even with perfect preparation, issues can arise. When they do:</p>
      <ul>
        <li>Respond quickly and empathetically</li>
        <li>Focus on solutions rather than blame</li>
        <li>Document all communication</li>
        <li>Follow up to ensure the issue was resolved satisfactorily</li>
      </ul>
      
      <h2>The Impact of Great Communication</h2>
      <p>Hosts who excel at communication consistently receive better reviews, fewer complaints, and more repeat bookings. By implementing these strategies, you can create a seamless, positive experience for your guests from their first inquiry to their fond memories of their stay.</p>
    `,
  },
  {
    slug: "property-management-tips",
    title: "Essential Property Management Tips for Vacation Rental Owners",
    date: "March 30, 2025",
    author: "HostsHub Team",
    category: "Property Management",
    excerpt: "Learn how to efficiently manage your vacation rental property for maximum profitability and minimal stress.",
    image: "/images/blog-management.jpg",
    content: `
      <h2>The Art and Science of Property Management</h2>
      <p>Effective property management is a balancing act that requires attention to detail, organizational skills, and a proactive approach. Whether you're managing one property or several, these essential tips will help you streamline your operations and create a better experience for both you and your guests.</p>
      
      <h3>Create Detailed Systems and Procedures</h3>
      <p>Documented procedures are the foundation of efficient property management. Create clear, step-by-step guides for:</p>
      <ul>
        <li>Cleaning and turnover processes</li>
        <li>Maintenance checks and schedules</li>
        <li>Guest check-in and check-out procedures</li>
        <li>Emergency response plans</li>
        <li>Communication workflows</li>
      </ul>
      
      <p>Having these systems in place ensures consistency, saves time, and makes it easier to delegate tasks when needed.</p>
      
      <h3>Build a Reliable Service Provider Network</h3>
      <p>Identify and cultivate relationships with quality service providers, including:</p>
      <ul>
        <li>Cleaning services</li>
        <li>Maintenance professionals</li>
        <li>Landscape and pool services</li>
        <li>Emergency repair contacts</li>
        <li>Local property managers (if you're remote)</li>
      </ul>
      
      <p>Vet your providers carefully and maintain open communication to ensure they understand your expectations.</p>
      
      <h3>Implement Preventative Maintenance</h3>
      <p>Regular preventative maintenance is far less costly and disruptive than emergency repairs. Develop a schedule for:</p>
      <ul>
        <li>HVAC system checks and filter replacements</li>
        <li>Appliance inspections and servicing</li>
        <li>Plumbing and electrical system reviews</li>
        <li>Roof and exterior inspections</li>
        <li>Deep cleaning and property refreshes</li>
      </ul>
      
      <h3>Leverage Technology</h3>
      <p>Property management technology can significantly reduce your workload:</p>
      <ul>
        <li>Property management software for bookings and communications</li>
        <li>Smart locks for keyless entry</li>
        <li>Noise monitors for party prevention</li>
        <li>Smart thermostats for energy management</li>
        <li>Security cameras for external monitoring</li>
        <li>Automated messaging systems</li>
      </ul>
      
      <h3>Create a Stellar Guest Experience</h3>
      <p>A great guest experience leads to better reviews, fewer issues, and more repeat bookings:</p>
      <ul>
        <li>Provide a detailed property guide and local recommendations</li>
        <li>Stock essential supplies and amenities</li>
        <li>Ensure impeccable cleanliness</li>
        <li>Add thoughtful touches that exceed expectations</li>
        <li>Respond quickly to guest needs and concerns</li>
      </ul>
      
      <h3>Financial Management</h3>
      <p>Treat your vacation rental as the business it is:</p>
      <ul>
        <li>Track all income and expenses meticulously</li>
        <li>Set aside funds for maintenance and improvements</li>
        <li>Understand tax implications and potential deductions</li>
        <li>Review and adjust pricing strategies regularly</li>
        <li>Consider professional accounting assistance</li>
      </ul>
      
      <h3>Continuous Improvement</h3>
      <p>The most successful hosts continuously refine their approach:</p>
      <ul>
        <li>Regularly review guest feedback</li>
        <li>Stay updated on industry trends and regulations</li>
        <li>Periodically assess and refresh your property</li>
        <li>Analyze your competition regularly</li>
        <li>Invest in professional development</li>
      </ul>
      
      <h2>Finding Your Balance</h2>
      <p>While these tips require an investment of time and resources, they ultimately create a more profitable and less stressful hosting experience. By implementing systems, leveraging technology, and focusing on quality, you can build a sustainable vacation rental business that works for both you and your guests.</p>
    `,
  }
];

// Define authors data
const authors = {
  "HostsHub Team": {
    name: "HostsHub Team",
    avatar: "/images/team-avatar.jpg",
    bio: "Our team of vacation rental experts with over 50 years of combined experience in the industry."
  }
};

// Generate static params for pre-rendering
export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

// Define the props interface for the page
export default function BlogArticlePage({ params }) {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  const author = authors[post.author];

  // Comments data (static for demo purposes)
  const comments = [
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
        <div className="mt-6">
          <p className="text-muted-foreground mb-4">Comments are disabled in the static version.</p>
          <Button type="button" disabled>Post Comment</Button>
        </div>
      </div>

      <div className="mt-12">
        <Link href="/resources" className="text-primary hover:underline transition duration-300 ease-in-out hover:scale-105">&larr; Back to Resources</Link>
      </div>
    </div>
  );
}

// Generate metadata for SEO
export function generateMetadata({ params }) {
  const post = blogPosts.find((p) => p.slug === params.slug);
  
  if (!post) {
    return {
      title: "Blog Post Not Found - HostsHub",
      description: "The requested blog post could not be found."
    };
  }
  
  return {
    title: `${post.title} - HostsHub Blog`,
    description: post.excerpt
  };
}
