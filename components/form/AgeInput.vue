<template>
  <div class="relative w-full">
    <label 
      :for="id" 
      class="absolute text-ios-text-secondary text-sm transition-all duration-300 ease-out origin-left
             sm:text-base"
      :class="[
        isFocused || modelValue ? 
        '-top-6 left-0 scale-90 text-ios-blue' : 
        'top-2.5 left-4 cursor-text'
      ]"
    >
      {{ label }}
    </label>
    
    <input
      :id="id"
      type="number"
      :value="modelValue"
      @input="onInput"
      @focus="onFocus"
      @blur="onBlur"
      :placeholder="isFocused ? '18-120' : ''"
      class="w-full bg-ios-card border border-ios-border rounded-ios 
             px-3 py-2 sm:px-4 sm:py-2.5 text-base sm:text-lg
             transition-all duration-300 ease-out placeholder:text-ios-text-secondary/50
             focus:border-ios-blue focus:ring-2 focus:ring-ios-blue/20
             active:scale-[0.98] active:brightness-90
             disabled:opacity-50 disabled:cursor-not-allowed
             [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
      :class="{ 
        'border-red-500 focus:border-red-500 focus:ring-red-500/20': !!error,
        'border-ios-blue': isFocused && !error
      }"
      :aria-invalid="!!error"
      :aria-describedby="error ? `${id}-error` : undefined"
      min="18"
      max="120"
      required
    />
    
    <p 
      v-if="error" 
      :id="`${id}-error`"
      class="mt-1.5 text-sm sm:text-base text-red-500 transition-all duration-300"
      :class="{ 'opacity-0': !error }"
      role="alert"
    >
      {{ error }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useAgeValidation } from '~/composables/useAgeValidation'

interface Props {
  id: string
  label?: string
  modelValue: number | null
}

const props = withDefaults(defineProps<Props>(), {
  label: "Âge"
})

const emit = defineEmits<{
  'update:modelValue': [value: number | null]
  'error': [value: boolean]
}>()

const isFocused = ref(false)
const { error, validateAge } = useAgeValidation()

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  const value = target.value === '' ? null : Number(target.value)
  emit('update:modelValue', value)
  const { isValid, error: validationError } = validateAge(value)
  error.value = validationError
  emit('error', !isValid)
}

const onFocus = () => {
  isFocused.value = true
}

const onBlur = () => {
  isFocused.value = false
  const { isValid, error: validationError } = validateAge(props.modelValue)
  error.value = validationError
  emit('error', !isValid)
}

// Validation immédiate si une valeur est définie
watch(() => props.modelValue, (newValue) => {
  if (newValue === null || newValue === undefined) {
    emit('update:modelValue', null)
    return
  }
  const { isValid, error: validationError } = validateAge(newValue)
  error.value = validationError
  emit('error', !isValid)
}, { immediate: true })
</script>

<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type=number] {
  -moz-appearance: textfield;
}

/* Effet subtil au hover */
input:hover:not(:focus) {
  border-color: rgba(var(--ios-border-rgb), 0.8);
}

/* Optimisation des transitions */
@media (prefers-reduced-motion: reduce) {
  input, label {
    transition: none !important;
  }
}
</style> 