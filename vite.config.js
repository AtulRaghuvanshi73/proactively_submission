import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      // Add aliases to make Next.js imports work in Vite
      "next/dynamic": path.resolve(__dirname, "./node_modules/next/dynamic.js"),
    },
  },
  // Prevent conflicts with Next.js build
  build: {
    outDir: "vite-dist",
  },
})
