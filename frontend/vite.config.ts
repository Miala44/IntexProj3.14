import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    headers: {
      'Content-Security-Policy':
        "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; connect-src 'self' https://localhost:5000 http://localhost:5050 http://127.0.0.1:5050; img-src 'self' data: https://localhost:5000 http://localhost:5050 http://127.0.0.1:5050; style-src 'self' 'unsafe-inline' fonts.googleapis.com; frame-src 'self' https://localhost:5000; font-src 'self' fonts.gstatic.com data:",
    },
  },
});
