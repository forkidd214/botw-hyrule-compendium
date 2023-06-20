'use client'

import { MouseEvent, useRef, useEffect, useCallback } from 'react'

type ModalPropsType = {
  isOpen: boolean
  onClose: () => void
  children?: React.ReactNode
  className?: string
}

export default function Modal({
  isOpen,
  onClose,
  children,
  className,
}: ModalPropsType) {
  const ref = useRef<HTMLDialogElement>(null)

  const openModal = useCallback(() => {
    ref.current?.showModal() // [prefer .showModal() rather than .show()](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog#:~:text=Ensure%20a%20mechanism%20is%20provided%20to%20allow%20users,method%2C%20this%20behavior%20is%20provided%20by%20the%20browser.)
  }, [ref])

  const closeMocal = useCallback(() => {
    ref.current?.close()
  }, [ref])

  useEffect(() => {
    isOpen ? openModal() : closeMocal()
  }, [isOpen, openModal, closeMocal])

  const isClickedWithinDialog = useCallback(
    (e: MouseEvent) => {
      if (!ref.current) return false
      const { clientX: x, clientY: y } = e
      const { left, right, top, bottom } = ref.current.getBoundingClientRect()
      return x > left && x < right && y > top && y < bottom
    },
    [ref]
  )

  return (
    <dialog
      ref={ref}
      onClick={(e) => {
        !isClickedWithinDialog(e) && onClose()
      }}
      onClose={onClose}
      className={`max-w-fit backdrop:bg-white/10  ${className}`}
    >
      {children}
    </dialog>
  )
}
