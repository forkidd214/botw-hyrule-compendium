import { render, screen, userEvent, within } from '@/test/app-test-utils'
import * as entriesDB from '@/test/data/entries'
import Compendium from './page'

describe('compendium page', async () => {
  // arrange
  const CATEGORIES = ['creatures', 'monsters', 'materials', 'equipment'] // order matters
  const ENTRIES = (await entriesDB.readManyByName()).slice(0, 10)
  const escapedName = (name: string) =>
    name.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')
  const randomInt = (range: number) => Math.floor(Math.random() * range)

  async function renderCompendiumPage() {
    const renderResult = await render(<Compendium />, {
      route: '/compendium',
      providerProps: { entries: ENTRIES },
    })

    const tabs = screen.getAllByRole('tab')
    const tabPanels = screen.getAllByRole('tabpanel')

    return {
      ...renderResult,
      tabs,
      tabPanels,
    }
  }

  it('renders a tab for each category', async () => {
    const { tabs, tabPanels } = await renderCompendiumPage()

    // tabs should match tab panels
    expect(tabs.map((tab) => tab.getAttribute('id'))).toEqual(
      tabPanels.map((tabPanel) => tabPanel.getAttribute('aria-labelledby'))
    )
    expect(tabPanels.map((tabPanel) => tabPanel.getAttribute('id'))).toEqual(
      tabs.map((tab) => tab.getAttribute('aria-controls'))
    )

    // each tab represents a category
    expect(
      tabs
        .map((tab) => within(tab).getByRole('img'))
        .map((img) => img.getAttribute('alt'))
    ).toMatchInlineSnapshot(
      `[\n${CATEGORIES.map((item) => `  "${item}"`).join(',\n')},\n]`
    )
  })

  it('renders every entry under the correct category tab', async () => {
    const { tabPanels } = await renderCompendiumPage()

    ENTRIES.forEach((entry: any) => {
      const entryBtns = screen.getAllByRole('button', {
        name: new RegExp(escapedName(entry.name), 'i'),
      })
      if (entryBtns.length !== 1) return // ignore buttons with the same name, for the categories of which are unknown.

      const catIndex = CATEGORIES.indexOf(entry.category.name)

      catIndex !== -1
        ? expect(tabPanels[catIndex]).toContain(entryBtns[0])
        : expect(tabPanels[0]).toContain(entryBtns[0]) // any other category like ['animals', 'food'] goes to 'creatures'
    })
  })

  it('switches entry tabs on click', async () => {
    // arrange
    const user = userEvent.setup()
    let activeTabIndex = 0
    const { tabs, tabPanels } = await renderCompendiumPage()

    // assert
    tabs.forEach((_, index) => {
      if (activeTabIndex === index) {
        expect(tabs[index]).toHaveAttribute('aria-selected', 'true')
        expect(tabPanels[index]).not.toHaveClass('hidden')
      } else {
        expect(tabs[index]).toHaveAttribute('aria-selected', 'false')
        expect(tabPanels[index]).toHaveClass('hidden')
      }
    })

    // act
    activeTabIndex = randomInt(tabs.length)
    await user.click(tabs[activeTabIndex])

    // assert
    tabs.forEach((_, index) => {
      if (activeTabIndex === index) {
        expect(tabs[index]).toHaveAttribute('aria-selected', 'true')
        expect(tabPanels[index]).not.toHaveClass('hidden')
      } else {
        expect(tabs[index]).toHaveAttribute('aria-selected', 'false')
        expect(tabPanels[index]).toHaveClass('hidden')
      }
    })
  })

  it('renders an entry modal in detail on click', async () => {
    const user = userEvent.setup()
    const activeTabIndex = 0
    const { tabPanels } = await renderCompendiumPage()

    // find a random modal trigger in the active tab panel
    const triggers = within(tabPanels[activeTabIndex]).getAllByRole('button')
    const trigger = triggers.at(randomInt(triggers.length))
    const modal = trigger?.nextElementSibling
    assert(trigger && modal && modal instanceof HTMLDialogElement)

    // find its corresponding record in DB
    const entry = ENTRIES.find(
      (ele) => ele.name.toLowerCase() === trigger?.textContent?.toLowerCase()
    )
    assert(entry !== undefined)

    // assert certain entry details are hidden
    expect(modal.showModal).toBeCalledTimes(0)
    expect(within(modal).getByText(entry.name)).not.toBeVisible()
    expect(within(modal).getByText(entry.description)).not.toBeVisible()

    // click this modal trigger
    await user.click(trigger)

    // assert certain entry details are shown
    expect(modal.showModal).toBeCalledTimes(1)
    expect(within(modal).getByText(entry.name)).toBeVisible()
    expect(within(modal).getByText(entry.description)).toBeVisible()
  })
})
