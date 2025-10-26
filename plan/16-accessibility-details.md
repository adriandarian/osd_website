# Accessibility Details

## Overview

Comprehensive accessibility (a11y) strategy to ensure the OpenSeadragon website is usable by everyone, including people with disabilities. This document details WCAG 2.1 AA compliance requirements, implementation guidelines, and testing procedures.

## Accessibility Goals

### Primary Objectives
1. **WCAG 2.1 AA Compliance**: Meet all Level A and AA success criteria
2. **Keyboard Accessibility**: Full functionality without a mouse
3. **Screen Reader Support**: Compatible with major screen readers
4. **Visual Accessibility**: Sufficient contrast and readable text
5. **Cognitive Accessibility**: Clear navigation and understandable content

### Target Standards
- **WCAG 2.1 Level AA**: Minimum compliance target
- **WCAG 2.2 (when finalized)**: Future-proofing
- **Section 508**: US government standards
- **EN 301 549**: European accessibility standards
- **ADA Compliance**: Americans with Disabilities Act

## WCAG 2.1 AA Compliance Checklist

### Principle 1: Perceivable

#### 1.1 Text Alternatives

**1.1.1 Non-text Content (A)**
```vue
<!-- ✅ Good: All images have alt text -->
<img 
  src="/images/viewer.png" 
  alt="OpenSeadragon viewer displaying a zoomable manuscript"
>

<!-- ✅ Good: Decorative images have empty alt -->
<img src="/images/decoration.svg" alt="" role="presentation">

<!-- ✅ Good: Complex images have detailed descriptions -->
<figure>
  <img 
    src="/images/architecture.png"
    alt="System architecture diagram"
    aria-describedby="arch-description"
  >
  <figcaption id="arch-description">
    The diagram shows three main components: the client browser,
    the tile server, and the image storage...
  </figcaption>
</figure>

<!-- ❌ Bad: Missing alt text -->
<img src="/images/viewer.png">
```

#### 1.2 Time-based Media

**1.2.1 Audio-only and Video-only (A)**
```vue
<!-- ✅ Good: Video with transcript -->
<video controls>
  <source src="/videos/tutorial.mp4" type="video/mp4">
  <track kind="captions" src="/videos/tutorial.vtt" srclang="en">
</video>
<details>
  <summary>View Transcript</summary>
  <p>In this tutorial, we'll learn how to...</p>
</details>
```

#### 1.3 Adaptable

**1.3.1 Info and Relationships (A)**
```vue
<!-- ✅ Good: Proper heading hierarchy -->
<h1>Getting Started</h1>
<h2>Installation</h2>
<h3>Via npm</h3>

<!-- ✅ Good: Semantic HTML -->
<nav aria-label="Main navigation">
  <ul>
    <li><a href="/docs">Documentation</a></li>
    <li><a href="/examples">Examples</a></li>
  </ul>
</nav>

<!-- ✅ Good: Form labels -->
<label for="search-input">Search documentation</label>
<input id="search-input" type="search" name="q">

<!-- ❌ Bad: Using divs as buttons -->
<div onclick="submit()">Submit</div>

<!-- ✅ Good: Proper button -->
<button type="submit">Submit</button>
```

**1.3.2 Meaningful Sequence (A)**
```css
/* ✅ Good: Visual order matches DOM order */
.flex-container {
  display: flex;
  /* Don't use order property to change sequence */
}

/* ❌ Bad: Visual order differs from DOM */
.item-1 { order: 3; }
.item-2 { order: 1; }
.item-3 { order: 2; }
```

**1.3.3 Sensory Characteristics (A)**
```vue
<!-- ❌ Bad: Instructions rely only on visual cues -->
<p>Click the red button on the right to continue.</p>

<!-- ✅ Good: Instructions don't rely on sensory characteristics -->
<p>Click the "Continue" button to proceed.</p>
<button class="continue-button" style="color: red; float: right;">
  Continue
</button>
```

**1.3.4 Orientation (AA)**
```css
/* ✅ Good: Support both orientations */
@media (orientation: portrait) {
  .viewer { width: 100%; }
}

@media (orientation: landscape) {
  .viewer { width: 50%; }
}
```

