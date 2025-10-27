<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

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


