import React from 'react';

interface ActivitiesProps {
  propertyData: {
    name: string;
    description: string;
    address: string;
  };
}

export const Activities = ({ propertyData }: ActivitiesProps) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-serif text-gray-900 mb-8">Activities at {propertyData.name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <img
            src="assets/images/gallery01/81274bee.jpg"
            alt="ATV Trails"
            className="w-full h-64 object-cover"
          />
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2">ATV Adventures</h3>
            <p className="text-gray-600">Explore our vast terrain on ATV trails suitable for all skill levels.</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <img
            src="assets/images/gallery01/a62b4d59.jpg"
            alt="Shooting Range"
            className="w-full h-64 object-cover"
          />
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2">Shooting Sports</h3>
            <p className="text-gray-600">Dedicated gun range and skeet shooting facilities available.</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <img
            src="assets/images/gallery01/2851bef4.jpg"
            alt="River Activities"
            className="w-full h-64 object-cover"
          />
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2">River Recreation</h3>
            <p className="text-gray-600">Fishing, floating, and exploring along the Colorado River.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
