import type { Config } from 'tailwindcss'

export default {
  content: [],
  theme: {
    extend: {
      colors: {
        base: '#0D1829',
        raised: '#122038',
        card: '#1A2D4A',
        amber: '#F5C128',
        coral: '#CC604A',
        sage: '#50B880',
        primary: '#F0E8D4',
        secondary: '#8A9EC0',
        muted: '#5A6E8C',
        'on-amber': '#0D1829',
        subtle: '#1E3255',
        available: '#50B880',
        'available-bg': '#0B2219',
        rented: '#C86C5E',
        'rented-bg': '#251618',
      },
      fontFamily: {
        heading: ['Fraunces', 'Georgia', 'serif'],
        body: ['DM Sans', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        sm: '4px',
        md: '10px',
        lg: '16px',
      },
    },
  },
  plugins: [],
} satisfies Config
