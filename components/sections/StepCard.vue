<template>
  <Card>
    <div class="flex flex-col items-center text-center space-y-4">
      <div class="w-12 h-12 rounded-full bg-ios-blue flex items-center justify-center text-white text-xl">
        {{ icon }}
      </div>
      <h3 class="text-xl font-semibold">{{ title }}</h3>
      <p class="text-ios-text-secondary">{{ description }}</p>
    </div>
  </Card>
</template>

<script setup lang="ts">
defineProps<{
  icon: string
  title: string
  description: string
}>()</script> 