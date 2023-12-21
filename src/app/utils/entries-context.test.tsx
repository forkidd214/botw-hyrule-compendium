import { act, renderHook } from '@testing-library/react'
import React, { ReactNode } from 'react'

import { EntriesProvider, useEntries } from './entries-context'
import { MOCK_ENTRIES } from '@/__tests__/MOCK_ENTRIES'

describe('entries-context', () => {
  // HOC for custom provider with custom props
  const withProps = (Comp: React.ComponentType<any>, props: any) => {
    return function CompWithProps({ children }: { children: ReactNode }) {
      return <Comp {...props}>{children}</Comp>
    }
  }

  it('renders default empty array when no entries provided', () => {
    const { result } = renderHook(() => useEntries(), {
      wrapper: EntriesProvider,
    })

    expect(result.current.entries).toEqual(result.current.filteredEntries)
    expect(result.current.entries).toHaveLength(0)
  })

  it('renders initial entries from provider', () => {
    const { result } = renderHook(() => useEntries(), {
      wrapper: withProps(EntriesProvider, { entries: MOCK_ENTRIES }),
    })

    expect(result.current.entries).toEqual(result.current.filteredEntries)
    expect(result.current.entries).toEqual(MOCK_ENTRIES)
  })

  it('provides a callback to modify filtered entries', () => {
    // Arrange
    const { result } = renderHook(() => useEntries(), {
      wrapper: withProps(EntriesProvider, { entries: MOCK_ENTRIES }),
    })
    const newEntries: any[] = []

    // Assert
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
