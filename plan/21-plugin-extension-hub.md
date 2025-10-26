# Plugin & Extension Hub

## Overview

A comprehensive plugin/extension marketplace and showcase for OpenSeadragon, featuring interactive previews, version compatibility tracking, ratings, and a seamless testing experience before installation.

## Goals

1. **Discovery** - Make it easy to find plugins that solve specific needs
2. **Trust** - Show compatibility, maintenance status, and community ratings
3. **Testing** - Allow users to try plugins instantly before committing
4. **Integration** - Seamless installation with package managers and CDN links
5. **Community** - Enable plugin authors to showcase their work

## Plugin Hub Features

### 1. Plugin Directory & Search

```vue
<!-- pages/plugins/index.vue -->
<template>
  <div class="plugins-page">
    <div class="plugins-hero">
      <h1>Plugin & Extension Hub</h1>
      <p>Extend OpenSeadragon with powerful community plugins</p>
      
      <div class="hero-search">
        <SearchBox
          v-model="searchQuery"
          placeholder="Search plugins by name, category, or functionality..."
          @search="handleSearch"
        />
      </div>
      
      <div class="hero-stats">
        <div class="stat">
          <span class="stat-value">{{ totalPlugins }}</span>
          <span class="stat-label">Plugins Available</span>
        </div>
        <div class="stat">
          <span class="stat-value">{{ totalDownloads }}</span>
          <span class="stat-label">Total Downloads</span>
        </div>
        <div class="stat">
          <span class="stat-value">{{ activeAuthors }}</span>
          <span class="stat-label">Active Authors</span>
        </div>
      </div>
    </div>
    
    <div class="plugins-container">
      <!-- Filters Sidebar -->
      <aside class="plugins-sidebar">
        <div class="filter-section">
          <h3>Categories</h3>
          <div class="filter-group">
            <label
              v-for="category in categories"
              :key="category.id"
              class="filter-checkbox"
            >
              <input
                v-model="selectedCategories"
                type="checkbox"
                :value="category.id"
              >
              <span>{{ category.name }}</span>
              <span class="count">{{ category.count }}</span>
            </label>
          </div>
        </div>
        
        <div class="filter-section">
          <h3>OpenSeadragon Version</h3>
          <select v-model="selectedVersion" class="version-select">
            <option value="">All Versions</option>
            <option v-for="version in osdVersions" :key="version" :value="version">
              v{{ version }}
            </option>
          </select>
        </div>
        
        <div class="filter-section">
          <h3>Maintenance Status</h3>
          <div class="filter-group">
            <label class="filter-checkbox">
              <input v-model="activelyMaintained" type="checkbox">
              <span>Actively Maintained</span>
              <Tooltip>
                <template #trigger>
                  <Icon name="carbon:information" />
                </template>
                <template #content>
                  Updated within the last 6 months
                </template>
              </Tooltip>
            </label>
            <label class="filter-checkbox">
              <input v-model="officialPlugins" type="checkbox">
              <span>Official Plugins</span>
            </label>
          </div>
        </div>
        
        <div class="filter-section">
          <h3>Sort By</h3>
          <select v-model="sortBy" class="sort-select">
            <option value="popular">Most Popular</option>
            <option value="recent">Recently Updated</option>
            <option value="rating">Highest Rated</option>
            <option value="name">Name (A-Z)</option>
            <option value="downloads">Most Downloads</option>
          </select>
        </div>
        
        <button @click="resetFilters" class="reset-button">
          <Icon name="carbon:reset" />
          Reset Filters
        </button>
      </aside>
      
      <!-- Plugin Grid -->
      <main class="plugins-main">
        <div class="plugins-toolbar">
          <div class="results-info">
            {{ filteredPlugins.length }} plugin{{ filteredPlugins.length !== 1 ? 's' : '' }} found
          </div>
          
          <div class="view-toggle">
            <button
              :class="{ active: viewMode === 'grid' }"
              @click="viewMode = 'grid'"
            >
              <Icon name="carbon:grid" />
            </button>
            <button
              :class="{ active: viewMode === 'list' }"
              @click="viewMode = 'list'"
            >
              <Icon name="carbon:list" />
            </button>
          </div>
        </div>
        
        <div :class="['plugins-grid', viewMode]">
          <PluginCard
            v-for="plugin in filteredPlugins"
            :key="plugin.id"
            :plugin="plugin"
            :view-mode="viewMode"
          />
        </div>
        
        <!-- Empty State -->
        <div v-if="filteredPlugins.length === 0" class="empty-state">
          <Icon name="carbon:plugin" size="64" />
          <h3>No plugins found</h3>
          <p>Try adjusting your filters or search query</p>
          <button @click="resetFilters" class="button-primary">
            Clear Filters
          </button>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
const { data: plugins } = await useFetch('/api/plugins')

const searchQuery = ref('')
const selectedCategories = ref<string[]>([])
const selectedVersion = ref('')
const activelyMaintained = ref(false)
const officialPlugins = ref(false)
const sortBy = ref('popular')
const viewMode = ref<'grid' | 'list'>('grid')

const categories = [
  { id: 'annotation', name: 'Annotation & Drawing', count: 12 },
  { id: 'navigation', name: 'Navigation & UI', count: 8 },
  { id: 'visualization', name: 'Visualization', count: 15 },
  { id: 'export', name: 'Export & Print', count: 6 },
  { id: 'measurement', name: 'Measurement Tools', count: 9 },
  { id: 'comparison', name: 'Image Comparison', count: 5 },
  { id: 'ai', name: 'AI & ML Integration', count: 4 },
  { id: 'collaboration', name: 'Collaboration', count: 3 },
]

const osdVersions = ['5.0.0', '4.1.0', '4.0.0', '3.1.0', '3.0.0']

const filteredPlugins = computed(() => {
  let result = plugins.value || []
  
  // Search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(p => 
      p.name.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query) ||
      p.tags.some(t => t.toLowerCase().includes(query))
    )
  }
  
  // Category filter
  if (selectedCategories.value.length) {
    result = result.filter(p => 
      selectedCategories.value.includes(p.category)
    )
  }
  
  // Version filter
  if (selectedVersion.value) {
    result = result.filter(p => 
      p.compatibility.includes(selectedVersion.value)
    )
  }
  
  // Maintenance filter
  if (activelyMaintained.value) {
    const sixMonthsAgo = new Date()
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)
    result = result.filter(p => new Date(p.lastUpdated) > sixMonthsAgo)
  }
  
  // Official filter
  if (officialPlugins.value) {
    result = result.filter(p => p.official)
  }
  
  // Sort
  result.sort((a, b) => {
    switch (sortBy.value) {
      case 'popular':
        return b.stars - a.stars
      case 'recent':
        return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
      case 'rating':
        return b.rating - a.rating
      case 'name':
        return a.name.localeCompare(b.name)
      case 'downloads':
        return b.downloads - a.downloads
      default:
        return 0
    }
  })
  
  return result
})

const totalPlugins = computed(() => plugins.value?.length || 0)
const totalDownloads = computed(() => 
  plugins.value?.reduce((sum, p) => sum + p.downloads, 0) || 0
)
const activeAuthors = computed(() => 
  new Set(plugins.value?.map(p => p.author)).size || 0
)

const resetFilters = () => {
  searchQuery.value = ''
  selectedCategories.value = []
  selectedVersion.value = ''
  activelyMaintained.value = false
  officialPlugins.value = false
  sortBy.value = 'popular'
}
</script>
```

