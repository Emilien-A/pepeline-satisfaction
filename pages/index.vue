<template>
  <!-- Version mobile (s'affiche uniquement sur les écrans < 640px) -->
  <div v-if="isMobileView" class="min-h-screen bg-ios-background">
    <!-- En-tête mobile : Logo, titre et description -->
    <div class="pt-4 px-4">
      <!-- Logo cliquable pour activer le mode ATC (5 clics rapides) -->
      <img 
        src="/logo-pepeline.png" 
        alt="Logo Pepeline" 
        class="w-20 h-auto mx-auto mb-3"
        @click="handleLogoClick"
      />
      <!-- Titre dynamique qui change en "Mode ATC" quand activé -->
      <h1 class="text-2xl font-bold text-center mb-2">
        {{ isATCMode ? 'Mode ATC' : 'Prédiction de Satisfaction' }}
      </h1>
      <!-- Description du service -->
      <p class="text-ios-text-secondary text-center text-sm mb-4">
        Évaluez votre expérience de vol et obtenez une prédiction personnalisée
      </p>
    </div>

    <!-- Cartes version mobile : Format horizontal optimisé pour les petits écrans -->
    <div class="px-4 space-y-3">
      <!-- Boucle sur les étapes avec mise en page horizontale -->
      <Card v-for="(step, index) in steps" :key="index" 
            class="backdrop-blur-md bg-opacity-50 flex items-center p-4">
        <!-- Emoji à gauche -->
        <div class="text-3xl mr-4">{{ step.icon }}</div>
        <!-- Texte à droite -->
        <div>
          <h3 class="font-semibold mb-1">{{ step.title }}</h3>
          <p class="text-ios-text-secondary text-sm">{{ step.description }}</p>
        </div>
      </Card>
    </div>

    <!-- Bouton version mobile : Pleine largeur et optimisé pour le tactile -->
    <div class="px-4 mt-6">
      <NuxtLink 
        to="/profile" 
        class="bg-ios-blue text-white py-4 rounded-ios-lg shadow-ios
               transition-all duration-300 active:scale-[0.98]
               text-lg font-medium w-full text-center block"
      >
        Lancer l'évaluation
      </NuxtLink>
    </div>
  </div>

  <!-- Version desktop/tablette (s'affiche sur les écrans >= 640px) -->
  <div v-else class="relative min-h-[100dvh] flex flex-col">
    <!-- Logo et titre : Section supérieure -->
    <div class="flex flex-col items-center pt-6 sm:pt-8">
      <!-- Logo avec gestion du mode ATC -->
      <img 
        src="/logo-pepeline.png" 
        alt="Logo Pepeline" 
        class="w-24 sm:w-32 md:w-40 h-auto mb-4"
        @click="handleLogoClick"
      />
      <!-- Titre dynamique -->
      <h1 class="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-2">
        {{ isATCMode ? 'Mode ATC' : 'Prédiction de Satisfaction' }}
      </h1>
      <!-- Description responsive -->
      <p class="text-ios-text-secondary text-center text-sm sm:text-base md:text-lg max-w-md mx-auto px-4 mb-8">
        Évaluez votre expérience de vol et obtenez une prédiction personnalisée
      </p>
    </div>

    <!-- Contenu principal : Grille de cartes -->
    <div class="flex flex-col items-center px-4">
      <div class="w-full max-w-4xl">
        <!-- Grille responsive : 1 colonne sur mobile, 2 sur tablette, 3 sur desktop -->
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          <!-- Cartes des étapes avec mise en page verticale -->
          <Card v-for="(step, index) in steps" :key="index" class="backdrop-blur-md bg-opacity-50">
            <div class="flex flex-col items-center text-center space-y-4">
              <!-- Emoji centré -->
              <div class="w-12 h-12 flex items-center justify-center text-4xl">
                {{ step.icon }}
              </div>
              <!-- Titre de l'étape -->
              <h3 class="text-xl font-semibold">{{ step.title }}</h3>
              <!-- Description de l'étape -->
              <p class="text-ios-text-secondary">{{ step.description }}</p>
            </div>
          </Card>
        </div>

        <!-- Bouton Commencer : Adaptatif et centré -->
        <div class="flex justify-center mt-8">
          <NuxtLink 
            to="/profile" 
            class="bg-ios-blue text-white px-8 py-3 rounded-ios-lg shadow-ios transform-gpu
                   transition-all duration-300 hover:brightness-110 active:scale-[0.98]
                   text-lg font-medium w-full sm:w-auto min-w-[200px] text-center"
          >
            Lancer l'évaluation
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Imports et configuration
const router = useRouter()
const store = usePassengerStore()

// État pour le mode ATC (Easter egg)
const isATCMode = ref(false)
const clickCount = ref(0)
const clickTimer = ref<NodeJS.Timeout | null>(null)

// Détection de la vue mobile
const isMobileView = ref(false)

// Fonction pour détecter la largeur d'écran et mettre à jour isMobileView
function checkMobileView() {
  isMobileView.value = window.innerWidth < 640
}

// Gestion du cycle de vie du composant
onMounted(() => {
  // Initialisation de la détection mobile
  checkMobileView()
  // Écoute des changements de taille d'écran
  window.addEventListener('resize', checkMobileView)
})

// Nettoyage des événements lors de la destruction du composant
onUnmounted(() => {
  window.removeEventListener('resize', checkMobileView)
})

// Gestion des clics sur le logo pour le mode ATC
function handleLogoClick() {
  clickCount.value++
  
  // Réinitialiser le timer à chaque clic
  if (clickTimer.value) clearTimeout(clickTimer.value)
  
  // Activation du mode ATC après 5 clics rapides
  if (clickCount.value >= 5) {
    activateATCMode()
    clickCount.value = 0
  } else {
    // Réinitialisation du compteur après 1 seconde sans clic
    clickTimer.value = setTimeout(() => {
      clickCount.value = 0
    }, 1000)
  }
}

// Activation temporaire du mode ATC
function activateATCMode() {
  isATCMode.value = true
  // Désactivation automatique après 8 secondes
  setTimeout(() => {
    isATCMode.value = false
  }, 8000)
}

// Configuration des étapes du formulaire
const steps = [
  {
    icon: '👤',
    title: 'Profil',
    description: 'Renseignez quelques informations sur vous et votre voyage'
  },
  {
    icon: '✈️',
    title: 'Vol',
    description: 'Donnez-nous les détails de votre vol'
  },
  {
    icon: '⭐',
    title: 'Services',
    description: 'Évaluez les différents services proposés pendant votre vol'
  }
]

// Navigation vers la page de profil
function startEvaluation() {
  router.push('/profile')
}
</script>

<style scoped>
/* Styles pour le mode ATC */
.atc-mode {
  background-color: #001100;
  transition: background-color 0.5s ease;
}

/* Style du texte en mode terminal */
.terminal-text {
  font-family: monospace;
}

/* Effet de lueur verte en mode ATC */
.atc-mode .terminal-text {
  color: #33ff33 !important;
  text-shadow: 0 0 5px #33ff33;
}

/* Configuration de l'arrière-plan radar */
.radar-background {
  position: fixed;
  inset: 0;
  z-index: 0;
  background: transparent;
}

/* Ligne de balayage radar */
.radar-line {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 2px;
  background: #33ff33;
  box-shadow: 0 0 10px #33ff33;
  transform-origin: left;
  animation: radar-sweep 4s linear infinite;
}

/* Points de détection radar */
.blip {
  position: absolute;
  width: 6px;
  height: 6px;
  background: #33ff33;
  border-radius: 50%;
  left: var(--x);
  top: var(--y);
  opacity: 0;
  box-shadow: 0 0 10px #33ff33;
  animation: blip-fade 4s ease-out infinite;
  animation-delay: var(--delay);
}

/* Effet d'écran ATC */
.atc-screen {
  filter: brightness(1.2) contrast(1.2) sepia(0.3) hue-rotate(70deg);
  animation: screen-flicker 0.1s infinite;
}

/* Animation de balayage radar */
@keyframes radar-sweep {
  from {
    transform: rotate(0deg);
    width: 100vw;
  }
  to {
    transform: rotate(360deg);
    width: 100vw;
  }
}

/* Animation des points de détection */
@keyframes blip-fade {
  0%, 100% { opacity: 0; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.5); }
}

/* Animation de scintillement d'écran */
@keyframes screen-flicker {
  0% { opacity: 1; }
  50% { opacity: 0.98; }
  100% { opacity: 1; }
}

/* Animations diverses */
.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animate-spin-fast {
  animation: spin 0.5s linear infinite;
}

.animate-bounce-rotate {
  animation: bounceRotate 1s ease-in-out infinite;
}

.rainbow-mode {
  animation: rainbow 5s linear infinite;
}

/* Animation de rebond avec rotation */
@keyframes bounceRotate {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-30px) rotate(180deg);
  }
}

