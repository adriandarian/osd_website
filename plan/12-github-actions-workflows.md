# GitHub Actions Workflows

## Overview

This document outlines the GitHub Actions workflows needed for the OpenSeadragon website modernization, from essential CI/CD pipelines to optional enhancement workflows.

## Essential Workflows (Required)

### 1. CI/CD Pipeline - Build and Deploy

**File**: `.github/workflows/deploy.yml`

**Purpose**: Build and deploy the site to GitHub Pages on every push to main.

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Bun
        uses: oven-sh/setup-bun@v1
        with:
          bun-version: latest

      - name: Install dependencies
        run: bun install --frozen-lockfile

      - name: Generate static site
        run: bun run generate

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: .output/public

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

**Benefits**:
- ✅ Automatic deployment on merge to main
- ✅ Manual trigger option (workflow_dispatch)
- ✅ Proper GitHub Pages integration
- ✅ Artifact caching for faster deployments

---

### 2. Pull Request Quality Checks

**File**: `.github/workflows/pr-checks.yml`

**Purpose**: Run quality checks on every pull request to ensure code standards.

```yaml
name: PR Quality Checks

on:
  pull_request:
    branches: [main, develop]

jobs:
  lint:
    name: Lint with oxlint
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - uses: oven-sh/setup-bun@v1
        with:
          bun-version: latest

      - name: Install dependencies
        run: bun install --frozen-lockfile

      - name: Run oxlint
        run: bun run lint

  typecheck:
    name: TypeScript Type Checking
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - uses: oven-sh/setup-bun@v1
        with:
          bun-version: latest

      - name: Install dependencies
        run: bun install --frozen-lockfile

      - name: Type check
        run: bun run typecheck

  test:
    name: Run Tests
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - uses: oven-sh/setup-bun@v1
        with:
          bun-version: latest

      - name: Install dependencies
        run: bun install --frozen-lockfile

      - name: Run tests
        run: bun run test

      - name: Upload coverage
        uses: codecov/codecov-action@v4
        with:
          files: ./coverage/coverage-final.json

  build:
    name: Test Build
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - uses: oven-sh/setup-bun@v1
        with:
          bun-version: latest

      - name: Install dependencies
        run: bun install --frozen-lockfile

      - name: Build site
        run: bun run generate

      - name: Check bundle size
        run: bun run analyze
```

**Benefits**:
- ✅ Catch issues before merging
- ✅ Enforce code quality standards
- ✅ Automated testing and type checking
- ✅ Bundle size monitoring

---

### 3. Content Validation

**File**: `.github/workflows/content-validation.yml`

**Purpose**: Validate markdown content and frontmatter schemas.

```yaml
name: Content Validation

on:
  pull_request:
    paths:
      - 'content/**/*.md'
      - 'content/**/*.yml'

jobs:
  validate:
    name: Validate Content
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - uses: oven-sh/setup-bun@v1
        with:
          bun-version: latest

      - name: Install dependencies
        run: bun install --frozen-lockfile

      - name: Validate content
        run: bun run content:validate

      - name: Check for broken links
        run: bun run content:check-links

      - name: Validate frontmatter
        run: bun run content:check-frontmatter

      - name: Check image references
        run: bun run content:check-images
```

**Benefits**:
- ✅ Prevent broken links from being merged
- ✅ Ensure frontmatter consistency
- ✅ Validate image references exist
- ✅ Maintain content quality

---

## Recommended Workflows (Should Have)

### 4. Automated Dependency Updates

**File**: `.github/workflows/dependency-updates.yml`

**Purpose**: Keep dependencies up-to-date automatically.

#### Option A: Custom Workflow with taze (Recommended)

```yaml
name: Dependency Updates

on:
  schedule:
    - cron: '0 0 * * 1' # Every Monday at midnight
  workflow_dispatch:

jobs:
  update:
    name: Update Dependencies
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          token: ${{ secrets.GITHUB_TOKEN }}

      - uses: oven-sh/setup-bun@v1
        with:
          bun-version: latest

      - name: Update dependencies
        run: bunx taze -w

      - name: Install updated dependencies
        run: bun install

      - name: Run tests
        run: bun run test

      - name: Create Pull Request
        uses: peter-evans/create-pull-request@v6
        with:
          commit-message: 'chore: update dependencies'
          title: 'chore: automated dependency updates'
          body: |
            Automated dependency updates by taze.
            
            Please review changes and merge if tests pass.
          branch: chore/dependency-updates
          delete-branch: true
```

