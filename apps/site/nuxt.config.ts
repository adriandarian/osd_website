// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  
  devtools: { enabled: true },

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
    },
  },

  // Site configuration for SEO
  site: {
    url: process.env.NUXT_PUBLIC_SITE_URL || 'https://openseadragon.github.io',
    name: 'OpenSeadragon',
    description: 'An open-source, web-based viewer for high-resolution zoomable images',
    defaultLocale: 'en',
  },

  // Nuxt Content configuration
  content: {
    documentDriven: true,
    highlight: {
      theme: {
        default: 'github-light',
        dark: 'github-dark',
      },
      preload: ['js', 'ts', 'json', 'html', 'css', 'vue'],
    },
    markdown: {
      toc: {
        depth: 3,
        searchDepth: 3,
      },
      anchorLinks: true,
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
    typeCheck: true,
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
})