### 2. Plugin Card Component

```vue
<!-- components/PluginCard.vue -->
<template>
  <div :class="['plugin-card', viewMode, { featured: plugin.featured }]">
    <div class="plugin-header">
      <!-- Plugin Icon/Logo -->
      <div class="plugin-icon">
        <img
          v-if="plugin.icon"
          :src="plugin.icon"
          :alt="plugin.name"
        >
        <Icon v-else name="carbon:plugin" size="32" />
      </div>
      
      <!-- Badges -->
      <div class="plugin-badges">
        <span v-if="plugin.official" class="badge official">
          <Icon name="carbon:checkmark-filled" />
          Official
        </span>
        <span v-if="plugin.featured" class="badge featured">
          <Icon name="carbon:star-filled" />
          Featured
        </span>
        <span v-if="isRecentlyUpdated" class="badge new">
          New
        </span>
      </div>
    </div>
    
    <div class="plugin-content">
      <h3 class="plugin-name">
        <NuxtLink :to="`/plugins/${plugin.slug}`">
          {{ plugin.name }}
        </NuxtLink>
      </h3>
      
      <p class="plugin-description">{{ plugin.description }}</p>
      
      <!-- Stats -->
      <div class="plugin-stats">
        <div class="stat">
          <Icon name="carbon:star" />
          <span>{{ formatNumber(plugin.stars) }}</span>
        </div>
        <div class="stat">
          <Icon name="carbon:download" />
          <span>{{ formatNumber(plugin.downloads) }}</span>
        </div>
        <div class="stat">
          <Icon name="carbon:user" />
          <span>{{ plugin.author }}</span>
        </div>
      </div>
      
      <!-- Version Compatibility -->
      <div class="plugin-compatibility">
        <Tooltip>
          <template #trigger>
            <div class="compatibility-badge" :class="compatibilityStatus">
              <Icon :name="compatibilityIcon" />
              <span>OSD {{ plugin.testedWith }}</span>
            </div>
          </template>
          <template #content>
            <div class="compatibility-details">
              <div><strong>Last tested with:</strong> v{{ plugin.testedWith }}</div>
              <div><strong>Compatible versions:</strong> {{ plugin.compatibility.join(', ') }}</div>
              <div v-if="plugin.lastTested">
                <strong>Last tested:</strong> {{ formatDate(plugin.lastTested) }}
              </div>
            </div>
          </template>
        </Tooltip>
      </div>
      
      <!-- Tags -->
      <div class="plugin-tags">
        <span v-for="tag in plugin.tags.slice(0, 3)" :key="tag" class="tag">
          {{ tag }}
        </span>
      </div>
    </div>
    
    <div class="plugin-actions">
      <NuxtLink
        :to="`/plugins/${plugin.slug}/preview`"
        class="button-preview"
      >
        <Icon name="carbon:play" />
        Try it Live
      </NuxtLink>
      
      <NuxtLink
        :to="`/plugins/${plugin.slug}`"
        class="button-details"
      >
        Details
      </NuxtLink>
      
      <button class="button-icon" @click="toggleFavorite">
        <Icon :name="isFavorite ? 'carbon:favorite-filled' : 'carbon:favorite'" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Plugin {
  id: string
  slug: string
  name: string
  description: string
  author: string
  icon?: string
  stars: number
  downloads: number
  rating: number
  category: string
  tags: string[]
  testedWith: string
  compatibility: string[]
  lastTested: string
  lastUpdated: string
  official: boolean
  featured: boolean
}

const props = defineProps<{
  plugin: Plugin
  viewMode: 'grid' | 'list'
}>()

const isRecentlyUpdated = computed(() => {
  const oneMonthAgo = new Date()
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1)
  return new Date(props.plugin.lastUpdated) > oneMonthAgo
})

const compatibilityStatus = computed(() => {
  // Compare with latest OSD version
  const latestVersion = '5.0.0' // This would come from config
  const testedVersion = props.plugin.testedWith
  
  if (testedVersion === latestVersion) return 'compatible'
  if (props.plugin.compatibility.includes(latestVersion)) return 'likely-compatible'
  return 'outdated'
})

const compatibilityIcon = computed(() => {
  switch (compatibilityStatus.value) {
    case 'compatible': return 'carbon:checkmark-filled'
    case 'likely-compatible': return 'carbon:warning'
    case 'outdated': return 'carbon:warning-alt'
  }
})

const isFavorite = ref(false)

const toggleFavorite = () => {
  isFavorite.value = !isFavorite.value
  // Save to localStorage or user preferences
}
</script>

<style scoped>
.plugin-card.featured {
  border: 2px solid #3b82f6;
  background: linear-gradient(135deg, #eff6ff 0%, #ffffff 100%);
}

.compatibility-badge.compatible {
  background: #dcfce7;
  color: #16a34a;
}

.compatibility-badge.likely-compatible {
  background: #fef9c3;
  color: #ca8a04;
}

.compatibility-badge.outdated {
  background: #fee2e2;
  color: #dc2626;
}
</style>
```

