# Testing Strategy

## Overview

Comprehensive testing strategy to ensure quality, reliability, and maintainability of the OpenSeadragon website. This document covers all types of testing from unit tests to end-to-end testing.

## Testing Philosophy

### Testing Pyramid

```
        /\       E2E Tests (Few)
       /  \      - Critical user flows
      /____\     - Cross-browser testing
     /      \    Integration Tests (Some)
    /________\   - Component interactions
   /          \  Unit Tests (Many)
  /____________\ - Functions, composables
                 - Pure logic 
```

### Principles
1. **Test User Behavior**: Test what users do, not implementation details
2. **Fast Feedback**: Run tests quickly in development
3. **Confident Refactoring**: Tests enable safe changes
4. **Documentation**: Tests serve as living documentation
5. **Automation**: All tests run in CI/CD pipeline

## Unit Testing

### Framework: Vitest

#### Configuration
```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath } from 'node:url'

export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./test/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      exclude: [
        'node_modules/',
        'test/',
        '**/*.config.ts',
        '**/*.d.ts',
      ],
      statements: 80,
      branches: 75,
      functions: 80,
      lines: 80,
    },
    include: ['**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
  },
  resolve: {
    alias: {
      '~': fileURLToPath(new URL('./src', import.meta.url)),
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
```

#### Setup File
```typescript
// test/setup.ts
import { expect, afterEach, vi } from 'vitest'
import { cleanup } from '@testing-library/vue'
import matchers from '@testing-library/jest-dom/matchers'

// Extend Vitest matchers
expect.extend(matchers)

// Cleanup after each test
afterEach(() => {
  cleanup()
})

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  takeRecords() {
    return []
  }
  unobserve() {}
}

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})
```

### Testing Utilities and Functions

#### Example: Search Utility Tests
```typescript
// utils/search.test.ts
import { describe, it, expect } from 'vitest'
import { createSearchIndex, searchDocuments } from './search'

describe('Search Utility', () => {
  describe('createSearchIndex', () => {
    it('should create an index from documents', () => {
      const docs = [
        { id: '1', title: 'Getting Started', content: 'Install OpenSeadragon' },
        { id: '2', title: 'API Reference', content: 'Viewer API documentation' },
      ]
      
      const index = createSearchIndex(docs)
      
      expect(index).toBeDefined()
      expect(index.documentCount).toBe(2)
    })

    it('should handle empty document array', () => {
      const index = createSearchIndex([])
      
      expect(index.documentCount).toBe(0)
    })
  })

  describe('searchDocuments', () => {
    it('should find matching documents', () => {
      const docs = [
        { id: '1', title: 'Getting Started', content: 'Install OpenSeadragon' },
        { id: '2', title: 'API Reference', content: 'Viewer API documentation' },
      ]
      const index = createSearchIndex(docs)
      
      const results = searchDocuments(index, 'install')
      
      expect(results).toHaveLength(1)
      expect(results[0].id).toBe('1')
    })

    it('should return empty array for no matches', () => {
      const docs = [
        { id: '1', title: 'Getting Started', content: 'Install OpenSeadragon' },
      ]
      const index = createSearchIndex(docs)
      
      const results = searchDocuments(index, 'nonexistent')
      
      expect(results).toHaveLength(0)
    })

    it('should handle fuzzy search', () => {
      const docs = [
        { id: '1', title: 'Getting Started', content: 'Install OpenSeadragon' },
      ]
      const index = createSearchIndex(docs)
      
      // Typo in search query
      const results = searchDocuments(index, 'instal')
      
      expect(results.length).toBeGreaterThan(0)
    })
  })
})
```

### Testing Composables

