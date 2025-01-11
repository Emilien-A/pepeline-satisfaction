<template>
  <div class="container mx-auto px-4 py-8">
    <!-- En-tête de la page -->
    <div class="text-center mb-8">
      <h1 class="text-2xl sm:text-3xl font-bold mb-2">Détails du Vol</h1>
      <p class="text-ios-text-secondary">Renseignez les informations de votre vol</p>
    </div>

    <!-- Formulaire des détails du vol -->
    <Card class="max-w-2xl mx-auto">
      <form @submit.prevent="submitFlightDetails" class="space-y-6">
        <!-- Sélection de la classe -->
        <div class="space-y-2">
          <label class="block text-sm font-medium text-ios-text-secondary">
            Classe
          </label>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <!-- Boutons de sélection de classe -->
            <button
              v-for="option in flightClasses"
              :key="option.value"
              type="button"
              class="px-4 py-2 rounded-ios text-center transition-all duration-300
                     hover:bg-ios-blue hover:text-white active:scale-[0.98]"
              :class="[
                flight.class === option.value
                  ? 'bg-ios-blue text-white'
                  : 'bg-ios-card text-ios-text'
              ]"
              @click="selectClass(option.value)"
            >
              {{ option.label }}
            </button>
          </div>
        </div>

        <!-- Champs de saisie des détails du vol -->
        <div class="space-y-4">
          <!-- Distance de vol -->
          <FloatingInput
            v-model="flight.distance"
            label="Distance de vol"
            unit="km"
            :min="0"
            :max="20000"
            required
            placeholder="Entrez la distance"
            :error="distanceError"
          />

          <!-- Retard au départ -->
          <FloatingInput
            v-model="flight.departureDelay"
            label="Retard au départ"
            unit="min"
            :min="0"
            :max="1440"
            required
            placeholder="Entrez le retard"
            :error="departureDelayError"
          />

          <!-- Retard à l'arrivée -->
          <FloatingInput
            v-model="flight.arrivalDelay"
            label="Retard à l'arrivée"
            unit="min"
            :min="0"
            :max="1440"
            required
            placeholder="Entrez le retard"
            :error="arrivalDelayError"
          />
        </div>

        <!-- Boutons de navigation -->
        <div class="flex justify-between pt-4">
          <!-- Bouton Précédent -->
          <NuxtLink 
            to="/profile"
            class="bg-ios-blue text-white px-6 py-2 rounded-ios-lg shadow-ios
                   transition-all duration-300 hover:brightness-110 active:scale-[0.98]"
          >
            Précédent
          </NuxtLink>

          <!-- Bouton Suivant (actif si le formulaire est valide) -->
          <button
            type="submit"
            :disabled="!isFormValid"
            class="bg-ios-blue text-white px-6 py-2 rounded-ios-lg shadow-ios
                   transition-all duration-300 hover:brightness-110 active:scale-[0.98]
                   disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Suivant
          </button>
        </div>
      </form>
    </Card>
  </div>
</template>

<script setup lang="ts">
// Import des types et du store
import type { FlightClass, FlightDetails } from '~/types'
import { usePassengerStore } from '~/stores/passenger'

// Initialisation du store et du router
const store = usePassengerStore()
const router = useRouter()

// Options de classe de vol
const flightClasses = [
  { value: 'business' as FlightClass, label: 'Business' },
  { value: 'eco_plus' as FlightClass, label: 'Eco+' },
  { value: 'eco' as FlightClass, label: 'Eco' }
]

// État local du formulaire
const flight = ref<FlightDetails>({
  class: null,
  distance: null,
  departureDelay: null,
  arrivalDelay: null
})

// États d'erreur pour chaque champ
const distanceError = ref('')
const departureDelayError = ref('')
const arrivalDelayError = ref('')

// Sélection de la classe de vol
const selectClass = (value: FlightClass) => {
  flight.value.class = value
}

// Validation du formulaire
const isFormValid = computed(() => {
  return (
    flight.value.class &&
    flight.value.distance !== null &&
    flight.value.departureDelay !== null &&
    flight.value.arrivalDelay !== null &&
    !distanceError.value &&
    !departureDelayError.value &&
    !arrivalDelayError.value
  )
})

// Soumission du formulaire
async function submitFlightDetails() {
  if (isFormValid.value) {
    await store.updateFlight(flight.value)
    router.push('/services')
  }
}

// Surveillance des changements pour la validation
watch(() => flight.value.distance, (value) => {
  if (value === null || value < 0) {
    distanceError.value = 'La distance doit être positive'
  } else if (value > 20000) {
    distanceError.value = 'La distance maximale est de 20 000 km'
  } else {
    distanceError.value = ''
  }
})

watch(() => flight.value.departureDelay, (value) => {
  if (value === null || value < 0) {
    departureDelayError.value = 'Le retard ne peut pas être négatif'
  } else if (value > 1440) {
    departureDelayError.value = 'Le retard maximum est de 24h (1440 min)'
  } else {
    departureDelayError.value = ''
  }
})

watch(() => flight.value.arrivalDelay, (value) => {
  if (value === null || value < 0) {
    arrivalDelayError.value = 'Le retard ne peut pas être négatif'
  } else if (value > 1440) {
    arrivalDelayError.value = 'Le retard maximum est de 24h (1440 min)'
  } else {
    arrivalDelayError.value = ''
  }
})
</script>

<style scoped>
/* Support des préférences de réduction de mouvement */
@media (prefers-reduced-motion: reduce) {
  button {
    transition: none;
    transform: none !important;
  }
}
</style> 