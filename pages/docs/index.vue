<template>
  <div class="container mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
    <!-- Hero Section -->
    <div class="mb-12 text-center">
      <h1 class="mb-4 text-4xl font-bold tracking-tight" style="color: var(--vp-c-text-1)">
        Documentation
      </h1>
      <p class="mx-auto max-w-2xl text-lg" style="color: var(--vp-c-text-2)">
        Everything you need to know about OpenSeadragon - from getting started to advanced features
      </p>
    </div>
    
    <!-- Quick Start Cards -->
    <div class="mb-12 grid gap-6 md:grid-cols-2">
      <NuxtLink
        to="/docs/getting-started"
        class="group relative overflow-hidden rounded-xl border p-6 shadow-sm transition-all hover:shadow-lg"
        style="border-color: var(--vp-c-brand-soft); background: linear-gradient(135deg, var(--vp-c-brand-soft) 0%, transparent 100%)"
      >
        <div class="relative z-10">
          <div class="mb-3 inline-flex rounded-lg p-2" style="background-color: var(--vp-c-brand-soft)">
            <Icon name="heroicons:rocket-launch" class="h-6 w-6" style="color: var(--vp-c-brand-1)" />
          </div>
          <h2 class="mb-2 text-2xl font-bold" style="color: var(--vp-c-text-1)">
            Getting Started
          </h2>
          <p class="mb-3 text-base" style="color: var(--vp-c-text-2)">
            Learn how to install and use OpenSeadragon in your project. Perfect for beginners!
          </p>
          <div class="inline-flex items-center gap-2 font-semibold transition-all group-hover:gap-3" style="color: var(--vp-c-brand-1)">
            <span>Start learning</span>
            <Icon name="heroicons:arrow-right" class="h-4 w-4" />
          </div>
        </div>
      </NuxtLink>

      <div class="group relative overflow-hidden rounded-xl border p-6 shadow-sm transition-all hover:shadow-lg" style="border-color: rgba(139, 92, 246, 0.3); background: linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, transparent 100%)">
        <div class="relative z-10">
          <div class="mb-3 inline-flex rounded-lg p-2" style="background-color: rgba(139, 92, 246, 0.1)">
            <Icon name="heroicons:code-bracket" class="h-6 w-6" style="color: rgb(139, 92, 246)" />
          </div>
          <h2 class="mb-2 text-2xl font-bold" style="color: var(--vp-c-text-1)">
            API Reference
          </h2>
          <p class="mb-3 text-base" style="color: var(--vp-c-text-2)">
            Complete API documentation for all OpenSeadragon classes and methods
          </p>
          <div class="inline-flex items-center gap-2 font-semibold" style="color: var(--vp-c-text-3)">
            <span>Coming soon</span>
            <Icon name="heroicons:clock" class="h-4 w-4" />
          </div>
        </div>
      </div>
    </div>

    <!-- Browse by Category -->
    <div class="mb-12">
      <h2 class="mb-6 text-2xl font-bold" style="color: var(--vp-c-text-1)">
        Browse by Category
      </h2>
      
      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <NuxtLink
          to="/docs/getting-started"
          class="group rounded-xl border p-5 shadow-sm transition-all hover:shadow-lg"
          style="border-color: var(--vp-c-brand-soft); background: linear-gradient(135deg, var(--vp-c-brand-soft) 0%, transparent 100%)"
        >
          <div class="mb-3 inline-flex rounded-lg p-2" style="background-color: var(--vp-c-brand-soft)">
            <Icon name="heroicons:rocket-launch" class="h-5 w-5" style="color: var(--vp-c-brand-1)" />
          </div>
          <h3 class="mb-2 text-lg font-bold" style="color: var(--vp-c-text-1)">
            Getting Started
          </h3>
          <p class="mb-2 text-sm" style="color: var(--vp-c-text-2)">
            Installation, setup, and basic usage
          </p>
          <span class="text-sm font-medium" style="color: var(--vp-c-brand-1)">
            4 articles →
          </span>
        </NuxtLink>

        <NuxtLink
          to="/docs/tile-sources"
          class="group rounded-xl border p-5 shadow-sm transition-all hover:shadow-lg"
          style="border-color: var(--vp-c-green-soft); background: linear-gradient(135deg, var(--vp-c-green-soft) 0%, transparent 100%)"
        >
          <div class="mb-3 inline-flex rounded-lg p-2" style="background-color: var(--vp-c-green-soft)">
            <Icon name="heroicons:squares-2x2" class="h-5 w-5" style="color: var(--vp-c-green-1)" />
          </div>
          <h3 class="mb-2 text-lg font-bold" style="color: var(--vp-c-text-1)">
            Guides
          </h3>
          <p class="mb-2 text-sm" style="color: var(--vp-c-text-2)">
            In-depth tutorials and use cases
          </p>
          <span class="text-sm font-medium" style="color: var(--vp-c-green-1)">
            1 article →
          </span>
        </NuxtLink>

        <NuxtLink
          to="/docs/configuration"
          class="group rounded-xl border p-5 shadow-sm transition-all hover:shadow-lg"
          style="border-color: var(--vp-c-yellow-soft); background: linear-gradient(135deg, var(--vp-c-yellow-soft) 0%, transparent 100%)"
        >
          <div class="mb-3 inline-flex rounded-lg p-2" style="background-color: var(--vp-c-yellow-soft)">
            <Icon name="heroicons:cog-6-tooth" class="h-5 w-5" style="color: var(--vp-c-yellow-1)" />
          </div>
          <h3 class="mb-2 text-lg font-bold" style="color: var(--vp-c-text-1)">
            Configuration
          </h3>
          <p class="mb-2 text-sm" style="color: var(--vp-c-text-2)">
            Options and customization
          </p>
          <span class="text-sm font-medium" style="color: var(--vp-c-yellow-1)">
            1 article →
          </span>
        </NuxtLink>
      </div>
    </div>

    <!-- Help Section -->
    <div class="rounded-xl border p-10 text-center shadow-lg transition-all hover:shadow-xl" style="border-color: var(--vp-c-divider); background: linear-gradient(135deg, var(--vp-c-bg-soft) 0%, var(--vp-c-bg-alt) 100%)">
      <div class="mb-4 inline-flex rounded-full p-4 shadow-sm" style="background-color: var(--vp-c-bg)">
        <Icon name="heroicons:magnifying-glass" class="h-8 w-8" style="color: var(--vp-c-text-2)" />
      </div>
      <h3 class="mb-3 text-2xl font-bold" style="color: var(--vp-c-text-1)">
        Can't find what you're looking for?
      </h3>
      <p class="mb-6" style="color: var(--vp-c-text-2)">
        Try clicking on a doc page to see the full documentation layout with sidebar navigation and table of contents
      </p>
      <div class="flex flex-wrap items-center justify-center gap-4">
        <NuxtLink
          to="/docs/getting-started"
          class="inline-flex items-center gap-2 rounded-lg px-6 py-3 font-semibold shadow-sm transition-all hover:shadow-md"
          style="background-color: var(--vp-c-brand-1); color: white"
        >
          <Icon name="heroicons:book-open" class="h-5 w-5" />
          View Getting Started
        </NuxtLink>
        <button
          class="inline-flex items-center gap-2 rounded-lg border px-6 py-3 font-semibold shadow-sm transition-all"
          style="border-color: var(--vp-c-divider); background-color: var(--vp-c-bg); color: var(--vp-c-text-1)"
        >
          <Icon name="heroicons:magnifying-glass" class="h-5 w-5" />
          Search (Coming Soon)
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default',
})

useSeoMeta({
  title: 'Documentation - OpenSeadragon',
  description: 'Comprehensive guides and API reference for OpenSeadragon - the open-source deep zoom image viewer',
})
</script> 
