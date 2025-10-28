<template>
  <div>
    <!-- Search Button -->
    <button
      @click="open"
      class="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-gray-600 dark:text-gray-400 bg-transparent border border-gray-200 dark:border-gray-700 rounded-md hover:border-gray-300 dark:hover:border-gray-600 hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-all"
    >
      <Icon name="heroicons:magnifying-glass" class="w-4 h-4 text-gray-400" />
      <span class="flex-1 text-left text-gray-500 dark:text-gray-500">Search docs...</span>
      <kbd class="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-mono text-gray-500 dark:text-gray-500 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded">
        <span v-if="isMac">⌘</span>
        <span v-else>Ctrl</span>
        <span>K</span>
      </kbd>
    </button>

    <!-- Search Modal -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition-opacity duration-150"
        leave-active-class="transition-opacity duration-150"
        enter-from-class="opacity-0"
        leave-to-class="opacity-0"
      >
        <div
          v-if="isOpen"
          class="fixed inset-0 z-50 flex items-start justify-center pt-[12vh] px-4"
          @click="close"
        >
          <!-- Backdrop -->
          <div class="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

          <!-- Modal -->
          <div
            class="relative w-full max-w-2xl bg-white dark:bg-gray-900 rounded-lg shadow-xl border border-gray-200 dark:border-gray-800 overflow-hidden"
            @click.stop
          >
            <!-- Search Input -->
            <div class="flex items-center gap-3 px-4 py-3 border-b border-gray-200 dark:border-gray-800">
              <Icon name="heroicons:magnifying-glass" class="w-5 h-5 text-gray-400 flex-shrink-0" />
              <input
                ref="searchInput"
                v-model="query"
                type="text"
                placeholder="Search documentation..."
                class="flex-1 bg-transparent text-gray-900 dark:text-white placeholder-gray-400 outline-none text-sm"
                @keydown.down.prevent="highlightNext"
                @keydown.up.prevent="highlightPrevious"
                @keydown.enter="navigateToHighlighted"
                @keydown.esc="close"
              />
              <button
                v-if="query"
                @click="query = ''"
                class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              >
                <Icon name="heroicons:x-mark" class="w-4 h-4" />
              </button>
            </div>

            <!-- Results -->
            <div class="max-h-[55vh] overflow-y-auto">
              <!-- Loading -->
              <div v-if="isSearching" class="p-12 text-center text-gray-500">
                <Icon name="lucide:loader-2" class="w-5 h-5 animate-spin mx-auto mb-2 text-gray-400" />
                <p class="text-sm">Searching...</p>
              </div>

              <!-- No Query -->
              <div v-else-if="!query" class="p-12 text-center text-gray-500">
                <Icon name="heroicons:magnifying-glass" class="w-10 h-10 mx-auto mb-2 opacity-30 text-gray-400" />
                <p class="text-sm text-gray-400">Type to search documentation</p>
              </div>

              <!-- No Results -->
              <div v-else-if="results.length === 0 && !isSearching" class="p-12 text-center text-gray-500">
                <Icon name="heroicons:document-magnifying-glass" class="w-10 h-10 mx-auto mb-2 opacity-30 text-gray-400" />
                <p class="text-sm text-gray-400">No results for "<span class="font-medium text-gray-500">{{ query }}</span>"</p>
              </div>

              <!-- Results List -->
              <div v-else class="py-1.5">
                <NuxtLink
                  v-for="(result, index) in results"
                  :key="result._path"
                  :to="result._path"
                  :class="[
                    'flex flex-col gap-1 px-4 py-2.5 hover:bg-gray-50 dark:hover:bg-gray-800/60 transition-colors',
                    index === highlightedIndex && 'bg-gray-50 dark:bg-gray-800/60'
                  ]"
                  @click="close"
                >
                  <div class="flex items-center gap-2">
                    <Icon
                      v-if="result.icon"
                      :name="result.icon"
                      class="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0"
                    />
                    <span class="font-medium text-sm text-gray-900 dark:text-white">{{ result.title }}</span>
                    <span
                      v-if="result.badge"
                      :class="[
                        'px-2 py-0.5 text-xs font-medium rounded-full',
                        result.badge === 'new' && 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
                        result.badge === 'beta' && 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300',
                        result.badge === 'updated' && 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                      ]"
                    >
                      {{ result.badge }}
                    </span>
                  </div>
                  <p v-if="result.description" class="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                    {{ result.description }}
                  </p>
                  <div class="flex items-center gap-2 text-xs text-gray-500">
                    <span v-if="result.category" class="capitalize">{{ result.category }}</span>
                    <span v-if="result.category">·</span>
                    <span class="font-mono">{{ result._path }}</span>
                  </div>
                </NuxtLink>
              </div>
            </div>

            <!-- Footer -->
            <div class="flex items-center justify-between px-4 py-2 text-xs text-gray-500 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
              <div class="flex items-center gap-4">
                <span class="flex items-center gap-1">
                  <kbd class="px-1.5 py-0.5 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded">↑</kbd>
                  <kbd class="px-1.5 py-0.5 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded">↓</kbd>
                  <span class="ml-1">navigate</span>
                </span>
                <span class="flex items-center gap-1">
                  <kbd class="px-1.5 py-0.5 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded">↵</kbd>
                  <span class="ml-1">select</span>
                </span>
                <span class="flex items-center gap-1">
                  <kbd class="px-1.5 py-0.5 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded">esc</kbd>
                  <span class="ml-1">close</span>
                </span>
              </div>
              <div v-if="results.length > 0" class="text-gray-600 dark:text-gray-400">
                {{ results.length }} result{{ results.length !== 1 ? 's' : '' }}
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const isOpen = ref(false)
const query = ref('')
const results = ref<any[]>([])
const isSearching = ref(false)
const highlightedIndex = ref(0)
const searchInput = ref<HTMLInputElement | null>(null)

