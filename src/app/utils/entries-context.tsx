'use client'

import * as React from 'react'
import { type Entry } from './entries'

type EntriesContextValue = {
  entries: Entry[]
  filteredEntries: Entry[]
  setFilteredEntries: React.Dispatch<React.SetStateAction<Entry[]>>
}

type EntriesProviderProps = {
  children: React.ReactNode
  entries?: Entry[]
}

const EntriesContext = React.createContext<EntriesContextValue | undefined>(
  undefined
)
EntriesContext.displayName = 'EntriesContext'

const EntriesProvider = ({ children, entries = [] }: EntriesProviderProps) => {
  const [filteredEntries, setFilteredEntries] = React.useState<Entry[]>(entries)

  const value = {
    entries,
    filteredEntries,
    setFilteredEntries,
  }

  return (
    <EntriesContext.Provider value={value}>{children}</EntriesContext.Provider>
  )
}
EntriesProvider.displayName = 'EntriesProvider'

function useEntries() {
  const context = React.useContext(EntriesContext)

  if (!context) {
    throw new Error(`useEntries must be used within a EntriesProvider`)
  }

  return context
}

export { EntriesProvider, useEntries }
