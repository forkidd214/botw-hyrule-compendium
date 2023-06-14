import Link from 'next/link'
import Logo from '@/components/Logo'
import Icon from '../Icon'

export default function CompendiumHeader() {
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
        <Logo>Compendium</Logo>
      </div>
      <div className="ml-auto">
        <button aria-label="search" className="h-12 w-12 rounded-sm p-2">
          <Icon id="search" />
        </button>
      </div>
    </>
  )
}
