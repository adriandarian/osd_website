<template>
  <nav aria-label="Breadcrumb" class="flex">
    <ol class="flex items-center space-x-1.5 text-xs">
      <!-- Home link -->
      <li>
        <NuxtLink
          to="/docs"
          class="flex items-center text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
        >
          <Icon name="heroicons:home" class="h-3.5 w-3.5" />
          <span class="sr-only">Documentation Home</span>
        </NuxtLink>
      </li>

      <!-- Breadcrumb items -->
      <li v-for="(crumb, index) in breadcrumbs" :key="crumb.path" class="flex items-center">
        <!-- Separator -->
        <Icon
          name="heroicons:chevron-right"
          class="mx-1.5 h-3 w-3 text-gray-400 dark:text-gray-600"
        />
        
        <!-- Crumb link or text -->
        <component
          :is="index === breadcrumbs.length - 1 ? 'span' : 'NuxtLink'"
          :to="crumb.path"
          :class="[
            index === breadcrumbs.length - 1
              ? 'font-medium text-gray-900 dark:text-white'
              : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors',
          ]"
          :aria-current="index === breadcrumbs.length - 1 ? 'page' : undefined"
        >
          {{ crumb.title }}
        </component>
      </li>
    </ol>
  </nav>
</template>

<script setup lang="ts">
const route = useRoute()

interface Breadcrumb {
  title: string
  path: string
}

// Generate breadcrumbs from current route
const breadcrumbs = computed<Breadcrumb[]>(() => {
  const pathSegments = route.path.split('/').filter(Boolean)
  const crumbs: Breadcrumb[] = []
  
  // Skip 'docs' as it's represented by the home icon
  const docsIndex = pathSegments.indexOf('docs')
  if (docsIndex === -1) return crumbs
  
  const relevantSegments = pathSegments.slice(docsIndex + 1)
  
  // Build breadcrumbs
  let currentPath = '/docs'
  for (const segment of relevantSegments) {
    currentPath += `/${segment}`
    
    // Convert slug to title (capitalize and replace hyphens)
    const title = segment
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
    
    crumbs.push({
      title,
      path: currentPath,
    })
  }
  
  return crumbs
})

// Optionally fetch actual page titles from content
const { data: pageData } = await useAsyncData(
  `breadcrumb-${route.path}`,
  async () => {
    if (route.path === '/docs' || route.path === '/docs/') {
      return null
    }
    
    try {
      const page = await queryContent(route.path).findOne()
      return page
    } catch {
      return null
    }
  }
)

// Update last breadcrumb with actual page title if available
watch(
  [pageData, breadcrumbs],
  ([data, crumbs]) => {
    if (data?.title && crumbs && crumbs.length > 0) {
      const lastItem = crumbs[crumbs.length - 1]
      if (lastItem) {
        lastItem.title = data.title
      }
    }
  },
  { immediate: true }
)
</script>

<style scoped>
/* Ensure breadcrumb doesn't wrap awkwardly */
nav {
  @apply overflow-x-auto;
}

ol {
  @apply flex-nowrap whitespace-nowrap;
}
</style>
