import type { Metadata } from 'next'
import './styles/globals.css'
import * as fonts from './styles/fonts'
import Header from '@/components/Header'
import { joinClassNames } from '@/utils/index'
import { EntriesProvider } from '@/utils/entries-context'
import { type Entry, useEntries, dynamic } from '@/utils/entries'
export { dynamic }

export const metadata: Metadata = {
  title: 'Hyrule Compendium',
  description: 'For Breath of the Wild',
  manifest: '/manifest.json',
  themeColor: '#020617',
}

const fontsVariables = Object.values(fonts)
  .map((font) => font.variable)
  .join(' ')

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { loading, error, data } = await useEntries()

  if (loading) return <div>Loading...</div>
  if (error) return <div>Failed loading data from database</div>
  const { entries } = data as { entries: Entry[] }

  return (
    <html
      lang="en"
      className={joinClassNames(fontsVariables, 'motion-safe:scroll-smooth')}
    >
      <body className="flex h-[100dvh] flex-col overflow-auto bg-slate-950 px-4 font-sans text-base font-normal text-yellow-50 antialiased">
        <EntriesProvider entries={entries}>
          <Header />
          <main className="mx-auto w-full max-w-7xl flex-1 overflow-hidden py-4">
            {children}
          </main>
        </EntriesProvider>
      </body>
    </html>
  )
}