**Benefits**:
- ✅ Automated security updates
- ✅ Stay current with ecosystem
- ✅ Reduces manual maintenance
- ✅ Tested before creating PR
- ✅ Single consolidated PR per week
- ✅ Full control over update strategy

#### Option B: Dependabot (Alternative)

**File**: `.github/dependabot.yml`

```yaml
version: 2
updates:
  # npm/bun dependencies
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
      day: "monday"
    open-pull-requests-limit: 5
    groups:
      # Group all minor/patch updates together
      production-dependencies:
        dependency-type: "production"
        update-types:
          - "minor"
          - "patch"
      development-dependencies:
        dependency-type: "development"
        update-types:
          - "minor"
          - "patch"
    # Keep major version updates separate for review
    ignore:
      - dependency-name: "*"
        update-types: ["version-update:semver-major"]

  # GitHub Actions updates
  - package-ecosystem: "github-actions"
    directory: "/"
    schedule:
      interval: "weekly"
    open-pull-requests-limit: 3
```

**Benefits**:
- ✅ Built-in GitHub feature (no custom workflow)
- ✅ Security vulnerability alerts
- ✅ Automatic PR creation
- ✅ Supports multiple package ecosystems
- ✅ Zero configuration needed beyond YAML

#### Comparison: taze vs Dependabot

| Feature | Custom taze Workflow | Dependabot |
|---------|---------------------|------------|
| **Setup Complexity** | Medium | Low |
| **PRs per Update** | 1 consolidated PR | Multiple PRs (can be grouped) |
| **Control** | Full control | Limited customization |
| **Update Strategy** | All updates together | Granular per dependency |
| **Test Before PR** | ✅ Yes (in workflow) | ⚠️ After PR creation |
| **Bun Support** | ✅ Native | ⚠️ Via npm ecosystem |
| **Major Version Updates** | ✅ Included by default | ⚠️ Can be configured |
| **Security Alerts** | ⚠️ Manual | ✅ Automatic GitHub integration |
| **Cost** | Free | Free |
| **Ecosystem Support** | npm/bun only | npm, Actions, Docker, etc. |

#### Recommended Approach: Hybrid Strategy

Use **both** for maximum coverage and efficiency:

```yaml
# .github/dependabot.yml
version: 2
updates:
  # Let Dependabot handle GitHub Actions updates
  - package-ecosystem: "github-actions"
    directory: "/"
    schedule:
      interval: "weekly"
      day: "monday"
    
  # Let Dependabot handle SECURITY updates only
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "daily"
    open-pull-requests-limit: 10
    # Only create PRs for security vulnerabilities
    # All other updates handled by taze workflow
```

**Combined Strategy Benefits**:
1. **Dependabot** handles:
   - Security vulnerabilities (immediate PRs)
   - GitHub Actions updates (separate ecosystem)
   - Automatic security alerts in GitHub UI

2. **taze Workflow** handles:
   - Regular dependency updates (consolidated weekly PR)
   - All updates tested before PR creation
   - Single PR to review instead of many
   - Better control over update timing

#### Configuration Examples

**For security-focused projects** (use Dependabot):
```yaml
# Dependabot with aggressive security updates
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "daily"
    open-pull-requests-limit: 20
```

**For maintenance-light projects** (use taze):
```yaml
# Monthly consolidated updates
on:
  schedule:
    - cron: '0 0 1 * *' # First day of every month
```

**For active development** (hybrid approach):
- Dependabot: Security only
- taze: Weekly updates for everything else

---

### 5. Performance Monitoring

**File**: `.github/workflows/performance.yml`

**Purpose**: Monitor performance metrics on every deployment.

```yaml
name: Performance Monitoring

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  lighthouse:
    name: Lighthouse CI
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - uses: oven-sh/setup-bun@v1
        with:
          bun-version: latest

      - name: Install dependencies
        run: bun install --frozen-lockfile

      - name: Build site
        run: bun run generate

      - name: Run Lighthouse CI
        uses: treosh/lighthouse-ci-action@v11
        with:
          urls: |
            http://localhost:3000/
            http://localhost:3000/docs/
            http://localhost:3000/examples/
            http://localhost:3000/playground/
          uploadArtifacts: true
          temporaryPublicStorage: true

      - name: Comment PR with results
        uses: actions/github-script@v7
        if: github.event_name == 'pull_request'
        with:
          script: |
            const fs = require('fs');
            const results = JSON.parse(fs.readFileSync('./lhci_reports/manifest.json'));
            // Post comment with Lighthouse scores
```

