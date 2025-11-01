<template>
  <div 
    ref="oceanContainer" 
    class="ocean-elements"
  >
    <canvas ref="canvas" class="ocean-canvas" />
  </div>
</template>

<script setup lang="ts">
interface Seaweed {
  x: number
  y: number
  height: number
  segments: number
  width: number
  swayPhase: number
  swaySpeed: number
  color: string
}

interface Fish {
  x: number
  y: number
  size: number
  speed: number
  direction: number
  depth: number // For parallax effect
  swayPhase: number
  color: string
}

interface LightRay {
  x: number
  width: number
  opacity: number
  fadeSpeed: number
  fadePhase: number
}

const oceanContainer = ref<HTMLDivElement | null>(null)
const canvas = ref<HTMLCanvasElement | null>(null)
const ctx = ref<CanvasRenderingContext2D | null>(null)
const seaweeds = ref<Seaweed[]>([])
const fishes = ref<Fish[]>([])
const lightRays = ref<LightRay[]>([])
const time = ref(0)
const scrollY = ref(0)
const pageHeight = ref(0)

const seaweedColors = {
  dark: [
    'rgba(34, 139, 34, 0.4)',   // Forest green
    'rgba(46, 125, 50, 0.35)',  // Dark sea green
    'rgba(0, 100, 0, 0.3)',     // Dark green
    'rgba(85, 107, 47, 0.35)',  // Dark olive
  ],
  light: [
    'rgba(34, 139, 34, 0.25)',
    'rgba(46, 125, 50, 0.2)',
    'rgba(0, 100, 0, 0.2)',
    'rgba(85, 107, 47, 0.25)',
  ]
}

const fishColors = {
  dark: [
    'rgba(100, 150, 200, 0.3)',
    'rgba(150, 180, 220, 0.25)',
    'rgba(200, 150, 100, 0.3)',
  ],
  light: [
    'rgba(80, 120, 160, 0.2)',
    'rgba(120, 150, 180, 0.15)',
    'rgba(160, 120, 80, 0.2)',
  ]
}

const initCanvas = () => {
  if (!canvas.value || !oceanContainer.value) return
  
  const container = oceanContainer.value
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
  
  createElements()
}

