<template>
  <div 
    class="bg-black/10 backdrop-blur-xl border border-white/10 rounded-ios-lg shadow-ios transform-gpu
           p-4 sm:p-5 md:p-6 transition-all duration-300 ease-out"
    :class="{ 
      'hover:bg-black/20 active:scale-[0.98] cursor-pointer': interactive,
      'sm:hover:scale-[1.02]': interactive
    }"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  interactive?: boolean
}>()
</script>

<style scoped>
.backdrop-blur-xl {
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  will-change: transform, backdrop-filter;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  transform: translateZ(0);
}

/* Optimisation des transitions */
@media (prefers-reduced-motion: reduce) {
  .transform-gpu {
    transform: none !important;
    transition: none !important;
  }
}
</style> 