**Benefits**:
- ✅ Track performance over time
- ✅ Catch performance regressions
- ✅ Visual reports on PRs
- ✅ Historical data for analysis

---

### 6. Bundle Size Tracking

**File**: `.github/workflows/bundle-size.yml`

**Purpose**: Track and report bundle size changes.

```yaml
name: Bundle Size Check

on:
  pull_request:
    branches: [main]

jobs:
  check:
    name: Check Bundle Size
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - uses: oven-sh/setup-bun@v1
        with:
          bun-version: latest

      - name: Install dependencies
        run: bun install --frozen-lockfile

      - name: Build and analyze
        run: bun run build && bun run analyze

      - name: Upload bundle stats
        uses: actions/upload-artifact@v4
        with:
          name: bundle-stats
          path: .output/stats.json

      - name: Compare with base
        uses: github/bundle-size-action@v1
        with:
          base-stats: main
          current-stats: .output/stats.json
          max-increase: 5% # Fail if bundle grows by more than 5%

      - name: Comment on PR
        uses: actions/github-script@v7
        with:
          script: |
            // Post bundle size comparison comment
```

**Benefits**:
- ✅ Prevent bundle bloat
- ✅ Visual size comparison on PRs
- ✅ Enforce size budgets
- ✅ Track size trends over time

---

## Enhancement Workflows (Nice to Have)

### 7. Automated Screenshot Testing

**File**: `.github/workflows/visual-regression.yml`

**Purpose**: Catch visual regressions with automated screenshots.

```yaml
name: Visual Regression Testing

on:
  pull_request:
    branches: [main]

jobs:
  screenshots:
    name: Visual Regression
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - uses: oven-sh/setup-bun@v1
        with:
          bun-version: latest

      - name: Install dependencies
        run: bun install --frozen-lockfile

      - name: Build site
        run: bun run build

      - name: Install Playwright
        run: bunx playwright install --with-deps

      - name: Run visual tests
        run: bunx playwright test

      - name: Upload screenshots
        uses: actions/upload-artifact@v4
        if: always()
        with:
          name: visual-diffs
          path: test-results/

      - name: Comment on PR
        uses: actions/github-script@v7
        if: failure()
        with:
          script: |
            // Post visual diff results
```

**Benefits**:
- ✅ Catch unintended visual changes
- ✅ Review visual diffs on PRs
- ✅ Automated UI testing
- ✅ Confidence in UI changes

---

### 8. Accessibility Audits

**File**: `.github/workflows/accessibility.yml`

**Purpose**: Ensure WCAG 2.1 AA compliance.

```yaml
name: Accessibility Audit

on:
  pull_request:
    branches: [main]
  schedule:
    - cron: '0 0 * * 0' # Weekly on Sunday

jobs:
  audit:
    name: A11y Audit
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - uses: oven-sh/setup-bun@v1
        with:
          bun-version: latest

      - name: Install dependencies
        run: bun install --frozen-lockfile

      - name: Build site
        run: bun run generate

      - name: Run axe accessibility tests
        uses: pa11y/pa11y-ci-action@v1
        with:
          url: |
            http://localhost:3000/
            http://localhost:3000/docs/
            http://localhost:3000/examples/

      - name: Upload report
        uses: actions/upload-artifact@v4
        with:
          name: a11y-report
          path: pa11y-report.html

      - name: Fail on violations
        run: exit 1
        if: steps.audit.outputs.violations > 0
```

**Benefits**:
- ✅ Ensure accessibility compliance
- ✅ Catch a11y issues early
- ✅ Detailed violation reports
- ✅ Prevent regressions

---

### 9. SEO Audit

**File**: `.github/workflows/seo-audit.yml`

**Purpose**: Validate SEO best practices.

```yaml
name: SEO Audit

on:
  pull_request:
    branches: [main]
  schedule:
    - cron: '0 0 * * 0' # Weekly

jobs:
  audit:
    name: SEO Check
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - uses: oven-sh/setup-bun@v1
        with:
          bun-version: latest

      - name: Install dependencies
        run: bun install --frozen-lockfile

      - name: Build site
        run: bun run generate

      - name: Run SEO audit
        run: |
          # Check meta tags
          bun run seo:check-meta
          
          # Check structured data
          bun run seo:check-schema
          
          # Check sitemap
          bun run seo:check-sitemap
          
          # Check robots.txt
          bun run seo:check-robots

      - name: Upload report
        uses: actions/upload-artifact@v4
        with:
          name: seo-report
          path: seo-report.json
```

