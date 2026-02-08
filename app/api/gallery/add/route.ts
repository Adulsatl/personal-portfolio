import { createServerSupabaseClient } from "@/lib/supabase/server"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { title, description, image_url, category } = await request.json()

    if (!title || !image_url) {
      return NextResponse.json({ error: "Title and image URL are required" }, { status: 400 })
    }

    const supabase = await createServerSupabaseClient()

    const { data, error } = await supabase
      .from("gallery_photos")
      .insert({
        title,
        description: description || null,
        image_url,
        category: category || "Professional",
        created_at: new Date().toISOString(),
      })
      .select()

    if (error) {
      console.error("Gallery add error:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data?.[0] || { success: true })
  } catch (error) {
    console.error("Error adding gallery photo:", error)
    return NextResponse.json({ error: "Failed to add photo" }, { status: 500 })
  }
}
