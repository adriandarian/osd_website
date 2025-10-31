<template>
  <div 
    ref="dotsContainer" 
    class="interactive-dots"
  >
    <canvas ref="canvas" class="dots-canvas" />
  </div>
</template>

<script setup lang="ts">
const dotsContainer = ref<HTMLDivElement | null>(null)
const canvas = ref<HTMLCanvasElement | null>(null)
const ctx = ref<CanvasRenderingContext2D | null>(null)
const dots = ref<Array<{
  x: number
  y: number
  baseX: number
  baseY: number
  targetX: number
  targetY: number
  radius: number
  baseRadius: number
  targetRadius: number
  opacity: number
  targetOpacity: number
  floatOffsetX: number
  floatOffsetY: number
  floatSpeed: number
  wobblePhase: number
  wobbleSpeed: number
}>>([])

const mouseX = ref(0)
const mouseY = ref(0)
const time = ref(0)
const MIN_BUBBLE_SIZE = 3
const MAX_BUBBLE_SIZE = 15
const BUBBLE_DENSITY = 0.0003 // Bubbles per pixel
const INTERACTION_RADIUS = 200
const MAX_DISPLACEMENT = 80
const LERP_FACTOR = 0.08

const initCanvas = () => {
  if (!canvas.value || !dotsContainer.value) return
  
  const container = dotsContainer.value
  const dpr = window.devicePixelRatio || 1
  
  // Set display size (css pixels)
  const rect = container.getBoundingClientRect()
  canvas.value.style.width = `${rect.width}px`
  canvas.value.style.height = `${rect.height}px`
  
  // Set actual size in memory (scaled to account for extra pixel density)
  canvas.value.width = rect.width * dpr
  canvas.value.height = rect.height * dpr
  
  ctx.value = canvas.value.getContext('2d')
  
  if (ctx.value) {
    // Scale all drawing operations by the dpr
    ctx.value.scale(dpr, dpr)
  }
  
  createDots()
}

const createDots = () => {
  if (!canvas.value || !dotsContainer.value) return
  
  dots.value = []
  const rect = dotsContainer.value.getBoundingClientRect()
  const bubbleCount = Math.floor(rect.width * rect.height * BUBBLE_DENSITY)
  
  // Create randomly distributed bubbles like in ocean water
  for (let i = 0; i < bubbleCount; i++) {
    const baseX = Math.random() * rect.width
    const baseY = Math.random() * rect.height
    const baseRadius = MIN_BUBBLE_SIZE + Math.random() * (MAX_BUBBLE_SIZE - MIN_BUBBLE_SIZE)
    
    dots.value.push({
      x: baseX,
      y: baseY,
      baseX,
      baseY,
      targetX: baseX,
      targetY: baseY,
      radius: baseRadius,
      baseRadius,
      targetRadius: baseRadius,
      opacity: 0.3 + Math.random() * 0.4,
      targetOpacity: 0.3 + Math.random() * 0.4,
      floatOffsetX: 0,
      floatOffsetY: 0,
      floatSpeed: 0.3 + Math.random() * 0.5,
      wobblePhase: Math.random() * Math.PI * 2,
      wobbleSpeed: 0.5 + Math.random() * 1.5
    })
  }
}

const lerp = (start: number, end: number, factor: number) => {
  return start + (end - start) * factor
}

const updateDots = () => {
  time.value += 0.016 // Approximately 60fps
  
  dots.value.forEach(dot => {
    // Floating motion - bubbles drift slowly
    dot.wobblePhase += dot.wobbleSpeed * 0.02
    dot.floatOffsetX = Math.sin(dot.wobblePhase) * 15
    dot.floatOffsetY = Math.cos(dot.wobblePhase * 0.7) * 10
    
    // Calculate base position with floating
    const floatingBaseX = dot.baseX + dot.floatOffsetX
    const floatingBaseY = dot.baseY + dot.floatOffsetY
    
    // Mouse interaction - bubbles pushed away like water displacement
    const dx = mouseX.value - floatingBaseX
    const dy = mouseY.value - floatingBaseY
    const distance = Math.sqrt(dx * dx + dy * dy)
    
    if (distance < INTERACTION_RADIUS) {
      // Stronger force for closer bubbles (like water being pushed)
      const force = Math.pow((INTERACTION_RADIUS - distance) / INTERACTION_RADIUS, 1.5)
      const angle = Math.atan2(dy, dx)
      
      // Larger bubbles are pushed less (more buoyant/stable)
      const massEffect = 1 - (dot.baseRadius / MAX_BUBBLE_SIZE) * 0.3
      
      dot.targetX = floatingBaseX + Math.cos(angle) * force * MAX_DISPLACEMENT * massEffect
      dot.targetY = floatingBaseY + Math.sin(angle) * force * MAX_DISPLACEMENT * massEffect
      
      // Bubbles expand slightly when disturbed
      dot.targetRadius = dot.baseRadius * (1 + force * 0.4)
      dot.targetOpacity = 0.5 + force * 0.5
    } else {
      // Return to floating position
      dot.targetX = floatingBaseX
      dot.targetY = floatingBaseY
      dot.targetRadius = dot.baseRadius
      dot.targetOpacity = dot.opacity < 0.4 ? 0.4 : dot.opacity * 0.95
    }
    
    // Smooth interpolation with underwater feel (slower, more fluid)
    dot.x = lerp(dot.x, dot.targetX, LERP_FACTOR)
    dot.y = lerp(dot.y, dot.targetY, LERP_FACTOR)
    dot.radius = lerp(dot.radius, dot.targetRadius, LERP_FACTOR * 1.5)
    dot.opacity = lerp(dot.opacity, dot.targetOpacity, LERP_FACTOR * 0.8)
  })
}