**Benefits**:
- ✅ Ensure proper meta tags
- ✅ Validate structured data
- ✅ Check sitemap generation
- ✅ Monitor SEO health

---

### 10. Security Scanning

**File**: `.github/workflows/security.yml`

**Purpose**: Scan for security vulnerabilities.

```yaml
name: Security Scan

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
  schedule:
    - cron: '0 0 * * 1' # Weekly on Monday

jobs:
  dependency-scan:
    name: Dependency Vulnerability Scan
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Run Snyk to check for vulnerabilities
        uses: snyk/actions/node@master
        env:
          SNYK_TOKEN: ${{ secrets.SNYK_TOKEN }}
        with:
          args: --severity-threshold=high

  code-scan:
    name: CodeQL Analysis
    runs-on: ubuntu-latest
    permissions:
      security-events: write
    steps:
      - uses: actions/checkout@v4

      - name: Initialize CodeQL
        uses: github/codeql-action/init@v3
        with:
          languages: javascript, typescript

      - name: Perform CodeQL Analysis
        uses: github/codeql-action/analyze@v3
```

**Benefits**:
- ✅ Identify vulnerable dependencies
- ✅ Detect security issues in code
- ✅ Automated security alerts
- ✅ GitHub Security tab integration

---

## Fun & Experimental Workflows (Optional)

### 11. Contributor Recognition Bot

**File**: `.github/workflows/contributor-recognition.yml`

**Purpose**: Automatically thank and recognize contributors.

```yaml
name: Contributor Recognition

on:
  pull_request_target:
    types: [closed]

jobs:
  recognize:
    if: github.event.pull_request.merged == true
    runs-on: ubuntu-latest
    steps:
      - name: Check if first contribution
        uses: actions/github-script@v7
        id: check-first
        with:
          script: |
            const { data: prs } = await github.rest.pulls.list({
              owner: context.repo.owner,
              repo: context.repo.repo,
              state: 'closed',
              creator: context.payload.pull_request.user.login
            });
            return prs.length === 1;

      - name: Comment on first PR
        if: steps.check-first.outputs.result == 'true'
        uses: actions/github-script@v7
        with:
          script: |
            github.rest.issues.createComment({
              issue_number: context.payload.pull_request.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: '🎉 Congratulations on your first merged PR! Thank you for contributing to OpenSeadragon! 🙌'
            });

      - name: Add to contributors list
        run: |
          # Update CONTRIBUTORS.md file
```

**Benefits**:
- 🎉 Encourage community contributions
- 🎉 Recognize first-time contributors
- 🎉 Build positive community
- 🎉 Automatic contributor tracking

---

### 12. Automated Release Notes

**File**: `.github/workflows/release-notes.yml`

**Purpose**: Generate beautiful release notes automatically.

```yaml
name: Generate Release Notes

on:
  push:
    tags:
      - 'v*'

jobs:
  release:
    name: Create Release
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Generate changelog
        id: changelog
        uses: conventional-changelog-action@v3
        with:
          preset: angular
          output-file: false

      - name: Create Release
        uses: actions/create-release@v1
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        with:
          tag_name: ${{ github.ref }}
          release_name: Release ${{ github.ref }}
          body: ${{ steps.changelog.outputs.changelog }}
          draft: false
          prerelease: false

      - name: Tweet about release
        if: success()
        uses: ethomson/send-tweet-action@v1
        with:
          status: |
            🚀 OpenSeadragon website ${{ github.ref }} is now live!
            
            Check out what's new: https://github.com/${{ github.repository }}/releases/latest
          consumer-key: ${{ secrets.TWITTER_CONSUMER_KEY }}
          consumer-secret: ${{ secrets.TWITTER_CONSUMER_SECRET }}
          access-token: ${{ secrets.TWITTER_ACCESS_TOKEN }}
          access-token-secret: ${{ secrets.TWITTER_ACCESS_TOKEN_SECRET }}
```

**Benefits**:
- 🎉 Professional release notes
- 🎉 Automatic changelog generation
- 🎉 Social media announcements
- 🎉 Version tracking

---

### 13. Weekly Health Report

