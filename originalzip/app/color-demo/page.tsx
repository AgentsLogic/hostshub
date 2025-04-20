export default function ColorDemoPage() {
  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-bold">Color Demo Page</h1>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Custom Colors</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-6 rounded-lg bg-hostsHubGreen text-white">
            <h3 className="font-bold">HostsHub Green</h3>
            <p>#2E9D4E</p>
          </div>

          <div className="p-6 rounded-lg bg-forestGreen text-white">
            <h3 className="font-bold">Forest Green</h3>
            <p>#2E8B57</p>
          </div>

          <div className="p-6 rounded-lg bg-steelBlue text-white">
            <h3 className="font-bold">Steel Blue</h3>
            <p>#4682B4</p>
          </div>

          <div className="p-6 rounded-lg bg-darkSlate text-white">
            <h3 className="font-bold">Dark Slate</h3>
            <p>#4A5568</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Button Variants</h2>

        <div className="flex flex-wrap gap-4">
          <button className="bg-hostsHubGreen text-white px-4 py-2 rounded-md">HostsHub Green Button</button>

          <button className="bg-forestGreen text-white px-4 py-2 rounded-md">Forest Green Button</button>

          <button className="bg-steelBlue text-white px-4 py-2 rounded-md">Steel Blue Button</button>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Text Colors</h2>

        <div className="space-y-2">
          <p className="text-hostsHubGreen font-bold">This text is HostsHub Green</p>
          <p className="text-forestGreen font-bold">This text is Forest Green</p>
          <p className="text-steelBlue font-bold">This text is Steel Blue</p>
          <p className="text-darkSlate font-bold">This text is Dark Slate</p>
        </div>
      </div>
    </div>
  )
}

