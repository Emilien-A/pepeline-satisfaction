export const capitalizeFirst = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export const formatDistance = (distance: number): string => {
  return `${distance.toLocaleString('fr-FR')} km`
}

export const formatDelay = (minutes: number): string => {
  if (minutes === 0) return 'À l\'heure'
  return `${minutes} min${minutes > 1 ? 's' : ''}`
} 