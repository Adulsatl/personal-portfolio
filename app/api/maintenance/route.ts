import { type NextRequest, NextResponse } from "next/server"
import { checkAuth } from "@/lib/auth-service"
import { updateMaintenanceStatus } from "@/lib/portfolio-service"

export async function POST(request: NextRequest) {
  // Check if user is authenticated
  const isAuthenticated = await checkAuth()
  if (!isAuthenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { status } = await request.json()
    const success = await updateMaintenanceStatus(status)

    if (!success) {
      return NextResponse.json({ error: "Failed to update maintenance status" }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error updating maintenance status:", error)
    return NextResponse.json({ error: "Failed to update maintenance status" }, { status: 500 })
  }
}
