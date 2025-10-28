<template>
  <div class="tabs-container">
    <div class="tabs-header">
      <button
        v-for="(tab, index) in tabs"
        :key="index"
        @click="activeTab = index"
        class="tab-button"
        :class="{ active: activeTab === index }"
      >
        {{ tab.label }}
      </button>
    </div>
    <div class="tabs-content">
      <div
        v-for="(tab, index) in tabs"
        :key="index"
        v-show="activeTab === index"
      >
        <component :is="tab.content" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, useSlots, computed, provide } from 'vue'

const slots = useSlots()
const activeTab = ref(0)

provide('inTabs', true)

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
.tabs-container {
  margin: 1.5rem 0;
}

.tabs-header {
  display: flex;
  gap: 2px;
  border-bottom: 1px solid rgb(229, 231, 235);
}

.dark .tabs-header {
  border-bottom-color: #30363d;
}

.tab-button {
  padding: 0.5rem 1rem;
  background: transparent;
  border: none;
  border-bottom: 2px solid transparent;
  cursor: pointer;
  font-size: 14px;
  color: rgb(107, 114, 128);
  transition: all 0.2s;
}

.dark .tab-button {
  color: rgb(156, 163, 175);
}

.tab-button:hover {
  color: rgb(17, 24, 39);
}

.dark .tab-button:hover {
  color: rgb(229, 231, 235);
}

.tab-button.active {
  color: rgb(17, 24, 39);
  border-bottom-color: rgb(59, 130, 246);
}

.dark .tab-button.active {
  color: rgb(229, 231, 235);
  border-bottom-color: rgb(96, 165, 250);
}

.tabs-content {
  background: white;
  border: 1px solid rgb(229, 231, 235);
  border-top: none;
  border-radius: 0 0 8px 8px;
  overflow: hidden;
}

.dark .tabs-content {
  background: #0d1117;
  border-color: #30363d;
}
</style>