const isMac = computed(() => {
  if (process.client) {
    return navigator.platform.toUpperCase().indexOf('MAC') >= 0
  }
  return false
})

// Open search modal
const open = () => {
  isOpen.value = true
  nextTick(() => {
    searchInput.value?.focus()
  })
}

// Close search modal
const close = () => {
  isOpen.value = false
  query.value = ''
  results.value = []
  highlightedIndex.value = 0
}

// Search function
const search = async (searchQuery: string) => {
  if (!searchQuery) {
    results.value = []
    return
  }

  isSearching.value = true
  highlightedIndex.value = 0

  try {
    // Search in title, description, and content
    const searchResults = await queryContent('/docs')
      .where({
        $or: [
          { title: { $icontains: searchQuery } },
          { description: { $icontains: searchQuery } },
          { _path: { $icontains: searchQuery } },
        ],
      })
      .limit(10)
      .find()

    results.value = searchResults
  } catch (error) {
    console.error('Search error:', error)
    results.value = []
  } finally {
    isSearching.value = false
  }
}

// Debounced search
let searchTimeout: NodeJS.Timeout
watch(query, (newQuery) => {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    search(newQuery)
  }, 300)
})

// Keyboard navigation
const highlightNext = () => {
  if (highlightedIndex.value < results.value.length - 1) {
    highlightedIndex.value++
  }
}

const highlightPrevious = () => {
  if (highlightedIndex.value > 0) {
    highlightedIndex.value--
  }
}

const navigateToHighlighted = () => {
  if (results.value[highlightedIndex.value]) {
    router.push(results.value[highlightedIndex.value]._path)
    close()
  }
}

// Keyboard shortcut (Cmd/Ctrl + K)
const handleKeyDown = (e: KeyboardEvent) => {
  if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
    e.preventDefault()
    if (isOpen.value) {
      close()
    } else {
      open()
    }
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeyDown)
})
</script>