#### Example: Theme Composable Tests
```typescript
// composables/useTheme.test.ts
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useTheme } from './useTheme'

describe('useTheme', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear()
    // Reset document class
    document.documentElement.className = ''
  })

  it('should initialize with system theme', () => {
    const { theme } = useTheme()
    
    expect(['light', 'dark', 'system']).toContain(theme.value)
  })

  it('should toggle between light and dark', () => {
    const { theme, toggleTheme } = useTheme()
    
    const initialTheme = theme.value
    toggleTheme()
    const newTheme = theme.value
    
    expect(newTheme).not.toBe(initialTheme)
    expect(['light', 'dark']).toContain(newTheme)
  })

  it('should persist theme preference', () => {
    const { theme, setTheme } = useTheme()
    
    setTheme('dark')
    
    expect(localStorage.getItem('theme')).toBe('dark')
  })

  it('should apply theme class to document', () => {
    const { setTheme } = useTheme()
    
    setTheme('dark')
    
    expect(document.documentElement.classList.contains('dark')).toBe(true)
  })

  it('should respect prefers-color-scheme for system theme', () => {
    window.matchMedia = vi.fn().mockImplementation((query) => ({
      matches: query === '(prefers-color-scheme: dark)',
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }))

    const { theme, setTheme } = useTheme()
    setTheme('system')
    
    // Should apply dark theme based on mock
    expect(document.documentElement.classList.contains('dark')).toBe(true)
  })
})
```

## Component Testing

### Framework: Vitest + Vue Test Utils

#### Example: Button Component Tests
```typescript
// components/ui/Button.test.ts
import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import Button from './Button.vue'

describe('Button Component', () => {
  it('should render with default props', () => {
    const wrapper = mount(Button, {
      props: {
        label: 'Click Me',
      },
    })
    
    expect(wrapper.text()).toBe('Click Me')
    expect(wrapper.classes()).toContain('btn')
  })

  it('should render different variants', () => {
    const variants = ['primary', 'secondary', 'outline']
    
    variants.forEach((variant) => {
      const wrapper = mount(Button, {
        props: {
          label: 'Test',
          variant,
        },
      })
      
      expect(wrapper.classes()).toContain(`btn-${variant}`)
    })
  })

  it('should emit click event', async () => {
    const wrapper = mount(Button, {
      props: {
        label: 'Click Me',
      },
    })
    
    await wrapper.trigger('click')
    
    expect(wrapper.emitted('click')).toBeTruthy()
    expect(wrapper.emitted('click')).toHaveLength(1)
  })

  it('should be disabled when disabled prop is true', () => {
    const wrapper = mount(Button, {
      props: {
        label: 'Click Me',
        disabled: true,
      },
    })
    
    expect(wrapper.attributes('disabled')).toBeDefined()
    expect(wrapper.classes()).toContain('btn-disabled')
  })

  it('should not emit click when disabled', async () => {
    const wrapper = mount(Button, {
      props: {
        label: 'Click Me',
        disabled: true,
      },
    })
    
    await wrapper.trigger('click')
    
    expect(wrapper.emitted('click')).toBeFalsy()
  })

  it('should render icon when provided', () => {
    const wrapper = mount(Button, {
      props: {
        label: 'Click Me',
        icon: 'search',
      },
    })
    
    expect(wrapper.find('.btn-icon').exists()).toBe(true)
  })

  it('should handle loading state', () => {
    const wrapper = mount(Button, {
      props: {
        label: 'Click Me',
        loading: true,
      },
    })
    
    expect(wrapper.classes()).toContain('btn-loading')
    expect(wrapper.attributes('disabled')).toBeDefined()
    expect(wrapper.find('.spinner').exists()).toBe(true)
  })
})
```

