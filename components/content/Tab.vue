<template>
  <div class="tab-item">
    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  label: string
}>()
</script>

<style scoped>
.tab-item {
  padding: 1rem 1.5rem;
}

.tab-item :deep(h2) {
  margin-top: 0;
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: rgb(17, 24, 39);
}

.dark .tab-item :deep(h2) {
  color: rgb(229, 231, 235);
}

.tab-item :deep(h3) {
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
  font-size: 1.125rem;
  font-weight: 600;
  color: rgb(31, 41, 55);
}

.dark .tab-item :deep(h3) {
  color: rgb(209, 213, 219);
}

.tab-item :deep(p) {
  margin-bottom: 1rem;
  line-height: 1.75;
  color: rgb(55, 65, 81);
}

.dark .tab-item :deep(p) {
  color: rgb(156, 163, 175);
}

.tab-item :deep(pre) {
  margin: 0.5rem 0;
  border-radius: 0.5rem;
  overflow-x: auto;
}

.tab-item :deep(code) {
  font-family: 'Monaco', 'Courier New', monospace;
  font-size: 0.875rem;
}

.tab-item :deep(ul),
.tab-item :deep(ol) {
  margin: 1rem 0;
  padding-left: 1.5rem;
  color: rgb(55, 65, 81);
}

.dark .tab-item :deep(ul),
.dark .tab-item :deep(ol) {
  color: rgb(156, 163, 175);
}

.tab-item :deep(li) {
  margin-bottom: 0.5rem;
  line-height: 1.75;
}
</style>
