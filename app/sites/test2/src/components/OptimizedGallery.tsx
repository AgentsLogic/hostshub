'use client';

import React, { useState } from 'react';
import { usePropertyData } from '../contexts/PropertyDataContext';
import LazyImage from './ui/LazyImage';
import Section from './ui/Section';
import Card from './ui/Card';

export const OptimizedGallery = () => {
  const { propertyData } = usePropertyData();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  const images = [
    {
      src: "/assets/images/gallery01/3bad50ec.jpg",
      alt: "Over 5,120 sq. ft",
      caption: "Over 5,120 sq. ft"
    },
    {
      src: "/assets/images/gallery01/a62b4d59.jpg",
      alt: "Sweeping country views",
      caption: "Sweeping country views"
    },
    {
      src: "/assets/images/gallery01/2851bef4.jpg",
      alt: "Custom fire pit",
      caption: "Custom fire pit"
    },
    {
      src: "/assets/images/gallery01/81274bee.jpg",
      alt: "Private acreage",
      caption: "Private acreage"
    },
    {
      src: "/assets/images/gallery01/670274ff.jpg",
      alt: "Six spacious bedrooms",
      caption: "Six spacious bedrooms"
    },
    {
      src: "/assets/images/gallery01/025a92ba.jpg",
      alt: "Grand kitchen",
      caption: "Grand kitchen"
    },
    {
      src: "/assets/images/gallery01/a9102669.jpg",
      alt: "Gathering space for the whole crew",
      caption: "Gathering space for the whole crew"
    }
  ];

  // Lightbox functionality
  const openLightbox = (src: string) => {
    setSelectedImage(src);
    document.body.style.overflow = 'hidden'; // Prevent scrolling when lightbox is open
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = ''; // Restore scrolling
  };

  return (
    <Section background="white" spacing="lg">
      <Section.Header 
        title={`Photo Gallery for ${propertyData.name}`}
        centered={false}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {images.map((image, index) => (
          <Card 
            key={index} 
            variant="elevated" 
            padding="none" 
            className="group cursor-pointer overflow-hidden"
            onClick={() => openLightbox(image.src)}
          >
            <div className="aspect-w-3 aspect-h-2 overflow-hidden bg-gray-100">
              <div className="relative h-96 w-full">
                <LazyImage
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover object-center group-hover:opacity-75 transition-opacity duration-300"
                  priority={index < 2} // Prioritize loading the first two images
                  placeholderColor="#f3f4f6"
                />
              </div>
            </div>
            <div className="p-3">
              <p className="text-sm text-gray-500">{image.caption}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button 
            className="absolute top-4 right-4 text-white text-2xl"
            onClick={closeLightbox}
            aria-label="Close lightbox"
          >
            &times;
          </button>
          <div 
            className="relative max-w-5xl max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={selectedImage} 
              alt="Enlarged view" 
              className="max-h-[90vh] max-w-full object-contain"
            />
          </div>
        </div>
      )}
    </Section>
  );
};

export default OptimizedGallery;
