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

/* Text shadow for readability - only on pages without solid backgrounds */
:deep(.vp-doc p),
:deep(.vp-doc h1),
:deep(.vp-doc h2),
:deep(.vp-doc h3),
:deep(.vp-doc h4),
:deep(.vp-doc h5),
:deep(.vp-doc h6),
:deep(.vp-doc li) {
  position: relative;
}

/* Subtle text glow for homepage/landing pages without backgrounds */
:deep(.hero) p,
:deep(.hero) h1,
:deep(.hero) h2 {
  text-shadow: 0 2px 8px rgba(var(--vp-c-bg-rgb), 0.6),
               0 1px 4px rgba(var(--vp-c-bg-rgb), 0.5);
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


