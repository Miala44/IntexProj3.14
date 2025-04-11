import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const csp = `
  default-src 'self';
  script-src 'self' 'unsafe-inline' 'unsafe-eval';
  connect-src 'self' 
    https://group3-14flaskapi-hhcxf9g7f0h7cee7.westus-01.azurewebsites.net
    https://intexbackend-a6fvcvg6cha4hwcx.eastus-01.azurewebsites.net
    http://127.0.0.1:5050
    https://localhost:5000
    https://accounts.google.com
    https://www.googleapis.com;
  img-src 'self' data: 
    http://localhost:5050
    http://127.0.0.1:5050
    https://localhost:5000
    https://intexbackend-a6fvcvg6cha4hwcx.eastus-01.azurewebsites.net;
  style-src 'self' 'unsafe-inline' fonts.googleapis.com;
  font-src 'self' fonts.gstatic.com data:;
  frame-src 'self' 
    https://localhost:5000 
    https://intexbackend-a6fvcvg6cha4hwcx.eastus-01.azurewebsites.net
    https://accounts.google.com;
`.replace(/\n/g, '');

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    headers: {
      'Content-Security-Policy': csp,
    },
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name].js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name].[ext]',
      },
    },
  },
});
