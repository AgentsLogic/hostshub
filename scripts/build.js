const { execSync } = require("child_process")
const fs = require("fs")
const path = require("path")

// Log environment information
console.log("Node version:", process.version)
console.log("NPM version:", execSync("npm --version").toString().trim())
console.log("Current directory:", process.cwd())

// Check if required environment variables are set
const requiredEnvVars = ["NEXT_PUBLIC_SUPABASE_URL", "NEXT_PUBLIC_SUPABASE_ANON_KEY"]

requiredEnvVars.forEach((envVar) => {
  if (!process.env[envVar]) {
    console.warn(`Warning: ${envVar} is not set`)
  } else {
    console.log(`${envVar} is set`)
  }
})

// Run the build
try {
  console.log("Starting Next.js build...")
  execSync("next build", { stdio: "inherit" })
  console.log("Build completed successfully")
} catch (error) {
  console.error("Build failed:", error.message)
  process.exit(1)
}

