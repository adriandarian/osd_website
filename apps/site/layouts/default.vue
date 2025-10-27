<template>
  <div class="min-h-screen flex flex-col">
    <!-- Header -->
    <header class="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div class="container flex h-16 items-center justify-between">
        <div class="flex items-center gap-6">
          <NuxtLink to="/" class="flex items-center space-x-2">
            <Icon name="mdi:anchor" class="h-6 w-6 text-primary-600" />
            <span class="font-bold text-xl">OpenSeadragon</span>
          </NuxtLink>
          
          <nav class="hidden md:flex items-center space-x-6 text-sm font-medium">
            <NuxtLink to="/docs" class="transition-colors hover:text-foreground/80">
              Documentation
            </NuxtLink>
            <NuxtLink to="/examples" class="transition-colors hover:text-foreground/80">
              Examples
            </NuxtLink>
            <NuxtLink to="/playground" class="transition-colors hover:text-foreground/80">
              Playground
            </NuxtLink>
            <NuxtLink to="/plugins" class="transition-colors hover:text-foreground/80">
              Plugins
            </NuxtLink>
          </nav>
        </div>

        <div class="flex items-center gap-4">
          <!-- Theme Toggle -->
          <button 
            @click="toggleColorMode" 
            class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground h-9 w-9"
            aria-label="Toggle theme"
          >
            <Icon v-if="colorMode.value === 'dark'" name="lucide:sun" class="h-5 w-5" />
            <Icon v-else name="lucide:moon" class="h-5 w-5" />
          </button>

          <!-- GitHub Link -->
          <a 
            href="https://github.com/openseadragon/openseadragon" 
            target="_blank" 
            rel="noopener noreferrer"
            class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground h-9 w-9"
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
    <footer class="border-t border-border/40 py-6 md:py-0">
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
