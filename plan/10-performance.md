# Performance Strategy

## Performance Goals

### Target Metrics
- **First Contentful Paint (FCP)**: < 1.5s on 3G mobile
- **Largest Contentful Paint (LCP)**: < 2.5s on 3G mobile
- **Cumulative Layout Shift (CLS)**: < 0.1
- **Time to Interactive (TTI)**: < 3s on 3G
- **First Input Delay (FID)**: < 100ms
- **Lighthouse Score**: > 90 for all categories

### Performance Budget
- **Initial JS Bundle**: < 100KB
- **Total Page Weight**: < 500KB (including images)
- **CSS Bundle**: < 50KB
- **Font Files**: < 100KB
- **Images**: WebP/AVIF with lazy loading

## Build Optimization

### Code Splitting

#### Route-Based Splitting
```typescript
// Automatic with Nuxt
// Each page in pages/ directory gets its own chunk
pages/
├── index.vue           -> index-[hash].js
├── docs/[...slug].vue  -> docs-[hash].js
├── examples/[...slug].vue -> examples-[hash].js
└── playground/index.vue -> playground-[hash].js
```

#### Component-Based Splitting
```typescript
// Lazy load heavy components
const MonacoEditor = defineAsyncComponent(() =>
  import('~/components/playground/MonacoEditor.vue')
)

const HeavyChart = defineAsyncComponent(() =>
  import('~/components/charts/HeavyChart.vue')
)
```

### Tree Shaking
```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  build: {
    transpile: ['@headlessui/vue'],
  },
  optimization: {
    treeShake: true,
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  }
})
```

### Minification with oxc

```typescript
// vite.config.ts
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    minify: false, // Disable esbuild minification
    rollupOptions: {
      plugins: [
        // Use oxc minifier plugin when available
      ]
    }
  }
})
```

## Asset Optimization

### Image Optimization

#### Nuxt Image Configuration
```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  image: {
    formats: ['webp', 'avif', 'jpeg'],
    quality: 80,
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536
    },
    provider: 'ipx',
    ipx: {
      maxAge: 60 * 60 * 24 * 365 // 1 year cache
    }
  }
})
```

#### Responsive Images
```vue
<template>
  <NuxtImg
    src="/hero-image.jpg"
    :width="1200"
    :height="600"
    format="webp"
    loading="lazy"
    sizes="sm:100vw md:50vw lg:800px"
    alt="OpenSeadragon Demo"
  />
</template>
```

### Font Optimization

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@nuxtjs/google-fonts'],
  googleFonts: {
    families: {
      Inter: [400, 500, 600, 700],
      'JetBrains Mono': [400, 500] // For code blocks
    },
    display: 'swap',
    download: true, // Download fonts at build time
    preload: true,
    prefetch: true,
    preconnect: true
  }
})
```

### CSS Optimization

#### Tailwind CSS Purging
```typescript
// tailwind.config.ts
export default {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue'
  ],
  theme: {
    extend: {}
  },
  plugins: []
}
```

## Loading Strategies

### Critical CSS
```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  experimental: {
    inlineSSRStyles: false
  },
  nitro: {
    compressPublicAssets: true
  }
})
```

### Resource Hints
```vue
<!-- app.vue or layouts/default.vue -->
<template>
  <div>
    <Head>
      <!-- Preconnect to external domains -->
      <Link rel="preconnect" href="https://cdn.jsdelivr.net" />
      <Link rel="dns-prefetch" href="https://cdn.jsdelivr.net" />
      
      <!-- Preload critical assets -->
      <Link rel="preload" href="/fonts/inter.woff2" as="font" type="font/woff2" crossorigin />
    </Head>
    <slot />
  </div>
</template>
```

### Lazy Loading

#### Images
```vue
<template>
  <div>
    <!-- Lazy load images below the fold -->
    <NuxtImg
      src="/example.jpg"
      loading="lazy"
      placeholder
      :modifiers="{ blur: 10 }"
    />
  </div>
</template>
```

#### Components
```typescript
// composables/useLazyComponent.ts
export function useLazyComponent() {
  const { stop } = useIntersectionObserver(
    target,
    ([{ isIntersecting }]) => {
      if (isIntersecting) {
        // Load component
        stop()
      }
    }
  )
}
```

## Bundle Analysis

### vite-bundle-visualizer Setup
```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  vite: {
    plugins: [
      process.env.ANALYZE && bundleVisualizer({
        filename: './dist/stats.html',
        open: true,
        gzipSize: true,
        brotliSize: true
      })
    ]
  }
})
```

### Bundle Size Monitoring
```json
// package.json
{
  "scripts": {
    "analyze": "ANALYZE=true nuxt build",
    "size": "size-limit"
  },
  "size-limit": [
    {
      "path": ".output/public/_nuxt/*.js",
      "limit": "100 KB"
    }
  ]
}
```

## Runtime Performance

### Virtualization for Long Lists
```vue
<template>
  <VirtualScroller
    :items="plugins"
    :item-height="100"
    key-field="id"
  >
    <template #default="{ item }">
      <PluginCard :plugin="item" />
    </template>
  </VirtualScroller>