### 3. Plugin Detail Page

```vue
<!-- pages/plugins/[slug].vue -->
<template>
  <div class="plugin-detail-page">
    <!-- Hero Section -->
    <div class="plugin-hero">
      <div class="hero-content">
        <div class="plugin-header">
          <div class="plugin-icon-large">
            <img v-if="plugin.icon" :src="plugin.icon" :alt="plugin.name">
            <Icon v-else name="carbon:plugin" size="64" />
          </div>
          
          <div class="plugin-title-section">
            <h1>{{ plugin.name }}</h1>
            <p class="plugin-tagline">{{ plugin.tagline }}</p>
            
            <div class="plugin-meta">
              <span class="meta-item">
                <Icon name="carbon:user" />
                by <a :href="plugin.authorUrl" target="_blank">{{ plugin.author }}</a>
              </span>
              <span class="meta-item">
                <Icon name="carbon:calendar" />
                Updated {{ formatDate(plugin.lastUpdated) }}
              </span>
              <span class="meta-item">
                <Icon name="carbon:license" />
                {{ plugin.license }}
              </span>
            </div>
          </div>
        </div>
        
        <!-- Action Buttons -->
        <div class="hero-actions">
          <NuxtLink
            :to="`/plugins/${plugin.slug}/preview`"
            class="button-primary button-large"
          >
            <Icon name="carbon:play-filled" />
            Try it Live
          </NuxtLink>
          
          <a
            :href="plugin.repository"
            target="_blank"
            class="button-secondary"
          >
            <Icon name="carbon:logo-github" />
            View on GitHub
          </a>
          
          <button class="button-secondary" @click="showInstallModal = true">
            <Icon name="carbon:download" />
            Install
          </button>
        </div>
        
        <!-- Stats Bar -->
        <div class="stats-bar">
          <div class="stat">
            <Icon name="carbon:star-filled" />
            <span class="stat-value">{{ formatNumber(plugin.stars) }}</span>
            <span class="stat-label">Stars</span>
          </div>
          <div class="stat">
            <Icon name="carbon:download" />
            <span class="stat-value">{{ formatNumber(plugin.downloads) }}</span>
            <span class="stat-label">Downloads</span>
          </div>
          <div class="stat">
            <Icon name="carbon:user-multiple" />
            <span class="stat-value">{{ formatNumber(plugin.users) }}</span>
            <span class="stat-label">Users</span>
          </div>
          <div class="stat">
            <div class="rating">
              <Icon
                v-for="i in 5"
                :key="i"
                name="carbon:star-filled"
                :class="{ filled: i <= plugin.rating }"
              />
            </div>
            <span class="stat-value">{{ plugin.rating.toFixed(1) }}</span>
            <span class="stat-label">Rating</span>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Main Content -->
    <div class="plugin-content-layout">
      <aside class="plugin-sidebar">
        <!-- Quick Info Card -->
        <div class="info-card">
          <h3>Information</h3>
          
          <div class="info-item">
            <span class="info-label">Version</span>
            <span class="info-value">{{ plugin.version }}</span>
          </div>
          
          <div class="info-item">
            <span class="info-label">Category</span>
            <span class="info-value">{{ plugin.categoryName }}</span>
          </div>
          
          <div class="info-item">
            <span class="info-label">Bundle Size</span>
            <span class="info-value">{{ plugin.bundleSize }}</span>
          </div>
          
          <div class="info-item">
            <span class="info-label">Last Tested With</span>
            <div class="compatibility-indicator">
              <Icon :name="compatibilityIcon" />
              <span>OSD v{{ plugin.testedWith }}</span>
            </div>
          </div>
          
          <div class="info-item">
            <span class="info-label">Compatible Versions</span>
            <div class="version-badges">
              <span
                v-for="version in plugin.compatibility"
                :key="version"
                class="version-badge"
              >
                {{ version }}
              </span>
            </div>
          </div>
        </div>
        
        <!-- Dependencies Card -->
        <div v-if="plugin.dependencies" class="info-card">
          <h3>Dependencies</h3>
          <ul class="dependency-list">
            <li v-for="(version, dep) in plugin.dependencies" :key="dep">
              <code>{{ dep }}</code>
              <span class="version">{{ version }}</span>
            </li>
          </ul>
        </div>
        
        <!-- Links Card -->
        <div class="info-card">
          <h3>Links</h3>
          <div class="link-list">
            <a :href="plugin.repository" target="_blank" class="link-item">
              <Icon name="carbon:logo-github" />
              Repository
            </a>
            <a v-if="plugin.documentation" :href="plugin.documentation" target="_blank" class="link-item">
              <Icon name="carbon:document" />
              Documentation
            </a>
            <a v-if="plugin.demo" :href="plugin.demo" target="_blank" class="link-item">
              <Icon name="carbon:application-web" />
              Live Demo
            </a>
            <a v-if="plugin.issues" :href="plugin.issues" target="_blank" class="link-item">
              <Icon name="carbon:debug" />
              Report Issue
            </a>
          </div>
        </div>
        
        <!-- Maintenance Status -->
        <div class="info-card" :class="maintenanceStatusClass">
          <h3>Maintenance Status</h3>
          <div class="maintenance-info">
            <Icon :name="maintenanceIcon" size="32" />
            <p>{{ maintenanceMessage }}</p>
            <small>Last commit: {{ formatDate(plugin.lastCommit) }}</small>
          </div>
        </div>
      </aside>
      
      <main class="plugin-main-content">
        <!-- Tabs -->
        <div class="content-tabs">
          <button
            :class="{ active: activeTab === 'overview' }"
            @click="activeTab = 'overview'"
          >
            Overview
          </button>
          <button
            :class="{ active: activeTab === 'installation' }"
            @click="activeTab = 'installation'"
          >
            Installation
          </button>
          <button
            :class="{ active: activeTab === 'examples' }"
            @click="activeTab = 'examples'"
          >
            Examples
          </button>
          <button
            :class="{ active: activeTab === 'api' }"
            @click="activeTab = 'api'"
          >
            API Reference
          </button>
          <button
            :class="{ active: activeTab === 'reviews' }"
            @click="activeTab = 'reviews'"
          >
            Reviews ({{ plugin.reviewCount }})
          </button>
          <button
            :class="{ active: activeTab === 'changelog' }"
            @click="activeTab = 'changelog'"
          >
            Changelog
          </button>
        </div>
        
        <!-- Tab Content -->
        <div class="tab-content">
          <!-- Overview Tab -->
          <div v-if="activeTab === 'overview'" class="tab-panel">
            <ContentRenderer :value="plugin.readme" />
            
            <!-- Screenshot Gallery -->
            <div v-if="plugin.screenshots" class="screenshot-gallery">
              <h2>Screenshots</h2>
              <div class="gallery-grid">
                <img
                  v-for="(screenshot, idx) in plugin.screenshots"
                  :key="idx"
                  :src="screenshot.url"
                  :alt="screenshot.caption"
                  @click="openLightbox(idx)"
                >
              </div>
            </div>
          </div>
          
          <!-- Installation Tab -->
          <div v-if="activeTab === 'installation'" class="tab-panel">
            <h2>Installation</h2>
            
            <TabGroup>
              <TabList>
                <Tab>npm</Tab>
                <Tab>yarn</Tab>
                <Tab>pnpm</Tab>
                <Tab>CDN</Tab>
                <Tab>Manual</Tab>
              </TabList>
              
              <TabPanels>
                <TabPanel>
                  <CodeExample
                    :code="`npm install ${plugin.packageName}`"
                    language="bash"
                  />
                </TabPanel>
                
                <TabPanel>
                  <CodeExample
                    :code="`yarn add ${plugin.packageName}`"
                    language="bash"
                  />
                </TabPanel>
                
                <TabPanel>
                  <CodeExample
                    :code="`pnpm add ${plugin.packageName}`"
                    language="bash"
                  />
                </TabPanel>
                
                <TabPanel>
                  <CodeExample
                    :code="`<script src=&quot;${plugin.cdnUrl}&quot;></script>`"
                    language="html"
                  />
                  <p class="text-sm text-gray-600 mt-2">
                    CDN URL: <code>{{ plugin.cdnUrl }}</code>
                  </p>
                </TabPanel>
                
                <TabPanel>
                  <p>Download the latest release:</p>
                  <a
                    :href="plugin.downloadUrl"
                    class="button-primary"
                    download
                  >
                    <Icon name="carbon:download" />
                    Download {{ plugin.version }}
                  </a>
                </TabPanel>
              </TabPanels>
            </TabGroup>
            
            <h3 class="mt-8">Basic Usage</h3>
            <CodeExample
              :code="plugin.basicUsage"
              language="javascript"
              meta="twoslash"
            />
          </div>
          
          <!-- Examples Tab -->
          <div v-if="activeTab === 'examples'" class="tab-panel">
            <h2>Examples</h2>
            
            <div
              v-for="example in plugin.examples"
              :key="example.id"
              class="example-section"
            >
              <h3>{{ example.title }}</h3>
              <p>{{ example.description }}</p>
              
              <LivePlayground
                :code="example.code"
                :plugin="plugin.slug"
              />
              
              <NuxtLink
                :to="`/plugins/${plugin.slug}/preview?example=${example.id}`"
                class="example-link"
              >
                Open in full preview →
              </NuxtLink>
            </div>
          </div>
          
          <!-- API Tab -->
          <div v-if="activeTab === 'api'" class="tab-panel">
            <ContentRenderer :value="plugin.apiDocs" />
          </div>
          
          <!-- Reviews Tab -->
          <div v-if="activeTab === 'reviews'" class="tab-panel">
            <PluginReviews :plugin-id="plugin.id" />
          </div>
          
          <!-- Changelog Tab -->
          <div v-if="activeTab === 'changelog'" class="tab-panel">
            <PluginChangelog :versions="plugin.changelog" />
          </div>
        </div>
      </main>
    </div>
    
    <!-- Install Modal -->
    <InstallModal
      v-if="showInstallModal"
      :plugin="plugin"
      @close="showInstallModal = false"
    />
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const { data: plugin } = await useFetch(`/api/plugins/${route.params.slug}`)

const activeTab = ref('overview')
const showInstallModal = ref(false)

const maintenanceStatus = computed(() => {
  const lastCommit = new Date(plugin.value.lastCommit)
  const monthsAgo = (Date.now() - lastCommit.getTime()) / (1000 * 60 * 60 * 24 * 30)
  
  if (monthsAgo < 3) return 'active'
  if (monthsAgo < 12) return 'maintained'
  return 'inactive'
})

const maintenanceStatusClass = computed(() => `status-${maintenanceStatus.value}`)
const maintenanceIcon = computed(() => {
  const icons = {
    active: 'carbon:checkmark-filled',
    maintained: 'carbon:warning',
    inactive: 'carbon:warning-alt',
  }
  return icons[maintenanceStatus.value]
})

const maintenanceMessage = computed(() => {
  const messages = {
    active: 'Actively maintained and regularly updated',
    maintained: 'Maintained but less frequent updates',
    inactive: 'No recent updates - may be unmaintained',
  }
  return messages[maintenanceStatus.value]
})
</script>
```

