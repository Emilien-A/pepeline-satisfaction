<template>
  <div class="flex space-x-4">
    <button
      v-for="option in options"
      :key="option.value"
      @click="$emit('update:modelValue', option.value)"
      class="flex-1 py-2 px-4 rounded-ios border border-ios-border transition-colors"
      :class="modelValue === option.value ? 'bg-ios-blue border-ios-blue' : 'bg-ios-card'"
    >
      {{ option.label }}
    </button>
  </div>
</template>

<script setup lang="ts">
interface Option<T extends string> {
  value: T
  label: string
}

interface ToggleGroupProps<T extends string> {
  modelValue: T
  options: Option<T>[]
}

const props = defineProps<ToggleGroupProps<string>>()

defineEmits<{
  'update:modelValue': [value: string]
}>()</script> 