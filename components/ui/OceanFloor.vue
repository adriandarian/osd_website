<template>
  <div 
    ref="floorContainer" 
    class="ocean-floor"
  >
    <canvas ref="canvas" class="floor-canvas" />
  </div>
</template>

<script setup lang="ts">
interface TerrainLayer {
  x: number
  y: number
  width: number
  height: number
  color: string
  depth: number // 0 = far background, 1 = mid, 2 = foreground
  points: Array<{ x: number; y: number }>
}

interface Cliff {
  x: number
  y: number
  width: number
  height: number
  color: string
  depth: number
  shape: Array<{ x: number; y: number }>
}

const floorContainer = ref<HTMLDivElement | null>(null)
const canvas = ref<HTMLCanvasElement | null>(null)
const ctx = ref<CanvasRenderingContext2D | null>(null)
const terrainLayers = ref<TerrainLayer[]>([])
const cliffs = ref<Cliff[]>([])
const scrollY = ref(0)
const pageHeight = ref(0)

const terrainColors = {
  dark: {
    background: [
      'rgba(40, 45, 60, 0.3)',
      'rgba(45, 50, 65, 0.28)',
      'rgba(38, 43, 58, 0.32)',
    ],
    midground: [
      'rgba(60, 65, 80, 0.5)',
      'rgba(65, 70, 85, 0.48)',
      'rgba(58, 63, 78, 0.52)',
    ],
    foreground: [
      'rgba(80, 85, 100, 0.7)',
      'rgba(85, 90, 105, 0.68)',
      'rgba(78, 83, 98, 0.72)',
    ],
    sideCliffs: [
      'rgba(50, 55, 70, 0.18)',
      'rgba(55, 60, 75, 0.15)',
      'rgba(48, 53, 68, 0.20)',
    ]
  },
  light: {
    background: [
      'rgba(100, 110, 130, 0.25)',
      'rgba(105, 115, 135, 0.23)',
      'rgba(98, 108, 128, 0.27)',
    ],
    midground: [
      'rgba(120, 130, 150, 0.4)',
      'rgba(125, 135, 155, 0.38)',
      'rgba(118, 128, 148, 0.42)',
    ],
    foreground: [
      'rgba(140, 150, 170, 0.6)',
      'rgba(145, 155, 175, 0.58)',
      'rgba(138, 148, 168, 0.62)',
    ],
    sideCliffs: [
      'rgba(110, 120, 140, 0.15)',
      'rgba(115, 125, 145, 0.18)',
      'rgba(108, 118, 138, 0.16)',
    ]
  }
}

const initCanvas = () => {
  if (!canvas.value || !floorContainer.value) return
  
  const container = floorContainer.value
  const dpr = window.devicePixelRatio || 1
  
  const rect = container.getBoundingClientRect()
  canvas.value.style.width = `${rect.width}px`
  canvas.value.style.height = `${rect.height}px`
  
  canvas.value.width = rect.width * dpr
  canvas.value.height = rect.height * dpr
  
  ctx.value = canvas.value.getContext('2d')
  
  if (ctx.value) {
    ctx.value.scale(dpr, dpr)
  }
  
  createFloorElements()
}

