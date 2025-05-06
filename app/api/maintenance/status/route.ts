import { type NextRequest, NextResponse } from "next/server"
import { getMaintenanceStatus } from "@/lib/portfolio-service"

export async function GET(request: NextRequest) {
  try {
    const status = await getMaintenanceStatus()
    return NextResponse.json({ status })
  } catch (error) {
    console.error("Error fetching maintenance status:", error)
    return NextResponse.json({ error: "Failed to fetch maintenance status" }, { status: 500 })
  }
}
