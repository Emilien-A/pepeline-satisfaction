export const COMMON_STYLES = {
  // Classes de base pour les cartes
  card: 'bg-black/10 backdrop-blur-xl border border-white/10 rounded-ios-lg shadow-ios',
  
  // Classes pour les inputs
  input: 'bg-ios-card border border-ios-border rounded-ios focus:border-ios-blue focus:ring-2 focus:ring-ios-blue/20',
  
  // Classes pour les boutons
  button: 'bg-ios-blue text-white rounded-ios-lg shadow-ios active:brightness-90',
  
  // Classes pour les textes
  text: {
    primary: 'text-ios-text',
    secondary: 'text-ios-text-secondary',
    error: 'text-red-500'
  },
  
  // Classes pour les espacements responsives
  spacing: {
    container: 'px-4 sm:px-6 md:px-8',
    section: 'py-6 sm:py-8 md:py-10',
    stack: 'space-y-4 sm:space-y-6'
  },
  
  // Classes pour les transitions
  transition: 'transition-all duration-300 ease-out',
  
  // Classes pour les états
  states: {
    hover: 'hover:bg-black/20',
    active: 'active:scale-[0.98]',
    disabled: 'opacity-50 cursor-not-allowed'
  }
} 