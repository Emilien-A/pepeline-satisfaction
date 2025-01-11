<script setup lang="ts">
interface Props {
  title?: string
  description?: string
  image?: string
  url?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Pepeline - Prédiction de Satisfaction Passager',
  description: 'Évaluez votre expérience de vol et obtenez une prédiction de satisfaction personnalisée',
  image: '/logo-pepeline.png',
  url: 'https://pepeline.app'
})

useHead({
  title: props.title,
  meta: [
    { name: 'description', content: props.description },
    // Open Graph
    { property: 'og:title', content: props.title },
    { property: 'og:description', content: props.description },
    { property: 'og:image', content: props.image },
    { property: 'og:url', content: props.url },
    // Twitter
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: props.title },
    { name: 'twitter:description', content: props.description },
    { name: 'twitter:image', content: props.image }
  ]
})</script> 