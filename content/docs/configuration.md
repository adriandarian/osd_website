---
title: Viewer Options
description: Complete reference for OpenSeadragon viewer configuration options
category: Configuration
icon: heroicons:cog-6-tooth
order: 10
---

# Viewer Options

This page documents all available configuration options for the OpenSeadragon viewer.

## Core Options

### id

**Type:** `String`  
**Required:** Yes

The ID of the HTML element that will contain the viewer.

```javascript
const viewer = OpenSeadragon({
  id: 'my-viewer'
})
```

### tileSources

**Type:** `String | Object | Array`  
**Required:** Yes

The tile source(s) to display. Can be a URL string, a configuration object, or an array of sources.

```javascript
// Simple DZI file
tileSources: '/images/myimage.dzi'

// IIIF image
tileSources: {
  '@context': 'http://iiif.io/api/image/2/context.json',
  'profile': ['http://iiif.io/api/image/2/level2.json'],
  // ... more properties
}

// Multiple images
tileSources: ['/image1.dzi', '/image2.dzi']
```

## Display Options

### defaultZoomLevel

**Type:** `Number`  
**Default:** `0`

The initial zoom level. `0` means the full image is visible.

### minZoomLevel

**Type:** `Number`  
**Default:** `null`

The minimum allowed zoom level. If `null`, calculated automatically.

### maxZoomLevel

**Type:** `Number`  
**Default:** `null`

The maximum allowed zoom level. If `null`, calculated automatically.

### homeFillsViewer

**Type:** `Boolean`  
**Default:** `false`

If `true`, the home zoom level fills the viewer, rather than fitting the entire image.

## Navigation Options

### showNavigationControl

**Type:** `Boolean`  
**Default:** `true`

Whether to show the navigation control overlay.

### navigationControlAnchor

**Type:** `ControlAnchor`  
**Default:** `TOP_LEFT`

Position of the navigation control. Options:
- `NONE`
- `TOP_LEFT`
- `TOP_RIGHT`
- `BOTTOM_LEFT`
- `BOTTOM_RIGHT`
- `ABSOLUTE` (requires `top` and `left` settings)

### showZoomControl

**Type:** `Boolean`  
**Default:** `true`

Whether to show the zoom in/out buttons.

### showHomeControl

**Type:** `Boolean`  
**Default:** `true`

Whether to show the home (reset) button.

### showFullPageControl

**Type:** `Boolean`  
**Default:** `true`

Whether to show the full-page toggle button.

## Performance Options

### immediateRender

**Type:** `Boolean`  
**Default:** `false`

If `true`, render tiles immediately instead of waiting for them to fully load.

### blendTime

**Type:** `Number`  
**Default:** `0`

Time in seconds for tiles to blend from transparent to opaque.

### alwaysBlend

**Type:** `Boolean`  
**Default:** `false`

If `true`, always blend tiles even when they're fully loaded.

### timeout

**Type:** `Number`  
**Default:** `300000` (5 minutes)

Maximum time in milliseconds to wait for a tile to load.

## More Options

For a complete list of all available options, see the [API Reference](/docs/api/viewer).
