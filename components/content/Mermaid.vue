<template>
  <div class="mermaid-wrapper my-8">
    <div
      ref="mermaidContainer"
      class="flex items-center justify-center overflow-x-auto rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-900/50"
      v-html="renderedDiagram"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import mermaid from 'mermaid'

const props = defineProps<{
  code: string
}>()

const mermaidContainer = ref<HTMLElement | null>(null)
const renderedDiagram = ref('')

const renderDiagram = async () => {
  if (!props.code) return

  try {
    const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`
    const { svg } = await mermaid.render(id, props.code)
    renderedDiagram.value = svg
  } catch (error) {
    console.error('Mermaid rendering error:', error)
    renderedDiagram.value = `<pre class="text-red-600 dark:text-red-400 text-sm">Failed to render diagram: ${error}</pre>`
  }
}

// Initialize mermaid with configuration
onMounted(async () => {
  mermaid.initialize({
    startOnLoad: false,
    theme: 'default',
    themeVariables: {
      primaryColor: '#3b82f6',
      primaryTextColor: '#1e293b',
      primaryBorderColor: '#2563eb',
      lineColor: '#64748b',
      secondaryColor: '#8b5cf6',
      tertiaryColor: '#10b981',
    },
    darkMode: false,
    fontFamily: 'ui-sans-serif, system-ui, -apple-system, sans-serif',
    fontSize: 14,
  })

  await renderDiagram()
})

// Re-render when code changes
watch(() => props.code, renderDiagram)
</script>

<style scoped>
.mermaid-wrapper :deep(svg) {
  max-width: 100%;
  height: auto;
}

.mermaid-wrapper {
  overflow-x: auto;
  scrollbar-width: thin;
  scrollbar-color: rgba(155, 155, 155, 0.3) transparent;
}

.mermaid-wrapper::-webkit-scrollbar {
  height: 8px;
}

.mermaid-wrapper::-webkit-scrollbar-track {
  background: transparent;
}

.mermaid-wrapper::-webkit-scrollbar-thumb {
  background-color: rgba(155, 155, 155, 0.3);
  border-radius: 4px;
}

.mermaid-wrapper::-webkit-scrollbar-thumb:hover {
  background-color: rgba(155, 155, 155, 0.5);
}
</style>
