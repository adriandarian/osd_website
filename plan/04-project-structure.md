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
│   ├── CTA.vue                  # Call-to-action sections
│   ├── Stats.vue                # Statistics section
│   └── Testimonials.vue         # User testimonials
├── docs/
│   ├── Navigation.vue           # Documentation navigation
│   ├── Sidebar.vue              # Sidebar with TOC
│   ├── SidebarNav.vue           # Sidebar navigation tree
│   ├── Breadcrumbs.vue          # Breadcrumb navigation
│   ├── SearchBox.vue            # Pagefind search integration
│   ├── CodeExample.vue          # Enhanced code blocks with Shiki Twoslash
│   ├── ApiReference.vue         # API documentation
│   ├── MethodReference.vue      # Interactive method documentation
│   ├── TypeExplorer.vue         # Visual type system explorer
│   ├── TypeNode.vue             # Type hierarchy node
│   ├── EventFlowDiagram.vue     # Event propagation visualizer
│   ├── VersionDiff.vue          # Version comparison tool
│   ├── ContextualHelp.vue       # Inline help tooltips
│   ├── WorkflowDiagram.vue      # Mermaid workflow diagrams
│   ├── PerformanceMetrics.vue   # Performance monitoring dashboard
│   ├── ConfigBuilder.vue        # Interactive configuration builder
│   ├── LivePlayground.vue       # Live API playground
│   ├── Toc.vue                  # Table of contents
│   ├── EditLink.vue             # Edit on GitHub link
│   └── PrevNext.vue             # Previous/Next navigation
├── examples/
│   ├── ExampleCard.vue          # Example preview cards
│   ├── LiveDemo.vue             # Live interactive demos
│   ├── CodeEditor.vue           # In-page code editor
│   └── ExampleGallery.vue       # Example gallery view
├── playground/
│   ├── ParameterEditor.vue      # Interactive parameter editor
│   ├── ParameterField.vue       # Individual parameter field
│   ├── ParameterGroup.vue       # Grouped parameters
│   ├── OSDViewer.vue            # Live OpenSeadragon preview
│   ├── CodeTabs.vue             # Multi-framework code tabs
│   ├── VersionSelector.vue      # OSD version picker
│   ├── MonacoEditor.vue         # Monaco code editor wrapper
│   ├── ExampleViewer.vue        # Split-screen example viewer
│   ├── CodeGenerator.vue        # Multi-framework code generator
│   ├── PresetSelector.vue       # Configuration presets
│   ├── ExportOptions.vue        # Code export options
│   └── PlaygroundToolbar.vue    # Playground toolbar
├── showcase/
│   ├── ShowcaseCard.vue         # Community project card
│   ├── ShowcaseGrid.vue         # Project grid layout
│   ├── ShowcaseFilters.vue      # Filter sidebar
│   ├── SubmissionForm.vue       # Project submission form
│   ├── PreviewModal.vue         # Embedded preview modal
│   └── VotingButton.vue         # Community voting
├── plugins/
│   ├── PluginCard.vue           # Plugin card component
│   ├── PluginDetail.vue         # Plugin detail view
│   ├── PluginPreview.vue        # Interactive plugin preview
│   ├── PluginReviews.vue        # Plugin reviews section
│   ├── PluginChangelog.vue      # Plugin version changelog
│   ├── PluginSearch.vue         # Plugin search/filters
│   ├── PluginCategories.vue     # Category filters
│   ├── CompatibilityBadge.vue   # Version compatibility indicator
│   ├── MaintenanceStatus.vue    # Maintenance status badge
│   ├── InstallModal.vue         # Installation instructions modal
│   └── SubmitPlugin.vue         # Plugin submission form
└── ui/
    ├── Button.vue               # Button component
    ├── Modal.vue                # Modal dialogs
    ├── Card.vue                 # Card layouts
    ├── Badge.vue                # Status badges
    ├── Tooltip.vue              # Tooltips
    ├── Loading.vue              # Loading states
    ├── Spinner.vue              # Spinner component
    ├── Tabs.vue                 # Tab navigation
    ├── TabGroup.vue             # Tab group wrapper
    ├── TabList.vue              # Tab list
    ├── TabPanel.vue             # Tab panel
    ├── Accordion.vue            # Accordion component
    ├── AccordionItem.vue        # Accordion item
    ├── FileUpload.vue           # File upload component
    ├── TagInput.vue             # Tag input component
    ├── MarkdownEditor.vue       # Markdown editor
    ├── Icon.vue                 # Icon component (Iconify)
    ├── Alert.vue                # Alert messages
    └── Dropdown.vue             # Dropdown component
