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
  const [error, setError] = useState<string | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [continueCount, setContinueCount] = useState(0);
  const maxContinues = 5;
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
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
      const response = await fetch("/api/deepseek", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        signal: controller.signal,
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Request failed");
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
        setError("Request cancelled");
      } else {
        setError(err.message || "An error occurred");
      }
    } finally {
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
        const errorData = await response.json();
        throw new Error(errorData.error || "PDF generation failed");
      }
      
      const data = await response.json();
      if (data.success) {
        setPdfReady(true);
      }
    } catch (err: any) {
      setError(err.message || "Failed to generate PDF");
    } finally {
      setPdfLoading(false);
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
                      <SelectItem value="house">House</SelectItem>
                      <SelectItem value="condo">Condo</SelectItem>
                      <SelectItem value="multi-family">Multi-family</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Expected ROI (%)</label>
                  <Input placeholder="Expected ROI (%)" type="number" value={formData.roi} onChange={e => handleChange('roi', e.target.value)} />
                </div>
                <div className="flex flex-col space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Bedrooms</label>
                  <Input placeholder="Bedrooms" type="number" value={formData.bedrooms} onChange={e => handleChange('bedrooms', e.target.value)} />
                </div>
                <div className="flex flex-col space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Bathrooms</label>
                  <Input placeholder="Bathrooms" type="number" value={formData.bathrooms} onChange={e => handleChange('bathrooms', e.target.value)} />
                </div>
                <div className="flex flex-col space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Property Size (sqft or sqm)</label>
                  <Input placeholder="Property Size (sqft or sqm)" type="number" value={formData.size} onChange={e => handleChange('size', e.target.value)} />
                </div>
              </div>
            </div>

            {/* Investment Preferences Section */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-primary">Investment Preferences</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex flex-col space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Rental Demand</label>
                  <Select onValueChange={value => handleChange('rentalDemand', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Rental Demand" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Nearby Attractions (comma separated)</label>
                  <Input placeholder="Nearby Attractions (comma separated)" value={formData.attractions} onChange={e => handleChange('attractions', e.target.value)} />
                </div>
                <div className="flex flex-col space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Investment Strategy</label>
                  <Select onValueChange={value => handleChange('strategy', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Investment Strategy" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="short-term">Short-term rental</SelectItem>
                      <SelectItem value="long-term">Long-term rental</SelectItem>
                      <SelectItem value="fix-flip">Fix & Flip</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Financing Type</label>
                  <Select onValueChange={value => handleChange('financing', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Financing Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cash">Cash</SelectItem>
                      <SelectItem value="mortgage">Mortgage</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex flex-col space-y-2 mt-6">
                <label className="text-sm font-medium text-muted-foreground">Additional Preferences</label>
                <Textarea placeholder="Additional Preferences" value={formData.preferences} onChange={e => handleChange('preferences', e.target.value)} />
              </div>
            </div>

            <Button type="submit" className="w-full mt-8 py-4 text-lg font-semibold">Find Investment Opportunities</Button>
          </form>
        )}
      </div>

      {/* Results Section */}
      <div className="flex flex-col items-center justify-center gap-4">
        {loading && (
          <>
            <img 
              src="/images/bots.png" 
              alt="AI Bots Searching" 
              width="400"
              height="auto"
              className="bg-transparent animate-pulse"
            />
            <Button onClick={handleCancel} disabled={!loading} variant="destructive" className="transition-transform duration-200 hover:scale-105">
              Cancel
            </Button>
          </>
        )}
        {error && <p className="text-center text-red-500">{error}</p>}
        {result && (
          <div className="max-w-4xl mx-auto mt-8 p-6 rounded-lg shadow-lg bg-white space-y-8 transition-shadow duration-300 hover:shadow-xl animate-fade-in">
            <h2 className="text-3xl font-bold mb-6 text-primary">HostsHub.ai Recommendations</h2>
            <div className="prose prose-lg">
              <ReactMarkdown
                components={{
                  h2: ({node, ...props}) => {
                    const text = props.children?.toString() || '';
                    // Check if it's a numbered heading (like "1. Jacó, Central Pacific Coast")
                    if (/^\d+\.\s/.test(text)) {
                      return <h2 {...props} className="text-primary font-bold" />
                    }
                    return <h2 {...props} />
                  },
                  h3: ({node, ...props}) => {
                    const text = props.children?.toString() || '';
                    // Check if it's "Why Invest?"
                    if (text.includes('Why Invest?')) {
                      return <h3 {...props} className="text-red-500 font-bold" />
                    }
                    return <h3 {...props} />
                  }
                }}
              >
                {result}
              </ReactMarkdown>
            </div>
            <div className="mt-6 flex flex-wrap justify-center gap-4 mb-4">
              <Button onClick={handleContinue} disabled={loading || continueCount >= maxContinues} className="transition-transform duration-200 hover:scale-105">
                🔄 Continue...
              </Button>
              <Button onClick={handleCancel} disabled={!loading} variant="destructive" className="transition-transform duration-200 hover:scale-105">
                ✖️ Cancel
              </Button>
              <Button onClick={handleClear} variant="secondary" className="transition-transform duration-200 hover:scale-105">
                🧹 Clear
              </Button>
              {continueCount >= maxContinues && (
                <p className="mt-2 text-sm text-muted-foreground w-full text-center">Maximum continuations reached.</p>
              )}
            </div>
            
            {/* Email and Download Section */}
            <div className="mt-4 border-t pt-4 w-full">
              <div className="flex flex-col md:flex-row gap-2 items-center mb-4">
                <label className="text-sm font-medium text-muted-foreground whitespace-nowrap">Email results to:</label>
                <div className="flex flex-1 gap-2 w-full">
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1"
                  />
                  <Button 
                    onClick={() => setEmailSent(true)} 
                    className="whitespace-nowrap transition-transform duration-200 hover:scale-105"
                    disabled={!email}
                  >
                    📧 Send
                  </Button>
                </div>
              </div>
              {emailSent && (
                <p className="text-green-500 text-sm">Results have been sent to {email}!</p>
              )}
              
              <div className="flex flex-col md:flex-row gap-2 items-center mt-4">
                <label className="text-sm font-medium text-muted-foreground whitespace-nowrap">Save as PDF:</label>
                <div className="flex flex-1 gap-2 w-full">
                  <Button 
                    onClick={handleDownloadPdf} 
                    className="whitespace-nowrap transition-transform duration-200 hover:scale-105 w-full md:w-auto"
                    disabled={pdfLoading}
                  >
                    {pdfLoading ? "Generating..." : "📄 Download PDF Report"}
                  </Button>
                </div>
              </div>
              {pdfReady && (
                <p className="text-green-500 text-sm mt-2">PDF report is ready for download!</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
