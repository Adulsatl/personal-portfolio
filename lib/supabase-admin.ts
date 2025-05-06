import { createClient } from "@supabase/supabase-js"

// Create a Supabase client with the service role key for admin operations
// This client bypasses Row Level Security (RLS) policies
let supabaseAdmin: ReturnType<typeof createClient>

// Update the client initialization with better error handling
try {
  // Access environment variables directly when creating the client
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ""

  // Log environment variable status (only in development)
  if (process.env.NODE_ENV !== "production") {
    console.log("Supabase URL exists:", !!supabaseUrl)
    console.log("Supabase service role key exists:", !!supabaseServiceRoleKey)
  }

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    console.warn("Missing Supabase admin environment variables - creating limited client")
    console.warn("IMPORTANT: Admin functionality will be limited without the SUPABASE_SERVICE_ROLE_KEY")
    console.warn("Please add this environment variable to your project settings")

    // Create a client with the anon key as fallback
    // This will have limited permissions but won't crash the app
    supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder-url.supabase.co",
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-key",
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
        global: {
          fetch: (...args) => {
            // Add custom fetch with timeout
            const [url, options] = args
            const controller = new AbortController()
            const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 second timeout

            return fetch(url, {
              ...options,
              signal: controller.signal,
            }).finally(() => {
              clearTimeout(timeoutId)
            })
          },
        },
      },
    )
  } else {
    // Initialize Supabase admin client with proper credentials and timeout
    supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
      global: {
        fetch: (...args) => {
          // Add custom fetch with timeout
          const [url, options] = args
          const controller = new AbortController()
          const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 second timeout

          return fetch(url, {
            ...options,
            signal: controller.signal,
          }).finally(() => {
            clearTimeout(timeoutId)
          })
        },
      },
    })

    console.log("Supabase admin client initialized successfully")
  }
} catch (error) {
  console.error("Error initializing Supabase admin client:", error)

  // Create a dummy client that will return empty results
  // This prevents the app from crashing but functionality will be limited
  supabaseAdmin = {
    from: () => ({
      select: () => ({ data: [], error: null }),
      insert: () => ({ data: null, error: new Error("Admin functionality unavailable") }),
      update: () => ({ data: null, error: new Error("Admin functionality unavailable") }),
      delete: () => ({ data: null, error: new Error("Admin functionality unavailable") }),
      upsert: () => ({ data: null, error: new Error("Admin functionality unavailable") }),
      eq: () => ({ data: [], error: null }),
      single: () => ({ data: null, error: null }),
      abortSignal: () => ({ data: [], error: null }),
      throwOnError: () => ({ data: [], error: null }),
    }),
    storage: {
      from: () => ({
        upload: () => ({ data: null, error: new Error("Storage functionality unavailable") }),
        remove: () => ({ data: null, error: new Error("Storage functionality unavailable") }),
        getPublicUrl: () => ({ data: { publicUrl: "" } }),
      }),
      listBuckets: () => ({ data: [], error: null }),
      createBucket: () => ({ data: null, error: new Error("Storage functionality unavailable") }),
    },
    auth: {
      signOut: async () => ({ error: null }),
      getSession: async () => ({ data: { session: null }, error: null }),
      admin: {
        listUsers: async () => ({ data: { users: [] }, error: null }),
      },
    },
  } as any
}

// Update the testConnection function to handle fetch errors better
const testConnection = async () => {
  if (process.env.NODE_ENV === "production") return

  try {
    // Add a timeout to the query to prevent hanging
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 5000) // 5 second timeout

    // Use a simpler query that doesn't use aggregate functions
    const { data, error } = await supabaseAdmin
      .from("uploads")
      .select("id")
      .limit(1)
      .abortSignal(controller.signal)
      .throwOnError()

    clearTimeout(timeoutId)

    if (error) {
      console.error("Supabase admin connection test failed:", error)
    } else {
      console.log("Supabase admin connection test successful. Found", data?.length || 0, "records")
    }

    // Test storage bucket access with a Promise.race approach for timeout
    // since storage methods don't support abortSignal directly
    try {
      const storageTimeout = new Promise((_, reject) => {
        setTimeout(() => reject(new Error("Storage operation timed out")), 5000)
      })

      const storageOperation = supabaseAdmin.storage.listBuckets()

      // Use Promise.race to implement timeout
      const result = (await Promise.race([storageOperation, storageTimeout])) as { data: any; error: any }

      const { data: buckets, error: bucketsError } = result

      if (bucketsError) {
        console.error("Supabase storage access test failed:", bucketsError)
      } else {
        console.log(
          "Supabase storage access test successful. Available buckets:",
          buckets?.map((b: any) => b.name).join(", ") || "none",
        )
      }
    } catch (storageErr) {
      console.error("Supabase storage test exception:", storageErr)
    }
  } catch (err) {
    console.error("Supabase admin connection test exception:", err)
    // Don't let connection failures break the application
    console.log("Continuing application startup despite Supabase connection failure")
  }
}

// Modify the test execution to be non-blocking
if (process.env.NODE_ENV !== "production") {
  // Run the test asynchronously to not block application startup
  setTimeout(() => {
    testConnection().catch((err) => {
      console.error("Failed to run Supabase connection test:", err)
    })
  }, 1000)
}

export { supabaseAdmin }
