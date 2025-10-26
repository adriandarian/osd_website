# Monitoring & Analytics

## Overview

Comprehensive monitoring and analytics strategy to track site performance, user behavior, and system health while respecting user privacy and maintaining transparency.

## Performance Monitoring

### Real User Monitoring (RUM)

#### Core Web Vitals Tracking
```typescript
// composables/useWebVitals.ts
export const useWebVitals = () => {
  const reportMetric = (metric: Metric) => {
    // Send to analytics service
    if (import.meta.env.PROD) {
      analytics.track('web-vitals', {
        name: metric.name,
        value: metric.value,
        rating: metric.rating,
        id: metric.id,
      })
    }
  }

  onCLS(reportMetric)  // Cumulative Layout Shift
  onFID(reportMetric)  // First Input Delay
  onLCP(reportMetric)  // Largest Contentful Paint
  onFCP(reportMetric)  // First Contentful Paint
  onTTFB(reportMetric) // Time to First Byte
}
```

#### Performance Metrics to Track
- **Loading Performance**
  - First Contentful Paint (FCP)
  - Largest Contentful Paint (LCP)
  - Time to Interactive (TTI)
  - Time to First Byte (TTFB)
  - Total Blocking Time (TBT)

- **Runtime Performance**
  - First Input Delay (FID)
  - Interaction to Next Paint (INP)
  - JavaScript execution time
  - Long tasks (>50ms)

- **Visual Stability**
  - Cumulative Layout Shift (CLS)
  - Layout shift occurrences
  - Viewport size distribution

- **Network Performance**
  - Resource loading times
  - Failed resource loads
  - Cache hit rates
  - Connection type distribution

### Performance Budgets

#### Monitoring Thresholds
```typescript
// performance.config.ts
export const performanceBudgets = {
  vitals: {
    LCP: { good: 2500, poor: 4000 },
    FID: { good: 100, poor: 300 },
    CLS: { good: 0.1, poor: 0.25 },
    FCP: { good: 1800, poor: 3000 },
    TTFB: { good: 800, poor: 1800 },
  },
  budgets: {
    javascript: { max: 100 * 1024, warn: 80 * 1024 }, // KB
    css: { max: 50 * 1024, warn: 40 * 1024 },
    images: { max: 500 * 1024, warn: 400 * 1024 },
    fonts: { max: 100 * 1024, warn: 80 * 1024 },
    total: { max: 750 * 1024, warn: 600 * 1024 },
  },
  metrics: {
    lighthouse: { min: 90 },
    requests: { max: 50 },
    domSize: { max: 1500 },
  },
}
```

### Lighthouse CI Integration

#### GitHub Actions Workflow
```yaml
# .github/workflows/lighthouse-ci.yml
name: Lighthouse CI

on:
  pull_request:
    branches: [main]
  push:
    branches: [main]

jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      
      - name: Install dependencies
        run: bun install
      
      - name: Build site
        run: bun run generate
      
      - name: Run Lighthouse CI
        uses: treosh/lighthouse-ci-action@v11
        with:
          urls: |
            http://localhost:3000/
            http://localhost:3000/docs/getting-started
            http://localhost:3000/examples/
            http://localhost:3000/playground/
          uploadArtifacts: true
          temporaryPublicStorage: true
          configPath: '.lighthouserc.json'
```

#### Lighthouse Configuration
```json
// .lighthouserc.json
{
  "ci": {
    "collect": {
      "numberOfRuns": 3,
      "settings": {
        "preset": "desktop",
        "throttling": {
          "cpuSlowdownMultiplier": 1
        }
      }
    },
    "assert": {
      "preset": "lighthouse:recommended",
      "assertions": {
        "categories:performance": ["error", { "minScore": 0.9 }],
        "categories:accessibility": ["error", { "minScore": 0.9 }],
        "categories:best-practices": ["error", { "minScore": 0.9 }],
        "categories:seo": ["error", { "minScore": 0.9 }],
        "first-contentful-paint": ["error", { "maxNumericValue": 2000 }],
        "largest-contentful-paint": ["error", { "maxNumericValue": 2500 }],
        "cumulative-layout-shift": ["error", { "maxNumericValue": 0.1 }],
        "total-blocking-time": ["error", { "maxNumericValue": 300 }]
      }
    },
    "upload": {
      "target": "temporary-public-storage"
    }
  }
}
```

## Error Tracking

### Client-Side Error Monitoring

