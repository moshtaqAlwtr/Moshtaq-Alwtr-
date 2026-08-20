import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base is set for GitHub Pages (repo: Moshtaq-Alwtr-).
// For a custom domain or root deploy, change it to '/'.
export default defineConfig({
  plugins: [react()],
  base: process.env.DEPLOY_TARGET === 'root' ? '/' : '/Moshtaq-Alwtr-/',
})
