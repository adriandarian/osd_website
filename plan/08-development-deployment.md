# Development & Deployment

## Development Environment

### Prerequisites
- **Node.js**: 18+ (for Bun compatibility)
- **Bun**: Latest version (package manager)
- **Git**: Version control
- **VS Code**: Recommended editor
- **Browser**: Modern browser for testing

### Initial Setup

```bash
# Clone the repository
git clone https://github.com/adriandarian/osd_website.git
cd osd_website

# Install dependencies
bun install

# Start development server
bun run dev

# Open in browser
# http://localhost:3000
```

### Environment Variables

```bash
# .env
NUXT_PUBLIC_SITE_URL=https://openseadragon.github.io
NUXT_PUBLIC_GTM_ID=GTM-XXXXXXX  # Optional analytics
NODE_ENV=development
```

## Development Workflow

### Branch Strategy

```
main              # Production-ready code
├── develop       # Development branch
├── feature/*     # Feature branches
├── fix/*         # Bug fixes
└── docs/*        # Documentation updates
```

### Git Workflow

```bash
# Create feature branch
git checkout -b feature/interactive-playground

# Make changes and commit
git add .
git commit -m "feat: add Monaco editor to playground"

# Push to remote
git push origin feature/interactive-playground

# Create pull request on GitHub
```

### Commit Conventions

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add new feature
fix: bug fix
docs: documentation changes
style: formatting, missing semi colons, etc
refactor: code restructuring
perf: performance improvements
test: adding tests
chore: maintenance tasks
```

### Git Hooks (simple-git-hooks)

```json
// package.json
{
  "simple-git-hooks": {
    "pre-commit": "bun run lint && bun run typecheck",
    "pre-push": "bun run test",
    "commit-msg": "bun run commitlint"
  }
}
```

```bash
# Install git hooks
bun run prepare
```

## Development Commands

### Core Commands

```bash
# Development
bun run dev              # Start dev server (localhost:3000)
bun run dev:host         # Expose to network
bun run dev:https        # HTTPS development

# Building
bun run build            # Production build
bun run generate         # Generate static site
bun run preview          # Preview production build

# Quality
bun run lint             # Lint with oxlint
bun run lint:fix         # Fix linting issues
bun run typecheck        # TypeScript checking
bun run test             # Run tests
bun run test:watch       # Watch mode tests
bun run test:coverage    # Coverage report

# Analysis
bun run analyze          # Bundle analysis
bun run deps:check       # Check dependencies
bun run deps:update      # Update dependencies (taze)

# Content
bun run content:gen      # Generate content types
bun run content:validate # Validate content
```

### Custom Scripts

```json
// package.json
{
  "scripts": {
    "dev": "nuxt dev",
    "build": "nuxt build",
    "generate": "nuxt generate",
    "preview": "nuxt preview",
    "lint": "oxlint src",
    "lint:fix": "oxlint src --fix",
    "typecheck": "nuxt typecheck",
    "test": "vitest",
    "test:watch": "vitest --watch",
    "test:coverage": "vitest --coverage",
    "analyze": "ANALYZE=true nuxt build",
    "deps:check": "npx node-modules-inspector",
    "deps:update": "npx taze -i",
    "prepare": "simple-git-hooks",
    "clean": "rm -rf .nuxt .output node_modules/.cache"
  }
}
```

## Testing Strategy

### Unit Testing with Vitest

```typescript
// components/Button.test.ts
import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import Button from './Button.vue'

describe('Button', () => {
  it('renders properly', () => {
    const wrapper = mount(Button, {
      props: { label: 'Click me' }
    })
    expect(wrapper.text()).toContain('Click me')
  })

  it('emits click event', async () => {
    const wrapper = mount(Button)
    await wrapper.trigger('click')
    expect(wrapper.emitted()).toHaveProperty('click')
  })
})
```

### Component Testing with Nuxt Test Utils

```typescript
// tests/pages/index.test.ts
import { describe, it, expect } from 'vitest'
import { setup, $fetch } from '@nuxt/test-utils'

describe('Homepage', async () => {
  await setup({
    // Test context options
  })

  it('renders the homepage', async () => {
    const html = await $fetch('/')
    expect(html).toContain('OpenSeadragon')
  })
})
```

### E2E Testing (Future)

```typescript
// tests/e2e/playground.spec.ts
import { test, expect } from '@playwright/test'

