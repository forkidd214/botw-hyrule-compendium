import { withProps, act, renderHook } from '@/test/app-test-utils'

import { EntriesProvider, useEntries } from './entries-context'
import * as entriesDB from '@/test/data/entries'
import { buildEntry } from '@/test/generate'

describe('entries-context', () => {
  it('renders default empty array when no entries provided', () => {
    const { result } = renderHook(() => useEntries(), {
      wrapper: EntriesProvider,
    })

    expect(result.current.entries).toEqual(result.current.filteredEntries)
    expect(result.current.entries).toHaveLength(0)
  })

  it('renders initial entries from provider', async () => {
    const { result } = renderHook(() => useEntries(), {
      wrapper: withProps(EntriesProvider, {
        entries: await entriesDB.readManyByName(),
      }),
    })

    expect(result.current.entries).toEqual(result.current.filteredEntries)
    expect(result.current.entries).toEqual(await entriesDB.readManyByName())
  })

  it('provides a callback to modify filtered entries', async () => {
    // Arrange
    const COMMON_NAME = 'dog'
    const newEntries: any[] = [
      buildEntry({ name: `a ${COMMON_NAME}` }),
      buildEntry({ name: `a little ${COMMON_NAME}` }),
      buildEntry({ name: `many lovely ${COMMON_NAME}s` }),
    ]
    await Promise.all(newEntries.map((entry) => entriesDB.create(entry)))
    const { result } = renderHook(() => useEntries(), {
      wrapper: withProps(EntriesProvider, {
        entries: await entriesDB.readManyByName(),
      }),
    })

    // Assert
    newEntries.forEach((entry) =>
      expect(result.current.filteredEntries).toContain(entry)
    )
    expect(result.current.filteredEntries).not.toEqual(newEntries)

    // Act
    act(() => {
      /* fire events that update state */
      result.current.setFilteredEntries(newEntries)
    })

    // Assert
    expect(result.current.filteredEntries).toEqual(newEntries)
  })
})
