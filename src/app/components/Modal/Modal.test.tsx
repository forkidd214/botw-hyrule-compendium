import userEvent from '@testing-library/user-event'
import { screen, render } from '@testing-library/react'
import Modal from './Modal'

describe('Modal', () => {
  // Arrange
  const OUTSIDE_DIALOG = {
    clientX: 0,
    clientY: 0,
  }
  const INSIDE_DIALOG = {
    clientX: 200,
    clientY: 100,
  }

  beforeAll(() => {
    HTMLDialogElement.prototype.show = vi.fn()
    HTMLDialogElement.prototype.showModal = vi.fn()
    HTMLDialogElement.prototype.close = vi.fn()
    HTMLDialogElement.prototype.getBoundingClientRect = vi.fn(() => ({
      toJSON: () => {},
      x: INSIDE_DIALOG.clientX - 100,
      y: INSIDE_DIALOG.clientY - 50,
      width: 200,
      height: 100,
      top: INSIDE_DIALOG.clientY - 50,
      left: INSIDE_DIALOG.clientX - 100,
      right: INSIDE_DIALOG.clientX + 100,
      bottom: INSIDE_DIALOG.clientY + 50,
    }))
  })

  const handleClose = vi.fn()
  beforeEach(() => {
    render(
      <Modal isOpen={false} onClose={handleClose}>
        <div>modal content</div>
      </Modal>
    )
  })

  it('renders its children', () => {
    const modalContent = screen.getByText(/modal content/i)
    expect(modalContent).toBeInTheDocument()
  })

  it('keeps open on inside click', async () => {
    // Arrange
    const user = userEvent.setup()
    // Act
    await user.pointer({ coords: INSIDE_DIALOG })
    await user.click(screen.getByRole('dialog', { hidden: true }))
    // Assert
    expect(handleClose).toBeCalledTimes(0)
  })

  it('closes on outside click', async () => {
    // Arrange
    const user = userEvent.setup()
    // Act
    await user.pointer({ coords: OUTSIDE_DIALOG })
    await user.click(screen.getByRole('dialog', { hidden: true }))
    // Assert
    expect(handleClose).toBeCalledTimes(1)
  })
})
