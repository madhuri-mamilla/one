import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  // Project site is served from https://<user>.github.io/one/, so the
  // production build needs every asset URL prefixed with /one/. Keep dev
  // at the root so `npm run dev` still serves from http://localhost:5173/.
  base: command === 'build' ? '/one/' : '/',
  plugins: [react()],
}))
