import Link from 'next/link'
import Image from 'next/image'
import Logo from '@/components/Logo'

export default function Home() {
  return (
    <div className="max-w-md">
      <Link
        href="/compendium"
        className="flex w-full items-center justify-evenly gap-8 rounded-md bg-slate-900 px-8"
      >
        <Image
          src="/images/sheikah-slate.png"
          width={96}
          height={96}
          alt="sheikah slate"
        />
        <Logo>Compendium</Logo>
      </Link>

      <h3 className="font-semibold">Lord of the Mountain</h3>
      <p className="">
        This noble creature watches over all animals that make their homes in
        the forest. Legends say this holy creature is a reincarnation of a sage
        that died on the lands it now protects. It has an acute awareness of its
        surroundings, so it seldom appears before people. It&apos;s sometimes
        known by its other name, Satori.
      </p>
      <Link
        href="/compendium"
        className="mt-4 inline-block rounded-md bg-teal-700 px-3 py-2 text-base font-medium hover:bg-teal-900 hover:text-white"
      >
        GO TO COMPENDIUM
      </Link>
    </div>
  )
}
