import { ref } from 'vue'

export function useAgeValidation() {
  const error = ref<string>('')

  const validateAge = (value: number | null): { isValid: boolean; error: string } => {
    if (value === null || value === 0 || isNaN(value)) {
      return {
        isValid: false,
        error: "L'âge est requis"
      }
    }
    
    if (value < 18) {
      return {
        isValid: false,
        error: "L'âge minimum est de 18 ans"
      }
    }
    
    if (value > 120) {
      return {
        isValid: false,
        error: "L'âge doit être inférieur à 120 ans"
      }
    }

    return {
      isValid: true,
      error: ''
    }
  }

  return {
    error,
    validateAge
  }
} 