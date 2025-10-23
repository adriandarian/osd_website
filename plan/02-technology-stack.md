# Technology Stack

## Core Framework

### Frontend Framework
- **Vue 3**: Composition API with `<script setup>`
- **Nuxt 3**: Meta-framework for SSG (Static Site Generation)
- **TypeScript**: Full TypeScript support throughout
- **Package Manager**: Bun (faster installs, better monorepo support)
- **Build Tool**: Vite (included with Nuxt)

### Key Nuxt Modules
- **@nuxt/content**: Markdown-first content management
- **@nuxt/image**: Optimized image loading
- **@nuxt/seo**: SEO optimization
- **@pinia/nuxt**: State management
- **@vueuse/nuxt**: Auto-imported composables

## UI & Styling

### CSS and Design
- **CSS Framework**: Tailwind CSS
- **Component Library**: Radix-Vue or shadcn-vue (accessible primitives)
- **Icons**: @nuxt/icon (100,000+ icons from Iconify)
- **Animations**: Nuxt Motion (Vue-based framer-motion equivalent)
- **Internationalization**: Vue I18n (multi-language support)

## Development Tools

### Core Development
- **Vue DevTools**: Browser extension for debugging
- **Nuxt DevTools**: Integrated development experience
- **Vite DevTools**: Build analysis and debugging
- **Bundle Analysis**: vite-bundle-visualizer for performance insights
- **Dependency Management**: taze for automated updates
- **Module Inspector**: node-modules-inspector for dependency analysis

### oxc Suite (Ultra-Fast Tooling)
- **oxlint**: 50-100x faster than ESLint
- **oxc bundler**: Future Vite replacement (when stable)
- **oxc minifier**: Faster than Terser/esbuild
- **oxc parser**: Blazing fast TypeScript/JSX parsing

### Quality & Testing
- **Testing**: Vitest + @nuxt/test-utils
- **Git Hooks**: simple-git-hooks for pre-commit linting
- **Code Quality**: oxlint + Prettier
- **Type Checking**: TypeScript with oxc parser

## Content & Documentation

### Content Management
- **Documentation**: Nuxt Content (markdown-first with Vue components)
- **Search**: @nuxt/content built-in search (GitHub Pages compatible)
- **Code Highlighting**: Shiki (better than Prism)
- **Markdown**: Enhanced with custom components

### Interactive Features
- **Playground**: Monaco Editor + @vue/repl
- **State Management**: Pinia (for complex state)
- **Composables**: VueUse (utility functions)
- **Data Fetching**: Nuxt's built-in $fetch
- **Forms**: VeeValidate + Zod (if needed)

## Vue Ecosystem Deep Dive

### State Management
- **Pinia**: Modern Vuex replacement, TypeScript-first
- **VueUse**: 200+ utility composables
  - `useLocalStorage()` - persist state
  - `useIntersectionObserver()` - lazy loading
  - `useEventListener()` - event handling
  - `useClipboard()` - copy to clipboard
  - `useDark()` - dark mode toggle
- **Reactivity APIs**: `ref()`, `reactive()`, `computed()`, `watch()`

### UI Libraries & Components
- **Radix-Vue**: Unstyled, accessible components (headless UI)
- **shadcn-vue**: Pre-styled Radix-Vue components with Tailwind
- **Naive UI**: Complete component library (alternative)
- **PrimeVue**: Enterprise-grade components (fallback option)

### Animation & Interactions
- **Nuxt Motion**: Vue port of Framer Motion
- **Vue Transition**: Built-in transition components
- **GSAP**: For complex animations (if needed)
- **Lottie Vue**: Lottie animations (if needed)

### Charts & Visualization
- **Vue ECharts**: Apache ECharts for Vue
- **Chart.js Vue**: Chart.js wrapper
- **D3 + Vue**: Custom visualizations (if needed)

## Performance & Optimization

### Build Optimization
- **Tree Shaking**: ES modules with automatic dead code elimination
- **Code Splitting**: Route-based and component-based splitting
- **Bundle Analysis**: vite-bundle-visualizer for optimization insights
- **Minification**: oxc minifier for production builds

### Loading Strategies
- **Image Optimization**: Nuxt Image with lazy loading
- **Component Lazy Loading**: Dynamic imports for heavy components
- **Progressive Enhancement**: Core content accessible without JS
- **Service Worker**: Future offline capability

## Deployment & CI/CD

### GitHub Pages Setup
- **Static Generation**: Nuxt SSG mode
- **Build Process**: GitHub Actions automation
- **Domain**: openseadragon.github.io (existing)
- **CDN**: GitHub Pages built-in CDN

### Development Workflow
- **Version Control**: Git with conventional commits
- **Code Quality**: Pre-commit hooks with oxlint
- **Testing**: Automated testing in CI/CD
- **Dependency Updates**: Automated with taze

## Why These Choices?

### Vue 3 + Nuxt Benefits
- **Developer Experience**: Excellent TypeScript integration
- **Performance**: Fast SSG with optimal bundle sizes
- **Ecosystem**: Rich ecosystem with active community
- **Learning Curve**: Familiar for developers coming from other frameworks

### Bun Over npm/pnpm
- **Speed**: 2-3x faster installs
- **All-in-one**: Package manager + bundler + test runner
- **Future-proof**: Active development, growing ecosystem
- **Monorepo**: Better workspace handling

### oxc Suite Benefits
- **Performance**: 10-100x faster than JavaScript-based tools
- **Reliability**: Rust-based tools are more stable
- **Future**: Next-generation tooling that's production-ready
- **Cost**: Reduced CI/CD costs due to faster builds

### GitHub Pages Constraints
- **Static Only**: No server-side functionality
- **Cost**: Zero hosting costs
- **Simplicity**: Simple deployment workflow
- **Reliability**: High uptime and performance