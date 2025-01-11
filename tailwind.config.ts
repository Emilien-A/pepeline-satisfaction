import type { Config } from 'tailwindcss'

export default {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
  ],
  theme: {
    extend: {
      colors: {
        'ios-bg': '#1C1C1E',
        'ios-card': 'rgba(255, 255, 255, 0.05)',
        'ios-border': 'rgba(255, 255, 255, 0.1)',
        'ios-text': {
          DEFAULT: '#FFFFFF',
          secondary: 'rgba(255, 255, 255, 0.7)'
        },
        'ios-blue': {
          DEFAULT: '#007AFF',
          dark: '#0A84FF'
        }
      },
      backdropBlur: {
        'ios': '20px'
      },
      borderRadius: {
        'ios': '16px',
        'ios-lg': '24px'
      },
      boxShadow: {
        'ios': '0 8px 32px rgba(0, 0, 0, 0.4)'
      },
      fontFamily: {
        'ios': ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif']
      }
    }
  },
  plugins: [],
} satisfies Config 