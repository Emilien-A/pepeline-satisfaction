<template>
  <button
    :class="[
      'px-6 py-2 rounded-ios transition-colors',
      variant === 'primary' ? 'bg-ios-blue hover:bg-ios-blue-dark text-white' : 'bg-ios-card border border-ios-border',
      { 'opacity-50 cursor-not-allowed': disabled }
    ]"
    :disabled="disabled"
    v-bind="$attrs"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
defineProps<{
  variant?: 'primary' | 'secondary'
  disabled?: boolean
}>()
</script> 