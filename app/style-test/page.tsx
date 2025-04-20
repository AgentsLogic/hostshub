export default function StyleTestPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Style Test Page</h1>

      <div className="grid gap-8">
        <section>
          <h2 className="text-xl font-semibold mb-4">Direct Style Colors</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <ColorSwatch name="Forest Green" color="#2E8B57" />
            <ColorSwatch name="Steel Blue" color="#4682B4" />
            <ColorSwatch name="Dark Slate" color="#4A5568" />
            <ColorSwatch name="Light Gray" color="#F7FAFC" />
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Text with Direct Styles</h2>
          <div className="grid gap-2">
            <p style={{ color: "#2E8B57" }}>Text in Forest Green</p>
            <p style={{ color: "#4682B4" }}>Text in Steel Blue</p>
            <p style={{ color: "#4A5568" }}>Text in Dark Slate</p>
            <p style={{ color: "#2D3748" }}>Text in Near Black</p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Buttons with Direct Styles</h2>
          <div className="flex flex-wrap gap-4">
            <button className="px-4 py-2 rounded-md font-medium text-white" style={{ backgroundColor: "#2E8B57" }}>
              Forest Green Button
            </button>
            <button className="px-4 py-2 rounded-md font-medium text-white" style={{ backgroundColor: "#4682B4" }}>
              Steel Blue Button
            </button>
            <button
              className="px-4 py-2 rounded-md font-medium border"
              style={{ borderColor: "#4A5568", color: "#4A5568" }}
            >
              Outline Button
            </button>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Cards with Direct Styles</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-6 rounded-lg shadow-md" style={{ borderColor: "#E2E8F0", borderWidth: "1px" }}>
              <h3 style={{ color: "#4682B4" }} className="text-lg font-semibold mb-2">
                Card Title
              </h3>
              <p style={{ color: "#4A5568" }} className="mb-4">
                This is a card with direct styles applied.
              </p>
              <button className="px-4 py-2 rounded-md font-medium text-white" style={{ backgroundColor: "#2E8B57" }}>
                Action Button
              </button>
            </div>
            <div className="p-6 rounded-lg shadow-md" style={{ borderColor: "#E2E8F0", borderWidth: "1px" }}>
              <h3 style={{ color: "#4682B4" }} className="text-lg font-semibold mb-2">
                Another Card
              </h3>
              <p style={{ color: "#4A5568" }} className="mb-4">
                This card also uses direct style attributes.
              </p>
              <button className="px-4 py-2 rounded-md font-medium text-white" style={{ backgroundColor: "#4682B4" }}>
                Action Button
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

function ColorSwatch({ name, color }: { name: string; color: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="w-20 h-20 rounded-md" style={{ backgroundColor: color }}></div>
      <p className="mt-2 text-sm font-medium">{name}</p>
      <p className="text-xs text-gray-500">{color}</p>
    </div>
  )
}