### 4. Interactive Plugin Preview Page

```vue
<!-- pages/plugins/[slug]/preview.vue -->
<template>
  <div class="plugin-preview-page">
    <div class="preview-header">
      <div class="preview-title">
        <NuxtLink :to="`/plugins/${plugin.slug}`" class="back-link">
          <Icon name="carbon:arrow-left" />
        </NuxtLink>
        <h1>{{ plugin.name }} - Live Preview</h1>
      </div>
      
      <div class="preview-controls">
        <select v-model="selectedExample" class="example-select">
          <option value="">Basic Example</option>
          <option
            v-for="example in plugin.examples"
            :key="example.id"
            :value="example.id"
          >
            {{ example.title }}
          </option>
        </select>
        
        <button @click="resetPreview" class="button-secondary">
          <Icon name="carbon:restart" />
          Reset
        </button>
        
        <button @click="sharePreview" class="button-secondary">
          <Icon name="carbon:share" />
          Share
        </button>
        
        <button @click="toggleFullscreen" class="button-secondary">
          <Icon :name="isFullscreen ? 'carbon:minimize' : 'carbon:maximize'" />
          {{ isFullscreen ? 'Exit' : 'Fullscreen' }}
        </button>
      </div>
    </div>
    
    <div class="preview-layout" :class="{ fullscreen: isFullscreen }">
      <!-- Configuration Panel -->
      <aside class="config-panel" :class="{ collapsed: configCollapsed }">
        <div class="panel-header">
          <h3>Configuration</h3>
          <button @click="configCollapsed = !configCollapsed" class="collapse-button">
            <Icon :name="configCollapsed ? 'carbon:chevron-right' : 'carbon:chevron-left'" />
          </button>
        </div>
        
        <div v-if="!configCollapsed" class="panel-content">
          <!-- Plugin Options -->
          <div class="config-section">
            <h4>Plugin Options</h4>
            <div
              v-for="option in plugin.options"
              :key="option.key"
              class="config-field"
            >
              <label :for="option.key">
                {{ option.label }}
                <Tooltip v-if="option.description">
                  <template #trigger>
                    <Icon name="carbon:information" />
                  </template>
                  <template #content>
                    {{ option.description }}
                  </template>
                </Tooltip>
              </label>
              
              <component
                :is="getInputComponent(option.type)"
                :id="option.key"
                v-model="pluginConfig[option.key]"
                v-bind="option.props"
              />
            </div>
          </div>
          
          <!-- OpenSeadragon Options -->
          <div class="config-section">
            <h4>OpenSeadragon Options</h4>
            <div class="config-field">
              <label for="osd-version">OSD Version</label>
              <select id="osd-version" v-model="osdVersion">
                <option v-for="version in osdVersions" :key="version" :value="version">
                  {{ version }}
                </option>
              </select>
            </div>
            
            <div class="config-field">
              <label for="tile-source">Tile Source</label>
              <select id="tile-source" v-model="selectedTileSource">
                <option
                  v-for="source in tileSources"
                  :key="source.id"
                  :value="source.id"
                >
                  {{ source.name }}
                </option>
              </select>
            </div>
            
            <details>
              <summary>Advanced OSD Options</summary>
              <div class="advanced-options">
                <!-- Common OSD options -->
                <div class="config-field">
                  <label>
                    <input v-model="osdConfig.showNavigator" type="checkbox">
                    Show Navigator
                  </label>
                </div>
                <div class="config-field">
                  <label>
                    <input v-model="osdConfig.showNavigationControl" type="checkbox">
                    Show Navigation Control
                  </label>
                </div>
                <!-- ... more options -->
              </div>
            </details>
          </div>
          
          <!-- Presets -->
          <div class="config-section">
            <h4>Presets</h4>
            <select v-model="selectedPreset" @change="applyPreset">
              <option value="">Custom Configuration</option>
              <option
                v-for="preset in presets"
                :key="preset.id"
                :value="preset.id"
              >
                {{ preset.name }}
              </option>
            </select>
          </div>
          
          <!-- Export Configuration -->
          <div class="config-actions">
            <button @click="exportConfig" class="button-small">
              <Icon name="carbon:download" />
              Export Config
            </button>
            <button @click="copyConfig" class="button-small">
              <Icon name="carbon:copy" />
              Copy Code
            </button>
          </div>
        </div>
      </aside>
      
      <!-- Preview Area -->
      <main class="preview-main">
        <div class="preview-tabs">
          <button
            :class="{ active: activeView === 'viewer' }"
            @click="activeView = 'viewer'"
          >
            <Icon name="carbon:view" />
            Viewer
          </button>
          <button
            :class="{ active: activeView === 'code' }"
            @click="activeView = 'code'"
          >
            <Icon name="carbon:code" />
            Code
          </button>
          <button
            :class="{ active: activeView === 'split' }"
            @click="activeView = 'split'"
          >
            <Icon name="carbon:split-screen" />
            Split
          </button>
        </div>
        
        <div :class="['preview-content', activeView]">
          <!-- Viewer -->
          <div v-show="activeView === 'viewer' || activeView === 'split'" class="viewer-pane">
            <div ref="viewerContainer" class="osd-viewer-container"></div>
            
            <!-- Plugin Overlay UI (if any) -->
            <div class="plugin-overlay">
              <!-- Plugin-specific UI elements render here -->
            </div>
            
            <!-- Stats Overlay -->
            <div v-if="showStats" class="stats-overlay">
              <div class="stat-item">
                <span class="stat-label">FPS:</span>
                <span class="stat-value">{{ stats.fps }}</span>
              </div>
              <div class="stat-item">
                <span class="stat-label">Zoom:</span>
                <span class="stat-value">{{ stats.zoom.toFixed(2) }}x</span>
              </div>
              <div class="stat-item">
                <span class="stat-label">Plugin Events:</span>
                <span class="stat-value">{{ stats.events }}</span>
              </div>
            </div>
          </div>
          
          <!-- Code Editor -->
          <div v-show="activeView === 'code' || activeView === 'split'" class="code-pane">
            <div class="code-tabs">
              <button
                v-for="tab in codeTabs"
                :key="tab"
                :class="{ active: activeCodeTab === tab }"
                @click="activeCodeTab = tab"
              >
                {{ tab }}
              </button>
            </div>
            
            <MonacoEditor
              v-model="currentCode"
              :language="codeLanguage"
              :options="editorOptions"
              @change="debounceUpdate"
            />
            
            <!-- Console Output -->
            <div class="console-panel">
              <div class="console-header">
                <span>Console</span>
                <button @click="clearConsole" class="button-icon">
                  <Icon name="carbon:trash-can" />
                </button>
              </div>
              <div class="console-messages">
                <div
                  v-for="(msg, idx) in consoleMessages"
                  :key="idx"
                  :class="['console-message', msg.type]"
                >
                  <Icon :name="getConsoleIcon(msg.type)" />
                  <span>{{ msg.text }}</span>
                  <span class="console-time">{{ msg.time }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
    
    <!-- Feedback Panel -->
    <div class="feedback-panel">
      <div class="feedback-prompt">
        <span>Did this preview help you understand the plugin?</span>
        <div class="feedback-buttons">
          <button @click="submitFeedback('helpful')" class="button-icon">
            <Icon name="carbon:thumbs-up" />
          </button>
          <button @click="submitFeedback('not-helpful')" class="button-icon">
            <Icon name="carbon:thumbs-down" />
          </button>
        </div>
      </div>
      
      <button @click="showReportIssue = true" class="button-text">
        <Icon name="carbon:warning" />
        Report an Issue
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import OpenSeadragon from 'openseadragon'

const route = useRoute()
const { data: plugin } = await useFetch(`/api/plugins/${route.params.slug}`)

const viewerContainer = ref<HTMLElement>()
let viewer: OpenSeadragon.Viewer | null = null
let pluginInstance: any = null

const selectedExample = ref(route.query.example as string || '')
const pluginConfig = ref({})
const osdConfig = ref({
  showNavigator: true,
  showNavigationControl: true,
})
const osdVersion = ref('5.0.0')
const selectedTileSource = ref('default')
const configCollapsed = ref(false)
const isFullscreen = ref(false)
const activeView = ref<'viewer' | 'code' | 'split'>('viewer')
const activeCodeTab = ref('JavaScript')
const showStats = ref(true)

const stats = ref({
  fps: 60,
  zoom: 1,
  events: 0,
})

const consoleMessages = ref<Array<{ type: string; text: string; time: string }>>([])

const initViewer = async () => {
  if (!viewerContainer.value) return
  
  // Clean up existing
  if (viewer) {
    if (pluginInstance && pluginInstance.destroy) {
      pluginInstance.destroy()
    }
    viewer.destroy()
  }
  
  // Create viewer
  viewer = OpenSeadragon({
    element: viewerContainer.value,
    ...osdConfig.value,
    tileSources: getTileSource(selectedTileSource.value),
  })
  
  // Initialize plugin
  try {
    // Dynamically load and initialize the plugin
    const PluginClass = await loadPlugin(plugin.value.slug, osdVersion.value)
    pluginInstance = new PluginClass(viewer, pluginConfig.value)
    
    // Hook into plugin events for stats
    if (pluginInstance.on) {
      pluginInstance.on('*', () => {
        stats.value.events++
      })
    }
    
    consoleMessages.value.push({
      type: 'success',
      text: `${plugin.value.name} initialized successfully`,
      time: new Date().toLocaleTimeString(),
    })
  } catch (error) {
    consoleMessages.value.push({
      type: 'error',
      text: `Failed to initialize plugin: ${error.message}`,
      time: new Date().toLocaleTimeString(),
    })
  }
  
  // Update stats
  viewer.addHandler('animation', () => {
    stats.value.zoom = viewer.viewport.getZoom()
  })
}

const currentCode = computed(() => {
  // Generate code based on current configuration
  return generateCode(activeCodeTab.value, pluginConfig.value, osdConfig.value)
})

const debounceUpdate = useDebounceFn(() => {
  initViewer()
}, 1000)

watch([pluginConfig, osdConfig, selectedTileSource], () => {
  debounceUpdate()
}, { deep: true })

onMounted(() => {
  initViewer()
})

onUnmounted(() => {
  if (viewer) {
    if (pluginInstance && pluginInstance.destroy) {
      pluginInstance.destroy()
    }
    viewer.destroy()
  }
})
</script>

<style scoped>
.plugin-preview-page {
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.preview-layout {
  flex: 1;
  display: grid;
  grid-template-columns: 320px 1fr;
  overflow: hidden;
}

.preview-layout.fullscreen {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: white;
}

.config-panel.collapsed {
  width: 48px;
}

.osd-viewer-container {
  width: 100%;
  height: 100%;
  background: #f5f5f5;
}

.preview-content.split {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1px;
  background: #e5e5e5;
}
</style>
```

