import { createServerSupabaseClient } from "@/lib/supabase/server"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { name, title, company, message, rating, linkedin_url } = await request.json()

    if (!name || !message) {
      return NextResponse.json({ error: "Name and message are required" }, { status: 400 })
    }

    const supabase = await createServerSupabaseClient()

    const { data, error } = await supabase
      .from("testimonials")
      .insert({
        name,
        title: title || null,
        company: company || null,
        message,
        rating: rating || 5,
        linkedin_url: linkedin_url || null,
        created_at: new Date().toISOString(),
      })
      .select()

    if (error) {
      console.error("Testimonial add error:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data?.[0] || { success: true })
  } catch (error) {
    console.error("Error adding testimonial:", error)
    return NextResponse.json({ error: "Failed to add testimonial" }, { status: 500 })
  }
}
