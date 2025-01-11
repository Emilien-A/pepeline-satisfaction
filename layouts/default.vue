<template>
  <div class="min-h-screen min-h-[100dvh] bg-ios-background text-ios-text overflow-x-hidden">
    <BackgroundImage src="/background.png" />
    <div class="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
      <main class="relative w-full max-w-4xl mx-auto">
        <NuxtPage />
      </main>
    </div>
  </div>
</template>

<style>
:root {
  --ios-background: #000000;
  --ios-card: rgba(28, 28, 30, 0.6);
  --ios-border: rgba(84, 84, 88, 0.65);
  --ios-text: #ffffff;
  --ios-text-secondary: rgba(235, 235, 245, 0.6);
  --ios-blue: #0A84FF;
}

/* Optimisations de performance */
* {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-tap-highlight-color: transparent;
}

/* Fix pour la hauteur sur mobile */
html, body {
  height: 100%;
  height: 100dvh;
  overscroll-behavior-y: none;
}

.transform-gpu {
  transform: translateZ(0);
  backface-visibility: hidden;
  perspective: 1000px;
}

/* Transitions de page */
.page-enter-active,
.page-leave-active {
  transition: all 0.35s cubic-bezier(0.33, 1, 0.68, 1);
}

.page-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

/* Ajustements pour le défilement sur mobile */
@supports (-webkit-touch-callout: none) {
  .min-h-screen {
    min-height: -webkit-fill-available;
  }
}

/* Support de prefers-reduced-motion */
@media (prefers-reduced-motion: reduce) {
  *,
  ::before,
  ::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

/* Optimisations pour le touch sur mobile */
@media (hover: none) {
  .hover\:* {
    display: none;
  }
}
</style> 