<template>
  <nav v-if="prev || next" class="border-t border-gray-200 pt-6 dark:border-gray-800">
    <div class="grid gap-3 sm:grid-cols-2">
      <!-- Previous page -->
      <div v-if="prev" class="group">
        <NuxtLink
          :to="prev._path"
          class="flex h-full flex-col rounded-md border border-gray-200 p-3.5 transition-all hover:border-gray-300 hover:bg-gray-50/50 hover:shadow-sm dark:border-gray-800 dark:hover:border-gray-700 dark:hover:bg-gray-800/50"
        >
          <span class="mb-1 flex items-center text-xs font-medium text-gray-500 dark:text-gray-400">
            <Icon name="heroicons:arrow-left" class="mr-1.5 h-3.5 w-3.5" />
            Previous
          </span>
          <span class="text-sm font-semibold text-gray-900 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
            {{ prev.title }}
          </span>
          <span v-if="prev.description" class="mt-1 text-xs text-gray-600 dark:text-gray-400 line-clamp-1">
            {{ prev.description }}
          </span>
        </NuxtLink>
      </div>
      
      <!-- Empty space if no previous -->
      <div v-else class="hidden sm:block" />

      <!-- Next page -->
      <div v-if="next" class="group">
        <NuxtLink
          :to="next._path"
          class="flex h-full flex-col rounded-md border border-gray-200 p-3.5 text-right transition-all hover:border-gray-300 hover:bg-gray-50/50 hover:shadow-sm dark:border-gray-800 dark:hover:border-gray-700 dark:hover:bg-gray-800/50"
        >
          <span class="mb-1 flex items-center justify-end text-xs font-medium text-gray-500 dark:text-gray-400">
            Next
            <Icon name="heroicons:arrow-right" class="ml-1.5 h-3.5 w-3.5" />
          </span>
          <span class="text-sm font-semibold text-gray-900 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
            {{ next.title }}
          </span>
          <span v-if="next.description" class="mt-1 text-xs text-gray-600 dark:text-gray-400 line-clamp-1">
            {{ next.description }}
          </span>
        </NuxtLink>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
const route = useRoute()

// Fetch surrounding navigation (prev/next pages)
const { data: navigation } = await useAsyncData(`page-nav-${route.path}`, async () => {
  try {
    // Get all docs pages sorted by order
    const allPages = await queryContent('/docs')
      .only(['_path', 'title', 'description', 'order'])
      .where({ _path: { $ne: '/docs' } }) // Exclude index
      .sort({ order: 1, _path: 1 })
      .find()

    // Find current page index
    const currentIndex = allPages.findIndex(page => page._path === route.path)
    
    if (currentIndex === -1) {
      return { prev: null, next: null }
    }

    return {
      prev: currentIndex > 0 ? allPages[currentIndex - 1] : null,
      next: currentIndex < allPages.length - 1 ? allPages[currentIndex + 1] : null,
    }
  } catch {
    return { prev: null, next: null }
  }
})

const prev = computed(() => navigation.value?.prev)
const next = computed(() => navigation.value?.next)
</script>