**File**: `.github/workflows/health-report.yml`

**Purpose**: Weekly summary of repository health metrics.

```yaml
name: Repository Health Report

on:
  schedule:
    - cron: '0 9 * * 1' # Every Monday at 9 AM
  workflow_dispatch:

jobs:
  report:
    name: Generate Health Report
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Collect metrics
        uses: actions/github-script@v7
        id: metrics
        with:
          script: |
            const metrics = {
              issues: await github.rest.issues.listForRepo({
                owner: context.repo.owner,
                repo: context.repo.repo,
                state: 'open'
              }),
              prs: await github.rest.pulls.list({
                owner: context.repo.owner,
                repo: context.repo.repo,
                state: 'open'
              }),
              stars: (await github.rest.repos.get({
                owner: context.repo.owner,
                repo: context.repo.repo
              })).data.stargazers_count
            };
            
            return metrics;

      - name: Create report
        run: |
          echo "# Weekly Health Report" > report.md
          echo "" >> report.md
          echo "📊 **Repository Metrics**" >> report.md
          echo "- ⭐ Stars: ${{ fromJson(steps.metrics.outputs.result).stars }}" >> report.md
          echo "- 🐛 Open Issues: ${{ fromJson(steps.metrics.outputs.result).issues.data.length }}" >> report.md
          echo "- 🔀 Open PRs: ${{ fromJson(steps.metrics.outputs.result).prs.data.length }}" >> report.md

      - name: Create issue with report
        uses: actions/github-script@v7
        with:
          script: |
            const fs = require('fs');
            const report = fs.readFileSync('report.md', 'utf8');
            
            github.rest.issues.create({
              owner: context.repo.owner,
              repo: context.repo.repo,
              title: `📊 Weekly Health Report - ${new Date().toLocaleDateString()}`,
              body: report,
              labels: ['health-report', 'automated']
            });
```

**Benefits**:
- 📊 Track repository health
- 📊 Monitor community activity
- 📊 Identify trends over time
- 📊 Transparent metrics

---

### 14. Stale Issue & PR Management

**File**: `.github/workflows/stale.yml`

**Purpose**: Automatically manage inactive issues and PRs.

```yaml
name: Stale Issues & PRs

on:
  schedule:
    - cron: '0 0 * * *' # Daily

jobs:
  stale:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/stale@v9
        with:
          repo-token: ${{ secrets.GITHUB_TOKEN }}
          
          # Issues
          stale-issue-message: |
            👋 This issue has been automatically marked as stale because it has not had recent activity.
            
            If this is still relevant, please leave a comment to keep it open.
            Otherwise, it will be closed in 7 days.
          days-before-issue-stale: 60
          days-before-issue-close: 7
          stale-issue-label: 'stale'
          exempt-issue-labels: 'pinned,security,roadmap'
          
          # PRs
          stale-pr-message: |
            👋 This PR has been automatically marked as stale due to inactivity.
            
            Please update or close this PR. It will be closed in 7 days if no action is taken.
          days-before-pr-stale: 30
          days-before-pr-close: 7
          stale-pr-label: 'stale'
          exempt-pr-labels: 'pinned,security,work-in-progress'
```

**Benefits**:
- 🧹 Keep repository clean
- 🧹 Reduce maintenance burden
- 🧹 Encourage timely responses
- 🧹 Automated issue lifecycle

---

### 15. Link Checker (Scheduled)

**File**: `.github/workflows/link-checker.yml`

**Purpose**: Periodically check for broken external links.

```yaml
name: Link Checker

on:
  schedule:
    - cron: '0 0 * * 0' # Weekly on Sunday
  workflow_dispatch:

jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Check all links
        uses: lycheeverse/lychee-action@v1
        with:
          args: |
            --verbose
            --no-progress
            --exclude-mail
            --max-redirects 10
            'content/**/*.md'
            'README.md'

      - name: Create issue if broken links found
        if: failure()
        uses: actions/github-script@v7
        with:
          script: |
            github.rest.issues.create({
              owner: context.repo.owner,
              repo: context.repo.repo,
              title: '🔗 Broken links detected',
              body: 'The automated link checker found broken links. Please review and fix.',
              labels: ['bug', 'documentation', 'automated']
            });
```

**Benefits**:
- 🔗 Catch broken external links
- 🔗 Maintain content quality
- 🔗 Automated monitoring
- 🔗 Proactive issue creation

---

## Workflow Priority Matrix

