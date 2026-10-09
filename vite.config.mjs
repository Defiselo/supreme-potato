import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';

const apiTarget = process.env.API_TARGET;

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  base: './',
  resolve: {
    alias: {
      Utils: fileURLToPath(new URL('./src/utils', import.meta.url)),
    },
  },
  define: {
    PRODUCTION: JSON.stringify(mode === 'production'),
    DEV_API_URL: JSON.stringify(apiTarget ? '/' : 'http://localhost/'),
  },
  server: {
    port: 9000,
    open: true,
    ...(apiTarget ? {
      proxy: Object.fromEntries(
        ['/rest.php', '/index.php', '/session.php', '/firms'].map((p) => [
          p, { target: apiTarget, secure: false, changeOrigin: true },
        ]),
      ),
    } : {}),
  },
  build: { outDir: 'dist' },
}));