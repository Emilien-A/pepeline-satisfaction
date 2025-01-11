<template>
  <div class="flex flex-col space-y-2">
    <label v-if="label" class="text-ios-text-secondary">
      {{ label }}
      <span v-if="unit" class="text-sm">({{ unit }})</span>
      <ScreenReaderText v-if="required">Champ requis</ScreenReaderText>
    </label>
    <input
      type="number"
      :value="modelValue"
      @input="onInput"
      @blur="validate"
      class="w-full bg-ios-card border border-ios-border rounded-ios px-4 py-2 transition-colors"
      :class="{ 'border-red-500': !!error }"
      v-bind="$attrs"
      :aria-invalid="!!error"
      :aria-describedby="error ? `${id}-error` : undefined"
      :min="min"
      :max="max"
      :required="required"
    />
    <ErrorMessage :message="error" :id="`${id}-error`" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useFormValidation } from '~/composables/useFormValidation'
import type { NumberInputProps } from '~/types/components'

const props = withDefaults(defineProps<{
  id: string
  label?: string
  unit?: string
  modelValue: number | null
  min?: number
  max?: number
  required?: boolean
}>(), {
  min: 0,
  max: undefined,
  required: false,
  label: undefined,
  unit: undefined
})

const emit = defineEmits<{
  'update:modelValue': [value: number | null]
}>()

const { rules, validate: validateField } = useFormValidation()
const error = ref<string>('')

const validate = () => {
  const validationRules = []
  if (props.required) {
    validationRules.push(rules.required())
  }
  if (props.min !== undefined) {
    validationRules.push(rules.min(props.min))
  }
  if (props.max !== undefined) {
    validationRules.push(rules.max(props.max))
  }

  const isValid = validateField(props.id, props.modelValue, validationRules)
  error.value = isValid ? '' : validationRules[0].message
}

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  const value = target.value === '' ? null : Number(target.value)
  emit('update:modelValue', value)
  error.value = ''
}</script> 