import { type NextRequest, NextResponse } from "next/server"
import { checkAuth } from "@/lib/auth-service"
import { getEnquiries } from "@/lib/portfolio-service"

export async function GET(request: NextRequest) {
  // Check if user is authenticated
  const isAuthenticated = await checkAuth()
  if (!isAuthenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const enquiries = await getEnquiries()
    return NextResponse.json(enquiries)
  } catch (error) {
    console.error("Error fetching enquiries:", error)
    return NextResponse.json({ error: "Failed to fetch enquiries" }, { status: 500 })
  }
}
