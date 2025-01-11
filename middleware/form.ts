import { usePassengerStore } from '~/stores/passenger'

export default defineNuxtRouteMiddleware((to) => {
  const store = usePassengerStore()
  
  const formRoutes = ['/', '/profile', '/flight', '/services', '/success']
  const currentIndex = formRoutes.indexOf(to.path)
  
  if (currentIndex === -1) return
  
  if (currentIndex > 0) {
    if (currentIndex >= 1 && !store.isProfileComplete) {
      return navigateTo('/')
    }
    
    if (currentIndex >= 2 && !store.isFlightComplete) {
      return navigateTo('/profile')
    }
    
    if (currentIndex >= 3 && !store.isRatingsComplete) {
      return navigateTo('/flight')
    }
    
    if (currentIndex === 4 && !store.isRatingsComplete) {
      return navigateTo('/services')
    }
  }
}) 