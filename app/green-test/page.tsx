export default function GreenTestPage() {
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-8">Green Color Test</h1>

      <div className="grid gap-8">
        {/* Direct style green box */}
        <div style={{ backgroundColor: "#2E9D4E", color: "white" }} className="p-8 rounded-lg">
          <h2 className="text-xl font-bold">Direct Style Green</h2>
          <p>This box uses direct inline style with #2E9D4E</p>
        </div>

        {/* Tailwind class green box */}
        <div className="bg-hostsHubGreen text-white p-8 rounded-lg">
          <h2 className="text-xl font-bold">Tailwind Class Green</h2>
          <p>This box uses the Tailwind bg-hostsHubGreen class</p>
        </div>

        {/* CSS utility class green box */}
        <div className="bg-hosts-hub text-white p-8 rounded-lg">
          <h2 className="text-xl font-bold">CSS Utility Class Green</h2>
          <p>This box uses the custom .bg-hosts-hub CSS class</p>
        </div>
      </div>
    </div>
  )
}

