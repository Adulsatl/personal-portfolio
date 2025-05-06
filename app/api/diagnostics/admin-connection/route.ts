import { NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase-admin"

export async function GET() {
  try {
    // Check if service role key exists
    const serviceKeyExists = !!process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!serviceKeyExists) {
      return NextResponse.json({
        success: false,
        warning: true,
        message: "Missing SUPABASE_SERVICE_ROLE_KEY - admin functionality will be limited",
      })
    }

    // Add a timeout to prevent hanging requests
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 5000) // 5 second timeout

    try {
      // Try a simple query
      const { data, error } = await supabaseAdmin.from("uploads").select("id").limit(1).abortSignal(controller.signal)

      clearTimeout(timeoutId)

      if (error) {
        return NextResponse.json({
          success: false,
          message: `Admin connection error: ${error.message}`,
        })
      }

      return NextResponse.json({
        success: true,
        message: `Admin connection successful. Found ${data.length} records.`,
      })
    } catch (fetchError) {
      clearTimeout(timeoutId)
      return NextResponse.json({
        success: false,
        message: `Admin connection error: ${fetchError instanceof Error ? fetchError.message : "Network error"}`,
      })
    }
  } catch (err) {
    console.error("Admin connection test error:", err)
    return NextResponse.json({
      success: false,
      message: err instanceof Error ? err.message : "Unknown error testing admin connection",
    })
  }
}
