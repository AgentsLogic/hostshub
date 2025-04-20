import { ArrowRight } from "lucide-react";

export default function TestimonialsPage() {
  const testimonials = [
    {
      quote:
        "HostsHub.ai made managing my 15 properties effortless. The unified calendar and automated messaging save me hours every week.",
      author: "Daniel R.",
      role: "Property Manager",
    },
    {
      quote:
        "Switching to HostsHub was the best decision. I increased bookings by 30% and eliminated double bookings completely.",
      author: "Priya S.",
      role: "Vacation Rental Owner",
    },
    {
      quote:
        "The dynamic pricing tool boosted my revenue during peak seasons. It's like having a revenue manager on my team.",
      author: "Alex M.",
      role: "Superhost",
    },
    {
      quote:
        "I was new to hosting, but HostsHub's onboarding and support made it easy to get started and grow fast.",
      author: "Emily T.",
      role: "New Host",
    },
    {
      quote:
        "Managing properties across Airbnb, Vrbo, and Booking.com is seamless now. No more manual updates!",
      author: "Carlos G.",
      role: "Multi-Property Owner",
    },
    {
      quote:
        "HostsHub's global reach helped me attract guests from all over the world, filling my calendar year-round.",
      author: "Mei L.",
      role: "International Host",
    },
    {
      quote:
        "Since using HostsHub, I've doubled my bookings while cutting my management time in half. The dynamic pricing feature alone paid for itself in the first month.",
      author: "Sarah K.",
      role: "Property Manager, 12 listings",
    },
    {
      quote:
        "The channel manager is a game-changer. I no longer worry about double bookings, and all my properties sync perfectly across Airbnb, VRBO, and Booking.com.",
      author: "Michael T.",
      role: "Vacation Rental Owner",
    },
    {
      quote:
        "The automated messaging and task management features help me maintain my Superhost status without the burnout. My guests love the consistent communication.",
      author: "Jessica M.",
      role: "Superhost, 8 properties",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <section className="relative w-full py-12 md:py-16 lg:py-20 bg-gradient-to-br from-primary/10 via-background to-background border-b overflow-hidden text-center">
        <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary rounded-full mix-blend-multiply filter blur-3xl"></div>
          <div className="absolute top-1/2 -right-24 w-96 h-96 bg-accent-red rounded-full mix-blend-multiply filter blur-3xl"></div>
        </div>
        <div className="container px-4 md:px-6 space-y-6 relative z-10">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-primary">
            What Our Hosts Say
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground">
            Real stories from professional hosts who use HostsHub.ai to grow their business.
          </p>
        </div>
      </section>

      <section className="w-full py-8 md:py-12 bg-muted/5">
        <div className="container px-4 md:px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className={`flex flex-col p-8 rounded-2xl border shadow hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group
                ${i % 3 === 0 ? 'bg-gradient-to-br from-red-50 to-white' : i % 3 === 1 ? 'bg-gradient-to-br from-white to-blue-50' : 'bg-gradient-to-br from-blue-50 to-red-50'}`}
            >
              <p className="italic text-lg text-muted-foreground mb-6">{t.quote}</p>
              <div className="mt-auto">
                <p className="font-semibold">{t.author}</p>
                <p className="text-sm text-muted-foreground">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="w-full py-8 md:py-12 lg:py-16 bg-primary text-primary-foreground text-center">
        <div className="container px-4 md:px-6 space-y-6">
          <h2 className="text-3xl md:text-4xl font-extrabold">
            Ready to Automate Your Hosting Business?
          </h2>
          <p className="max-w-2xl mx-auto text-lg md:text-xl">
            Sign up today and start saving time, increasing revenue, and delighting your guests.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
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