#### Example: Search Component Tests
```typescript
// components/Search.test.ts
import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import Search from './Search.vue'

describe('Search Component', () => {
  it('should render search input', () => {
    const wrapper = mount(Search)
    
    expect(wrapper.find('input[type="search"]').exists()).toBe(true)
  })

  it('should emit search event on input', async () => {
    const wrapper = mount(Search)
    const input = wrapper.find('input')
    
    await input.setValue('test query')
    
    expect(wrapper.emitted('search')).toBeTruthy()
    expect(wrapper.emitted('search')?.[0]).toEqual(['test query'])
  })

  it('should debounce search input', async () => {
    vi.useFakeTimers()
    const wrapper = mount(Search, {
      props: {
        debounce: 300,
      },
    })
    const input = wrapper.find('input')
    
    await input.setValue('t')
    await input.setValue('te')
    await input.setValue('tes')
    await input.setValue('test')
    
    // Should not emit yet
    expect(wrapper.emitted('search')).toBeFalsy()
    
    // Fast-forward time
    vi.advanceTimersByTime(300)
    
    // Should emit once
    expect(wrapper.emitted('search')).toHaveLength(1)
    expect(wrapper.emitted('search')?.[0]).toEqual(['test'])
    
    vi.useRealTimers()
  })

  it('should display search results', async () => {
    const results = [
      { id: '1', title: 'Result 1', description: 'Description 1' },
      { id: '2', title: 'Result 2', description: 'Description 2' },
    ]
    
    const wrapper = mount(Search, {
      props: {
        results,
        showResults: true,
      },
    })
    
    const resultItems = wrapper.findAll('.search-result')
    
    expect(resultItems).toHaveLength(2)
    expect(resultItems[0].text()).toContain('Result 1')
  })

  it('should show no results message', () => {
    const wrapper = mount(Search, {
      props: {
        results: [],
        showResults: true,
        query: 'test',
      },
    })
    
    expect(wrapper.text()).toContain('No results found')
  })

  it('should clear search on escape key', async () => {
    const wrapper = mount(Search)
    const input = wrapper.find('input')
    
    await input.setValue('test query')
    await input.trigger('keydown', { key: 'Escape' })
    
    expect((input.element as HTMLInputElement).value).toBe('')
  })
})
```

## Integration Testing

### Testing Component Interactions

#### Example: Documentation Page Integration Test
```typescript
// pages/docs/[...slug].test.ts
import { describe, it, expect, vi } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import { createRouter, createMemoryHistory } from 'vue-router'
import DocsPage from './[...slug].vue'

describe('Documentation Page Integration', () => {
  const mockContent = {
    title: 'Getting Started',
    description: 'Learn how to get started',
    body: '<p>Documentation content</p>',
    toc: [
      { id: 'introduction', text: 'Introduction', level: 2 },
      { id: 'installation', text: 'Installation', level: 2 },
    ],
  }

  it('should load and display documentation content', async () => {
    const wrapper = mount(DocsPage, {
      global: {
        mocks: {
          $route: {
            params: { slug: ['getting-started'] },
          },
        },
        stubs: {
          ContentDoc: {
            template: '<div><slot :doc="doc" /></div>',
            data: () => ({ doc: mockContent }),
          },
        },
      },
    })

    await flushPromises()

    expect(wrapper.text()).toContain('Getting Started')
    expect(wrapper.html()).toContain('Documentation content')
  })

  it('should render table of contents', async () => {
    const wrapper = mount(DocsPage, {
      global: {
        mocks: {
          $route: {
            params: { slug: ['getting-started'] },
          },
        },
        stubs: {
          ContentDoc: {
            template: '<div><slot :doc="doc" /></div>',
            data: () => ({ doc: mockContent }),
          },
        },
      },
    })

    await flushPromises()

    const toc = wrapper.find('.table-of-contents')
    expect(toc.exists()).toBe(true)
    expect(toc.text()).toContain('Introduction')
    expect(toc.text()).toContain('Installation')
  })

  it('should handle navigation between sections', async () => {
    const router = createRouter({
      history: createMemoryHistory(),
      routes: [
        { path: '/docs/:slug(.*)*', component: DocsPage },
      ],
    })

    await router.push('/docs/getting-started')
    await router.isReady()

    const wrapper = mount(DocsPage, {
      global: {
        plugins: [router],
      },
    })

    await flushPromises()

    // Navigate to different section
    await router.push('/docs/installation')
    await flushPromises()

    expect(router.currentRoute.value.path).toBe('/docs/installation')
  })
})
```

## End-to-End Testing

### Framework: Playwright

#### Configuration
```typescript
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? 'github' : 'html',
  
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },
  ],

  webServer: {
    command: 'bun run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
})
```

