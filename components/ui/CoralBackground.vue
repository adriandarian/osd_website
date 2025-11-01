<template>
  <div 
    ref="coralContainer" 
    class="coral-background"
  >
    <canvas ref="canvas" class="coral-canvas" />
  </div>
</template>

<script setup lang="ts">
interface CoralBranch {
  x: number
  y: number
  angle: number
  length: number
  thickness: number
  segments: number
  color: string
  sway: number
  swaySpeed: number
  swayPhase: number
  type: 'branch' | 'fan' | 'tube' | 'plate'
  // Pre-calculated random values to prevent re-randomization
  branchData?: {
    sideBranches: Array<{ segment: number; angle: number; length: number; shouldDraw: boolean }>
  }
  tubeData?: {
    tubeCount: number
    tubeHeights: number[]
  }
  plateData?: {
    plateCount: number
  }
}

const coralContainer = ref<HTMLDivElement | null>(null)
const canvas = ref<HTMLCanvasElement | null>(null)
const ctx = ref<CanvasRenderingContext2D | null>(null)
const corals = ref<CoralBranch[]>([])
const time = ref(0)
const scrollY = ref(0)
const pageHeight = ref(0)

// Coral color palettes (ocean-themed)
const coralColors = {
  dark: [
    'rgba(255, 127, 80, 0.4)',   // Coral orange
    'rgba(255, 99, 132, 0.35)',  // Pink coral
    'rgba(138, 43, 226, 0.3)',   // Purple coral
    'rgba(64, 224, 208, 0.35)',  // Turquoise
    'rgba(255, 182, 193, 0.3)',  // Light pink
    'rgba(186, 85, 211, 0.35)',  // Medium orchid
  ],
  light: [
    'rgba(255, 127, 80, 0.3)',   // Coral orange
    'rgba(255, 99, 132, 0.25)',  // Pink coral
    'rgba(138, 43, 226, 0.2)',   // Purple coral
    'rgba(64, 224, 208, 0.25)',  // Turquoise
    'rgba(255, 182, 193, 0.25)', // Light pink
    'rgba(186, 85, 211, 0.25)',  // Medium orchid
  ]
}

const initCanvas = () => {
  if (!canvas.value || !coralContainer.value) return
  
  const container = coralContainer.value
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
  
  createCorals()
}

