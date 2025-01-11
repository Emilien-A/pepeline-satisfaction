<template>
  <div class="fixed inset-0 bg-ios-background">
    <NuxtLayout>
      <NuxtPage :transition="{
        name: 'page'
      }" />
    </NuxtLayout>
  </div>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.35s cubic-bezier(0.33, 1, 0.68, 1);
  position: absolute;
  inset: 0;
  will-change: transform, opacity;
}

.page-enter-from {
  opacity: 0;
  transform: translateY(50px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-50px);
}

.bg-ios-background {
  background-color: rgb(var(--ios-background-rgb));
}
</style>
