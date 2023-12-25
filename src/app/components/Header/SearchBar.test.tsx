import {
  act,
  render,
  rtlRender,
  screen,
  userEvent,
} from '@/test/app-test-utils'
import SearchBar from './SearchBar'
import { useEntries } from '@/app/utils/entries-context'
import * as entriesDB from '@/test/data/entries'

describe('SearchBar', () => {
  const FilteredEntryList = () => {
    const { filteredEntries } = useEntries()

    return (
      <ul data-testid="entry-list">
        {filteredEntries.map((entry) => (
          <li key={entry.id}>{entry.name}</li>
        ))}
      </ul>
    )
  }

  async function renderSearchBar(providerProps?: any) {
    const renderResult = await render(
      <div>
        <SearchBar />
        <FilteredEntryList />
      </div>,
      {
        route: '/compendium',
        providerProps,
      }
    )

    const searchBtn = screen.getByRole('button', { name: /search/i })
    const searchInput = screen.getByRole('textbox', { name: /search/i })
    const entryList = screen.getByTestId('entry-list')

    return {
      ...renderResult,
      searchBtn,
      searchInput,
      entryList,
    }
  }

  it('expands and collapses correctly on search button click', async () => {
    // arrange
    const { searchBtn, searchInput } = await renderSearchBar()
    const user = userEvent.setup()
    // assert
    expect(searchBtn).toBeInTheDocument()
    expect(searchInput).toHaveClass('hidden')
    // expand
    await user.click(searchBtn)
    // assert
    expect(searchBtn).toHaveAccessibleName(/close/i)
    expect(searchInput).not.toHaveClass('hidden')
    expect(searchInput).toHaveFocus()
    // collapse
    await user.click(searchBtn)
    // assert
    expect(searchBtn).toHaveAccessibleName(/search/i)
    expect(searchInput).toHaveClass('hidden')
    expect(searchInput).not.toHaveFocus()
  })

  it('resets input on close button click', async () => {
    const { searchBtn, searchInput } = await renderSearchBar()
    const user = userEvent.setup()
    const USER_INPUT = 'foo'

    // expand
    await user.click(searchBtn)
    // assert
    expect(searchBtn).toHaveAccessibleName(/close/i)
    expect(searchInput).not.toHaveClass('hidden')
    expect(searchInput).toHaveFocus()
    // type some input
    await user.keyboard(USER_INPUT)
    // assert
    expect(searchInput).toHaveValue(USER_INPUT)
    // collapse
    await user.click(searchBtn)
    // assert
    expect(searchInput).toHaveValue('')
  })

  it('filters entries on user input', async () => {
    const ENTRIES = await entriesDB.readManyByName()
    const { searchBtn, searchInput, entryList } = await renderSearchBar({
      entries: ENTRIES,
    })
    const user = userEvent.setup()
    const USER_INPUT = 'foo'

    // assert
    expect(searchBtn).toBeInTheDocument()
    expect(searchInput).toHaveClass('hidden')
    expect(entryList).toBeInTheDocument()
    expect(entryList.childElementCount).toEqual(ENTRIES.length)
    // act
    await user.click(searchBtn)
    await user.keyboard(USER_INPUT)
    // assert
    // all rendered entry names contain USER_INPUT
    const renderedEntryNames = Array.from(entryList.children).map(
      (li) => li.textContent
    )
    expect(
      renderedEntryNames.every((name) => name && name.includes(USER_INPUT))
    ).toBeTruthy()
    // all filltered out names are not rendered
    const filteredOutEntryNames = ENTRIES.filter(
      (entry) => !renderedEntryNames.includes(entry.name)
    ).map((entry) => entry.name)
    expect(filteredOutEntryNames).toHaveLength(
      ENTRIES.length - renderedEntryNames.length
    )
    filteredOutEntryNames.forEach((name) => {
      expect(screen.queryByText(name)).not.toBeInTheDocument()
    })
  })
})
