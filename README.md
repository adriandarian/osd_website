# OpenSeadragon Website

Modern, interactive website for OpenSeadragon built with Vue 3 and Nuxt.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- Bun (package manager)

### Installation

```bash
```bash
# Clone the repository
git clone https://github.com/adriandarian/osd_website.git
cd osd_website

# Install dependencies
bun install

# Start development server
bun run dev
```
```

Visit [http://localhost:3000](http://localhost:3000)

## 📜 Available Scripts

### Development
- `bun run dev` - Start dev server (localhost:3000)
- `bun run dev:host` - Expose to network
- `bun run dev:https` - HTTPS development

### Building
- `bun run build` - Production build
- `bun run generate` - Generate static site
- `bun run preview` - Preview production build

### Quality
- `bun run lint` - Lint with oxlint
- `bun run lint:fix` - Fix linting issues
- `bun run typecheck` - TypeScript checking
- `bun run test` - Run tests
- `bun run test:watch` - Watch mode tests
- `bun run test:coverage` - Coverage report

### Analysis
- `bun run analyze` - Bundle analysis

## 🏗️ Project Structure

```
osd_website/
├── components/          # Vue components
│   ├── landing/        # Landing page components
│   ├── docs/           # Documentation components
│   ├── examples/       # Example components
│   ├── playground/     # Playground components
│   └── ui/             # Reusable UI components
├── content/            # Markdown content
│   ├── docs/          # Documentation
│   ├── examples/      # Example tutorials
│   └── guides/        # User guides
├── layouts/            # Page layouts
├── pages/              # Route pages
├── composables/        # Vue composables
├── utils/              # Utility functions
├── assets/             # Static assets
├── public/             # Public files
├── plugins/            # Nuxt plugins
├── plan/              # Project documentation
├── .github/           # GitHub workflows and templates
└── README.md          # This file
```

## 🛠️ Tech Stack

- **Framework**: Nuxt 4
- **UI**: Vue 3 + TypeScript
- **Styling**: Tailwind CSS
- **Content**: @nuxt/content
- **Icons**: @nuxt/icon
- **State**: Pinia
- **Testing**: Vitest
- **Linting**: oxlint

## 🎨 Features

- 🎯 Static Site Generation (SSG)
- 🌙 Dark/Light mode
- 📱 Fully responsive
- ♿ Accessible (WCAG 2.1 AA)
- 🔍 Built-in search
- 📊 SEO optimized
- ⚡ Performance optimized

## 📚 Documentation

See the [plan/](../../plan/) directory for comprehensive documentation:

- [Project Overview](../../plan/01-project-overview.md)
- [Architecture](../../plan/02-architecture-overview.md)
- [Technology Stack](../../plan/03-technology-stack.md)
- [Project Structure](../../plan/04-project-structure.md)
- [Timeline](../../plan/05-timeline.md)

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Run tests and linting
4. Submit a pull request

## 📄 License

See the main repository for license information.
