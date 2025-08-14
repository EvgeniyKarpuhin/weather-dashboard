import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: './main.tsx', // путь к твоему index.html
    },
  },
})