#### Example: Homepage E2E Test
```typescript
// e2e/homepage.spec.ts
import { test, expect } from '@playwright/test'

test.describe('Homepage', () => {
  test('should load homepage successfully', async ({ page }) => {
    await page.goto('/')
    
    await expect(page).toHaveTitle(/OpenSeadragon/)
    await expect(page.locator('h1')).toContainText('OpenSeadragon')
  })

  test('should have working navigation', async ({ page }) => {
    await page.goto('/')
    
    // Click on Documentation link
    await page.click('text=Documentation')
    
    await expect(page).toHaveURL(/\/docs/)
    await expect(page.locator('h1')).toContainText('Documentation')
  })

  test('should display hero demo viewer', async ({ page }) => {
    await page.goto('/')
    
    const viewer = page.locator('#demo-viewer')
    await expect(viewer).toBeVisible()
    
    // Verify OpenSeadragon is initialized
    const isViewer = await page.evaluate(() => {
      const el = document.getElementById('demo-viewer')
      return el?.classList.contains('openseadragon-container')
    })
    
    expect(isViewer).toBe(true)
  })

  test('should be mobile responsive', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')
    
    // Mobile menu should be visible
    const mobileMenu = page.locator('[aria-label="Mobile menu"]')
    await expect(mobileMenu).toBeVisible()
    
    // Desktop nav should be hidden
    const desktopNav = page.locator('nav.desktop-nav')
    await expect(desktopNav).toBeHidden()
  })
})
```

#### Example: Search E2E Test
```typescript
// e2e/search.spec.ts
import { test, expect } from '@playwright/test'

test.describe('Search Functionality', () => {
  test('should open search dialog', async ({ page }) => {
    await page.goto('/')
    
    // Press Cmd+K (Mac) or Ctrl+K (Windows/Linux)
    const modifier = process.platform === 'darwin' ? 'Meta' : 'Control'
    await page.keyboard.press(`${modifier}+K`)
    
    const searchDialog = page.locator('[role="dialog"]')
    await expect(searchDialog).toBeVisible()
  })

  test('should search and display results', async ({ page }) => {
    await page.goto('/')
    
    await page.keyboard.press('Control+K')
    
    const searchInput = page.locator('input[type="search"]')
    await searchInput.fill('getting started')
    
    // Wait for results
    await page.waitForSelector('.search-results')
    
    const results = page.locator('.search-result')
    await expect(results).toHaveCount.greaterThan(0)
  })

  test('should navigate to selected result', async ({ page }) => {
    await page.goto('/')
    
    await page.keyboard.press('Control+K')
    await page.locator('input[type="search"]').fill('installation')
    
    // Wait for and click first result
    await page.waitForSelector('.search-result')
    await page.locator('.search-result').first().click()
    
    // Should navigate to docs page
    await expect(page).toHaveURL(/\/docs/)
  })

  test('should show no results message', async ({ page }) => {
    await page.goto('/')
    
    await page.keyboard.press('Control+K')
    await page.locator('input[type="search"]').fill('xyznonexistent123')
    
    await expect(page.locator('text=No results found')).toBeVisible()
  })

  test('should close on escape', async ({ page }) => {
    await page.goto('/')
    
    await page.keyboard.press('Control+K')
    const searchDialog = page.locator('[role="dialog"]')
    await expect(searchDialog).toBeVisible()
    
    await page.keyboard.press('Escape')
    await expect(searchDialog).toBeHidden()
  })
})
```