**1.3.5 Identify Input Purpose (AA)**
```vue
<!-- ✅ Good: Autocomplete attributes -->
<form>
  <label for="name">Name</label>
  <input 
    id="name" 
    type="text" 
    autocomplete="name"
  >
  
  <label for="email">Email</label>
  <input 
    id="email" 
    type="email" 
    autocomplete="email"
  >
</form>
```

#### 1.4 Distinguishable

**1.4.1 Use of Color (A)**
```vue
<!-- ❌ Bad: Using only color to convey meaning -->
<p style="color: red;">Error: Invalid input</p>

<!-- ✅ Good: Using icon + color + text -->
<p class="error">
  <Icon name="carbon:warning" aria-hidden="true" />
  <span>Error: Invalid input</span>
</p>
```

**1.4.3 Contrast (Minimum) (AA)**
```css
/* ✅ Good: Minimum contrast ratios */
:root {
  /* Normal text: minimum 4.5:1 */
  --text-color: #1a1a1a;        /* on white: 16.9:1 ✓ */
  --text-muted: #666666;        /* on white: 5.74:1 ✓ */
  
  /* Large text (18pt+ or 14pt+ bold): minimum 3:1 */
  --heading-color: #333333;     /* on white: 12.6:1 ✓ */
  
  /* UI components: minimum 3:1 */
  --border-color: #757575;      /* on white: 4.6:1 ✓ */
  --button-bg: #0066cc;         /* on white: 4.5:1 ✓ */
}

/* ❌ Bad: Insufficient contrast */
.low-contrast {
  color: #999999;              /* on white: 2.85:1 ✗ */
}
```

**1.4.4 Resize Text (AA)**
```css
/* ✅ Good: Text can be resized to 200% without loss of content */
html {
  font-size: 16px;
}

body {
  font-size: 1rem; /* Responsive to browser zoom */
}

/* ❌ Bad: Fixed pixel sizes */
.fixed {
  font-size: 14px;
  max-width: 800px;
}
```

**1.4.10 Reflow (AA)**
```css
/* ✅ Good: Content reflows at 320px width (400% zoom) */
.content {
  max-width: 100%;
  overflow-wrap: break-word;
}

/* ❌ Bad: Horizontal scrolling required */
.fixed-width {
  width: 1200px;
  overflow-x: scroll;
}
```

**1.4.11 Non-text Contrast (AA)**
```css
/* ✅ Good: UI components have 3:1 contrast */
button {
  background: #0066cc;
  border: 2px solid #004499; /* 3:1 contrast with background */
}

.input {
  border: 1px solid #767676; /* 3:1 contrast with white */
}

/* Focus indicators */
*:focus {
  outline: 2px solid #0066cc; /* 4.5:1 contrast */
  outline-offset: 2px;
}
```

**1.4.12 Text Spacing (AA)**
```css
/* ✅ Good: Text remains readable with increased spacing */
.content {
  line-height: 1.5;
  letter-spacing: 0.12em;
  word-spacing: 0.16em;
  margin-bottom: 2em;
}

/* Must not break when users apply these styles */
```

**1.4.13 Content on Hover or Focus (AA)**
```vue
<!-- ✅ Good: Tooltip can be dismissed and hovered -->
<button 
  @mouseenter="showTooltip = true"
  @mouseleave="showTooltip = false"
  @focus="showTooltip = true"
  @blur="showTooltip = false"
  @keydown.esc="showTooltip = false"
  aria-describedby="tooltip"
>
  Help
  <span 
    v-if="showTooltip"
    id="tooltip"
    role="tooltip"
    @mouseenter="showTooltip = true"
  >
    This is helpful information
  </span>
</button>
```

### Principle 2: Operable

#### 2.1 Keyboard Accessible

**2.1.1 Keyboard (A)**
```vue
<!-- ✅ Good: All functionality available via keyboard -->
<template>
  <div class="image-viewer">
    <div 
      ref="viewer"
      tabindex="0"
      role="region"
      aria-label="Zoomable image viewer"
      @keydown="handleKeyboard"
    >
      <!-- Viewer content -->
    </div>
  </div>
</template>

<script setup lang="ts">
const handleKeyboard = (e: KeyboardEvent) => {
  switch(e.key) {
    case '+':
    case '=':
      zoomIn()
      break
    case '-':
      zoomOut()
      break
    case 'Home':
      resetView()
      break
    case 'ArrowUp':
      panUp()
      break
    case 'ArrowDown':
      panDown()
      break
    case 'ArrowLeft':
      panLeft()
      break
    case 'ArrowRight':
      panRight()
      break
  }
}
</script>
```