```

### Content Structure

```
content/
├── docs/
│   ├── api/
│   │   ├── viewer.md            # Viewer API
│   │   ├── viewport.md          # Viewport API
│   │   ├── tilesource.md        # TileSource API
│   │   ├── world.md             # World API
│   │   ├── drawer.md            # Drawer API
│   │   ├── navigator.md         # Navigator API
│   │   └── ...                  # Other API docs
│   ├── guides/
│   │   ├── getting-started.md   # Getting started guide
│   │   ├── basic-usage.md       # Basic usage
│   │   ├── advanced.md          # Advanced topics
│   │   ├── performance.md       # Performance optimization
│   │   ├── accessibility.md     # Accessibility guide
│   │   └── migration.md         # Migration guides
│   ├── reference/
│   │   ├── configuration.md     # Configuration options
│   │   ├── events.md            # Event reference
│   │   ├── types.md             # Type system reference
│   │   └── browser-support.md   # Browser compatibility
│   └── tutorials/
│       ├── annotations.md       # Annotations tutorial
│       ├── overlays.md          # Overlays tutorial
│       └── custom-controls.md   # Custom controls
├── examples/
│   ├── basic/
│   │   ├── simple-viewer.md     # Simple viewer example
│   │   ├── custom-controls.md   # Custom controls
│   │   └── multiple-images.md   # Multiple images
│   ├── advanced/
│   │   ├── annotations.md       # Annotations example
│   │   ├── image-comparison.md  # Image comparison
│   │   ├── canvas-overlay.md    # Canvas overlays
│   │   └── webgl-overlay.md     # WebGL overlays
│   └── plugins/
│       ├── overlay-plugin.md    # Plugin examples
│       ├── annotation-plugin.md # Annotation plugin
│       └── ...
├── plugins/
│   ├── index.md                 # Plugin hub home
│   ├── guidelines.md            # Plugin submission guidelines
│   ├── annotations/
│   │   ├── index.md             # Annotation plugins
│   │   └── ...
│   ├── navigation/
│   │   ├── index.md             # Navigation plugins
│   │   └── ...
│   └── visualization/
│       ├── index.md             # Visualization plugins
│       └── ...
├── showcase/
│   ├── projects/
│   │   ├── project-1.md         # Real-world projects
│   │   └── ...
│   └── case-studies/
│       ├── digital-library.md   # Case studies
│       ├── medical-imaging.md   # Medical imaging case study
│       └── ...
└── blog/
    ├── releases/
    │   ├── v5.0.0.md            # Release announcements
    │   └── ...
    └── tutorials/
        ├── getting-started.md   # Blog tutorials
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
│   ├── index.vue                # Plugin directory/hub
│   ├── submit.vue               # Plugin submission page
│   ├── [slug]/
│   │   ├── index.vue            # Plugin detail page
│   │   └── preview.vue          # Interactive plugin preview
│   └── guidelines.vue           # Plugin guidelines
├── playground/
│   ├── index.vue                # Interactive playground
│   └── [id].vue                 # Saved playground state
├── showcase/
│   ├── index.vue                # Project showcase
│   ├── submit.vue               # Project submission
│   └── [slug].vue               # Individual projects
├── blog/
│   ├── index.vue                # Blog home
│   └── [...slug].vue            # Blog posts
├── about.vue                    # About page
├── community.vue                # Community page
└── roadmap.vue                  # Project roadmap
```

### Composables Structure

```
composables/
├── core/
│   ├── useOpenSeadragon.ts      # Core OSD integration
│   ├── useViewer.ts             # Viewer state management
│   └── useTileSource.ts         # Tile source utilities
├── docs/
│   ├── usePagefind.ts           # Pagefind search integration
│   ├── useFuseSearch.ts         # Fuse.js fallback search
│   ├── useShikiTwoslash.ts      # Shiki Twoslash for code highlighting
│   ├── useDocNavigation.ts      # Documentation navigation
│   └── useCodeExample.ts        # Code example utilities
├── playground/
│   ├── usePlaygroundState.ts    # Playground state management
│   ├── useCodeGeneration.ts     # Multi-framework code generation
│   ├── useOSDConfig.ts          # OSD configuration builder
│   └── usePresets.ts            # Configuration presets
├── plugins/
│   ├── usePluginRegistry.ts     # Plugin registry data
│   ├── usePluginSearch.ts       # Plugin search/filter
│   ├── usePluginPreview.ts      # Plugin preview state
│   └── usePluginSubmission.ts   # Plugin submission flow
├── showcase/
│   ├── useShowcase.ts           # Showcase data
│   ├── useShowcaseFilters.ts    # Showcase filters
│   └── useShowcaseSubmission.ts # Showcase submission
└── ui/
    ├── useTheme.ts              # Theme management
    ├── useBreakpoints.ts        # Responsive breakpoints
    ├── useModal.ts              # Modal state
    ├── useToast.ts              # Toast notifications
    └── useClipboard.ts          # Clipboard utilities