### Phase 1 (Launch) - Critical
- ✅ **CI/CD Pipeline** - Deploy to GitHub Pages
- ✅ **PR Quality Checks** - Lint, test, typecheck
- ✅ **Content Validation** - Prevent broken content

### Phase 2 (Post-Launch) - Important
- ⚠️ **Dependency Updates** - Keep dependencies current
- ⚠️ **Performance Monitoring** - Track Lighthouse scores
- ⚠️ **Bundle Size Tracking** - Prevent bundle bloat

### Phase 3 (Maturity) - Enhancement
- 💡 **Visual Regression** - Screenshot testing
- 💡 **Accessibility Audits** - WCAG compliance
- 💡 **SEO Audit** - Search engine optimization
- 💡 **Security Scanning** - Vulnerability detection

### Phase 4 (Community) - Optional
- 🎉 **Contributor Recognition** - Community building
- 🎉 **Release Notes** - Automated changelogs
- 🎉 **Health Reports** - Repository metrics
- 🎉 **Stale Management** - Issue lifecycle
- 🎉 **Link Checker** - Content maintenance

## Cost Considerations

### GitHub Actions Minutes for Organizations

**Important Context**: This website repository is part of the **OpenSeadragon GitHub organization**, which includes:
- `openseadragon/openseadragon` - Main library with its own CI/CD
- `openseadragon/openseadragon.github.io` - This documentation website
- Other repositories (plugins, extensions, etc.)

All repositories in the organization **share the same GitHub Actions minutes pool**.

### Free Tier Limits
- **Public repositories**: ✅ **Unlimited minutes** for standard GitHub-hosted runners
- **Private repositories**: 2,000 minutes/month (not applicable here)

### Estimated Monthly Usage (Website Repository Only)

**Reality Check**: These are estimates for the *website repository only*. The main OpenSeadragon library will have its own substantial CI/CD usage.

```
Website Repository - Essential Workflows:
- CI/CD (20 builds × 3 min) = 60 min
  [More conservative: not every commit triggers rebuild]
- PR Checks (30 PRs × 5 min) = 150 min
  [Mostly content updates, fewer code changes]
- Content Validation (30 PRs × 2 min) = 60 min
Total Essential: ~270 min/month

Website Repository - Recommended Workflows:
- Dependency Updates (4 runs × 5 min) = 20 min
- Performance (20 runs × 8 min) = 160 min
  [Run on main branch only, not all PRs]
- Bundle Size (30 PRs × 3 min) = 90 min
Total Recommended: ~270 min/month

Website Repository - Enhancement Workflows:
- Visual Regression (15 runs × 10 min) = 150 min
  [Selective: only UI-changing PRs]
- A11y Audits (4 runs × 5 min) = 20 min
  [Weekly only]
- SEO Audits (4 runs × 3 min) = 12 min
- Security (8 runs × 5 min) = 40 min
Total Enhancement: ~222 min/month

Website Repository - Fun Workflows: ~20 min/month

Website Repository Total: ~782 min/month
```

### Organization-Wide Considerations

```
Estimated Organization-Wide Usage:
┌────────────────────────────────────────────────────┐
│ Repository              │ Estimated Monthly Usage  │
├────────────────────────────────────────────────────┤
│ openseadragon/          │ ~2,000-3,000 min        │
│ openseadragon           │ (Main library CI/CD:     │
│                         │  tests, builds, releases)│
├────────────────────────────────────────────────────┤
│ openseadragon/          │ ~782 min                │
│ osd_website             │ (This website)           │
├────────────────────────────────────────────────────┤
│ Other repos             │ ~500-1,000 min          │
│ (plugins, tools, etc.)  │                          │
└────────────────────────────────────────────────────┘

Organization Total: ~3,282-4,782 min/month
```

### Key Insight: Public Repos = Unlimited Minutes! 🎉

**Good News**: Since all OpenSeadragon repositories are **public**, GitHub provides:
- ✅ **Unlimited minutes** on standard Linux runners
- ✅ **Unlimited minutes** on Windows runners  
- ✅ **Unlimited minutes** on macOS runners

**This means**: No need to worry about minute limits! The organization can run as many workflows as needed across all repositories.

### Optimization Strategies (Still Recommended)

Even with unlimited minutes, optimize for **developer experience** and **faster feedback**:

