<template>
  <div class="min-h-screen" style="background-color: var(--vp-c-bg)">
    <!-- Main docs container -->
    <div class="mx-auto max-w-8xl">
      <div class="flex">
        <!-- Sidebar Navigation (Left) -->
        <aside
          class="fixed left-0 top-16 z-20 hidden h-[calc(100vh-4rem)] w-64 shrink-0 overflow-y-auto lg:block"
          style="border-right: 1px solid var(--vp-c-divider); background-color: var(--vp-c-bg-alt)"
        >
          <nav class="px-6 py-8">
            <DocsSidebar />
          </nav>
        </aside>

        <!-- Mobile Sidebar Toggle -->
        <div class="lg:hidden">
          <button
            @click="toggleMobileSidebar"
            class="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full shadow-lg ring-2 transition-all hover:scale-105 hover:shadow-xl active:scale-95"
            style="background-color: var(--vp-c-brand-1); color: white; --tw-ring-color: var(--vp-c-brand-soft)"
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
            class="fixed left-0 top-16 z-40 h-[calc(100vh-4rem)] w-80 overflow-y-auto shadow-2xl lg:hidden"
            style="border-right: 1px solid var(--vp-c-divider); background-color: var(--vp-c-bg-alt)"
          >
            <nav class="px-6 py-8">
              <DocsSidebar @navigate="closeMobileSidebar" />
            </nav>
          </aside>
        </Transition>

        <!-- Main Content Area -->
        <main class="min-h-screen w-full lg:pl-64 xl:pr-80">
          <div class="mx-auto max-w-3xl px-6 py-10 sm:px-8 lg:px-10 lg:py-12 rounded-lg" style="background-color: var(--vp-c-bg)">
            <!-- Breadcrumb -->
            <DocsBreadcrumb class="mb-8" />

            <!-- Page Content -->
            <article class="prose prose-lg prose-headings:scroll-mt-20 prose-headings:font-semibold prose-a:font-medium prose-a:no-underline hover:prose-a:underline prose-code:font-medium max-w-none vp-doc">
              <slot />
            </article>

            <!-- Page Navigation (Prev/Next) -->
            <DocsPageNav class="mt-16 pt-10" style="border-top: 1px solid var(--vp-c-divider)" />

            <!-- Page Feedback -->
            <DocsPageFeedback class="mt-10" />
          </div>
        </main>

        <!-- Table of Contents (Right) -->
        <aside
          class="fixed right-0 top-16 hidden h-[calc(100vh-4rem)] w-80 shrink-0 overflow-y-auto xl:block"
          style="border-left: 1px solid var(--vp-c-divider); background-color: var(--vp-c-bg-alt)"
        >
          <nav class="px-6 py-8">
            <DocsTableOfContents />
          </nav>
        </aside>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
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
  @apply mb-6 mt-0 scroll-mt-20 pb-4 text-4xl font-bold tracking-tight;
  border-bottom: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-1);
}

.prose :deep(h2) {
  @apply mb-4 mt-10 scroll-mt-20 pb-2 text-3xl font-semibold;
  border-bottom: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-1);
}

.prose :deep(h3) {
  @apply mb-3 mt-8 scroll-mt-20 text-2xl font-semibold;
  color: var(--vp-c-text-1);
}

.prose :deep(h4) {
  @apply mb-2 mt-6 scroll-mt-20 text-xl font-semibold;
  color: var(--vp-c-text-1);
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
</style>
