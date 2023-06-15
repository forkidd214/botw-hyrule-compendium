import Link from 'next/link'
import Image from 'next/image'
import Logo from '@/components/Logo'
import { joinClassNames } from './utils'

export default function Home() {
  return (
    <div className="mx-auto max-w-md">
      <Link
        href="/compendium"
        className={joinClassNames(
          'flex w-full items-center justify-evenly gap-8',
          'rounded-md border border-yellow-50/20 px-8',
          'hover:border-yellow-50/50 focus:border-yellow-50/50 active:bg-blue-500'
        )}
      >
        <Image
          src="/images/sheikah-slate.png"
          width={96}
          height={96}
          alt="" // refer to adjacent text <Logo>Compendium</Logo>
          priority
        />
        <Logo>Compendium</Logo>
      </Link>
    </div>
  )
}
