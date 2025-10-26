# Migration Strategy

## Overview

Comprehensive strategy for migrating from the current OpenSeadragon static website to the modernized Vue 3 + Nuxt implementation. This document covers content migration, URL preservation, SEO maintenance, and rollback procedures.

## Migration Phases

### Phase 1: Preparation (Weeks 1-2)
- Content audit and inventory
- URL mapping documentation
- Backup creation
- Parallel development environment

### Phase 2: Content Migration (Weeks 3-4)
- Convert HTML to Markdown
- Migrate examples
- Update assets
- Preserve metadata

### Phase 3: Testing & Validation (Week 5)
- Cross-browser testing
- Link validation
- SEO verification
- Performance testing

### Phase 4: Soft Launch (Week 6)
- Deploy to staging subdomain
- Community preview
- Gather feedback
- Bug fixes

### Phase 5: Full Migration (Week 7)
- DNS/routing updates
- Monitoring activation
- Rollback readiness

### Phase 6: Post-Migration (Week 8+)
- Monitor analytics
- Address issues
- Content refinement
- Legacy site sunset

## Current Site Inventory

### Content Audit

#### Pages Inventory
```yaml
pages:
  homepage:
    url: /
    type: landing
    priority: critical
    
  documentation:
    url: /docs/
    type: content-heavy
    pages: ~50
    priority: critical
    
  examples:
    url: /examples/
    type: interactive
    count: 30+
    priority: high
    
  plugins:
    url: /plugins/
    type: directory
    count: 50+
    priority: medium
    
  download:
    url: /download/
    type: info
    priority: medium
    
  about:
    url: /about/
    type: static
    priority: low
    
  community:
    url: /community/
    type: static
    priority: medium
```

#### Assets Inventory
```yaml
assets:
  images:
    count: ~100
    formats: [png, jpg, gif]
    location: /images/
    
  scripts:
    count: ~20
    location: /js/
    
  stylesheets:
    count: ~10
    location: /css/
    
  examples:
    dzi_images: ~30
    locations: [/dzimages/, /examples/images/]
    
  downloads:
    openseadragon_js: latest versions
    location: /build/
```

## URL Mapping & Redirects

### URL Preservation Strategy

#### Direct Mappings (No Change)
```typescript
// URLs that remain the same
const directMappings = {
  '/': '/',
  '/docs/': '/docs/',
  '/examples/': '/examples/',
  '/plugins/': '/plugins/',
  '/download/': '/download/',
  '/about/': '/about/',
  '/community/': '/community/',
}
```

#### URL Transformations
```typescript
// URLs that need transformation
const urlTransforms = {
  // Old static HTML to new Nuxt routes
  '/docs/getting-started.html': '/docs/getting-started',
  '/docs/api-reference.html': '/docs/api',
  '/examples/basic.html': '/examples/basic',
  
  // Consolidation
  '/documentation/': '/docs/',
  '/doc/': '/docs/',
  
  // Renamed sections
  '/plugins/list.html': '/plugins/',
  '/plugins/detail.html': '/plugins/[id]',
}
```

#### Redirect Implementation

**Option 1: Client-Side (Nuxt)**
```typescript
// middleware/redirects.global.ts
export default defineNuxtRouteMiddleware((to) => {
  const redirects: Record<string, string> = {
    '/docs/getting-started.html': '/docs/getting-started',
    '/docs/api-reference.html': '/docs/api',
    '/examples/basic.html': '/examples/basic',
    // ... more redirects
  }
  
  const newPath = redirects[to.path]
  if (newPath) {
    return navigateTo(newPath, { redirectCode: 301 })
  }
})
```

**Option 2: GitHub Pages (Static)**
```html
<!-- Generate redirect pages for old URLs -->
<!-- /docs/getting-started.html -->
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Redirecting...</title>
  <link rel="canonical" href="/docs/getting-started">
  <meta http-equiv="refresh" content="0; url=/docs/getting-started">
  <script>
    window.location.href = '/docs/getting-started';
  </script>
</head>
<body>
  <p>Redirecting to <a href="/docs/getting-started">/docs/getting-started</a></p>
</body>
</html>
```

