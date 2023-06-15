import type { Metadata } from 'next'
import './styles/globals.css'
import * as fonts from './styles/fonts'
import Header from '@/components/Header'

export const metadata: Metadata = {
  title: 'Hyrule Compendium',
  description: 'For Breath of the Wild',
  manifest: '/manifest.json',
  themeColor: '#020617',
}

const fontsVariables = Object.values(fonts)
  .map((font) => font.variable)
  .join(' ')

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={fontsVariables}>
      <body className="flex min-h-[100dvh] flex-col bg-slate-950 px-4 font-sans text-base font-normal text-yellow-50">
        <Header />
        <main className="mx-auto w-full max-w-7xl py-4">{children}</main>
        <footer className="mt-auto">I am footer</footer>
      </body>
    </html>
  )
}
