<template>
  <div class="relative">
    <ClientOnly>
      <UiInteractiveDots />
    </ClientOnly>
    <div class="content-wrapper">
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </div>
  </div>
</template>

<style scoped>
.content-wrapper {
  position: relative;
  z-index: 1;
  min-height: 100vh;
}

/* Apply text shadow for better readability over bubbles */
:deep(p),
:deep(h1),
:deep(h2),
:deep(h3),
:deep(h4),
:deep(h5),
:deep(h6),
:deep(li),
:deep(a:not(.button):not(.btn)),
:deep(span:not([class*='bg-'])) {
  text-shadow: 0 0 12px rgba(var(--vp-c-bg-rgb), 0.95),
               0 0 8px rgba(var(--vp-c-bg-rgb), 0.9),
               0 0 4px rgba(var(--vp-c-bg-rgb), 0.85),
               0 1px 2px rgba(var(--vp-c-bg-rgb), 0.8);
}

/* Make headings even more prominent */
:deep(h1),
:deep(h2),
:deep(h3) {
  text-shadow: 0 0 16px rgba(var(--vp-c-bg-rgb), 1),
               0 0 12px rgba(var(--vp-c-bg-rgb), 0.95),
               0 0 8px rgba(var(--vp-c-bg-rgb), 0.9),
               0 2px 4px rgba(var(--vp-c-bg-rgb), 0.85);
}
</style>

<script setup lang="ts">
// GitHub Pages SPA support - handle redirects from 404.html
onMounted(() => {
  if (process.client) {
    // Check if we were redirected from 404.html
    const query = window.location.search
    if (query && query.startsWith('?/')) {
      // Decode the path from the query string
      const decoded = query.slice(1).split('&').map((s) => s.replace(/~and~/g, '&')).join('?')
      const targetPath = decoded.replace(/^\//, '')
      
      // Navigate to the correct route
      if (targetPath) {
        navigateTo('/' + targetPath, { replace: true })
      }
    }
  }
})

// Ensure proper head management
useHead({
  htmlAttrs: {
    lang: 'en'
  }
})
</script>


