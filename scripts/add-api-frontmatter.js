import { readFileSync, writeFileSync, readdirSync } from 'fs'
import { join } from 'path'

const apiBasePath = './content/docs/api'

const categories = {
  classes: { title: 'API Classes', order: 10, badge: 'Class' },
  members: { title: 'API Members', order: 20, badge: 'Member' },
  methods: { title: 'API Methods', order: 30, badge: 'Method' },
  types: { title: 'API Types', order: 40, badge: 'Type' },
}

function addFrontmatter(folderPath, categoryInfo) {
  const files = readdirSync(folderPath)
  
  files.forEach((file, index) => {
    if (!file.endsWith('.md')) return
    
    const filePath = join(folderPath, file)
    const content = readFileSync(filePath, 'utf-8')
    
    // Skip if already has frontmatter
    if (content.startsWith('---')) {
      console.log(`⏭ Skipping ${file} (already has frontmatter)`)
      return
    }
    
    // Extract title from first heading
    const titleMatch = content.match(/^#\s+(.+)$/m)
    const title = titleMatch ? titleMatch[1] : file.replace('.md', '')
    
    // Create frontmatter
    const frontmatter = `---
title: ${title}
description: OpenSeadragon ${categoryInfo.badge} - ${title}
category: ${categoryInfo.title}
order: ${categoryInfo.order + index}
badge: ${categoryInfo.badge}
---

`
    
    // Add frontmatter to content
    const newContent = frontmatter + content
    writeFileSync(filePath, newContent, 'utf-8')
    console.log(`✓ Added frontmatter to ${file}`)
  })
}

// Process each category
Object.entries(categories).forEach(([folder, info]) => {
  const folderPath = join(apiBasePath, folder)
  console.log(`\nProcessing ${folder}...`)
  addFrontmatter(folderPath, info)
})

console.log('\n✅ Done!')
