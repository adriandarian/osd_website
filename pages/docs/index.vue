<template>
  <div class="container py-12">
    <div class="max-w-3xl">
      <h1 class="text-4xl font-bold mb-4">Documentation</h1>
      <p class="text-lg text-muted-foreground mb-8">
        Comprehensive guides and API reference for OpenSeadragon
      </p>
      
      <div class="grid gap-6">
        <div class="rounded-lg border bg-card p-6">
          <h2 class="text-2xl font-bold mb-2">Getting Started</h2>
          <p class="text-muted-foreground mb-4">
            Learn how to install and use OpenSeadragon in your project
          </p>
          <NuxtLink to="/docs/getting-started" class="text-primary hover:underline">
            Read more →
          </NuxtLink>
        </div>

        <div class="rounded-lg border bg-card p-6">
          <h2 class="text-2xl font-bold mb-2">API Reference</h2>
          <p class="text-muted-foreground mb-4">
            Complete API documentation for all OpenSeadragon classes and methods
          </p>
          <NuxtLink to="/docs/api" class="text-primary hover:underline">
            Browse API →
          </NuxtLink>
        </div>

        <div class="rounded-lg border bg-card p-6">
          <h2 class="text-2xl font-bold mb-2">Guides</h2>
          <p class="text-muted-foreground mb-4">
            In-depth guides covering common use cases and advanced features
          </p>
          <NuxtLink to="/docs/guides" class="text-primary hover:underline">
            View Guides →
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Documentation - OpenSeadragon',
  description: 'Comprehensive guides and API reference for OpenSeadragon',
})
</script>
