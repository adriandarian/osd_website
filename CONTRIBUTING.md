# Contributing to OpenSeadragon Website

Thank you for your interest in contributing to the OpenSeadragon website! This document provides guidelines and instructions for contributing.

## 🚀 Quick Start

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/osd_website.git
   cd osd_website/apps/site
   ```
3. **Install dependencies**:
   ```bash
   bun install
   ```
4. **Start development server**:
   ```bash
   bun run dev
   ```

## 🌳 Branch Strategy

- `main` - Production-ready code
- `develop` - Development branch (if used)
- `feature/*` - New features
- `fix/*` - Bug fixes
- `docs/*` - Documentation updates

## 📝 Commit Conventions

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add new feature
fix: bug fix
docs: documentation changes
style: formatting, missing semi colons, etc
refactor: code restructuring
perf: performance improvements
test: adding tests
chore: maintenance tasks
ci: CI/CD changes
```

### Examples
```bash
git commit -m "feat: add interactive playground with Monaco editor"
git commit -m "fix: resolve mobile navigation menu not closing"
git commit -m "docs: update getting started guide with npm instructions"
```

## 🔄 Pull Request Process

1. **Create a feature branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** and commit them with clear messages

3. **Run quality checks**:
   ```bash
   bun run lint        # Lint your code
   bun run typecheck   # Check TypeScript types
   bun run test        # Run tests
   bun run build       # Verify build works
   ```

4. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

5. **Open a Pull Request** on GitHub with:
   - Clear title and description
   - Link to related issue (if applicable)
   - Screenshots for UI changes
   - Test results

6. **Wait for review** and address feedback

7. **Once approved**, your PR will be merged!

## 🧪 Testing

### Running Tests
```bash
# Run all tests
bun run test

# Run tests in watch mode
bun run test:watch

# Run with coverage
bun run test:coverage
```

### Writing Tests
- Write tests for new features and bug fixes
- Place tests next to the code they test (`.test.ts` or `.spec.ts`)
- Use descriptive test names
- Aim for 70%+ code coverage

## 📚 Documentation

### Adding Documentation
1. Create markdown files in `apps/site/content/docs/`
2. Use proper frontmatter:
   ```yaml
   ---
   title: Page Title
   description: Brief description
   category: guide
   tags: [tag1, tag2]
   ---
   ```
3. Follow the [Documentation Standards](../plan/08-documentation-standards.md)

### Content Guidelines
- Use clear, concise language
- Include code examples
- Add screenshots for visual features
- Link to related documentation
- Test all code examples

## 🎨 Style Guidelines

### Code Style
- Use TypeScript for all new code
- Follow existing code patterns
- Use meaningful variable names
- Add comments for complex logic
- Keep functions small and focused

### Vue Components
- Use `<script setup>` syntax
- Use Composition API
- Props and emits should be typed
- Use composables for reusable logic

### CSS/Tailwind
- Use Tailwind utility classes
- Follow mobile-first responsive design
- Support dark mode
- Ensure accessibility (contrast, focus states)

## ♿ Accessibility

All contributions must maintain accessibility:
- WCAG 2.1 AA compliance
- Keyboard navigation support
- Screen reader compatibility
- Sufficient color contrast
- Semantic HTML

## 🐛 Reporting Bugs

1. Check if the bug is already reported
2. Use the [Bug Report template](.github/ISSUE_TEMPLATE/bug_report.md)
3. Include:
   - Clear description
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots/videos
   - Environment details (browser, OS, device)

## 💡 Suggesting Features

1. Check if the feature is already requested
2. Use the [Feature Request template](.github/ISSUE_TEMPLATE/feature_request.md)
3. Explain:
   - What problem it solves
   - How it should work
   - Who would benefit
   - Alternatives considered

## 📋 Project Structure

```
apps/site/
├── components/      # Vue components
├── content/         # Markdown content
├── layouts/         # Page layouts
├── pages/           # Route pages
├── composables/     # Vue composables
├── utils/           # Utility functions
├── assets/          # Static assets
├── public/          # Public files
└── plugins/         # Nuxt plugins
```

## 🔧 Development Tools

### Available Commands
```bash
bun run dev          # Start dev server
bun run build        # Build for production
bun run generate     # Generate static site
bun run preview      # Preview production build
bun run lint         # Lint code
bun run lint:fix     # Auto-fix linting issues
bun run typecheck    # Check TypeScript
bun run test         # Run tests
bun run analyze      # Analyze bundle
```

### Git Hooks
Pre-commit hooks automatically run:
- Linting (`bun run lint`)
- Type checking (`bun run typecheck`)

## 🤝 Code Review

### As a Contributor
- Respond promptly to feedback
- Be open to suggestions
- Ask questions if unclear
- Update your PR based on feedback

### As a Reviewer
- Be respectful and constructive
- Explain the "why" behind suggestions
- Approve when ready
- Provide clear next steps

## 📞 Getting Help

- **Questions**: Open a [GitHub Discussion](https://github.com/openseadragon/openseadragon/discussions)
- **Bugs**: Open an [Issue](https://github.com/adriandarian/osd_website/issues)
- **Chat**: Join the OpenSeadragon community channels

## 📄 License

By contributing, you agree that your contributions will be licensed under the same license as the project.

## 🙏 Thank You

Your contributions make OpenSeadragon better for everyone. We appreciate your time and effort!

---

**Questions?** Feel free to ask in GitHub Discussions or open an issue.
