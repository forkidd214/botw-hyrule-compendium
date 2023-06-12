import {
  PlayIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from '@heroicons/react/24/solid'
import { JSX, SVGProps, RefAttributes } from 'react'

type HeroIconPropsType = JSX.IntrinsicAttributes &
  Omit<SVGProps<SVGSVGElement>, 'ref'> & {
    title?: string | undefined
    titleId?: string | undefined
  } & RefAttributes<SVGSVGElement>

type IconPropsType = HeroIconPropsType & {
  id: 'backward' | 'search' | 'x-mark'
}

const icons = {
  backward: {
    Component: PlayIcon,
    preClassName: 'rotate-180',
  },
  search: {
    Component: MagnifyingGlassIcon,
    preClassName: '',
  },
  'x-mark': {
    Component: XMarkIcon,
    preClassName: '',
  },
}

const Icon = ({ id, className, ...props }: IconPropsType) => {
  const { Component, preClassName } = icons[id]

  if (!Component) {
    throw new Error(`No icon found for ID: ${id}`)
  }

  return (
    <Component
      className={`stroke-current stroke-1 ${preClassName} ${className}`}
      {...props}
    />
  )
}

export default Icon
