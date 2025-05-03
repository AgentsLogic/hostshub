import React from 'react';
import { usePropertyData } from '../contexts/PropertyDataContext';

export const Accommodations = () => {
  const { propertyData } = usePropertyData();
  // Handle cases where propertyData is null or name is missing
  const propertyName = propertyData?.name || "Our Accommodations";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-serif text-gray-900 mb-8">Accommodations at {propertyName}</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <img
            src="/assets/images/gallery01/670274ff.jpg"
            alt="Master Bedroom"
            className="w-full h-96 object-cover rounded-lg mb-6"
          />
          <h2 className="text-2xl font-semibold mb-4">Spacious Bedrooms</h2>
          <ul className="space-y-2 text-gray-600">
            <li>• 4 King beds</li>
            <li>• 1 Queen bed</li>
            <li>• 1 Twin bed</li>
            <li>• 4 Twin-over-Queen bunk beds</li>
            <li>• Large-screen TVs in every bedroom</li>
          </ul>
        </div>
        <div>
          <img
            src="assets/images/gallery01/025a92ba.jpg"
            alt="Kitchen"
            className="w-full h-96 object-cover rounded-lg mb-6"
          />
          <h2 className="text-2xl font-semibold mb-4">Modern Amenities</h2>
          <ul className="space-y-2 text-gray-600">
            <li>• Fully equipped modern kitchen</li>
            <li>• Brand new KitchenAid appliances</li>
            <li>• Commercial-scale washer/dryer</li>
            <li>• Two fireplaces</li>
            <li>• Game room with ping pong table</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
