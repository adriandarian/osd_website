# Internationalization (i18n) Plan

## Overview

Strategy for implementing internationalization to make the OpenSeadragon website accessible to a global audience. This document covers language support, translation workflows, technical implementation, and community collaboration.

## Goals & Objectives

### Primary Goals
1. **Accessibility**: Make OpenSeadragon documentation accessible to non-English speakers
2. **Community Growth**: Expand the user base globally
3. **Contribution**: Enable community-driven translations
4. **Maintainability**: Sustainable translation workflow

### Target Languages

#### Phase 1: Initial Launch (English Only)
- English (en-US) - Default

#### Phase 2: Priority Languages (3-6 months)
Based on GitHub traffic and community size:
1. **Chinese (Simplified)** (zh-CN) - Large user base
2. **Spanish** (es) - Wide global reach
3. **French** (fr) - Strong European presence
4. **German** (de) - Active developer community
5. **Japanese** (ja) - Technical documentation culture

#### Phase 3: Extended Support (6-12 months)
6. Portuguese (pt-BR)
7. Russian (ru)
8. Korean (ko)
9. Italian (it)
10. Dutch (nl)

#### Phase 4: Community-Driven
- Any language with active translator volunteers
- Minimum requirement: 60% content translated

## Technical Implementation

### Framework: Vue I18n + Nuxt I18n

#### Installation & Configuration

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/i18n',
  ],
  
  i18n: {
    defaultLocale: 'en',
    strategy: 'prefix_except_default',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
      alwaysRedirect: false,
      fallbackLocale: 'en',
    },
    
    locales: [
      {
        code: 'en',
        iso: 'en-US',
        name: 'English',
        file: 'en.json',
        dir: 'ltr',
      },
      {
        code: 'zh',
        iso: 'zh-CN',
        name: '简体中文',
        file: 'zh-CN.json',
        dir: 'ltr',
      },
      {
        code: 'es',
        iso: 'es',
        name: 'Español',
        file: 'es.json',
        dir: 'ltr',
      },
      {
        code: 'fr',
        iso: 'fr',
        name: 'Français',
        file: 'fr.json',
        dir: 'ltr',
      },
      {
        code: 'de',
        iso: 'de',
        name: 'Deutsch',
        file: 'de.json',
        dir: 'ltr',
      },
      {
        code: 'ja',
        iso: 'ja',
        name: '日本語',
        file: 'ja.json',
        dir: 'ltr',
      },
      {
        code: 'ar',
        iso: 'ar',
        name: 'العربية',
        file: 'ar.json',
        dir: 'rtl', // Right-to-left
      },
    ],
    
    langDir: 'locales/',
    lazy: true,
    
    vueI18n: './i18n.config.ts',
  },
})
```

#### i18n Configuration

```typescript
// i18n.config.ts
export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages: {},
  datetimeFormats: {
    en: {
      short: {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      },
      long: {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long',
      },
    },
    zh: {
      short: {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      },
      long: {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long',
      },
    },
    // ... other locales
  },
  numberFormats: {
    en: {
      currency: {
        style: 'currency',
        currency: 'USD',
      },
      decimal: {
        style: 'decimal',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      },
    },
    // ... other locales
  },
}))
```

### Translation File Structure

```
locales/
├── en.json                 # English (source)
├── zh-CN.json              # Chinese Simplified
├── es.json                 # Spanish
├── fr.json                 # French
├── de.json                 # German
├── ja.json                 # Japanese
└── README.md               # Translation guide
```

#### Example Translation File

```json
// locales/en.json
{
  "nav": {
    "home": "Home",
    "docs": "Documentation",
    "examples": "Examples",
    "playground": "Playground",
    "plugins": "Plugins",
    "community": "Community"
  },
  
  "hero": {
    "title": "OpenSeadragon",
    "tagline": "An open-source, web-based viewer for high-resolution zoomable images",
    "getStarted": "Get Started",
    "viewDocs": "View Documentation",
    "tryPlayground": "Try Playground"
  },
  
  "features": {
    "title": "Why OpenSeadragon?",
    "performance": {
      "title": "High Performance",
      "description": "Smooth zooming and panning even with massive images"
    },
    "opensource": {
      "title": "Open Source",
      "description": "MIT licensed, completely free to use"
    },
    "extensible": {
      "title": "Extensible",
      "description": "Rich plugin ecosystem and customization options"
    }
  },
  
  "search": {
    "placeholder": "Search documentation...",
    "noResults": "No results found for \"{query}\"",
    "results": "{count} result | {count} results",
    "searching": "Searching..."
  },
  
  "docs": {
    "tableOfContents": "Table of Contents",
    "onThisPage": "On this page",
    "editOnGitHub": "Edit this page on GitHub",
    "lastUpdated": "Last updated on {date}",
    "previousPage": "Previous",
    "nextPage": "Next"
  },
  
  "footer": {
    "description": "An open-source project maintained by the community",
    "license": "Released under the MIT License",
    "copyright": "Copyright © {year} OpenSeadragon Contributors"
  },
  
  "errors": {
    "404": {
      "title": "Page Not Found",
      "description": "The page you're looking for doesn't exist.",
      "backHome": "Back to Home"
    },
    "500": {
      "title": "Server Error",
      "description": "Something went wrong on our end.",
      "retry": "Try Again"
    }
  }
}
```

### Using Translations in Components

#### Basic Usage
```vue
<template>
  <div>
    <!-- Simple translation -->
    <h1>{{ $t('hero.title') }}</h1>
    
    <!-- Translation with interpolation -->
    <p>{{ $t('footer.copyright', { year: 2025 }) }}</p>
    
    <!-- Pluralization -->
    <p>{{ $t('search.results', { count: resultCount }) }}</p>
    
    <!-- Date formatting -->
    <time>{{ d(new Date(), 'short') }}</time>
    
    <!-- Number formatting -->
    <span>{{ n(1234.56, 'decimal') }}</span>
  </div>
