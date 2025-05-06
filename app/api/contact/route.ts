import { type NextRequest, NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase-admin"

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json().catch((error) => {
      console.error("Error parsing request body:", error)
      return null
    })

    if (!body) {
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
    }

    const { name, email, message } = body

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Add to enquiries in Supabase using admin client to bypass RLS
    try {
      const { error } = await supabaseAdmin.from("enquiries").insert({
        name,
        email,
        message,
        created_at: new Date().toISOString(),
      })

      if (error) {
        console.error("Error adding enquiry:", error)
        return NextResponse.json({ error: "Failed to save your message" }, { status: 500 })
      }
    } catch (error) {
      console.error("Exception adding enquiry:", error)
      return NextResponse.json({ error: "Failed to save your message" }, { status: 500 })
    }

    // Skip email sending in environments that don't support it
    // We'll just log that we would have sent an email
    console.log(`Would send email notification for contact from ${name} <${email}>`)

    // Return success even if email sending would have failed
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error processing contact form:", error)
    // Ensure we always return a proper JSON response
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
