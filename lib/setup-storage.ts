import { supabaseAdmin } from "./supabase-admin"

// Function to ensure the storage bucket exists
export async function ensureStorageBucket() {
  try {
    console.log("Checking for portfolio storage bucket...")

    // Check if we're in production without admin access
    if (process.env.NODE_ENV === "production" && !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      console.warn("Storage bucket check skipped - admin key not available in production")
      return true // Return true to allow the app to continue
    }

    // Check if the bucket already exists
    const { data: buckets, error: listError } = await supabaseAdmin.storage.listBuckets()

    if (listError) {
      console.error("Error listing buckets:", listError)
      // Don't fail in production - assume bucket exists
      return process.env.NODE_ENV === "production"
    }

    // Check if our bucket exists
    const portfolioBucket = buckets.find((bucket) => bucket.name === "portfolio")

    if (!portfolioBucket) {
      console.log("Portfolio bucket not found. Creating...")
      // Create the bucket if it doesn't exist
      const { error: createError } = await supabaseAdmin.storage.createBucket("portfolio", {
        public: true, // Make files publicly accessible
        fileSizeLimit: 10485760, // 10MB limit
      })

      if (createError) {
        console.error("Error creating bucket:", createError)
        // Don't fail in production
        return process.env.NODE_ENV === "production"
      }

      console.log("Portfolio bucket created successfully")
      return true
    } else {
      console.log("Portfolio bucket already exists")
      return true
    }
  } catch (error) {
    console.error("Exception ensuring storage bucket:", error)
    // Don't fail in production
    return process.env.NODE_ENV === "production"
  }
}
