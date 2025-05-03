import React from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { usePropertyData } from '../contexts/PropertyDataContext';
import Button from '../components/ui/Button';
import Section from '../components/ui/Section';
import Card from '../components/ui/Card';

export const Home = () => {
  const { propertyData } = usePropertyData();
  return (
    <div>
      {/* Hero Section */}
      <div className="relative h-[80vh]">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2960&q=80"
            alt="Ranch hero image"
            fill
            priority
            sizes="100vw"
            className="object-cover"
            quality={85}
          />
        </div>
        <div className="absolute inset-0 bg-black bg-opacity-50 z-10" />
        <div className="relative h-full flex items-center justify-center text-center z-20">
          <div className="max-w-4xl px-4">
            <h1 className="text-4xl md:text-6xl font-serif text-white mb-6">
              Welcome to {propertyData.name}
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              {propertyData.description}
            </p>
            <Button
              href="/contact"
              variant="primary"
              size="lg"
              icon={<ArrowRight className="h-5 w-5" />}
            >
              Book Your Stay
            </Button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <Section background="white" spacing="xl">
        <Section.Header
          title="Your Perfect Getaway"
          description={`Located at: ${propertyData.address}`}
          centered
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <Card variant="elevated" padding="none" className="overflow-hidden">
            <div className="relative w-full h-64">
              <Image
                src="https://images.unsplash.com/photo-1542718610-a1d656d1884c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="Outdoor Activities"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
                className="object-cover"
              />
            </div>
            <div className="p-6 text-center">
              <Card.Title className="mb-3">Outdoor Adventures</Card.Title>
              <Card.Description className="text-base">
                From ATV trails to fishing spots, experience the best of outdoor activities
              </Card.Description>
            </div>
          </Card>

          <Card variant="elevated" padding="none" className="overflow-hidden">
            <div className="relative w-full h-64">
              <Image
                src="https://images.unsplash.com/photo-1616047006789-b7af5afb8c20?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="Luxury Accommodations"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
                className="object-cover"
              />
            </div>
            <div className="p-6 text-center">
              <Card.Title className="mb-3">Luxury Living</Card.Title>
              <Card.Description className="text-base">
                Modern amenities and comfortable spaces for the whole family
              </Card.Description>
            </div>
          </Card>

          <Card variant="elevated" padding="none" className="overflow-hidden">
            <div className="relative w-full h-64">
              <Image
                src="https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="Scenic Views"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
                className="object-cover"
              />
            </div>
            <div className="p-6 text-center">
              <Card.Title className="mb-3">Scenic Beauty</Card.Title>
              <Card.Description className="text-base">
                Breathtaking views of the surrounding landscape
              </Card.Description>
            </div>
          </Card>
        </div>
      </Section>

      {/* CTA Section */}
      <Section background="light" spacing="xl">
        <div className="text-center">
          <h2 className="text-3xl font-serif text-gray-900 mb-8">
            Ready for an Unforgettable Experience?
          </h2>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              href="/gallery"
              variant="outline"
              size="lg"
              icon={<ArrowRight className="h-5 w-5" />}
            >
              View Gallery
            </Button>
            <Button
              href="/contact"
              variant="primary"
              size="lg"
              icon={<ArrowRight className="h-5 w-5" />}
            >
              Book Now
            </Button>
          </div>
        </div>
      </Section>
    </div>
  );
};