</template>

<script setup lang="ts">
const { t, d, n } = useI18n()
const resultCount = ref(5)
</script>
```

#### Composable Usage
```typescript
// composables/useLocalizedContent.ts
export const useLocalizedContent = () => {
  const { locale } = useI18n()
  const route = useRoute()
  
  const getLocalizedPath = (path: string) => {
    return locale.value === 'en' 
      ? path 
      : `/${locale.value}${path}`
  }
  
  const getCurrentLocalizedPath = () => {
    return getLocalizedPath(route.path)
  }
  
  return {
    getLocalizedPath,
    getCurrentLocalizedPath,
  }
}
```

### Language Switcher Component

```vue
<!-- components/LanguageSwitcher.vue -->
<template>
  <div class="language-switcher">
    <button 
      @click="isOpen = !isOpen"
      :aria-label="$t('nav.changeLanguage')"
      class="language-button"
    >
      <Icon name="carbon:translate" />
      <span>{{ currentLocale?.name }}</span>
      <Icon name="carbon:chevron-down" />
    </button>
    
    <Transition name="dropdown">
      <ul v-if="isOpen" class="language-menu" role="menu">
        <li 
          v-for="loc in availableLocales" 
          :key="loc.code"
          role="menuitem"
        >
          <NuxtLink
            :to="switchLocalePath(loc.code)"
            :class="{ active: locale === loc.code }"
            @click="isOpen = false"
          >
            <span class="locale-name">{{ loc.name }}</span>
            <span v-if="locale === loc.code" class="check-icon">
              <Icon name="carbon:checkmark" />
            </span>
          </NuxtLink>
        </li>
      </ul>
    </Transition>
  </div>
</template>

<script setup lang="ts">
const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const isOpen = ref(false)

const availableLocales = computed(() => 
  locales.value.filter(loc => loc.code !== locale.value)
)

const currentLocale = computed(() =>
  locales.value.find(loc => loc.code === locale.value)
)

// Close dropdown when clicking outside
onClickOutside(isOpen, () => {
  isOpen.value = false
})
</script>

<style scoped>
.language-switcher {
  position: relative;
}

.language-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: 1px solid var(--border-color);
  border-radius: 0.375rem;
  background: var(--bg-color);
  cursor: pointer;
}

.language-menu {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 0.5rem;
  min-width: 200px;
  background: var(--bg-color);
  border: 1px solid var(--border-color);
  border-radius: 0.375rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  list-style: none;
  padding: 0.5rem;
  z-index: 50;
}