**Option 3: Build-Time Generation**
```typescript
// scripts/generate-redirects.ts
import { writeFileSync, mkdirSync } from 'fs'
import { join, dirname } from 'path'

const redirects = {
  '/docs/getting-started.html': '/docs/getting-started',
  '/docs/api-reference.html': '/docs/api',
  // ... more redirects
}

const generateRedirectPage = (from: string, to: string) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Redirecting...</title>
  <link rel="canonical" href="${to}">
  <meta http-equiv="refresh" content="0; url=${to}">
  <script>window.location.href = '${to}';</script>
</head>
<body>
  <p>This page has moved to <a href="${to}">${to}</a></p>
</body>
</html>
`

// Generate redirect files
Object.entries(redirects).forEach(([from, to]) => {
  const outPath = join('.output/public', from)
  const dir = dirname(outPath)
  
  mkdirSync(dir, { recursive: true })
  writeFileSync(outPath, generateRedirectPage(from, to))
  
  console.log(`✓ Created redirect: ${from} → ${to}`)
})
```

### 404 Page Strategy

```vue
<!-- pages/[...404].vue -->
<template>
  <div class="error-page">
    <h1>Page Not Found</h1>
    
    <div v-if="suggestedUrl">
      <p>Looking for this page?</p>
      <NuxtLink :to="suggestedUrl" class="suggested-link">
        {{ suggestedUrl }}
      </NuxtLink>
    </div>
    
    <div v-else>
      <p>The page you're looking for doesn't exist.</p>
      <div class="helpful-links">
        <h2>Try these instead:</h2>
        <ul>
          <li><NuxtLink to="/docs">Documentation</NuxtLink></li>
          <li><NuxtLink to="/examples">Examples</NuxtLink></li>
          <li><NuxtLink to="/playground">Playground</NuxtLink></li>
        </ul>
      </div>
    </div>
    
    <SearchInput placeholder="Search documentation..." />
  </div>
</template>

<script setup lang="ts">
const route = useRoute()

// Try to suggest correct URL based on path
const suggestedUrl = computed(() => {
  const path = route.path
  
  // Remove .html extension
  if (path.endsWith('.html')) {
    return path.replace('.html', '')
  }
  
  // Common misspellings or old paths
  const suggestions: Record<string, string> = {
    '/documentation': '/docs',
    '/doc': '/docs',
    '/api': '/docs/api',
    '/tutorial': '/docs/getting-started',
  }
  
  return suggestions[path] || null
})

// Track 404s for analytics
onMounted(() => {
  const { trackEvent } = useAnalytics()
  trackEvent('404-error', {
    path: route.path,
    referrer: document.referrer,
  })
})
</script>
```

## Content Migration

### HTML to Markdown Conversion

#### Automated Conversion Script
```typescript
// scripts/convert-html-to-markdown.ts
import { readFileSync, writeFileSync } from 'fs'
import TurndownService from 'turndown'
import { glob } from 'glob'
import matter from 'gray-matter'

const turndownService = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced',
})

// Custom rules for OpenSeadragon HTML
turndownService.addRule('codeBlocks', {
  filter: ['pre'],
  replacement: (content, node) => {
    const element = node as HTMLElement
    const language = element.className.match(/language-(\w+)/)?.[1] || 'javascript'
    return `\n\`\`\`${language}\n${content}\n\`\`\`\n`
  },
})

