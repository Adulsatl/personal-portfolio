import { getTestimonials } from "@/lib/data-service"

export async function GET() {
  try {
    const testimonials = await getTestimonials()
    return Response.json(testimonials || [])
  } catch (error) {
    console.error("Error fetching testimonials:", error)
    return Response.json([], { status: 500 })
  }
}
