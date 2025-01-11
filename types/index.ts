// Types pour le profil utilisateur
export interface UserProfile {
  gender: 'male' | 'female'
  age: number | null
  type: 'ponctuel' | 'regulier'
  purpose: 'travail' | 'personnel'
}

// Types pour les détails du vol
export interface FlightDetails {
  class: 'business' | 'eco' | 'eco+'
  departureDelay: number
  arrivalDelay: number
  distance: number | null
}

// Types pour les évaluations
export interface ServiceRatings {
  wifi: number
  schedule: number
  booking: number
  food: number
  boarding: number
  comfort: number
  entertainment: number
  service: number
  legroom: number
  baggage: number
  checkin: number
  crew: number
  cleanliness: number
}

// Type pour le store complet
export interface PassengerState {
  profile: UserProfile
  flight: FlightDetails
  ratings: ServiceRatings
} 