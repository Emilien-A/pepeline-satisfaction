export const theme = {
  colors: {
    background: '#1C1C1E',
    card: {
      background: 'rgba(0, 0, 0, 0.1)',
      border: 'rgba(255, 255, 255, 0.1)'
    },
    text: {
      primary: '#FFFFFF',
      secondary: 'rgba(255, 255, 255, 0.7)'
    },
    primary: {
      default: '#007AFF',
      hover: '#0A84FF'
    }
  },
  effects: {
    blur: {
      default: '20px',
      strong: '30px',
      xl: '50px'
    },
    radius: {
      default: '16px',
      large: '24px'
    }
  },
  spacing: {
    container: {
      padding: '1rem',
      maxWidth: '64rem'
    }
  }
} as const

export type Theme = typeof theme 