**2.1.2 No Keyboard Trap (A)**
```vue
<!-- ✅ Good: Modal with keyboard trap escape -->
<div 
  v-if="isOpen"
  role="dialog"
  aria-modal="true"
  @keydown.esc="closeModal"
>
  <button @click="closeModal">Close</button>
  <!-- Modal content -->
</div>

<script setup lang="ts">
// Trap focus within modal
useFocusTrap(modalRef, { 
  active: isOpen,
  escapeDeactivates: true,
})
</script>
```

**2.1.4 Character Key Shortcuts (A)**
```typescript
// ✅ Good: Single-key shortcuts can be turned off
const useKeyboardShortcuts = () => {
  const enabled = useLocalStorage('keyboard-shortcuts', true)
  
  const handleShortcut = (e: KeyboardEvent) => {
    if (!enabled.value) return
    
    // Handle shortcuts...
  }
  
  return { enabled, handleShortcut }
}
```

#### 2.2 Enough Time

**2.2.1 Timing Adjustable (A)**
```vue
<!-- ✅ Good: Auto-advancing carousel with controls -->
<template>
  <div class="carousel">
    <button @click="toggleAutoplay" :aria-pressed="autoplay">
      {{ autoplay ? 'Pause' : 'Play' }} slideshow
    </button>
    
    <button @click="prevSlide">Previous</button>
    <button @click="nextSlide">Next</button>
    
    <!-- Slides -->
  </div>
</template>

<script setup lang="ts">
const autoplay = ref(false)
const interval = ref<NodeJS.Timeout>()

const toggleAutoplay = () => {
  autoplay.value = !autoplay.value
  if (autoplay.value) {
    interval.value = setInterval(nextSlide, 5000)
  } else {
    clearInterval(interval.value)
  }
}
</script>
```

**2.2.2 Pause, Stop, Hide (A)**
```vue
<!-- ✅ Good: Moving content can be paused -->
<div class="animated-banner">
  <button 
    @click="paused = !paused"
    :aria-pressed="paused"
  >
    {{ paused ? 'Resume' : 'Pause' }} animation
  </button>
  
  <div :class="{ paused }">
    <!-- Animated content -->
  </div>
</div>
```

#### 2.3 Seizures and Physical Reactions

**2.3.1 Three Flashes or Below Threshold (A)**
```css
/* ✅ Good: No flashing more than 3 times per second */
@keyframes gentle-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

.loading {
  animation: gentle-pulse 2s infinite; /* 0.5 Hz, safe */
}

/* ❌ Bad: Rapid flashing */
.bad-flash {
  animation: flash 0.1s infinite; /* 10 Hz, dangerous */
}
```

#### 2.4 Navigable

**2.4.1 Bypass Blocks (A)**
```vue
<!-- ✅ Good: Skip to main content link -->
<template>
  <div>
    <a href="#main" class="skip-link">
      Skip to main content
    </a>
    
    <header>
      <!-- Navigation -->
    </header>
    
    <main id="main" tabindex="-1">
      <!-- Main content -->
    </main>
  </div>
</template>

<style>
.skip-link {
  position: absolute;
  left: -9999px;
  z-index: 999;
}

.skip-link:focus {
  left: 0;
  top: 0;
  padding: 1rem;
  background: #000;
  color: #fff;
}
</style>
```

**2.4.2 Page Titled (A)**
```vue
<script setup lang="ts">
useHead({
  title: 'Getting Started - OpenSeadragon',
  titleTemplate: (title) => 
    title ? `${title} | OpenSeadragon` : 'OpenSeadragon',
})
</script>
```

**2.4.3 Focus Order (A)**
```vue
<!-- ✅ Good: Focus order follows visual order -->
<form>
  <input type="text" tabindex="1">  <!-- First -->
  <input type="email" tabindex="2"> <!-- Second -->
  <button type="submit" tabindex="3"> <!-- Third -->
    Submit
  </button>
</form>

<!-- ❌ Bad: tabindex disrupts natural order -->
<form>
  <input type="text" tabindex="3">
  <input type="email" tabindex="1">
  <button type="submit" tabindex="2">Submit</button>
</form>
```

