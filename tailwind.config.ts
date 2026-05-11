import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{js,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#FFFBDE',
        surface: '#FFF6C8',
        border: '#E8D98A',
        fg: '#2C2509',
        muted: '#7A6A2A',
        accent: '#8B5CF6',
        accent2: '#059669',
        'code-bg': '#FEF3B0',
      },
      fontFamily: {
        mono: ['"Geist Mono"', 'ui-monospace', 'monospace'],
        body: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        'screen-xl': '1280px',
      },
      spacing: {
        18: '4.5rem',
        22: '5.5rem',
        28: '7rem',
      },
    },
  },
  plugins: [],
} satisfies Config;
