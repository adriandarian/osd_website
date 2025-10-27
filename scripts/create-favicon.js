import sharp from 'sharp'
import { existsSync } from 'fs'

const sizes = [16, 32, 48, 64]

async function generateFavicons() {
  console.log('Generating favicons from logo.png...')
  
  if (!existsSync('public/logo.png')) {
    console.error('Error: public/logo.png not found!')
    process.exit(1)
  }

  // Generate different sizes
  for (const size of sizes) {
    await sharp('public/logo.png')
      .resize(size, size, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      })
      .png()
      .toFile(`public/favicon-${size}x${size}.png`)
    console.log(`✓ Generated favicon-${size}x${size}.png`)
  }

  // Create main favicon.png (32x32)
  await sharp('public/logo.png')
    .resize(32, 32, {
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    })
    .png()
    .toFile('public/favicon.png')
  console.log('✓ Generated favicon.png (32x32)')

  // Create apple-touch-icon
  await sharp('public/logo.png')
    .resize(180, 180, {
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    })
    .png()
    .toFile('public/apple-touch-icon.png')
  console.log('✓ Generated apple-touch-icon.png (180x180)')

  console.log('\n✨ All favicons generated successfully!')
}

generateFavicons().catch(console.error)