const createElements = () => {
  if (!canvas.value || !oceanContainer.value) return
  
  // Get full document height
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
  
  // Detect dark mode
  const bgColor = getComputedStyle(document.documentElement)
    .getPropertyValue('--vp-c-bg').trim()
  const isDark = bgColor.includes('#1') || bgColor.includes('rgb(27')
  
  const seaweedColorPalette = isDark ? seaweedColors.dark : seaweedColors.light
  const fishColorPalette = isDark ? fishColors.dark : fishColors.light
  
  // Create seaweed distributed throughout the page bottom areas
  seaweeds.value = []
  
  // Divide page into sections and add seaweed to bottom portions
  const sections = 10
  for (let section = 0; section < sections; section++) {
    const sectionHeight = rect.height / sections
    const yBase = section * sectionHeight + sectionHeight * 0.8 // Bottom 20% of each section
    
    // More seaweed in lower sections
    const density = Math.floor(2 + (section / sections) * 8) // Increased from 6 to 8
    
    for (let i = 0; i < density; i++) {
      const x = Math.random() * rect.width
      const y = yBase + Math.random() * (sectionHeight * 0.2)
      const colorIndex = Math.floor(Math.random() * seaweedColorPalette.length)
      
      seaweeds.value.push({
        x,
        y,
        height: 60 + Math.random() * 140,
        segments: 8 + Math.floor(Math.random() * 8),
        width: 4 + Math.random() * 6,
        swayPhase: Math.random() * Math.PI * 2,
        swaySpeed: 0.2 + Math.random() * 0.3,
        color: seaweedColorPalette[colorIndex] ?? seaweedColorPalette[0] ?? 'rgba(34, 139, 34, 0.4)'
      })
    }
  }
  
  // Extra dense seaweed carpet at the very bottom (grows upward from bottom)
  // Seaweed Y position is their base, and they grow upward (negative Y direction)
  const footerHeight = 200
  const actualBottom = rect.height - footerHeight
  const floorZoneHeight = rect.height * 0.12
  
  // Create very dense seaweed across the ENTIRE bottom width
  // Position them at the actual bottom so they're fully visible
  for (let i = 0; i < 120; i++) {
    const x = Math.random() * rect.width
    const y = actualBottom - Math.random() * 30 // Base at bottom with slight variation
    const colorIndex = Math.floor(Math.random() * seaweedColorPalette.length)
    
    seaweeds.value.push({
      x,
      y,
      height: 60 + Math.random() * 140, // Grow upward from base
      segments: 6 + Math.floor(Math.random() * 10),
      width: 3 + Math.random() * 7,
      swayPhase: Math.random() * Math.PI * 2,
      swaySpeed: 0.15 + Math.random() * 0.35,
      color: seaweedColorPalette[colorIndex] ?? seaweedColorPalette[0] ?? 'rgba(34, 139, 34, 0.4)'
    })
  }
  
  // Add extra seaweed in middle section for full coverage
  const middleStart = rect.width * 0.25
  const middleEnd = rect.width * 0.75
  for (let i = 0; i < 50; i++) {
    const x = middleStart + Math.random() * (middleEnd - middleStart)
    const y = actualBottom - Math.random() * 40
    const colorIndex = Math.floor(Math.random() * seaweedColorPalette.length)
    
    seaweeds.value.push({
      x,
      y,
      height: 70 + Math.random() * 130,
      segments: 7 + Math.floor(Math.random() * 9),
      width: 4 + Math.random() * 6,
      swayPhase: Math.random() * Math.PI * 2,
      swaySpeed: 0.2 + Math.random() * 0.3,
      color: seaweedColorPalette[colorIndex] ?? seaweedColorPalette[0] ?? 'rgba(34, 139, 34, 0.4)'
    })
  }
  
  // Create fish swimming across (in viewport coordinates, these stay relative to view)
  fishes.value = []
  const viewportHeight = window.innerHeight
  for (let i = 0; i < 12; i++) {
    const depth = Math.random() // 0 = far, 1 = close
    const colorIndex = Math.floor(Math.random() * fishColorPalette.length)
    fishes.value.push({
      x: Math.random() * rect.width,
      y: 100 + Math.random() * (viewportHeight - 300),
      size: 15 + depth * 25, // Larger fish closer
      speed: 0.3 + depth * 0.5,
      direction: Math.random() > 0.5 ? 1 : -1,
      depth,
      swayPhase: Math.random() * Math.PI * 2,
      color: fishColorPalette[colorIndex] ?? fishColorPalette[0] ?? 'rgba(100, 150, 200, 0.3)'
    })
  }
  
  // Create light rays from top
  lightRays.value = []
  for (let i = 0; i < 6; i++) {
    lightRays.value.push({
      x: (i / 5) * rect.width,
      width: 80 + Math.random() * 120,
      opacity: 0.03 + Math.random() * 0.05,
      fadeSpeed: 0.5 + Math.random() * 0.5,
      fadePhase: Math.random() * Math.PI * 2
    })
  }
}

const drawSeaweed = (seaweed: Seaweed) => {
  if (!ctx.value) return
  
  ctx.value.save()
  ctx.value.translate(seaweed.x, seaweed.y)
  
  const segmentHeight = seaweed.height / seaweed.segments
  let currentX = 0
  
  ctx.value.strokeStyle = seaweed.color
  ctx.value.lineWidth = seaweed.width
  ctx.value.lineCap = 'round'
  ctx.value.lineJoin = 'round'
  
  ctx.value.beginPath()
  ctx.value.moveTo(0, 0)
  
  for (let i = 1; i <= seaweed.segments; i++) {
    const t = i / seaweed.segments
    const swayAmount = Math.sin(seaweed.swayPhase + t * Math.PI * 2) * seaweed.width * 3
    const y = -i * segmentHeight
    
    currentX = swayAmount * t * t // More sway at the top
    
    // Taper the width
    ctx.value.lineWidth = seaweed.width * (1 - t * 0.5)
    ctx.value.lineTo(currentX, y)
  }
  
  ctx.value.stroke()
  ctx.value.restore()
}

