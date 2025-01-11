// Types pour le profil utilisateur
export type Gender = 'male' | 'female'
export type TravelerType = 'regular' | 'occasional'
export type TravelPurpose = 'business' | 'leisure'
export type FlightClass = 'business' | 'eco_plus' | 'eco'

export interface UserProfile {
  gender: Gender | null
  age: number | null
  type: TravelerType | null
  purpose: TravelPurpose | null
}

// Types pour les détails du vol
export interface FlightDetails {
  class: FlightClass | null
  distance: number | null
  departureDelay: number | null
  arrivalDelay: number | null
}

// Types pour les évaluations
export interface ServiceRatings {
  wifi: number | null
  food: number | null
  entertainment: number | null
}

// Type pour le store complet
export interface PassengerState {
  hasStartedForm: boolean
  currentStep: number
  profile: UserProfile | null
  flight: FlightDetails | null
  ratings: ServiceRatings | null
} 