**2.4.4 Link Purpose (In Context) (A)**
```vue
<!-- ❌ Bad: Unclear link purpose -->
<a href="/docs/api">Click here</a>

<!-- ✅ Good: Clear link text -->
<a href="/docs/api">Read the API documentation</a>

<!-- ✅ Good: Context provides meaning -->
<p>
  For detailed information about the Viewer class, 
  <a href="/docs/api/viewer">see the API reference</a>.
</p>

<!-- ✅ Good: Icon with visible text -->
<a href="/download">
  <Icon name="carbon:download" aria-hidden="true" />
  Download OpenSeadragon
</a>

<!-- ✅ Good: Icon-only with aria-label -->
<a href="/github" aria-label="View on GitHub">
  <Icon name="carbon:logo-github" />
</a>
```

**2.4.5 Multiple Ways (AA)**
```vue
<!-- ✅ Good: Multiple navigation methods -->
<template>
  <div>
    <!-- 1. Main navigation -->
    <nav aria-label="Main navigation">
      <NuxtLink to="/docs">Documentation</NuxtLink>
      <NuxtLink to="/examples">Examples</NuxtLink>
    </nav>
    
    <!-- 2. Search -->
    <SearchBar />
    
    <!-- 3. Sitemap -->
    <footer>
      <NuxtLink to="/sitemap">Sitemap</NuxtLink>
    </footer>
    
    <!-- 4. Breadcrumbs on content pages -->
    <Breadcrumbs v-if="showBreadcrumbs" />
  </div>
</template>
```

**2.4.6 Headings and Labels (AA)**
```vue
<!-- ✅ Good: Descriptive headings -->
<h2>Installation Methods</h2>
<h3>Install via npm</h3>
<h3>Install via CDN</h3>

<!-- ✅ Good: Descriptive labels -->
<label for="email">Email address</label>
<input id="email" type="email" name="email">

<!-- ❌ Bad: Generic headings -->
<h2>Section 1</h2>
<h2>Section 2</h2>
```

**2.4.7 Focus Visible (AA)**
```css
/* ✅ Good: Visible focus indicator */
*:focus {
  outline: 2px solid #0066cc;
  outline-offset: 2px;
}

/* Don't do this unless providing alternative */
*:focus {
  outline: none; /* ❌ */
}

/* ✅ Good: Custom focus indicator */
button:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(0, 102, 204, 0.5);
}
```

#### 2.5 Input Modalities

**2.5.1 Pointer Gestures (A)**
```typescript
// ✅ Good: Multi-point gestures have single-point alternative
const useZoom = () => {
  // Pinch to zoom (multi-point)
  const handlePinch = (e: TouchEvent) => {
    if (e.touches.length === 2) {
      // Pinch zoom logic
    }
  }
  
  // Alternative: zoom buttons (single-point)
  const zoomIn = () => { /* ... */ }
  const zoomOut = () => { /* ... */ }
  
  return { handlePinch, zoomIn, zoomOut }
}
```

**2.5.2 Pointer Cancellation (A)**
```vue
<!-- ✅ Good: Action on mouseup, not mousedown -->
<button 
  @mousedown="handleDown"
  @mouseup="handleAction"
  @touchstart="handleDown"
  @touchend="handleAction"
>
  Submit
</button>
```

**2.5.3 Label in Name (A)**
```vue
<!-- ✅ Good: Accessible name includes visible label -->
<button aria-label="Search documentation">
  <Icon name="carbon:search" />
  Search
</button>

<!-- ❌ Bad: Accessible name doesn't match visible label -->
<button aria-label="Find">
  Search
</button>
```

**2.5.4 Motion Actuation (A)**
```typescript
// ✅ Good: Motion-based controls have alternatives
const useMotionControls = () => {
  const motionEnabled = ref(false)
  
  // Device motion (e.g., shake to reset)
  const handleMotion = (e: DeviceMotionEvent) => {
    if (motionEnabled.value) {
      // Handle motion
    }
  }
  
  // Alternative: button
  const reset = () => { /* ... */ }
  
  return { handleMotion, reset, motionEnabled }
}
```

### Principle 3: Understandable

#### 3.1 Readable

