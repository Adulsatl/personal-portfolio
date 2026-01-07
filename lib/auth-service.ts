"use server"

import { createClient } from "@/lib/supabase/server"

export async function checkAuth(): Promise<boolean> {
  try {
    const supabase = await createClient()
    const {
      data: { session },
    } = await supabase.auth.getSession()

    return !!session
  } catch (error) {
    console.error("Error in checkAuth function:", error)
    return false
  }
}

export async function login(email: string, password: string): Promise<boolean> {
  try {
    const supabase = await createClient()
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    return !error
  } catch (error) {
    console.error("Error in login function:", error)
    return false
  }
}

export async function logout(): Promise<void> {
  try {
    const supabase = await createClient()
    await supabase.auth.signOut()
  } catch (error) {
    console.error("Error in logout function:", error)
  }
}
