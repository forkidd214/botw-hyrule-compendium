import {
  screen,
  within,
  render,
  userEvent,
  getDialogPointerCoords,
} from '@/test/app-test-utils'
import Modal from './Modal'

describe('Modal', () => {
  // Arrange
  const renderModal = async ({
    isOpen = false,
    handleClose = vi.fn(),
  }: {
    isOpen?: boolean
    handleClose?: () => void
  } = {}) => {
    const renderResult = await render(
      <Modal isOpen={isOpen} onClose={handleClose}>
        <div>modal content</div>
      </Modal>
    )

    return {
      ...renderResult,
      handleClose,
      modal: screen.getByRole('dialog', { hidden: true }) as HTMLDialogElement,
      modalContent: within(
        screen.getByRole('dialog', { hidden: true })
      ).getByText(/modal content/i),
    }
  }

  it('hides its children when closed', async () => {
    const { modal, modalContent } = await renderModal()
    expect(modalContent).toBeInTheDocument()
    expect(modal.showModal).toBeCalledTimes(0)
    expect(modal.close).toBeCalledTimes(1)
  })

  it('shows its children when opend', async () => {
    const { modal, modalContent } = await renderModal({ isOpen: true })
    expect(modalContent).toBeInTheDocument()
    expect(modal.showModal).toBeCalledTimes(1)
    expect(modal.close).toBeCalledTimes(0)
  })

  it('calls onClose callback only on outside click', async () => {
    // Arrange
    const user = userEvent.setup()
    const { modal, handleClose } = await renderModal({ isOpen: true })
    // Act
    await user.pointer({ coords: getDialogPointerCoords({ isWithin: true }) })
    await user.click(modal)
    // Assert
    expect(handleClose).toBeCalledTimes(0)
    // Act
    await user.pointer({ coords: getDialogPointerCoords({ isWithin: false }) })
    await user.click(modal)
    // Assert
    expect(handleClose).toBeCalledTimes(1)
  })
})
