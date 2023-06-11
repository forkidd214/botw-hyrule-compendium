type LogoProps = {
  children: string
}

export default function Logo({ children }: LogoProps) {
  return (
    <div className="w-fit px-1 pb-1">
      <h1 className="font-hylia text-2xl">{children}</h1>
      <span className="block font-sheikah text-xs text-cyan-300">
        {children}
      </span>
    </div>
  )
}