const createFloorElements = () => {
  if (!canvas.value || !floorContainer.value) return
  
  pageHeight.value = Math.max(
    document.body.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.clientHeight,
    document.documentElement.scrollHeight,
    document.documentElement.offsetHeight
  )
  
  const rect = {
    width: window.innerWidth,
    height: pageHeight.value
  }
  
  const bgColor = getComputedStyle(document.documentElement)
    .getPropertyValue('--vp-c-bg').trim()
  const isDark = bgColor.includes('#1') || bgColor.includes('rgb(27')
  
  const colors = isDark ? terrainColors.dark : terrainColors.light
  
  terrainLayers.value = []
  cliffs.value = []
  
  const footerHeight = 200
  const actualBottom = rect.height - footerHeight
  const terrainZoneHeight = rect.height * 0.25
  const terrainStart = actualBottom - terrainZoneHeight
  
  // Create background terrain layers (subtle, far back)
  for (let i = 0; i < 3; i++) {
    const y = terrainStart + i * (terrainZoneHeight * 0.15)
    const points: Array<{ x: number; y: number }> = []
    const segments = 20
    
    for (let j = 0; j <= segments; j++) {
      const x = (j / segments) * rect.width
      const variance = (Math.sin(j * 0.5) + Math.random()) * 30
      points.push({ x, y: y + variance })
    }
    
    const colorIndex = Math.floor(Math.random() * colors.background.length)
    terrainLayers.value.push({
      x: 0,
      y,
      width: rect.width,
      height: 100 + Math.random() * 80,
      color: colors.background[colorIndex] ?? colors.background[0] ?? 'rgba(40, 45, 60, 0.3)',
      depth: 0,
      points
    })
  }
  
  // Create midground terrain (more visible)
  for (let i = 0; i < 5; i++) {
    const y = terrainStart + terrainZoneHeight * 0.3 + i * (terrainZoneHeight * 0.12)
    const points: Array<{ x: number; y: number }> = []
    const segments = 25
    
    for (let j = 0; j <= segments; j++) {
      const x = (j / segments) * rect.width
      const variance = (Math.sin(j * 0.3) + Math.random() * 0.5) * 50
      points.push({ x, y: y + variance })
    }
    
    const colorIndex = Math.floor(Math.random() * colors.midground.length)
    terrainLayers.value.push({
      x: 0,
      y,
      width: rect.width,
      height: 120 + Math.random() * 100,
      color: colors.midground[colorIndex] ?? colors.midground[0] ?? 'rgba(60, 65, 80, 0.5)',
      depth: 1,
      points
    })
  }
  
  // Create foreground cliffs attached to bottom edge
  const bottomCliffCount = 15
  for (let i = 0; i < bottomCliffCount; i++) {
    const x = (i / bottomCliffCount) * rect.width + (Math.random() - 0.5) * 100
    const y = actualBottom
    const width = 150 + Math.random() * 300
    const height = 100 + Math.random() * 200
    
    // Create irregular cliff shape that extends upward from bottom
    const shape: Array<{ x: number; y: number }> = []
    const segments = 8
    
    // Top edge (irregular wavy line)
    for (let j = 0; j <= segments; j++) {
      const xPos = (j / segments - 0.5) * width
      const yPos = -height + Math.sin(j * 0.8) * 30 + Math.random() * 40
      shape.push({ x: xPos, y: yPos })
    }
    
    // Right side going down to bottom
    shape.push({ x: width / 2, y: 10 })
    
    // Bottom edge (extends slightly below actualBottom)
    shape.push({ x: width / 2, y: 20 })
    shape.push({ x: -width / 2, y: 20 })
    
    // Left side going back up
    shape.push({ x: -width / 2, y: 10 })
    
    const colorIndex = Math.floor(Math.random() * colors.foreground.length)
    cliffs.value.push({
      x,
      y,
      width,
      height,
      color: colors.foreground[colorIndex] ?? colors.foreground[0] ?? 'rgba(80, 85, 100, 0.7)',
      depth: 2,
      shape
    })
  }
  
  // Create side cliffs along left and right edges
  const edgeMargin = 120 // Reduced from 200 - don't stick out too much
  const sideCliffCount = 18 // Cliffs per side (increased for better coverage)
  const sideCliffZoneHeight = rect.height * 0.6 // Extend higher up the page
  const sideCliffStart = actualBottom - sideCliffZoneHeight
  
  // Left side cliffs
  for (let i = 0; i < sideCliffCount; i++) {
    const y = sideCliffStart + (i / sideCliffCount) * sideCliffZoneHeight + Math.random() * 100
    const x = Math.random() * 30 // Much closer to edge, minimal extension
    const width = 80 + Math.random() * 120 // Reduced width
    const height = 200 + Math.random() * 350 // Taller cliffs
    
    // Create vertical cliff shape extending upward
    const shape: Array<{ x: number; y: number }> = []
    const segments = 7
    
    // Right edge (visible side)
    for (let j = 0; j <= segments; j++) {
      const yPos = (j / segments) * height
      const xVariance = Math.sin(j * 0.8) * 20 + Math.random() * 15
      shape.push({ x: width + xVariance, y: -yPos })
    }
    
    // Top edge
    shape.push({ x: width * 0.3, y: -height })
    
    // Left edge (extends off-screen or minimal)
    for (let j = segments; j >= 0; j--) {
      const yPos = (j / segments) * height
      const xVariance = Math.random() * 10
      shape.push({ x: xVariance, y: -yPos })
    }
    
    const colorIndex = Math.floor(Math.random() * colors.sideCliffs.length)
    const color = colors.sideCliffs[colorIndex] ?? colors.sideCliffs[0] ?? 'rgba(50, 55, 70, 0.18)'
    
    cliffs.value.push({
      x,
      y,
      width,
      height,
      color,
      depth: 0, // More subtle, background depth
      shape
    })
  }
  
  // Right side cliffs
  for (let i = 0; i < sideCliffCount; i++) {
    const y = sideCliffStart + (i / sideCliffCount) * sideCliffZoneHeight + Math.random() * 100
    const x = rect.width - Math.random() * 30 // Much closer to edge, minimal extension
    const width = 80 + Math.random() * 120 // Reduced width
    const height = 200 + Math.random() * 350 // Taller cliffs
    
    // Create vertical cliff shape extending upward
    const shape: Array<{ x: number; y: number }> = []
    const segments = 7
    
    // Left edge (visible side)
    for (let j = 0; j <= segments; j++) {
      const yPos = (j / segments) * height
      const xVariance = Math.sin(j * 0.8) * 20 + Math.random() * 15
      shape.push({ x: -xVariance, y: -yPos })
    }
    
    // Top edge
    shape.push({ x: -width * 0.3, y: -height })
    
    // Right edge (extends off-screen or minimal)
    for (let j = segments; j >= 0; j--) {
      const yPos = (j / segments) * height
      const xVariance = Math.random() * 10
      shape.push({ x: -width - xVariance, y: -yPos })
    }
    
    const colorIndex = Math.floor(Math.random() * colors.sideCliffs.length)
    const color = colors.sideCliffs[colorIndex] ?? colors.sideCliffs[0] ?? 'rgba(50, 55, 70, 0.18)'
    
    cliffs.value.push({
      x,
      y,
      width,
      height,
      color,
      depth: 0, // More subtle, background depth
      shape
    })
  }
}

