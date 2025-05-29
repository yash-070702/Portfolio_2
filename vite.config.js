import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import * as path from "path";
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // Set alias for src
    },
  },
  server: {
    host: true, // Exposes the server on your local network
    port: 3000, // (Optional) You can set the port here
    proxy: {
      '/api/leetcode': {
        target: 'https://leetcode-stats-api.herokuapp.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/leetcode/, ''),
      },
    },
  },
})
