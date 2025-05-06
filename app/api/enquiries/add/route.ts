import { type NextRequest, NextResponse } from "next/server"
import { addEnquiry } from "@/lib/portfolio-service"

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json()

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Add to enquiries in Supabase
    const success = await addEnquiry({ name, email, message })

    if (!success) {
      return NextResponse.json({ error: "Failed to save your message" }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error adding enquiry:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
