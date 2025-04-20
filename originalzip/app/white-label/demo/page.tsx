import { DemoRequestForm } from "./form"

export default function WhiteLabelDemoPage() {
  return (
    <div className="container py-10">
      <div className="flex flex-col items-center text-center space-y-4 mb-10">
        <h1 className="text-4xl font-bold" style={{ color: "#4682B4" }}>
          Schedule a White-Label Demo
        </h1>
        <p className="text-xl max-w-2xl" style={{ color: "#4A5568" }}>
          See how our white-label solution can help you grow your property management business.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div>
          <h2 className="text-2xl font-bold mb-4" style={{ color: "#4682B4" }}>
            Why Choose Our White-Label Solution?
          </h2>

          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white">1</div>
              <div>
                <h3 className="text-xl font-medium" style={{ color: "#4682B4" }}>
                  Expand Your Services
                </h3>
                <p style={{ color: "#4A5568" }}>
                  Offer professional booking websites to your clients without the hassle of building them yourself.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white">2</div>
              <div>
                <h3 className="text-xl font-medium" style={{ color: "#4682B4" }}>
                  Build Your Brand
                </h3>
                <p style={{ color: "#4A5568" }}>
                  White-label our platform with your branding, colors, and domain for a seamless client experience.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white">3</div>
              <div>
                <h3 className="text-xl font-medium" style={{ color: "#4682B4" }}>
                  Increase Revenue
                </h3>
                <p style={{ color: "#4A5568" }}>
                  Create a new revenue stream by charging clients for their branded booking websites.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white">4</div>
              <div>
                <h3 className="text-xl font-medium" style={{ color: "#4682B4" }}>
                  Save Time
                </h3>
                <p style={{ color: "#4A5568" }}>
                  Automate booking processes and property management tasks to focus on growing your business.
                </p>
              </div>
            </div>
          </div>
        </div>

        <DemoRequestForm />
      </div>
    </div>
  )
}

