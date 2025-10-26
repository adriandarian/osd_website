# Interactive Playground & Examples Strategy

## Overview

Comprehensive strategy for creating an interactive, educational, and community-driven playground ecosystem for OpenSeadragon. This includes migrating CodePen examples, building an interactive parameter playground, creating a community showcase, and providing multi-framework code examples.

## Architecture Overview

```
Playground Ecosystem
├── Interactive Playground
│   ├── Parameter Editor
│   ├── Live Preview
│   ├── Version Selector
│   └── Code Export
│
├── Example Gallery
│   ├── Split-Screen Viewer
│   ├── CodePen Migration
│   ├── Multi-Framework Support
│   └── Interactive Controls
│
├── Community Showcase
│   ├── User Submissions
│   ├── Iframe Embed Viewer
│   ├── Optional Code Sharing
│   └── Voting/Featured System
│
└── Shared Components
    ├── Monaco Editor
    ├── OpenSeadragon Renderer
    ├── Code Generator
    └── Framework Adapters
```

## 1. Interactive Parameter Playground

### Features

#### Real-Time Parameter Editor
```vue
<!-- pages/playground/index.vue -->
<template>
  <div class="playground">
    <PlaygroundHeader 
      v-model:version="selectedVersion"
      @share="handleShare"
      @reset="handleReset"
    />
    
    <div class="playground-layout">
      <!-- Left Panel: Parameter Editor -->
      <aside class="parameters-panel">
        <ParameterEditor
          v-model="viewerOptions"
          :schema="optionsSchema"
          :version="selectedVersion"
        />
      </aside>
      
      <!-- Center: Live Preview -->
      <main class="preview-panel">
        <OSDViewer
          :options="viewerOptions"
          :version="selectedVersion"
          @initialized="handleViewerInit"
        />
        
        <PreviewControls
          :viewer="viewer"
          @reset="resetView"
          @screenshot="takeScreenshot"
        />
      </main>
      
      <!-- Right Panel: Generated Code -->
      <aside class="code-panel">
        <CodeTabs
          :code="generatedCode"
          :frameworks="availableFrameworks"
          v-model:selectedFramework="selectedFramework"
        />
        
        <CodeActions
          @copy="copyCode"
          @download="downloadCode"
          @export="exportToCodeSandbox"
        />
      </aside>
    </div>
  </div>
</template>

<script setup lang="ts">
const selectedVersion = ref('4.1.0')
const selectedFramework = ref<Framework>('vanilla')
const viewerOptions = ref<OpenSeadragonOptions>({
  id: 'viewer',
  prefixUrl: '/openseadragon/images/',
  tileSources: '/images/example.dzi',
  // ... default options
})

const viewer = ref<OpenSeadragon.Viewer | null>(null)

// Generate code for selected framework
const generatedCode = computed(() => {
  return generateCode(viewerOptions.value, selectedFramework.value, selectedVersion.value)
})

// Available frameworks
const availableFrameworks: Framework[] = [
  'vanilla',
  'vue',
  'react',
  'angular',
  'svelte',
  'solid',
  'remix',
]
</script>
```

#### Parameter Schema System

```typescript
// types/playground.ts
export interface ParameterSchema {
  categories: ParameterCategory[]
}

export interface ParameterCategory {
  id: string
  name: string
  description: string
  icon: string
  parameters: Parameter[]
}

export interface Parameter {
  key: string
  label: string
  description: string
  type: 'boolean' | 'number' | 'string' | 'select' | 'color' | 'object'
  default: any
  min?: number
  max?: number
  step?: number
  options?: Array<{ label: string; value: any }>
  version?: string // Version when added
  deprecated?: string // Version when deprecated
  advanced?: boolean
  conditional?: {
    key: string
    value: any
  }
}
```

