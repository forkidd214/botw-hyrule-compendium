import './styles/globals.css'
import * as fonts from './styles/fonts'

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
      <body className="font-sans">{children}</body>
    </html>
  )
}
