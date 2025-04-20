import { Button } from "@/components/ui/button"

export function ScheduleDemo() {
  return (
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
  )
}

