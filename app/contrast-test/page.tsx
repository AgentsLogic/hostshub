import { Button } from "@/components/ui/button"

export default function ContrastTestPage() {
  return (
    <div className="min-h-screen p-8 space-y-12">
      <h1 className="text-3xl font-bold">Contrast Test Page</h1>

      {/* Green background with white text */}
      <div className="bg-hostsHubGreen p-6 rounded-lg">
        <h2 className="text-white font-bold text-xl mb-2">White text on green background</h2>
        <p className="text-white/90">This text should be clearly visible on the green background</p>
        <Button className="mt-4 bg-white text-hostsHubGreen hover:bg-white/90">White Button with Green Text</Button>
      </div>

      {/* White background with green text */}
      <div className="bg-white p-6 rounded-lg border">
        <h2 className="text-hostsHubGreen font-bold text-xl mb-2">Green text on white background</h2>
        <p className="text-darkSlate">This text should be clearly visible on the white background</p>
        <Button className="mt-4 bg-hostsHubGreen text-white hover:bg-hostsHubGreen/90">
          Green Button with White Text
        </Button>
      </div>

      {/* Schedule Demo Component */}
      <div>
        <h2 className="text-xl font-bold mb-4">Schedule Demo Component</h2>
        <div className="bg-hostsHubGreen p-6 rounded-lg">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-white font-bold text-xl mb-2">Schedule a Demo</h3>
              <p className="text-white/90">Learn how HostsHub.ai can help manage your properties</p>
            </div>
            <Button
              variant="outline"
              className="bg-white text-hostsHubGreen border-white hover:bg-white/90 hover:text-hostsHubGreen"
            >
              Book Now
            </Button>
          </div>
        </div>
      </div>

      {/* Direct style version */}
      <div>
        <h2 className="text-xl font-bold mb-4">Direct Style Version</h2>
        <div style={{ backgroundColor: "#2E9D4E", padding: "1.5rem", borderRadius: "0.5rem" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div>
              <h3 style={{ color: "white", fontWeight: "bold", fontSize: "1.25rem", marginBottom: "0.5rem" }}>
                Schedule a Demo
              </h3>
              <p style={{ color: "rgba(255, 255, 255, 0.9)" }}>Learn how HostsHub.ai can help manage your properties</p>
            </div>
            <button
              style={{
                backgroundColor: "white",
                color: "#2E9D4E",
                padding: "0.5rem 1rem",
                borderRadius: "0.375rem",
                border: "1px solid white",
                fontWeight: "medium",
                cursor: "pointer",
              }}
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