.language-menu a {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  text-decoration: none;
  color: var(--text-color);
}

.language-menu a:hover {
  background: var(--hover-color);
}

.language-menu a.active {
  font-weight: 600;
}

.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.2s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
```

## Content Translation Strategy

### Content Categories

#### 1. UI Strings (Priority: Critical)
- Navigation labels
- Buttons and actions
- Form labels and placeholders
- Error messages
- Success messages
- Loading states

**Timeline:** Must be translated before launch in each language

#### 2. Core Documentation (Priority: High)
- Getting Started guide
- Installation instructions
- Basic usage examples
- API reference headings
- Common configuration options

**Timeline:** Within 2 weeks of language activation

#### 3. Examples & Tutorials (Priority: Medium)
- Example descriptions
- Tutorial steps
- Code comments (optional)
- Interactive playground hints

**Timeline:** Within 1 month of language activation

#### 4. Extended Documentation (Priority: Low)
- Advanced guides
- Plugin documentation
- Blog posts
- Community resources

**Timeline:** Ongoing, community-driven

### Localized Content Structure

```
content/
├── en/
│   ├── docs/
│   │   ├── getting-started.md
│   │   ├── api-reference.md
│   │   └── ...
│   ├── examples/
│   └── blog/
│
├── zh/
│   ├── docs/
│   │   ├── getting-started.md
│   │   └── ...
│   └── examples/
│
├── es/
│   └── docs/
│       └── getting-started.md
│
└── ...
```

#### Localized Content Example

```markdown
---
title: 快速开始
description: 学习如何安装和配置 OpenSeadragon
category: guide
tags: [安装, 设置, 快速开始]
difficulty: beginner
locale: zh
translatedFrom: en/docs/getting-started.md
translator: GitHub @username
lastUpdated: 2025-10-23
---

# 快速开始

OpenSeadragon 是一个开源的、基于 Web 的高分辨率可缩放图像查看器。

## 安装

你可以通过 npm 安装 OpenSeadragon：

\```bash
npm install openseadragon
\```

## 基本用法

\```javascript
const viewer = OpenSeadragon({
  id: "viewer",
  prefixUrl: "/openseadragon/images/",
  tileSources: "/path/to/image.dzi"
});
\```

查看 [API 参考](/zh/docs/api) 了解更多详情。
```

## Translation Workflow

### Translation Management

#### Option 1: Git-Based Workflow (Recommended)
```yaml
workflow:
  1_source_update:
    - English content updated in main branch
    - Automated PR created for translators
    - Notification sent to language maintainers
    
  2_translation:
    - Translator creates branch
    - Translates content
    - Submits PR with translations
    
  3_review:
    - Native speaker reviews
    - Technical reviewer checks formatting
    - Automated checks run
    
  4_merge:
    - PR approved and merged
    - Site rebuilt with new translations
    - Translation status updated
```

#### Option 2: Crowdin Integration (Future)
```yaml
crowdin:
  benefits:
    - Professional translation platform
    - Translation memory
    - Glossary management
    - Machine translation suggestions
    - Progress tracking
    
  workflow:
    - Push source strings to Crowdin
    - Translators work in Crowdin UI
    - Pull completed translations to repo
    - Automated PRs for translations
```

### Translation Guidelines Document

