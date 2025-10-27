<template>
  <div class="code-block-wrapper group relative my-6">
    <!-- Language label and copy button -->
    <div class="absolute right-3 top-3 z-10 flex items-center gap-2">
      <span
        v-if="language && language !== 'text'"
        class="rounded bg-gray-700/80 px-2 py-1 text-xs font-medium text-gray-200 backdrop-blur-sm"
      >
        {{ language }}
      </span>
      <button
        @click="copyCode"
        class="rounded bg-gray-700/80 p-2 text-gray-200 opacity-0 backdrop-blur-sm transition-all hover:bg-gray-600/80 group-hover:opacity-100"
        :class="{ '!opacity-100': copied }"
        :title="copied ? 'Copied!' : 'Copy code'"
      >
        <Icon
          :name="copied ? 'heroicons:check' : 'heroicons:clipboard-document'"
          class="h-4 w-4"
        />
      </button>
    </div>

    <!-- Code block -->
    <pre
      class="!my-0 overflow-x-auto rounded-lg border border-gray-200/60 bg-gray-50 !p-4 dark:border-gray-700/50 dark:bg-[#1e1e1e]"
    ><slot /></pre>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  code?: string
  language?: string | null
  filename?: string | null
  highlights?: number[]
  meta?: string | null
}>()

const copied = ref(false)
let copyTimeout: NodeJS.Timeout

const copyCode = async () => {
  // Get the code content
  const codeElement = document.querySelector('.code-block-wrapper pre code')
  const code = props.code || codeElement?.textContent || ''

  try {
    await navigator.clipboard.writeText(code)
    copied.value = true
    clearTimeout(copyTimeout)
    copyTimeout = setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (err) {
    console.error('Failed to copy code:', err)
  }
}
</script>

<style scoped>
.code-block-wrapper :deep(pre) {
  scrollbar-width: thin;
  scrollbar-color: rgba(155, 155, 155, 0.3) transparent;
}

.code-block-wrapper :deep(pre::-webkit-scrollbar) {
  height: 8px;
}

.code-block-wrapper :deep(pre::-webkit-scrollbar-track) {
  background: transparent;
}

.code-block-wrapper :deep(pre::-webkit-scrollbar-thumb) {
  background-color: rgba(155, 155, 155, 0.3);
  border-radius: 4px;
}

.code-block-wrapper :deep(pre::-webkit-scrollbar-thumb:hover) {
  background-color: rgba(155, 155, 155, 0.5);
}
</style>
