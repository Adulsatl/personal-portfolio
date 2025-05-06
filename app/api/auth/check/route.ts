import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function GET() {
  try {
    // Simple cookie-based auth check
    const token = cookies().get("auth_token")
    const isAuthenticated = token?.value === "authenticated"

    return NextResponse.json({
      authenticated: isAuthenticated,
    })
  } catch (err) {
    console.error("Auth check error:", err)

    // Return false instead of an error to prevent breaking the app
    return NextResponse.json({
      authenticated: false,
      error: "Failed to check authentication",
    })
  }
}