```typescript
// data/viewer-options-schema.ts
export const viewerOptionsSchema: ParameterSchema = {
  categories: [
    {
      id: 'basic',
      name: 'Basic Options',
      description: 'Essential configuration for the viewer',
      icon: 'carbon:settings',
      parameters: [
        {
          key: 'id',
          label: 'Container ID',
          description: 'The ID of the HTML element to use for the viewer',
          type: 'string',
          default: 'viewer',
        },
        {
          key: 'prefixUrl',
          label: 'Prefix URL',
          description: 'Path to UI button images',
          type: 'string',
          default: '/openseadragon/images/',
        },
        {
          key: 'tileSources',
          label: 'Tile Sources',
          description: 'Image sources to display',
          type: 'string',
          default: '/images/example.dzi',
        },
      ],
    },
    {
      id: 'navigation',
      name: 'Navigation',
      description: 'Pan, zoom, and navigation controls',
      icon: 'carbon:arrows',
      parameters: [
        {
          key: 'showNavigationControl',
          label: 'Show Navigation Control',
          description: 'Display the navigation control widget',
          type: 'boolean',
          default: true,
        },
        {
          key: 'navigationControlAnchor',
          label: 'Navigation Anchor',
          description: 'Position of the navigation control',
          type: 'select',
          default: 'TOP_LEFT',
          options: [
            { label: 'Top Left', value: 'TOP_LEFT' },
            { label: 'Top Right', value: 'TOP_RIGHT' },
            { label: 'Bottom Left', value: 'BOTTOM_LEFT' },
            { label: 'Bottom Right', value: 'BOTTOM_RIGHT' },
          ],
        },
        {
          key: 'zoomPerClick',
          label: 'Zoom Per Click',
          description: 'Zoom factor when clicking zoom buttons',
          type: 'number',
          default: 2.0,
          min: 1.0,
          max: 5.0,
          step: 0.1,
        },
        {
          key: 'zoomPerScroll',
          label: 'Zoom Per Scroll',
          description: 'Zoom factor for each mouse scroll',
          type: 'number',
          default: 1.2,
          min: 1.0,
          max: 2.0,
          step: 0.05,
        },
        {
          key: 'animationTime',
          label: 'Animation Time',
          description: 'Duration of zoom/pan animations in seconds',
          type: 'number',
          default: 1.2,
          min: 0,
          max: 5,
          step: 0.1,
        },
      ],
    },
    {
      id: 'appearance',
      name: 'Appearance',
      description: 'Visual styling and display options',
      icon: 'carbon:paint-brush',
      parameters: [
        {
          key: 'showFullPageControl',
          label: 'Show Fullscreen Button',
          description: 'Display the fullscreen toggle button',
          type: 'boolean',
          default: true,
        },
        {
          key: 'showHomeControl',
          label: 'Show Home Button',
          description: 'Display the home/reset button',
          type: 'boolean',
          default: true,
        },
        {
          key: 'showZoomControl',
          label: 'Show Zoom Buttons',
          description: 'Display zoom in/out buttons',
          type: 'boolean',
          default: true,
        },
        {
          key: 'backgroundColor',
          label: 'Background Color',
          description: 'Viewer background color',
          type: 'color',
          default: '#000000',
          version: '4.0.0',
        },
        {
          key: 'opacity',
          label: 'Opacity',
          description: 'Image opacity (0-1)',
          type: 'number',
          default: 1,
          min: 0,
          max: 1,
          step: 0.1,
        },
      ],
    },
    {
      id: 'performance',
      name: 'Performance',
      description: 'Rendering and performance tuning',
      icon: 'carbon:dashboard',
      parameters: [
        {
          key: 'immediateRender',
          label: 'Immediate Render',
          description: 'Display lower quality tiles immediately',
          type: 'boolean',
          default: false,
        },
        {
          key: 'preload',
          label: 'Preload',
          description: 'Preload tiles adjacent to viewport',
          type: 'boolean',
          default: false,
        },
        {
          key: 'maxImageCacheCount',
          label: 'Max Image Cache Count',
          description: 'Maximum number of cached tiles',
          type: 'number',
          default: 200,
          min: 50,
          max: 1000,
          step: 50,
          advanced: true,
        },
        {
          key: 'timeout',
          label: 'Timeout',
          description: 'Tile load timeout in milliseconds',
          type: 'number',
          default: 30000,
          min: 5000,
          max: 60000,
          step: 5000,
          advanced: true,
        },
      ],
    },
    {
      id: 'gestures',
      name: 'Mouse & Touch',
      description: 'Mouse and touch gesture settings',
      icon: 'carbon:touch-1',
      parameters: [
        {
          key: 'gestureSettingsMouse.clickToZoom',
          label: 'Click to Zoom',
          description: 'Enable single-click to zoom',
          type: 'boolean',
          default: true,
        },
        {
          key: 'gestureSettingsMouse.dblClickToZoom',
          label: 'Double-Click to Zoom',
          description: 'Enable double-click to zoom',
          type: 'boolean',
          default: false,
        },
        {
          key: 'gestureSettingsTouch.pinchToZoom',
          label: 'Pinch to Zoom',
          description: 'Enable pinch gesture to zoom',
          type: 'boolean',
          default: true,
        },
        {
          key: 'gestureSettingsTouch.flickEnabled',
          label: 'Flick Enabled',
          description: 'Enable flick gesture for momentum panning',
          type: 'boolean',
          default: true,
        },
      ],
    },
    {
      id: 'advanced',
      name: 'Advanced',
      description: 'Advanced configuration options',
      icon: 'carbon:tools',
      parameters: [
        {
          key: 'debugMode',
          label: 'Debug Mode',
          description: 'Enable debug logging',
          type: 'boolean',
          default: false,
          advanced: true,
        },
        {
          key: 'crossOriginPolicy',
          label: 'Cross-Origin Policy',
          description: 'CORS policy for tile loading',
          type: 'select',
          default: false,
          options: [
            { label: 'None', value: false },
            { label: 'Anonymous', value: 'Anonymous' },
            { label: 'Use Credentials', value: 'use-credentials' },
          ],
          advanced: true,
        },
        {
          key: 'ajaxWithCredentials',
          label: 'AJAX with Credentials',
          description: 'Send cookies with tile requests',
          type: 'boolean',
          default: false,
          advanced: true,
        },
      ],
    },
  ],
}
```

#### Parameter Editor Component

