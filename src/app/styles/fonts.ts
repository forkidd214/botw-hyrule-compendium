import { Signika } from 'next/font/google'
import localFont from 'next/font/local'

const signika = Signika({
  subsets: ['latin'],
  variable: '--font-signika',
})

const hylia = localFont({
  src: './HyliaSerifBeta-Regular.woff2',
  variable: '--font-hylia',
  weight: '400',
})

export { signika, hylia }
