"use server"
import { createClient } from "./supabase/server"

// In a real application, you would use a database to store user credentials
// and proper password hashing. This is a simplified example.

export async function login(username: string, password: string): Promise<boolean> {
  const supabase = await createClient()
  const { error } = await supabase.auth.signInWithPassword({
    email: username,
    password: password,
  })

  return !error
}

export async function logout(): Promise<void> {
  const supabase = await createClient()
  await supabase.auth.signOut()
}

export async function checkAuth(): Promise<boolean> {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  return !!user
}

//const currentUsername = DEFAULT_USERNAME
//const currentPassword = DEFAULT_PASSWORD

// Functionality for changing password is not directly supported in Supabase Auth
// You may need to implement this using Supabase's API for password recovery or update user details
// For demonstration purposes, the original function is kept but commented out
/*
export async function changePassword(currentPassword: string, newPassword: string): Promise<boolean> {
  if (currentPassword === DEFAULT_PASSWORD) {
    DEFAULT_PASSWORD = newPassword
    return true
  }

  return false
}
*/
