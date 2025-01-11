import { usePassengerStore } from '~/stores/passenger'

export function useFormNavigation() {
  const store = usePassengerStore()
  const router = useRouter()

  const goToNextStep = (currentStep: 'profile' | 'flight' | 'services') => {
    const nextSteps = {
      profile: '/flight',
      flight: '/services',
      services: '/success'
    }
    router.push(nextSteps[currentStep])
  }

  const canProceed = (step: 'profile' | 'flight' | 'services'): boolean => {
    const validations = {
      profile: store.isProfileComplete,
      flight: store.isFlightComplete,
      services: store.isRatingsComplete
    }
    return validations[step]
  }

  return {
    goToNextStep,
    canProceed
  }
} 