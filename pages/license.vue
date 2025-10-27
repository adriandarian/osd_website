<template>
  <div class="min-h-screen" style="background-color: var(--vp-c-bg)">
    <div class="mx-auto max-w-4xl px-6 py-16 sm:px-8 lg:px-10">
      <article class="prose prose-lg max-w-none vp-doc">
        <h1>License</h1>

        <div class="license-content">
          <pre class="license-text">{{ licenseText }}</pre>
        </div>
      </article>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default'
})

useSeoMeta({
  title: 'License - OpenSeadragon',
  description: 'OpenSeadragon is released under the BSD-3-Clause License. View the full license terms and conditions.',
  ogTitle: 'License - OpenSeadragon',
  ogDescription: 'OpenSeadragon is released under the BSD-3-Clause License.',
})

// Read license from LICENSE.txt file
const licenseText = ref('')

onMounted(async () => {
  try {
    const response = await fetch('/LICENSE.txt')
    licenseText.value = await response.text()
  } catch (error) {
    console.error('Failed to load license:', error)
    licenseText.value = 'Error loading license. Please visit https://github.com/openseadragon/openseadragon/blob/master/LICENSE.txt'
  }
})
</script>

<style scoped>
.vp-doc {
  color: var(--vp-c-text-1);
}

.license-content {
  margin-top: 2rem;
}

.license-text {
  padding: 2rem;
  background-color: var(--vp-c-bg-soft);
  border-radius: 0.5rem;
  border-left: 4px solid var(--vp-c-brand-1);
  font-family: monospace;
  font-size: 0.9rem;
  line-height: 1.8;
  color: var(--vp-c-text-1);
  white-space: pre-wrap;
  overflow-x: auto;
}

h1 {
  color: var(--vp-c-text-1);
  border-bottom: 2px solid var(--vp-c-divider);
  padding-bottom: 1rem;
}
</style>
