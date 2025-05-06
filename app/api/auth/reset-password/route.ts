import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"

// In a real application, you would use a database to store user credentials
// and proper password hashing. This is a simplified example.
let currentPassword = "admin123"

export async function POST(request: NextRequest) {
  // Check if user is authenticated
  const token = cookies().get("auth_token")
  const isAuthenticated = token?.value === "authenticated"

  if (!isAuthenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { currentPassword: oldPassword, newPassword } = await request.json()

    if (oldPassword !== currentPassword) {
      return NextResponse.json({ error: "Current password is incorrect" }, { status: 400 })
    }

    // Update the password
    currentPassword = newPassword

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error resetting password:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
