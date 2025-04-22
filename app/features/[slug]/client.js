"use client";

import { useState } from "react";

export default function ClientPage({ feature, slug }) {
  // All client-side hooks and interactivity goes here
  
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
