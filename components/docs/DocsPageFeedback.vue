<template>
  <div class="rounded-md border border-gray-200 bg-gray-50/50 p-5 dark:border-gray-800 dark:bg-gray-800/30">
    <div v-if="!submitted">
      <h3 class="mb-2.5 text-base font-semibold text-gray-900 dark:text-white">
        Was this page helpful?
      </h3>
      <div class="flex items-center gap-2.5">
        <button
          @click="submitFeedback('yes')"
          class="flex items-center gap-1.5 rounded-md border border-gray-300 bg-white px-3.5 py-2 text-sm font-medium text-gray-700 transition-all hover:bg-gray-50 hover:shadow-sm dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800"
        >
          <Icon name="heroicons:hand-thumb-up" class="h-4 w-4" />
          Yes
        </button>
        <button
          @click="submitFeedback('no')"
          class="flex items-center gap-1.5 rounded-md border border-gray-300 bg-white px-3.5 py-2 text-sm font-medium text-gray-700 transition-all hover:bg-gray-50 hover:shadow-sm dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800"
        >
          <Icon name="heroicons:hand-thumb-down" class="h-4 w-4" />
          No
        </button>
      </div>
    </div>
    
    <div v-else class="flex items-start gap-2.5">
      <Icon name="heroicons:check-circle" class="h-5 w-5 shrink-0 text-green-600 dark:text-green-400" />
      <div>
        <p class="text-sm font-medium text-gray-900 dark:text-white">
          Thank you for your feedback!
        </p>
        <p class="mt-0.5 text-xs text-gray-600 dark:text-gray-400">
          Your input helps us improve our documentation.
        </p>
      </div>
    </div>

    <!-- Edit on GitHub link -->
    <div class="mt-3.5 border-t border-gray-200 pt-3.5 dark:border-gray-700">
      <a
        :href="githubEditUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex items-center gap-1.5 text-xs text-gray-600 hover:text-gray-900 transition-colors dark:text-gray-400 dark:hover:text-white"
      >
        <Icon name="simple-icons:github" class="h-3.5 w-3.5" />
        Edit this page on GitHub
        <Icon name="heroicons:arrow-top-right-on-square" class="h-3 w-3" />
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const submitted = ref(false)

// Generate GitHub edit URL
const githubEditUrl = computed(() => {
  const baseUrl = 'https://github.com/openseadragon/openseadragon.github.io/edit/main'
  const contentPath = route.path.replace('/docs', '/content/docs')
  return `${baseUrl}${contentPath}.md`
})

// Submit feedback (placeholder - will implement analytics later)
const submitFeedback = (response: 'yes' | 'no') => {
  // Store feedback locally for now
  if (process.client) {
    console.log(`Page feedback for ${route.path}: ${response}`)
    
    // Could send to analytics service here
    // analytics.track('docs_feedback', {
    //   page: route.path,
    //   helpful: response === 'yes',
    // })
  }
  
  submitted.value = true
  
  // Reset after 3 seconds
  setTimeout(() => {
    submitted.value = false
  }, 3000)
}
</script>
