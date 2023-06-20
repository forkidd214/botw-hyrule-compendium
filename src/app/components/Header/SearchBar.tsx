'use client'

import * as React from 'react'
import Icon from '@/components/Icon'
import { joinClassNames } from '@/utils/index'
import { useEntries } from '@/utils/entries-context'
import { Entry } from '@/app/utils/entries'

type SearchBarProps = {
  onToggle?: (isOpen: boolean) => void
}

export default function SearchBar({ onToggle }: SearchBarProps) {
  const { entries, setFilteredEntries } = useEntries()
  const [isOpen, setIsOpen] = React.useState(false)
  const [searchTerm, setSearchTerm] = React.useState('')
  const deferredSearchTerm = React.useDeferredValue(searchTerm)
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [isInitialRender, setIsInitialRender] = React.useState(true)

  /**
   * initial render: do nothing
   * on open: set focus to input element
   * on close: reset input value and entries context to initial state
   */
  React.useEffect(() => {
    if (isInitialRender) {
      setIsInitialRender(false)
      return undefined
    }

    onToggle && onToggle(isOpen)
    if (isOpen) {
      inputRef.current && inputRef.current.focus()
    } else {
      setSearchTerm('')
      setFilteredEntries(entries)
    }
  }, [isOpen, onToggle, setFilteredEntries, entries, isInitialRender])

  /**
   * when is closed: do nothing
   * on typing searchTerm: set defferred filtered entries to context
   */
  React.useEffect(() => {
    if (!isOpen) return undefined

    const filteredEntries: Entry[] =
      deferredSearchTerm === ''
        ? entries
        : entries.filter(({ name }) =>
            name.toLowerCase().includes(deferredSearchTerm.toLowerCase())
          )

    setFilteredEntries(filteredEntries)
  }, [isOpen, entries, setFilteredEntries, deferredSearchTerm])

  return (
    <label className="relative block w-full">
      <span className="sr-only">Search</span>
      <input
        type="text"
        placeholder="Search"
        name="search"
        ref={inputRef}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        autoComplete="off"
        className={joinClassNames(
          isOpen ? 'block' : 'hidden',
          'block h-12 w-full',
          'text-xl placeholder:font-thin placeholder:italic placeholder:text-slate-400 placeholder:focus:text-cyan-300 placeholder:active:text-cyan-300',
          'border-b-2 border-solid bg-transparent outline-none focus:border-b-cyan-300 active:border-b-cyan-300'
        )}
      />
      <span className="absolute inset-y-0 right-0 flex items-center">
        <button
          aria-label="search"
          className="h-12 w-12 p-3"
          onClick={() => setIsOpen((isOpen) => !isOpen)}
        >
          {isOpen ? <Icon id="x-mark" /> : <Icon id="search" />}
        </button>
      </span>
    </label>
  )
}
