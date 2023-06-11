import './styles/globals.css'
import * as fonts from './styles/fonts'

import Header from '@/components/Header'

const fontsVariables = Object.values(fonts)
  .map((font) => font.variable)
  .join(' ')

export const metadata = {
  title: 'Hyrule Compendium',
  description: 'For Breath of Tthe Wild',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={fontsVariables}>
      <body className="flex flex-col bg-slate-950 px-2 font-sans text-yellow-50">
        <Header />
        {children}
        <footer className="mt-auto">I am footer</footer>
      </body>
    </html>
  )
}
