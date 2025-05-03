import React from 'react';
import { usePropertyData } from '../contexts/PropertyDataContext';

export const Gallery = () => {
  const { propertyData } = usePropertyData();
  const images = [
    {
      src: "assets/images/gallery01/3bad50ec.jpg",
      alt: "Over 5,120 sq. ft",
      caption: "Over 5,120 sq. ft"
    },
    {
      src: "assets/images/gallery01/a62b4d59.jpg",
      alt: "Sweeping country views",
      caption: "Sweeping country views"
    },
    {
      src: "assets/images/gallery01/2851bef4.jpg",
      alt: "Custom fire pit",
      caption: "Custom fire pit"
    },
    {
      src: "assets/images/gallery01/81274bee.jpg",
      alt: "Private acreage",
      caption: "Private acreage"
    },
    {
      src: "assets/images/gallery01/670274ff.jpg",
      alt: "Six spacious bedrooms",
      caption: "Six spacious bedrooms"
    },
    {
      src: "assets/images/gallery01/025a92ba.jpg",
      alt: "Grand kitchen",
      caption: "Grand kitchen"
    },
    {
      src: "assets/images/gallery01/a9102669.jpg",
      alt: "Gathering space for the whole crew",
      caption: "Gathering space for the whole crew"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-serif text-gray-900 mb-8">Photo Gallery for {propertyData.name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {images.map((image, index) => (
          <div key={index} className="group relative">
            <div className="aspect-w-3 aspect-h-2 overflow-hidden rounded-lg bg-gray-100">
              <img
                src={image.src}
                alt={image.alt}
                className="h-96 w-full object-cover object-center group-hover:opacity-75 transition-opacity duration-300"
              />
            </div>
            <p className="mt-2 text-sm text-gray-500">{image.caption}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
