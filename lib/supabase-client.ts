import { createClient as createSupabaseClient } from "@supabase/supabase-js"

// Get Supabase URL and anon key from environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Missing Supabase environment variables")
  throw new Error("Missing Supabase environment variables: NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY")
}

// Singleton instance for client-side
let supabase

// Initialize Supabase client safely for client-side
if (typeof window !== "undefined") {
  try {
    supabase = createSupabaseClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    })
    console.log("Supabase client initialized successfully")
  } catch (error) {
    console.error("Error initializing Supabase client:", error)
    throw new Error(`Failed to initialize Supabase client: ${error.message}`)
  }
}

// Function to create a Supabase client (can be used with or without cookies)
export function createClient(cookieStore?: any) {
  try {
    // For server components that need to access cookies
    if (cookieStore) {
      return createSupabaseClient(supabaseUrl, supabaseAnonKey, {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
        },
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value
          },
          set(name: string, value: string, options: any) {
            cookieStore.set({ name, value, ...options })
          },
          remove(name: string, options: any) {
            cookieStore.set({ name, value: "", ...options })
          },
        },
      })
    }

    // For client components or server components that don't need cookies
    return createSupabaseClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: typeof window !== "undefined", // Only persist on client
        autoRefreshToken: typeof window !== "undefined", // Only auto-refresh on client
      },
    })
  } catch (error) {
    console.error("Error creating Supabase client:", error)
    throw new Error(`Failed to create Supabase client: ${error.message}`)
  }
}

// Export the singleton instance for client-side use
export { supabase }
