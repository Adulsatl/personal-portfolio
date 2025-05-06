import { type NextRequest, NextResponse } from "next/server"
import { checkAuth } from "@/lib/auth-service"
import { deleteEnquiry } from "@/lib/portfolio-service"

export async function POST(request: NextRequest) {
  // Check if user is authenticated
  const isAuthenticated = await checkAuth()
  if (!isAuthenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { id } = await request.json()

    if (!id) {
      return NextResponse.json({ error: "Missing enquiry ID" }, { status: 400 })
    }

    const success = await deleteEnquiry(id)

    if (!success) {
      return NextResponse.json({ error: "Failed to delete enquiry" }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting enquiry:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
