import React from 'react';
import Link from 'next/link'; // Use next/link for Next.js
import { ArrowRight } from 'lucide-react';

interface HomeProps {
  propertyData: {
    name: string;
    description: string;
    address: string;
  };
}

export const Home = ({ propertyData }: HomeProps) => {
  return (
    <div>
      {/* Hero Section */}
      <div
        className="relative h-[80vh] bg-cover bg-center"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2960&q=80")'
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative h-full flex items-center justify-center text-center">
          <div className="max-w-4xl px-4">
            <h1 className="text-4xl md:text-6xl font-serif text-white mb-6">
              Welcome to {propertyData.name}
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              {propertyData.description}
            </p>
            <Link
              href="/contact" // Use href for next/link
              className="inline-flex items-center px-6 py-3 text-lg font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              Book Your Stay
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-serif text-gray-900 mb-4">
              Your Perfect Getaway
            </h2>
            <p className="text-xl text-gray-600">
              Located at: {propertyData.address}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <img
                src="https://images.unsplash.com/photo-1542718610-a1d656d1884c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="Outdoor Activities"
                className="w-full h-64 object-cover rounded-lg mb-6"
              />
              <h3 className="text-xl font-semibold mb-3">Outdoor Adventures</h3>
              <p className="text-gray-600">
                From ATV trails to fishing spots, experience the best of outdoor activities
              </p>
            </div>

            <div className="text-center">
              <img
                src="https://images.unsplash.com/photo-1616047006789-b7af5afb8c20?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="Luxury Accommodations"
                className="w-full h-64 object-cover rounded-lg mb-6"
              />
              <h3 className="text-xl font-semibold mb-3">Luxury Living</h3>
              <p className="text-gray-600">
                Modern amenities and comfortable spaces for the whole family
              </p>
            </div>

            <div className="text-center">
              <img
                src="https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="Scenic Views"
                className="w-full h-64 object-cover rounded-lg mb-6"
              />
              <h3 className="text-xl font-semibold mb-3">Scenic Beauty</h3>
              <p className="text-gray-600">
                Breathtaking views
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-serif text-gray-900 mb-8">
            Ready for an Unforgettable Experience?
          </h2>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/gallery" // Use href for next/link
              className="inline-flex items-center px-6 py-3 text-lg font-medium text-blue-600 bg-white rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              View Gallery
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              href="/contact" // Use href for next/link
              className="inline-flex items-center px-6 py-3 text-lg font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              Book Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