const createCorals = () => {
  if (!canvas.value || !coralContainer.value) return
  
  corals.value = []
  
  // Get full document height for coral placement
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
  const colors = isDark ? coralColors.dark : coralColors.light
  
  // Get document height for positioning coral throughout the page
  pageHeight.value = Math.max(
    document.body.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.clientHeight,
    document.documentElement.scrollHeight,
    document.documentElement.offsetHeight
  )
  
  // Create coral formations distributed throughout the entire page height
  const positions = []
  
  // Calculate sections based on full page height
  const sectionHeight = rect.height / 20 // Divide page into 20 sections
  
  // Generate coral throughout the entire page with increasing density toward bottom
  for (let section = 0; section < 20; section++) {
    const yBase = section * sectionHeight
    const progressDown = section / 20 // 0 to 1, representing top to bottom
    
    // Increase density as we go down
    const density = Math.floor(1 + progressDown * 4) // 1 coral at top, 5 at bottom
    const spreadSize = 100 + progressDown * 150 // Wider spread at bottom
    const sizeMultiplier = 0.5 + progressDown * 0.8 // Smaller at top, larger at bottom
    
    // Left edge coral
    for (let i = 0; i < density; i++) {
      positions.push({
        x: 0,
        y: yBase + Math.random() * sectionHeight,
        count: 1,
        spread: spreadSize,
        sizeMultiplier: sizeMultiplier + Math.random() * 0.2
      })
    }
    
    // Right edge coral
    for (let i = 0; i < density; i++) {
      positions.push({
        x: rect.width,
        y: yBase + Math.random() * sectionHeight,
        count: 1,
        spread: spreadSize,
        sizeMultiplier: sizeMultiplier + Math.random() * 0.2
      })
    }
    
    // Add center coral in lower sections
    if (progressDown > 0.5) {
      const centerDensity = Math.floor((progressDown - 0.5) * 6)
      for (let i = 0; i < centerDensity; i++) {
        positions.push({
          x: rect.width * (0.2 + Math.random() * 0.6),
          y: yBase + Math.random() * sectionHeight,
          count: 1,
          spread: 100,
          sizeMultiplier: sizeMultiplier + Math.random() * 0.3
        })
      }
    }
  }
  
  // Extra dense coral floor at the very bottom (grows upward from bottom)
  // Position at actual bottom, coral will grow upward
  const footerHeight = 200
  const actualBottom = rect.height - footerHeight
  const floorZoneHeight = rect.height * 0.15 // Zone for floor coral
  const floorStart = actualBottom - floorZoneHeight
  
  // Create a very dense carpet of coral across the ENTIRE bottom width
  const floorSections = 80 // Even more sections for full coverage
  for (let i = 0; i < floorSections; i++) {
    const baseX = (i / floorSections) * rect.width
    
    // Multiple coral at each position - create layers
    // Position them near the bottom so they grow upward
    for (let j = 0; j < 4; j++) {
      positions.push({
        x: baseX + (Math.random() - 0.5) * 60,
        y: actualBottom - Math.random() * 50, // Position at bottom, slight variation
        count: 1,
        spread: 35,
        sizeMultiplier: 0.7 + Math.random() * 0.9
      })
    }
  }
  
  // Add extra dense random fill across the full width
  for (let i = 0; i < 100; i++) {
    positions.push({
      x: Math.random() * rect.width,
      y: floorStart + Math.random() * floorZoneHeight,
      count: 1,
      spread: 50,
      sizeMultiplier: 0.5 + Math.random() * 0.7
    })
  }
  
  // Add extra clusters in the middle third for even more density
  const middleStart = rect.width * 0.33
  const middleEnd = rect.width * 0.67
  for (let i = 0; i < 60; i++) {
    positions.push({
      x: middleStart + Math.random() * (middleEnd - middleStart),
      y: floorStart + Math.random() * floorZoneHeight,
      count: 1,
      spread: 40,
      sizeMultiplier: 0.6 + Math.random() * 0.8
    })
  }
  
  positions.forEach(pos => {
    for (let i = 0; i < pos.count; i++) {
      const offsetX = (Math.random() - 0.5) * pos.spread
      const offsetY = (Math.random() - 0.5) * pos.spread * 0.5
      
      // Adjust position
      let baseX = pos.x + offsetX
      let baseY = pos.y + offsetY
      
      // Clamp to screen bounds
      baseX = Math.max(0, Math.min(rect.width, baseX))
      
      const coralType = ['branch', 'fan', 'tube', 'plate'][Math.floor(Math.random() * 4)] as CoralBranch['type']
      const colorIndex = Math.floor(Math.random() * colors.length)
      const segments = 5 + Math.floor(Math.random() * 10)
      const sizeMultiplier = pos.sizeMultiplier ?? 1.0
      
      // Pre-calculate random values for this coral
      const branchData = coralType === 'branch' ? {
        sideBranches: Array.from({ length: segments }, (_, i) => ({
          segment: i,
          angle: Math.random() > 0.5 ? 0.5 : -0.5,
          length: 1.5 + Math.random(),
          shouldDraw: i > 2 && Math.random() > 0.6
        })).filter(b => b.shouldDraw)
      } : undefined
      
      const tubeData = coralType === 'tube' ? {
        tubeCount: 3 + Math.floor(Math.random() * 4),
        tubeHeights: Array.from({ length: 7 }, () => 0.8 + Math.random() * 0.4)
      } : undefined
      
      const plateData = coralType === 'plate' ? {
        plateCount: 3 + Math.floor(Math.random() * 3)
      } : undefined
      
      // Determine growth direction based on position
      let growthAngle = -Math.PI / 2 // Default: grow upward
      if (baseY < rect.height * 0.2) {
        growthAngle = Math.PI / 2 // Top area: grow downward
      } else if (baseY > rect.height * 0.9) {
        growthAngle = -Math.PI / 2 // Bottom: grow upward
      } else {
        // Middle: mostly upward with some variation
        growthAngle = -Math.PI / 2 + (Math.random() - 0.5) * 0.4
      }
      
      corals.value.push({
        x: baseX,
        y: baseY,
        angle: growthAngle,
        length: (50 + Math.random() * 100) * sizeMultiplier,
        thickness: (3 + Math.random() * 8) * sizeMultiplier,
        segments,
        color: colors[colorIndex] ?? colors[0] ?? 'rgba(255, 127, 80, 0.4)',
        sway: 0,
        swaySpeed: 0.3 + Math.random() * 0.5,
        swayPhase: Math.random() * Math.PI * 2,
        type: coralType,
        branchData,
        tubeData,
        plateData
      })
    }
  })
}

