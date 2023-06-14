import { toPascalCase } from '@/app/utils'

type LogoProps = {
  children: string
}

export default function Logo({ children }: LogoProps) {
  return (
    <div className="w-fit px-1 pb-1">
      <h1 className="font-hylia text-2xl">{toPascalCase(children)}</h1>
      <span aria-hidden className="block font-sheikah text-xs text-cyan-300">
        {children}
      </span>
    </div>
  )
}
