import { ref } from 'vue'

interface ValidationRule {
  validate: (value: any) => boolean
  message: string
}

export function useFormValidation() {
  const errors = ref<Record<string, string>>({})
  const isValid = ref(true)

  const rules = {
    required: (message = 'Ce champ est requis'): ValidationRule => ({
      validate: (value: any) => value !== null && value !== undefined && value !== '',
      message
    }),
    min: (min: number, message = `La valeur minimale est ${min}`): ValidationRule => ({
      validate: (value: number) => value >= min,
      message
    }),
    max: (max: number, message = `La valeur maximale est ${max}`): ValidationRule => ({
      validate: (value: number) => value <= max,
      message
    }),
    email: (message = 'Email invalide'): ValidationRule => ({
      validate: (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
      message
    })
  }

  const validate = (field: string, value: any, fieldRules: ValidationRule[]) => {
    for (const rule of fieldRules) {
      if (!rule.validate(value)) {
        errors.value[field] = rule.message
        isValid.value = false
        return false
      }
    }
    delete errors.value[field]
    isValid.value = Object.keys(errors.value).length === 0
    return true
  }

  const resetValidation = () => {
    errors.value = {}
    isValid.value = true
  }

  return {
    errors,
    isValid,
    rules,
    validate,
    resetValidation
  }
} 