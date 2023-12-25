import { RenderOptions, render as rtlRender } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { EntriesProvider } from '@/app/utils/entries-context'

// HOC for custom provider with custom props
const withProps = (Comp: React.ComponentType<any>, props: any) => {
  return function CompWithProps({ children }: { children: React.ReactNode }) {
    return <Comp {...props}>{children}</Comp>
  }
}

// default render with providers
async function render(
  ui: React.ReactElement,
  {
    route = '/',
    providerProps = { entries: [] },
    ...renderOptions
  }: {
    route?: string
    providerProps?: any
    renderOptions?: RenderOptions
  } = {}
) {
  window.history.pushState({}, 'Test page', route)

  return rtlRender(ui, {
    wrapper: withProps(EntriesProvider, providerProps),
    ...renderOptions,
  })
}

// enable operations on a dialog element, for jsdom doesn't support yet
const MOCK_DIALOG_CLIENT_RECT = {
  x: 100,
  y: 50,
  width: 100,
  height: 100,
}
const getDialogClientRect = () => ({
  ...MOCK_DIALOG_CLIENT_RECT,
  top: MOCK_DIALOG_CLIENT_RECT.y,
  left: MOCK_DIALOG_CLIENT_RECT.x,
  right: MOCK_DIALOG_CLIENT_RECT.x + MOCK_DIALOG_CLIENT_RECT.width,
  bottom: MOCK_DIALOG_CLIENT_RECT.y + MOCK_DIALOG_CLIENT_RECT.height,
})
const getDialogPointerCoords = ({
  isWithin = true,
}: { isWithin?: boolean } = {}) => {
  return isWithin
    ? {
        clientX: MOCK_DIALOG_CLIENT_RECT.x + MOCK_DIALOG_CLIENT_RECT.width / 2,
        clientY: MOCK_DIALOG_CLIENT_RECT.y + MOCK_DIALOG_CLIENT_RECT.height / 2,
      }
    : {
        clientX: MOCK_DIALOG_CLIENT_RECT.x - 100,
        clientY: MOCK_DIALOG_CLIENT_RECT.y - 50,
      }
}

export * from '@testing-library/react'
export {
  withProps,
  rtlRender,
  render,
  userEvent,
  getDialogClientRect,
  getDialogPointerCoords,
}
