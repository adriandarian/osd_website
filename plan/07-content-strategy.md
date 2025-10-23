# Content Strategy

## Content Migration Overview

### Source Content Analysis

#### Current OpenSeadragon Site Content
- **Documentation**: API reference, guides, tutorials
- **Examples**: 30+ interactive examples across categories
- **Plugins**: 50+ plugin descriptions and links
- **Getting Started**: Installation and setup guides
- **Support Resources**: Community channels, FAQ
- **Browser Extension**: OpenSeadragonizer information

### Migration Approach

#### Phase 1: Content Audit (Week 1)
- [ ] Catalog all existing pages and content
- [ ] Identify content hierarchy and relationships
- [ ] Document all external links and resources
- [ ] Map old URLs to new URL structure
- [ ] Prioritize content for migration

#### Phase 2: Structure Setup (Week 2)
- [ ] Create markdown frontmatter templates
- [ ] Set up content directory structure
- [ ] Configure Nuxt Content collections
- [ ] Establish content naming conventions
- [ ] Create redirect rules for old URLs

#### Phase 3: Content Conversion (Weeks 3-8)
- [ ] Convert HTML to Markdown
- [ ] Enhance with interactive components
- [ ] Add metadata and frontmatter
- [ ] Optimize images and assets
- [ ] Validate internal links

#### Phase 4: Quality Assurance (Week 9)
- [ ] Review all migrated content
- [ ] Test all interactive examples
- [ ] Verify all external links
- [ ] Check SEO metadata
- [ ] Validate accessibility

## Content Organization

### Directory Structure

```
content/
├── docs/
│   ├── index.md                    # Documentation home
│   ├── getting-started.md          # Quick start guide
│   ├── api/
│   │   ├── index.md               # API overview
│   │   ├── viewer.md              # Viewer API reference
│   │   ├── tilesource.md          # TileSource API
│   │   ├── viewport.md            # Viewport API
│   │   ├── navigator.md           # Navigator API
│   │   └── events.md              # Event system
│   ├── guides/
│   │   ├── index.md               # Guides overview
│   │   ├── basic-usage.md         # Basic implementation
│   │   ├── configuration.md       # Configuration options
│   │   ├── tile-sources.md        # Working with tile sources
│   │   ├── overlays.md            # Adding overlays
│   │   └── advanced.md            # Advanced techniques
│   └── reference/
│       ├── browser-support.md     # Browser compatibility
│       ├── performance.md         # Performance tips
│       ├── migration.md           # Migration guides
│       └── faq.md                 # Frequently asked questions
├── examples/
│   ├── index.md                   # Examples gallery
│   ├── basic/
│   │   ├── simple-viewer.md       # Hello world
│   │   ├── custom-buttons.md      # Custom controls
│   │   ├── zoom-pan.md            # Zoom and pan
│   │   └── rotation.md            # Image rotation
│   ├── advanced/
│   │   ├── multi-image.md         # Multiple images
│   │   ├── sequence-mode.md       # Image sequences
│   │   ├── annotations.md         # Annotations
│   │   ├── overlays.md            # HTML/SVG overlays
│   │   └── custom-tilesource.md   # Custom tile sources
│   ├── mobile/
│   │   ├── touch-gestures.md      # Touch interactions
│   │   └── responsive-design.md   # Responsive layouts
│   └── plugins/
│       ├── annotations-demo.md    # Annotation plugins
│       ├── scalebar-demo.md       # Scale bar plugin
│       └── filters-demo.md        # Image filters
├── plugins/
│   ├── index.md                   # Plugin directory home
│   ├── annotations.md             # Annotation plugins
│   ├── overlays.md                # Overlay plugins
│   ├── filters.md                 # Image filter plugins
│   ├── measurement.md             # Measurement tools
│   ├── ui-enhancements.md         # UI improvements
│   └── tile-sources.md            # Custom tile sources
├── showcase/
│   ├── index.md                   # Showcase home
│   ├── projects/
│   │   ├── digital-library.md     # Library projects
│   │   ├── medical-imaging.md     # Medical applications
│   │   ├── historical-maps.md     # Map collections
│   │   └── art-collections.md     # Art galleries
│   └── case-studies/
│       ├── wellcome-collection.md # Case study
│       └── stanford-libraries.md  # Case study
└── blog/
    └── announcements/
        └── v5-release.md          # Release announcements
```

## Frontmatter Schema

### Documentation Pages
```yaml
---
title: "Viewer API Reference"
description: "Complete API reference for the OpenSeadragon Viewer class"
category: "API"
order: 1
tags:
  - api
  - viewer
  - reference
published: true
lastUpdated: 2024-10-22
contributors:
  - name: "Core Team"
related:
  - /docs/api/viewport
  - /docs/api/tilesource
navigation:
  prev:
    title: "Getting Started"
    path: /docs/getting-started
  next:
    title: "TileSource API"
    path: /docs/api/tilesource
---
```

### Example Pages
```yaml
---
title: "Simple Image Viewer"
description: "Basic example showing how to display a single zoomable image"
category: "Basic Examples"
difficulty: "beginner"
tags:
  - basic
  - getting-started
  - viewer
code:
  demo: true
  editable: true
  files:
    - name: "index.html"
      language: "html"
    - name: "script.js"
      language: "javascript"
dependencies:
  - openseadragon: "^5.0.0"
image: "/images/examples/simple-viewer.jpg"
published: true
featured: true
---
```

