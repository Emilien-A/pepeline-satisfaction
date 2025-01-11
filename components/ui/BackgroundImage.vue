<template>
  <div class="fixed inset-0 w-full h-full -z-10">
    <!-- Placeholder pendant le chargement -->
    <div
      v-show="!imageLoaded"
      class="absolute inset-0 bg-gradient-to-br from-ios-bg to-ios-bg/50"
    />
    
    <!-- Image de fond -->
    <div
      ref="backgroundEl"
      class="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-700"
      :class="{ 'opacity-0': !imageLoaded }"
      :style="{ backgroundImage: `url('${src}')` }"
    />

    <!-- Message d'erreur -->
    <div
      v-if="imageError"
      class="absolute inset-0 flex items-center justify-center bg-ios-bg/80"
    >
      <p class="text-ios-text-secondary">
        Impossible de charger l'image de fond
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useImageLoader } from '~/composables/useImageLoader'

const props = defineProps<{
  src: string
}>()

const { imageLoaded, imageError, loadImage } = useImageLoader()
const backgroundEl = ref<HTMLElement | null>(null)

// Chargement de l'image avec Intersection Observer
onMounted(() => {
  if (!backgroundEl.value) return

  const observer = new IntersectionObserver(async (entries) => {
    const entry = entries[0]
    if (entry.isIntersecting) {
      try {
        await loadImage(props.src)
      } catch (error) {
        console.error('Erreur de chargement de l\'image:', error)
      }
      observer.disconnect()
    }
  })

  observer.observe(backgroundEl.value)
})</script> 