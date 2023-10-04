import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'
// import sitemap from '@astrojs/sitemap'
// import react from '@astrojs/react'
// import image from '@astrojs/image'

// https://astro.build/config
export default defineConfig({
  // site: 'https://',
  integrations: [
    tailwind(),
    // sitemap()
    // react(),
    // image(),
  ],
})
