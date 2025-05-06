"use server"

import { cookies } from "next/headers"

// Single admin user credentials - hardcoded for simplicity
// In a production environment, you would use environment variables
const ADMIN_EMAIL = "adulsrichu@gmail.com"
const ADMIN_PASSWORD = "Aduls@2002"

export async function login(email: string, password: string): Promise<boolean> {
  try {
    // Check if credentials match the single admin user
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      // Set a cookie to maintain the session
      cookies().set("auth_token", "authenticated", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24, // 1 day
        path: "/",
      })

      return true
    }

    return false
  } catch (error) {
    console.error("Error in login function:", error)
    return false
  }
}

export async function logout(): Promise<void> {
  try {
    cookies().delete("auth_token")
  } catch (error) {
    console.error("Error in logout function:", error)
  }
}

export async function checkAuth(): Promise<boolean> {
  try {
    const token = cookies().get("auth_token")
    return token?.value === "authenticated"
  } catch (error) {
    console.error("Error in checkAuth function:", error)
    return false
  }
}
