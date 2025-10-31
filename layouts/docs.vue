<template>
  <div class="min-h-screen flex flex-col">
    <!-- Header (from default layout) -->
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

        <div class="flex items-center gap-3">
          <!-- Search Bar (only on docs pages) -->
          <div v-if="isDocsRoute" class="hidden lg:block">
            <DocsSearch />
          </div>

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

    <!-- Main docs container -->
    <div class="flex-1">
      <div class="mx-auto max-w-8xl">
        <div class="flex relative">
        <!-- Sidebar Navigation (Left) -->
        <aside
          class="docs-sidebar-left sticky top-16 left-0 z-20 hidden h-[calc(100vh-4rem)] w-72 shrink-0 overflow-y-auto lg:block self-start"
          style="border-right: 1px solid var(--vp-c-divider);"
        >
          <nav class="px-5 py-8">
            <DocsSidebar />
          </nav>
        </aside>

        <!-- Mobile Sidebar Toggle -->
        <div class="lg:hidden">
          <button
            @click="toggleMobileSidebar"
            class="fixed bottom-6 right-6 z-50 flex h-11 w-11 items-center justify-center rounded-full shadow-md ring-1 transition-all hover:shadow-lg active:scale-95"
            style="background-color: var(--vp-c-brand-1); color: white; --tw-ring-color: var(--vp-c-divider);"
            aria-label="Toggle documentation navigation"
          >
            <Icon
              :name="isMobileSidebarOpen ? 'heroicons:x-mark' : 'heroicons:bars-3'"
              class="h-5 w-5"
            />
          </button>
        </div>

        <!-- Mobile Sidebar Overlay -->
        <Transition name="fade">
          <div
            v-if="isMobileSidebarOpen"
            class="fixed inset-0 z-30 backdrop-blur-sm lg:hidden"
            style="background-color: rgba(0, 0, 0, 0.4)"
            @click="toggleMobileSidebar"
          />
        </Transition>

        <!-- Mobile Sidebar -->
        <Transition name="slide">
          <aside
            v-if="isMobileSidebarOpen"
            class="docs-mobile-sidebar fixed left-0 top-16 bottom-0 z-40 w-80 overflow-y-auto shadow-xl lg:hidden"
            style="border-right: 1px solid var(--vp-c-divider);"
          >
            <nav class="px-4 py-6">
              <DocsSidebar @navigate="closeMobileSidebar" />
            </nav>
          </aside>
        </Transition>

        <!-- Main Content Area -->
        <main class="w-full flex-1 min-w-0">
          <div class="mx-auto max-w-4xl px-8 py-10 lg:px-12 lg:py-12">
            <!-- Breadcrumb -->
            <DocsBreadcrumb class="mb-8" />

            <!-- Page Content -->
            <article class="docs-content-card prose prose-base prose-headings:scroll-mt-20 prose-a:font-medium prose-a:no-underline hover:prose-a:underline prose-code:font-medium prose-code:text-sm max-w-none vp-doc">
              <slot />
            </article>

            <!-- Page Navigation (Prev/Next) -->
            <DocsPageNav class="docs-content-card mt-16 pt-10" style="border-top: 1px solid var(--vp-c-divider)" />

            <!-- Page Feedback -->
            <DocsPageFeedback class="docs-content-card mt-10" />
          </div>
        </main>

        <!-- Table of Contents (Right) -->
        <aside
          class="docs-toc-right sticky top-16 right-0 hidden h-[calc(100vh-4rem)] w-64 shrink-0 overflow-y-auto xl:block self-start"
          style="border-left: 1px solid var(--vp-c-divider);"
        >
          <nav class="px-6 py-8">
            <DocsTableOfContents />
          </nav>
        </aside>
      </div>
    </div>
    </div>

    <!-- Footer (from default layout) -->
    <footer class="border-t vp-footer">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <!-- About Section -->
          <div class="space-y-4">
            <div class="flex items-center space-x-2.5">
              <img src="/logo.png" alt="OpenSeadragon" class="h-8 w-8" />
              <span class="text-lg font-bold">OpenSeadragon</span>
            </div>
            <p class="text-sm vp-footer-text">
              An open-source, web-based viewer for high-resolution zoomable images, implemented in pure JavaScript.
            </p>
          </div>

          <!-- Documentation Links -->
          <div class="space-y-4">
            <h3 class="text-sm font-semibold uppercase tracking-wider vp-footer-heading">Documentation</h3>
            <ul class="space-y-3">
              <li>
                <NuxtLink to="/docs/installation" class="text-sm vp-footer-link">Installation</NuxtLink>
              </li>
              <li>
                <NuxtLink to="/docs/setup" class="text-sm vp-footer-link">Setup</NuxtLink>
              </li>
              <li>
                <NuxtLink to="/docs/configuration" class="text-sm vp-footer-link">Configuration</NuxtLink>
              </li>
            </ul>
          </div>

          <!-- Resources Links -->
          <div class="space-y-4">
            <h3 class="text-sm font-semibold uppercase tracking-wider vp-footer-heading">Resources</h3>
            <ul class="space-y-3">
              <li>
                <NuxtLink to="/examples" class="text-sm vp-footer-link">Examples</NuxtLink>
              </li>
              <li>
                <NuxtLink to="/playground" class="text-sm vp-footer-link">Playground</NuxtLink>
              </li>
              <li>
                <NuxtLink to="/plugins" class="text-sm vp-footer-link">Plugins</NuxtLink>
              </li>
              <li>
                <a href="https://github.com/openseadragon/openseadragon" target="_blank" rel="noopener noreferrer" class="text-sm vp-footer-link">
                  GitHub
                </a>
              </li>
            </ul>
          </div>

          <!-- Community Links -->
          <div class="space-y-4">
            <h3 class="text-sm font-semibold uppercase tracking-wider vp-footer-heading">Community</h3>
            <ul class="space-y-3">
              <li>
                <a href="https://github.com/openseadragon/openseadragon/discussions" target="_blank" rel="noopener noreferrer" class="text-sm vp-footer-link">
                  Discussions
                </a>
              </li>
              <li>
                <a href="https://github.com/openseadragon/openseadragon/issues" target="_blank" rel="noopener noreferrer" class="text-sm vp-footer-link">
                  Issues
                </a>
              </li>
              <li>
                <NuxtLink to="/license" class="text-sm vp-footer-link">License</NuxtLink>
              </li>
            </ul>
          </div>
        </div>

        <div class="mt-12 pt-8 vp-footer-border">
          <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p class="text-sm vp-footer-text">
              © {{ new Date().getFullYear() }} OpenSeadragon. Released under the BSD License.
            </p>
            <div class="flex items-center gap-4">
              <a href="https://github.com/openseadragon/openseadragon" target="_blank" rel="noopener noreferrer" class="vp-footer-link">
                <Icon name="mdi:github" class="h-5 w-5" />
              </a>
              <a href="https://twitter.com/openseadragon" target="_blank" rel="noopener noreferrer" class="vp-footer-link">
                <Icon name="mdi:twitter" class="h-5 w-5" />
              </a>
            </div>
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

