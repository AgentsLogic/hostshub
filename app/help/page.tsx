"use client";

import React, { useState } from "react";

export default function HelpPage() {
  const faqs = [
    {
      question: "How do I add a new property?",
      answer: "Go to the Properties section, click 'Add Property', and fill out the required details."
    },
    {
      question: "Can I customize my property website?",
      answer: "Yes! Choose from our premium templates and customize colors, images, and content."
    },
    {
      question: "How does the booking system work?",
      answer: "Guests can book directly on your website. You'll receive notifications and can manage bookings in your dashboard."
    },
    {
      question: "What support options are available?",
      answer: "We offer email and priority support depending on your subscription plan."
    },
    {
      question: "Can I upgrade or downgrade my plan anytime?",
      answer: "Yes, you can change your subscription plan at any time from the billing section."
    },
    {
      question: "Is there a free trial available?",
      answer: "Yes, all plans come with a 14-day free trial. No credit card required."
    },
    {
      question: "Can I connect multiple booking platforms?",
      answer: "Absolutely! Sync your listings across Airbnb, Vrbo, Booking.com, and more."
    },
    {
      question: "Does HostsHub.ai support team collaboration?",
      answer: "Yes, you can invite team members and assign roles based on your plan."
    },
    {
      question: "Is my data secure?",
      answer: "We use industry-standard encryption and security practices to protect your data."
    },
    {
      question: "How do I contact support?",
      answer: "Use the chat widget in your dashboard or email support@hostshub.ai."
    }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
<section className="relative w-full py-12 md:py-16 lg:py-20 bg-gradient-to-r from-blue-100 via-white to-blue-100 border-b overflow-hidden">
        <div className="container px-4 md:px-6 space-y-6 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-primary">
            Help & Support
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground">
            Find answers to common questions or get in touch with our team.
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full py-12 md:py-20 lg:py-28 bg-muted/5">
        <div className="container px-4 md:px-6 space-y-12">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-8">Frequently Asked Questions</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-xl border shadow-md bg-gradient-to-br from-blue-50 via-white to-blue-50 p-6 space-y-4 hover:shadow-lg transition cursor-pointer"
                onClick={() => toggle(idx)}
              >
                <h3 className="text-lg font-semibold flex justify-between items-center">
                  {faq.question}
                  <span className="ml-2 text-primary text-xl transition-transform duration-300">
                    {openIndex === idx ? "−" : "+"}
                  </span>
                </h3>
                <div
                  className={`overflow-hidden transition-all duration-300 ${openIndex === idx ? "max-h-96 opacity-100 mt-2" : "max-h-0 opacity-0"}`}
                >
                  <p className="text-muted-foreground">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
