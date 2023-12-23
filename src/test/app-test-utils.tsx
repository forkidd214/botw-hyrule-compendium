import { RenderOptions, render as rtlRender } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { EntriesProvider } from '@/app/utils/entries-context'

// HOC for custom provider with custom props
const withProps = (Comp: React.ComponentType<any>, props: any) => {
  return function CompWithProps({ children }: { children: React.ReactNode }) {
    return <Comp {...props}>{children}</Comp>
  }
}

async function render(
  ui: React.ReactElement,
  {
    route = '/',
    providerProps,
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

export * from '@testing-library/react'
export { withProps, render, userEvent }