```markdown
<!-- locales/TRANSLATION_GUIDE.md -->

# Translation Guidelines

## General Principles

1. **Accuracy**: Translate meaning, not just words
2. **Consistency**: Use the same terms throughout
3. **Natural**: Write how native speakers would write
4. **Technical**: Preserve code, commands, and technical terms
5. **Context**: Understand the context before translating

## What to Translate

✅ **DO translate:**
- All UI text and labels
- Documentation content
- Error and success messages
- Alt text for images
- Meta descriptions
- Headings and titles

❌ **DON'T translate:**
- Code examples (except comments if helpful)
- Function/variable names
- URLs and links
- File names
- Command-line commands
- API endpoints
- Brand names (OpenSeadragon)

## Technical Terms

Maintain a glossary of technical terms:

| English | Spanish | Chinese | French | German |
|---------|---------|---------|--------|--------|
| viewer | visor | 查看器 | visionneuse | Betrachter |
| viewport | ventana | 视口 | fenêtre d'affichage | Ansichtsfenster |
| tile | mosaico | 瓦片 | tuile | Kachel |
| zoom | zoom | 缩放 | zoom | Zoom |
| pan | panorámica | 平移 | panoramique | Schwenken |

## Formatting

Preserve markdown formatting:
- Keep heading levels (#, ##, ###)
- Maintain code blocks with language tags
- Keep link formats [text](url)
- Preserve front matter structure

## Placeholders

Keep placeholders in translations:
- `{variable}` - Variable interpolation
- `{count}` - Pluralization
- `{date}` - Date formatting

Example:
```json
{
  "message": "Welcome, {username}!",
  "results": "{count} result | {count} results"
}
```

## Testing Your Translation

Before submitting:
1. Preview the translated page locally
2. Check all links work
3. Verify code examples display correctly
4. Test pluralization and interpolation
5. Ensure proper RTL layout (if applicable)
```

### Translation Status Tracking

```typescript
// scripts/translation-status.ts
import { readFileSync, readdirSync } from 'fs'
import { join } from 'path'

interface TranslationStatus {
  locale: string
  translated: number
  total: number
  percentage: number
  missing: string[]
}

const getTranslationStatus = (locale: string): TranslationStatus => {
  const sourceDir = 'content/en'
  const targetDir = `content/${locale}`
  
  const sourceFiles = getAllMarkdownFiles(sourceDir)
  const targetFiles = getAllMarkdownFiles(targetDir)
  
  const sourceSet = new Set(sourceFiles.map(f => f.replace(sourceDir, '')))
  const targetSet = new Set(targetFiles.map(f => f.replace(targetDir, '')))
  
  const missing = [...sourceSet].filter(f => !targetSet.has(f))
  
  return {
    locale,
    translated: targetSet.size,
    total: sourceSet.size,
    percentage: Math.round((targetSet.size / sourceSet.size) * 100),
    missing,
  }
}

// Generate status report
const locales = ['zh', 'es', 'fr', 'de', 'ja']
const statusReport = locales.map(getTranslationStatus)

console.table(statusReport)
```

#### Translation Status Badge

```markdown
<!-- Display in README -->
## Translation Status

| Language | Progress | Status |
|----------|----------|--------|
| 🇨🇳 Chinese | 85% | ![](https://progress-bar.dev/85) |
| 🇪🇸 Spanish | 60% | ![](https://progress-bar.dev/60) |
| 🇫🇷 French | 45% | ![](https://progress-bar.dev/45) |
| 🇩🇪 German | 30% | ![](https://progress-bar.dev/30) |
| 🇯🇵 Japanese | 20% | ![](https://progress-bar.dev/20) |

Help us translate! See [Translation Guide](locales/TRANSLATION_GUIDE.md)
```

## Right-to-Left (RTL) Support

### RTL Languages
- Arabic (ar)
- Hebrew (he)
- Persian/Farsi (fa)
- Urdu (ur)

### RTL Implementation

```vue
<!-- app.vue -->
<template>
  <div :dir="textDirection" :lang="locale">
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
const { locale } = useI18n()

const rtlLocales = ['ar', 'he', 'fa', 'ur']

const textDirection = computed(() =>
  rtlLocales.includes(locale.value) ? 'rtl' : 'ltr'
)
</script>
```

### RTL CSS

```css
/* styles/rtl.css */

/* Logical properties for RTL support */
[dir="rtl"] {
  --text-align: right;
  --float-start: right;
  --float-end: left;
}

[dir="ltr"] {
  --text-align: left;
  --float-start: left;
  --float-end: right;
}

/* Use logical properties */
.content {
  text-align: var(--text-align);
  padding-inline-start: 1rem; /* Instead of padding-left */
  margin-inline-end: 1rem;    /* Instead of margin-right */
}

/* Flip icons and arrows in RTL */
[dir="rtl"] .icon-arrow {
  transform: scaleX(-1);
}

/* Adjust flexbox direction */
[dir="rtl"] .flex-row {
  flex-direction: row-reverse;
}
```

## SEO for Multilingual Content

### Hreflang Tags

