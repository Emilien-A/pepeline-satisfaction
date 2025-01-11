<template>
  <Transition name="fade">
    <p 
      v-if="message" 
      class="text-red-500 text-sm mt-1" 
      role="alert"
      :id="id"
    >
      {{ message }}
    </p>
  </Transition>
</template>

<script setup lang="ts">
import type { ErrorMessageProps } from '~/types/components'

defineProps<ErrorMessageProps>()</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style> 