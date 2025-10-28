<template>
  <div
    class="my-5 flex gap-3 rounded-md border-l-2 px-4 py-3 shadow-sm"
    :class="alertClasses"
  >
    <Icon
      :name="iconName"
      class="mt-0.5 h-4 w-4 shrink-0"
      :class="iconClasses"
    />
    <div class="flex-1 min-w-0">
      <p v-if="title" class="mb-1.5 font-semibold text-sm" :class="titleClasses">
        {{ title }}
      </p>
      <div class="prose-sm text-sm" :class="contentClasses">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    type?: 'info' | 'tip' | 'warning' | 'danger' | 'note'
    title?: string
  }>(),
  {
    type: 'info',
  }
)

const iconName = computed(() => {
  const icons = {
    info: 'heroicons:information-circle',
    tip: 'heroicons:light-bulb',
    warning: 'heroicons:exclamation-triangle',
    danger: 'heroicons:exclamation-circle',
    note: 'heroicons:pencil-square',
  }
  return icons[props.type] || icons.info
})

const alertClasses = computed(() => {
  const classes = {
    info: 'border-blue-500 bg-blue-50/50 dark:border-blue-500/50 dark:bg-blue-950/20 shadow-blue-100/50 dark:shadow-blue-950/20',
    tip: 'border-green-500 bg-green-50/50 dark:border-green-500/50 dark:bg-green-950/20 shadow-green-100/50 dark:shadow-green-950/20',
    warning: 'border-yellow-500 bg-yellow-50/50 dark:border-yellow-500/50 dark:bg-yellow-950/20 shadow-yellow-100/50 dark:shadow-yellow-950/20',
    danger: 'border-red-500 bg-red-50/50 dark:border-red-500/50 dark:bg-red-950/20 shadow-red-100/50 dark:shadow-red-950/20',
    note: 'border-gray-400 bg-gray-50/50 dark:border-gray-600/50 dark:bg-gray-800/20 shadow-gray-100/50 dark:shadow-gray-900/20',
  }
  return classes[props.type] || classes.info
})

const iconClasses = computed(() => {
  const classes = {
    info: 'text-blue-600 dark:text-blue-400',
    tip: 'text-green-600 dark:text-green-400',
    warning: 'text-yellow-600 dark:text-yellow-400',
    danger: 'text-red-600 dark:text-red-400',
    note: 'text-gray-600 dark:text-gray-400',
  }
  return classes[props.type] || classes.info
})

const titleClasses = computed(() => {
  const classes = {
    info: 'text-blue-900 dark:text-blue-300',
    tip: 'text-green-900 dark:text-green-300',
    warning: 'text-yellow-900 dark:text-yellow-300',
    danger: 'text-red-900 dark:text-red-300',
    note: 'text-gray-900 dark:text-gray-300',
  }
  return classes[props.type] || classes.info
})

const contentClasses = computed(() => {
  const classes = {
    info: 'text-blue-800 dark:text-blue-200',
    tip: 'text-green-800 dark:text-green-200',
    warning: 'text-yellow-800 dark:text-yellow-200',
    danger: 'text-red-800 dark:text-red-200',
    note: 'text-gray-800 dark:text-gray-200',
  }
  return classes[props.type] || classes.info
})
</script>