#### Error Tracking Setup
```typescript
// plugins/error-tracking.client.ts
export default defineNuxtPlugin((nuxtApp) => {
  // Global error handler
  nuxtApp.vueApp.config.errorHandler = (error, instance, info) => {
    console.error('Vue error:', error, info)
    
    // Track error
    trackError({
      type: 'vue-error',
      error: error.message,
      stack: error.stack,
      componentName: instance?.$options?.name,
      info,
      url: window.location.href,
      userAgent: navigator.userAgent,
    })
  }

  // Global promise rejection handler
  window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason)
    
    trackError({
      type: 'unhandled-rejection',
      error: event.reason?.message || String(event.reason),
      stack: event.reason?.stack,
      url: window.location.href,
    })
  })

  // Resource loading errors
  window.addEventListener('error', (event) => {
    if (event.target !== window) {
      trackError({
        type: 'resource-error',
        resource: event.target?.src || event.target?.href,
        url: window.location.href,
      })
    }
  }, true)
})
```

#### Error Categories to Track
- **JavaScript Errors**
  - Syntax errors
  - Runtime errors
  - Type errors
  - Reference errors

- **Resource Loading Errors**
  - Failed script loads
  - Failed stylesheet loads
  - Failed image loads
  - Failed font loads

- **API/Network Errors**
  - Failed fetch requests
  - Timeout errors
  - CORS errors

- **User Experience Errors**
  - Interaction failures
  - Form submission errors
  - Navigation errors

### Error Reporting Dashboard

#### Metrics to Monitor
- Error frequency and trends
- Error types distribution
- Affected users/sessions
- Browser/device breakdown
- Page/route with most errors
- Time to resolution

## Usage Analytics

### Privacy-First Analytics

#### Recommended Solutions
1. **Plausible Analytics** (Preferred)
   - Open source
   - Privacy-friendly (no cookies)
   - GDPR compliant by default
   - Lightweight (<1KB script)
   - Simple, focused metrics

2. **Fathom Analytics**
   - Privacy-first
   - GDPR/CCPA compliant
   - Fast loading
   - Simple dashboard

3. **Self-Hosted Umami**
   - Full data ownership
   - Open source
   - Privacy-focused
   - Can host on own infrastructure

#### Implementation (Plausible)
```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  app: {
    head: {
      script: [
        {
          defer: true,
          'data-domain': 'openseadragon.github.io',
          src: 'https://plausible.io/js/script.js',
        },
      ],
    },
  },
})
```

```typescript
// composables/useAnalytics.ts
export const useAnalytics = () => {
  const trackEvent = (eventName: string, props?: Record<string, any>) => {
    if (typeof window !== 'undefined' && window.plausible) {
      window.plausible(eventName, { props })
    }
  }

  const trackPageview = (url?: string) => {
    if (typeof window !== 'undefined' && window.plausible) {
      window.plausible('pageview', { url })
    }
  }

  return {
    trackEvent,
    trackPageview,
  }
}
```

### Key Metrics to Track

#### Traffic Metrics
- **Page Views**: Total and unique
- **Visitors**: Unique visitors over time
- **Sessions**: User session duration and frequency
- **Bounce Rate**: Single-page sessions
- **Traffic Sources**: Direct, referral, search, social

#### Content Metrics
- **Popular Pages**: Most visited pages
- **Documentation Views**: Most accessed docs
- **Example Popularity**: Which examples get most views
- **Search Terms**: What users search for
- **Download Stats**: API/plugin downloads

#### Engagement Metrics
- **Time on Page**: Average session duration
- **Scroll Depth**: How far users scroll
- **Interactive Elements**: Button clicks, tab switches
- **Playground Usage**: Creation, sharing rates
- **Code Copy Events**: Documentation code snippets copied

#### Technical Metrics
- **Browser Distribution**: Chrome, Firefox, Safari, etc.
- **Device Types**: Desktop, mobile, tablet
- **Screen Resolutions**: Viewport sizes
- **Operating Systems**: Windows, macOS, Linux, etc.
- **Geographic Distribution**: Country/region breakdown

### Custom Event Tracking

#### Implementation
```typescript
// Example usage in components
const { trackEvent } = useAnalytics()

// Track example interactions
const openExample = (exampleName: string) => {
  trackEvent('open-example', { example: exampleName })
}

// Track playground actions
const createPlayground = () => {
  trackEvent('playground-create')
}

const sharePlayground = (method: string) => {
  trackEvent('playground-share', { method })
}

// Track search behavior
const performSearch = (query: string, resultsCount: number) => {
  trackEvent('search', { 
    query: query.length, // Don't track actual query for privacy
    results: resultsCount 
  })
}

// Track documentation navigation
const navigateToDoc = (section: string) => {
  trackEvent('doc-navigate', { section })
}

// Track code copy events
const copyCode = (language: string, context: string) => {
  trackEvent('code-copy', { language, context })
}

// Track external links
const clickExternalLink = (destination: string) => {
  trackEvent('outbound-link', { to: destination })
}
```