const convertHtmlToMarkdown = async (htmlPath: string) => {
  const html = readFileSync(htmlPath, 'utf-8')
  
  // Extract metadata
  const titleMatch = html.match(/<title>(.*?)<\/title>/)
  const title = titleMatch?.[1] || 'Untitled'
  
  const descMatch = html.match(/<meta name="description" content="(.*?)"/)
  const description = descMatch?.[1] || ''
  
  // Extract main content
  const contentMatch = html.match(/<main[^>]*>([\s\S]*?)<\/main>/) ||
                       html.match(/<article[^>]*>([\s\S]*?)<\/article>/) ||
                       html.match(/<div class="content"[^>]*>([\s\S]*?)<\/div>/)
  
  const content = contentMatch?.[1] || html
  
  // Convert to markdown
  const markdown = turndownService.turndown(content)
  
  // Create front matter
  const frontMatter = {
    title,
    description,
    lastUpdated: new Date().toISOString().split('T')[0],
  }
  
  // Combine front matter and content
  const result = matter.stringify(markdown, frontMatter)
  
  // Determine output path
  const outputPath = htmlPath
    .replace('old-site/', 'content/')
    .replace('.html', '.md')
  
  writeFileSync(outputPath, result)
  console.log(`✓ Converted: ${htmlPath} → ${outputPath}`)
}

// Convert all HTML files
const htmlFiles = await glob('old-site/**/*.html')
for (const file of htmlFiles) {
  await convertHtmlToMarkdown(file)
}
```

#### Manual Review Checklist
```markdown
## Content Review Checklist

For each converted page:

- [ ] Front matter is complete and accurate
- [ ] Title and description are appropriate
- [ ] Heading hierarchy is correct (H1 > H2 > H3)
- [ ] Code blocks have proper language tags
- [ ] Links are converted and working
- [ ] Images are migrated and paths updated
- [ ] Tables are formatted correctly
- [ ] Special formatting is preserved
- [ ] No HTML artifacts remain
- [ ] Content reads naturally in markdown
```

### Example Migration

#### Before (HTML)
```html
<!DOCTYPE html>
<html>
<head>
  <title>Getting Started - OpenSeadragon</title>
  <meta name="description" content="Learn how to get started with OpenSeadragon">
</head>
<body>
  <div class="content">
    <h1>Getting Started</h1>
    
    <p>OpenSeadragon is an open-source, web-based viewer for high-resolution zoomable images.</p>
    
    <h2>Installation</h2>
    
    <p>You can install OpenSeadragon via npm:</p>
    
    <pre class="language-bash"><code>npm install openseadragon</code></pre>
    
    <h2>Basic Usage</h2>
    
    <pre class="language-javascript"><code>var viewer = OpenSeadragon({
  id: "viewer",
  prefixUrl: "/openseadragon/images/",
  tileSources: "/path/to/image.dzi"
});</code></pre>
    
    <p>See the <a href="/docs/api-reference.html">API Reference</a> for more details.</p>
  </div>
</body>
</html>
```

#### After (Markdown)
```markdown
---
title: Getting Started
description: Learn how to get started with OpenSeadragon
category: guide
tags: [installation, setup, quickstart]
difficulty: beginner
lastUpdated: 2025-10-23
---

# Getting Started

OpenSeadragon is an open-source, web-based viewer for high-resolution zoomable images.

## Installation

You can install OpenSeadragon via npm:

\```bash
npm install openseadragon
\```

## Basic Usage

\```javascript
const viewer = OpenSeadragon({
  id: "viewer",
  prefixUrl: "/openseadragon/images/",
  tileSources: "/path/to/image.dzi"
});
\```

See the [API Reference](/docs/api) for more details.
```

### Asset Migration

#### Image Optimization
```typescript
// scripts/optimize-images.ts
import sharp from 'sharp'
import { glob } from 'glob'
import { join, dirname, basename } from 'path'
import { mkdirSync } from 'fs'

const optimizeImage = async (inputPath: string) => {
  const outputDir = inputPath.replace('old-site/', 'public/')
  mkdirSync(dirname(outputDir), { recursive: true })
  
  const ext = inputPath.split('.').pop()?.toLowerCase()
  
  if (ext === 'png') {
    // Convert PNG to WebP
    await sharp(inputPath)
      .webp({ quality: 85 })
      .toFile(outputDir.replace('.png', '.webp'))
    
    // Also keep optimized PNG
    await sharp(inputPath)
      .png({ quality: 85, compressionLevel: 9 })
      .toFile(outputDir)
  } else if (ext === 'jpg' || ext === 'jpeg') {
    // Convert JPG to WebP
    await sharp(inputPath)
      .webp({ quality: 80 })
      .toFile(outputDir.replace(/\.(jpg|jpeg)$/, '.webp'))
    
    // Also keep optimized JPG
    await sharp(inputPath)
      .jpeg({ quality: 80, mozjpeg: true })
      .toFile(outputDir)
  }
  
  console.log(`✓ Optimized: ${inputPath}`)
}

// Optimize all images
const images = await glob('old-site/**/*.{png,jpg,jpeg}')
for (const image of images) {
  await optimizeImage(image)
}
```

