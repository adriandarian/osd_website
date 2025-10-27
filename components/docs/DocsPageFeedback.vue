<template>
  <div class="rounded-lg border border-gray-200 bg-gray-50 p-6 dark:border-gray-800 dark:bg-gray-800/50">
    <div v-if="!submitted">
      <h3 class="mb-3 text-lg font-semibold text-gray-900 dark:text-white">
        Was this page helpful?
      </h3>
      <div class="flex items-center gap-3">
        <button
          @click="submitFeedback('yes')"
          class="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800"
        >
          <Icon name="heroicons:hand-thumb-up" class="h-5 w-5" />
          Yes
        </button>
        <button
          @click="submitFeedback('no')"
          class="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800"
        >
          <Icon name="heroicons:hand-thumb-down" class="h-5 w-5" />
          No
        </button>
      </div>
    </div>
    
    <div v-else class="flex items-start gap-3">
      <Icon name="heroicons:check-circle" class="h-6 w-6 shrink-0 text-green-600 dark:text-green-400" />
      <div>
        <p class="text-sm font-medium text-gray-900 dark:text-white">
          Thank you for your feedback!
        </p>
        <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
          Your input helps us improve our documentation.
        </p>
      </div>
    </div>

    <!-- Edit on GitHub link -->
    <div class="mt-4 border-t border-gray-200 pt-4 dark:border-gray-700">
      <a
        :href="githubEditUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
      >
        <Icon name="simple-icons:github" class="h-4 w-4" />
        Edit this page on GitHub
        <Icon name="heroicons:arrow-top-right-on-square" class="h-4 w-4" />
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