**3.1.1 Language of Page (A)**
```vue
<template>
  <html :lang="locale">
    <!-- Content -->
  </html>
</template>

<script setup lang="ts">
const { locale } = useI18n()
</script>
```

**3.1.2 Language of Parts (AA)**
```vue
<!-- ✅ Good: Inline language change -->
<p>
  The French word for hello is 
  <span lang="fr">bonjour</span>.
</p>

<!-- ✅ Good: Quote in different language -->
<blockquote lang="es">
  <p>Hola, mundo!</p>
</blockquote>
```

#### 3.2 Predictable

**3.2.1 On Focus (A)**
```vue
<!-- ✅ Good: Focus doesn't change context -->
<input 
  type="text"
  @focus="showHelp = true"
  aria-describedby="help-text"
>
<span id="help-text" v-if="showHelp">
  Enter your email address
</span>

<!-- ❌ Bad: Focus triggers navigation -->
<input 
  type="text"
  @focus="navigateTo('/next-page')"
>
```

**3.2.2 On Input (A)**
```vue
<!-- ✅ Good: Input doesn't automatically submit -->
<form @submit.prevent="handleSubmit">
  <input 
    v-model="query"
    type="search"
    @input="searchAsYouType"
  >
  <button type="submit">Search</button>
</form>

<!-- ❌ Bad: Input automatically submits -->
<input 
  v-model="query"
  @input="handleSubmit"
>
```

**3.2.3 Consistent Navigation (AA)**
```vue
<!-- ✅ Good: Navigation appears in same order -->
<nav aria-label="Main navigation">
  <ul>
    <li><NuxtLink to="/">Home</NuxtLink></li>
    <li><NuxtLink to="/docs">Docs</NuxtLink></li>
    <li><NuxtLink to="/examples">Examples</NuxtLink></li>
    <li><NuxtLink to="/plugins">Plugins</NuxtLink></li>
  </ul>
</nav>

<!-- This order should be consistent across all pages -->
```

**3.2.4 Consistent Identification (AA)**
```vue
<!-- ✅ Good: Same function, same label -->
<button @click="save">Save</button>
<!-- On another page: -->
<button @click="save">Save</button>

<!-- ❌ Bad: Same function, different labels -->
<button @click="save">Save</button>
<!-- On another page: -->
<button @click="save">Submit</button>
```

#### 3.3 Input Assistance

**3.3.1 Error Identification (A)**
```vue
<!-- ✅ Good: Clear error identification -->
<template>
  <form @submit.prevent="handleSubmit">
    <div :class="{ 'has-error': errors.email }">
      <label for="email">Email address</label>
      <input 
        id="email"
        v-model="email"
        type="email"
        :aria-invalid="!!errors.email"
        aria-describedby="email-error"
      >
      <span 
        v-if="errors.email" 
        id="email-error"
        class="error-message"
        role="alert"
      >
        {{ errors.email }}
      </span>
    </div>
  </form>
</template>
```

**3.3.2 Labels or Instructions (A)**
```vue
<!-- ✅ Good: Clear labels and instructions -->
<div>
  <label for="password">
    Password
    <span class="required" aria-label="required">*</span>
  </label>
  <input 
    id="password"
    type="password"
    aria-describedby="password-requirements"
    required
  >
  <div id="password-requirements" class="help-text">
    Password must be at least 8 characters and include
    a number and special character.
  </div>
</div>
```

**3.3.3 Error Suggestion (AA)**
```vue
<!-- ✅ Good: Helpful error message with suggestion -->
<span role="alert">
  Error: Email address is invalid. 
  Did you mean "user@example.com"?
</span>

<!-- ❌ Bad: Unhelpful error message -->
<span>Invalid input</span>
```

**3.3.4 Error Prevention (Legal, Financial, Data) (AA)**
```vue
<!-- ✅ Good: Confirmation for important actions -->
<template>
  <div>
    <button @click="showConfirm = true">
      Delete Account
    </button>
    
    <dialog :open="showConfirm">
      <p>
        Are you sure you want to delete your account?
        This action cannot be undone.
      </p>
      <button @click="deleteAccount">Yes, delete</button>
      <button @click="showConfirm = false">Cancel</button>
    </dialog>
  </div>
</template>
```

### Principle 4: Robust

#### 4.1 Compatible

