import { createServerSupabaseClient } from "@/lib/supabase/server"

export async function GET() {
  try {
    const supabase = await createServerSupabaseClient()

    const { data, error } = await supabase
      .from("gallery_photos")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching gallery photos:", error)
      return Response.json([], { status: 500 })
    }

    return Response.json(data || [])
  } catch (error) {
    console.error("Error in gallery API:", error)
    return Response.json([], { status: 500 })
  }
}