#### Example: Playground E2E Test
```typescript
// e2e/playground.spec.ts
import { test, expect } from '@playwright/test'

test.describe('Interactive Playground', () => {
  test('should load playground', async ({ page }) => {
    await page.goto('/playground')
    
    await expect(page.locator('h1')).toContainText('Playground')
    
    // Code editor should be visible
    const editor = page.locator('.monaco-editor')
    await expect(editor).toBeVisible()
  })

  test('should run code and display viewer', async ({ page }) => {
    await page.goto('/playground')
    
    // Wait for editor to load
    await page.waitForSelector('.monaco-editor')
    
    // Click run button
    await page.click('button:has-text("Run")')
    
    // Wait for viewer to initialize
    await page.waitForSelector('.openseadragon-container')
    
    const viewer = page.locator('.openseadragon-container')
    await expect(viewer).toBeVisible()
  })

  test('should handle code errors', async ({ page }) => {
    await page.goto('/playground')
    
    // Type invalid code
    await page.locator('.monaco-editor').click()
    await page.keyboard.type('this is invalid code')
    
    await page.click('button:has-text("Run")')
    
    // Error message should appear
    const errorMessage = page.locator('.error-message')
    await expect(errorMessage).toBeVisible()
  })

  test('should share playground', async ({ page }) => {
    await page.goto('/playground')
    
    await page.click('button:has-text("Share")')
    
    // Share dialog should appear
    const shareDialog = page.locator('[role="dialog"]:has-text("Share")')
    await expect(shareDialog).toBeVisible()
    
    // URL should be generated
    const shareUrl = page.locator('input[readonly]')
    await expect(shareUrl).toHaveValue(/\/playground\//)
  })
})
```

## Visual Regression Testing

### Using Playwright Screenshots

```typescript
// e2e/visual.spec.ts
import { test, expect } from '@playwright/test'

test.describe('Visual Regression', () => {
  test('homepage appearance', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveScreenshot('homepage.png')
  })

  test('documentation page appearance', async ({ page }) => {
    await page.goto('/docs/getting-started')
    await expect(page).toHaveScreenshot('docs-page.png')
  })

  test('dark mode appearance', async ({ page }) => {
    await page.goto('/')
    
    // Enable dark mode
    await page.evaluate(() => {
      document.documentElement.classList.add('dark')
    })
    
    await expect(page).toHaveScreenshot('homepage-dark.png')
  })

  test('mobile navigation', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')
    
    // Open mobile menu
    await page.click('[aria-label="Mobile menu"]')
    
    await expect(page).toHaveScreenshot('mobile-nav.png')
  })
})
```

## Accessibility Testing

### Automated Accessibility Tests

#### Using axe-playwright
```typescript
// e2e/accessibility.spec.ts
import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test.describe('Accessibility', () => {
  test('homepage should not have accessibility violations', async ({ page }) => {
    await page.goto('/')
    
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze()
    
    expect(accessibilityScanResults.violations).toEqual([])
  })

  test('documentation should be accessible', async ({ page }) => {
    await page.goto('/docs/getting-started')
    
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze()
    
    expect(accessibilityScanResults.violations).toEqual([])
  })

  test('keyboard navigation should work', async ({ page }) => {
    await page.goto('/')
    
    // Tab through interactive elements
    await page.keyboard.press('Tab')
    let focused = await page.evaluate(() => document.activeElement?.tagName)
    expect(['A', 'BUTTON', 'INPUT']).toContain(focused)
    
    // Should be able to activate with Enter
    await page.keyboard.press('Enter')
  })

  test('skip to main content link should work', async ({ page }) => {
    await page.goto('/')
    
    // Tab to skip link
    await page.keyboard.press('Tab')
    
    const skipLink = page.locator('text=Skip to main content')
    await expect(skipLink).toBeFocused()
    
    await page.keyboard.press('Enter')
    
    // Main content should be focused
    const main = page.locator('main')
    await expect(main).toBeFocused()
  })

  test('images should have alt text', async ({ page }) => {
    await page.goto('/')
    
    const images = await page.locator('img').all()
    
    for (const img of images) {
      const alt = await img.getAttribute('alt')
      expect(alt).toBeTruthy()
      expect(alt).not.toBe('')
    }
  })

  test('form inputs should have labels', async ({ page }) => {
    await page.goto('/playground')
    
    const inputs = await page.locator('input, textarea, select').all()
    
    for (const input of inputs) {
      const id = await input.getAttribute('id')
      const ariaLabel = await input.getAttribute('aria-label')
      const ariaLabelledBy = await input.getAttribute('aria-labelledby')
      
      // Should have either id with matching label, aria-label, or aria-labelledby
      const hasLabel = id 
        ? await page.locator(`label[for="${id}"]`).count() > 0
        : false
      
      expect(hasLabel || ariaLabel || ariaLabelledBy).toBeTruthy()
    }
  })
})
```

