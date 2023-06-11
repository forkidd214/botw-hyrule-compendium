import Link from 'next/link'
import Logo from '@/components/Logo'
import Icon from '../Icon'

export default function CompendiumHeader() {
  return (
    <>
      <div className="flex items-center gap-1">
        <Link href="/" className="h-12 w-12 p-4">
          <Icon id="backward" />
        </Link>
        <Logo>Compendium</Logo>
      </div>
      <div className="ml-auto">
        <button className="h-12 w-12 p-2">
          <Icon id="search" />
        </button>
      </div>
    </>
  )
}