```vue
<!-- components/playground/ParameterEditor.vue -->
<template>
  <div class="parameter-editor">
    <div class="editor-header">
      <h3>Configuration</h3>
      <div class="editor-controls">
        <button @click="showAdvanced = !showAdvanced">
          <Icon :name="showAdvanced ? 'carbon:view-off' : 'carbon:view'" />
          {{ showAdvanced ? 'Hide' : 'Show' }} Advanced
        </button>
        <button @click="emit('reset')">
          <Icon name="carbon:reset" />
          Reset
        </button>
      </div>
    </div>
    
    <div class="editor-search">
      <input
        v-model="searchQuery"
        type="search"
        placeholder="Search parameters..."
      >
    </div>
    
    <div class="editor-categories">
      <details
        v-for="category in filteredCategories"
        :key="category.id"
        :open="expandedCategories.includes(category.id)"
        @toggle="toggleCategory(category.id, $event)"
      >
        <summary>
          <Icon :name="category.icon" />
          <span>{{ category.name }}</span>
          <span class="param-count">{{ category.parameters.length }}</span>
        </summary>
        
        <div class="category-description">
          {{ category.description }}
        </div>
        
        <div class="parameters">
          <ParameterControl
            v-for="param in filterParameters(category.parameters)"
            :key="param.key"
            :parameter="param"
            :value="getNestedValue(modelValue, param.key)"
            @update="updateParameter(param.key, $event)"
          />
        </div>
      </details>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ParameterSchema, Parameter } from '~/types/playground'

const props = defineProps<{
  modelValue: Record<string, any>
  schema: ParameterSchema
  version: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: Record<string, any>]
  'reset': []
}>()

const showAdvanced = ref(false)
const searchQuery = ref('')
const expandedCategories = ref(['basic', 'navigation'])

const filteredCategories = computed(() => {
  if (!searchQuery.value) return props.schema.categories
  
  return props.schema.categories
    .map(category => ({
      ...category,
      parameters: category.parameters.filter(p =>
        p.label.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.value.toLowerCase())
      ),
    }))
    .filter(category => category.parameters.length > 0)
})

const filterParameters = (parameters: Parameter[]) => {
  return parameters.filter(param => {
    if (param.advanced && !showAdvanced.value) return false
    if (param.version && !isVersionSupported(param.version)) return false
    if (param.conditional) {
      const condValue = getNestedValue(props.modelValue, param.conditional.key)
      if (condValue !== param.conditional.value) return false
    }
    return true
  })
}

const updateParameter = (key: string, value: any) => {
  const updated = { ...props.modelValue }
  setNestedValue(updated, key, value)
  emit('update:modelValue', updated)
}

const getNestedValue = (obj: any, path: string) => {
  return path.split('.').reduce((acc, part) => acc?.[part], obj)
}

const setNestedValue = (obj: any, path: string, value: any) => {
  const parts = path.split('.')
  const last = parts.pop()!
  const target = parts.reduce((acc, part) => {
    if (!acc[part]) acc[part] = {}
    return acc[part]
  }, obj)
  target[last] = value
}
</script>
```

#### Version Selector

```vue
<!-- components/playground/VersionSelector.vue -->
<template>
  <div class="version-selector">
    <label for="version-select">OpenSeadragon Version:</label>
    <select
      id="version-select"
      :value="modelValue"
      @change="emit('update:modelValue', $event.target.value)"
    >
      <optgroup label="Latest">
        <option value="latest">Latest ({{ latestVersion }})</option>
      </optgroup>
      
      <optgroup label="Recent Versions">
        <option
          v-for="version in recentVersions"
          :key="version"
          :value="version"
        >
          v{{ version }}
        </option>
      </optgroup>
      
      <optgroup label="Older Versions">
        <option
          v-for="version in olderVersions"
          :key="version"
          :value="version"
        >
          v{{ version }}
        </option>
      </optgroup>
    </select>
    
    <div v-if="versionInfo" class="version-info">
      <Icon name="carbon:information" />
      <span>Released: {{ formatDate(versionInfo.releaseDate) }}</span>
      <NuxtLink :to="versionInfo.changelogUrl" target="_blank">
        Changelog
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

// Fetch available versions from CDN or GitHub API
const { data: versions } = await useFetch('/api/openseadragon/versions')

const latestVersion = computed(() => versions.value?.[0] || '4.1.0')
const recentVersions = computed(() => versions.value?.slice(1, 6) || [])
const olderVersions = computed(() => versions.value?.slice(6) || [])

const versionInfo = computed(() => {
  return versions.value?.find(v => v.version === props.modelValue)
})
</script>
```

## 2. Example Gallery with Split-Screen View

### CodePen Migration Strategy

```typescript
// scripts/migrate-codepen-examples.ts
import { writeFileSync } from 'fs'
import matter from 'gray-matter'

interface CodePenExample {
  id: string
  title: string
  description: string
  html: string
  css: string
  js: string
  tags: string[]
  difficulty: 'beginner' | 'intermediate' | 'advanced'
}

// List of CodePen examples to migrate
const codepenExamples: CodePenExample[] = [
  {
    id: 'basic-viewer',
    title: 'Basic Viewer',
    description: 'A simple OpenSeadragon viewer with default settings',
    html: `<div id="viewer" style="width: 100%; height: 600px;"></div>`,
    css: `body { margin: 0; padding: 0; }`,
    js: `
const viewer = OpenSeadragon({
  id: "viewer",
  prefixUrl: "https://openseadragon.github.io/openseadragon/images/",
  tileSources: {
    type: 'image',
    url: 'https://openseadragon.github.io/example-images/highsmith/highsmith.dzi'
  }
});
    `,
    tags: ['basic', 'getting-started'],
    difficulty: 'beginner',
  },
  // ... more examples
]

// Convert to content files
codepenExamples.forEach(example => {
  const frontMatter = {
    title: example.title,
    description: example.description,
    tags: example.tags,
    difficulty: example.difficulty,
    category: 'example',
    codepenId: example.id,
  }
  
  const content = `
## Overview

${example.description}

## Implementation

### HTML

