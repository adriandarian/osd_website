<template>
  <div class="docs-sidebar">
    <!-- Search box -->
    <div class="mb-8">
      <DocsSearch />
    </div>

    <!-- Navigation sections -->
    <div v-if="navigation" class="space-y-6">
      <div v-for="section in navigation" :key="section.title" class="space-y-1.5">
        <!-- Section title -->
        <h3 class="vp-section-title mb-2 px-2.5">
          {{ section.title }}
        </h3>

        <!-- Section links -->
        <ul class="space-y-0.5">
          <li v-for="link in section.links" :key="link._path">
            <NuxtLink
              :to="link._path"
              class="group flex items-center justify-between rounded-md px-2.5 py-1.5 text-sm font-medium transition-all duration-200 vp-sidebar-link"
              :class="{ 'active': isActive(link._path) }"
              @click="handleNavigate"
            >
              <span class="flex items-center gap-2">
                <Icon
                  v-if="link.icon"
                  :name="link.icon"
                  class="h-[17px] w-[17px] shrink-0 transition-colors"
                  :class="[
                    isActive(link._path)
                      ? 'text-blue-600 dark:text-blue-400'
                      : 'text-gray-400 group-hover:text-gray-600 dark:text-gray-500 dark:group-hover:text-gray-300',
                  ]"
                />
                <span>{{ link.title }}</span>
              </span>
              
              <!-- Badge for new or beta items - HIDDEN FOR NOW -->
              <!-- <span
                v-if="link.badge"
                class="ml-2 rounded px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider"
                :class="getBadgeClass(link.badge)"
              >
                {{ link.badge }}
              </span> -->
            </NuxtLink>

            <!-- Nested links (if any) -->
            <ul v-if="link.children && link.children.length > 0" class="ml-3 mt-0.5 space-y-0.5">
              <li v-for="child in link.children" :key="child._path">
                <NuxtLink
                  :to="child._path"
                  class="block rounded-md px-2.5 py-1 text-xs transition-colors"
                  :class="[
                    isActive(child._path)
                      ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white',
                  ]"
                  @click="handleNavigate"
                >
                  {{ child.title }}
                </NuxtLink>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>

    <!-- Loading state -->
    <div v-else class="space-y-4">
      <div
        v-for="i in 3"
        :key="i"
        class="h-8 animate-pulse rounded-md bg-gray-200 dark:bg-gray-800"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['navigate'])
const route = useRoute()

// Fetch navigation structure from content
const { data: navigation } = await useAsyncData('docs-navigation', async () => {
  const contentData = await queryContent('/docs')
    .only(['_path', 'title', 'description', 'icon', 'category', 'order', 'badge'])
    .sort({ order: 1, title: 1 })
    .find()

  // Group by category
  const grouped = contentData.reduce((acc: any, doc: any) => {
    const category = doc.category || 'General'
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push({
      _path: doc._path,
      title: doc.title,
      icon: doc.icon,
      badge: doc.badge,
      order: doc.order,
    })
    return acc
  }, {})

  // Convert to navigation structure
  return Object.entries(grouped).map(([title, links]) => ({
    title,
    links: links as any[],
  }))
})

// Check if link is active
const isActive = (path: string) => {
  return route.path === path || route.path.startsWith(path + '/')
}

// Get badge styling
const getBadgeClass = (badge: string) => {
  const lower = badge.toLowerCase()
  if (lower === 'new') {
    return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
  }
  if (lower === 'beta') {
    return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
  }
  if (lower === 'updated') {
    return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
  }
  return 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400'
}

// Handle navigation click
const handleNavigate = () => {
  emit('navigate')
}
</script>

<style scoped>
.docs-sidebar {
  @apply text-sm;
}

/* Smooth scrolling */
.docs-sidebar {
  scroll-behavior: smooth;
}
</style>
