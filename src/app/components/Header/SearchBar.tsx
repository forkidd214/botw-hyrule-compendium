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
  const [_, startTransition] = React.useTransition()
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [isInitialRender, setIsInitialRender] = React.useState(true)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newInput = e.target.value
    setSearchTerm(newInput)

    startTransition(() => {
      const filteredEntries: Entry[] =
        newInput === ''
          ? entries
          : entries.filter(({ name }) =>
              name.toLowerCase().includes(newInput.toLowerCase())
            )
      setFilteredEntries(filteredEntries)
    })
  }

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

  return (
    <label className="relative block w-full">
      <span className="sr-only">Search</span>
      <input
        type="text"
        placeholder="Search"
        name="search"
        ref={inputRef}
        value={searchTerm}
        onChange={handleInputChange}
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
