 <template>
  <div class="code-block group" :class="{ 'in-tabs': inTabs }">
    <button
      @click="copyCode"
      class="copy-button"
      :class="{ copied: copied }"
      :title="copied ? 'Copied!' : 'Copy code'"
    >
      <template v-if="copied">
        <span class="copied-text">copied</span>
        <Icon name="lucide:check" class="w-4 h-4 ml-1" />
      </template>
      <Icon v-else name="lucide:copy" class="w-5 h-5" />
    </button>
    <pre><code :class="{ 'with-shell-prompt': isShell, 'with-line-numbers': showLineNumbers }"><slot /></code></pre>
  </div>
</template>

<script setup lang="ts">
import { inject, computed, ref } from 'vue'

const props = defineProps<{
  code?: string
  language?: string | null
  filename?: string | null
  highlights?: number[]
  meta?: string | null
}>()

const inTabs = inject('inTabs', false)
const copied = ref(false)
let copyTimeout: NodeJS.Timeout

const isShell = computed(() => {
  const lang = props.language?.toLowerCase() || ''
  return ['bash', 'sh', 'shell', 'zsh', 'fish', 'powershell', 'cmd'].includes(lang)
})

const showLineNumbers = computed(() => {
  const lang = props.language?.toLowerCase() || ''
  if (!lang || lang === 'text') return false
  return !isShell.value
})

const copyCode = async () => {
  const codeElement = document.querySelector('.code-block pre code')
  let code = props.code || codeElement?.textContent || ''
  
  // Clean up the code by removing line numbers and shell prompts
  if (code) {
    // Remove line numbers pattern (e.g., "1  ", "2  ", etc.)
    code = code.replace(/^\s*\d+\s+/gm, '')
    // Remove shell prompts (e.g., "$ ", "# ", "> ", etc.)
    code = code.replace(/^\s*[$#>]\s+/gm, '')
  }

  try {
    await navigator.clipboard.writeText(code.trim())
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
.code-block {
  margin: 1.5rem 0;
  background: rgb(249, 250, 251);
  border: 1px solid rgb(229, 231, 235);
  border-radius: 8px;
  padding: 0.25rem;
  overflow: hidden;
  position: relative;
}

.copy-button {
  position: absolute;
  top: 0.25rem;
  right: 0.25rem;
  padding: 0.375rem 0.5rem;
  background: rgba(249, 250, 251, 0.9);
  border: 1px solid rgba(229, 231, 235, 0.5);
  border-radius: 6px;
  cursor: pointer;
  opacity: 0;
  transition: all 0.2s ease;
  z-index: 10;
  color: rgb(107, 114, 128);
  display: flex;
  align-items: center;
  justify-content: center;
  transform: scale(1);
  backdrop-filter: blur(4px);
}

.dark .copy-button {
  background: rgba(48, 54, 61, 0.9);
  border-color: rgba(48, 54, 61, 0.8);
  color: rgb(156, 163, 175);
}

.group:hover .copy-button {
  opacity: 1;
}

.copy-button:hover {
  transform: scale(1);
}

.copy-button.copied {
  opacity: 1;
  color: rgb(34, 197, 94);
  background: rgba(220, 252, 231, 0.95);
  border-color: rgba(34, 197, 94, 0.3);
  transform: scale(1);
  animation: none;
}

.dark .copy-button.copied {
  color: rgb(34, 197, 94);
  background: rgba(20, 83, 45, 0.5);
  border-color: rgba(34, 197, 94, 0.5);
}

.copied-text {
  font-size: 12px;
  font-weight: 500;
  white-space: nowrap;
  animation: fadeInSlide 0.3s ease;
}

@keyframes fadeInSlide {
  0% {
    opacity: 0;
    transform: translateX(10px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes copySuccess {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.3);
  }
  100% {
    transform: scale(1.2);
  }
}

.dark .code-block {
  background: #0d1117;
  border-color: #30363d;
}

.code-block.in-tabs {
  margin: 0;
  background: transparent;
  border: none;
  border-radius: 0;
  padding: 0;
}

.code-block :deep(pre) {
  margin: 0 !important;
  padding: 0.25rem !important;
  background: transparent !important;
  border: none !important;
  box-shadow: none !important;
  overflow-x: auto;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
}

.code-block :deep(pre::-webkit-scrollbar) {
  display: none; /* Chrome, Safari, Opera */
}

.code-block :deep(code) {
  font-family: 'Menlo', 'Monaco', 'Consolas', 'Courier New', monospace;
  font-size: 14px;
  line-height: 1.5;
  background: transparent !important;
  border: none !important;
  box-shadow: none !important;
  padding: 0 !important;
}

/* Line numbers for programming languages */
.code-block :deep(.with-line-numbers .line) {
  counter-increment: line;
  padding-left: 2rem;
  position: relative;
  display: block;
  line-height: 1.5;
}

.code-block :deep(.with-line-numbers .line::before) {
  content: counter(line);
  position: absolute;
  left: 0;
  top: 0;
  width: 1.5rem;
  text-align: right;
  color: rgb(156, 163, 175);
  font-size: 14px;
  user-select: none;
  line-height: 1.5;
}

.dark .code-block :deep(.with-line-numbers .line::before) {
  color: rgb(107, 114, 128);
}

.code-block :deep(.with-line-numbers) {
  counter-reset: line;
}

/* Shell prompt for shell commands */
.code-block :deep(.with-shell-prompt .line) {
  padding-left: 2rem;
  position: relative;
  display: block;
}

.code-block :deep(.with-shell-prompt .line::before) {
  content: '$';
  position: absolute;
  left: 0;
  width: 1.5rem;
  text-align: right;
  color: rgb(156, 163, 175);
  font-weight: 600;
  user-select: none;
}

.dark .code-block :deep(.with-shell-prompt .line::before) {
  color: rgb(107, 114, 128);
}
</style>
