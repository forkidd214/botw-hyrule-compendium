import { screen, render, userEvent } from '@/test/app-test-utils'
import { Tab } from './index'

describe('Tabs', () => {
  const TAB_COUNT: number = 3
  const DEFAULT_INDEX: number = 1
  let tabs: HTMLElement[] = Array(TAB_COUNT).fill(undefined)
  let panels: HTMLElement[] = Array(TAB_COUNT).fill(undefined)

  beforeEach(async () => {
    await render(
      <Tab.Group defaultIndex={DEFAULT_INDEX}>
        <Tab.List>
          {Array(TAB_COUNT)
            .fill(undefined)
            .map((_, index) => (
              <Tab key={`tab-${index}`}>{`tab${index}`}</Tab>
            ))}
        </Tab.List>
        <Tab.Panels>
          {Array(TAB_COUNT)
            .fill(undefined)
            .map((_, index) => (
              <Tab.Panel key={`panel-${index}`}>{`panel${index}`}</Tab.Panel>
            ))}
        </Tab.Panels>
      </Tab.Group>
    )

    Array(TAB_COUNT)
      .fill(undefined)
      .forEach((_, index) => {
        tabs[index] = screen.getByText(`tab${index}`)
        panels[index] = screen.getByText(`panel${index}`)
      })
  })

  it('renders tabs and tab panels', () => {
    tabs.forEach((tab) => expect(tab).toBeInTheDocument())
    panels.forEach((panel) => expect(panel).toBeInTheDocument())
  })

  it('highlights active tab and its panel', () => {
    Array(TAB_COUNT)
      .fill(undefined)
      .forEach((_, index) => {
        if (DEFAULT_INDEX === index) {
          expect(tabs[index]).toHaveAttribute('aria-selected', 'true')
          expect(panels[index]).not.toHaveClass('hidden')
        } else {
          expect(tabs[index]).toHaveAttribute('aria-selected', 'false')
          expect(panels[index]).toHaveClass('hidden')
        }
      })
  })

  it('changes active tab on click', async () => {
    // Arrange
    const user = userEvent.setup()
    const selectedIndex = 2
    assert(selectedIndex < TAB_COUNT && selectedIndex !== DEFAULT_INDEX)

    // Act
    await user.click(tabs[selectedIndex])

    // Assert
    Array(TAB_COUNT)
      .fill(undefined)
      .forEach((_, index) => {
        if (selectedIndex === index) {
          expect(tabs[index]).toHaveAttribute('aria-selected', 'true')
          expect(panels[index]).not.toHaveClass('hidden')
        } else {
          expect(tabs[index]).toHaveAttribute('aria-selected', 'false')
          expect(panels[index]).toHaveClass('hidden')
        }
      })
  })

  it('has WAI-ARIA roles, states, and properties', () => {
    const tabList = screen.getByRole('tablist')
    expect(tabList).toBeInTheDocument()
    expect(tabList).toHaveAttribute('aria-label')

    Array(TAB_COUNT)
      .fill(undefined)
      .forEach((_, index) => {
        expect(tabs[index]).toHaveAttribute('role', 'tab')
        expect(panels[index]).toHaveAttribute('role', 'tabpanel')

        // Each element with role tab has the property aria-controls referring to its associated tabpanel element.
        const panelId = panels[index].getAttribute('id')
        expect(panelId).toBeDefined()
        expect(tabs[index]).toHaveAttribute('aria-controls', panelId)

        // Each element with role tabpanel has the property aria-labelledby referring to its associated tab element.
        const tabId = tabs[index].getAttribute('id')
        expect(tabId).toBeDefined()
        expect(panels[index]).toHaveAttribute('aria-labelledby', tabId)
      })
  })

  it.todo('supports keyboard interaction')
})
