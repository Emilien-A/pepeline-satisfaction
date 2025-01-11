<template>
  <div class="w-full mb-8">
    <!-- Étapes -->
    <div class="flex justify-between mb-2">
      <div v-for="(step, index) in steps" :key="index" class="flex flex-col items-center">
        <div 
          class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300"
          :class="[
            currentStep >= index 
              ? 'bg-ios-blue text-white' 
              : 'bg-ios-card text-ios-text-secondary'
          ]"
        >
          {{ index + 1 }}
        </div>
        <span 
          class="text-xs mt-1 transition-colors duration-300"
          :class="currentStep >= index ? 'text-ios-text' : 'text-ios-text-secondary'"
        >
          {{ step }}
        </span>
      </div>
    </div>

    <!-- Barre de progression -->
    <div class="relative h-2 bg-ios-card rounded-full overflow-hidden">
      <div 
        class="absolute top-0 left-0 h-full bg-ios-blue transition-all duration-500 ease-out"
        :style="{ width: `${progress}%` }"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  currentStep: number
}>()

const steps = ['Profil', 'Vol', 'Services']
const progress = computed(() => (props.currentStep / (steps.length - 1)) * 100)
</script> 