import { type NextRequest, NextResponse } from "next/server"
import { getPortfolioData } from "@/lib/portfolio-service"

export async function GET(request: NextRequest) {
  try {
    // Check for force refresh parameter from query string (for cache busting)
    const forceRefresh = request.nextUrl.searchParams.has('t') || request.nextUrl.searchParams.get('refresh') === 'true'
    
    const data = await getPortfolioData(forceRefresh)

    if (!data) {
      return NextResponse.json(null, { status: 404 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching portfolio data:", error)
    return NextResponse.json({ error: "Failed to fetch portfolio data" }, { status: 500 })
  }
}