\`\`\`html
${example.html}
\`\`\`

### CSS

\`\`\`css
${example.css}
\`\`\`

### JavaScript

\`\`\`javascript
${example.js}
\`\`\`

## Try It

::live-example
${JSON.stringify({ html: example.html, css: example.css, js: example.js })}
::
  `
  
  const markdown = matter.stringify(content, frontMatter)
  writeFileSync(`content/examples/${example.id}.md`, markdown)
})
```

### Split-Screen Example Viewer

```vue
<!-- components/examples/ExampleViewer.vue -->
<template>
  <div class="example-viewer" :class="{ fullscreen: isFullscreen }">
    <div class="example-header">
      <h2>{{ example.title }}</h2>
      <div class="example-controls">
        <button
          v-for="framework in frameworks"
          :key="framework"
          :class="{ active: selectedFramework === framework }"
          @click="selectedFramework = framework"
        >
          <Icon :name="frameworkIcons[framework]" />
          {{ framework }}
        </button>
        
        <div class="divider"></div>
        
        <button @click="toggleLayout">
          <Icon :name="layoutIcon" />
          {{ layoutLabel }}
        </button>
        
        <button @click="toggleFullscreen">
          <Icon :name="isFullscreen ? 'carbon:minimize' : 'carbon:maximize'" />
          {{ isFullscreen ? 'Exit' : 'Fullscreen' }}
        </button>
        
        <button @click="copyCode">
          <Icon name="carbon:copy" />
          Copy
        </button>
        
        <button @click="exportToCodeSandbox">
          <Icon name="carbon:export" />
          Export
        </button>
      </div>
    </div>
    
    <div class="example-content" :class="`layout-${layout}`">
      <!-- Code Panel -->
      <div class="code-panel" v-show="layout !== 'preview-only'">
        <div class="code-tabs">
          <button
            v-for="file in codeFiles"
            :key="file.name"
            :class="{ active: activeFile === file.name }"
            @click="activeFile = file.name"
          >
            {{ file.name }}
          </button>
        </div>
        
        <div class="code-editor">
          <MonacoEditor
            v-model="currentFileCode"
            :language="currentFileLanguage"
            :readonly="!editable"
            @change="handleCodeChange"
          />
        </div>
      </div>
      
      <!-- Preview Panel -->
      <div class="preview-panel" v-show="layout !== 'code-only'">
        <div class="preview-toolbar">
          <button @click="refreshPreview">
            <Icon name="carbon:restart" />
            Refresh
          </button>
          
          <button @click="openInNewTab">
            <Icon name="carbon:launch" />
            Open in New Tab
          </button>
        </div>
        
        <div class="preview-container">
          <ExamplePreview
            :html="generatedHTML"
            :css="generatedCSS"
            :js="generatedJS"
            :framework="selectedFramework"
            @error="handlePreviewError"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Framework, LayoutMode } from '~/types/playground'

const props = defineProps<{
  example: Example
  editable?: boolean
}>()

const selectedFramework = ref<Framework>('vanilla')
const layout = ref<LayoutMode>('split')
const isFullscreen = ref(false)
const activeFile = ref('index.js')

const frameworks: Framework[] = [
  'vanilla',
  'vue',
  'react',
  'angular',
  'svelte',
  'solid',
  'remix',
]

const frameworkIcons: Record<Framework, string> = {
  vanilla: 'carbon:code',
  vue: 'logos:vue',
  react: 'logos:react',
  angular: 'logos:angular',
  svelte: 'logos:svelte',
  solid: 'logos:solidjs',
  remix: 'logos:remix',
}

// Generate code for selected framework
const codeFiles = computed(() => {
  return generateFrameworkCode(
    props.example,
    selectedFramework.value
  )
})

const currentFileCode = computed({
  get: () => codeFiles.value.find(f => f.name === activeFile.value)?.content || '',
  set: (value) => {
    const file = codeFiles.value.find(f => f.name === activeFile.value)
    if (file) file.content = value
  },
})

const layoutIcon = computed(() => {
  switch (layout.value) {
    case 'split': return 'carbon:split-screen'
    case 'code-only': return 'carbon:code'
    case 'preview-only': return 'carbon:screen'
  }
})

const toggleLayout = () => {
  const layouts: LayoutMode[] = ['split', 'code-only', 'preview-only']
  const current = layouts.indexOf(layout.value)
  layout.value = layouts[(current + 1) % layouts.length]
}
</script>

<style scoped>
.example-viewer {
  display: flex;
  flex-direction: column;
  height: 100%;
  border: 1px solid var(--border-color);
  border-radius: 0.5rem;
  overflow: hidden;
}

.example-content {
  display: flex;
  flex: 1;
  overflow: hidden;
}

.example-content.layout-split {
  flex-direction: row;
}

.example-content.layout-split .code-panel,
.example-content.layout-split .preview-panel {
  flex: 1;
}

.code-panel {
  display: flex;
  flex-direction: column;
  border-right: 1px solid var(--border-color);
}

.preview-panel {
  display: flex;
  flex-direction: column;
  background: #fff;
}

@media (max-width: 768px) {
  .example-content.layout-split {
    flex-direction: column;
  }
  
  .code-panel {
    border-right: none;
    border-bottom: 1px solid var(--border-color);
  }
}
</style>
```

### Multi-Framework Code Generator

```typescript
// utils/code-generator.ts
import type { Framework } from '~/types/playground'

export interface CodeFile {
  name: string
  content: string
  language: string
}

export function generateFrameworkCode(
  example: Example,
  framework: Framework
): CodeFile[] {
  const generators: Record<Framework, () => CodeFile[]> = {
    vanilla: () => generateVanillaJS(example),
    vue: () => generateVue(example),
    react: () => generateReact(example),
    angular: () => generateAngular(example),
    svelte: () => generateSvelte(example),
    solid: () => generateSolid(example),
    remix: () => generateRemix(example),
  }
  
  return generators[framework]()
}

