import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase-client"

export async function GET() {
  try {
    const supabase = createClient()

    // Try a simple public query
    const { data, error } = await supabase.from("settings").select("*").limit(1)

    if (error) {
      return NextResponse.json({
        success: false,
        message: `Client connection error: ${error.message}`,
      })
    }

    return NextResponse.json({
      success: true,
      message: `Client connection successful. Found ${data?.length || 0} records.`,
    })
  } catch (err) {
    console.error("Client connection test error:", err)
    return NextResponse.json({
      success: false,
      message: err instanceof Error ? err.message : "Unknown error testing client connection",
    })
  }
}
