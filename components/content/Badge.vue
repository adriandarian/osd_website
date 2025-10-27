<template>
  <span
    class="inline-flex items-center rounded-md px-2 py-0.5 text-xs font-semibold"
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
    success: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
    info: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
    warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
    danger: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
    neutral: 'bg-gray-100 text-gray-800 dark:bg-gray-800/50 dark:text-gray-300',
  }
  return classes[props.type] || classes.neutral
})
</script>
