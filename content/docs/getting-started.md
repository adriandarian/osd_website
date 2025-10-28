---
title: Getting Started
description: Learn how to install and use OpenSeadragon in your project
category: Getting Started
icon: heroicons:rocket-launch
order: 1
badge: new
---

# Getting Started with OpenSeadragon

Welcome to OpenSeadragon! This powerful JavaScript library enables seamless visualization of high-resolution zoomable images. Whether you're building a digital archive, an image gallery, or a scientific visualization tool, OpenSeadragon provides the performance and flexibility you need.

## Quick Installation

Choose your preferred installation method:

::tabs
:::tab{label="npm"}
```bash
npm install openseadragon
```
:::

:::tab{label="yarn"}
```bash
yarn add openseadragon
```
:::

:::tab{label="pnpm"}
```bash
pnpm add openseadragon
```
:::

:::tab{label="bun"}
```bash
bun add openseadragon
```
:::

:::tab{label="jsDelivr"}
```html
<script src="https://cdn.jsdelivr.net/npm/openseadragon@latest/build/openseadragon/openseadragon.min.js"></script>
```
::badge{type="info"}No build step required::
:::

:::tab{label="unpkg"}
```html
<script src="https://unpkg.com/openseadragon@latest/build/openseadragon/openseadragon.min.js"></script>
```
::badge{type="info"}No build step required::
:::
::

## Verification

To verify the installation, you can check the version:

```javascript
import OpenSeadragon from 'openseadragon'
console.log(OpenSeadragon.version)
```

## Your First Viewer

### 1. Create the HTML Container

First, add a container element to your HTML where the viewer will be mounted:

```html
<div id="openseadragon-viewer" style="width: 800px; height: 600px;"></div>
```

::alert{type="note"}
Make sure to set explicit width and height dimensions for the container element.
::

### 2. Initialize the Viewer

Now create and configure your OpenSeadragon viewer:

::tabs
:::tab{label="JavaScript"}
```javascript
import OpenSeadragon from 'openseadragon'

const viewer = OpenSeadragon({
  id: 'openseadragon-viewer',
  prefixUrl: 'https://cdn.jsdelivr.net/npm/openseadragon@latest/build/openseadragon/images/',
  tileSources: {
    type: 'image',
    url: '/path/to/your/image.jpg'
  }
})
```
:::

:::tab{label="TypeScript"}
```typescript
import OpenSeadragon from 'openseadragon'

const viewer: OpenSeadragon.Viewer = OpenSeadragon({
  id: 'openseadragon-viewer',
  prefixUrl: 'https://cdn.jsdelivr.net/npm/openseadragon@latest/build/openseadragon/images/',
  tileSources: {
    type: 'image',
    url: '/path/to/your/image.jpg'
  }
})
```
:::

:::tab{label="CDN (Vanilla JS)"}
```html
<script>
  const viewer = OpenSeadragon({
    id: 'openseadragon-viewer',
    prefixUrl: 'https://cdn.jsdelivr.net/npm/openseadragon@latest/build/openseadragon/images/',
    tileSources: {
      type: 'image',
      url: '/path/to/your/image.jpg'
    }
  })
</script>
```
:::
::

### 3. That's It! 🎉

You now have a fully functional zoomable image viewer! Try zooming in and out, panning around, and exploring the image.

## Key Features at a Glance

::alert{type="info" title="What Makes OpenSeadragon Special?"}
- **🚀 High Performance** - Smooth zooming and panning even with gigapixel images
- **📱 Touch Support** - Full mobile and tablet support with multi-touch gestures
- **🎨 Flexible** - Works with multiple image formats (DZI, IIIF, Zoomify, and more)
- **🔧 Extensible** - Rich plugin ecosystem and event system
- **🌐 Standards-Based** - IIIF Image API compliant
- **⚡ Lightweight** - No heavy dependencies
::

## Common Use Cases

### Deep Zoom Images (DZI)

Perfect for large, tiled images:

```javascript
const viewer = OpenSeadragon({
  id: 'openseadragon-viewer',
  prefixUrl: '/openseadragon/images/',
  tileSources: '/path/to/image.dzi'
})
```

### IIIF Image API

Integrate with IIIF-compliant image servers:

```javascript
const viewer = OpenSeadragon({
  id: 'openseadragon-viewer',
  prefixUrl: '/openseadragon/images/',
  tileSources: {
    '@context': 'http://iiif.io/api/image/2/context.json',
    'profile': ['http://iiif.io/api/image/2/level2.json'],
    'protocol': 'http://iiif.io/api/image',
    'id': 'https://example.com/image-service',
    'width': 4000,
    'height': 3000
  }
})
```

### Multiple Images

Display multiple images in a single viewer:

```javascript
const viewer = OpenSeadragon({
  id: 'openseadragon-viewer',
  prefixUrl: '/openseadragon/images/',
  sequenceMode: true,
  tileSources: [
    '/image1.dzi',
    '/image2.dzi',
    '/image3.dzi'
  ]
})
```

## Next Steps

Now that you have OpenSeadragon up and running, explore more advanced features:

::alert{type="tip" title="Continue Learning"}
- 📖 [Basic Usage](/docs/basic-usage) - Learn about common configuration options
- 🎨 [Tile Sources](/docs/tile-sources) - Understand different image formats
- ⚙️ [Configuration](/docs/configuration) - Customize your viewer's behavior
- 🎮 [Examples](/examples) - See live demos and code examples
- 🎪 [Playground](/playground) - Experiment with OpenSeadragon interactively
::

::alert{type="info" title="Need Help?"}
- Check out our [documentation](/docs) for detailed guides
- Browse [examples](/examples) for inspiration
- Join our community for support and discussions
::
