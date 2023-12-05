import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Luckiest Guy', 'sans-serif'],
        serif: ['Luckiest Guy', 'sans-serif'],
      },
      colors: {
        'Holiday-Green': '#0D5753',
        'Pill-Green': '#A2D7BF',
        'AI-Green': '#D3F2F5',
        'Light-Green': '#C6D5C5',
        'Light-Red': '#D0BABC',

      },
      borderRadius: {
        '32': '32px',
      },
    },
  },
  plugins: [],
}
export default config
