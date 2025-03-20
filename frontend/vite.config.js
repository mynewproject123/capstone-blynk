import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Load environment variables from `.env`
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: process.env.VITE_BACKEND_URL || "http://localhost:5000", // Default to localhost
        changeOrigin: true, // Ensure proper host header forwarding
        secure: false, // Disable SSL verification for local development
      },
    },
  },
});
