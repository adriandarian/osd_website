---
title: Installation
description: Different ways to install OpenSeadragon in your project
category: Getting Started
icon: heroicons:arrow-down-tray
order: 2
---

# Installation

OpenSeadragon can be installed in several ways depending on your project setup.

## Package Managers

### npm

```bash
npm install openseadragon
```

### yarn

```bash
yarn add openseadragon
```

### pnpm

```bash
pnpm add openseadragon
```

### bun

```bash
bun add openseadragon
```

## CDN

### jsDelivr

```html
<script src="https://cdn.jsdelivr.net/npm/openseadragon@latest/build/openseadragon/openseadragon.min.js"></script>
```

### unpkg

```html
<script src="https://unpkg.com/openseadragon@latest/build/openseadragon/openseadragon.min.js"></script>
```

## Download

You can also download OpenSeadragon directly from GitHub:

1. Visit the [releases page](https://github.com/openseadragon/openseadragon/releases)
2. Download the latest version
3. Extract the files
4. Include the script in your HTML

```html
<script src="/path/to/openseadragon.min.js"></script>
```

## Verification

To verify the installation, you can check the version:

```javascript
import OpenSeadragon from 'openseadragon'
console.log(OpenSeadragon.version)
```

## Next Steps

Now that you have OpenSeadragon installed, learn how to create your first viewer in the [Basic Usage](/docs/basic-usage) guide.
