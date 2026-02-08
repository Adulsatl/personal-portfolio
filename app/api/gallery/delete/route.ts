import { createServerSupabaseClient } from "@/lib/supabase/server"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { id } = await request.json()

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 })
    }

    const supabase = await createServerSupabaseClient()

    const { error } = await supabase.from("gallery_photos").delete().eq("id", id)

    if (error) {
      console.error("Gallery delete error:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting gallery photo:", error)
    return NextResponse.json({ error: "Failed to delete photo" }, { status: 500 })
  }
}
