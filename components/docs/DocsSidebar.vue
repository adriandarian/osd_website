<template>
  <div class="docs-sidebar">
    <!-- Search box -->
    <div class="mb-6">
      <DocsSearch />
    </div>

    <!-- Navigation sections -->
    <div v-if="navigation" class="space-y-2">
      <div v-for="section in navigation" :key="section.title" class="sidebar-section">
        <!-- Collapsible Section Header -->
        <button
          @click="toggleSection(section.title)"
          class="section-header group flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm font-semibold transition-all duration-200"
          :class="[
            isExpanded(section.title) || hasActiveLink(section)
              ? 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white'
              : 'text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800/50'
          ]"
        >
          <span class="flex items-center gap-2">
            <Icon
              v-if="section.icon"
              :name="section.icon"
              class="h-4 w-4 shrink-0"
            />
            <span>{{ section.title }}</span>
            <span class="ml-1 text-xs text-gray-500 dark:text-gray-400">({{ section.links.length }})</span>
          </span>
          
          <Icon
            name="heroicons:chevron-down"
            class="h-4 w-4 shrink-0 transition-transform duration-200"
            :class="{ 'rotate-180': isExpanded(section.title) || hasActiveLink(section) }"
          />
        </button>

        <!-- Collapsible Section Content -->
        <Transition name="collapse">
          <ul
            v-show="isExpanded(section.title) || hasActiveLink(section)"
            class="section-content mt-1 space-y-0.5 overflow-hidden pl-2"
          >
            <li v-for="link in section.links" :key="link._path">
              <NuxtLink
                :to="link._path"
                class="group flex items-center justify-between rounded-md px-2.5 py-1.5 text-sm transition-all duration-150 vp-sidebar-link"
                :class="{ 'active': isActive(link._path) }"
                @click="handleNavigate"
              >
                <span class="flex items-center gap-2 truncate">
                  <Icon
                    v-if="link.icon"
                    :name="link.icon"
                    class="h-[15px] w-[15px] shrink-0 transition-colors"
                    :class="[
                      isActive(link._path)
                        ? 'text-blue-600 dark:text-blue-400'
                        : 'text-gray-400 group-hover:text-gray-600 dark:text-gray-500 dark:group-hover:text-gray-300',
                    ]"
                  />
                  <span class="truncate">{{ link.title }}</span>
                </span>
                
                <span
                  v-if="link.badge"
                  class="ml-2 shrink-0 rounded px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider"
                  :class="getBadgeClass(link.badge)"
                >
                  {{ link.badge }}
                </span>
              </NuxtLink>
            </li>
          </ul>
        </Transition>
      </div>
    </div>

    <!-- Loading state -->
    <div v-else class="space-y-3">
      <div
        v-for="i in 5"
        :key="i"
        class="h-10 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-800"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['navigate'])
const route = useRoute()

// Section icons and order mapping
const sectionConfig: Record<string, { icon: string; order: number }> = {
  'Getting Started': { icon: 'heroicons:rocket-launch', order: 1 },
  'Configuration': { icon: 'heroicons:cog-6-tooth', order: 2 },
  'Guides': { icon: 'heroicons:book-open', order: 3 },
  'API Classes': { icon: 'heroicons:cube', order: 10 },
  'API Members': { icon: 'heroicons:variable', order: 11 },
  'API Methods': { icon: 'heroicons:code-bracket', order: 12 },
  'API Types': { icon: 'heroicons:document-text', order: 13 },
  'Examples': { icon: 'heroicons:beaker', order: 20 },
}

// Expanded sections state (store in localStorage)
const expandedSections = ref<Set<string>>(new Set())

// Initialize from localStorage
onMounted(() => {
  if (process.client) {
    const stored = localStorage.getItem('docs-sidebar-expanded')
    if (stored) {
      expandedSections.value = new Set(JSON.parse(stored))
    } else {
      // Default: expand Getting Started
      expandedSections.value.add('Getting Started')
    }
  }
})

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

  // Convert to navigation structure with icons and sort by order
  return Object.entries(grouped)
    .map(([title, links]) => ({
      title,
      icon: sectionConfig[title]?.icon || 'heroicons:folder',
      order: sectionConfig[title]?.order || 99,
      links: links as any[],
    }))
    .sort((a, b) => a.order - b.order)
})

// Check if section is expanded
const isExpanded = (sectionTitle: string) => {
  return expandedSections.value.has(sectionTitle)
}

// Check if section has active link
const hasActiveLink = (section: any) => {
  return section.links.some((link: any) => isActive(link._path))
}

// Toggle section
const toggleSection = (sectionTitle: string) => {
  if (expandedSections.value.has(sectionTitle)) {
    expandedSections.value.delete(sectionTitle)
  } else {
    expandedSections.value.add(sectionTitle)
  }
  
  // Save to localStorage
  if (process.client) {
    localStorage.setItem('docs-sidebar-expanded', JSON.stringify([...expandedSections.value]))
  }
}

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
  if (lower === 'class') {
    return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400'
  }
  if (lower === 'method') {
    return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
  }
  if (lower === 'member') {
    return 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400'
  }
  if (lower === 'type') {
    return 'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400'
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
  scroll-behavior: smooth;
}

/* Section styling */
.sidebar-section {
  @apply border-l-2 border-transparent;
}

.sidebar-section:has(.vp-sidebar-link.active) {
  @apply border-blue-500 dark:border-blue-400;
}

.section-header {
  @apply font-medium tracking-tight;
}

/* Collapse animation */
.collapse-enter-active,
.collapse-leave-active {
  transition: all 0.3s ease;
  max-height: 2000px;
  opacity: 1;
}

.collapse-enter-from,
.collapse-leave-to {
  max-height: 0;
  opacity: 0;
}

/* Link styling */
.vp-sidebar-link {
  @apply relative text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800/50 dark:hover:text-white;
}

.vp-sidebar-link.active {
  @apply bg-blue-50 text-blue-700 font-medium dark:bg-blue-900/20 dark:text-blue-400;
}

.vp-sidebar-link.active::before {
  content: '';
  @apply absolute left-0 top-1/2 h-4 w-0.5 -translate-y-1/2 bg-blue-600 dark:bg-blue-400;
}

/* Hide scrollbar */
.docs-sidebar {
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
}

.docs-sidebar::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}
</style>
