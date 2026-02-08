import { createClient } from "@supabase/supabase-js"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { name, title, company, message, rating, linkedin_url } = await request.json()

    if (!name || !message) {
      return NextResponse.json({ error: "Name and message are required" }, { status: 400 })
    }

    // Use service role key for admin operations (bypasses RLS)
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    const { data, error } = await supabase
      .from("testimonials")
      .insert({
        name,
        title: title || null,
        company: company || null,
        message,
        rating: rating || 5,
        linkedin_url: linkedin_url || null,
      })
      .select()

    if (error) {
      console.error("[v0] Testimonial add error:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data?.[0] || { success: true })
  } catch (error) {
    console.error("[v0] Error adding testimonial:", error)
    return NextResponse.json({ error: "Failed to add testimonial" }, { status: 500 })
  }
}
