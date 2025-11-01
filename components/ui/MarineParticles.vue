<template>
  <div 
    ref="particlesContainer" 
    class="marine-particles"
  >
    <canvas ref="canvas" class="particles-canvas" />
  </div>
</template>

<script setup lang="ts">
interface Particle {
  x: number
  y: number
  size: number
  speed: number
  drift: number
  driftPhase: number
  opacity: number
  fadePhase: number
  fadeSpeed: number
}

const particlesContainer = ref<HTMLDivElement | null>(null)
const canvas = ref<HTMLCanvasElement | null>(null)
const ctx = ref<CanvasRenderingContext2D | null>(null)
const particles = ref<Particle[]>([])

const initCanvas = () => {
  if (!canvas.value || !particlesContainer.value) return
  
  const container = particlesContainer.value
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
  
  createParticles()
}

const createParticles = () => {
  if (!canvas.value || !particlesContainer.value) return
  
  particles.value = []
  const rect = particlesContainer.value.getBoundingClientRect()
  
  // Create marine snow particles
  const particleCount = Math.floor(rect.width * rect.height * 0.00008) // Less dense than bubbles
  
  for (let i = 0; i < particleCount; i++) {
    particles.value.push({
      x: Math.random() * rect.width,
      y: Math.random() * rect.height,
      size: 1 + Math.random() * 3,
      speed: 0.1 + Math.random() * 0.3,
      drift: (Math.random() - 0.5) * 0.5,
      driftPhase: Math.random() * Math.PI * 2,
      opacity: 0.2 + Math.random() * 0.4,
      fadePhase: Math.random() * Math.PI * 2,
      fadeSpeed: 0.3 + Math.random() * 0.5
    })
  }
}

const updateAndDraw = () => {
  if (!ctx.value || !canvas.value || !particlesContainer.value) return
  
  const rect = particlesContainer.value.getBoundingClientRect()
  ctx.value.clearRect(0, 0, rect.width, rect.height)
  
  // Detect dark mode for color
  const bgColor = getComputedStyle(document.documentElement)
    .getPropertyValue('--vp-c-bg').trim()
  const isDark = bgColor.includes('#1') || bgColor.includes('rgb(27')
  
  particles.value.forEach(particle => {
    // Update position - slow downward drift
    particle.y += particle.speed
    particle.driftPhase += 0.01
    particle.x += Math.sin(particle.driftPhase) * particle.drift
    
    // Update opacity - gentle pulsing
    particle.fadePhase += particle.fadeSpeed * 0.01
    const fadeOpacity = particle.opacity * (0.5 + Math.sin(particle.fadePhase) * 0.5)
    
    // Wrap around
    if (particle.y > rect.height) {
      particle.y = -10
      particle.x = Math.random() * rect.width
    }
    if (particle.x < 0) particle.x = rect.width
    if (particle.x > rect.width) particle.x = 0
    
    // Draw particle
    ctx.value!.fillStyle = isDark 
      ? `rgba(255, 255, 255, ${fadeOpacity})` 
      : `rgba(200, 200, 200, ${fadeOpacity})`
    
    ctx.value!.beginPath()
    ctx.value!.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
    ctx.value!.fill()
    
    // Add slight glow
    if (fadeOpacity > 0.3) {
      ctx.value!.fillStyle = isDark 
        ? `rgba(255, 255, 255, ${fadeOpacity * 0.2})` 
        : `rgba(200, 200, 200, ${fadeOpacity * 0.2})`
      ctx.value!.beginPath()
      ctx.value!.arc(particle.x, particle.y, particle.size * 1.5, 0, Math.PI * 2)
      ctx.value!.fill()
    }
  })
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
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
.marine-particles {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1;
  pointer-events: none;
  overflow: hidden;
}

.particles-canvas {
  width: 100%;
  height: 100%;
  display: block;
}
</style>