const drawFish = (fish: Fish) => {
  if (!ctx.value) return
  
  ctx.value.save()
  ctx.value.translate(fish.x, fish.y)
  
  // Flip fish based on direction
  if (fish.direction < 0) {
    ctx.value.scale(-1, 1)
  }
  
  // Simple fish silhouette
  const bodyLength = fish.size * 1.5
  const bodyHeight = fish.size * 0.8
  const tailSize = fish.size * 0.6
  
  // Slight vertical sway
  const sway = Math.sin(fish.swayPhase) * 2
  ctx.value.translate(0, sway)
  
  ctx.value.fillStyle = fish.color
  
  // Body (ellipse)
  ctx.value.beginPath()
  ctx.value.ellipse(0, 0, bodyLength / 2, bodyHeight / 2, 0, 0, Math.PI * 2)
  ctx.value.fill()
  
  // Tail (triangle)
  ctx.value.beginPath()
  ctx.value.moveTo(-bodyLength / 2, 0)
  ctx.value.lineTo(-bodyLength / 2 - tailSize, -tailSize / 2)
  ctx.value.lineTo(-bodyLength / 2 - tailSize, tailSize / 2)
  ctx.value.closePath()
  ctx.value.fill()
  
  // Dorsal fin
  ctx.value.beginPath()
  ctx.value.moveTo(0, -bodyHeight / 2)
  ctx.value.lineTo(bodyLength / 4, -bodyHeight / 2 - fish.size * 0.4)
  ctx.value.lineTo(bodyLength / 2, -bodyHeight / 2)
  ctx.value.closePath()
  ctx.value.fill()
  
  ctx.value.restore()
}

const drawLightRays = () => {
  if (!ctx.value || !oceanContainer.value) return
  
  const rect = oceanContainer.value.getBoundingClientRect()
  
  lightRays.value.forEach(ray => {
    const fadeOpacity = ray.opacity * (0.5 + Math.sin(ray.fadePhase) * 0.5)
    
    const gradient = ctx.value!.createLinearGradient(ray.x, 0, ray.x, rect.height)
    gradient.addColorStop(0, `rgba(255, 255, 255, ${fadeOpacity})`)
    gradient.addColorStop(0.5, `rgba(200, 230, 255, ${fadeOpacity * 0.5})`)
    gradient.addColorStop(1, 'rgba(200, 230, 255, 0)')
    
    ctx.value!.fillStyle = gradient
    ctx.value!.beginPath()
    ctx.value!.moveTo(ray.x - ray.width / 2, 0)
    ctx.value!.lineTo(ray.x + ray.width / 2, 0)
    ctx.value!.lineTo(ray.x + ray.width, rect.height)
    ctx.value!.lineTo(ray.x - ray.width, rect.height)
    ctx.value!.closePath()
    ctx.value!.fill()
  })
}

const updateAndDraw = () => {
  if (!ctx.value || !canvas.value || !oceanContainer.value) return
  
  time.value += 0.016
  
  const rect = oceanContainer.value.getBoundingClientRect()
  ctx.value.clearRect(0, 0, rect.width, rect.height)
  
  // Calculate viewport bounds in document coordinates
  const viewportTop = scrollY.value
  const viewportBottom = scrollY.value + window.innerHeight
  const buffer = 300
  
  // Draw light rays first (furthest back) - these stay in viewport
  drawLightRays()
  
  // Update light rays
  lightRays.value.forEach(ray => {
    ray.fadePhase += ray.fadeSpeed * 0.01
  })
  
  // Update and draw fish (these stay in viewport, moving relative to view)
  fishes.value.forEach(fish => {
    // Move fish
    fish.x += fish.speed * fish.direction
    fish.swayPhase += 0.05
    
    // Wrap around screen
    if (fish.direction > 0 && fish.x > rect.width + fish.size * 2) {
      fish.x = -fish.size * 2
    } else if (fish.direction < 0 && fish.x < -fish.size * 2) {
      fish.x = rect.width + fish.size * 2
    }
    
    drawFish(fish)
  })
  
  // Translate canvas for seaweed (document-positioned)
  ctx.value.save()
  ctx.value.translate(0, -scrollY.value)
  
  // Update and draw seaweed with culling
  seaweeds.value.forEach(seaweed => {
    // Check if seaweed is near viewport
    if (seaweed.y < viewportTop - buffer || seaweed.y > viewportBottom + buffer) {
      return
    }
    
    seaweed.swayPhase += seaweed.swaySpeed * 0.005
    drawSeaweed(seaweed)
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
.ocean-elements {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 0;
  pointer-events: none;
  overflow: hidden;
}

.ocean-canvas {
  width: 100%;
  height: 100%;
  display: block;
}
</style>
