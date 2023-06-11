'use client'

import { usePathname } from 'next/navigation'
import Logo from '@/components/Logo'
import CompendiumHeader from './CompendiumHeader'

export default function Header() {
  const pathname = usePathname()
  const isCompendiumPage = pathname === '/compendium'

  return (
    <header className="flex items-center border-b-2 py-4">
      {isCompendiumPage ? <CompendiumHeader /> : <Logo>Guide of the Wild</Logo>}
    </header>
  )
}
