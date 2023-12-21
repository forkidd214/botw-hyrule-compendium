import userEvent from '@testing-library/user-event'
import { screen, within, render, act, cleanup } from '@testing-library/react'
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

  afterEach(() => {
    vi.clearAllMocks() // otherwise, mock function calling times accumulate
  })

  const renderModal = ({
    isOpen = false,
    handleClose = vi.fn(),
  }: {
    isOpen?: boolean
    handleClose?: () => void
  } = {}) => {
    return {
      ...render(
        <Modal isOpen={isOpen} onClose={handleClose}>
          <div>modal content</div>
        </Modal>
      ),
      handleClose,
      modal: screen.getByRole('dialog', { hidden: true }) as HTMLDialogElement,
      modalContent: within(
        screen.getByRole('dialog', { hidden: true })
      ).getByText(/modal content/i),
    }
  }

  it('hides its children when closed', () => {
    const { modal, modalContent } = renderModal()
    expect(modalContent).toBeInTheDocument()
    expect(modal.showModal).toBeCalledTimes(0)
    expect(modal.close).toBeCalledTimes(1)
  })

  it('shows its children when opend', () => {
    const { modal, modalContent } = renderModal({ isOpen: true })
    expect(modalContent).toBeInTheDocument()
    expect(modal.showModal).toBeCalledTimes(1)
    expect(modal.close).toBeCalledTimes(0)
  })

  it('calls onClose callback only on outside click', async () => {
    // Arrange
    const user = userEvent.setup()
    const { modal, handleClose } = renderModal({ isOpen: true })
    // Act
    await user.pointer({ coords: INSIDE_DIALOG })
    await user.click(modal)
    // Assert
    expect(handleClose).toBeCalledTimes(0)
    // Act
    await user.pointer({ coords: OUTSIDE_DIALOG })
    await user.click(modal)
    // Assert
    expect(modal.showModal).toBeCalledTimes(1)
  })
})
