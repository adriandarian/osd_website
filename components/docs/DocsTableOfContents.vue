<template>
  <div v-if="toc && toc.links && toc.links.length > 0" class="docs-toc">
    <h3 class="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
      On this page
    </h3>
    
    <nav>
      <ul class="space-y-1.5 text-sm">
        <li v-for="link in toc.links" :key="link.id">
          <a
            :href="`#${link.id}`"
            class="block border-l-2 py-1 pl-3 transition-colors text-xs"
            :class="[
              activeId === link.id
                ? 'border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400 font-medium'
                : 'border-gray-200 text-gray-600 hover:border-gray-400 hover:text-gray-900 dark:border-gray-800 dark:text-gray-400 dark:hover:border-gray-600 dark:hover:text-white',
            ]"
            @click.prevent="scrollToHeading(link.id)"
          >
            {{ link.text }}
          </a>
          
          <!-- Nested headings (h3 under h2) -->
          <ul v-if="link.children && link.children.length > 0" class="ml-3 mt-1 space-y-1">
            <li v-for="child in link.children" :key="child.id">
              <a
                :href="`#${child.id}`"
                class="block border-l-2 py-0.5 pl-3 text-[11px] transition-colors"
                :class="[
                  activeId === child.id
                    ? 'border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400 font-medium'
                    : 'border-gray-200 text-gray-500 hover:border-gray-400 hover:text-gray-900 dark:border-gray-800 dark:text-gray-500 dark:hover:border-gray-600 dark:hover:text-white',
                ]"
                @click.prevent="scrollToHeading(child.id)"
              >
                {{ child.text }}
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </nav>

    <!-- Back to top button -->
    <button
      v-if="showBackToTop"
      @click="scrollToTop"
      class="mt-5 flex w-full items-center justify-center gap-1.5 rounded-md border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800"
    >
      <Icon name="heroicons:arrow-up" class="h-3.5 w-3.5" />
      Back to top
    </button>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()

// Get table of contents from current page
const { data: page } = await useAsyncData(`toc-${route.path}`, () =>
  queryContent(route.path).findOne()
)

const toc = computed(() => page.value?.body?.toc)

// Track active heading
const activeId = ref<string>('')
const showBackToTop = ref(false)

// Intersection Observer to track active heading
let observer: IntersectionObserver | null = null

onMounted(() => {
  if (process.client) {
    // Set up intersection observer
    const headings = document.querySelectorAll(
      '.prose h2[id], .prose h3[id], .prose h4[id]'
    )
    
    if (headings.length > 0) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              activeId.value = entry.target.id
            }
          })
        },
        {
          rootMargin: '-80px 0px -80% 0px',
          threshold: 1.0,
        }
      )

      headings.forEach((heading) => {
        observer?.observe(heading)
      })
    }

    // Track scroll for back to top button
    window.addEventListener('scroll', handleScroll)
  }
})

onUnmounted(() => {
  if (process.client) {
    observer?.disconnect()
    window.removeEventListener('scroll', handleScroll)
  }
})

// Handle scroll events
const handleScroll = () => {
  if (process.client) {
    showBackToTop.value = window.scrollY > 400
  }
}

// Smooth scroll to heading
const scrollToHeading = (id: string) => {
  if (process.client) {
    const element = document.getElementById(id)
    if (element) {
      const offset = 80 // Account for fixed header
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.scrollY - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      })
    }
  }
}

// Scroll to top
const scrollToTop = () => {
  if (process.client) {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }
}

// Update observer when route changes
watch(() => route.path, () => {
  activeId.value = ''
  if (process.client && observer) {
    observer.disconnect()
    
    // Re-observe headings after content loads
    nextTick(() => {
      const headings = document.querySelectorAll(
        '.prose h2[id], .prose h3[id], .prose h4[id]'
      )
      headings.forEach((heading) => {
        observer?.observe(heading)
      })
    })
  }
})
</script>

<style scoped>
.docs-toc {
  position: sticky;
  top: 5rem;
}

/* Smooth hover transitions */
a {
  transition: border-color 0.2s ease, color 0.2s ease;
}
</style>