## SEO Preservation

### Sitemap Generation

```typescript
// server/routes/sitemap.xml.ts
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const baseUrl = config.public.siteUrl
  
  // Get all content pages
  const docs = await queryContent('/docs').find()
  const examples = await queryContent('/examples').find()
  
  const urls = [
    { loc: '/', priority: 1.0, changefreq: 'weekly' },
    { loc: '/docs', priority: 0.9, changefreq: 'weekly' },
    { loc: '/examples', priority: 0.9, changefreq: 'monthly' },
    { loc: '/plugins', priority: 0.8, changefreq: 'monthly' },
    { loc: '/playground', priority: 0.7, changefreq: 'monthly' },
    
    // Documentation pages
    ...docs.map(doc => ({
      loc: doc._path,
      priority: 0.8,
      changefreq: 'weekly',
      lastmod: doc.lastUpdated || doc.createdAt,
    })),
    
    // Example pages
    ...examples.map(ex => ({
      loc: ex._path,
      priority: 0.7,
      changefreq: 'monthly',
      lastmod: ex.lastUpdated,
    })),
  ]
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${baseUrl}${url.loc}</loc>
    <priority>${url.priority}</priority>
    <changefreq>${url.changefreq}</changefreq>
    ${url.lastmod ? `<lastmod>${url.lastmod}</lastmod>` : ''}
  </url>`).join('\n')}
</urlset>`
  
  setHeader(event, 'Content-Type', 'application/xml')
  return sitemap
})
```

### Robots.txt

```typescript
// server/routes/robots.txt.ts
export default defineEventHandler((event) => {
  const config = useRuntimeConfig()
  const siteUrl = config.public.siteUrl
  
  const robots = `# OpenSeadragon Website
User-agent: *
Allow: /

# Sitemaps
Sitemap: ${siteUrl}/sitemap.xml

# Disallow search results
Disallow: /search?*

# Disallow playground snapshots
Disallow: /playground/*
`
  
  setHeader(event, 'Content-Type', 'text/plain')
  return robots
})
```

### Meta Tags Preservation

```vue
<!-- app.vue -->
<script setup lang="ts">
useHead({
  titleTemplate: (title) => 
    title ? `${title} | OpenSeadragon` : 'OpenSeadragon - Web-based Image Viewer',
  
  meta: [
    { name: 'description', content: 'OpenSeadragon is an open-source, web-based viewer for high-resolution zoomable images' },
    { name: 'keywords', content: 'openseadragon, deep zoom, image viewer, IIIF, javascript' },
    
    // Open Graph
    { property: 'og:site_name', content: 'OpenSeadragon' },
    { property: 'og:type', content: 'website' },
    { property: 'og:locale', content: 'en_US' },
    
    // Twitter Card
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:site', content: '@openseadragon' },
  ],
  
  link: [
    { rel: 'canonical', href: () => `https://openseadragon.github.io${useRoute().path}` },
  ],
})
</script>
```

### Schema.org Structured Data

```vue
<!-- components/StructuredData.vue -->
<script setup lang="ts">
const route = useRoute()
const config = useRuntimeConfig()

const structuredData = computed(() => {
  const baseData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'OpenSeadragon',
    url: config.public.siteUrl,
    description: 'Open-source web-based viewer for high-resolution zoomable images',
    potentialAction: {
      '@type': 'SearchAction',
      target: `${config.public.siteUrl}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  }
  
  // Add breadcrumbs for documentation
  if (route.path.startsWith('/docs')) {
    return {
      ...baseData,
      '@graph': [
        baseData,
        {
          '@type': 'BreadcrumbList',
          itemListElement: generateBreadcrumbs(route.path),
        },
      ],
    }
  }
  
  return baseData
})

useHead({
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify(structuredData.value),
    },
  ],
})
</script>
```

## Parallel Running Strategy

### Staging Environment

```yaml
# Deploy to staging subdomain first
staging:
  url: https://preview-openseadragon.netlify.app
  purpose: Community preview and testing
  duration: 2-3 weeks
  
production:
  url: https://openseadragon.github.io
  migration_date: TBD (after staging validation)
```

### A/B Testing Approach

```typescript
// Option: Soft launch with traffic splitting
// This would require a proxy/CDN, not available with GitHub Pages
// Document for future reference if migration to other hosting

/*
const userBucket = Math.random()

if (userBucket < 0.1) {
  // 10% of users see new site
  window.location.href = 'https://new.openseadragon.github.io'
} else {
  // 90% see old site
  // Keep on current site
}
*/
```

### Community Beta Testing

```markdown
## Beta Testing Program

