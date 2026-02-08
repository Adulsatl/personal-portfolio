import { getGalleryPhotos } from "@/lib/data-service"

export async function GET() {
  try {
    const photos = await getGalleryPhotos()
    return Response.json(photos || [])
  } catch (error) {
    console.error("Error fetching gallery photos:", error)
    return Response.json([], { status: 500 })
  }
}
