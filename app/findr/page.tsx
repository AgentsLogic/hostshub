"use client";

import { useState, useRef } from "react";
import ReactMarkdown from "react-markdown";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function FindrPage() {
  const [formVisible, setFormVisible] = useState(true);
  const [formData, setFormData] = useState({
    location: "Costa Rica",
    minPrice: "",
    maxPrice: "200000",
    propertyType: "house",
    roi: "15",
    bedrooms: "",
    bathrooms: "",
    size: "",
    rentalDemand: "high",
    attractions: "",
    strategy: "short-term",
    financing: "",
    preferences: ""
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string>("");
  const [error, setError] = useState<string|null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [continueCount, setContinueCount] = useState(0);
  const maxContinues = 5;
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [emailSending, setEmailSending] = useState(false);
  const [pdfReady, setPdfReady] = useState(false);
  const [pdfLoading, setPdfLoading] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult("");
    setMessages([]);
    setFormVisible(false);
    const controller = new AbortController();
    abortControllerRef.current = controller;
    try {
      // Set a 10s timeout for the initial response
      const timeoutId = setTimeout(() => controller.abort(), 10000);
      
      let response;
      try {
        response = await fetch("/api/deepseek", {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest" 
          },
          body: JSON.stringify(formData),
          signal: controller.signal,
        });

        if (!response.ok) {
          // Try to get error message from response
          let errorMsg = "Request failed";
          try {
            const errorData = await response.json();
            errorMsg = errorData.error || errorMsg;
          } catch {}
          throw new Error(errorMsg);
        }

        // Clear timeout since we got a response
        clearTimeout(timeoutId);
        
        // Validate response is JSON before parsing
        const contentType = response.headers.get('content-type');
        if (!contentType?.includes('application/json')) {
          throw new Error("Invalid response format");
        }

        const data = await response.json();
        const content = data.result?.choices?.[0]?.message?.content || "";
        setResult(content);
        setMessages([
          { role: "system", content: "You are an expert real estate investment advisor." },
          { role: "user", content: `Find profitable Airbnb investment properties with the following criteria: ...` },
          { role: "assistant", content }
        ]);
      } catch (err: any) {
        if (err.name === "AbortError") {
          setError("Request timed out after 10 seconds");
        } else {
          console.error('API Error:', err);
          setError(err.message || "An error occurred. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      setError("An unexpected error occurred");
      setLoading(false);
    }
  };

  const handleContinue = async () => {
    if (continueCount >= maxContinues) return;
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/deepseek/continue", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages })
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Request failed");
      }
      const data = await response.json();
      const content = data.result?.choices?.[0]?.message?.content || "";
      setResult(prev => prev + "\n\n" + content);
      setMessages([...data.messages, { role: "assistant", content }]);
      setContinueCount(prev => prev + 1);
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    setLoading(false);
  };

  const handleClear = () => {
    setFormData({
      location: "Costa Rica",
      minPrice: "",
      maxPrice: "200000",
      propertyType: "house",
      roi: "15",
      bedrooms: "",
      bathrooms: "",
      size: "",
      rentalDemand: "high",
      attractions: "",
      strategy: "short-term",
      financing: "",
      preferences: ""
    });
    setResult("");
    setError(null);
    setMessages([]);
    setFormVisible(true);
    setContinueCount(0);
    setEmail("");
    setEmailSent(false);
    setPdfReady(false);
    setPdfLoading(false);
  };

  const handleDownloadPdf = async () => {
    setPdfLoading(true);
    try {
      const response = await fetch("/api/downloadPdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          content: result,
          email: email || undefined 
        })
      });
      
      if (!response.ok) {
        // Attempt to read error message from response body if it's JSON
        let errorMsg = "PDF generation failed";
        try {
          const errorData = await response.json();
          errorMsg = errorData.error || errorMsg;
        } catch {} // Ignore if response is not JSON
        throw new Error(errorMsg);
      }

      // Get the PDF blob from the response
      const blob = await response.blob();

      // Create a temporary URL for the blob
      const url = window.URL.createObjectURL(blob);

      // Create a temporary anchor element to trigger the download
      const a = document.createElement('a');
      a.href = url;
      a.download = 'findr-report.pdf'; // Set the desired filename
      document.body.appendChild(a); // Append to body is necessary for Firefox
      a.click(); // Trigger the download

      // Clean up the temporary URL and element
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      // Remove pdfReady state as download is direct
      setPdfReady(false);

    } catch (err: any) {
      console.error('PDF Download Error:', err);
      setError(err.message || "Failed to generate PDF");
    } finally {
      setPdfLoading(false);
    }
  };

  const handleEmailResults = async () => {
    if (!email) return;
    setEmailSending(true);
    setEmailSent(false); // Reset email sent state
    setError(null); // Clear previous errors

    try {
      const response = await fetch("/api/emailResults", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, content: result }),
      });

      if (!response.ok) {
        let errorMsg = "Failed to send email";
        try {
          const errorData = await response.json();
          errorMsg = errorData.error || errorMsg;
        } catch {}
        throw new Error(errorMsg);
      }

      setEmailSent(true); // Set email sent state on success

    } catch (err: any) {
      console.error('Email Send Error:', err);
      setError(err.message || "Failed to send email");
      setEmailSent(false); // Ensure emailSent is false on error
    } finally {
      setEmailSending(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen pb-8 bg-gray-50">
      {/* Hero Section */}
      <section className="relative w-full py-16 md:py-20 lg:py-24 bg-gradient-to-br from-blue-100 via-white to-blue-100 border-b overflow-hidden text-center">
        <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary rounded-full mix-blend-multiply filter blur-3xl"></div>
          <div className="absolute top-1/2 -right-24 w-96 h-96 bg-accent-red rounded-full mix-blend-multiply filter blur-3xl"></div>
        </div>
        <div className="max-w-3xl mx-auto px-4 md:px-6 space-y-4 relative z-10">
          <h1 className="text-primary text-4xl md:text-5xl font-extrabold tracking-tight">
            Find Your Next Airbnb Investment with our Free AI Property Bot Findr!
          </h1>
          <p className="text-muted-foreground">
            Use AI to discover profitable short-term rental properties tailored to your goals.
          </p>
        </div>
      </section>

      {/* Form Section */}
      <div className="max-w-4xl mx-auto px-4 md:px-6 py-2 md:py-4 lg:py-6">
        <div className="flex justify-end gap-4 mb-4 border-b pb-4">
          <button
            type="button"
            onClick={() => setFormVisible(!formVisible)}
            className="px-4 py-2 rounded-md border border-primary text-primary hover:bg-primary hover:text-white transition"
          >
            {formVisible ? "Hide Search Form" : "Show Search Form"}
          </button>
          <Button onClick={handleClear} variant="secondary" className="transition-transform duration-200 hover:scale-105">
            🧹 Clear
          </Button>
        </div>

        {formVisible && (
          <form onSubmit={handleSubmit} className="space-y-10">
            
            {/* Location & Budget Section */}
            <div className="space-y-6 border-b pb-8">
              <h2 className="text-xl font-semibold text-primary">Location & Budget</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex flex-col space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Location / Area</label>
                  <Input placeholder="Location / Area" value={formData.location} onChange={e => handleChange('location', e.target.value)} />
                </div>
                <div className="flex flex-col space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Min Price</label>
                  <Input placeholder="Min Price" type="number" value={formData.minPrice} onChange={e => handleChange('minPrice', e.target.value)} />
                </div>
                <div className="flex flex-col space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Max Price</label>
                  <Input placeholder="Max Price" type="number" value={formData.maxPrice} onChange={e => handleChange('maxPrice', e.target.value)} />
                </div>
              </div>
            </div>

            {/* Property Details Section */}
            <div className="space-y-6 border-b pb-8">
              <h2 className="text-xl font-semibold text-primary">Property Details</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex flex-col space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Property Type</label>
                  <Select onValueChange={value => handleChange('propertyType', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Property Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="apartment">Apartment</SelectItem>
                      <SelectItem value="house">House
