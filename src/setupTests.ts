import '@testing-library/jest-dom/vitest'
import { cleanup, getDialogClientRect } from './test/app-test-utils'

// enable operations on a dialog element, for jsdom doesn't support yet
beforeAll(() => {
  HTMLDialogElement.prototype.show = vi.fn(function mock(
    this: HTMLDialogElement
  ) {
    this.open = true
  })
  HTMLDialogElement.prototype.showModal = vi.fn(function mock(
    this: HTMLDialogElement
  ) {
    this.open = true
  })
  HTMLDialogElement.prototype.close = vi.fn(function mock(
    this: HTMLDialogElement
  ) {
    this.open = false
  })
  HTMLDialogElement.prototype.getBoundingClientRect = vi.fn(() => ({
    toJSON: () => {},
    ...getDialogClientRect(),
  }))
})

// hooks are reset before each suite
afterEach(() => {
  cleanup() // unmounts React trees that were mounted with render
  vi.clearAllMocks() // otherwise, mock function calling times accumulate
})
