import { readFileSync, writeFileSync, readdirSync } from 'fs'
import { join } from 'path'

const apiBasePath = './content/docs/api'
const folders = ['classes', 'members', 'methods', 'types']

function removeFrontmatter(folderPath) {
  const files = readdirSync(folderPath)
  
  files.forEach((file) => {
    if (!file.endsWith('.md')) return
    
    const filePath = join(folderPath, file)
    const content = readFileSync(filePath, 'utf-8')
    
    // Skip if no frontmatter
    if (!content.startsWith('---')) {
      console.log(`⏭ Skipping ${file} (no frontmatter)`)
      return
    }
    
    // Remove frontmatter (everything between first --- and second ---)
    const parts = content.split('---')
    if (parts.length >= 3) {
      const newContent = parts.slice(2).join('---').trim() + '\n'
      writeFileSync(filePath, newContent, 'utf-8')
      console.log(`✓ Removed frontmatter from ${file}`)
    }
  })
}

// Process each folder
folders.forEach((folder) => {
  const folderPath = join(apiBasePath, folder)
  console.log(`\nProcessing ${folder}...`)
  removeFrontmatter(folderPath)
})

console.log('\n✅ Done!')
