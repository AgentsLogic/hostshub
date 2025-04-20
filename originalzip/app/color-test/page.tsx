import { Button } from "@/components/ui/button"

export default function ColorTestPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Color Test Page</h1>

      <div className="grid gap-8">
        <section>
          <h2 className="text-xl font-semibold mb-4">Custom Colors</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <ColorSwatch name="forestGreen" color="#2E8B57" className="bg-forestGreen" />
            <ColorSwatch name="steelBlue" color="#4682B4" className="bg-steelBlue" />
            <ColorSwatch name="darkSlate" color="#4A5568" className="bg-darkSlate" />
            <ColorSwatch name="lightGray" color="#F7FAFC" className="bg-lightGray" />
            <ColorSwatch name="warmGray" color="#E2E8F0" className="bg-warmGray" />
            <ColorSwatch name="nearBlack" color="#2D3748" className="bg-nearBlack" />
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Text Colors</h2>
          <div className="grid gap-2">
            <p className="text-forestGreen">Text in forestGreen</p>
            <p className="text-steelBlue">Text in steelBlue</p>
            <p className="text-darkSlate">Text in darkSlate</p>
            <p className="text-nearBlack">Text in nearBlack</p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Button Variants</h2>
          <div className="flex flex-wrap gap-4">
            <Button variant="default">Default</Button>
            <Button variant="primary">Primary (forestGreen)</Button>
            <Button variant="blue">Blue (steelBlue)</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
          </div>
        </section>
      </div>
    </div>
  )
}

function ColorSwatch({ name, color, className }: { name: string; color: string; className: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className={`w-20 h-20 rounded-md ${className}`}></div>
      <p className="mt-2 text-sm font-medium">{name}</p>
      <p className="text-xs text-gray-500">{color}</p>
    </div>
  )
}

