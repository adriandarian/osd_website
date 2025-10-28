<template>
  <span
    class="inline-flex items-center rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
    :class="badgeClasses"
  >
    <slot />
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    type?: 'success' | 'info' | 'warning' | 'danger' | 'neutral'
  }>(),
  {
    type: 'neutral',
  }
)

const badgeClasses = computed(() => {
  const classes = {
    success: 'bg-green-100/80 text-green-700 dark:bg-green-900/25 dark:text-green-300 ring-1 ring-green-200 dark:ring-green-800/50',
    info: 'bg-blue-100/80 text-blue-700 dark:bg-blue-900/25 dark:text-blue-300 ring-1 ring-blue-200 dark:ring-blue-800/50',
    warning: 'bg-yellow-100/80 text-yellow-700 dark:bg-yellow-900/25 dark:text-yellow-300 ring-1 ring-yellow-200 dark:ring-yellow-800/50',
    danger: 'bg-red-100/80 text-red-700 dark:bg-red-900/25 dark:text-red-300 ring-1 ring-red-200 dark:ring-red-800/50',
    neutral: 'bg-gray-100/80 text-gray-700 dark:bg-gray-800/40 dark:text-gray-300 ring-1 ring-gray-200 dark:ring-gray-700/50',
  }
  return classes[props.type] || classes.neutral
})
</script>