## Uptime Monitoring

### GitHub Pages Availability

#### Monitoring Services
- **UptimeRobot** (Free tier available)
  - Monitor up to 50 URLs
  - 5-minute check intervals
  - Email/SMS alerts
  - Status page

- **Upptime** (Free, self-hosted)
  - GitHub Actions-based
  - Completely free
  - Public status page
  - Historical data in repository

#### Upptime Setup
```yaml
# .github/workflows/uptime.yml
name: Uptime CI

on:
  schedule:
    - cron: "*/5 * * * *"  # Every 5 minutes
  workflow_dispatch:

jobs:
  update:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Check website status
        uses: upptime/uptime-monitor@v1
        with:
          command: "update"
        env:
          GH_PAT: ${{ secrets.GH_PAT }}
```

```yaml
# .upptimerc.yml
owner: adriandarian
repo: osd_website
sites:
  - name: OpenSeadragon Homepage
    url: https://openseadragon.github.io
  - name: Documentation
    url: https://openseadragon.github.io/docs
  - name: Examples
    url: https://openseadragon.github.io/examples
  - name: Playground
    url: https://openseadragon.github.io/playground

status-website:
  cname: status.openseadragon.github.io
  name: OpenSeadragon Status
  theme: light

assignees:
  - adriandarian

notifications:
  - type: email
    recipient: team@example.com
```

### Critical Endpoints to Monitor
- Homepage (/)
- Documentation (/docs)
- API Reference (/docs/api)
- Examples gallery (/examples)
- Playground (/playground)
- Search functionality
- Asset CDN availability

## Build Analytics

### CI/CD Performance Tracking

#### Metrics to Track
```typescript
// Track build performance
export interface BuildMetrics {
  // Build times
  totalBuildTime: number
  contentGenerationTime: number
  bundleTime: number
  optimizationTime: number
  deployTime: number

  // Bundle analysis
  totalBundleSize: number
  javascriptSize: number
  cssSize: number
  imagesSize: number
  numberOfChunks: number

  // Content metrics
  numberOfPages: number
  numberOfComponents: number
  markdownFilesProcessed: number

  // Dependencies
  dependencyCount: number
  outdatedDependencies: number
  vulnerabilities: number
}
```

#### GitHub Actions Tracking
```yaml
# .github/workflows/build-analytics.yml
name: Build Analytics

on:
  push:
    branches: [main]

jobs:
  analyze:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Track build time
        run: |
          START_TIME=$(date +%s)
          bun run generate
          END_TIME=$(date +%s)
          BUILD_TIME=$((END_TIME - START_TIME))
          echo "Build completed in ${BUILD_TIME} seconds"
          echo "build_time=${BUILD_TIME}" >> $GITHUB_OUTPUT
        id: build
      
      - name: Analyze bundle size
        run: |
          BUNDLE_SIZE=$(du -sb .output/public | cut -f1)
          echo "Total bundle size: ${BUNDLE_SIZE} bytes"
          echo "bundle_size=${BUNDLE_SIZE}" >> $GITHUB_OUTPUT
        id: bundle
      
      - name: Comment PR with metrics
        if: github.event_name == 'pull_request'
        uses: actions/github-script@v7
        with:
          script: |
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: `## 📊 Build Analytics\n\n- Build Time: ${{ steps.build.outputs.build_time }}s\n- Bundle Size: ${{ steps.bundle.outputs.bundle_size }} bytes`
            })