const isMobileSidebarOpen = ref(false)

const toggleMobileSidebar = () => {
  isMobileSidebarOpen.value = !isMobileSidebarOpen.value
}

const closeMobileSidebar = () => {
  isMobileSidebarOpen.value = false
}

// Close mobile sidebar on route change
const route = useRoute()
watch(() => route.path, () => {
  closeMobileSidebar()
})

// Check if we're on a docs route
const isDocsRoute = computed(() => {
  return route.path.startsWith('/docs')
})
</script>

<style scoped>
/* Fade transition for overlay */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Slide transition for mobile sidebar */
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(-100%);
}

/* Custom max-width for 3-column layout */
.max-w-8xl {
  max-width: 1920px;
}

/* Prose styling customization */
.prose {
  @apply text-gray-700 dark:text-gray-300;
}

.prose :deep(h1) {
  @apply mb-6 mt-0 scroll-mt-20 pb-4 text-3xl font-bold tracking-tight;
  border-bottom: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-1);
}

.prose :deep(h2) {
  @apply mb-4 mt-10 scroll-mt-20 pb-2 text-2xl font-semibold;
  border-bottom: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-1);
}

.prose :deep(h3) {
  @apply mb-3 mt-8 scroll-mt-20 text-xl font-semibold;
  color: var(--vp-c-text-1);
}

.prose :deep(h4) {
  @apply mb-2 mt-6 scroll-mt-20 text-lg font-semibold;
  color: var(--vp-c-text-1);
}

/* Indent content under h2 headings */
.prose :deep(h2 ~ *:not(h2):not(h1)) {
  margin-left: 1.5rem;
}

/* Reset indent for h3 and h4 to keep them aligned with content */
.prose :deep(h2 ~ h3),
.prose :deep(h2 ~ h4) {
  margin-left: 1.5rem;
}

/* Further indent content under h3 headings */
.prose :deep(h3 ~ *:not(h3):not(h2):not(h1)) {
  margin-left: 3rem;
}

/* Reset indent for h4 to keep it aligned with h3 content */
.prose :deep(h3 ~ h4) {
  margin-left: 3rem;
}

