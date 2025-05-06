"use server"

import { cookies } from "next/headers"
import { auth } from "./firebase"

// In a real application, you would use a database to store user credentials
// and proper password hashing. This is a simplified example.
const DEFAULT_USERNAME = "adulsrichu@gmail.com "
const DEFAULT_PASSWORD = "Aduls@2580"
export async function login(username: string, password: string): Promise<boolean> {
  try {
    const userCredential = await auth.signInWithEmailAndPassword(username, password)

    // If the login is successful, get the user information
    const user = userCredential.user

    if (user) {
      // Set a cookie to maintain the session
      cookies().set("auth_token", "authenticated", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24, // 1 day
        path: "/",
      })

      console.log("User logged in:", user.email)
      return true
    } else {
      return false
    }
  } catch (error) {
    console.error("Error logging in:", error.message)
    return false
  }
}

//const currentUsername = DEFAULT_USERNAME
//const currentPassword = DEFAULT_PASSWORD

export async function logout(): Promise<void> {
  cookies().delete("auth_token")
}

export async function checkAuth(): Promise<boolean> {
  const token = cookies().get("auth_token")
  return token?.value === "authenticated"
}

export async function changePassword(currentPassword: string, newPassword: string): Promise<boolean> {
  if (currentPassword === currentPassword) {
    currentPassword = newPassword
    return true
  }

  return false
}
