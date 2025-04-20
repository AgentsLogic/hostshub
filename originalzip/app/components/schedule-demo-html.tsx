export function ScheduleDemoHTML() {
  return (
    <div
      style={{
        backgroundColor: "#2E9D4E",
        padding: "24px",
        borderRadius: "8px",
        color: "white",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          alignItems: "flex-start",
        }}
      >
        <div>
          <h3
            style={{
              color: "white",
              fontWeight: "bold",
              fontSize: "20px",
              marginBottom: "8px",
            }}
          >
            Schedule a Demo
          </h3>
          <p
            style={{
              color: "rgba(255, 255, 255, 0.9)",
              margin: 0,
            }}
          >
            Learn how HostsHub.ai can help manage your properties
          </p>
        </div>
        <button
          style={{
            backgroundColor: "white",
            color: "#2E9D4E",
            padding: "8px 16px",
            borderRadius: "4px",
            border: "1px solid white",
            fontWeight: 500,
            cursor: "pointer",
          }}
        >
          Book Now
        </button>
      </div>
    </div>
  )
}

