"use client";

import React, { useState, useEffect } from "react";
import { useNotifications } from "@/contexts/notification-context";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Minimize2, Castle, Home } from "lucide-react";
import { useProperties } from "@/hooks/use-properties";
import { createWebsiteFromTemplate } from "./actions";

const templates = [
  {
    name: "Modern Minimal",
    description: "Clean and contemporary design",
    color: "bg-gradient-to-br from-blue-50 to-blue-100",
    icon: <Minimize2 className="h-8 w-8 text-blue-500" />,
    pattern: "bg-[radial-gradient(circle_at_1px_1px,rgb(59_130_246_/_0.15)_1px,transparent_0)]",
    patternSize: "bg-[size:20px_20px]",
    templatePath: "templates/project",
    outputPath: "app/sites/[siteId]"
  }
];

// Helper to slugify property name
const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");

export default function NewWebsitePage() {
  const { properties } = useProperties();
  const [selectedTemplate, setSelectedTemplate] = useState<string>("");
  const [useCustomDomain, setUseCustomDomain] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<string>("");
  const [propertyData, setPropertyData] = useState({
    name: "",
    description: "",
    address: "",
  });
  const [subdomain, setSubdomain] = useState("");
  const [propertyPhotos, setPropertyPhotos] = useState<string[]>([]);
  const [uploadedPhotos, setUploadedPhotos] = useState<string[]>([]);

  const handlePropertyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const propertyId = e.target.value;
    setSelectedProperty(propertyId);

    const property = properties.find((p) => p.id === propertyId);
    if (property) {
      setPropertyData({
        name: property.title || "",
        description: property.description || "",
        address: `${property.location.address}, ${property.location.city}, ${property.location.state} ${property.location.zip}, ${property.location.country}`,
      });
      setSubdomain(slugify(property.title || ""));
      setPropertyPhotos(property.images || []);
    } else {
      setPropertyData({ name: "", description: "", address: "" });
      setSubdomain("");
      setPropertyPhotos([]);
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newPhotos = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file)
      );
      setUploadedPhotos((prev) => [...prev, ...newPhotos]);
    }
  };

  const { addNotification } = useNotifications();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isCheckingSubdomain, setIsCheckingSubdomain] = useState(false);
  const [isSubdomainAvailable, setIsSubdomainAvailable] = useState(false);

  // Check subdomain availability whenever it changes
  useEffect(() => {
    const checkSubdomain = async () => {
      if (!subdomain) {
        setIsSubdomainAvailable(false);
        return;
      }

      // Validate format first
      const subdomainRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
      if (!subdomainRegex.test(subdomain)) {
        setIsSubdomainAvailable(false);
        return;
      }

      setIsCheckingSubdomain(true);
      try {
        const response = await fetch('/api/check-subdomain', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ subdomain }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            errorData.details || 
            errorData.error || 
            'Failed to check subdomain'
          );
        }

        const data = await response.json();
        setIsSubdomainAvailable(data.available);
        if (data.message) {
          addNotification({
            type: data.available ? "success" : "error",
            category: "system",
            title: "Subdomain Check",
            message: data.message
          });
        }
      } catch (error) {
        console.error('Error checking subdomain:', error);
        addNotification({
          type: "error",
          category: "system", 
          title: "Subdomain Check Failed",
          message: error instanceof Error ? error.message : 'Unable to verify subdomain availability',
        });
        setIsSubdomainAvailable(false);
      } finally {
        setIsCheckingSubdomain(false);
      }
    };

    const debounceTimer = setTimeout(() => {
      checkSubdomain();
    }, 500);

    return () => clearTimeout(debounceTimer);
  // Add addNotification to dependency array
  }, [subdomain, addNotification]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting website creation form with:', {
      template: selectedTemplate,
      property: selectedProperty,
      property_data: propertyData,
      subdomain
    });
    
    // Validate required fields
    if (!selectedProperty) {
      setSubmitError('Please select a property to continue');
      return;
    }

    // Validate template selection
    if (!selectedTemplate) {
      setSubmitError('Please select a template');
      return;
    }

    // Validate subdomain format
    const subdomainRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
    if (!subdomainRegex.test(subdomain)) {
      setSubmitError('Subdomain can only contain lowercase letters, numbers and hyphens');
      return;
    }

    // Validate subdomain availability
    if (!isSubdomainAvailable) {
      setSubmitError('Please choose an available subdomain');
      return;
    }

    setIsSubmitting(true);
    setIsSubmitting(true);
    setSubmitError(null);

    addNotification({
      type: "info",
      category: "system",
      title: "Creating Website",
      message: `Starting creation process for ${propertyData.name}...`
    });

    try {
      console.log('Calling createWebsiteFromTemplate server action');
      const response = await createWebsiteFromTemplate(
        selectedTemplate,
        propertyData,
        subdomain,
        selectedProperty
      );
      
      console.log('Server response:', response);
      
      if (!response?.siteId) {
        throw new Error('Invalid response from server - missing siteId');
      }

      console.log('Website created successfully with siteId:', response.siteId);
      
      // Create the website URLs - both production and development formats
      const isDevEnvironment = process.env.NODE_ENV === 'development';
      
      // The subdomain URL that would be used in production
      const productionUrl = `https://${subdomain}.hostshub.ai`;
      
      // For development, use localhost with the site path
      const localUrl = `/sites/${subdomain}`;
      
      // Choose the appropriate URL based on environment
      const websiteUrl = isDevEnvironment ? localUrl : productionUrl;
      
      // Add success notification with clickable link
      addNotification({
        type: "success", 
        category: "system",
        title: "Website Created Successfully",
        message: `Website for ${propertyData.name} was created successfully!`,
        propertyId: selectedProperty,
        propertyName: propertyData.name,
        actionUrl: websiteUrl,
        actionLabel: isDevEnvironment ? "View Website (Local)" : "View Website"
      });
      if (response?.redirectUrl) {
        // Note: Redirecting directly from a server action is generally preferred
        // but if needed on the client side after the action, use router.push
        // For now, we'll rely on the server action's potential redirect or handle it here if necessary.
        // Example if using client-side redirect: router.push(response.redirectUrl);
      }
    } catch (error) {
      console.error("Error creating website:", error);
      let errorMsg = 'An unexpected error occurred during website creation. Please try again.';
      
      if (error instanceof Error) {
        console.error('Error details:', error.stack);
        errorMsg = error.message || errorMsg;
      }
      
      console.log('Setting error message:', errorMsg);
      
      addNotification({
        type: "error",
        category: "system",
        title: "Website Creation Failed",
        message: errorMsg,
        propertyId: selectedProperty,
        propertyName: propertyData.name
      });
      setSubmitError(errorMsg);
      
      // Log error to error tracking service if available
      if (typeof window !== 'undefined' && (window as any).analytics) {
        try {
          (window as any).analytics.track('Website Creation Error', { 
            error: error instanceof Error ? error.message : String(error),
            template: selectedTemplate,
            property: selectedProperty,
            subdomain: subdomain
          });
        } catch (analyticsError) {
          console.error('Failed to log analytics event:', analyticsError);
        }
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 p-6">
      <h1 className="text-3xl font-bold">Create a New Website</h1>
      {!selectedProperty && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
          <p className="text-yellow-700">
            Please select a property to continue
          </p>
        </div>
      )}

      {/* Property Selection */}
      <div>
        <h2 className="mb-4 text-2xl font-semibold">Choose a Property</h2>
        <select
          value={selectedProperty}
          onChange={handlePropertyChange}
          className="w-full max-w-xl rounded border px-3 py-2"
        >
          <option value="">Select a property</option>
          {properties.map((property) => (
            <option key={property.id} value={property.id}>
              {property.title}
            </option>
          ))}
        </select>
      </div>

      {/* Layout Selection */}
      <div>
        <h2 className="mb-4 text-2xl font-semibold">Select a Layout</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {templates.map((template) => (
            <Card
              key={template.name}
              className={`group cursor-pointer overflow-hidden border-2 transition-all ${
                selectedTemplate === template.name
                  ? "border-primary ring-2 ring-primary"
                  : "border-transparent"
              }`}
              onClick={() => {
                console.log('Selected template:', template.name);
                setSelectedTemplate(template.name);
              }}
            >
              <div
                className={`relative aspect-video ${template.color} ${template.pattern} ${template.patternSize}`}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  {template.icon}
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-medium">{template.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {template.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Property Details */}
      <div>
        <h2 className="mb-4 text-2xl font-semibold">Property Details</h2>
        <form className="space-y-6 max-w-xl">
          <div>
            <label className="block mb-1 font-medium">Property Name</label>
            <input
              type="text"
              value={propertyData.name}
              onChange={(e) =>
                setPropertyData({ ...propertyData, name: e.target.value })
              }
              className="w-full rounded border px-3 py-2"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Description</label>
            <textarea
              value={propertyData.description}
              onChange={(e) =>
                setPropertyData({ ...propertyData, description: e.target.value })
              }
              className="w-full rounded border px-3 py-2"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Address</label>
            <input
              type="text"
              value={propertyData.address}
              onChange={(e) =>
                setPropertyData({ ...propertyData, address: e.target.value })
              }
              className="w-full rounded border px-3 py-2"
            />
          </div>

          {/* Domain Settings */}
          <div className="pt-6 border-t">
            <h3 className="mb-4 text-xl font-semibold">Domain Settings</h3>
            <div className="mb-4">
              <label className="block mb-1 font-medium">Choose a Subdomain</label>
              <div className="space-y-1">
                <div className="flex">
                    <input
                      type="text"
                      value={subdomain}
                      onChange={(e) => setSubdomain(e.target.value.toLowerCase())}
                      className="flex-1 rounded-l border px-3 py-2"
                    />
                    <span className="rounded-r border border-l-0 px-3 py-2 bg-gray-100">
                      .hostshub.ai
                    </span>
                  </div>
                  {subdomain && (
                    <div className="text-sm">
                      {isCheckingSubdomain ? (
                        <span className="text-gray-500">Checking availability...</span>
                      ) : isSubdomainAvailable ? (
                        <span className="text-green-500">Subdomain is available!</span>
                      ) : (
                        <span className="text-red-500">
                          {subdomain.match(/^[a-z0-9-]+$/) 
                            ? 'Subdomain is not available' 
                            : 'Only lowercase letters, numbers and hyphens allowed'}
                        </span>
                      )}
                    </div>
                  )}
              </div>
            </div>
            <div className="mb-4">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={useCustomDomain}
                  onChange={(e) => setUseCustomDomain(e.target.checked)}
                />
                <span>Use my own domain (additional $20 fee)</span>
              </label>
            </div>
            {useCustomDomain && (
              <div>
                <label className="block mb-1 font-medium">Custom Domain</label>
                <input
                  type="text"
                  placeholder="www.yourdomain.com"
                  className="w-full rounded border px-3 py-2"
                />
              </div>
            )}
          </div>

          {/* Property Photos */}
          <div className="pt-6 border-t">
            <h3 className="mb-4 text-xl font-semibold">Property Photos</h3>
            <div className="flex flex-wrap gap-4 mb-4">
              {propertyPhotos.concat(uploadedPhotos).map((url, idx) => (
                <img
                  key={idx}
                  src={url}
                  alt={`Property photo ${idx + 1}`}
                  className="h-24 w-24 object-cover rounded border"
                />
              ))}
            </div>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handlePhotoUpload}
            />
          </div>

          {/* Contact Information */}
          <div className="pt-6 border-t">
            <h3 className="mb-4 text-xl font-semibold">Contact Information</h3>
            <div className="mb-4">
              <label className="block mb-1 font-medium">Phone Number</label>
              <input
                type="tel"
                placeholder="(123) 456-7890"
                className="w-full rounded border px-3 py-2"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 font-medium">Email Address</label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full rounded border px-3 py-2"
              />
            </div>
          </div>

          {/* Social Links */}
          <div className="pt-6 border-t">
            <h3 className="mb-4 text-xl font-semibold">Social Links</h3>
            <div className="mb-4">
              <label className="block mb-1 font-medium">Facebook URL</label>
              <input
                type="url"
                placeholder="https://facebook.com/yourpage"
                className="w-full rounded border px-3 py-2"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 font-medium">Instagram URL</label>
              <input
                type="url"
                placeholder="https://instagram.com/yourprofile"
                className="w-full rounded border px-3 py-2"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 font-medium">Twitter URL</label>
              <input
                type="url"
                placeholder="https://twitter.com/yourprofile"
                className="w-full rounded border px-3 py-2"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 font-medium">LinkedIn URL</label>
              <input
                type="url"
                placeholder="https://linkedin.com/in/yourprofile"
                className="w-full rounded border px-3 py-2"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 font-medium">TikTok URL</label>
              <input
                type="url"
                placeholder="https://tiktok.com/@yourprofile"
                className="w-full rounded border px-3 py-2"
              />
            </div>
          </div>

          <div className="mt-6 space-y-2">
            <Button 
              type="submit" 
              disabled={!selectedProperty || isSubmitting || !selectedTemplate || !isSubdomainAvailable}
              onClick={handleSubmit}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating...
                </>
              ) : (
                'Save & Publish'
              )}
            </Button>
            {submitError && (
              <p className="text-sm text-red-500">{submitError}</p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
