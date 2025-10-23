# Project Structure

## Monorepo Organization

```
osd_website/
├── apps/
│   ├── site/                    # Main Nuxt application
│   │   ├── components/
│   │   │   ├── landing/         # Landing page components
│   │   │   ├── docs/            # Documentation components
│   │   │   ├── examples/        # Interactive examples
│   │   │   ├── playground/      # In-browser code editor
│   │   │   └── ui/              # Reusable UI components
│   │   ├── content/             # Markdown content
│   │   │   ├── docs/            # API documentation
│   │   │   ├── examples/        # Example tutorials
│   │   │   ├── plugins/         # Plugin documentation
│   │   │   └── guides/          # User guides
│   │   ├── pages/               # Nuxt pages/routes
│   │   ├── layouts/             # Page layouts
│   │   ├── composables/         # Vue composables
│   │   ├── utils/               # Utility functions
│   │   ├── assets/              # Static assets
│   │   ├── public/              # Public files
│   │   ├── plugins/             # Nuxt plugins
│   │   ├── middleware/          # Route middleware
│   │   └── server/              # Server-side code (if needed)
│   └── playground/              # Standalone advanced playground (optional)
├── packages/
│   ├── osd-examples/            # Reusable OSD demo components
│   ├── ui/                      # Shared UI component library
│   └── types/                   # Shared TypeScript types
├── plan/                        # Project documentation
├── docs/                        # Development documentation
├── tools/                       # Build tools and scripts
├── .github/                     # GitHub workflows and templates
└── config files...             # Root configuration files
```

## Main Application Structure (`apps/site/`)

### Components Organization

```
components/
├── landing/
│   ├── Hero.vue                 # Main hero section
│   ├── Features.vue             # Feature highlights
│   ├── Demo.vue                 # Interactive demo
│   └── CTA.vue                  # Call-to-action sections
├── docs/
│   ├── Navigation.vue           # Documentation navigation
│   ├── Sidebar.vue              # Sidebar with TOC
│   ├── CodeBlock.vue            # Enhanced code blocks
│   ├── ApiReference.vue         # API documentation
│   └── SearchBox.vue            # Documentation search
├── examples/
│   ├── ExampleCard.vue          # Example preview cards
│   ├── LiveDemo.vue             # Live interactive demos
│   ├── CodeEditor.vue           # In-page code editor
│   └── ExampleGallery.vue       # Example gallery view
├── playground/
│   ├── Editor.vue               # Monaco code editor
│   ├── Preview.vue              # Live preview pane
│   ├── Toolbar.vue              # Editor toolbar
│   └── Templates.vue            # Code templates
└── ui/
    ├── Button.vue               # Button component
    ├── Modal.vue                # Modal dialogs
    ├── Card.vue                 # Card layouts
    ├── Badge.vue                # Status badges
    ├── Tooltip.vue              # Tooltips
    └── Loading.vue              # Loading states
```

### Content Structure

```
content/
├── docs/
│   ├── api/
│   │   ├── viewer.md            # Viewer API
│   │   ├── tilesource.md        # TileSource API
│   │   └── ...                  # Other API docs
│   ├── guides/
│   │   ├── getting-started.md   # Getting started guide
│   │   ├── basic-usage.md       # Basic usage
│   │   └── advanced.md          # Advanced topics
│   └── reference/
│       ├── configuration.md     # Configuration options
│       └── events.md            # Event reference
├── examples/
│   ├── basic/
│   │   ├── simple-viewer.md     # Simple viewer example
│   │   └── custom-controls.md   # Custom controls
│   ├── advanced/
│   │   ├── annotations.md       # Annotations example
│   │   └── multi-image.md       # Multiple images
│   └── plugins/
│       ├── overlay-plugin.md    # Plugin examples
│       └── ...
├── plugins/
│   ├── annotations.md           # Plugin documentation
│   ├── overlays.md              # Overlay plugins
│   └── ...
└── showcase/
    ├── projects/
    │   ├── project-1.md         # Real-world projects
    │   └── ...
    └── case-studies/
        ├── digital-library.md   # Case studies
        └── ...
```

### Pages Structure

```
pages/
├── index.vue                    # Landing page
├── docs/
│   ├── index.vue                # Documentation home
│   └── [...slug].vue            # Dynamic doc pages
├── examples/
│   ├── index.vue                # Examples gallery
│   └── [...slug].vue            # Dynamic example pages
├── plugins/
│   ├── index.vue                # Plugin directory
│   └── [slug].vue               # Individual plugins
├── playground/
│   └── index.vue                # Interactive playground
├── showcase/
│   ├── index.vue                # Project showcase
│   └── [slug].vue               # Individual projects
└── about.vue                    # About page
```