**4.1.1 Parsing (A)**
```vue
<!-- ✅ Good: Valid HTML -->
<div id="unique-id">
  <p>Content</p>
</div>

<!-- ❌ Bad: Duplicate IDs -->
<div id="same-id"></div>
<div id="same-id"></div>

<!-- ❌ Bad: Missing closing tag -->
<div>
  <p>Content
</div>
```

**4.1.2 Name, Role, Value (A)**
```vue
<!-- ✅ Good: Proper ARIA usage -->
<div 
  role="button"
  tabindex="0"
  @click="handleClick"
  @keydown.enter="handleClick"
  @keydown.space="handleClick"
  :aria-pressed="isPressed"
>
  Toggle
</div>

<!-- ✅ Better: Use native element -->
<button :aria-pressed="isPressed">
  Toggle
</button>
```

**4.1.3 Status Messages (AA)**
```vue
<!-- ✅ Good: Status announced to screen readers -->
<div role="status" aria-live="polite">
  {{ statusMessage }}
</div>

<!-- ✅ Good: Important alerts -->
<div role="alert" aria-live="assertive">
  {{ errorMessage }}
</div>

<script setup lang="ts">
// Loading state
const loading = ref(false)
const statusMessage = computed(() =>
  loading.value ? 'Loading...' : 'Content loaded'
)
</script>
```

## Screen Reader Support

### ARIA Landmarks

```vue
<template>
  <div>
    <header role="banner">
      <!-- Site header -->
    </header>
    
    <nav role="navigation" aria-label="Main">
      <!-- Main navigation -->
    </nav>
    
    <main role="main">
      <!-- Main content -->
      
      <aside role="complementary" aria-label="Related">
        <!-- Sidebar -->
      </aside>
    </main>
    
    <footer role="contentinfo">
      <!-- Site footer -->
    </footer>
  </div>
</template>
```

### Live Regions

```vue
<!-- Search results live region -->
<div 
  role="region"
  aria-live="polite"
  aria-atomic="true"
  aria-label="Search results"
>
  <p>{{ results.length }} results found for "{{ query }}"</p>
</div>

<!-- Loading indicator -->
<div 
  role="status"
  aria-live="polite"
  aria-busy="true"
  v-if="loading"
>
  Loading content...
</div>
```

### Screen Reader Only Text

```vue
<style>
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
</style>

<template>
  <button>
    <Icon name="carbon:search" aria-hidden="true" />
    <span class="sr-only">Search</span>
  </button>
</template>
```

## Keyboard Navigation

### Focus Management

```typescript
// composables/useFocusManagement.ts
export const useFocusManagement = () => {
  const trapFocus = (container: Ref<HTMLElement | null>) => {
    const focusableElements = computed(() => {
      if (!container.value) return []
      
      return Array.from(
        container.value.querySelectorAll(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
        )
      ) as HTMLElement[]
    })
    
    const firstElement = computed(() => focusableElements.value[0])
    const lastElement = computed(() => 
      focusableElements.value[focusableElements.value.length - 1]
    )
    
    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return
      
      if (e.shiftKey) {
        if (document.activeElement === firstElement.value) {
          e.preventDefault()
          lastElement.value?.focus()
        }
      } else {
        if (document.activeElement === lastElement.value) {
          e.preventDefault()
          firstElement.value?.focus()
        }
      }
    }
    
    return { handleTabKey }
  }
  
  return { trapFocus }
}
```

### Keyboard Shortcuts

```typescript
// composables/useKeyboardShortcuts.ts
export const useKeyboardShortcuts = () => {
  const shortcuts = {
    'Ctrl+K': () => openSearch(),
    'Escape': () => closeModal(),
    '/': () => focusSearch(),
    'g h': () => navigateTo('/'),
    'g d': () => navigateTo('/docs'),
    'g e': () => navigateTo('/examples'),
  }
  
  // Provide help dialog
  const showShortcuts = ref(false)
  
  onMounted(() => {
    window.addEventListener('keydown', (e) => {
      if (e.key === '?') {
        showShortcuts.value = true
      }
    })
  })
  
  return { shortcuts, showShortcuts }
}
```

## Testing

### Automated Testing Tools