### 5. Plugin Submission System

```vue
<!-- pages/plugins/submit.vue -->
<template>
  <div class="plugin-submit-page">
    <div class="submit-header">
      <h1>Submit Your Plugin</h1>
      <p>Share your OpenSeadragon plugin with the community</p>
    </div>
    
    <div class="submit-content">
      <form @submit.prevent="submitPlugin" class="submit-form">
        <!-- Basic Info -->
        <section class="form-section">
          <h2>Basic Information</h2>
          
          <div class="form-field">
            <label for="plugin-name">Plugin Name *</label>
            <input
              id="plugin-name"
              v-model="form.name"
              type="text"
              required
              placeholder="My Awesome Plugin"
            >
          </div>
          
          <div class="form-field">
            <label for="plugin-description">Short Description *</label>
            <textarea
              id="plugin-description"
              v-model="form.description"
              required
              maxlength="160"
              placeholder="A brief description of what your plugin does (max 160 characters)"
            ></textarea>
            <small>{{ form.description.length }}/160 characters</small>
          </div>
          
          <div class="form-field">
            <label for="plugin-tagline">Tagline</label>
            <input
              id="plugin-tagline"
              v-model="form.tagline"
              type="text"
              placeholder="Catchy one-liner"
            >
          </div>
          
          <div class="form-field">
            <label for="plugin-category">Category *</label>
            <select id="plugin-category" v-model="form.category" required>
              <option value="">Select a category</option>
              <option value="annotation">Annotation & Drawing</option>
              <option value="navigation">Navigation & UI</option>
              <option value="visualization">Visualization</option>
              <option value="export">Export & Print</option>
              <option value="measurement">Measurement Tools</option>
              <option value="comparison">Image Comparison</option>
              <option value="ai">AI & ML Integration</option>
              <option value="collaboration">Collaboration</option>
            </select>
          </div>
          
          <div class="form-field">
            <label for="plugin-tags">Tags</label>
            <TagInput v-model="form.tags" placeholder="Add tags..." />
            <small>Add relevant tags to help users find your plugin</small>
          </div>
        </section>
        
        <!-- Repository Info -->
        <section class="form-section">
          <h2>Repository</h2>
          
          <div class="form-field">
            <label for="repo-url">Repository URL *</label>
            <input
              id="repo-url"
              v-model="form.repository"
              type="url"
              required
              placeholder="https://github.com/username/plugin"
              @blur="fetchRepoInfo"
            >
            <small>We'll automatically fetch information from your repository</small>
          </div>
          
          <div v-if="repoInfo" class="repo-preview">
            <div class="repo-stat">
              <Icon name="carbon:star" />
              {{ repoInfo.stars }} stars
            </div>
            <div class="repo-stat">
              <Icon name="carbon:branch" />
              {{ repoInfo.forks }} forks
            </div>
            <div class="repo-stat">
              <Icon name="carbon:calendar" />
              Updated {{ formatDate(repoInfo.updated) }}
            </div>
          </div>
          
          <div class="form-field">
            <label for="package-name">NPM Package Name</label>
            <input
              id="package-name"
              v-model="form.packageName"
              type="text"
              placeholder="@username/openseadragon-plugin"
            >
          </div>
          
          <div class="form-field">
            <label for="cdn-url">CDN URL</label>
            <input
              id="cdn-url"
              v-model="form.cdnUrl"
              type="url"
              placeholder="https://cdn.jsdelivr.net/npm/..."
            >
          </div>
        </section>
        
        <!-- Compatibility -->
        <section class="form-section">
          <h2>OpenSeadragon Compatibility</h2>
          
          <div class="form-field">
            <label for="tested-version">Last Tested Version *</label>
            <select id="tested-version" v-model="form.testedWith" required>
              <option v-for="version in osdVersions" :key="version" :value="version">
                {{ version }}
              </option>
            </select>
          </div>
          
          <div class="form-field">
            <label>Compatible Versions *</label>
            <div class="checkbox-group">
              <label
                v-for="version in osdVersions"
                :key="version"
                class="checkbox-label"
              >
                <input
                  v-model="form.compatibility"
                  type="checkbox"
                  :value="version"
                >
                {{ version }}
              </label>
            </div>
          </div>
          
          <div class="form-field">
            <label for="testing-date">Testing Date</label>
            <input
              id="testing-date"
              v-model="form.lastTested"
              type="date"
            >
          </div>
        </section>
        
        <!-- Documentation -->
        <section class="form-section">
          <h2>Documentation & Examples</h2>
          
          <div class="form-field">
            <label for="readme">README Content *</label>
            <MarkdownEditor
              v-model="form.readme"
              placeholder="Provide detailed documentation..."
            />
          </div>
          
          <div class="form-field">
            <label for="demo-url">Live Demo URL</label>
            <input
              id="demo-url"
              v-model="form.demo"
              type="url"
              placeholder="https://your-demo.com"
            >
          </div>
          
          <div class="form-field">
            <label>Code Examples</label>
            <div
              v-for="(example, idx) in form.examples"
              :key="idx"
              class="example-editor"
            >
              <input
                v-model="example.title"
                type="text"
                placeholder="Example title"
              >
              <MonacoEditor
                v-model="example.code"
                language="javascript"
                height="200px"
              />
              <button
                type="button"
                @click="removeExample(idx)"
                class="button-danger"
              >
                Remove
              </button>
            </div>
            <button type="button" @click="addExample" class="button-secondary">
              <Icon name="carbon:add" />
              Add Example
            </button>
          </div>
        </section>
        
        <!-- Media -->
        <section class="form-section">
          <h2>Media</h2>
          
          <div class="form-field">
            <label for="plugin-icon">Plugin Icon/Logo</label>
            <FileUpload
              id="plugin-icon"
              v-model="form.icon"
              accept="image/*"
              max-size="512KB"
            />
            <small>Recommended: 256x256px PNG or SVG</small>
          </div>
          
          <div class="form-field">
            <label>Screenshots</label>
            <FileUpload
              v-model="form.screenshots"
              accept="image/*"
              multiple
              max-size="2MB"
            />
            <small>Upload screenshots showing your plugin in action</small>
          </div>
          
          <div class="form-field">
            <label for="video-url">Demo Video URL</label>
            <input
              id="video-url"
              v-model="form.videoUrl"
              type="url"
              placeholder="https://youtube.com/watch?v=..."
            >
          </div>
        </section>
        
        <!-- Submit -->
        <section class="form-section">
          <div class="form-actions">
            <button type="submit" class="button-primary" :disabled="submitting">
              <Icon v-if="submitting" name="carbon:renew" class="animate-spin" />
              {{ submitting ? 'Submitting...' : 'Submit Plugin' }}
            </button>
            
            <button type="button" @click="saveDraft" class="button-secondary">
              Save as Draft
            </button>
          </div>
          
          <div class="form-disclaimer">
            <p>
              By submitting your plugin, you agree to our 
              <NuxtLink to="/plugins/guidelines">Plugin Guidelines</NuxtLink>
              and 
              <NuxtLink to="/terms">Terms of Service</NuxtLink>.
            </p>
            <p>
              Your submission will be reviewed by our team before being published.
            </p>
          </div>
        </section>
      </form>
      
      <!-- Preview Panel -->
      <aside class="submit-preview">
        <h3>Preview</h3>
        <PluginCard :plugin="previewPlugin" view-mode="grid" />
      </aside>
    </div>
  </div>
</template>
```

