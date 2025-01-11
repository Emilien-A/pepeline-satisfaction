<template>
  <Transition name="feedback">
    <div 
      v-if="show"
      class="fixed bottom-4 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-ios backdrop-blur-xl
             shadow-lg z-50 flex items-center gap-3 max-w-md w-full mx-4"
      :class="[
        type === 'success' ? 'bg-green-500/20 border border-green-500/30' :
        type === 'error' ? 'bg-red-500/20 border border-red-500/30' :
        'bg-ios-blue/20 border border-ios-blue/30'
      ]"
    >
      <!-- Icône -->
      <div 
        class="w-8 h-8 rounded-full flex items-center justify-center"
        :class="[
          type === 'success' ? 'bg-green-500' :
          type === 'error' ? 'bg-red-500' :
          'bg-ios-blue'
        ]"
      >
        <span v-if="type === 'success'">✓</span>
        <span v-else-if="type === 'error'">!</span>
        <span v-else>i</span>
      </div>

      <!-- Message -->
      <p class="flex-1 text-sm">{{ message }}</p>

      <!-- Bouton fermer -->
      <button 
        @click="$emit('close')"
        class="w-6 h-6 rounded-full flex items-center justify-center hover:bg-white/10"
      >
        ×
      </button>
    </div>
  </Transition>
</template>

<script setup lang="ts">
defineProps<{
  show: boolean
  message: string
  type?: 'success' | 'error' | 'info'
}>()

defineEmits<{
  close: []
}>()
</script>

<style scoped>
.feedback-enter-active,
.feedback-leave-active {
  transition: all 0.3s ease-out;
}

.feedback-enter-from {
  opacity: 0;
  transform: translate(-50%, 20px);
}

.feedback-leave-to {
  opacity: 0;
  transform: translate(-50%, -20px);
}
</style> 