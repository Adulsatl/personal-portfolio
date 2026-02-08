import { createServerSupabaseClient } from "@/lib/supabase/server"

export async function GET() {
  try {
    const supabase = await createServerSupabaseClient()

    const { data, error } = await supabase
      .from("testimonials")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching testimonials:", error)
      return Response.json([], { status: 500 })
    }

    return Response.json(data || [])
  } catch (error) {
    console.error("Error in testimonials API:", error)
    return Response.json([], { status: 500 })
  }
}
