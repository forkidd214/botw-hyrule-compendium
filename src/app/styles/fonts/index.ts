import { Signika } from 'next/font/google'
import localFont from 'next/font/local'

const signika = Signika({
  subsets: ['latin'],
  variable: '--font-signika',
})

const hylia = localFont({
  src: './hylia-serif-beta-regular.woff2',
  variable: '--font-hylia',
  weight: '400',
})

const sheikah = localFont({
  src: './sheikah-complete.woff2',
  variable: '--font-sheikah',
  weight: '400',
})

export { signika, hylia, sheikah }
