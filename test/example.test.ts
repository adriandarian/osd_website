import { describe, it, expect } from 'vitest'

describe('Basic Test Suite', () => {
  it('should pass a basic test', () => {
    expect(true).toBe(true)
  })

  it('should perform basic arithmetic', () => {
    expect(1 + 1).toBe(2)
  })

  it('should handle strings', () => {
    const greeting = 'Hello, OpenSeadragon!'
    expect(greeting).toContain('OpenSeadragon')
  })
})
