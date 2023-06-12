'use client'

import { useState } from 'react'
import { type Entry } from '@/utils/entries'
import Image from 'next/image'
import Logo from '@/components/Logo'
import Icon from '@/components/Icon'
import Modal from '@/components/Modal'
import { toPascalCase } from '@/app/utils'

type CardPropsType = {
  entry: Entry
}

const IMAGE_SIZE = 160

export default function Card({ entry }: CardPropsType) {
  const { name, description, image, commonLocations } = entry
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="w-full rounded-sm px-4 py-2 hover:bg-slate-900"
      >
        <figure className="flex h-full items-center gap-4">
          <div className="relative aspect-square h-full overflow-hidden rounded-md">
            <Image
              alt={image.name}
              src={image.src}
              fill
              className="object-cover"
            />
          </div>
          <figcaption className="text-xl font-medium">
            {toPascalCase(name)}
          </figcaption>
        </figure>
      </button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        className="mt-0 max-w-2xl rounded-md bg-stone-950 p-4 text-inherit sm:mt-auto"
      >
        <figure className="flex flex-col gap-4">
          <div className="flex items-center justify-between border-b-2 border-b-yellow-50/75 pb-4">
            <Logo>{name}</Logo>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="h-12 w-12 rounded-sm p-2 hover:bg-slate-800 focus:bg-slate-800"
            >
              <Icon id="x-mark" />
            </button>
          </div>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div
              className={`relative aspect-square min-w-[${IMAGE_SIZE}px] overflow-hidden rounded-md`}
            >
              <Image
                alt={image.name}
                src={image.src}
                fill
                className="object-cover"
              />
            </div>
            <p className="text-justify text-xl font-thin ">{description}</p>
          </div>
        </figure>
      </Modal>
    </>
  )
}
