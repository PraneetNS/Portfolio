import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    target: 'es2020',
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/three/') || id.includes('node_modules/@react-three/')) {
            return 'three'
          }
          if (id.includes('node_modules/postprocessing/') || id.includes('node_modules/@react-three/postprocessing/')) {
            return 'postprocessing'
          }
        },
      },
    },
  },
})
