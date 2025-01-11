<template>
  <div class="container mx-auto px-4 min-h-screen flex items-center">
    <!-- Carte de succès centrée verticalement -->
    <Card class="max-w-3xl mx-auto w-full py-12 px-8">
      <!-- Logo Pepeline avec effet de survol -->
      <img 
        src="/logo.png" 
        alt="Pepeline" 
        class="h-20 mx-auto mb-8 transition-transform duration-300 hover:scale-105"
      />

      <!-- Message de satisfaction avec emoji dynamique -->
      <div class="text-center mb-8">
        <div class="text-7xl mb-4">
          {{ getSatisfactionEmoji }}
        </div>
        <h1 class="text-3xl font-bold mb-4">
          {{ getThankYouMessage }}
        </h1>
        <p class="text-ios-text-secondary text-lg">
          {{ getPersonalizedMessage }}
        </p>
      </div>

      <!-- Statistiques moyennes -->
      <div class="text-center mb-8">
        <p class="text-xl">
          Note moyenne : 
          <span class="font-bold text-2xl">
            {{ averageRating.toFixed(1) }}/5
          </span>
        </p>
      </div>

      <!-- Bouton de retour à l'accueil -->
      <div class="text-center">
        <NuxtLink 
          to="/"
          class="bg-ios-blue text-white px-8 py-3 rounded-ios-lg shadow-ios inline-block
                 transition-all duration-300 hover:brightness-110 active:scale-[0.98]"
        >
          Retour à l'accueil
        </NuxtLink>
      </div>
    </Card>
  </div>
</template>

<script setup lang="ts">
// Import du store
import { usePassengerStore } from '~/stores/passenger'

// Initialisation du store
const store = usePassengerStore()

// Calcul de la note moyenne
const averageRating = computed(() => {
  const ratings = Object.values(store.ratings)
  return ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length
})

// Obtention de l'emoji en fonction de la note moyenne
const getSatisfactionEmoji = computed(() => {
  const rating = averageRating.value
  if (rating >= 4.5) return '🤩' // Excellent
  if (rating >= 3.5) return '😊' // Satisfait
  if (rating >= 2.5) return '😐' // Neutre
  return '😔' // Insatisfait
})

// Message de remerciement personnalisé selon la note
const getThankYouMessage = computed(() => {
  const rating = averageRating.value
  if (rating >= 4.5) return 'Merci pour votre excellente évaluation !'
  if (rating >= 3.5) return 'Merci pour votre retour positif !'
  if (rating >= 2.5) return 'Merci pour votre évaluation !'
  return 'Merci pour votre retour !'
})

// Message détaillé personnalisé selon la note
const getPersonalizedMessage = computed(() => {
  const rating = averageRating.value
  if (rating >= 4.5) {
    return 'Nous sommes ravis que votre expérience ait été exceptionnelle. Vos retours nous aident à maintenir ce niveau d\'excellence.'
  }
  if (rating >= 3.5) {
    return 'Votre satisfaction est importante pour nous. Nous continuerons à améliorer nos services pour vous offrir une expérience encore meilleure.'
  }
  if (rating >= 2.5) {
    return 'Nous prenons en compte vos commentaires pour améliorer nos services et mieux répondre à vos attentes.'
  }
  return 'Nous regrettons que votre expérience n\'ait pas été à la hauteur. Vos retours nous aideront à nous améliorer significativement.'
})
</script>

<style scoped>
/* Support des préférences de réduction de mouvement */
@media (prefers-reduced-motion: reduce) {
  img, 
  a {
    transition: none;
    transform: none !important;
  }
}
</style> 