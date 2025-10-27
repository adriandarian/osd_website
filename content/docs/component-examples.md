---
title: 'Component Examples'
description: 'Showcase of all available documentation components and features'
category: 'Getting Started'
icon: 'heroicons:sparkles'
order: 6
badge: 'new'
---

# Component Examples

This page demonstrates all the enhanced documentation features available in the OpenSeadragon documentation.

## Alerts and Callouts

Use alerts to highlight important information:

::alert{type="info" title="Information"}
This is an informational alert. Use it to provide helpful context or additional details.
::

::alert{type="tip" title="Pro Tip"}
This is a tip alert. Use it to share best practices or helpful suggestions.
::

::alert{type="warning" title="Warning"}
This is a warning alert. Use it to caution users about potential issues or important considerations.
::

::alert{type="danger" title="Danger"}
This is a danger alert. Use it to warn about critical issues or breaking changes.
::

::alert{type="note"}
This is a note without a custom title. The content speaks for itself!
::

## Badges

Use badges to highlight version information or status:

- ::badge[New]{type="success"}:: Feature added in v4.0
- ::badge[Beta]{type="warning"}:: Experimental feature
- ::badge[Deprecated]{type="danger"}:: Will be removed in v5.0
- ::badge[Stable]{type="info"}:: Production ready
- ::badge[Default]{type="neutral"}:: Standard behavior

## Code Blocks with Copy Button

All code blocks now include a copy button that appears on hover:

```javascript
// Initialize OpenSeadragon viewer
const viewer = OpenSeadragon({
  id: 'viewer-container',
  prefixUrl: '/openseadragon/images/',
  tileSources: {
    type: 'image',
    url: '/path/to/image.jpg',
  },
  showNavigationControl: true,
  animationTime: 0.5,
})

// Add event listener
viewer.addHandler('open', function () {
  console.log('Viewer opened successfully!')
})
```

```typescript
// TypeScript example with type definitions
interface ViewerOptions {
  id: string
  prefixUrl: string
  tileSources: TileSource
  showNavigationControl?: boolean
  animationTime?: number
}

const options: ViewerOptions = {
  id: 'my-viewer',
  prefixUrl: '/images/',
  tileSources: {
    type: 'image',
    url: '/example.jpg',
  },
}
```

```bash
# Install OpenSeadragon via npm
npm install openseadragon

# Or using yarn
yarn add openseadragon

# Or using bun
bun add openseadragon
```

## Tabs

Use tabs to organize related content:

::tabs
  ::tab{label="JavaScript"}
  ```javascript
  const viewer = OpenSeadragon({
    id: 'viewer',
    prefixUrl: '/images/',
    tileSources: '/path/to/image.dzi',
  })
  ```
  ::

  ::tab{label="TypeScript"}
  ```typescript
  import OpenSeadragon from 'openseadragon'

  const viewer: OpenSeadragon.Viewer = OpenSeadragon({
    id: 'viewer',
    prefixUrl: '/images/',
    tileSources: '/path/to/image.dzi',
  })
  ```
  ::

  ::tab{label="HTML"}
  ```html
  <div id="viewer" style="width: 800px; height: 600px;"></div>
  <script src="openseadragon.min.js"></script>
  <script>
    OpenSeadragon({
      id: 'viewer',
      prefixUrl: '/openseadragon/images/',
      tileSources: '/path/to/image.dzi',
    })
  </script>
  ```
  ::
::

## Mermaid Diagrams

Create diagrams directly in markdown using Mermaid:

::mermaid
```
graph TD
    A[Initialize Viewer] --> B{Load Tile Source}
    B -->|Success| C[Render Image]
    B -->|Error| D[Show Error]
    C --> E[Enable Navigation]
    C --> F[Enable Zoom]
    E --> G[User Interaction]
    F --> G
    G --> H[Update Viewport]
    H --> I[Request New Tiles]
    I --> C
```
::

::alert{type="info" title="Mermaid Support"}
You can create flowcharts, sequence diagrams, class diagrams, and more using Mermaid syntax!
::

## Tables

| Feature | Status | Version |
|---------|--------|---------|
| Deep Zoom | ::badge[Stable]{type="success"}:: | 1.0.0+ |
| Annotations | ::badge[Beta]{type="warning"}:: | 3.0.0+ |
| 3D Support | ::badge[Planned]{type="info"}:: | 5.0.0 |
| Legacy API | ::badge[Deprecated]{type="danger"}:: | < 2.0.0 |

## Syntax Highlighting

The documentation supports syntax highlighting for many languages:

```json
{
  "viewer": {
    "id": "openseadragon-viewer",
    "tileSources": {
      "type": "zoomifytileservice",
      "width": 5472,
      "height": 3648,
      "tilesUrl": "/tiles/"
    },
    "options": {
      "showNavigationControl": true,
      "animationTime": 0.5,
      "blendTime": 0.1,
      "minZoomImageRatio": 0.8,
      "maxZoomPixelRatio": 2
    }
  }
}
```

```css
/* Custom viewer styling */
#openseadragon-viewer {
  width: 100%;
  height: 600px;
  background-color: #000;
  border: 2px solid #333;
  border-radius: 8px;
}

.openseadragon-container:fullscreen {
  background-color: #000;
}
```

```yaml
# Configuration file example
viewer:
  id: openseadragon-viewer
  prefixUrl: /openseadragon/images/
  tileSources:
    - /images/image1.dzi
    - /images/image2.dzi
  options:
    showNavigationControl: true
    animationTime: 0.5
```

## Combining Features

You can combine multiple features for rich documentation:

::alert{type="tip" title="Best Practice"}
When initializing multiple viewers, consider using a factory pattern:

```javascript
function createViewer(containerId, tileSource) {
  return OpenSeadragon({
    id: containerId,
    prefixUrl: '/images/',
    tileSources: tileSource,
    showNavigationControl: true,
  })
}

const viewer1 = createViewer('viewer-1', '/tiles/image1.dzi')
const viewer2 = createViewer('viewer-2', '/tiles/image2.dzi')
```
::

## Blockquotes

> This is a blockquote. It's useful for highlighting quotes or important passages from documentation or specifications.

---

## Next Steps

::alert{type="info"}
Now that you've seen all the available components, explore the rest of the documentation to learn how to use OpenSeadragon effectively!
::
