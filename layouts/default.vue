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
            <ClientOnly>
              <Icon v-if="colorMode.value === 'dark'" name="lucide:sun" class="h-[18px] w-[18px]" />
              <Icon v-else name="lucide:moon" class="h-[18px] w-[18px]" />
            </ClientOnly>
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
    <footer class="border-t vp-footer">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div class="flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
          <!-- Copyright & Legal -->
          <div class="flex flex-wrap items-center justify-center md:justify-start gap-x-4 gap-y-2">
            <span class="vp-footer-text text-xs">© {{ new Date().getFullYear() }} OpenSeadragon</span>
            <NuxtLink to="/license" class="vp-footer-link hover:underline text-xs">BSD-3-Clause License</NuxtLink>
          </div>

          <!-- Community & Support Links -->
          <nav class="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs">
            <a href="https://github.com/openseadragon/openseadragon/discussions" target="_blank" rel="noopener noreferrer" class="vp-footer-link hover:underline">Community Discussions</a>
            <a href="https://github.com/openseadragon/openseadragon/issues" target="_blank" rel="noopener noreferrer" class="vp-footer-link hover:underline">Report a Bug</a>
            <a href="https://github.com/openseadragon/openseadragon/blob/master/CONTRIBUTING.md" target="_blank" rel="noopener noreferrer" class="vp-footer-link hover:underline">Contributing</a>
            <a href="https://github.com/openseadragon/openseadragon/releases" target="_blank" rel="noopener noreferrer" class="vp-footer-link hover:underline">Releases</a>
          </nav>

          <!-- Social Icons -->
          <div class="flex items-center gap-3">
            <a href="https://github.com/openseadragon/openseadragon" target="_blank" rel="noopener noreferrer" class="vp-footer-link hover:opacity-70 transition-opacity" aria-label="GitHub Repository">
              <Icon name="mdi:github" class="h-5 w-5" />
            </a>
            <a href="https://discord.gg/tRJBedam8G" target="_blank" rel="noopener noreferrer" class="vp-footer-link hover:opacity-70 transition-opacity" aria-label="Discord Community">
              <Icon name="mdi:discord" class="h-5 w-5" />
            </a>
            <a href="https://twitter.com/openseadragon" target="_blank" rel="noopener noreferrer" class="vp-footer-link hover:opacity-70 transition-opacity" aria-label="Twitter">
              <Icon name="mdi:twitter" class="h-5 w-5" />
            </a>
          </div>
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

/* Footer Styling */
.vp-footer {
  border-top: 1px solid var(--vp-c-divider);
  background-color: var(--vp-c-bg-alt);
}

.vp-footer-heading {
  color: var(--vp-c-text-1);
}

.vp-footer-text {
  color: var(--vp-c-text-2);
}

.vp-footer-link {
  color: var(--vp-c-text-2);
  transition: color 0.25s;
}

.vp-footer-link:hover {
  color: var(--vp-c-brand-1);
}

.vp-footer-border {
  border-top: 1px solid var(--vp-c-divider);
}
</style>