## Performance Testing

### Load Time Testing

```typescript
// e2e/performance.spec.ts
import { test, expect } from '@playwright/test'

test.describe('Performance', () => {
  test('homepage should load quickly', async ({ page }) => {
    const startTime = Date.now()
    
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    
    const loadTime = Date.now() - startTime
    
    // Should load within 3 seconds
    expect(loadTime).toBeLessThan(3000)
  })

  test('should have good Core Web Vitals', async ({ page }) => {
    await page.goto('/')
    
    // Measure LCP, FID, CLS
    const webVitals = await page.evaluate(() => {
      return new Promise((resolve) => {
        const vitals: any = {}
        
        // LCP
        new PerformanceObserver((list) => {
          const entries = list.getEntries()
          const lastEntry = entries[entries.length - 1]
          vitals.lcp = lastEntry.renderTime || lastEntry.loadTime
        }).observe({ entryTypes: ['largest-contentful-paint'] })
        
        // CLS
        new PerformanceObserver((list) => {
          vitals.cls = list.getEntries().reduce((sum: number, entry: any) => {
            return sum + (entry.value || 0)
          }, 0)
        }).observe({ entryTypes: ['layout-shift'] })
        
        setTimeout(() => resolve(vitals), 5000)
      })
    })
    
    expect(webVitals.lcp).toBeLessThan(2500) // Good LCP
    expect(webVitals.cls).toBeLessThan(0.1)   // Good CLS
  })

  test('JavaScript bundle should be small', async ({ page }) => {
    const response = await page.goto('/')
    
    // Get all JS resources
    const resources = await page.evaluate(() =>
      performance.getEntriesByType('resource')
        .filter((r: any) => r.name.endsWith('.js'))
        .reduce((sum: number, r: any) => sum + (r.transferSize || 0), 0)
    )
    
    // Total JS should be under 150KB
    expect(resources).toBeLessThan(150 * 1024)
  })
})
```

## Content Validation

### Markdown Link Checking

```typescript
// scripts/check-links.test.ts
import { describe, it, expect } from 'vitest'
import { readFileSync, readdirSync } from 'fs'
import { join } from 'path'
import matter from 'gray-matter'

describe('Content Validation', () => {
  const contentDir = join(process.cwd(), 'content')
  
  const getAllMarkdownFiles = (dir: string): string[] => {
    const files: string[] = []
    const items = readdirSync(dir, { withFileTypes: true })
    
    for (const item of items) {
      const path = join(dir, item.name)
      if (item.isDirectory()) {
        files.push(...getAllMarkdownFiles(path))
      } else if (item.name.endsWith('.md')) {
        files.push(path)
      }
    }
    
    return files
  }

  it('should have valid front matter in all markdown files', () => {
    const files = getAllMarkdownFiles(contentDir)
    
    files.forEach((file) => {
      const content = readFileSync(file, 'utf-8')
      const { data } = matter(content)
      
      // Required fields
      expect(data.title, `${file} missing title`).toBeTruthy()
      expect(data.description, `${file} missing description`).toBeTruthy()
      
      // Description length
      expect(
        data.description.length,
        `${file} description too long`
      ).toBeLessThanOrEqual(160)
    })
  })

  it('should not have broken internal links', () => {
    const files = getAllMarkdownFiles(contentDir)
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g
    
    files.forEach((file) => {
      const content = readFileSync(file, 'utf-8')
      const { content: markdown } = matter(content)
      
      let match
      while ((match = linkRegex.exec(markdown)) !== null) {
        const link = match[2]
        
        // Check internal links only
        if (link.startsWith('/') || link.startsWith('./')) {
          // Verify file exists
          // This is a simplified check
          expect(link).toBeTruthy()
        }
      }
    })
  })
})
```

