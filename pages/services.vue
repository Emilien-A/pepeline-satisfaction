<template>
  <div class="container mx-auto px-4 py-8">
    <!-- En-tête de la page -->
    <div class="text-center mb-8">
      <h1 class="text-2xl sm:text-3xl font-bold mb-2">Évaluation des Services</h1>
      <p class="text-ios-text-secondary">Notez chaque service de votre vol</p>
    </div>

    <!-- Grille des services à évaluer -->
    <div class="grid gap-6 max-w-2xl mx-auto">
      <!-- Carte pour chaque service avec gestion du swipe -->
      <Card v-for="(rating, id) in ratings" :key="id" class="service-card relative">
        <!-- Zone de swipe pour la notation rapide -->
        <div 
          class="absolute inset-0" 
          @touchstart="handleTouchStart"
          @touchmove="handleTouchMove($event, id)"
          @touchend="handleTouchEnd"
        ></div>

        <!-- Contenu de la carte -->
        <div class="flex flex-col space-y-4">
          <!-- Titre du service (WiFi, Restauration, etc.) -->
          <h2 class="text-xl font-semibold text-center">{{ getServiceTitle(id) }}</h2>
          
          <!-- Système de notation avec emojis -->
          <div class="flex justify-center space-x-6">
            <!-- Boutons de notation rapide (😐 = 1, 😊 = 3, 🤩 = 5) -->
            <button 
              v-for="value in [1, 3, 5]" 
              :key="value"
              class="rating-btn text-2xl"
              :class="{ 'active': rating === value }"
              @click="quickRate(id, value)"
            >
              {{ getRatingEmoji(value) }}
            </button>
          </div>

          <!-- Indicateur de swipe avec instructions -->
          <div class="text-center text-sm text-ios-text-secondary">
            {{ swipeDirections[id] ? 
              (swipeDirections[id] === 'left' ? '← Swipez à gauche pour 1 étoile' : 
               swipeDirections[id] === 'right' ? '→ Swipez à droite pour 5 étoiles' : '') : 
              'Swipez ou cliquez pour noter' }}
          </div>
        </div>
      </Card>
    </div>

    <!-- Boutons de navigation -->
    <div class="flex justify-between mt-8 max-w-2xl mx-auto">
      <!-- Bouton Précédent vers la page des détails du vol -->
      <NuxtLink 
        to="/flight"
        class="bg-ios-blue text-white px-6 py-2 rounded-ios-lg shadow-ios
               transition-all duration-300 hover:brightness-110 active:scale-[0.98]"
      >
        Précédent
      </NuxtLink>

      <!-- Bouton Terminer (actif uniquement si tous les services sont notés) -->
      <button 
        @click="submitRatings"
        :disabled="!areAllServicesRated"
        class="bg-ios-blue text-white px-6 py-2 rounded-ios-lg shadow-ios
               transition-all duration-300 hover:brightness-110 active:scale-[0.98]
               disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Terminer
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
// Import des types et du store
import type { ServiceRatings } from '~/types'
import { usePassengerStore } from '~/stores/passenger'

// Initialisation du store et du router
const store = usePassengerStore()
const router = useRouter()

// État local pour les notations et les directions de swipe
const ratings = ref<ServiceRatings>(store.ratings || {
  wifi: 0,
  food: 0,
  entertainment: 0,
  comfort: 0,
  crew: 0
})
const swipeDirections = ref<Record<string, string>>({})

// Position initiale pour le swipe
let touchStartX = 0

// Gestion du début du swipe
function handleTouchStart(event: TouchEvent) {
  touchStartX = event.touches[0].clientX
}

// Gestion du mouvement pendant le swipe
function handleTouchMove(event: TouchEvent, id: keyof ServiceRatings) {
  const touchCurrentX = event.touches[0].clientX
  const diffX = touchCurrentX - touchStartX
  
  // Détermination de la direction du swipe (seuil de 20px)
  if (Math.abs(diffX) > 20) {
    swipeDirections.value[id] = diffX > 0 ? 'right' : 'left'
  } else {
    swipeDirections.value[id] = ''
  }
}

// Gestion de la fin du swipe
function handleTouchEnd(event: TouchEvent) {
  const touchEndX = event.changedTouches[0].clientX
  const diffX = touchEndX - touchStartX
  
  // Application de la note si le swipe est suffisant (seuil de 50px)
  if (Math.abs(diffX) > 50) {
    const id = Object.keys(swipeDirections.value).find(
      key => swipeDirections.value[key] !== ''
    ) as keyof ServiceRatings
    
    if (id) {
      quickRate(id, diffX > 0 ? 5 : 1)
      swipeDirections.value[id] = ''
    }
  }
}

// Notation rapide d'un service
function quickRate(id: keyof ServiceRatings, value: number) {
  ratings.value[id] = value
}

// Vérification si tous les services sont notés
const areAllServicesRated = computed(() => {
  return Object.values(ratings.value).every(rating => rating > 0)
})

// Obtention de l'emoji correspondant à la note
function getRatingEmoji(value: number): string {
  switch (value) {
    case 1: return '😐' // Note basse
    case 3: return '😊' // Note moyenne
    case 5: return '🤩' // Note excellente
    default: return ''
  }
}

// Obtention du titre du service
function getServiceTitle(id: string): string {
  const titles: Record<string, string> = {
    wifi: 'WiFi à bord',
    food: 'Restauration',
    entertainment: 'Divertissement',
    comfort: 'Confort',
    crew: 'Équipage'
  }
  return titles[id]
}

// Soumission des notations et navigation vers la page de succès
async function submitRatings() {
  if (areAllServicesRated.value) {
    await store.updateRatings(ratings.value)
    router.push('/success')
  }
}
</script>

<style scoped>
/* Style des cartes de service avec effet d'échelle */
.service-card {
  transform: scale(0.97);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Animation au survol des cartes */
.service-card:hover {
  transform: scale(1);
}

/* Style des boutons de notation avec emojis */
.rating-btn {
  position: relative;
  padding: 0.5rem;
  opacity: 0.7;
  transition: all 0.2s ease;
  cursor: pointer;
  background: none;
}

/* État actif des boutons de notation */
.rating-btn.active {
  opacity: 1;
  transform: scale(1.1);
}

/* Animation au survol des boutons */
.rating-btn:hover {
  opacity: 1;
  transform: scale(1.1);
}

/* Animation au clic des boutons */
.rating-btn:active {
  transform: scale(0.95);
}

/* Support des préférences de réduction de mouvement */
@media (prefers-reduced-motion: reduce) {
  .service-card,
  .rating-btn {
    transition: none;
    transform: none;
  }
  
  .service-card:hover,
  .rating-btn:hover,
  .rating-btn.active,
  .rating-btn:active {
    transform: none;
  }
}
</style> 