import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        // Keep the animation layer out of the first paint payload.
        manualChunks: {
          motion: ['motion', 'motion/react'],
          router: ['react-router'],
        },
      },
    },
  },
})
