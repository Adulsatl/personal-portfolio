// This file is kept for backward compatibility but is no longer used
// All functionality has been moved to lib/portfolio-service.ts using Supabase

export const getPortfolioData = async () => {
  console.warn("Firebase is deprecated. Please use portfolio-service.ts instead.")
  return null
}

export const updatePortfolioData = async () => {
  console.warn("Firebase is deprecated. Please use portfolio-service.ts instead.")
  return false
}

export const getMaintenanceStatus = async () => {
  console.warn("Firebase is deprecated. Please use portfolio-service.ts instead.")
  return false
}

export const updateMaintenanceStatus = async () => {
  console.warn("Firebase is deprecated. Please use portfolio-service.ts instead.")
  return false
}

export const getEnquiries = async () => {
  console.warn("Firebase is deprecated. Please use portfolio-service.ts instead.")
  return []
}

export const addEnquiry = async () => {
  console.warn("Firebase is deprecated. Please use portfolio-service.ts instead.")
  return false
}

export const deleteEnquiry = async () => {
  console.warn("Firebase is deprecated. Please use portfolio-service.ts instead.")
  return false
}

// Safely check if we're in a browser or server environment
const isServer = typeof window === "undefined"
const isClient = !isServer

// Store for Firebase app instance
const firebaseApp = null

// Mock Firebase exports for compatibility
export const auth = null
export const onAuthStateChanged = () => {}

// Skip actual Firebase initialization since we're using Supabase now
console.log("Firebase initialization skipped - using Supabase instead")