### Announcement
- Blog post announcing beta
- Email to mailing list
- GitHub announcement
- Social media posts

### Feedback Channels
- GitHub Discussions for general feedback
- GitHub Issues for bug reports
- Survey form for structured feedback
- Analytics monitoring

### Beta Period
- Duration: 2-3 weeks
- Target: 100+ beta testers
- Goal: Identify and fix issues before full launch
```

## Rollback Plan

### Rollback Triggers
- **Critical bugs** affecting core functionality
- **SEO rankings** drop significantly (>20%)
- **Performance degradation** (>30% slower)
- **Accessibility violations** discovered
- **Broken content** affecting >10% of pages
- **User complaints** exceed threshold

### Rollback Procedure

#### GitHub Pages Rollback
```bash
# Option 1: Revert deployment commit
git revert <deployment-commit-hash>
git push origin main

# Option 2: Reset to previous version
git reset --hard <previous-commit-hash>
git push --force origin main

# Option 3: Switch branch
git checkout old-site
git push origin old-site:gh-pages
```

#### DNS Rollback (if using custom domain)
```bash
# Update DNS to point back to old site
# This depends on your DNS provider

# Typically involves:
# 1. Log into DNS provider
# 2. Update CNAME record
# 3. Wait for propagation (5-60 minutes)
```

#### Communication Plan
```markdown
## Rollback Communication

### Immediate Actions
1. Post status update on site
2. Tweet from @openseadragon account
3. Update GitHub repository README
4. Post in community channels

### Within 24 Hours
1. Blog post explaining situation
2. Email to mailing list
3. GitHub issue for tracking
4. Timeline for re-migration

### Message Template
"We've temporarily reverted to the previous version of the OpenSeadragon 
website while we address [specific issue]. We expect to re-launch the 
updated site on [date]. Thank you for your patience."
```

## Validation Checklist

### Pre-Launch Validation

#### Content Validation
- [ ] All pages migrated and accessible
- [ ] No broken links (internal or external)
- [ ] All images loading correctly
- [ ] Code examples tested and working
- [ ] Examples functioning properly
- [ ] Search working and indexing all content

#### Technical Validation
- [ ] All URLs redirect correctly
- [ ] Sitemap generated and submitted
- [ ] Robots.txt configured
- [ ] Meta tags present on all pages
- [ ] Structured data validated
- [ ] Canonical URLs set correctly
- [ ] 404 page working with suggestions

#### Performance Validation
- [ ] Lighthouse scores >90
- [ ] Core Web Vitals within targets
- [ ] Bundle sizes within budget
- [ ] Images optimized
- [ ] Fonts loading efficiently
- [ ] No layout shift issues

#### Accessibility Validation
- [ ] WCAG 2.1 AA compliance verified
- [ ] Keyboard navigation working
- [ ] Screen reader compatibility
- [ ] Color contrast sufficient
- [ ] Focus indicators visible
- [ ] ARIA labels correct

#### Cross-Browser Testing
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Mobile Chrome (Android)

#### SEO Validation
- [ ] Search Console verification
- [ ] Analytics tracking working
- [ ] Social media cards displaying
- [ ] Schema.org markup valid
- [ ] No duplicate content issues
- [ ] Previous rankings preserved

### Post-Launch Monitoring (First 48 Hours)

```yaml
monitoring_checklist:
  traffic:
    - Monitor overall traffic levels
    - Check bounce rate changes
    - Verify conversion tracking
    
  errors:
    - Watch error rates
    - Monitor 404 occurrences
    - Check console errors
    
  performance:
    - Track Core Web Vitals
    - Monitor server response times
    - Check CDN performance
    
  seo:
    - Watch search rankings
    - Monitor Search Console
    - Check indexing status
    
  user_feedback:
    - Monitor GitHub issues
    - Check social media mentions
    - Review community channels