```vue
<script setup lang="ts">
const { locale, locales } = useI18n()
const route = useRoute()

useHead({
  link: [
    // Self-referencing hreflang
    {
      rel: 'alternate',
      hreflang: locale.value,
      href: `https://openseadragon.github.io${route.path}`,
    },
    
    // All available translations
    ...locales.value.map((loc) => ({
      rel: 'alternate',
      hreflang: loc.iso,
      href: `https://openseadragon.github.io/${loc.code}${route.path}`,
    })),
    
    // x-default for undefined languages
    {
      rel: 'alternate',
      hreflang: 'x-default',
      href: `https://openseadragon.github.io${route.path}`,
    },
  ],
})
</script>
```

### Multilingual Sitemap

```xml
<!-- Sitemap with language alternatives -->
<url>
  <loc>https://openseadragon.github.io/docs/getting-started</loc>
  <xhtml:link 
    rel="alternate"
    hreflang="en"
    href="https://openseadragon.github.io/docs/getting-started" />
  <xhtml:link 
    rel="alternate"
    hreflang="zh"
    href="https://openseadragon.github.io/zh/docs/getting-started" />
  <xhtml:link 
    rel="alternate"
    hreflang="es"
    href="https://openseadragon.github.io/es/docs/getting-started" />
</url>
```

## Community Translator Program

### Roles & Responsibilities

```yaml
translator:
  responsibilities:
    - Translate assigned content
    - Follow translation guidelines
    - Maintain consistency
    - Meet deadlines
  
  requirements:
    - Native or fluent in target language
    - Good technical writing skills
    - Familiarity with markdown
    - GitHub account

language_maintainer:
  responsibilities:
    - Review translations
    - Maintain glossary
    - Coordinate translators
    - Ensure quality
  
  requirements:
    - Native speaker
    - Technical expertise
    - Community leadership
    - Long-term commitment

reviewer:
  responsibilities:
    - Technical accuracy review
    - Formatting verification
    - Link checking
  
  requirements:
    - OpenSeadragon knowledge
    - Attention to detail
```

### Recognition

```markdown
## Translation Contributors

### Chinese (简体中文)
- **Maintainer:** [@username](https://github.com/username)
- **Contributors:** [@user1](https://github.com/user1), [@user2](https://github.com/user2)

### Spanish (Español)
- **Maintainer:** [@username](https://github.com/username)
- **Contributors:** [@user3](https://github.com/user3), [@user4](https://github.com/user4)

[Become a translator!](https://github.com/openseadragon/website/blob/main/locales/TRANSLATION_GUIDE.md)
```

## Implementation Timeline

### Phase 1: Foundation (Weeks 1-2)
- [ ] Set up Vue I18n + Nuxt I18n
- [ ] Configure supported locales
- [ ] Implement language switcher
- [ ] Create translation file structure
- [ ] Extract all UI strings

### Phase 2: Core Translations (Weeks 3-6)
- [ ] Write translation guidelines
- [ ] Recruit language maintainers
- [ ] Translate UI strings
- [ ] Translate getting started docs
- [ ] Set up translation workflow

### Phase 3: Expansion (Weeks 7-12)
- [ ] Translate remaining documentation
- [ ] Add more languages
- [ ] Implement RTL support
- [ ] Set up automated tracking
- [ ] Launch translator program

### Phase 4: Maintenance (Ongoing)
- [ ] Update translations with new content
- [ ] Monitor translation status
- [ ] Support translator community
- [ ] Improve translation tooling

## Success Metrics

- **Translation Coverage**: >80% for priority languages
- **Community Engagement**: Active translators per language
- **Quality**: <5% error rate in translations
- **Freshness**: Translations updated within 2 weeks of source changes
- **Traffic**: Increased international traffic by 30%+

## Tools & Resources

### Translation Tools
- **Vue I18n**: Core i18n framework
- **Nuxt I18n**: Nuxt integration
- **Crowdin**: (Future) Translation management platform
- **DeepL**: Machine translation for suggestions
- **Grammarly**: Grammar checking for English source

### Quality Assurance
- **i18n-checker**: Validate translation files
- **missing-translations**: Find untranslated strings
- **translation-coverage**: Track translation progress

### Community Resources
- Translation guide
- Glossary of technical terms
- Style guide per language
- Video tutorials
- Office hours for translators
