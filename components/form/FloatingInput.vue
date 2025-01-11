<template>
  <div class="relative">
    <label 
      :for="id" 
      class="absolute text-ios-text-secondary text-sm transition-all duration-300 ease-out origin-left"
      :class="[
        isFocused || modelValue ? 
        '-top-6 left-0 scale-90 text-ios-blue' : 
        'top-2.5 left-4 cursor-text'
      ]"
    >
      {{ label }}
      <span v-if="unit" class="text-sm">({{ unit }})</span>
    </label>
    
    <input
      :id="id"
      type="number"
      :value="modelValue"
      @input="onInput"
      @focus="onFocus"
      @blur="onBlur"
      :placeholder="isFocused ? placeholder : ''"
      class="w-full bg-ios-card border border-ios-border rounded-ios 
             px-4 py-2.5 transition-all duration-300 ease-out placeholder:text-ios-text-secondary/50
             focus:border-ios-blue focus:ring-2 focus:ring-ios-blue/20
             active:scale-[0.98] active:brightness-90
             [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
      :class="{ 
        'border-red-500 focus:border-red-500 focus:ring-red-500/20': !!error,
        'border-ios-blue': isFocused && !error
      }"
      :min="min"
      :max="max"
      :required="required"
    />
    
    <p 
      v-if="error" 
      class="mt-2 text-sm text-red-500 transition-all duration-300"
      :class="{ 'opacity-0': !error }"
      role="alert"
    >
      {{ error }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  id: string
  label: string
  modelValue: number | null
  unit?: string
  min?: number
  max?: number
  required?: boolean
  placeholder?: string
}

const props = withDefaults(defineProps<Props>(), {
  unit: undefined,
  min: 0,
  max: undefined,
  required: false,
  placeholder: ''
})

const emit = defineEmits<{
  'update:modelValue': [value: number | null]
  'error': [value: boolean]
}>()

const isFocused = ref(false)
const error = ref<string>('')

const validate = (value: number | null): boolean => {
  if (props.required && (value === null || value === 0 || isNaN(value))) {
    error.value = "Ce champ est requis"
    return false
  }
  if (value !== null) {
    if (props.min !== undefined && value < props.min) {
      error.value = `La valeur minimale est ${props.min}${props.unit ? ' ' + props.unit : ''}`
      return false
    }
    if (props.max !== undefined && value > props.max) {
      error.value = `La valeur maximale est ${props.max}${props.unit ? ' ' + props.unit : ''}`
      return false
    }
  }
  error.value = ''
  return true
}

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  const value = target.value === '' ? null : Number(target.value)
  emit('update:modelValue', value)
  const isValid = validate(value)
  emit('error', !isValid)
}

const onFocus = () => {
  isFocused.value = true
}

const onBlur = () => {
  isFocused.value = false
  const isValid = validate(props.modelValue)
  emit('error', !isValid)
}
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
</style> 