```

### Server API Structure

```
server/
├── api/
│   ├── plugins/
│   │   ├── index.get.ts         # List all plugins
│   │   ├── [slug].get.ts        # Get plugin details
│   │   ├── [slug]/
│   │   │   ├── reviews.get.ts   # Get plugin reviews
│   │   │   ├── reviews.post.ts  # Submit review
│   │   │   └── stats.get.ts     # Plugin statistics
│   │   ├── submit.post.ts       # Submit new plugin
│   │   ├── search.get.ts        # Search plugins
│   │   └── categories.get.ts    # Get plugin categories
│   ├── showcase/
│   │   ├── index.get.ts         # List showcase projects
│   │   ├── [slug].get.ts        # Get project details
│   │   ├── submit.post.ts       # Submit project
│   │   └── vote.post.ts         # Vote on project
│   ├── docs/
│   │   ├── types.get.ts         # Get type system data
│   │   ├── search-data.get.ts   # Search index data
│   │   └── versions.get.ts      # OSD version data
│   ├── examples/
│   │   ├── index.get.ts         # List examples
│   │   └── [slug].get.ts        # Get example details
│   └── playground/
│       ├── [id].get.ts          # Get saved playground
│       ├── save.post.ts         # Save playground state
│       └── share.post.ts        # Share playground
├── middleware/
│   ├── cors.ts                  # CORS headers
│   ├── rate-limit.ts            # Rate limiting
│   └── validation.ts            # Request validation
└── utils/
    ├── github.ts                # GitHub API utilities
    ├── npm.ts                   # NPM API utilities
    └── validation.ts            # Data validation
```

### Data & Storage Structure

```
data/
├── plugins/
│   ├── registry.json            # Plugin registry metadata
│   ├── categories.json          # Plugin categories
│   └── featured.json            # Featured plugins list
├── showcase/
│   ├── projects.json            # Showcase projects
│   └── categories.json          # Project categories
├── examples/
│   ├── index.json               # Examples index
│   └── tile-sources.json        # Sample tile sources
└── config/
    ├── osd-versions.json        # OSD version compatibility
    ├── presets.json             # Configuration presets
    └── frameworks.json          # Framework code templates