## Shared Packages

### UI Package (`packages/ui/`)

```
packages/ui/
├── src/
│   ├── components/
│   │   ├── Button/
│   │   │   ├── Button.vue
│   │   │   ├── Button.test.ts
│   │   │   └── index.ts
│   │   ├── Modal/
│   │   └── ...
│   ├── composables/
│   │   ├── useTheme.ts
│   │   ├── useBreakpoints.ts
│   │   └── ...
│   ├── utils/
│   │   ├── colors.ts
│   │   ├── spacing.ts
│   │   └── ...
│   └── index.ts
├── package.json
└── README.md
```

### OpenSeadragon Examples (`packages/osd-examples/`)

```
packages/osd-examples/
├── src/
│   ├── components/
│   │   ├── BasicViewer.vue
│   │   ├── AnnotationDemo.vue
│   │   ├── MultiImageDemo.vue
│   │   └── ...
│   ├── composables/
│   │   ├── useOpenSeadragon.ts
│   │   ├── useImageLoader.ts
│   │   └── ...
│   ├── utils/
│   │   ├── osd-helpers.ts
│   │   └── ...
│   └── index.ts
├── package.json
└── README.md
```

### Shared Types (`packages/types/`)

```
packages/types/
├── src/
│   ├── api.ts                   # API type definitions
│   ├── content.ts               # Content type definitions
│   ├── ui.ts                    # UI component types
│   └── osd.ts                   # OpenSeadragon types
├── package.json
└── README.md
```

## Configuration Files

### Root Configuration

```
osd_website/
├── package.json                 # Workspace configuration
├── bun.lockb                    # Bun lock file
├── tsconfig.json                # TypeScript configuration
├── .gitignore                   # Git ignore rules
├── .editorconfig                # Editor configuration
├── oxlint.json                  # oxlint configuration
├── tailwind.config.ts           # Tailwind configuration
└── README.md                    # Project README
```

### Nuxt Configuration (`apps/site/nuxt.config.ts`)

```typescript
export default defineNuxtConfig({
  // Modules
  modules: [
    '@nuxt/content',
    '@nuxt/image',
    '@nuxt/seo',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@nuxtjs/tailwindcss'
  ],
  
  // GitHub Pages configuration
  ssr: false,
  target: 'static',
  
  // Content configuration
  content: {
    experimental: {
      search: true
    }
  },
  
  // Build configuration
  nitro: {
    prerender: {
      routes: ['/sitemap.xml']
    }
  }
})
```

## Development Scripts

### Package.json Scripts

```json
{
  "scripts": {
    "dev": "nuxt dev",
    "build": "nuxt build",
    "generate": "nuxt generate",
    "preview": "nuxt preview",
    "lint": "oxlint src",
    "lint:fix": "oxlint src --fix",
    "test": "vitest",
    "test:watch": "vitest --watch",
    "typecheck": "nuxt typecheck",
    "analyze": "vite-bundle-visualizer",
    "deps:check": "node-modules-inspector",
    "deps:update": "taze -i",
    "prepare": "simple-git-hooks"
  }
}
```

## File Naming Conventions

### Components
- **PascalCase**: `MyComponent.vue`
- **Index files**: `index.vue` for directory components
- **Tests**: `MyComponent.test.ts`

### Composables
- **camelCase**: `useMyComposable.ts`
- **Prefix**: Always start with `use`

### Utilities
- **camelCase**: `myUtility.ts`
- **Descriptive**: Clear, descriptive names

### Content
- **kebab-case**: `my-article.md`
- **Descriptive**: SEO-friendly URLs

### Assets
- **kebab-case**: `my-image.jpg`
- **Organized**: Group by type/purpose

## Import Conventions

### Auto-imports (Nuxt)
- Components are auto-imported
- Composables are auto-imported
- Utils need explicit imports

### Explicit Imports
```typescript
// External packages
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

// Internal utilities
import { formatDate } from '~/utils/dates'
import type { ApiResponse } from '~/types/api'
```

### Relative vs Absolute
- **Absolute paths**: Use `~/` for project root
- **Relative paths**: For files in same directory
- **Package imports**: Use workspace names

## Environment Configuration

### Development
- **Hot reload**: Enabled for all components
- **Source maps**: Full source maps
- **DevTools**: All development tools enabled

### Production
- **Minification**: oxc minifier
- **Tree shaking**: Automatic dead code elimination
- **Source maps**: Production source maps for debugging

### GitHub Pages
- **Static generation**: Full SSG build
- **Base URL**: Configured for GitHub Pages
- **Asset optimization**: Optimized for CDN delivery