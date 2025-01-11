<template>
  <div class="flex items-center space-x-1">
    <button
      v-for="star in 5"
      :key="star"
      @click="updateRating(star)"
      class="text-2xl focus:outline-none transition-colors"
      :class="star <= modelValue ? 'text-yellow-400' : 'text-ios-text-secondary'"
    >
      ★
    </button>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: number
}>()

const emit = defineEmits<{
  'update:modelValue': [value: number]
}>()

const updateRating = (rating: number) => {
  emit('update:modelValue', rating)
}
</script> 