---
title: Tile Sources
description: Understanding and configuring different types of tile sources
category: Guides
icon: heroicons:squares-2x2
order: 20
badge: updated
---

# Tile Sources

OpenSeadragon supports multiple types of tile sources for serving zoomable images.

## Deep Zoom Image (DZI)

Microsoft's Deep Zoom Image format, consisting of a `.dzi` XML file and a folder of tiles.

### Usage

```javascript
const viewer = OpenSeadragon({
  id: 'viewer',
  tileSources: '/images/myimage.dzi'
})
```

### DZI File Structure

```xml
<?xml version="1.0" encoding="utf-8"?>
<Image TileSize="256" Overlap="1" Format="jpg" 
       xmlns="http://schemas.microsoft.com/deepzoom/2008">
  <Size Width="4000" Height="3000"/>
</Image>
```

## IIIF (International Image Interoperability Framework)

IIIF provides a standardized API for delivering images.

### IIIF Image API 2.0

```javascript
tileSources: {
  '@context': 'http://iiif.io/api/image/2/context.json',
  'protocol': 'http://iiif.io/api/image',
  'profile': ['http://iiif.io/api/image/2/level2.json'],
  'tiles': [{
    'scaleFactors': [1, 2, 4, 8, 16],
    'width': 256
  }],
  'id': 'https://example.com/image-service',
  'width': 4000,
  'height': 3000
}
```

### IIIF Image API 3.0

```javascript
tileSources: {
  '@context': 'http://iiif.io/api/image/3/context.json',
  'id': 'https://example.com/image-service',
  'type': 'ImageService3',
  'profile': 'level2',
  'width': 4000,
  'height': 3000,
  'tiles': [{
    'scaleFactors': [1, 2, 4, 8, 16],
    'width': 256
  }]
}
```

## Zoomify

The Zoomify format stores tiles in a specific folder structure.

```javascript
tileSources: {
  type: 'zoomifytileservice',
  width: 4000,
  height: 3000,
  tilesUrl: '/images/zoomify/'
}
```

## Legacy Image Pyramid

For images tiled with the Legacy Image Pyramid format.

```javascript
tileSources: {
  type: 'legacy-image-pyramid',
  levels: [{
    url: '/images/level0.jpg',
    width: 500,
    height: 400
  }, {
    url: '/images/level1.jpg',
    width: 1000,
    height: 800
  }]
}
```

## Simple Image

For non-tiled images (not recommended for large images).

```javascript
tileSources: {
  type: 'image',
  url: '/images/simple.jpg'
}
```

## Custom Tile Source

You can create custom tile sources by extending the `TileSource` class:

```javascript
class CustomTileSource extends OpenSeadragon.TileSource {
  configure(data, url) {
    // Configure your tile source
    return data
  }
  
  getTileUrl(level, x, y) {
    // Return URL for specific tile
    return `https://example.com/tiles/${level}/${x}/${y}.jpg`
  }
}

const viewer = OpenSeadragon({
  id: 'viewer',
  tileSources: new CustomTileSource({
    width: 4000,
    height: 3000,
    tileSize: 256
  })
})
```

## Next Steps

- Learn about [Viewer Options](/docs/configuration)
- See [Examples](/examples) for real-world implementations
- Read the [API Reference](/docs/api/tilesource)
