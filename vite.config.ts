import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/nmap-learn/',
  build: {
    outDir: 'docs',   // 👈 aquí está la magia
  },
  plugins: [react()],
});