/* Animation arc-en-ciel */
@keyframes rainbow {
  0% { background-color: rgba(255, 0, 0, 0.1); }
  20% { background-color: rgba(255, 165, 0, 0.1); }
  40% { background-color: rgba(255, 255, 0, 0.1); }
  60% { background-color: rgba(0, 255, 0, 0.1); }
  80% { background-color: rgba(0, 0, 255, 0.1); }
  100% { background-color: rgba(255, 0, 0, 0.1); }
}

/* Styles des boutons */
button {
  position: relative;
  overflow: hidden;
  backdrop-filter: none;
}

/* Effet de survol des boutons */
button::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
  opacity: 0;
  transition: opacity 0.2s ease;
}

button:hover::before {
  opacity: 1;
}

button:hover {
  box-shadow: 0 0 15px rgba(255, 255, 255, 0.1);
}

button:active {
  transform: scale(0.97);
}

/* Configuration du conteneur radar */
.radar-container {
  position: fixed;
  inset: 0;
  background-color: #001100;
  overflow: hidden;
}

/* Grille radar */
.radar-grid {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Cercles radar */
.radar-circle {
  position: absolute;
  border: 1px solid rgba(51, 255, 51, 0.3);
  border-radius: 50%;
  width: 100vmin;
  height: 100vmin;
  transform: scale(var(--scale));
}

/* Lignes de référence radar */
.radar-x, .radar-y {
  position: absolute;
  background-color: rgba(51, 255, 51, 0.3);
}

.radar-x {
  width: 100%;
  height: 1px;
}

.radar-y {
  width: 1px;
  height: 100%;
}

/* Points d'avion sur le radar */
.plane-blip {
  position: absolute;
  top: 50%;
  left: 50%;
  font-size: 1.2rem;
  opacity: 0.7;
  transform-origin: center;
  animation: plane-move var(--speed) linear infinite;
  animation-delay: var(--delay);
  background: none;
  -webkit-text-stroke: 1px rgba(51, 255, 51, 0.3);
  text-shadow: 0 0 8px rgba(51, 255, 51, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Animation des points d'avion */
@keyframes plane-move {
  from {
    transform: rotate(var(--angle)) translateX(0) rotate(calc(-1 * var(--angle)));
    opacity: 0;
  }
  50% {
    opacity: 0.7;
  }
  to {
    transform: rotate(var(--angle)) translateX(var(--distance)) rotate(calc(-1 * var(--angle)));
    opacity: 0;
  }
}

/* Styles des cartes */
:deep(.card) {
  background: rgba(var(--ios-card-rgb), 0.3);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(51, 255, 51, 0.2);
}

/* Effet de lueur sur les cartes en mode ATC */
.atc-mode :deep(.card) {
  box-shadow: 0 0 15px rgba(51, 255, 51, 0.1);
}

/* Points de détection radar */
.radar-blip {
  position: absolute;
  width: 6px;
  height: 6px;
  background: #33ff33;
  border-radius: 50%;
  box-shadow: 0 0 8px #33ff33;
  opacity: 0.7;
  top: var(--start-y);
  left: var(--start-x);
  display: none;
  animation: blip-move var(--duration) linear infinite;
  animation-delay: var(--delay);
  z-index: 2;
}

/* Affichage des points uniquement en mode ATC */
.atc-mode .radar-blip {
  display: block;
}

/* Animation des points de détection */
@keyframes blip-move {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(var(--move-x), var(--move-y));
  }
}

/* Transitions de page */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.5s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}

/* Styles spécifiques au mode ATC */
.atc-content {
  backdrop-filter: none;
  transition: all 0.5s ease;
}

.atc-mode .card {
  backdrop-filter: blur(8px);
  background: rgba(var(--ios-card-rgb), 0.3);
  border: 1px solid rgba(51, 255, 51, 0.1);
  box-shadow: 0 0 20px rgba(51, 255, 51, 0.05);
}

.atc-mode {
  background: rgb(0, 20, 0);
}

/* Transitions de page globales */
::v-deep(.page-enter-active),
::v-deep(.page-leave-active) {
  transition: all 0.5s cubic-bezier(0.33, 1, 0.68, 1);
}

::v-deep(.page-enter-from) {
  opacity: 0;
  transform: translateY(100%);
}

::v-deep(.page-leave-to) {
  opacity: 0;
  transform: translateY(-100%);
}

/* Ajustement des z-index */
.container {
  position: relative;
  z-index: 10;
}

/* Styles des boutons version Apple */
button {
  transform: translateY(0);
  transition: all 0.3s cubic-bezier(0.33, 1, 0.68, 1);
}

button:active {
  transform: translateY(2px);
}

/* Styles spécifiques mobile */
@media (max-width: 639px) {
  .card {
    transform: none !important;
    transition: background-color 0.3s ease;
  }
  
  .card:active {
    background-color: rgba(0, 0, 0, 0.05);
  }
}
</style> 