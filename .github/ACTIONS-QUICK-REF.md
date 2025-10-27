# GitHub Actions Quick Reference

## 🚀 Workflow Triggers

| Workflow | Trigger | Purpose |
|----------|---------|---------|
| **Deploy** | Push to `main` | Deploy to GitHub Pages |
| **PR Checks** | Pull Request | Code quality validation |
| **Content Validation** | Content changes | Markdown & image checks |
| **Dependency Updates** | Weekly / Manual | Update dependencies |
| **Lighthouse CI** | Pull Request | Performance monitoring |

## ⚡ Quick Commands

### Run Checks Locally
```bash
# Quality checks (runs automatically on commit)
bun run lint
bun run typecheck

# Testing
bun run test
bun run test:coverage

# Build verification
bun run generate
```

### Manual Workflow Triggers
1. Go to **Actions** tab on GitHub
2. Select workflow
3. Click **Run workflow**
4. Choose branch
5. Click green **Run workflow** button

## 📊 Status Badges

Add to README.md:

```markdown
![Deploy](https://github.com/adriandarian/osd_website/actions/workflows/deploy.yml/badge.svg)
![PR Checks](https://github.com/adriandarian/osd_website/actions/workflows/pr-checks.yml/badge.svg)
![Content Validation](https://github.com/adriandarian/osd_website/actions/workflows/content-validation.yml/badge.svg)
```

## 🔍 Debugging Failed Workflows

### Lint Failures
```bash
bun run lint:fix    # Auto-fix
```

### Type Errors
```bash
bun run typecheck   # See errors
```

### Test Failures
```bash
bun run test:watch  # Debug mode
```

### Build Failures
```bash
bun run generate    # Local build
```

## 📈 Performance Budgets

| Metric | Budget | Current |
|--------|--------|---------|
| Initial JS | < 100KB | Check Actions |
| Performance | > 85 | Check Lighthouse |
| Accessibility | > 95 | Check Lighthouse |
| Best Practices | > 90 | Check Lighthouse |
| SEO | > 95 | Check Lighthouse |

## 🎯 Workflow Success Criteria

### Deploy
- ✅ Build succeeds
- ✅ Artifacts uploaded
- ✅ Deployed to GitHub Pages

### PR Checks
- ✅ Lint passes
- ✅ Types check
- ✅ Tests pass
- ✅ Build succeeds

### Content Validation
- ✅ Frontmatter valid
- ✅ No broken links
- ✅ Images exist
- ✅ Markdown valid

### Lighthouse CI
- ✅ Performance > 85
- ✅ Accessibility > 95
- ✅ Bundle size < 100KB

## 🔧 Configuration Files

| File | Purpose |
|------|---------|
| `.lighthouserc.json` | Lighthouse budgets |
| `.markdownlint.json` | Markdown linting rules |
| `vitest.config.ts` | Test configuration |
| `nuxt.config.ts` | Build configuration |

## 📝 Commit Conventions

```bash
feat:     # New feature
fix:      # Bug fix
docs:     # Documentation
style:    # Formatting
refactor: # Code restructure
perf:     # Performance
test:     # Tests
chore:    # Maintenance
ci:       # CI/CD
```

## 🚦 Branch Protection (Recommended)

Enable in Settings > Branches:

- ✅ Require pull request reviews
- ✅ Require status checks to pass
- ✅ Require branches to be up to date
- ✅ Require linear history
- ✅ Include administrators

### Status Checks to Require:
- Lint Code
- TypeScript Type Check
- Run Tests
- Build Check

## 📞 Need Help?

- **Workflow logs**: Actions tab > Click workflow > View details
- **Re-run workflows**: Click "Re-run jobs"
- **Cancel runs**: Click "Cancel workflow"
- **Documentation**: `.github/ACTIONS-SETUP.md`

---

**Last Updated**: October 26, 2025
