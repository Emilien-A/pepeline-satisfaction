<template>
  <div class="container mx-auto px-4 py-8">
    <!-- En-tête de la page -->
    <div class="text-center mb-8">
      <h1 class="text-2xl sm:text-3xl font-bold mb-2">Mon Profil</h1>
      <p class="text-ios-text-secondary">Renseignez vos informations personnelles</p>
    </div>

    <!-- Formulaire du profil -->
    <Card class="max-w-2xl mx-auto">
      <form @submit.prevent="submitProfile" class="space-y-6">
        <!-- Sélection du genre -->
        <div class="space-y-2">
          <label class="block text-sm font-medium text-ios-text-secondary">
            Genre
          </label>
          <div class="grid grid-cols-2 gap-3">
            <!-- Boutons de sélection du genre -->
            <button
              v-for="option in genderOptions"
              :key="option.value"
              type="button"
              class="px-4 py-2 rounded-ios text-center transition-all duration-300
                     hover:bg-ios-blue hover:text-white active:scale-[0.98]"
              :class="[
                profile.gender === option.value
                  ? 'bg-ios-blue text-white'
                  : 'bg-ios-card text-ios-text'
              ]"
              @click="selectGender(option.value)"
            >
              {{ option.label }}
            </button>
          </div>
        </div>

        <!-- Saisie de l'âge -->
        <div class="space-y-2">
          <AgeInput
            v-model="profile.age"
            :error="ageError"
            @update:error="updateAgeError"
          />
        </div>

        <!-- Type de voyageur -->
        <div class="space-y-2">
          <label class="block text-sm font-medium text-ios-text-secondary">
            Type de voyageur
          </label>
          <div class="grid grid-cols-2 gap-3">
            <!-- Boutons de sélection du type de voyageur -->
            <button
              v-for="option in travelerTypes"
              :key="option.value"
              type="button"
              class="px-4 py-2 rounded-ios text-center transition-all duration-300
                     hover:bg-ios-blue hover:text-white active:scale-[0.98]"
              :class="[
                profile.type === option.value
                  ? 'bg-ios-blue text-white'
                  : 'bg-ios-card text-ios-text'
              ]"
              @click="selectTravelerType(option.value)"
            >
              {{ option.label }}
            </button>
          </div>
        </div>

        <!-- But du voyage -->
        <div class="space-y-2">
          <label class="block text-sm font-medium text-ios-text-secondary">
            But du voyage
          </label>
          <div class="grid grid-cols-2 gap-3">
            <!-- Boutons de sélection du but du voyage -->
            <button
              v-for="option in travelPurposes"
              :key="option.value"
              type="button"
              class="px-4 py-2 rounded-ios text-center transition-all duration-300
                     hover:bg-ios-blue hover:text-white active:scale-[0.98]"
              :class="[
                profile.purpose === option.value
                  ? 'bg-ios-blue text-white'
                  : 'bg-ios-card text-ios-text'
              ]"
              @click="selectTravelPurpose(option.value)"
            >
              {{ option.label }}
            </button>
          </div>
        </div>

        <!-- Bouton de navigation -->
        <div class="flex justify-end pt-4">
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
import type { Gender, TravelerType, TravelPurpose, UserProfile } from '~/types'
import { usePassengerStore } from '~/stores/passenger'

// Initialisation du store et du router
const store = usePassengerStore()
const router = useRouter()

// Options pour les sélections
const genderOptions = [
  { value: 'male' as Gender, label: 'Homme' },
  { value: 'female' as Gender, label: 'Femme' }
]

const travelerTypes = [
  { value: 'regular' as TravelerType, label: 'Régulier' },
  { value: 'occasional' as TravelerType, label: 'Occasionnel' }
]

const travelPurposes = [
  { value: 'business' as TravelPurpose, label: 'Professionnel' },
  { value: 'leisure' as TravelPurpose, label: 'Loisir' }
]

// État local du formulaire
const profile = ref<UserProfile>({
  gender: null,
  age: null,
  type: null,
  purpose: null
} as unknown as UserProfile)

// État d'erreur pour l'âge
const ageError = ref('')

// Fonctions de sélection
function selectGender(value: Gender) {
  profile.value.gender = value
}

function selectTravelerType(value: TravelerType) {
  profile.value.type = value
}

function selectTravelPurpose(value: TravelPurpose) {
  profile.value.purpose = value
}

// Mise à jour de l'erreur d'âge
function updateAgeError(error: string) {
  ageError.value = error
}

// Validation du formulaire
const isFormValid = computed(() => {
  return (
    profile.value.gender !== null &&
    profile.value.age !== null &&
    profile.value.type !== null &&
    profile.value.purpose !== null &&
    !ageError.value
  )
})

// Soumission du formulaire
const submitProfile = () => {
  store.updateProfile({
    gender: profile.value.gender,
    age: profile.value.age,
    type: profile.value.type,
    purpose: profile.value.purpose
  });
  navigateTo('/flight');
};
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