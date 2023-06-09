/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme'

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        hylia: ['var(--font-hylia)', ...defaultTheme.fontFamily.serif],
        sans: ['var(--font-signika)', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
}
