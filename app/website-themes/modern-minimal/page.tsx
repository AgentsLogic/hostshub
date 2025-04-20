"use client";

import React from "react";

export default function ModernMinimalTheme() {
  return (
    <div className="flex flex-col min-h-screen font-sans text-gray-800">
      {/* Hero */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <img
          src="/placeholder.jpg"
          alt="Property"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/20"></div>
        <div className="relative z-10 text-center text-white p-6 rounded transition-all duration-500">
          <h1 className="text-4xl font-bold mb-3 drop-shadow">Luxury Beach House</h1>
          <p className="mb-5 text-lg drop-shadow">Beautiful beachfront property with stunning ocean views</p>
          <a href="#contact" className="inline-block bg-primary px-6 py-3 rounded-full hover:bg-primary/80 transition shadow-lg">Book Now</a>
        </div>
      </section>

      {/* Property Details */}
      <section id="details" className="max-w-5xl mx-auto px-6 py-16 space-y-12">
        <div className="space-y-4">
          <h2 className="text-3xl font-semibold">About the Property</h2>
          <p className="leading-relaxed text-lg">
            This stunning beachfront home offers breathtaking ocean views, modern amenities, and a relaxing atmosphere perfect for your next getaway.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-2xl font-semibold">Amenities</h3>
          <ul className="grid grid-cols-2 md:grid-cols-3 gap-3 list-disc pl-5">
            <li>Wi-Fi</li>
            <li>Pool</li>
            <li>Beach Access</li>
            <li>Kitchen</li>
            <li>Air Conditioning</li>
            <li>Parking</li>
          </ul>
        </div>

        <div className="space-y-4">
          <h3 className="text-2xl font-semibold">Location</h3>
          <div className="w-full h-64 bg-gray-200 rounded-lg shadow-inner flex items-center justify-center">
            <span>Map Placeholder</span>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-2xl font-semibold">Booking Platforms</h3>
          <div className="flex flex-wrap gap-4">
            <a href="#" className="hover:underline">Airbnb</a>
            <a href="#" className="hover:underline">VRBO</a>
            <a href="#" className="hover:underline">Booking.com</a>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section id="gallery" className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-semibold mb-8">Gallery</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {[1,2,3,4,5,6].map((i) => (
            <img key={i} src="/placeholder.jpg" alt={`Gallery ${i}`} className="w-full h-48 object-cover rounded-lg shadow hover:scale-105 transition-transform duration-300" />
          ))}
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact" className="max-w-3xl mx-auto px-6 py-16 space-y-8">
        <h2 className="text-3xl font-semibold">Contact Us</h2>
        <form className="space-y-6">
          <input type="text" placeholder="Name" className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary outline-none transition" />
          <input type="email" placeholder="Email" className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary outline-none transition" />
          <input type="tel" placeholder="Phone" className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary outline-none transition" />
          <textarea placeholder="Message" className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary outline-none transition" rows={4}></textarea>
          <button type="submit" className="bg-primary text-white px-6 py-3 rounded-full hover:bg-primary/80 transition shadow-lg">Send Message</button>
        </form>
      </section>

      {/* AI Chatbot Placeholder */}
      <div className="fixed bottom-6 right-6 z-50">
        <button className="bg-primary text-white rounded-full p-4 shadow-lg hover:bg-primary/80 transition">
          AI Chat
        </button>
      </div>

      {/* Minimal Footer */}
      <footer className="mt-auto border-t px-6 py-6 text-center text-sm text-muted-foreground">
        Powered by <a href="https://hostshub.ai" className="hover:underline ml-1">HostsHub.ai</a>
      </footer>
    </div>
  );
}