.prose :deep(p) {
  @apply mb-4 leading-7;
  color: var(--vp-c-text-1);
}

.prose :deep(a) {
  @apply font-medium underline-offset-4 transition-colors;
  color: var(--vp-c-brand-1);
  text-decoration: underline;
  text-decoration-color: transparent;
}

.prose :deep(a:hover) {
  color: var(--vp-c-brand-2);
  text-decoration-color: var(--vp-c-brand-2);
}

.prose :deep(ul) {
  @apply my-6 list-disc space-y-2 pl-6;
}

.prose :deep(ol) {
  @apply my-6 list-decimal space-y-2 pl-6;
}

.prose :deep(li) {
  @apply leading-7;
  color: var(--vp-c-text-1);
}

.prose :deep(strong) {
  @apply font-semibold;
  color: var(--vp-c-text-1);
}

.prose :deep(code) {
  @apply rounded px-1.5 py-0.5 text-sm font-mono;
  color: var(--vp-c-brand-1);
  background-color: var(--vp-c-brand-soft);
}

.prose :deep(pre) {
  @apply my-6 overflow-x-auto rounded-lg p-4;
  background-color: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-divider);
}

.prose :deep(pre code) {
  @apply block border-0 bg-transparent p-0 text-[14px] leading-relaxed;
  color: var(--vp-c-text-1);
  font-family: 'Menlo', 'Monaco', 'Consolas', monospace;
  background-color: transparent;
}

.prose :deep(blockquote) {
  @apply my-6 border-l-4 py-4 pl-6 pr-5 italic;
  border-color: var(--vp-c-divider);
  background-color: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
  font-weight: 400;
}

.prose :deep(hr) {
  @apply my-10;
  border-color: var(--vp-c-divider);
}

.prose :deep(table) {
  @apply my-8 w-full border-collapse overflow-hidden rounded-lg;
  border: 1px solid var(--vp-c-divider);
}

.prose :deep(th) {
  @apply border-b-2 px-4 py-3 text-left text-sm font-semibold;
  border-color: var(--vp-c-divider);
  background-color: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
}

.prose :deep(td) {
  @apply border-t px-4 py-3;
  border-color: var(--vp-c-divider);
  color: var(--vp-c-text-2);
}

/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}

/* Focus visible for accessibility */
*:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 2px;
}

/* VitePress Header Styling */
.vp-header {
  border-bottom: 1px solid var(--vp-c-divider);
  background-color: var(--vp-c-bg);
}

.vp-logo {
  color: var(--vp-c-text-1);
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

/* Docs Layout Improvements */
.docs-sidebar-left,
.docs-mobile-sidebar {
  box-shadow: 1px 0 0 0 var(--vp-c-divider);
  background-color: rgba(var(--vp-c-bg-rgb), 0.85) !important;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  position: relative;
  z-index: 20;
}

.docs-toc-right {
  box-shadow: -1px 0 0 0 var(--vp-c-divider);
  background-color: rgba(var(--vp-c-bg-rgb), 0.85) !important;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  position: relative;
  z-index: 20;
}

/* Content cards - only blur the actual content areas */
.docs-content-card {
  background-color: rgba(var(--vp-c-bg-rgb), 0.75) !important;
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border-radius: 12px;
  padding: 2rem;
  position: relative;
  z-index: 10;
}

/* Header with glassmorphism */
.vp-header {
  background-color: rgba(var(--vp-c-bg-rgb), 0.90) !important;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--vp-c-divider);
  position: relative;
  z-index: 50;
}

/* Footer above bubbles */
.vp-footer {
  position: relative;
  z-index: 10;
  background-color: rgba(var(--vp-c-bg-rgb), 0.85) !important;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

/* Smooth scrolling for sidebars */
.docs-sidebar-left,
.docs-toc-right {
  scroll-behavior: smooth;
  scrollbar-width: thin;
  scrollbar-color: var(--vp-c-divider) transparent;
}

/* Custom scrollbar for webkit browsers */
.docs-sidebar-left::-webkit-scrollbar,
.docs-toc-right::-webkit-scrollbar {
  width: 6px;
}

.docs-sidebar-left::-webkit-scrollbar-track,
.docs-toc-right::-webkit-scrollbar-track {
  background: transparent;
}

.docs-sidebar-left::-webkit-scrollbar-thumb,
.docs-toc-right::-webkit-scrollbar-thumb {
  background-color: var(--vp-c-divider);
  border-radius: 3px;
}

.docs-sidebar-left::-webkit-scrollbar-thumb:hover,
.docs-toc-right::-webkit-scrollbar-thumb:hover {
  background-color: var(--vp-c-border);
}
</style>
