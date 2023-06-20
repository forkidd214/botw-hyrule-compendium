'use client'

import React, { useCallback, useState } from 'react'
import { type Entry } from '@/utils/entries'
import Image from 'next/image'
import Modal from '@/components/Modal'
import EntryModalPanel from './EntryModalPanel'
import { toPascalCase, joinClassNames } from '@/app/utils'

type EntryModalPropsType = {
  entry: Entry
}
type ModalTriggerPropsType = EntryModalPropsType & {
  onOpen: () => void
}

export default function EntryModal({ entry }: EntryModalPropsType) {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const openModal = useCallback(() => {
    setIsOpen(true)
  }, [])
  const closeModal = useCallback(() => {
    setIsOpen(false)
  }, [])

  return React.useMemo(() => {
    return (
      <>
        <ModalTrigger entry={entry} onOpen={openModal} />
        <Modal
          isOpen={isOpen}
          onClose={closeModal}
          className={joinClassNames(
            'mt-0  max-w-screen-sm p-4 text-inherit',
            'rounded-md bg-slate-950 shadow-xl',
            'backdrop:backdrop-blur-sm',
            'sm:mt-auto',
            'animate-[zoomIn_200ms_ease-in-out]'
          )}
        >
          <EntryModalPanel isOpen={isOpen} entry={entry} onClose={closeModal} />
        </Modal>
      </>
    )
  }, [closeModal, entry, isOpen, openModal])
}

const ModalTrigger = ({ entry, onOpen }: ModalTriggerPropsType) => {
  const { id, name, image } = entry

  return (
    <button
      type="button"
      onClick={onOpen}
      aria-labelledby={id}
      className={joinClassNames(
        'w-full rounded-md px-4 py-2',
        'hover:bg-slate-900 focus:bg-slate-900 active:bg-blue-500'
      )}
    >
      <figure className="flex h-full items-center gap-4">
        <div className="relative aspect-square h-full flex-shrink-0 overflow-hidden rounded-md">
          <Image
            alt="" // refer to adjacent text <figcaption>{name}</figcaption>
            src={image.src}
            fill
            sizes={image.width + 'px'}
            className="object-cover"
          />
        </div>
        <figcaption id={id} className="text-left text-xl font-medium">
          {toPascalCase(name)}
        </figcaption>
      </figure>
    </button>
  )
}
