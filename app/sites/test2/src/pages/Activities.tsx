import React from 'react';
import Image from 'next/image';
import { usePropertyData } from '../contexts/PropertyDataContext';

export const Activities = () => {
  const { propertyData } = usePropertyData();
  // Handle cases where propertyData is null or name is missing
  const propertyName = propertyData?.name || "Our Activities";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-serif text-gray-900 mb-8">Activities at {propertyName}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="relative w-full h-64">
            <Image
              src="/assets/images/gallery01/81274bee.jpg"
              alt="ATV Trails"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
              className="object-cover"
              priority
            />
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2">ATV Adventures</h3>
            <p className="text-gray-600">Explore our vast terrain on ATV trails suitable for all skill levels.</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="relative w-full h-64">
            <Image
              src="/assets/images/gallery01/a62b4d59.jpg"
              alt="Shooting Range"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
              className="object-cover"
            />
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2">Shooting Sports</h3>
            <p className="text-gray-600">Dedicated gun range and skeet shooting facilities available.</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="relative w-full h-64">
            <Image
              src="/assets/images/gallery01/2851bef4.jpg"
              alt="River Activities"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
              className="object-cover"
            />
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2">River Recreation</h3>
            <p className="text-gray-600">Fishing, floating, and exploring along the Colorado River.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
