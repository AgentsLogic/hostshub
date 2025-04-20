import { notFound, redirect } from "next/navigation";
import fs from "fs/promises";
import path from "path";

export default async function SiteViewer({ params }: { params: { subdomain: string } }) {
  const { subdomain } = params;
  
  // Sanitize the subdomain to prevent directory traversal
  const sanitizedSubdomain = subdomain.replace(/[^a-z0-9-]/g, "");
  if (sanitizedSubdomain !== subdomain) {
    return notFound();
  }
  
  try {
    // Check if this subdomain has a dedicated site folder
    const sitePath = path.join(process.cwd(), "app/sites", sanitizedSubdomain);
    await fs.access(sitePath);
    
    // If the site exists, redirect to the site's homepage
    return redirect(`/sites/${sanitizedSubdomain}`);
  } catch (error) {
    // If the site folder doesn't exist, show a placeholder
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background">
        <div className="p-8 max-w-md mx-auto bg-card rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-6">Site: {subdomain}.hostshub.ai</h1>
          <p className="mb-6 text-muted-foreground">
            This website is currently being built. In production, it would be available at 
            <strong> {subdomain}.hostshub.ai</strong>.
          </p>
          
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Coming Soon:</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Home Page</li>
              <li>Accommodations</li>
              <li>Activities</li>
              <li>Gallery</li>
              <li>Contact Information</li>
            </ul>
          </div>
          
          <div className="mt-8 pt-6 border-t">
            <p className="text-sm text-muted-foreground">
              <strong>Note:</strong> This is a placeholder page. Your custom website for {subdomain}.hostshub.ai
              is currently being created.
            </p>
          </div>
        </div>
      </div>
    );
  }
}