</template>
```

### Debouncing & Throttling
```typescript
// Use VueUse composables
import { useDebounceFn, useThrottleFn } from '@vueuse/core'

const debouncedSearch = useDebounceFn((query: string) => {
  performSearch(query)
}, 300)

const throttledScroll = useThrottleFn(() => {
  updateScrollPosition()
}, 100)
```

### Computed Properties Optimization
```vue
<script setup>
// Good: Computed property for expensive operations
const filteredExamples = computed(() => {
  return examples.value.filter(ex => ex.category === selectedCategory.value)
})

// Avoid: Filtering in template (runs on every render)
// <div v-for="ex in examples.filter(e => e.category === selected)">
</script>
```

## Caching Strategy

### Browser Caching
```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  nitro: {
    routeRules: {
      '/_nuxt/**': { headers: { 'cache-control': 'public, max-age=31536000, immutable' } },
      '/api/**': { headers: { 'cache-control': 'public, max-age=3600' } },
      '/images/**': { headers: { 'cache-control': 'public, max-age=31536000' } }
    }
  }
})
```

### Service Worker (Future)
```typescript
// Future enhancement for offline support
export default defineNuxtConfig({
  modules: ['@vite-pwa/nuxt'],
  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      name: 'OpenSeadragon Documentation',
      short_name: 'OSD Docs',
      description: 'OpenSeadragon Documentation and Examples'
    },
    workbox: {
      navigateFallback: '/',
      runtimeCaching: [
        {
          urlPattern: /^https:\/\/cdn\.jsdelivr\.net\/.*/i,
          handler: 'CacheFirst',
          options: {
            cacheName: 'cdn-cache',
            expiration: {
              maxEntries: 50,
              maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
            }
          }
        }
      ]
    }
  }
})
```

## Monitoring & Measurement

### Performance Monitoring
```typescript
// plugins/performance.client.ts
export default defineNuxtPlugin(() => {
  if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
    // Monitor Core Web Vitals
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        // Track metrics
        console.log(entry.name, entry.value)
      }
    })
    
    observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] })
  }
})
```

### Real User Monitoring
```typescript
// composables/useAnalytics.ts
export function useAnalytics() {
  const trackPerformance = () => {
    if (typeof window !== 'undefined' && window.performance) {
      const perfData = window.performance.getEntriesByType('navigation')[0]
      
      // Track key metrics (privacy-friendly)
      const metrics = {
        dns: perfData.domainLookupEnd - perfData.domainLookupStart,
        tcp: perfData.connectEnd - perfData.connectStart,
        ttfb: perfData.responseStart - perfData.requestStart,
        download: perfData.responseEnd - perfData.responseStart,
        dom: perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart,
        load: perfData.loadEventEnd - perfData.loadEventStart
      }
      
      // Store locally or send to analytics
      console.log('Performance metrics:', metrics)
    }
  }
  
  return { trackPerformance }
}
```

## GitHub Pages Optimization

### Static Generation
```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  ssr: false,
  target: 'static',
  generate: {
    fallback: '404.html'
  }
})
```

### Asset Compression
```bash
# GitHub Actions workflow
- name: Compress assets
  run: |
    find .output/public -type f \( -name '*.js' -o -name '*.css' -o -name '*.html' \) -exec gzip -k {} \;
```

## Performance Checklist

### Build Time
- [ ] Bundle size under 100KB
- [ ] CSS bundle under 50KB
- [ ] Code splitting configured
- [ ] Tree shaking enabled
- [ ] oxc minification active

### Runtime
- [ ] Images lazy loaded
- [ ] Components lazy loaded
- [ ] Critical CSS inlined
- [ ] Fonts optimized
- [ ] No layout shifts

### Caching
- [ ] Long cache headers for static assets
- [ ] Appropriate cache for dynamic content
- [ ] CDN configured (GitHub Pages)

### Monitoring
- [ ] Performance monitoring active
- [ ] Core Web Vitals tracking
- [ ] Bundle analysis automated
- [ ] Size limits configured