// https://nuxt.com/docs/api/configuration/nuxt-config
import { copyFileSync } from 'fs'
import { resolve } from 'path'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  
  devtools: { enabled: true },

  // Hooks
  hooks: {
    'build:before': () => {
      // Copy LICENSE.txt to public directory before build
      const source = resolve('./LICENSE.txt')
      const destination = resolve('./public/LICENSE.txt')
      try {
        copyFileSync(source, destination)
        console.log('✓ LICENSE.txt copied to public directory')
      } catch (error) {
        console.error('⚠ Error copying LICENSE.txt:', error)
      }
    },
  },

  // Modules
  modules: [
    '@nuxt/content',
    '@nuxt/image',
    '@nuxt/icon',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    '@pinia/nuxt',
    '@nuxt/devtools',
  ],

  // App configuration
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'OpenSeadragon - An open-source, web-based viewer for high-resolution zoomable images',
      meta: [
        { name: 'description', content: 'OpenSeadragon is an open-source, web-based viewer for zoomable images, implemented in pure JavaScript.' },
      ],
      link: [
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
      ],
    },
  },

  // Nuxt Content configuration
  content: {
    documentDriven: false,
    highlight: {
      theme: {
        default: 'vitesse-light',
        dark: 'vitesse-dark',
      },
      preload: [
        'js',
        'javascript',
        'ts',
        'typescript',
        'json',
        'html',
        'css',
        'vue',
        'vue-html',
        'bash',
        'shell',
        'markdown',
        'yaml',
        'xml',
        'diff',
      ],
      langs: [
        'js',
        'javascript',
        'ts',
        'typescript',
        'json',
        'html',
        'css',
        'vue',
        'bash',
        'shell',
        'markdown',
        'yaml',
        'xml',
        'diff',
        'mermaid',
      ],
    },
    markdown: {
      toc: {
        depth: 3,
        searchDepth: 3,
      },
      anchorLinks: {
        depth: 3,
        exclude: [1],
      },
      remarkPlugins: [],
      rehypePlugins: [],
    },
  },

  // Color mode configuration
  colorMode: {
    classSuffix: '',
    preference: 'system',
    fallback: 'light',
  },

  // Tailwind CSS configuration
  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
    configPath: 'tailwind.config',
    exposeConfig: false,
    viewer: true,
  },

  // Image optimization
  image: {
    format: ['webp', 'avif'],
    quality: 80,
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
    },
  },

  // TypeScript configuration
  typescript: {
    strict: true,
    typeCheck: false, // Disabled to avoid vite-plugin-checker issues, use 'bun run typecheck' instead
    shim: false,
  },

  // Build configuration
  build: {
    transpile: [],
  },

  // Vite configuration
  vite: {
    build: {
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          manualChunks: {
            'vue-vendor': ['vue', 'vue-router'],
          },
        },
      },
    },
  },

  // Nitro configuration for static generation
  nitro: {
    preset: 'github-pages',
    prerender: {
      crawlLinks: true,
      routes: ['/'],
    },
  },

  // Runtime config
  runtimeConfig: {
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://openseadragon.github.io',
    },
  },

  // Experimental features
  experimental: {
    payloadExtraction: true,
  },

  // Explicitly enable pages
  pages: true,
})
