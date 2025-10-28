<template>
  <div class="tabs-container my-5">
    <!-- Tab buttons -->
    <div class="flex flex-wrap gap-0.5 border-b border-gray-200 dark:border-gray-800">
      <button
        v-for="(tab, index) in tabs"
        :key="index"
        @click="activeTab = index"
        class="relative px-3.5 py-2 text-sm font-medium transition-all rounded-t-md"
        :class="[
          activeTab === index
            ? 'text-blue-600 dark:text-blue-400 bg-gray-50 dark:bg-gray-800/50'
            : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-50/50 dark:hover:bg-gray-800/30',
        ]"
      >
        {{ tab.label }}
        <span
          v-if="activeTab === index"
          class="absolute bottom-0 left-0 right-0 h-[2px] bg-blue-600 dark:bg-blue-400"
        ></span>
      </button>
    </div>

    <!-- Tab content -->
    <div class="tab-content mt-3 px-1">
      <div
        v-for="(tab, index) in tabs"
        :key="index"
        v-show="activeTab === index"
        class="prose prose-gray dark:prose-invert max-w-none"
      >
        <component :is="tab.content" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, useSlots, computed } from 'vue'

const slots = useSlots()
const activeTab = ref(0)

// Extract tab information from slots
const tabs = computed(() => {
  const defaultSlot = slots.default?.()
  if (!defaultSlot) return []

  return defaultSlot
    .filter((vnode: any) => vnode.type?.name === 'Tab' || vnode.props?.label)
    .map((vnode: any) => ({
      label: vnode.props?.label || 'Tab',
      content: () => vnode,
    }))
})
</script>

<style scoped>
.tab-content {
  animation: fadeIn 0.15s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-2px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
