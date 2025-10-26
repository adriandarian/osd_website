# Search Strategy

## GitHub Pages Compatibility

Since the OpenSeadragon website will be hosted on GitHub Pages (static hosting only), we need client-side search solutions that work without server-side functionality.

## Primary Solution: @nuxt/content Built-in Search

### Why @nuxt/content Search?
- **Zero cost**: No external services or server requirements
- **Native integration**: Works seamlessly with Nuxt Content
- **GitHub Pages compatible**: Pure client-side implementation
- **Simple setup**: Minimal configuration required
- **Good performance**: Fast enough for documentation search
- **SSG ready**: Works with static site generation

### Implementation

#### Basic Search Component
```vue
<!-- components/SearchBox.vue -->
<template>
  <div class="search-container">
    <input
      v-model="query"
      @input="handleSearch"
      placeholder="Search documentation..."
      class="search-input"
    />
    
    <div v-if="results.length" class="search-results">
      <NuxtLink
        v-for="result in results"
        :key="result._path"
        :to="result._path"
        class="search-result"
      >
        <h3>{{ result.title }}</h3>
        <p>{{ result.description }}</p>
        <span class="category">{{ result.category }}</span>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
const query = ref('')
const results = ref([])

const handleSearch = async () => {
  if (query.value.length > 2) {
    results.value = await queryContent()
      .where({
        $or: [
          { title: { $icontains: query.value } },
          { description: { $icontains: query.value } },
          { body: { $icontains: query.value } }
        ]
      })
      .limit(10)
      .find()
  } else {
    results.value = []
  }
}
</script>
```

#### Nuxt Configuration
```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  modules: [
    '@nuxt/content',
    // ... other modules
  ],
  
  // GitHub Pages configuration
  ssr: false,
  target: 'static',
  
  content: {
    // Enable search functionality
    experimental: {
      search: true
    }
  }
})
```

## Alternative Solutions (Enhancement Options)

### 1. MiniSearch + Nuxt Plugin
**Use case**: When advanced search features are needed

- **Type**: Client-side full-text search
- **Size**: ~20KB minified
- **Features**: Fuzzy search, auto-suggestions, ranking
- **Benefits**: Advanced search capabilities, still client-side

```typescript
// plugins/search.client.ts
import MiniSearch from 'minisearch'

export default defineNuxtPlugin(() => {
  const miniSearch = new MiniSearch({
    fields: ['title', 'content', 'tags'],
    storeFields: ['title', 'content', 'path', 'category'],
    searchOptions: {
      boost: { title: 2, tags: 1.5 },
      fuzzy: 0.2,
      prefix: true
    }
  })

  return {
    provide: {
      search: {
        index: (documents: any[]) => miniSearch.addAll(documents),
        search: (query: string) => miniSearch.search(query, { limit: 20 })
      }
    }
  }
})
```

### 2. Orama + Nuxt Plugin
**Use case**: For more sophisticated search requirements

- **Type**: Full-text search engine in TypeScript
- **Size**: ~30KB runtime
- **Features**: Typo tolerance, faceted search, vector search
- **Benefits**: More advanced than MiniSearch, still client-side

### 3. Pagefind + Nuxt
**Use case**: Future enhancement when content grows significantly

- **Type**: Static site search with automatic indexing
- **Features**: Automatic indexing, filters, highlights
- **Benefits**: No manual index building, works great with SSG

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  hooks: {
    'nitro:build:public-assets': () => {
      // Run Pagefind after static build
      execSync('npx pagefind --site .output/public')
    }
  }
})
```

## Search Features Implementation

### 1. Enhanced Search UI

#### Search Modal Component
```vue
<!-- components/SearchModal.vue -->
<template>
  <div v-if="isOpen" class="search-modal">
    <div class="search-container">
      <input
        ref="searchInput"
        v-model="query"
        @input="handleSearch"
        @keydown="handleKeydown"
        placeholder="Search documentation..."
        class="search-input"
      />
      
      <div class="search-results">
        <div
          v-for="(result, index) in results"
          :key="result._path"
          :class="['search-result', { active: index === activeIndex }]"
          @click="selectResult(result)"
        >
          <div class="result-content">
            <h3 v-html="highlightMatch(result.title, query)"></h3>
            <p v-html="highlightMatch(result.description, query)"></p>
            <span class="category">{{ result.category }}</span>
          </div>
          <kbd class="result-shortcut">↵</kbd>
        </div>
      </div>
      
      <div class="search-footer">
        <span>↑↓ Navigate</span>
        <span>↵ Select</span>
        <span>Esc Close</span>
      </div>
    </div>
  </div>
</template>

<script setup>
// Keyboard shortcuts: Cmd/Ctrl + K to open
const { metaKey } = useMagicKeys()