const drawBranchCoral = (coral: CoralBranch, swayOffset: number) => {
  if (!ctx.value) return
  
  ctx.value.save()
  ctx.value.translate(coral.x, coral.y)
  
  // Draw main branch with organic curves
  const segmentLength = coral.length / coral.segments
  let currentAngle = coral.angle
  
  for (let i = 0; i < coral.segments; i++) {
    const t = i / coral.segments
    const thickness = coral.thickness * (1 - t * 0.7) // Taper
    
    // Add sway effect - very subtle
    const angleVariation = Math.sin(swayOffset + t * Math.PI) * 0.05
    currentAngle += angleVariation
    
    // Draw segment
    ctx.value.strokeStyle = coral.color
    ctx.value.lineWidth = thickness
    ctx.value.lineCap = 'round'
    ctx.value.beginPath()
    ctx.value.moveTo(0, 0)
    ctx.value.lineTo(
      Math.cos(currentAngle) * segmentLength,
      Math.sin(currentAngle) * segmentLength
    )
    ctx.value.stroke()
    
    // Move to end of segment
    ctx.value.translate(
      Math.cos(currentAngle) * segmentLength,
      Math.sin(currentAngle) * segmentLength
    )
    
    // Add side branches using pre-calculated data
    const sideBranch = coral.branchData?.sideBranches.find(b => b.segment === i)
    if (sideBranch) {
      ctx.value.save()
      const branchAngle = currentAngle + sideBranch.angle
      const branchLength = segmentLength * sideBranch.length
      
      ctx.value.strokeStyle = coral.color
      ctx.value.lineWidth = thickness * 0.6
      ctx.value.beginPath()
      ctx.value.moveTo(0, 0)
      ctx.value.lineTo(
        Math.cos(branchAngle) * branchLength,
        Math.sin(branchAngle) * branchLength
      )
      ctx.value.stroke()
      ctx.value.restore()
    }
  }
  
  ctx.value.restore()
}

const drawFanCoral = (coral: CoralBranch, swayOffset: number) => {
  if (!ctx.value) return
  
  ctx.value.save()
  ctx.value.translate(coral.x, coral.y)
  ctx.value.rotate(coral.angle + Math.sin(swayOffset) * 0.03)
  
  // Draw fan shape with organic curves
  const fanWidth = coral.length * 1.2
  const fanHeight = coral.length
  
  ctx.value.fillStyle = coral.color
  ctx.value.beginPath()
  ctx.value.moveTo(0, 0)
  
  // Create wavy fan edge
  for (let i = 0; i <= 20; i++) {
    const t = i / 20
    const x = (t - 0.5) * fanWidth
    const y = -fanHeight * Math.sqrt(1 - Math.pow(t * 2 - 1, 2)) // Circular arc
    const wave = Math.sin(t * Math.PI * 4 + swayOffset) * 5
    
    ctx.value.lineTo(x, y + wave)
  }
  
  ctx.value.closePath()
  ctx.value.fill()
  
  // Add texture lines
  ctx.value.strokeStyle = coral.color.replace(/[\d.]+\)$/, '0.6)')
  ctx.value.lineWidth = 1
  for (let i = 0; i < 10; i++) {
    const t = i / 10
    const x = (t - 0.5) * fanWidth
    ctx.value.beginPath()
    ctx.value.moveTo(x, 0)
    ctx.value.lineTo(x, -fanHeight * 0.9)
    ctx.value.stroke()
  }
  
  ctx.value.restore()
}