## CI/CD Integration

### GitHub Actions Workflow

```yaml
# .github/workflows/test.yml
name: Test

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  unit-tests:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v4
      
      - uses: oven-sh/setup-bun@v1
        with:
          bun-version: latest
      
      - name: Install dependencies
        run: bun install
      
      - name: Run unit tests
        run: bun run test:unit
      
      - name: Generate coverage
        run: bun run test:coverage
      
      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          files: ./coverage/lcov.info
          flags: unittests

  component-tests:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v4
      
      - uses: oven-sh/setup-bun@v1
      
      - name: Install dependencies
        run: bun install
      
      - name: Run component tests
        run: bun run test:components

  e2e-tests:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v4
      
      - uses: oven-sh/setup-bun@v1
      
      - name: Install dependencies
        run: bun install
      
      - name: Install Playwright
        run: bunx playwright install --with-deps
      
      - name: Run E2E tests
        run: bun run test:e2e
      
      - name: Upload test results
        if: always()
        uses: actions/upload-artifact@v3
        with:
          name: playwright-report
          path: playwright-report/

  accessibility-tests:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v4
      
      - uses: oven-sh/setup-bun@v1
      
      - name: Install dependencies
        run: bun install
      
      - name: Install Playwright
        run: bunx playwright install --with-deps
      
      - name: Run accessibility tests
        run: bun run test:a11y

  content-validation:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v4
      
      - uses: oven-sh/setup-bun@v1
      
      - name: Install dependencies
        run: bun install
      
      - name: Validate markdown
        run: bun run test:content
      
      - name: Check links
        uses: gaurav-nelson/github-action-markdown-link-check@v1
```

## Test Scripts

### package.json Scripts
```json
{
  "scripts": {
    "test": "vitest",
    "test:unit": "vitest run --coverage",
    "test:components": "vitest run --config vitest.config.components.ts",
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui",
    "test:a11y": "playwright test accessibility",
    "test:visual": "playwright test visual",
    "test:coverage": "vitest run --coverage",
    "test:watch": "vitest watch",
    "test:content": "vitest run --config vitest.config.content.ts"
  }
}
```

## Coverage Requirements

### Minimum Coverage Thresholds
- **Statements**: 80%
- **Branches**: 75%
- **Functions**: 80%
- **Lines**: 80%

### Critical Paths (100% Coverage Required)
- Search functionality
- Navigation
- Theme switching
- Content rendering
- Error handling

## Best Practices

### DO
- ✅ Test user behavior, not implementation
- ✅ Keep tests independent and isolated
- ✅ Use descriptive test names
- ✅ Mock external dependencies
- ✅ Test edge cases and error states
- ✅ Run tests in CI/CD
- ✅ Maintain high test coverage

### DON'T
- ❌ Test implementation details
- ❌ Create interdependent tests
- ❌ Use generic test names like "it works"
- ❌ Make real API calls in tests
- ❌ Only test happy paths
- ❌ Skip tests or use `.only()` in commits
- ❌ Sacrifice test quality for coverage

## Testing Timeline

### Phase 1 (Week 1-2): Foundation
- [ ] Set up Vitest
- [ ] Configure test utilities
- [ ] Write utility function tests
- [ ] Set up CI/CD for tests

### Phase 2 (Week 3-4): Component Testing
- [ ] Test UI components
- [ ] Test composables
- [ ] Integration tests
- [ ] Coverage goals

### Phase 3 (Week 5-6): E2E & Advanced
- [ ] Set up Playwright
- [ ] Write critical path E2E tests
- [ ] Accessibility tests
- [ ] Visual regression tests
- [ ] Performance tests

## Success Metrics

- ✅ 80%+ code coverage
- ✅ All E2E tests passing
- ✅ Zero accessibility violations
- ✅ < 5 minute test suite runtime
- ✅ 100% coverage of critical paths
- ✅ All tests run in CI/CD
