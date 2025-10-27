---
title: Basic Usage
description: Learn how to create and configure a basic OpenSeadragon viewer
category: Getting Started
icon: heroicons:play
order: 3
---

# Basic Usage

This guide covers the basics of creating and configuring an OpenSeadragon viewer.

## HTML Setup

First, create a container element for the viewer:

```html
<div id="openseadragon-viewer" style="width: 800px; height: 600px;"></div>
```

## Creating a Viewer

### Simple Image

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

### Deep Zoom Image (DZI)

```javascript
const viewer = OpenSeadragon({
  id: 'openseadragon-viewer',
  prefixUrl: '/openseadragon/images/',
  tileSources: '/path/to/image.dzi'
})
```

### IIIF Image

```javascript
const viewer = OpenSeadragon({
  id: 'openseadragon-viewer',
  prefixUrl: '/openseadragon/images/',
  tileSources: {
    '@context': 'http://iiif.io/api/image/2/context.json',
    'profile': ['http://iiif.io/api/image/2/level2.json'],
    'protocol': 'http://iiif.io/api/image',
    'tiles': [{
      'scaleFactors': [1, 2, 4, 8, 16],
      'width': 256
    }],
    'id': 'https://example.com/image-service',
    'width': 4000,
    'height': 3000
  }
})
```

## Common Options

### Initial Zoom and Position

```javascript
const viewer = OpenSeadragon({
  id: 'openseadragon-viewer',
  tileSources: '/image.dzi',
  defaultZoomLevel: 1,
  minZoomLevel: 0.5,
  maxZoomLevel: 10,
  visibilityRatio: 1.0,
  constrainDuringPan: true
})
```

### UI Controls

```javascript
const viewer = OpenSeadragon({
  id: 'openseadragon-viewer',
  tileSources: '/image.dzi',
  showNavigator: true,
  navigatorPosition: 'BOTTOM_RIGHT',
  showNavigationControl: true,
  navigationControlAnchor: OpenSeadragon.ControlAnchor.TOP_LEFT,
  showZoomControl: true,
  showHomeControl: true,
  showFullPageControl: true
})
```

## Event Handling

OpenSeadragon provides various events you can listen to:

```javascript
viewer.addHandler('open', () => {
  console.log('Viewer opened')
})

viewer.addHandler('zoom', (event) => {
  console.log('Zoom level:', event.zoom)
})

viewer.addHandler('pan', (event) => {
  console.log('Center:', event.center)
})
```

## Cleanup

Always clean up the viewer when you're done:

```javascript
viewer.destroy()
```

## Next Steps

- Explore [Configuration Options](/docs/configuration) for more customization
- Learn about [Events](/docs/events) for interactivity
- Check out [Examples](/examples) for real-world use cases
