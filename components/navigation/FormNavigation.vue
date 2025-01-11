<template>
  <div class="flex justify-between mt-8">
    <Button
      variant="secondary"
      @click="navigateTo(backPath)"
    >
      {{ backLabel }}
    </Button>
    <Button
      variant="primary"
      @click="$emit('next')"
      :disabled="disabled"
    >
      {{ nextLabel }}
    </Button>
  </div>
</template>

<script setup lang="ts">
interface FormNavigationProps {
  backPath: string
  backLabel?: string
  nextLabel?: string
  disabled?: boolean
}

const props = withDefaults(defineProps<FormNavigationProps>(), {
  backLabel: 'Précédent',
  nextLabel: 'Suivant',
  disabled: false
})

defineEmits<{
  next: []
}>()</script> 