```

### Bundle Size Tracking

#### Size Limit Configuration
```json
// package.json
{
  "scripts": {
    "size": "size-limit",
    "size:why": "size-limit --why"
  },
  "size-limit": [
    {
      "name": "Initial JS bundle",
      "path": ".output/public/_nuxt/*.js",
      "limit": "100 KB"
    },
    {
      "name": "CSS bundle",
      "path": ".output/public/_nuxt/*.css",
      "limit": "50 KB"
    }
  ]
}
```

## Search Analytics

### Search Behavior Tracking

#### Metrics to Track
- **Search Volume**: Queries per day/week/month
- **Popular Queries**: Most common searches
- **No-Result Queries**: Searches with 0 results
- **Click-Through Rate**: Results clicked vs. searches
- **Search Refinement**: Query modifications
- **Search Depth**: How many results users browse

#### Implementation
```typescript
// composables/useSearchAnalytics.ts
export const useSearchAnalytics = () => {
  const trackSearch = (query: string, resultsCount: number) => {
    // Don't store actual query for privacy
    const metrics = {
      queryLength: query.length,
      wordCount: query.split(' ').length,
      resultsCount,
      hasResults: resultsCount > 0,
      timestamp: Date.now(),
    }
    
    // Send to analytics
    if (import.meta.env.PROD) {
      analytics.track('search-performed', metrics)
    }
  }

  const trackSearchClick = (resultPosition: number, resultType: string) => {
    analytics.track('search-result-click', {
      position: resultPosition,
      type: resultType,
    })
  }

  const trackNoResults = (queryLength: number) => {
    analytics.track('search-no-results', {
      queryLength,
    })
  }

  return {
    trackSearch,
    trackSearchClick,
    trackNoResults,
  }
}
```

### Search Quality Metrics
- Average results per query
- Percentage of zero-result searches
- Average time to click result
- Most searched but missing content
- Search vs. navigation usage

## Dashboard & Reporting

### Analytics Dashboard

#### Key Performance Indicators (KPIs)
```typescript
export interface SiteKPIs {
  // Traffic
  dailyVisitors: number
  weeklyVisitors: number
  monthlyVisitors: number
  visitorGrowth: number // percentage

  // Performance
  avgLoadTime: number
  p95LoadTime: number
  lighthouseScore: number
  coreWebVitals: {
    lcp: number
    fid: number
    cls: number
  }

  // Engagement
  avgSessionDuration: number
  bounceRate: number
  pagesPerSession: number
  returnVisitorRate: number

  // Content
  topPages: Array<{ path: string; views: number }>
  topExamples: Array<{ name: string; views: number }>
  searchVolume: number
  
  // Technical
  errorRate: number
  uptime: number
  buildSuccess: number
}
```

#### Weekly Report Template
```markdown
# OpenSeadragon Website - Weekly Report

## Period: [Start Date] - [End Date]

### 📈 Traffic Overview
- Total Visitors: XXX (±X% from last week)
- Total Pageviews: XXX
- Avg. Session Duration: X:XX
- Bounce Rate: XX%

### ⚡ Performance
- Avg. LCP: X.XXs
- Lighthouse Score: XX/100
- Error Rate: X.XX%
- Uptime: XX.XX%

### 📚 Content Performance
**Top 5 Pages:**
1. [Page Name] - XXX views
2. [Page Name] - XXX views
...

**Top 5 Examples:**
1. [Example Name] - XXX views
2. [Example Name] - XXX views
...

### 🔍 Search Insights
- Total Searches: XXX
- Avg. Results per Search: XX
- Zero-Result Rate: XX%

### 🐛 Issues
- New Errors: X
- Critical Issues: X
- Resolved: X

### 📊 Notable Events
- [Any significant changes or incidents]
```

### Monitoring Tools Summary

| Category | Tool | Purpose | Cost |
|----------|------|---------|------|
| Analytics | Plausible | Privacy-first analytics | Free/Paid |
| Performance | Lighthouse CI | Automated performance testing | Free |
| Uptime | Upptime | Status monitoring | Free |
| Errors | Custom tracking | Client-side error logging | Free |
| Build | GitHub Actions | CI/CD metrics | Free |
| Bundle Size | Size Limit | Bundle size tracking | Free |

## Privacy & Compliance

### Data Collection Principles
1. **Minimal Data Collection**: Only collect what's necessary
2. **No Personal Identifiable Information**: No tracking of individuals
3. **Transparent**: Clear privacy policy
4. **User Control**: Respect Do Not Track headers
5. **No Third-Party Tracking**: No advertising trackers

### Cookie Policy
```typescript
// No cookies required for privacy-first analytics
// If cookies become necessary:
export const cookieConsent = {
  necessary: true,  // Always allowed
  analytics: false, // Requires consent
  preferences: true, // Local storage for theme, etc.
}
```

## Implementation Timeline

### Phase 1 (Week 1-2): Foundation
- [ ] Set up Plausible Analytics
- [ ] Implement basic event tracking
- [ ] Configure Lighthouse CI
- [ ] Set up error tracking

### Phase 2 (Week 3-4): Advanced Monitoring
- [ ] Implement Web Vitals tracking
- [ ] Set up Upptime monitoring
- [ ] Create analytics dashboard
- [ ] Configure build analytics

### Phase 3 (Week 5-6): Optimization
- [ ] Add search analytics
- [ ] Implement custom events
- [ ] Set up automated reports
- [ ] Create alerting rules

## Success Metrics

### Monitoring Health Indicators
- ✅ 99.9% uptime target
- ✅ <100ms error tracking overhead
- ✅ <1KB analytics script size
- ✅ Zero PII collection
- ✅ Weekly automated reports
- ✅ <5 minute alert response time