```

### Public Assets Structure

```
public/
├── images/
│   ├── plugins/                 # Plugin icons/screenshots
│   ├── showcase/                # Showcase project images
│   ├── examples/                # Example images
│   └── brand/                   # Brand assets
├── samples/
│   ├── dzi/                     # DZI sample images
│   ├── iiif/                    # IIIF sample manifests
│   └── tilesources/             # Other tile sources
├── openseadragon/
│   ├── images/                  # OSD UI images
│   └── versions/                # Different OSD versions
│       ├── 5.0.0/
│       ├── 4.1.0/
│       └── ...
└── favicon.ico                  # Favicon
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
│   │   ├── OverlayDemo.vue
│   │   ├── ComparisonDemo.vue
│   │   └── ...
│   ├── composables/
│   │   ├── useOpenSeadragon.ts   # Main OSD composable
│   │   ├── useImageLoader.ts     # Image loading utilities
│   │   ├── useAnnotations.ts     # Annotation helpers
│   │   ├── useOverlays.ts        # Overlay utilities
│   │   ├── useNavigator.ts       # Navigator helpers
│   │   └── ...
│   ├── utils/
│   │   ├── osd-helpers.ts        # OSD utility functions
│   │   ├── tile-sources.ts       # Tile source utilities
│   │   ├── coordinate-helpers.ts # Coordinate conversion
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
│   ├── osd.ts                   # OpenSeadragon types
│   ├── plugin.ts                # Plugin types
│   ├── playground.ts            # Playground types
│   ├── showcase.ts              # Showcase types
│   └── index.ts                 # Barrel exports
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
├── vitest.config.ts             # Vitest test configuration
├── playwright.config.ts         # Playwright E2E configuration
├── .simple-git-hooks.json       # Git hooks configuration
├── .env.example                 # Environment variables example
└── README.md                    # Project README
```

### Nuxt Configuration (`apps/site/nuxt.config.ts`)

```typescript
export default defineNuxtConfig({
  // Modules
  modules: [
    '@nuxt/content',           // Content management
    '@nuxt/image',             // Image optimization
    '@nuxt/seo',               // SEO utilities
    '@pinia/nuxt',             // State management
    '@vueuse/nuxt',            // Vue composables
    '@nuxtjs/tailwindcss',     // Tailwind CSS
    '@nuxtjs/color-mode',      // Dark mode support
    'nuxt-icon',               // Iconify integration
  ],
  
  // GitHub Pages configuration
  ssr: false,
  target: 'static',
  
  // Content configuration
  content: {
    documentDriven: true,
    highlight: {
      // Shiki configuration for code highlighting
      theme: {
        default: 'github-light',
        dark: 'github-dark',
      },
      preload: ['javascript', 'typescript', 'vue', 'html', 'css', 'json', 'bash'],
    },
    markdown: {
      toc: {
        depth: 3,
        searchDepth: 3,
      },
      remarkPlugins: [
        'remark-gfm',           // GitHub Flavored Markdown
      ],
    },
  },
  
  // Build configuration
  nitro: {
    prerender: {
      routes: ['/sitemap.xml', '/robots.txt'],
      crawlLinks: true,
    },
  },
  
  // Experimental features
  experimental: {
    payloadExtraction: true,
    viewTransition: true,
  },
  
  // TypeScript configuration
  typescript: {
    strict: true,
    shim: false,
  },
  
  // Runtime configuration
  runtimeConfig: {
    public: {
      siteUrl: 'https://openseadragon.github.io',
      githubRepo: 'openseadragon/openseadragon',
    },
  },
  
  // Hooks for Pagefind search indexing
  hooks: {
    'nitro:build:public-assets': async () => {
      const { execSync } = await import('child_process')
      // Generate Pagefind search index after build
      execSync('npx pagefind --source .output/public --bundle-dir pagefind', {
        stdio: 'inherit',
      })
    },
  },
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
    "postbuild": "npx pagefind --source .output/public",
    "lint": "oxlint src",
    "lint:fix": "oxlint src --fix",
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:watch": "vitest --watch",
    "test:coverage": "vitest --coverage",
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui",
    "typecheck": "nuxt typecheck",
    "analyze": "nuxt analyze",
    "deps:check": "taze",
    "deps:update": "taze -i -w",
    "prepare": "simple-git-hooks",
    "clean": "nuxt cleanup"
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

## Key Architectural Decisions

### Component Organization
- **Feature-based structure**: Components grouped by feature (docs, playground, plugins, etc.)
- **Reusable UI library**: Shared UI components in dedicated folder
- **Smart/Dumb components**: Container components manage state, presentational components are pure

### State Management
- **Pinia stores**: For complex shared state (user preferences, plugin data)
- **Composables**: For reusable logic and local state
- **Nuxt Data**: For server-fetched data with caching

### Data Flow
- **Static generation**: Pre-render all routes at build time
- **Client-side hydration**: Interactive features load after hydration
- **API routes**: Server API for dynamic features (plugin submission, search)
- **JSON data files**: Static plugin/showcase registry data

### Search Strategy
- **Pagefind**: Primary free static search solution
- **Build-time indexing**: Search index generated during build
- **Lazy loading**: Search assets loaded on-demand
- **Fuse.js fallback**: Client-side search for smaller datasets

### Code Highlighting
- **Shiki Twoslash**: Type-aware syntax highlighting for TypeScript/JavaScript
- **Multi-theme support**: Light/dark theme variants
- **Language preloading**: Common languages preloaded for performance

### Plugin Architecture
- **Registry-based**: Plugins registered in JSON with metadata
- **Version tracking**: Compatibility with OSD versions tracked
- **Live preview**: Interactive preview environment for testing
- **Community-driven**: Submission system for community plugins

### Performance Optimization
- **Code splitting**: Automatic route-based splitting
- **Lazy loading**: Components/assets loaded on-demand
- **Image optimization**: Nuxt Image for automatic optimization
- **Build-time rendering**: Pre-render everything possible

### Testing Strategy
- **Unit tests**: Vitest for component/composable testing
- **E2E tests**: Playwright for full integration testing
- **Type checking**: TypeScript strict mode
- **Linting**: oxlint for fast linting

### Deployment
- **GitHub Actions**: Automated build and deploy
- **GitHub Pages**: Static hosting
- **Preview deployments**: PR previews for review
- **Cache optimization**: Aggressive caching strategy