const drawTerrainLayer = (layer: TerrainLayer) => {
  if (!ctx.value || layer.points.length === 0) return
  
  ctx.value.save()
  ctx.value.fillStyle = layer.color
  
  // Draw terrain with smooth organic wavy top using quadratic curves
  ctx.value.beginPath()
  const firstPoint = layer.points[0]
  if (!firstPoint) return
  ctx.value.moveTo(firstPoint.x, firstPoint.y)
  
  // Draw smooth wavy top edge using quadratic curves
  for (let i = 1; i < layer.points.length - 1; i++) {
    const point = layer.points[i]
    const nextPoint = layer.points[i + 1]
    if (!point || !nextPoint) continue
    
    const xMid = (point.x + nextPoint.x) / 2
    const yMid = (point.y + nextPoint.y) / 2
    ctx.value.quadraticCurveTo(point.x, point.y, xMid, yMid)
  }
  
  // Final point
  const lastPoint = layer.points[layer.points.length - 1]
  if (lastPoint) {
    ctx.value.lineTo(lastPoint.x, lastPoint.y)
  }
  
  // Complete the shape to bottom
  ctx.value.lineTo(layer.width, layer.y + layer.height)
  ctx.value.lineTo(0, layer.y + layer.height)
  ctx.value.closePath()
  ctx.value.fill()
  
  // Add subtle texture lines for depth
  if (layer.depth > 0) {
    ctx.value.strokeStyle = layer.color.replace(/[\d.]+\)$/, '0.15)')
    ctx.value.lineWidth = 1
    const lineCount = layer.depth === 1 ? 3 : 5
    for (let i = 0; i < lineCount; i++) {
      const y = layer.y + (i + 1) * (layer.height / (lineCount + 1))
      ctx.value.beginPath()
      ctx.value.moveTo(0, y + Math.sin(i) * 10)
      for (let x = 0; x <= layer.width; x += 20) {
        const variance = Math.sin(x * 0.05 + i) * 5
        ctx.value.lineTo(x, y + variance)
      }
      ctx.value.stroke()
    }
  }
  
  ctx.value.restore()
}

