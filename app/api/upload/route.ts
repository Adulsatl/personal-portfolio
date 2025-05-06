import { type NextRequest, NextResponse } from "next/server"
import { checkAuth } from "@/lib/auth-service"
import { uploadFile } from "@/lib/upload-service"
import { ensureStorageBucket } from "@/lib/setup-storage"

export async function POST(request: NextRequest) {
  // Check if user is authenticated
  const isAuthenticated = await checkAuth()
  if (!isAuthenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    // Ensure storage bucket exists
    const bucketExists = await ensureStorageBucket()
    if (!bucketExists) {
      return NextResponse.json({ error: "Failed to ensure storage bucket exists" }, { status: 500 })
    }

    const formData = await request.formData()
    const file = formData.get("file") as File
    const folder = (formData.get("folder") as string) || "general"

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    console.log("Received file upload request:", {
      filename: file.name,
      type: file.type,
      size: file.size,
      folder,
    })

    // Upload the file using our service
    const result = await uploadFile(file, folder)

    if (!result.success) {
      console.error("Upload failed:", result.error)
      return NextResponse.json({ error: result.error }, { status: 500 })
    }

    console.log("Upload successful:", result.url)
    return NextResponse.json({
      success: true,
      url: result.url,
      path: result.path,
    })
  } catch (error) {
    console.error("Error in upload API route:", error)
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to upload file",
      },
      { status: 500 },
    )
  }
}