## Technical Implementation

### Plugin Registry API

```typescript
// server/api/plugins/index.ts
export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  
  // Fetch from database or static JSON
  const plugins = await fetchPlugins({
    category: query.category,
    search: query.search,
    version: query.version,
    sort: query.sort,
  })
  
  return plugins
})

// server/api/plugins/[slug].ts
export default defineEventHandler(async (event) => {
  const slug = event.context.params.slug
  
  const plugin = await fetchPlugin(slug)
  
  if (!plugin) {
    throw createError({
      statusCode: 404,
      message: 'Plugin not found',
    })
  }
  
  // Increment view count
  await incrementPluginViews(slug)
  
  return plugin
})
```

### Plugin Data Schema

```typescript
// types/plugin.ts
export interface Plugin {
  id: string
  slug: string
  name: string
  tagline: string
  description: string
  author: string
  authorUrl: string
  icon?: string
  screenshots: Screenshot[]
  category: string
  categoryName: string
  tags: string[]
  
  // Repository
  repository: string
  documentation?: string
  demo?: string
  issues?: string
  
  // Package Info
  packageName?: string
  cdnUrl?: string
  downloadUrl: string
  version: string
  license: string
  bundleSize: string
  
  // Compatibility
  testedWith: string
  compatibility: string[]
  lastTested: string
  dependencies?: Record<string, string>
  
  // Stats
  stars: number
  downloads: number
  users: number
  rating: number
  reviewCount: number
  
  // Dates
  createdAt: string
  lastUpdated: string
  lastCommit: string
  
  // Status
  official: boolean
  featured: boolean
  verified: boolean
  
  // Content
  readme: string
  apiDocs: string
  basicUsage: string
  examples: PluginExample[]
  changelog: VersionChangelog[]
  
  // Configuration
  options: PluginOption[]
}

export interface PluginExample {
  id: string
  title: string
  description: string
  code: string
  config?: Record<string, any>
  tileSource?: string
}

export interface PluginOption {
  key: string
  label: string
  type: 'string' | 'number' | 'boolean' | 'select' | 'color'
  description: string
  default: any
  props?: Record<string, any>
}
```

## Success Metrics

- **Plugin Discovery**: 70%+ of users find relevant plugins within 2 minutes
- **Preview Usage**: 50%+ of plugin viewers try the live preview
- **Conversion**: 30%+ of preview users install the plugin
- **Submission Rate**: 5+ new plugins submitted per month
- **Update Frequency**: 80%+ of plugins tested with latest OSD version
- **User Satisfaction**: 4.5+ star average rating across plugins

## Future Enhancements

- **Plugin Analytics**: Track usage statistics for plugin authors
- **Automated Testing**: CI/CD integration for compatibility testing
- **Plugin Generator**: CLI tool to scaffold new plugins
- **Marketplace**: Premium plugins with licensing
- **Plugin Collections**: Curated bundles for specific use cases
- **A/B Testing**: Compare different plugins side-by-side
- **Integration Templates**: Quick-start templates for popular frameworks
- **Plugin Compatibility Matrix**: Visual compatibility checker
- **Community Voting**: Let users vote on feature requests
- **Bounty Program**: Reward developers for building requested plugins
