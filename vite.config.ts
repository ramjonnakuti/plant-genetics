import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    // Listen on all network interfaces so phones / other PCs on the same Wi‑Fi
    // can open http://<this-computer’s-LAN-IP>:5173 (not localhost on the other device).
    host: true,
    port: 5173,
    strictPort: false,
    open: true,
  },
  preview: {
    host: true,
    port: 4173,
    strictPort: false,
  },
});
