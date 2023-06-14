'use client'

import { useCallback, useState } from 'react'
import { type Entry } from '@/utils/entries'
import Image from 'next/image'
import Logo from '@/components/Logo'
import Icon from '@/components/Icon'
import Modal from '@/components/Modal'
import { toPascalCase, joinClassNames } from '@/app/utils'

type EntryModalPropsType = {
  entry: Entry
}
type ModalTriggerPropsType = EntryModalPropsType & {
  onOpen: () => void
}
type ModalPanelPropsType = EntryModalPropsType & {
  onClose?: () => void
}

export default function EntryModal({ entry }: EntryModalPropsType) {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const openModal = useCallback(() => {
    setIsOpen(true)
  }, [])
  const closeModal = useCallback(() => {
    setIsOpen(false)
  }, [])

  return (
    <>
      <ModalTrigger entry={entry} onOpen={openModal} />
      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        className={joinClassNames(
          'mt-0 max-w-xl p-4 text-inherit',
          'rounded-md bg-slate-950 shadow-xl',
          'backdrop:backdrop-blur-sm',
          'sm:mt-auto'
        )}
      >
        <ModalPanel entry={entry} onClose={closeModal} />
      </Modal>
    </>
  )
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
        <div className="relative aspect-square h-full overflow-hidden rounded-md">
          <Image
            alt="" // refer to adjacent text <figcaption>{name}</figcaption>
            src={image.src}
            fill
            className="object-cover"
          />
        </div>
        <figcaption id={id} className="text-xl font-medium">
          {toPascalCase(name)}
        </figcaption>
      </figure>
    </button>
  )
}

const ModalPanel = ({ entry, onClose }: ModalPanelPropsType) => {
  const { name, description, image, commonLocations } = entry

  return (
    <figure className="flex flex-col gap-4">
      <div className="flex items-center justify-between border-b-2 border-b-yellow-50/75 pb-4">
        <Logo>{name}</Logo>
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="h-12 w-12 rounded-sm p-2 hover:bg-slate-800 focus:bg-slate-800"
        >
          <Icon id="x-mark" />
        </button>
      </div>
      <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div
          className={`relative aspect-square min-w-[160px] overflow-hidden rounded-md`}
        >
          <Image
            alt="" // refer to adjacent text <Logo>{name}</Logo>
            src={image.src}
            fill
            className="object-cover"
          />
        </div>
        <p className="text-justify text-xl font-thin ">{description}</p>
      </div>
    </figure>
  )
}