const drawTubeCoral = (coral: CoralBranch, swayOffset: number) => {
  if (!ctx.value || !coral.tubeData) return
  
  ctx.value.save()
  ctx.value.translate(coral.x, coral.y)
  
  // Draw multiple tubes in a cluster using pre-calculated data
  const tubes = coral.tubeData.tubeCount
  
  for (let i = 0; i < tubes; i++) {
    const offsetX = (i - tubes / 2) * coral.thickness * 1.5
    const heightMultiplier = coral.tubeData.tubeHeights[i % coral.tubeData.tubeHeights.length] ?? 0.8
    const tubeHeight = coral.length * heightMultiplier
    const sway = Math.sin(swayOffset + i) * 1
    
    ctx.value.fillStyle = coral.color
    ctx.value.beginPath()
    ctx.value.ellipse(
      offsetX + sway,
      -tubeHeight / 2,
      coral.thickness / 2,
      tubeHeight / 2,
      0,
      0,
      Math.PI * 2
    )
    ctx.value.fill()
    
    // Add rim at top
    ctx.value.strokeStyle = coral.color.replace(/[\d.]+\)$/, '0.8)')
    ctx.value.lineWidth = 2
    ctx.value.beginPath()
    ctx.value.ellipse(
      offsetX + sway,
      -tubeHeight,
      coral.thickness / 2,
      coral.thickness / 4,
      0,
      0,
      Math.PI * 2
    )
    ctx.value.stroke()
  }
  
  ctx.value.restore()
}

const drawPlateCoral = (coral: CoralBranch, swayOffset: number) => {
  if (!ctx.value || !coral.plateData) return
  
  ctx.value.save()
  ctx.value.translate(coral.x, coral.y)
  ctx.value.rotate(Math.sin(swayOffset) * 0.02)
  
  // Draw layered plates using pre-calculated data
  const plates = coral.plateData.plateCount
  
  for (let i = 0; i < plates; i++) {
    const plateY = -i * coral.thickness * 3
    const plateWidth = coral.length * (1 - i * 0.15)
    const plateHeight = coral.thickness * 2
    
    ctx.value.fillStyle = coral.color
    ctx.value.beginPath()
    ctx.value.ellipse(0, plateY, plateWidth / 2, plateHeight, 0, 0, Math.PI * 2)
    ctx.value.fill()
    
    // Add wavy edge
    ctx.value.strokeStyle = coral.color.replace(/[\d.]+\)$/, '0.7)')
    ctx.value.lineWidth = 1.5
    ctx.value.beginPath()
    for (let j = 0; j <= 20; j++) {
      const t = j / 20
      const angle = t * Math.PI * 2
      const radius = (plateWidth / 2) + Math.sin(t * Math.PI * 6 + swayOffset) * 3
      const x = Math.cos(angle) * radius
      const y = plateY + Math.sin(angle) * plateHeight
      
      if (j === 0) {
        ctx.value.moveTo(x, y)
      } else {
        ctx.value.lineTo(x, y)
      }
    }
    ctx.value.closePath()
    ctx.value.stroke()
  }
  
  ctx.value.restore()
}

const updateAndDraw = () => {
  if (!ctx.value || !canvas.value || !coralContainer.value) return
  
  time.value += 0.016
  
  const rect = coralContainer.value.getBoundingClientRect()
  ctx.value.clearRect(0, 0, rect.width, rect.height)
  
  // Calculate viewport position in document coordinates
  const viewportTop = scrollY.value
  const viewportBottom = scrollY.value + window.innerHeight
  const buffer = 300
  
  // Translate the entire canvas context by scroll offset
  ctx.value.save()
  ctx.value.translate(0, -scrollY.value)
  
  // Update and draw each coral
  corals.value.forEach(coral => {
    // Check if coral is in or near viewport (in document coordinates)
    if (coral.y < viewportTop - buffer || coral.y > viewportBottom + buffer) {
      return
    }
    
    coral.swayPhase += coral.swaySpeed * 0.003
    const swayOffset = coral.swayPhase
    
    // Draw based on type (positions are in document coordinates)
    switch (coral.type) {
      case 'branch':
        drawBranchCoral(coral, swayOffset)
        break
      case 'fan':
        drawFanCoral(coral, swayOffset)
        break
      case 'tube':
        drawTubeCoral(coral, swayOffset)
        break
      case 'plate':
        drawPlateCoral(coral, swayOffset)
        break
    }
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
  handleScroll() // Initial scroll position
  window.addEventListener('resize', handleResize)
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.coral-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 0;
  pointer-events: none;
  overflow: hidden;
}

.coral-canvas {
  display: block;
  width: 100%;
  height: 100%;
}
</style>