const drawCliff = (cliff: Cliff) => {
  if (!ctx.value || cliff.shape.length < 3) return
  
  const firstPoint = cliff.shape[0]
  if (!firstPoint) return
  
  ctx.value.save()
  ctx.value.translate(cliff.x, cliff.y)
  
  // Draw cliff shape with smooth curves
  ctx.value.fillStyle = cliff.color
  ctx.value.beginPath()
  ctx.value.moveTo(firstPoint.x, firstPoint.y)
  
  // Use quadratic curves for smoother edges
  for (let i = 1; i < cliff.shape.length - 1; i++) {
    const point = cliff.shape[i]
    const nextPoint = cliff.shape[i + 1]
    if (!point || !nextPoint) continue
    
    const xMid = (point.x + nextPoint.x) / 2
    const yMid = (point.y + nextPoint.y) / 2
    ctx.value.quadraticCurveTo(point.x, point.y, xMid, yMid)
  }
  
  // Connect back to start smoothly
  const lastPoint = cliff.shape[cliff.shape.length - 1]
  if (lastPoint) {
    ctx.value.quadraticCurveTo(lastPoint.x, lastPoint.y, firstPoint.x, firstPoint.y)
  }
  
  ctx.value.closePath()
  ctx.value.fill()
  
  ctx.value.restore()
}

const updateAndDraw = () => {
  if (!ctx.value || !canvas.value || !floorContainer.value) return
  
  const rect = floorContainer.value.getBoundingClientRect()
  ctx.value.clearRect(0, 0, rect.width, rect.height)
  
  const viewportTop = scrollY.value
  const viewportBottom = scrollY.value + window.innerHeight
  const buffer = 300
  
  // Translate canvas for document positioning
  ctx.value.save()
  ctx.value.translate(0, -scrollY.value)
  
  // Draw terrain layers from back to front
  // Background layers first (depth 0)
  terrainLayers.value.filter(layer => layer.depth === 0).forEach(layer => {
    if (layer.y < viewportTop - buffer || layer.y > viewportBottom + buffer) {
      return
    }
    drawTerrainLayer(layer)
  })
  
  // Midground layers (depth 1)
  terrainLayers.value.filter(layer => layer.depth === 1).forEach(layer => {
    if (layer.y < viewportTop - buffer || layer.y > viewportBottom + buffer) {
      return
    }
    drawTerrainLayer(layer)
  })
  
  // Foreground cliffs last (depth 2)
  cliffs.value.forEach(cliff => {
    if (cliff.y < viewportTop - buffer || cliff.y > viewportBottom + buffer) {
      return
    }
    drawCliff(cliff)
  })
  
  ctx.value.restore()
}

const handleScroll = () => {
  scrollY.value = window.scrollY || window.pageYOffset
}

const animateFrame = () => {
  updateAndDraw()
  requestAnimationFrame(animateFrame)
}

const handleResize = () => {
  initCanvas()
}

onMounted(() => {
  initCanvas()
  animateFrame()
  handleScroll()
  window.addEventListener('resize', handleResize)
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.ocean-floor {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 0;
  pointer-events: none;
  overflow: hidden;
}

.floor-canvas {
  width: 100%;
  height: 100%;
  display: block;
}
</style>
