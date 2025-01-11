import { computed } from 'vue'

export function useTransitions() {
  const prefersReducedMotion = computed(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  })

  const transitionClasses = computed(() => ({
    'transition-all duration-300 ease-out': !prefersReducedMotion.value
  }))

  const transformClasses = computed(() => ({
    'transform-gpu': !prefersReducedMotion.value
  }))

  const hoverClasses = computed(() => ({
    'hover:scale-[1.02] active:scale-[0.98]': !prefersReducedMotion.value
  }))

  return {
    prefersReducedMotion,
    transitionClasses,
    transformClasses,
    hoverClasses
  }
} 