```typescript
// e2e/accessibility.spec.ts
import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test.describe('Accessibility', () => {
  test('should not have accessibility violations', async ({ page }) => {
    await page.goto('/')
    
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze()
    
    expect(accessibilityScanResults.violations).toEqual([])
  })
  
  test('should be keyboard navigable', async ({ page }) => {
    await page.goto('/')
    
    // Tab through interactive elements
    await page.keyboard.press('Tab')
    let focused = await page.evaluate(() => 
      document.activeElement?.tagName
    )
    
    expect(['A', 'BUTTON', 'INPUT']).toContain(focused)
  })
})
```

### Manual Testing Checklist

```markdown
## Manual Accessibility Testing

### Keyboard Testing
- [ ] Tab through all interactive elements
- [ ] Verify focus indicators are visible
- [ ] Test keyboard shortcuts
- [ ] Navigate with Arrow keys where appropriate
- [ ] Test Escape key to close modals
- [ ] Verify no keyboard traps

### Screen Reader Testing
- [ ] Test with NVDA (Windows)
- [ ] Test with JAWS (Windows)
- [ ] Test with VoiceOver (macOS/iOS)
- [ ] Test with TalkBack (Android)
- [ ] Verify landmark navigation
- [ ] Check form labels are announced
- [ ] Test live regions

### Visual Testing
- [ ] Test at 200% zoom
- [ ] Check color contrast
- [ ] Test in high contrast mode
- [ ] Verify text spacing
- [ ] Test with custom fonts
- [ ] Check focus indicators

### Mobile Testing
- [ ] Test with VoiceOver (iOS)
- [ ] Test with TalkBack (Android)
- [ ] Verify touch targets (min 44x44px)
- [ ] Test portrait and landscape
- [ ] Check pinch to zoom

### Browser Testing
- [ ] Chrome + ChromeVox
- [ ] Firefox
- [ ] Safari + VoiceOver
- [ ] Edge
```

## Accessibility Statement

```markdown
<!-- pages/accessibility.vue -->
# Accessibility Statement

## Our Commitment

We are committed to ensuring that the OpenSeadragon website is accessible
to everyone, including people with disabilities. We strive to meet WCAG 2.1
Level AA standards.

## Conformance Status

The OpenSeadragon website is **partially conformant** with WCAG 2.1 Level AA.
Partially conformant means that some parts of the content do not fully conform
to the accessibility standard.

## Known Issues

We are aware of the following accessibility issues and are working to address them:

1. Some code examples may not be fully accessible to screen readers
2. Interactive playground requires mouse for some operations
3. Some third-party embedded content may not meet accessibility standards

## Feedback

We welcome your feedback on the accessibility of the OpenSeadragon website.
Please let us know if you encounter accessibility barriers:

- **Email:** accessibility@openseadragon.org
- **GitHub:** [Open an issue](https://github.com/openseadragon/website/issues)

We aim to respond to accessibility feedback within 2 business days.

## Technical Specifications

The OpenSeadragon website relies on the following technologies:

- HTML5
- CSS3
- JavaScript
- Vue.js 3
- ARIA attributes

## Assessment Approach

We assessed the accessibility of the OpenSeadragon website using:

- Automated testing with axe-core
- Manual testing with screen readers
- Keyboard navigation testing
- Color contrast analysis
- WCAG 2.1 checklist review

**Last reviewed:** October 23, 2025

## Certification

This website has been reviewed and tested for WCAG 2.1 Level AA compliance.

[Accessibility certification badge/logo]
```

## Resources

### Tools
- **axe DevTools**: Browser extension for accessibility testing
- **WAVE**: Web accessibility evaluation tool
- **Lighthouse**: Automated accessibility audits
- **Color Contrast Analyzer**: Check contrast ratios
- **Screen Readers**: NVDA, JAWS, VoiceOver, TalkBack

### Guidelines
- [WCAG 2.1](https://www.w3.org/WAI/WCAG21/quickref/)
- [WAI-ARIA Practices](https://www.w3.org/WAI/ARIA/apg/)
- [MDN Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
- [A11y Project](https://www.a11yproject.com/)

## Success Metrics

- **Zero** critical accessibility violations
- **100%** keyboard navigation coverage
- **WCAG 2.1 AA** compliance achieved
- **< 10** minor accessibility issues
- **Positive** user feedback from assistive technology users
- **Monthly** accessibility audits
