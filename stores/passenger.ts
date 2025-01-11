import { defineStore } from 'pinia'

interface UserProfile {
  gender: 'male' | 'female' | null
  age: number | null
  type: 'regulier' | 'ponctuel' | null
  purpose: 'travail' | 'loisir' | null
}

interface FlightDetails {
  class: 'business' | 'eco' | 'eco+' | null
  distance: number | null
  delay: number | null
  departureDelay: number | null
  arrivalDelay: number | null
}

interface ServiceRatings {
  food: number
  comfort: number
  service: number
  entertainment: number
  cleanliness: number
  wifi: number
  schedule: number
  booking: number
  boarding: number
  legroom: number
  baggage: number
  checkin: number
  crew: number
}

interface PassengerState {
  hasStartedForm: boolean
  currentStep: 'profile' | 'flight' | 'services' | null
  profile: UserProfile
  flight: FlightDetails
  ratings: ServiceRatings
}

export const usePassengerStore = defineStore('passenger', {
  state: (): PassengerState => ({
    hasStartedForm: false,
    currentStep: null,
    profile: {
      gender: null,
      age: null,
      type: null,
      purpose: null
    },
    flight: {
      class: null,
      distance: null,
      delay: null,
      departureDelay: null,
      arrivalDelay: null
    },
    ratings: {
      food: 0,
      comfort: 0,
      service: 0,
      entertainment: 0,
      cleanliness: 0,
      wifi: 0,
      schedule: 0,
      booking: 0,
      boarding: 0,
      legroom: 0,
      baggage: 0,
      checkin: 0,
      crew: 0
    }
  }),

  getters: {
    isProfileComplete(): boolean {
      const { gender, age, type, purpose } = this.profile
      return Boolean(
        gender && 
        age && 
        age > 0 && 
        age <= 120 && 
        type && 
        purpose
      )
    },

    isFlightComplete(): boolean {
      const { class: flightClass, distance, departureDelay, arrivalDelay } = this.flight
      return Boolean(
        flightClass && 
        distance && 
        distance > 0 && 
        departureDelay !== null && 
        departureDelay >= 0 &&
        arrivalDelay !== null &&
        arrivalDelay >= 0
      )
    },

    isRatingsComplete(): boolean {
      return Object.values(this.ratings).every(rating => rating > 0)
    },

    canNavigateToFlight(): boolean {
      return this.isProfileComplete
    },

    canNavigateToServices(): boolean {
      return this.isProfileComplete && this.isFlightComplete
    },

    canNavigateToResults(): boolean {
      return this.isProfileComplete && this.isFlightComplete && this.isRatingsComplete
    },

    averageRating(): number {
      const ratings = Object.values(this.ratings)
      return ratings.reduce((a, b) => a + b, 0) / ratings.length
    }
  },

  actions: {
    setCurrentStep(step: PassengerState['currentStep']) {
      this.currentStep = step
      if (step === 'profile') {
        this.hasStartedForm = true
      }
    },

    updateProfile(data: Partial<UserProfile>) {
      this.profile = { ...this.profile, ...data }
    },

    updateFlight(data: Partial<FlightDetails>) {
      this.flight = { ...this.flight, ...data }
      // Mettre à jour le délai total si nécessaire
      if (data.departureDelay !== undefined || data.arrivalDelay !== undefined) {
        this.flight.delay = (this.flight.departureDelay || 0) + (this.flight.arrivalDelay || 0)
      }
    },

    updateRating(service: keyof ServiceRatings, rating: number) {
      if (rating >= 0 && rating <= 5) {
        this.ratings[service] = rating
      }
    },

    reset() {
      this.hasStartedForm = false
      this.currentStep = null
      this.profile = {
        gender: null,
        age: null,
        type: null,
        purpose: null
      }
      this.flight = {
        class: null,
        distance: null,
        delay: null,
        departureDelay: null,
        arrivalDelay: null
      }
      this.ratings = {
        food: 0,
        comfort: 0,
        service: 0,
        entertainment: 0,
        cleanliness: 0,
        wifi: 0,
        schedule: 0,
        booking: 0,
        boarding: 0,
        legroom: 0,
        baggage: 0,
        checkin: 0,
        crew: 0
      }
    }
  }
}) 