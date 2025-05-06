import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function POST(request: NextRequest) {
  // Clear the auth cookie
  cookies().delete("auth_token")

  return NextResponse.json({ success: true })
}
