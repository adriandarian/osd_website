---
title: Getting Started
description: Learn how to install and use OpenSeadragon in your project
category: Getting Started
icon: heroicons:rocket-launch
order: 1
badge: new
---

# Getting Started with OpenSeadragon

Welcome to OpenSeadragon! This guide will help you get started with the library.

## Installation

You can install OpenSeadragon via npm, yarn, or by including it directly in your HTML.

### Via npm

```bash
npm install openseadragon
```

### Via CDN

```html
<script src="https://cdn.jsdelivr.net/npm/openseadragon@latest/build/openseadragon/openseadragon.min.js"></script>
```

## Basic Usage

Here's a simple example to get you started:

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

## Next Steps

- Explore the [API Reference](/docs/api)
- Check out [Examples](/examples)
- Join our [Community](/community)
