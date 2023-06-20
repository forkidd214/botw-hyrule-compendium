'use client'

import * as React from 'react'
import { usePathname } from 'next/navigation'
import Logo from '@/components/Logo'

type HeaderProps = {
  children: React.ReactNode
}

export default function Header({ children }: HeaderProps) {
  const pathname = usePathname()
  const isCompendiumPage = pathname === '/compendium'

  return (
    <header className="flex items-center justify-between gap-4 border-b-2 border-b-yellow-50/75 py-4">
      {isCompendiumPage ? children : <Logo>Guide of the Wild</Logo>}
    </header>
  )
}
