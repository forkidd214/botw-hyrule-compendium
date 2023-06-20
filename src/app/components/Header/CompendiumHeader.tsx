'use client'

import * as React from 'react'
import Link from 'next/link'
import Logo from '@/components/Logo'
import Icon from '@/components/Icon'
import SearchBar from './SearchBar'
import { joinClassNames } from '@/app/utils'

export default function CompendiumHeader() {
  const [isShowLogo, setIsShowLogo] = React.useState(true)

  const handleSearchBarToggle = React.useCallback(
    (isOpen: boolean) => {
      const isMobile = window.innerWidth < 650
      isMobile && setIsShowLogo(!isOpen)
    },
    [setIsShowLogo]
  )

  return (
    <>
      <div className="flex items-center gap-1">
        <Link
          href="/"
          aria-label="Get back to home page"
          className="h-12 w-12 rounded-sm p-4"
        >
          <Icon id="backward" />
        </Link>
        <div
          className={joinClassNames(
            isShowLogo ? 'block' : 'hidden',
            'sm:block'
          )}
        >
          <Logo>Compendium</Logo>
        </div>
      </div>
      <div className="flex-auto sm:max-w-sm">
        <SearchBar onToggle={handleSearchBarToggle} />
      </div>
    </>
  )
}