// Vanilla JavaScript
function generateVanillaJS(example: Example): CodeFile[] {
  return [
    {
      name: 'index.html',
      language: 'html',
      content: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${example.title}</title>
  <style>
    ${example.css}
  </style>
</head>
<body>
  ${example.html}
  
  <script src="https://cdn.jsdelivr.net/npm/openseadragon@4.1/build/openseadragon/openseadragon.min.js"></script>
  <script src="index.js"></script>
</body>
</html>`,
    },
    {
      name: 'index.js',
      language: 'javascript',
      content: example.js,
    },
    {
      name: 'styles.css',
      language: 'css',
      content: example.css,
    },
  ]
}

// Vue 3
function generateVue(example: Example): CodeFile[] {
  const options = extractOptions(example.js)
  
  return [
    {
      name: 'App.vue',
      language: 'vue',
      content: `<template>
  <div class="viewer-container">
    <div ref="viewerRef" class="openseadragon-viewer"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import OpenSeadragon from 'openseadragon'

const viewerRef = ref<HTMLElement>()
let viewer: OpenSeadragon.Viewer | null = null

onMounted(() => {
  if (!viewerRef.value) return
  
  viewer = OpenSeadragon({
    element: viewerRef.value,
    ${formatOptions(options, 4)}
  })
})

onUnmounted(() => {
  viewer?.destroy()
})
</script>

<style scoped>
${example.css}
</style>`,
    },
    {
      name: 'package.json',
      language: 'json',
      content: JSON.stringify({
        name: example.id,
        version: '1.0.0',
        dependencies: {
          vue: '^3.3.0',
          openseadragon: '^4.1.0',
        },
      }, null, 2),
    },
  ]
}

// React
function generateReact(example: Example): CodeFile[] {
  const options = extractOptions(example.js)
  
  return [
    {
      name: 'App.tsx',
      language: 'typescript',
      content: `import { useEffect, useRef } from 'react'
import OpenSeadragon from 'openseadragon'
import './styles.css'

export default function App() {
  const viewerRef = useRef<HTMLDivElement>(null)
  const osdRef = useRef<OpenSeadragon.Viewer | null>(null)
  
  useEffect(() => {
    if (!viewerRef.current || osdRef.current) return
    
    osdRef.current = OpenSeadragon({
      element: viewerRef.current,
      ${formatOptions(options, 6)}
    })
    
    return () => {
      osdRef.current?.destroy()
      osdRef.current = null
    }
  }, [])
  
  return (
    <div className="viewer-container">
      <div ref={viewerRef} className="openseadragon-viewer" />
    </div>
  )
}`,
    },
    {
      name: 'styles.css',
      language: 'css',
      content: example.css,
    },
    {
      name: 'package.json',
      language: 'json',
      content: JSON.stringify({
        name: example.id,
        version: '1.0.0',
        dependencies: {
          react: '^18.2.0',
          'react-dom': '^18.2.0',
          openseadragon: '^4.1.0',
        },
        devDependencies: {
          '@types/react': '^18.2.0',
          '@types/openseadragon': '^3.0.0',
          typescript: '^5.0.0',
        },
      }, null, 2),
    },
  ]
}

// Angular
function generateAngular(example: Example): CodeFile[] {
  const options = extractOptions(example.js)
  
  return [
    {
      name: 'viewer.component.ts',
      language: 'typescript',
      content: `import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core'
import OpenSeadragon from 'openseadragon'

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.css']
})
export class ViewerComponent implements OnInit, OnDestroy {
  @ViewChild('viewerContainer', { static: true }) viewerContainer!: ElementRef
  
  private viewer?: OpenSeadragon.Viewer
  
  ngOnInit(): void {
    this.viewer = OpenSeadragon({
      element: this.viewerContainer.nativeElement,
      ${formatOptions(options, 6)}
    })
  }
  
  ngOnDestroy(): void {
    this.viewer?.destroy()
  }
}`,
    },
    {
      name: 'viewer.component.html',
      language: 'html',
      content: `<div class="viewer-container">
  <div #viewerContainer class="openseadragon-viewer"></div>
</div>`,
    },
    {
      name: 'viewer.component.css',
      language: 'css',
      content: example.css,
    },
  ]
}

// Svelte
function generateSvelte(example: Example): CodeFile[] {
  const options = extractOptions(example.js)
  
  return [
    {
      name: 'App.svelte',
      language: 'svelte',
      content: `<script lang="ts">
  import { onMount, onDestroy } from 'svelte'
  import OpenSeadragon from 'openseadragon'
  
  let viewerElement: HTMLDivElement
  let viewer: OpenSeadragon.Viewer | null = null
  
  onMount(() => {
    viewer = OpenSeadragon({
      element: viewerElement,
      ${formatOptions(options, 6)}
    })
  })
  
  onDestroy(() => {
    viewer?.destroy()
  })
</script>

<div class="viewer-container">
  <div bind:this={viewerElement} class="openseadragon-viewer"></div>
</div>

<style>
${example.css}
</style>`,
    },
  ]
}

// Solid.js
function generateSolid(example: Example): CodeFile[] {
  const options = extractOptions(example.js)
  
  return [
    {
      name: 'App.tsx',
      language: 'typescript',
      content: `import { onMount, onCleanup } from 'solid-js'
import OpenSeadragon from 'openseadragon'
import './styles.css'

export default function App() {
  let viewerRef: HTMLDivElement | undefined
  let viewer: OpenSeadragon.Viewer | null = null
  
  onMount(() => {
    if (!viewerRef) return
    
    viewer = OpenSeadragon({
      element: viewerRef,
      ${formatOptions(options, 6)}
    })
  })
  
  onCleanup(() => {
    viewer?.destroy()
  })
  
  return (
    <div class="viewer-container">
      <div ref={viewerRef} class="openseadragon-viewer" />
    </div>
  )
}`,
    },
    {
      name: 'styles.css',
      language: 'css',
      content: example.css,
    },
  ]
}

// Remix
function generateRemix(example: Example): CodeFile[] {
  const options = extractOptions(example.js)
  
  return [
    {
      name: 'routes/viewer.tsx',
      language: 'typescript',
      content: `import { useEffect, useRef } from 'react'
import type { MetaFunction } from '@remix-run/node'
import OpenSeadragon from 'openseadragon'
import styles from './viewer.css'

export const meta: MetaFunction = () => {
  return [
    { title: "${example.title}" },
    { name: "description", content: "${example.description}" },
  ]
}

export function links() {
  return [{ rel: "stylesheet", href: styles }]
}

export default function Viewer() {
  const viewerRef = useRef<HTMLDivElement>(null)
  const osdRef = useRef<OpenSeadragon.Viewer | null>(null)
  
  useEffect(() => {
    if (!viewerRef.current || osdRef.current) return
    
    osdRef.current = OpenSeadragon({
      element: viewerRef.current,
      ${formatOptions(options, 6)}
    })
    
    return () => {
      osdRef.current?.destroy()
      osdRef.current = null
    }
  }, [])
  
  return (
    <div className="viewer-container">
      <div ref={viewerRef} className="openseadragon-viewer" />
    </div>
  )
}`,
    },
    {
      name: 'routes/viewer.css',
      language: 'css',
      content: example.css,
    },
  ]
}

// Helper functions
function extractOptions(js: string): Record<string, any> {
  // Parse JavaScript code to extract OpenSeadragon options
  // This is a simplified version
  const match = js.match(/OpenSeadragon\(\{([^}]+)\}\)/)
  if (!match) return {}
  
  try {
    return eval(`({${match[1]}})`)
  } catch {
    return {}
  }
}

function formatOptions(options: Record<string, any>, indent: number): string {
  const spaces = ' '.repeat(indent)
  return Object.entries(options)
    .map(([key, value]) => {
      const formattedValue = typeof value === 'string' 
        ? `'${value}'` 
        : JSON.stringify(value)
      return `${spaces}${key}: ${formattedValue},`
    })
    .join('\n')
}
```

## 3. Community Showcase

### Submission System

```vue
<!-- pages/showcase/submit.vue -->
<template>
  <div class="showcase-submit">
    <h1>Submit Your Project</h1>
    <p>Share your OpenSeadragon project with the community!</p>
    
    <form @submit.prevent="handleSubmit">
      <!-- Basic Info -->
      <section class="form-section">
        <h2>Project Information</h2>
        
        <div class="form-group">
          <label for="title">Project Title *</label>
          <input
            id="title"
            v-model="form.title"
            type="text"
            required
            maxlength="100"
          >
        </div>
        
        <div class="form-group">
          <label for="description">Description *</label>
          <textarea
            id="description"
            v-model="form.description"
            required
            maxlength="500"
            rows="4"
          ></textarea>
          <span class="char-count">
            {{ form.description.length }} / 500
          </span>
        </div>
        
        <div class="form-group">
          <label for="url">Live Demo URL *</label>
          <input
            id="url"
            v-model="form.url"
            type="url"
            required
            placeholder="https://example.com/demo"
          >
          <small>URL where people can view your project</small>
        </div>
        
        <div class="form-group">
          <label for="image">Screenshot/Thumbnail</label>
          <input
            id="image"
            type="file"
            accept="image/*"
            @change="handleImageUpload"
          >
          <div v-if="imagePreview" class="image-preview">
            <img :src="imagePreview" alt="Preview">
            <button type="button" @click="removeImage">Remove</button>
          </div>
        </div>
      </section>
      
      <!-- Categories & Tags -->
      <section class="form-section">
        <h2>Categories</h2>
        
        <div class="form-group">
          <label>Project Type *</label>
          <div class="checkbox-group">
            <label v-for="type in projectTypes" :key="type">
              <input
                v-model="form.types"
                type="checkbox"
                :value="type"
              >
              {{ type }}
            </label>
          </div>
        </div>
        
        <div class="form-group">
          <label for="tags">Tags</label>
          <input
            id="tags"
            v-model="tagsInput"
            type="text"
            placeholder="medical, IIIF, 3D, manuscript..."
            @keydown.enter.prevent="addTag"
          >
          <div class="tags">
            <span v-for="tag in form.tags" :key="tag" class="tag">
              {{ tag }}
              <button type="button" @click="removeTag(tag)">×</button>
            </span>
          </div>
        </div>
      </section>
      
      <!-- Code Sharing -->
      <section class="form-section">
        <h2>Code Sharing (Optional)</h2>
        
        <div class="form-group">
          <label>
            <input
              v-model="form.shareCode"
              type="checkbox"
            >
            I want to share my code
          </label>
        </div>
        
        <div v-if="form.shareCode" class="code-sharing">
          <div class="form-group">
            <label for="github">GitHub Repository</label>
            <input
              id="github"
              v-model="form.githubUrl"
              type="url"
              placeholder="https://github.com/user/repo"
            >
          </div>
          
          <div class="form-group">
            <label for="license">License</label>
            <select id="license" v-model="form.license">
              <option value="">Select a license</option>
              <option value="MIT">MIT</option>
              <option value="Apache-2.0">Apache 2.0</option>
              <option value="GPL-3.0">GPL 3.0</option>
              <option value="BSD-3-Clause">BSD 3-Clause</option>
              <option value="Proprietary">Proprietary/Closed Source</option>
            </select>
          </div>
        </div>
      </section>
      
      <!-- Author Info -->
      <section class="form-section">
        <h2>Author Information</h2>
        
        <div class="form-group">
          <label for="author">Name/Username *</label>
          <input
            id="author"
            v-model="form.author"
            type="text"
            required
          >
        </div>
        
        <div class="form-group">
          <label for="authorUrl">Website/Portfolio</label>
          <input
            id="authorUrl"
            v-model="form.authorUrl"
            type="url"
            placeholder="https://..."
          >
        </div>
        
        <div class="form-group">
          <label for="email">Email *</label>
          <input
            id="email"
            v-model="form.email"
            type="email"
            required
          >
          <small>Will not be displayed publicly</small>
        </div>
      </section>
      
      <!-- Submission -->
      <div class="form-actions">
        <button
          type="submit"
          :disabled="submitting"
          class="btn-primary"
        >
          {{ submitting ? 'Submitting...' : 'Submit Project' }}
        </button>
        
        <p class="terms">
          By submitting, you agree that your project will be reviewed
          before being published to the showcase.
        </p>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
const form = reactive({
  title: '',
  description: '',
  url: '',
  image: null as File | null,
  types: [] as string[],
  tags: [] as string[],
  shareCode: false,
  githubUrl: '',
  license: '',
  author: '',
  authorUrl: '',
  email: '',
})

const projectTypes = [
  'Digital Humanities',
  'Medical Imaging',
  'Maps & GIS',
  'Museum/Gallery',
  'Education',
  'Research',
  'Commercial',
  'Other',
]

const submitting = ref(false)
const imagePreview = ref<string | null>(null)
const tagsInput = ref('')

const handleImageUpload = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (file) {
    form.image = file
    const reader = new FileReader()
    reader.onload = (e) => {
      imagePreview.value = e.target?.result as string
    }
    reader.readAsDataURL(file)
  }
}

const handleSubmit = async () => {
  submitting.value = true
  
  try {
    // Create GitHub issue with submission
    await $fetch('/api/showcase/submit', {
      method: 'POST',
      body: form,
    })
    
    // Show success message
    navigateTo('/showcase/submitted')
  } catch (error) {
    console.error('Submission error:', error)
    alert('Failed to submit. Please try again.')
  } finally {
    submitting.value = false
  }
}
</script>
```

### Showcase Gallery

```vue
<!-- pages/showcase/index.vue -->
<template>
  <div class="showcase">
    <div class="showcase-header">
      <h1>Community Showcase</h1>
      <p>Discover amazing projects built with OpenSeadragon</p>
      
      <NuxtLink to="/showcase/submit" class="btn-primary">
        <Icon name="carbon:add" />
        Submit Your Project
      </NuxtLink>
    </div>
    
    <div class="showcase-filters">
      <div class="filter-group">
        <label>Filter by type:</label>
        <select v-model="selectedType">
          <option value="">All Types</option>
          <option v-for="type in types" :key="type" :value="type">
            {{ type }}
          </option>
        </select>
      </div>
      
      <div class="filter-group">
        <label>Sort by:</label>
        <select v-model="sortBy">
          <option value="recent">Most Recent</option>
          <option value="popular">Most Popular</option>
          <option value="featured">Featured</option>
        </select>
      </div>
      
      <div class="filter-group">
        <label>
          <input v-model="codeOnly" type="checkbox">
          Show only projects with code
        </label>
      </div>
    </div>
    
    <div class="showcase-grid">
      <ShowcaseCard
        v-for="project in filteredProjects"
        :key="project.id"
        :project="project"
        @vote="handleVote"
      />
    </div>
    
    <div v-if="hasMore" class="load-more">
      <button @click="loadMore" :disabled="loading">
        {{ loading ? 'Loading...' : 'Load More' }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const selectedType = ref('')
const sortBy = ref('recent')
const codeOnly = ref(false)

const { data: projects } = await useFetch('/api/showcase/projects')

const filteredProjects = computed(() => {
  let filtered = projects.value || []
  
  if (selectedType.value) {
    filtered = filtered.filter(p => p.types.includes(selectedType.value))
  }
  
  if (codeOnly.value) {
    filtered = filtered.filter(p => p.shareCode)
  }
  
  // Sort
  switch (sortBy.value) {
    case 'popular':
      filtered.sort((a, b) => b.votes - a.votes)
      break
    case 'featured':
      filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
      break
    case 'recent':
    default:
      filtered.sort((a, b) => 
        new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
      )
  }
  
  return filtered
})
</script>
```

### Showcase Card with Embedded Preview

```vue
<!-- components/showcase/ShowcaseCard.vue -->
<template>
  <article class="showcase-card">
    <div class="card-header">
      <span v-if="project.featured" class="badge featured">
        <Icon name="carbon:star-filled" />
        Featured
      </span>
      <span v-if="project.shareCode" class="badge code-available">
        <Icon name="carbon:code" />
        Code Available
      </span>
    </div>
    
    <div class="card-preview">
      <button
        class="preview-overlay"
        @click="showPreview = true"
        :aria-label="`View ${project.title} demo`"
      >
        <Icon name="carbon:play-filled" />
        <span>View Demo</span>
      </button>
      
      <img
        :src="project.thumbnail"
        :alt="project.title"
        loading="lazy"
      >
    </div>
    
    <div class="card-content">
      <h3>{{ project.title }}</h3>
      <p>{{ project.description }}</p>
      
      <div class="card-meta">
        <div class="types">
          <span v-for="type in project.types" :key="type" class="type-badge">
            {{ type }}
          </span>
        </div>
        
        <div class="tags">
          <span v-for="tag in project.tags" :key="tag" class="tag">
            #{{ tag }}
          </span>
        </div>
      </div>
      
      <div class="card-footer">
        <div class="author">
          <Icon name="carbon:user" />
          <span>{{ project.author }}</span>
          <a
            v-if="project.authorUrl"
            :href="project.authorUrl"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon name="carbon:link" />
          </a>
        </div>
        
        <div class="actions">
          <button
            class="vote-button"
            :class="{ voted: hasVoted }"
            @click="$emit('vote', project.id)"
          >
            <Icon name="carbon:thumbs-up" />
            {{ project.votes }}
          </button>
          
          <a
            v-if="project.shareCode && project.githubUrl"
            :href="project.githubUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="github-link"
          >
            <Icon name="carbon:logo-github" />
            View Code
          </a>
        </div>
      </div>
    </div>
    
    <!-- Preview Modal -->
    <Teleport to="body">
      <dialog
        v-if="showPreview"
        open
        class="preview-modal"
        @click.self="showPreview = false"
      >
        <div class="modal-content">
          <div class="modal-header">
            <h2>{{ project.title }}</h2>
            <button
              @click="showPreview = false"
              aria-label="Close preview"
            >
              <Icon name="carbon:close" />
            </button>
          </div>
          
          <div class="modal-body">
            <iframe
              :src="project.url"
              :title="`${project.title} demo`"
              sandbox="allow-scripts allow-same-origin allow-forms"
              loading="lazy"
            ></iframe>
          </div>
          
          <div class="modal-footer">
            <a
              :href="project.url"
              target="_blank"
              rel="noopener noreferrer"
              class="btn-secondary"
            >
              <Icon name="carbon:launch" />
              Open in New Tab
            </a>
            
            <a
              v-if="project.shareCode && project.githubUrl"
              :href="project.githubUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="btn-secondary"
            >
              <Icon name="carbon:logo-github" />
              View Source
            </a>
          </div>
        </div>
      </dialog>
    </Teleport>
  </article>
</template>

<script setup lang="ts">
const props = defineProps<{
  project: ShowcaseProject
}>()

const emit = defineEmits<{
  vote: [projectId: string]
}>()

const showPreview = ref(false)
const hasVoted = ref(false)

// Check if user has voted (from localStorage)
onMounted(() => {
  const votes = JSON.parse(localStorage.getItem('showcase-votes') || '[]')
  hasVoted.value = votes.includes(props.project.id)
})
</script>

<style scoped>
.showcase-card {
  border: 1px solid var(--border-color);
  border-radius: 0.5rem;
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;
}

.showcase-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.card-preview {
  position: relative;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  background: #f5f5f5;
}

.preview-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  opacity: 0;
  transition: opacity 0.2s;
  cursor: pointer;
}

.card-preview:hover .preview-overlay {
  opacity: 1;
}

.preview-modal {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.8);
  z-index: 1000;
}

.preview-modal iframe {
  width: 100%;
  height: 70vh;
  border: none;
}
</style>
```

## 4. Supporting Infrastructure

### API Endpoints

```typescript
// server/api/showcase/submit.post.ts
export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  
  // Validate submission
  const validated = await validateShowcaseSubmission(body)
  
  // Create GitHub issue for review
  const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN })
  
  const issue = await octokit.issues.create({
    owner: 'openseadragon',
    repo: 'website',
    title: `[Showcase] ${validated.title}`,
    body: `
## Project Submission

**Title:** ${validated.title}
**Author:** ${validated.author}
**URL:** ${validated.url}

**Description:**
${validated.description}

**Types:** ${validated.types.join(', ')}
**Tags:** ${validated.tags.join(', ')}

**Share Code:** ${validated.shareCode ? 'Yes' : 'No'}
${validated.githubUrl ? `**GitHub:** ${validated.githubUrl}` : ''}

**Contact:** ${validated.email}

---
This submission will be reviewed before being added to the showcase.
    `,
    labels: ['showcase-submission'],
  })
  
  return { success: true, issueNumber: issue.data.number }
})
```

### Database Schema

```typescript
// types/showcase.ts
export interface ShowcaseProject {
  id: string
  title: string
  description: string
  url: string
  thumbnail: string
  types: string[]
  tags: string[]
  shareCode: boolean
  githubUrl?: string
  license?: string
  author: string
  authorUrl?: string
  email: string // Private
  votes: number
  featured: boolean
  approved: boolean
  submittedAt: string
  approvedAt?: string
}
```

## Implementation Timeline

### Phase 1: Core Playground (Weeks 1-2)
- [ ] Set up Monaco Editor integration
- [ ] Build parameter editor component
- [ ] Implement live preview renderer
- [ ] Add version selector
- [ ] Create basic code generator (vanilla JS)

### Phase 2: Multi-Framework Support (Weeks 3-4)
- [ ] Implement Vue code generator
- [ ] Implement React code generator
- [ ] Implement Angular code generator
- [ ] Implement Svelte code generator
- [ ] Implement Solid code generator
- [ ] Implement Remix code generator
- [ ] Add export to CodeSandbox/StackBlitz

### Phase 3: Example Gallery (Weeks 5-6)
- [ ] Migrate CodePen examples
- [ ] Build split-screen viewer
- [ ] Add framework toggle for examples
- [ ] Implement example search/filter
- [ ] Add example categories

### Phase 4: Community Showcase (Weeks 7-8)
- [ ] Create submission form
- [ ] Build approval workflow
- [ ] Implement voting system
- [ ] Add iframe preview modal
- [ ] Create showcase gallery
- [ ] Add moderation tools

### Phase 5: Polish & Launch (Week 9)
- [ ] Performance optimization
- [ ] Mobile responsiveness
- [ ] Accessibility testing
- [ ] Documentation
- [ ] Announcement and launch

## Success Metrics

- **Playground Usage**: 1000+ unique sessions/month
- **Code Copies**: 500+ code copies/month
- **Framework Diversity**: 20%+ non-vanilla exports
- **Example Engagement**: 5+ minutes avg. time on examples
- **Community Submissions**: 10+ showcase projects/month
- **Code Sharing**: 50%+ showcase projects share code
- **User Satisfaction**: > 4.5/5 rating

## Future Enhancements

- **Live Collaboration**: Share playground sessions with others
- **Saved Playgrounds**: User accounts to save configurations
- **Plugin Marketplace Integration**: Test plugins in playground
- **Performance Benchmarking**: Compare settings performance
- **AI Code Assistant**: Suggest optimal configurations
- **Video Tutorials**: Embedded video guides
- **Challenge Mode**: Coding challenges with OpenSeadragon
