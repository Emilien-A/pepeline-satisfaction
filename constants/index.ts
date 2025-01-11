// Services disponibles pour l'évaluation
export const SERVICES = {
  wifi: 'Service WiFi à bord',
  schedule: 'Heure de départ/arrivée',
  booking: 'Réservation en ligne',
  food: 'Nourriture et boissons',
  boarding: 'Embarquement en ligne',
  comfort: 'Confort du siège',
  entertainment: 'Divertissement en vol',
  service: 'Service à bord',
  legroom: 'Espace pour les jambes',
  baggage: 'Gestion des bagages',
  checkin: 'Service d\'enregistrement',
  crew: 'Service en vol',
  cleanliness: 'Propreté'
} as const

// Étapes du processus d'évaluation
export const EVALUATION_STEPS = [
  {
    icon: '👤',
    title: 'Renseignez vos informations',
    description: 'Fournissez les détails de votre vol pour commencer'
  },
  {
    icon: '✈️',
    title: 'Évaluez votre voyage',
    description: 'Partagez votre expérience de vol pour une évaluation précise'
  },
  {
    icon: '📊',
    title: 'Obtenez votre prédiction',
    description: 'Recevez une analyse de votre satisfaction en quelques instants'
  }
] as const 