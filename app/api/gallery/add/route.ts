import { createClient } from "@supabase/supabase-js"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { title, description, image_url, category } = await request.json()

    if (!title || !image_url) {
      return NextResponse.json({ error: "Title and image URL are required" }, { status: 400 })
    }

    // Use service role key for admin operations (bypasses RLS)
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    const { data, error } = await supabase
      .from("gallery_photos")
      .insert({
        title,
        description: description || null,
        image_url,
        category: category || "Professional",
      })
      .select()

    if (error) {
      console.error("[v0] Gallery add error:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data?.[0] || { success: true })
  } catch (error) {
    console.error("[v0] Error adding gallery photo:", error)
    return NextResponse.json({ error: "Failed to add photo" }, { status: 500 })
  }
}
