import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'

// hooks are reset before each suite
afterEach(() => {
  cleanup() // unmounts React trees that were mounted with render
})