1. ✅ **Workflow caching** - Faster builds, better DX
   ```yaml
   - uses: actions/cache@v4
     with:
       path: ~/.bun/install/cache
       key: ${{ runner.os }}-bun-${{ hashFiles('**/bun.lockb') }}
   ```

2. ✅ **Conditional execution** - Don't run unnecessary workflows
   ```yaml
   on:
     pull_request:
       paths:
         - 'content/**/*.md'  # Only run on content changes
   ```

3. ✅ **Concurrency limits** - Cancel outdated workflow runs
   ```yaml
   concurrency:
     group: ${{ github.workflow }}-${{ github.ref }}
     cancel-in-progress: true
   ```

4. ✅ **Selective workflow triggers** - Run expensive tests less often
   ```yaml
   # Visual regression only when UI changes
   on:
     pull_request:
       paths:
         - 'components/**'
         - 'pages/**'
         - 'layouts/**'
   ```

5. ✅ **Parallel jobs** - Faster overall workflow time
   ```yaml
   jobs:
     lint:
       runs-on: ubuntu-latest
     test:
       runs-on: ubuntu-latest  # Runs in parallel with lint
   ```

### When to Be Mindful of Usage

Even though minutes are unlimited for public repos, consider:

- **Queue times**: Too many concurrent workflows can create queue delays
- **Carbon footprint**: Unnecessary builds waste energy
- **Developer friction**: Slow CI/CD pipelines hurt productivity
- **Organization reputation**: Excessive usage might draw scrutiny

### Recommended Approach for Website Repository

Given that this is a **documentation/content-heavy website** (not the main library):

**Phase 1 (Launch)**: Keep it lean
- ✅ Essential workflows only (~270 min/month)
- ✅ Focus on content validation and deployment
- ✅ Minimal impact on organization's total usage

**Phase 2 (Post-Launch)**: Add monitoring
- ✅ Performance monitoring (selective)
- ✅ Bundle size tracking
- ✅ Still relatively lightweight (~540 min/month)

**Phase 3 (Maturity)**: Full automation
- ✅ Add enhancement workflows as needed
- ✅ Total usage still modest (~782 min/month)
- ✅ Negligible compared to main library CI/CD

### Bottom Line

For this website repository:
- ✅ **No cost concerns** (public repo = unlimited)
- ✅ **Minimal organizational impact** (content-focused, not test-heavy)
- ✅ **Main library CI/CD is the heavy user** (as it should be)
- ✅ **Optimize for speed, not cost** (better developer experience)

## Workflow Configuration Tips

### 1. Caching Strategy
```yaml
- name: Cache Bun dependencies
  uses: actions/cache@v4
  with:
    path: ~/.bun/install/cache
    key: ${{ runner.os }}-bun-${{ hashFiles('**/bun.lockb') }}
    restore-keys: |
      ${{ runner.os }}-bun-
```

### 2. Matrix Testing (Optional)
```yaml
strategy:
  matrix:
    os: [ubuntu-latest, windows-latest, macos-latest]
    bun-version: [latest, canary]
```

### 3. Workflow Artifacts
```yaml
- name: Upload build artifacts
  uses: actions/upload-artifact@v4
  with:
    name: build-output
    path: .output/
    retention-days: 7
```

### 4. Secrets Management
Required secrets for advanced workflows:
```
GITHUB_TOKEN         # Automatic
CODECOV_TOKEN        # Code coverage
SNYK_TOKEN          # Security scanning
TWITTER_*           # Social media (optional)
SLACK_WEBHOOK       # Notifications (optional)
```

## Monitoring & Maintenance

### Weekly Review Checklist
- [ ] Review workflow run times
- [ ] Check failure rates
- [ ] Optimize slow workflows
- [ ] Update deprecated actions
- [ ] Review security alerts

### Monthly Maintenance
- [ ] Update workflow dependencies
- [ ] Review and adjust schedules
- [ ] Analyze cost/benefit of workflows
- [ ] Add/remove workflows as needed
- [ ] Update documentation

## Conclusion

This comprehensive workflow strategy provides:
- ✅ **Automated Quality**: Catch issues before they reach production
- ✅ **Performance Monitoring**: Track metrics over time
- ✅ **Security**: Proactive vulnerability detection
- ✅ **Community Building**: Recognition and engagement
- ✅ **Maintenance**: Automated upkeep tasks
- ✅ **Zero Cost**: All within GitHub's free tier

Start with essential workflows (Phase 1), then gradually add recommended and enhancement workflows as the project matures.
