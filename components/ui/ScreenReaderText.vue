<template>
  <span class="sr-only">
    <slot />
  </span>
</template>

<script setup lang="ts">
// Composant pour le texte accessible uniquement aux lecteurs d'écran
</script>

<style scoped>
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
</style> 