### Plugin Pages
```yaml
---
title: "OpenSeadragonAnnotations"
description: "SVG-based annotation tools for OpenSeadragon"
author: "Emigre"
repository: "https://github.com/Emigre/openseadragon-annotations"
npm: "openseadragon-annotations"
license: "MIT"
version: "1.0.0"
compatibility:
  osd: ">=2.0.0"
  browsers:
    - Chrome: ">=90"
    - Firefox: ">=88"
    - Safari: ">=14"
category: "Annotations"
tags:
  - annotations
  - svg
  - drawing
features:
  - "Draw shapes on images"
  - "SVG overlay scaling"
  - "Export annotations"
demo: true
downloads: 15000
stars: 250
lastUpdated: 2024-10-15
---
```

## Markdown Conventions

### Headings
```markdown
# Page Title (only one per page, from frontmatter)

## Main Section

### Subsection

#### Details
```

### Code Blocks with Syntax Highlighting
````markdown
```typescript
const viewer = OpenSeadragon({
  id: 'viewer',
  prefixUrl: '/images/',
  tileSources: '/path/to/image.dzi'
})
```
````

### Interactive Code Examples
````markdown
```vue live
<template>
  <div id="viewer" class="h-96 w-full"></div>
</template>

<script setup>
import OpenSeadragon from 'openseadragon'

onMounted(() => {
  OpenSeadragon({
    id: 'viewer',
    tileSources: '/demo/image.dzi'
  })
})
</script>
```
````

### Callouts and Alerts
```markdown
:::tip
Use the `prefixUrl` option to specify the path to your button images.
:::

:::warning
This feature is only supported in OpenSeadragon 3.0+
:::

:::danger
Avoid using synchronous XMLHttpRequests as they block the main thread.
:::

:::info
For best performance, use Deep Zoom Image (DZI) format.
:::
```

### Tables
```markdown
| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `id` | string | required | DOM element ID |
| `tileSources` | string\|object | required | Image source |
| `prefixUrl` | string | `''` | Button image path |
```

### Images
```markdown
![Alt text](/images/example.jpg)

<!-- With caption -->
![Demo viewer](~/assets/images/demo.jpg "Interactive demo viewer")

<!-- Using Nuxt Image component -->
::nuxt-img{src="/hero.jpg" alt="OpenSeadragon Hero" width="1200" height="600"}
::
```

### Internal Links
```markdown
[Getting Started Guide](/docs/getting-started)
[Viewer API](/docs/api/viewer)
[Examples](/examples)
```

### External Links
```markdown
[OpenSeadragon on GitHub](https://github.com/openseadragon/openseadragon)
```

## SEO Strategy

### Meta Tags
```vue
<template>
  <div>
    <Head>
      <Title>{{ page.title }} - OpenSeadragon</Title>
      <Meta name="description" :content="page.description" />
      <Meta property="og:title" :content="page.title" />
      <Meta property="og:description" :content="page.description" />
      <Meta property="og:image" :content="page.image || defaultOgImage" />
      <Meta property="og:type" content="website" />
      <Meta name="twitter:card" content="summary_large_image" />
    </Head>
  </div>
</template>
```

### Structured Data
```typescript
// composables/useStructuredData.ts
export function useStructuredData(page: any) {
  useHead({
    script: [
      {
        type: 'application/ld+json',
        children: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'TechArticle',
          headline: page.title,
          description: page.description,
          author: {
            '@type': 'Organization',
            name: 'OpenSeadragon'
          },
          datePublished: page.published,
          dateModified: page.lastUpdated
        })
      }
    ]
  })
}
```

### Sitemap Generation
```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  nitro: {
    prerender: {
      routes: ['/sitemap.xml']
    }
  }
})
```

## Content Quality Guidelines

### Writing Style
- **Clear and concise**: Short sentences, simple language
- **Active voice**: Use active voice for clarity
- **Technical accuracy**: Verify all code examples work
- **Accessibility**: Use descriptive link text and alt tags
- **Consistent terminology**: Maintain glossary of terms

### Code Examples
- **Working code**: All examples must be tested
- **Comments**: Explain non-obvious code
- **Best practices**: Follow modern JavaScript conventions
- **Complete**: Include all necessary imports and setup
- **Accessible**: Consider screen reader users

### Images and Media
- **Optimized**: Compress and use modern formats (WebP/AVIF)
- **Alt text**: Descriptive alternative text for all images
- **Captions**: Provide captions where helpful
- **Responsive**: Serve appropriate sizes for different devices

## Content Workflow

### Adding New Content
1. **Create markdown file** in appropriate directory
2. **Add frontmatter** with required metadata
3. **Write content** following guidelines
4. **Test locally** with `bun run dev`
5. **Submit pull request** for review

### Updating Existing Content
1. **Edit markdown file** directly
2. **Update `lastUpdated`** date in frontmatter
3. **Test changes** locally
4. **Submit pull request** for review

### Review Process
- **Technical accuracy**: Verify code examples
- **Grammar and spelling**: Proofread content
- **Links**: Check all internal and external links
- **Accessibility**: Validate alt text and structure
- **SEO**: Review meta descriptions and titles