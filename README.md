# OpenSeadragon Website Modernization

![Deploy](https://github.com/adriandarian/osd_website/actions/workflows/deploy.yml/badge.svg)
![PR Checks](https://github.com/adriandarian/osd_website/actions/workflows/pr-checks.yml/badge.svg)

Modern, interactive website for [OpenSeadragon](https://github.com/openseadragon/openseadragon) built with **Vue 3**, **Nuxt 4**, and **TypeScript**.

## ✨ Features

- 🎯 **Static Site Generation** (SSG) for GitHub Pages
- 🌙 **Dark/Light Mode** with system preference detection
- 📱 **Fully Responsive** mobile-first design
- ♿ **Accessible** (WCAG 2.1 AA compliant)
- 🔍 **Fast Search** with built-in @nuxt/content search
- 📊 **SEO Optimized** with meta tags and sitemaps
- ⚡ **Performance Optimized** with code splitting and lazy loading
- 🧪 **Fully Tested** with Vitest and Testing Library
- 🚀 **CI/CD Ready** with automated GitHub Actions workflows

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ 
- **Bun** (package manager)

### Installation

```bash
# Clone the repository
git clone https://github.com/adriandarian/osd_website.git
cd osd_website/apps/site

# Install dependencies
bun install

# Start development server
bun run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## 📜 Available Commands

### Development
```bash
bun run dev              # Start dev server (localhost:3000)
bun run dev:host         # Expose to network
bun run dev:https        # HTTPS development
```

### Building
```bash
bun run build            # Production build
bun run generate         # Generate static site
bun run preview          # Preview production build
```

### Quality
```bash
bun run lint             # Lint with oxlint
bun run lint:fix         # Fix linting issues
bun run typecheck        # TypeScript checking
bun run test             # Run tests
bun run test:watch       # Watch mode tests
bun run test:coverage    # Coverage report
```

### Analysis
```bash
bun run analyze          # Bundle analysis
```

## 🏗️ Project Structure

```
osd_website/
├── apps/
│   └── site/                    # Main Nuxt application
│       ├── components/          # Vue components
│       │   ├── landing/        # Landing page components
│       │   ├── docs/           # Documentation components
│       │   ├── examples/       # Example components
│       │   ├── playground/     # Playground components
│       │   └── ui/             # Reusable UI components
│       ├── content/            # Markdown content
│       │   ├── docs/          # Documentation
│       │   ├── examples/      # Example tutorials
│       │   └── guides/        # User guides
│       ├── layouts/            # Page layouts
│       ├── pages/              # Route pages
│       ├── composables/        # Vue composables
│       ├── utils/              # Utility functions
│       ├── assets/             # Static assets
│       ├── public/             # Public files
│       └── plugins/            # Nuxt plugins
├── plan/                        # Project documentation
├── .github/                     # GitHub workflows and templates
└── README.md                    # This file
```

## �️ Tech Stack

- **Framework**: [Nuxt 4](https://nuxt.com/) (Vue 3 meta-framework)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Content**: [@nuxt/content](https://content.nuxt.com/) (Markdown-based CMS)
- **Icons**: [@nuxt/icon](https://nuxt.com/modules/icon) (100,000+ icons)
- **Images**: [@nuxt/image](https://image.nuxt.com/) (Image optimization)
- **State**: [Pinia](https://pinia.vuejs.org/) (State management)
- **Testing**: [Vitest](https://vitest.dev/) + [Testing Library](https://testing-library.com/)
- **Linting**: [oxlint](https://oxc.rs/) (Ultra-fast linter)
- **Package Manager**: [Bun](https://bun.sh/)

## 📚 Documentation

Comprehensive planning documents are available in the [`plan/`](./plan/) directory:

- [Project Overview](./plan/01-project-overview.md)
- [Architecture Overview](./plan/02-architecture-overview.md)
- [Technology Stack](./plan/03-technology-stack.md)
- [Project Structure](./plan/04-project-structure.md)
- [Implementation Timeline](./plan/05-timeline.md)
- [Site Structure & Features](./plan/06-site-structure.md)
- [Content Strategy](./plan/07-content-strategy.md)
- [Documentation Standards](./plan/08-documentation-standards.md)
- [Search Strategy](./plan/09-search-strategy.md)
- [Performance Strategy](./plan/10-performance.md)
- [Development & Deployment](./plan/11-development-deployment.md)
- [GitHub Actions Workflows](./plan/12-github-actions-workflows.md)
- [Testing Strategy](./plan/13-testing-strategy.md)
- [Migration Strategy](./plan/14-migration-strategy.md)
- [Monitoring & Analytics](./plan/15-monitoring-analytics.md)
- [Accessibility Details](./plan/16-accessibility-details.md)
- [Internationalization](./plan/17-internationalization.md)
- [Community Engagement](./plan/18-community-engagement.md)
- [Playground Expansion](./plan/19-playground-expansion.md)
- [Documentation Enhancements](./plan/20-documentation-enhancements.md)
- [Plugin & Extension Hub](./plan/21-plugin-extension-hub.md)
- [Future Enhancements](./plan/22-future-enhancements.md)
- [🎯 Build Process Flow](./plan/BUILD-PROCESS-FLOW.md) ⭐ **Start Here**

## 🔄 GitHub Actions

Automated CI/CD workflows are configured for:

- ✅ **Deployment** to GitHub Pages on push to `main`
- ✅ **PR Quality Checks** (lint, typecheck, test, build)
- ✅ **Content Validation** (markdown, images, links)
- ✅ **Dependency Updates** (weekly automated updates)
- ✅ **Lighthouse CI** (performance monitoring)

See [GitHub Actions Setup](./.github/ACTIONS-SETUP.md) for details.

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

### Quick Contribution Steps

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run quality checks (`bun run lint && bun run typecheck && bun run test`)
5. Commit your changes (`git commit -m 'feat: add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## 📊 Project Status

**Current Phase**: ✅ **Phase 0 Complete** - Foundation & Setup

**Next Phase**: 📚 Phase 1 - Core Content & Documentation

See [Build Process Flow](./plan/BUILD-PROCESS-FLOW.md) for the complete roadmap.

### Completed ✅
- Nuxt 4 application initialized
- Core dependencies installed and configured
- Project structure created
- Tailwind CSS configured with design tokens
- Development tooling setup (oxlint, Prettier, git hooks)
- Basic layouts and navigation
- Dark/light mode implemented
- GitHub Actions workflows configured
- Testing framework ready

### In Progress 🚧
- Documentation infrastructure
- Examples gallery
- Interactive playground

### Upcoming 📋
- Plugin directory
- Performance optimization
- Testing & QA
- Production deployment

## 📄 License

See the [OpenSeadragon repository](https://github.com/openseadragon/openseadragon) for license information.

## 🙏 Acknowledgments

- [OpenSeadragon](https://openseadragon.github.io/) - The amazing library this website is for
- [Nuxt](https://nuxt.com/) - The Vue framework that powers this site
- All contributors and community members

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/adriandarian/osd_website/issues)
- **Discussions**: [GitHub Discussions](https://github.com/openseadragon/openseadragon/discussions)
- **OpenSeadragon Docs**: [openseadragon.github.io](https://openseadragon.github.io/)

---

Built with ❤️ by the OpenSeadragon community

