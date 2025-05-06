import { NextResponse } from "next/server"
import { cookies } from "next/headers"

// Hardcoded credentials for demo purposes
const ADMIN_EMAIL = "adulsrichu@gmail.com"
const ADMIN_PASSWORD = "Aduls@2002"

export async function POST(request) {
  try {
    // Parse request body
    let body
    try {
      body = await request.json()
    } catch (e) {
      console.error("Failed to parse request body:", e)
      return NextResponse.json({ error: "Invalid request format" }, { status: 400 })
    }

    const { email, password } = body || {}

    // Basic validation
    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    // Simple credential check
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      // Set auth cookie
      cookies().set("auth_token", "authenticated", {
        httpOnly: true,
        maxAge: 60 * 60 * 24, // 1 day
        path: "/",
      })

      return NextResponse.json({ success: true })
    }

    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
  } catch (error) {
    console.error("Login API error:", error)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
