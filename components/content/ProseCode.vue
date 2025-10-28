<template>
  <div class="code-block-wrapper group relative my-5">
    <!-- Language label and copy button -->
    <div class="absolute right-2.5 top-2.5 z-10 flex items-center gap-1.5">
      <span
        v-if="language && language !== 'text'"
        class="rounded bg-gray-800/70 px-2 py-0.5 text-[10px] font-medium text-gray-300 backdrop-blur-sm"
      >
        {{ language }}
      </span>
      <button
        @click="copyCode"
        class="rounded bg-gray-800/70 p-1.5 text-gray-300 opacity-0 backdrop-blur-sm transition-all hover:bg-gray-700/80 group-hover:opacity-100"
        :class="{ '!opacity-100': copied }"
        :title="copied ? 'Copied!' : 'Copy code'"
      >
        <Icon
          :name="copied ? 'heroicons:check' : 'heroicons:clipboard-document'"
          class="h-3.5 w-3.5"
        />
      </button>
    </div>

    <!-- Code block -->
    <pre
      class="!my-0 overflow-x-auto rounded-md border border-gray-200/50 bg-gray-50/50 !px-4 !py-3 dark:border-gray-800/50 dark:bg-[#1a1a1a]"
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
