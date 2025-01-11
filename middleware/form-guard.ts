export default defineNuxtRouteMiddleware((to, from) => {
  const store = usePassengerStore()
  
  // Si on essaie d'accéder à l'accueil pendant le formulaire
  if (to.path === '/' && store.hasStartedForm && !store.canNavigateToResults) {
    return navigateTo(from.path)
  }
  
  // Navigation vers la page profil
  if (to.path === '/profile') {
    store.setCurrentStep('profile')
  }
  
  // Navigation vers la page vol
  if (to.path === '/flight') {
    if (!store.canNavigateToFlight) {
      return navigateTo('/profile')
    }
    store.setCurrentStep('flight')
  }
  
  // Navigation vers la page services
  if (to.path === '/services') {
    if (!store.canNavigateToServices) {
      return navigateTo('/flight')
    }
    store.setCurrentStep('services')
  }
  
  // Navigation vers la page résultats
  if (to.path === '/success') {
    if (!store.canNavigateToResults) {
      return navigateTo('/services')
    }
    store.setCurrentStep(null)
  }
  
  // Si on vient de la page de succès et qu'on essaie d'accéder au formulaire
  if (from.path === '/success' && to.path.match(/\/(profile|flight|services)/)) {
    store.reset()
  }
}) 