```

## Communication Plan

### Pre-Migration Announcements

**4 Weeks Before:**
```markdown
# Announcement: Website Modernization Coming

We're excited to announce that we're modernizing the OpenSeadragon website!

## What's Changing
- Modern, mobile-friendly design
- Interactive examples and playground
- Improved search functionality
- Better documentation organization
- Faster performance

## Timeline
- Beta preview: [Date]
- Full launch: [Date]

## Get Involved
Join our beta testing program to help us make it great!
```

**2 Weeks Before:**
```markdown
# Beta Preview Now Available

The new OpenSeadragon website is ready for community preview!

## Try It Out
Visit: https://preview-openseadragon.netlify.app

## Give Feedback
- GitHub Discussions: [link]
- Feedback Form: [link]

We appreciate your help making this the best website possible!
```

**Launch Day:**
```markdown
# New OpenSeadragon Website Is Live! 🎉

We're thrilled to announce the launch of our modernized website!

## What's New
- [List key features]
- [Highlight improvements]
- [Link to release notes]

## Feedback Welcome
Found a bug or have a suggestion? [Link to issues]

Thank you to everyone who helped during beta testing!
```

### Post-Migration Updates

**Week 1:**
- Daily monitoring report (internal)
- Address critical issues immediately
- Respond to community feedback

**Week 2:**
- Weekly summary blog post
- List of improvements made
- Thank contributors

**Month 1:**
- Monthly retrospective
- Analytics summary
- Lessons learned
- Future improvements

## Success Metrics

### Migration Success Criteria
- **Zero** critical bugs in production
- **<5%** change in organic traffic
- **>90** Lighthouse scores maintained
- **<2s** average page load time
- **>95%** uptime during migration
- **<10** P1 issues reported
- **Positive** community feedback

### Long-Term Success Metrics
- Increased documentation engagement
- Higher example usage
- More playground creations
- Lower bounce rates
- Improved search success rate
- Growing organic traffic

## Timeline Summary

```
Week 1-2:  Preparation & Content Audit
Week 3-4:  Content Migration & Conversion
Week 5:    Testing & Validation
Week 6:    Staging Deployment & Beta
Week 7:    Full Migration to Production
Week 8+:   Post-Launch Monitoring & Refinement
```

## Contingency Planning

### Known Risks & Mitigations

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| Broken redirects | High | Medium | Comprehensive redirect testing |
| SEO rankings drop | High | Low | Maintain URL structure, meta tags |
| Performance issues | Medium | Low | Performance testing, budgets |
| Browser compatibility | Medium | Low | Cross-browser testing |
| Content migration errors | Medium | Medium | Manual review process |
| Community resistance | Low | Low | Beta testing, communication |

## Conclusion

This migration strategy provides a comprehensive, low-risk approach to modernizing the OpenSeadragon website while preserving SEO value, maintaining user experience, and enabling rollback if needed. Success depends on thorough testing, clear communication, and responsive monitoring.
