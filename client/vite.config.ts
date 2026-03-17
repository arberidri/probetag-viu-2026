import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    // Alle /api-Anfragen werden an den Express-Server weitergeleitet.
    // So gibt es keine CORS-Probleme während der Entwicklung.
    proxy: {
      "/api": {
        target: "http://localhost:3001",
        changeOrigin: true,
      },
    },
  },
});
