<template>
  <div class="min-h-screen flex flex-col">
    <!-- Header -->
    <header class="sticky top-0 z-50 w-full backdrop-blur-md vp-header">
      <div class="w-full max-w-7xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div class="flex items-center gap-8">
          <NuxtLink to="/" class="flex items-center space-x-2.5 transition-opacity hover:opacity-80 vp-logo">
            <img src="/logo.png" alt="OpenSeadragon" class="h-8 w-8" />
            <span class="text-xl font-bold">OpenSeadragon</span>
          </NuxtLink>
          
          <nav class="hidden md:flex items-center space-x-1 text-sm font-medium">
            <NuxtLink to="/docs" class="rounded-md px-3 py-2 transition-colors vp-nav-link">
              Documentation
            </NuxtLink>
            <NuxtLink to="/examples" class="rounded-md px-3 py-2 transition-colors vp-nav-link">
              Examples
            </NuxtLink>
            <NuxtLink to="/playground" class="rounded-md px-3 py-2 transition-colors vp-nav-link">
              Playground
            </NuxtLink>
            <NuxtLink to="/plugins" class="rounded-md px-3 py-2 transition-colors vp-nav-link">
              Plugins
            </NuxtLink>
          </nav>
        </div>

        <div class="flex items-center gap-2">
          <!-- Theme Toggle -->
          <button 
            @click="toggleColorMode" 
            class="inline-flex items-center justify-center rounded-lg text-sm font-medium transition-all h-9 w-9 vp-button"
            aria-label="Toggle theme"
          >
            <Icon v-if="colorMode.value === 'dark'" name="lucide:sun" class="h-[18px] w-[18px]" />
            <Icon v-else name="lucide:moon" class="h-[18px] w-[18px]" />
          </button>

          <!-- GitHub Link -->
          <a 
            href="https://github.com/openseadragon/openseadragon" 
            target="_blank" 
            rel="noopener noreferrer"
            class="inline-flex items-center justify-center rounded-lg text-sm font-medium transition-all h-9 w-9 vp-button"
            aria-label="GitHub"
          >
            <Icon name="mdi:github" class="h-5 w-5" />
          </a>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="flex-1">
      <slot />
    </main>

    <!-- Footer -->
    <footer class="border-t border-gray-200 py-6 dark:border-gray-800 md:py-0">
      <div class="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <div class="text-center text-sm leading-loose text-muted-foreground md:text-left">
          Built with <a href="https://nuxt.com" target="_blank" rel="noopener noreferrer" class="font-medium underline underline-offset-4">Nuxt</a>.
          OpenSeadragon is open source on <a href="https://github.com/openseadragon/openseadragon" target="_blank" rel="noopener noreferrer" class="font-medium underline underline-offset-4">GitHub</a>.
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
const colorMode = useColorMode()

const toggleColorMode = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}
</script>

<style scoped>
/* VitePress Header Styling */
.vp-header {
  border-bottom: 1px solid var(--vp-c-divider);
  background-color: var(--vp-c-bg);
}

.vp-logo {
  color: var(--vp-c-text-1);
}

.vp-icon-brand {
  color: var(--vp-c-brand-1);
}

.vp-nav-link {
  color: var(--vp-c-text-2);
}

.vp-nav-link:hover {
  background-color: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
}

.vp-button {
  color: var(--vp-c-text-2);
}

.vp-button:hover {
  background-color: var(--vp-c-bg-soft);
}
</style>
