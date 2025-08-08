import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), nodePolyfills()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    }
  },
  optimizeDeps: {
    exclude: ['framer-motion']
  },
  preview: {
    host: '0.0.0.0', // Makes it accessible on your local network
    port: 3000,      // Default preview port (change if needed)
    allowedHosts: [
      'solbet.me',   // Allow this domain
      'localhost',    // Optional: Allow localhost
    ],
  }
})
