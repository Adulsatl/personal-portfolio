import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  // Check if Supabase environment variables are configured
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // If Supabase is not configured, skip auth middleware but allow access
  if (!supabaseUrl || !supabaseKey) {
    console.warn("[v0] Supabase environment variables not configured, skipping auth middleware")
    return supabaseResponse
  }

  const supabase = createServerClient(
    supabaseUrl,
    supabaseKey,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) => supabaseResponse.cookies.set(name, value, options))
        },
      },
    },
  )

  // IMPORTANT: Do not remove getUser() as it ensures the session is refreshed
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Protected routes logic
  if (request.nextUrl.pathname.startsWith("/admin") && !request.nextUrl.pathname.startsWith("/admin/login") && !user) {
    const url = request.nextUrl.clone()
    url.pathname = "/admin/login"
    return NextResponse.redirect(url)
  }

  // Redirect to admin if already logged in and visiting login page
  if (request.nextUrl.pathname.startsWith("/admin/login") && user) {
    const url = request.nextUrl.clone()
    url.pathname = "/admin"
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}
