import { DashboardShell } from "@/app/dashboard/components/dashboard-shell";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Upload, Search, FileText } from "lucide-react";

export default function DocumentsPage() {
  // Placeholder document data
  const documents = [
    { name: "Lease Agreement.pdf", type: "PDF", uploaded: "2025-03-10", size: "1.2 MB" },
    { name: "Guest ID.jpg", type: "Image", uploaded: "2025-04-01", size: "350 KB" },
    { name: "Invoice_2025-02.pdf", type: "PDF", uploaded: "2025-02-20", size: "800 KB" },
  ];

  return (
    <DashboardShell>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h1 className="text-2xl font-bold">Documents</h1>
          <div className="flex gap-2 items-center">
            <div className="relative">
              <Input placeholder="Search documents..." className="pl-10" />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
            <Button variant="outline">Filter</Button>
            <Button>
              <Upload className="h-4 w-4 mr-2" />
              Upload
            </Button>
          </div>
        </div>

        {/* Documents Table */}
        <Card>
          <CardHeader>
            <CardTitle>Document List</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 px-4 font-medium">Name</th>
                    <th className="text-left py-2 px-4 font-medium">Type</th>
                    <th className="text-left py-2 px-4 font-medium">Uploaded</th>
                    <th className="text-left py-2 px-4 font-medium">Size</th>
                  </tr>
                </thead>
                <tbody>
                  {documents.map((doc) => (
                    <tr key={doc.name} className="border-b hover:bg-muted/50">
                      <td className="py-2 px-4 flex items-center gap-2">
                        <FileText className="h-4 w-4 text-blue-500" />
                        {doc.name}
                      </td>
                      <td className="py-2 px-4">{doc.type}</td>
                      <td className="py-2 px-4">{doc.uploaded}</td>
                      <td className="py-2 px-4">{doc.size}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  );
}