test('playground editor works', async ({ page }) => {
  await page.goto('/playground')
  await page.fill('.monaco-editor', 'console.log("test")')
  await page.click('button[data-test="run"]')
  await expect(page.locator('.console-output')).toContain('test')
})
```

## CI/CD Pipeline

### GitHub Actions Workflow

```yaml
# .github/workflows/ci.yml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  quality:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - uses: oven-sh/setup-bun@v1
        with:
          bun-version: latest
      
      - name: Install dependencies
        run: bun install
      
      - name: Lint code
        run: bun run lint
      
      - name: Type check
        run: bun run typecheck
      
      - name: Run tests
        run: bun run test
      
      - name: Check dependencies
        run: bunx node-modules-inspector --ci

  build:
    needs: quality
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - uses: oven-sh/setup-bun@v1
      
      - name: Install dependencies
        run: bun install
      
      - name: Build site
        run: bun run generate
      
      - name: Bundle analysis
        run: bun run analyze
      
      - name: Upload bundle analysis
        uses: actions/upload-artifact@v3
        with:
          name: bundle-analysis
          path: dist/stats.html

  deploy:
    needs: build
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v4
      
      - uses: oven-sh/setup-bun@v1
      
      - name: Install dependencies
        run: bun install
      
      - name: Generate static site
        run: bun run generate
      
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./.output/public
          cname: openseadragon.github.io
```

### Automated Dependency Updates

```yaml
# .github/workflows/update-deps.yml
name: Update Dependencies

on:
  schedule:
    - cron: '0 0 * * 1'  # Weekly on Monday
  workflow_dispatch:

jobs:
  update:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - uses: oven-sh/setup-bun@v1
      
      - name: Update dependencies
        run: bunx taze major -w
      
      - name: Install updated dependencies
        run: bun install
      
      - name: Run tests
        run: bun run test
      
      - name: Create Pull Request
        uses: peter-evans/create-pull-request@v5
        with:
          commit-message: 'chore: update dependencies'
          title: 'chore: automated dependency updates'
          body: 'Automated dependency updates via taze'
          branch: deps/automated-updates
```

## GitHub Pages Deployment

### Nuxt Configuration for GitHub Pages

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  // Static site generation
  ssr: false,
  target: 'static',
  
  // GitHub Pages base URL
  app: {
    baseURL: process.env.NODE_ENV === 'production' ? '/' : '/',
    buildAssetsDir: '/_nuxt/'
  },
  
  // Generate configuration
  generate: {
    fallback: '404.html',
    routes: ['/'] // Add dynamic routes if needed
  },
  
  // Nitro configuration
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/sitemap.xml', '/robots.txt']
    }
  }
})
```

### Custom Domain Setup (Optional)

```bash
# Add CNAME file
echo "docs.openseadragon.com" > .output/public/CNAME
```

### Deploy Script

```json
// package.json
{
  "scripts": {
    "deploy": "bun run generate && gh-pages -d .output/public"
  }
}
```

## Monitoring & Analytics

### Performance Monitoring

```typescript
// plugins/monitoring.client.ts
export default defineNuxtPlugin(() => {
  if (typeof window !== 'undefined') {
    // Monitor Core Web Vitals
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(console.log)
      getFID(console.log)
      getFCP(console.log)
      getLCP(console.log)
      getTTFB(console.log)
    })
  }
})
```

### Error Tracking

```typescript
// plugins/error-tracking.client.ts
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.config.errorHandler = (error, instance, info) => {
    // Log to console in development
    console.error('Error:', error)
    console.log('Component:', instance)
    console.log('Info:', info)
    
    // Send to error tracking service in production
    if (process.env.NODE_ENV === 'production') {
      // Sentry, LogRocket, etc.
    }
  }
})
```

### Privacy-Friendly Analytics

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@nuxtjs/plausible'],
  plausible: {
    domain: 'openseadragon.github.io',
    apiHost: 'https://plausible.io'
  }
})
```

## Troubleshooting

### Common Issues

#### Port already in use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use different port
PORT=3001 bun run dev
```

#### Cache issues
```bash
# Clear all caches
bun run clean
rm -rf .nuxt .output node_modules/.cache
bun install
```

#### Type errors
```bash
# Regenerate types
bun run dev --clear
bun run typecheck
```

## Development Best Practices

### Code Quality
- ✅ Run linter before committing
- ✅ Write tests for new features
- ✅ Keep components small and focused
- ✅ Use TypeScript for type safety
- ✅ Document complex logic

### Performance
- ✅ Use lazy loading for heavy components
- ✅ Optimize images with Nuxt Image
- ✅ Monitor bundle size
- ✅ Avoid unnecessary re-renders
- ✅ Use computed properties for expensive operations

### Accessibility
- ✅ Use semantic HTML
- ✅ Provide alt text for images
- ✅ Ensure keyboard navigation
- ✅ Test with screen readers
- ✅ Maintain color contrast ratios

### Security
- ✅ Keep dependencies updated
- ✅ Sanitize user input
- ✅ Use environment variables for secrets
- ✅ Enable security headers
- ✅ Regular security audits