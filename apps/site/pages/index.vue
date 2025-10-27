<template>
  <div>
    <!-- Hero Section -->
    <section class="container py-24 md:py-32 lg:py-40">
      <div class="mx-auto flex max-w-[980px] flex-col items-center gap-4 text-center">
        <h1 class="text-4xl font-bold leading-tight tracking-tighter md:text-6xl lg:leading-[1.1]">
          An open-source, web-based viewer for high-resolution zoomable images
        </h1>
        <p class="max-w-[750px] text-lg text-muted-foreground sm:text-xl">
          Implemented in pure JavaScript, OpenSeadragon features smooth zooming and panning,
          multi-image support, and full screen mode. Perfect for viewing gigapixel images,
          digital libraries, and scientific imaging.
        </p>
        <div class="flex flex-wrap gap-4 mt-4">
          <NuxtLink 
            to="/docs" 
            class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8"
          >
            Get Started
            <Icon name="lucide:arrow-right" class="ml-2 h-4 w-4" />
          </NuxtLink>
          <NuxtLink 
            to="/examples" 
            class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background border border-input bg-background hover:bg-accent hover:text-accent-foreground h-11 px-8"
          >
            View Examples
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="container py-24 md:py-32">
      <div class="mx-auto flex max-w-[980px] flex-col items-center gap-4 text-center mb-16">
        <h2 class="text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:leading-[1.1]">
          Why OpenSeadragon?
        </h2>
        <p class="max-w-[750px] text-lg text-muted-foreground">
          Battle-tested in production by major institutions worldwide
        </p>
      </div>

      <div class="mx-auto grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <div class="relative overflow-hidden rounded-lg border bg-card p-6">
          <div class="flex items-center gap-4 mb-4">
            <div class="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <Icon name="lucide:zap" class="h-6 w-6 text-primary" />
            </div>
            <h3 class="font-bold text-xl">Fast & Smooth</h3>
          </div>
          <p class="text-muted-foreground">
            Hardware-accelerated rendering with smooth zooming and panning, even on mobile devices.
          </p>
        </div>

        <div class="relative overflow-hidden rounded-lg border bg-card p-6">
          <div class="flex items-center gap-4 mb-4">
            <div class="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <Icon name="lucide:layers" class="h-6 w-6 text-primary" />
            </div>
            <h3 class="font-bold text-xl">Multi-Image</h3>
          </div>
          <p class="text-muted-foreground">
            Display multiple images in synchronized or independent viewers with overlay support.
          </p>
        </div>

        <div class="relative overflow-hidden rounded-lg border bg-card p-6">
          <div class="flex items-center gap-4 mb-4">
            <div class="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <Icon name="lucide:expand" class="h-6 w-6 text-primary" />
            </div>
            <h3 class="font-bold text-xl">Full Screen</h3>
          </div>
          <p class="text-muted-foreground">
            Native full-screen support across all modern browsers with keyboard navigation.
          </p>
        </div>

        <div class="relative overflow-hidden rounded-lg border bg-card p-6">
          <div class="flex items-center gap-4 mb-4">
            <div class="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <Icon name="lucide:smartphone" class="h-6 w-6 text-primary" />
            </div>
            <h3 class="font-bold text-xl">Touch Enabled</h3>
          </div>
          <p class="text-muted-foreground">
            Full touch and gesture support for iOS, Android, and touch-enabled laptops.
          </p>
        </div>

        <div class="relative overflow-hidden rounded-lg border bg-card p-6">
          <div class="flex items-center gap-4 mb-4">
            <div class="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <Icon name="lucide:puzzle" class="h-6 w-6 text-primary" />
            </div>
            <h3 class="font-bold text-xl">Extensible</h3>
          </div>
          <p class="text-muted-foreground">
            Rich plugin ecosystem with events, overlays, and annotation support.
          </p>
        </div>

        <div class="relative overflow-hidden rounded-lg border bg-card p-6">
          <div class="flex items-center gap-4 mb-4">
            <div class="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <Icon name="lucide:code" class="h-6 w-6 text-primary" />
            </div>
            <h3 class="font-bold text-xl">Pure JavaScript</h3>
          </div>
          <p class="text-muted-foreground">
            No dependencies, works with any framework. Just add a script tag and go.
          </p>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="container py-24 md:py-32">
      <div class="mx-auto flex max-w-[980px] flex-col items-center gap-4 rounded-lg border bg-card p-8 text-center">
        <h2 class="text-3xl font-bold leading-tight tracking-tighter md:text-4xl">
          Ready to get started?
        </h2>
        <p class="max-w-[600px] text-lg text-muted-foreground">
          Try OpenSeadragon in our interactive playground or dive into the documentation.
        </p>
        <div class="flex flex-wrap gap-4 mt-4">
          <NuxtLink 
            to="/playground" 
            class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8"
          >
            Try Playground
          </NuxtLink>
          <NuxtLink 
            to="/docs" 
            class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background border border-input bg-background hover:bg-accent hover:text-accent-foreground h-11 px-8"
          >
            Read Docs
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'OpenSeadragon - An open-source, web-based viewer for high-resolution zoomable images',
  description: 'OpenSeadragon is an open-source, web-based viewer for zoomable images, implemented in pure JavaScript.',
  ogTitle: 'OpenSeadragon',
  ogDescription: 'An open-source, web-based viewer for high-resolution zoomable images',
  twitterCard: 'summary_large_image',
})
</script>