whenever(() => metaKey.value && key.k, () => {
  isOpen.value = true
})
</script>
```

#### Advanced Features
- **Keyboard shortcuts**: Cmd/Ctrl + K to open search
- **Keyboard navigation**: Arrow keys to navigate results
- **Recent searches**: Store in localStorage
- **Search suggestions**: Based on popular queries
- **Category filters**: Filter by docs, examples, plugins
- **Search-as-you-type**: Instant results with debouncing

### 2. Search Analytics (Privacy-Friendly)

```typescript
// composables/useSearchAnalytics.ts
export function useSearchAnalytics() {
  const trackSearch = (query: string, resultCount: number) => {
    // Store locally for improving search
    const searchData = {
      query: query.toLowerCase(),
      resultCount,
      timestamp: Date.now()
    }
    
    const searches = JSON.parse(localStorage.getItem('search-analytics') || '[]')
    searches.push(searchData)
    localStorage.setItem('search-analytics', JSON.stringify(searches.slice(-100)))
  }
  
  const getPopularSearches = () => {
    const searches = JSON.parse(localStorage.getItem('search-analytics') || '[]')
    return searches
      .reduce((acc, search) => {
        acc[search.query] = (acc[search.query] || 0) + 1
        return acc
      }, {})
  }
  
  return { trackSearch, getPopularSearches }
}
```

### 3. Mobile Search Experience

- **Touch-friendly interface**: Large touch targets, swipe gestures
- **Voice search**: Web Speech API integration
- **Responsive design**: Adapts to screen size
- **Offline search**: Works without internet connection

## Performance Optimization

### 1. Search Index Optimization

#### Content Processing
```typescript
// Build-time index optimization
const processContent = (content: string) => {
  return content
    .toLowerCase()
    .replace(/[^\w\s]/g, '') // Remove special characters
    .split(/\s+/) // Split into words
    .filter(word => word.length > 2) // Remove short words
    .filter(word => !stopWords.includes(word)) // Remove stop words
}
```

#### Index Caching
- **Browser caching**: Cache search index in localStorage
- **Incremental updates**: Only update changed content
- **Compression**: Minimize index size

### 2. Lazy Loading

```typescript
// Load search only when needed
const SearchModal = defineAsyncComponent(() => 
  import('~/components/SearchModal.vue')
)
```

### 3. Debounced Search

```typescript
// Debounced search to prevent excessive queries
const debouncedSearch = useDebounceFn(async (query: string) => {
  if (query.length > 2) {
    results.value = await performSearch(query)
  }
}, 300)
```

## Cost and Performance Comparison

| Solution | Setup Cost | Ongoing Cost | Maintenance | Performance | GitHub Pages |
|----------|------------|--------------|-------------|-------------|--------------|
| @nuxt/content search | Free | $0 | Low | Good | ✅ Native |
| MiniSearch + Nuxt | Free | $0 | Medium | Very Good | ✅ Compatible |
| Pagefind + Nuxt | Free | $0 | Low | Good | ✅ Perfect |
| Orama + Nuxt | Free | $0 | Medium | Excellent | ✅ Compatible |
| ~~Algolia~~ | ~~Free~~ | ~~$0-500+/month~~ | ~~Low~~ | ~~Excellent~~ | ❌ Expensive |
| ~~@nuxtjs/meilisearch~~ | ~~Free~~ | ~~$0-10/month~~ | ~~Medium~~ | ~~Excellent~~ | ❌ Needs server |

## Implementation Strategy

### Phase 1: Basic Search (Week 3)
1. **Set up @nuxt/content search** - Get search working quickly
2. **Create basic search component** - Simple input and results
3. **Add to navigation** - Integrate into site header

### Phase 2: Enhanced UI (Week 4)
1. **Add search modal** - Keyboard shortcuts and better UX
2. **Implement keyboard navigation** - Arrow keys, enter, escape
3. **Add result highlighting** - Highlight matching terms
4. **Mobile optimization** - Touch-friendly interface

### Phase 3: Advanced Features (Week 6)
1. **Category filters** - Filter by content type
2. **Recent searches** - Local storage for user convenience
3. **Search suggestions** - Popular search terms
4. **Analytics tracking** - Privacy-friendly usage tracking

### Phase 4: Future Enhancements
1. **Consider MiniSearch upgrade** - If advanced features needed
2. **Add voice search** - Web Speech API integration
3. **Implement Pagefind** - For very large content volumes
4. **A/B test search interfaces** - Optimize user experience

## Success Metrics

### Search Performance
- **Search response time**: < 100ms for basic queries
- **Index size**: < 1MB for full documentation
- **Bundle impact**: < 50KB additional JavaScript

### User Experience
- **Search success rate**: > 80% of searches find relevant results
- **Search usage**: Track search frequency and popular queries
- **Mobile usage**: Ensure good mobile search experience

### Technical Metrics
- **Lighthouse impact**: No degradation in Lighthouse scores
- **Accessibility**: WCAG 2.1 AA compliant search interface
- **Performance**: No impact on page load times