// Cache gradients to avoid recreating them every frame
const gradientCache = new Map()

const drawDots = () => {
  if (!ctx.value || !canvas.value || !dotsContainer.value) return
  
  const rect = dotsContainer.value.getBoundingClientRect()
  ctx.value.clearRect(0, 0, rect.width, rect.height)
  
  // Get computed colors - cache these
  const brandColor = getComputedStyle(document.documentElement)
    .getPropertyValue('--vp-c-brand-1').trim()
  const bgColor = getComputedStyle(document.documentElement)
    .getPropertyValue('--vp-c-bg').trim()
  
  // Detect if dark mode by checking background color luminance
  const isDark = bgColor.includes('#1') || bgColor.includes('rgb(27')
  
  // Sort bubbles by size (smaller in back, larger in front for depth)
  const sortedDots = [...dots.value].sort((a, b) => a.radius - b.radius)
  
  // Set blend mode once for all bubbles (major perf gain)
  ctx.value.globalCompositeOperation = 'screen'
  
  sortedDots.forEach(dot => {
    const cacheKey = `${dot.radius}-${isDark ? 'dark' : 'light'}`
    
    // Use cached gradient or create new one
    let mainGradient = gradientCache.get(`main-${cacheKey}`)
    if (!mainGradient || Math.random() < 0.01) { // Refresh occasionally
      mainGradient = ctx.value!.createRadialGradient(
        -dot.radius * 0.3, -dot.radius * 0.3, 0,
        0, 0, dot.radius * 1.2
      )
      
      if (isDark) {
        mainGradient.addColorStop(0, 'rgba(180, 200, 255, 0.3)')
        mainGradient.addColorStop(0.3, `${brandColor}50`)
        mainGradient.addColorStop(0.7, `${brandColor}65`)
        mainGradient.addColorStop(1, `${brandColor}40`)
      } else {
        mainGradient.addColorStop(0, 'rgba(220, 230, 255, 0.5)')
        mainGradient.addColorStop(0.3, `${brandColor}60`)
        mainGradient.addColorStop(0.7, `${brandColor}75`)
        mainGradient.addColorStop(1, `${brandColor}50`)
      }
      gradientCache.set(`main-${cacheKey}`, mainGradient)
    }
    
    // Draw main bubble with translate (faster than recalculating gradient positions)
    ctx.value!.save()
    ctx.value!.translate(dot.x, dot.y)
    ctx.value!.globalAlpha = dot.opacity * 0.4
    ctx.value!.beginPath()
    ctx.value!.arc(0, 0, dot.radius, 0, Math.PI * 2)
    ctx.value!.fillStyle = mainGradient
    ctx.value!.fill()
    
    // Combined rim + inner glow in one pass (perf optimization)
    ctx.value!.globalCompositeOperation = 'hard-light'
    ctx.value!.globalAlpha = dot.opacity * 0.7
    ctx.value!.strokeStyle = isDark ? `${brandColor}cc` : `${brandColor}dd`
    ctx.value!.lineWidth = Math.max(1, dot.radius * 0.12)
    ctx.value!.stroke()
    ctx.value!.globalCompositeOperation = 'screen'
    
    // Single highlight (merged top + secondary for performance)
    let highlightGradient = gradientCache.get(`highlight-${cacheKey}`)
    if (!highlightGradient || Math.random() < 0.01) {
      highlightGradient = ctx.value!.createRadialGradient(
        -dot.radius * 0.4, -dot.radius * 0.4, 0,
        -dot.radius * 0.4, -dot.radius * 0.4, dot.radius * 0.6
      )
      
      if (isDark) {
        highlightGradient.addColorStop(0, 'rgba(255, 255, 255, 1)')
        highlightGradient.addColorStop(0.2, 'rgba(200, 230, 255, 0.8)')
        highlightGradient.addColorStop(0.5, 'rgba(180, 210, 255, 0.4)')
        highlightGradient.addColorStop(1, 'rgba(255, 255, 255, 0)')
      } else {
        highlightGradient.addColorStop(0, 'rgba(255, 255, 255, 1)')
        highlightGradient.addColorStop(0.2, 'rgba(255, 255, 255, 0.9)')
        highlightGradient.addColorStop(0.5, 'rgba(240, 245, 255, 0.6)')
        highlightGradient.addColorStop(1, 'rgba(255, 255, 255, 0)')
      }
      gradientCache.set(`highlight-${cacheKey}`, highlightGradient)
    }
    
    ctx.value!.globalCompositeOperation = 'hard-light'
    ctx.value!.globalAlpha = dot.opacity * 0.85
    ctx.value!.beginPath()
    ctx.value!.arc(-dot.radius * 0.38, -dot.radius * 0.38, dot.radius * 0.45, 0, Math.PI * 2)
    ctx.value!.fillStyle = highlightGradient
    ctx.value!.fill()
    
    ctx.value!.restore()
  })
  
  ctx.value!.globalAlpha = 1
  ctx.value!.globalCompositeOperation = 'source-over'
}

const handleMouseMove = (event: MouseEvent) => {
  mouseX.value = event.clientX
  mouseY.value = event.clientY
}

const handleMouseLeave = () => {
  mouseX.value = -1000
  mouseY.value = -1000
}

const animateFrame = () => {
  updateDots()
  drawDots()
  requestAnimationFrame(animateFrame)
}

const handleResize = () => {
  initCanvas()
}

onMounted(() => {
  initCanvas()
  animateFrame()
  window.addEventListener('mousemove', handleMouseMove)
  window.addEventListener('mouseleave', handleMouseLeave)
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMove)
  window.removeEventListener('mouseleave', handleMouseLeave)
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
.interactive-dots {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  pointer-events: none;
}

.dots-canvas {
  width: 100%;
  height: 100%;
  display: block;
}
</style>
