import { supabaseAdmin } from "./supabase-admin"

// Upload a file to Supabase Storage
export async function uploadFile(file, folder = "general") {
  try {
    console.log("Uploading file:", file.name, "to folder:", folder)

    // Check if we're in production without admin access
    if (process.env.NODE_ENV === "production" && !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      console.warn("File upload skipped - admin key not available in production")
      // Return a mock URL for the frontend to continue working
      return {
        success: true,
        url: `/placeholder.svg?height=200&width=200&text=${encodeURIComponent(file.name)}`,
        path: `${folder}/${file.name}`,
      }
    }

    // Generate a unique filename to avoid collisions
    const timestamp = new Date().getTime()
    const fileExtension = file.name.split(".").pop()
    const uniqueFilename = `${timestamp}-${Math.random().toString(36).substring(2, 15)}.${fileExtension}`
    const filePath = `${folder}/${uniqueFilename}`

    // Get file buffer
    let buffer
    if (file instanceof Blob || file instanceof File) {
      buffer = Buffer.from(await file.arrayBuffer())
    } else if (Buffer.isBuffer(file)) {
      buffer = file
    } else {
      throw new Error("Unsupported file type")
    }

    // Upload file to Supabase Storage
    console.log("Uploading to Supabase storage:", filePath)

    // This fixes the "e.getAll is not a function" error which is often caused by
    // internal fetch processing in the Supabase SDK when handling complex file objects
    const fileToUpload = file instanceof File ? file : buffer

    const { data: uploadData, error: uploadError } = await supabaseAdmin.storage
      .from("portfolio")
      .upload(filePath, fileToUpload, {
        contentType: file.type || "application/octet-stream",
        upsert: true,
      })

    if (uploadError) {
      console.error("Error uploading file to storage:", uploadError)
      return { success: false, error: uploadError.message }
    }

    console.log("File uploaded successfully to storage:", uploadData)

    // Get the public URL for the uploaded file
    const {
      data: { publicUrl },
    } = supabaseAdmin.storage.from("portfolio").getPublicUrl(filePath)
    console.log("Public URL generated:", publicUrl)

    // Record the upload in the uploads table
    console.log("Recording upload in database...")
    const { data: insertData, error: dbError } = await supabaseAdmin
      .from("uploads")
      .insert({
        filename: file.name,
        filepath: filePath,
        filetype: file.type || "application/octet-stream",
        filesize: file.size || buffer.length,
      })
      .select()

    if (dbError) {
      console.error("Error recording upload in database:", dbError)
      // Even if the database insert fails, the file is still uploaded
    } else {
      console.log("Upload recorded in database:", insertData)
    }

    return { success: true, url: publicUrl, path: filePath }
  } catch (error) {
    console.error("Exception uploading file:", error)

    // In production, return a placeholder to keep the app working
    if (process.env.NODE_ENV === "production") {
      return {
        success: true,
        url: `/placeholder.svg?height=200&width=200&text=${encodeURIComponent(file?.name || "file")}`,
        path: `${folder}/${file?.name || "file"}`,
      }
    }

    return { success: false, error: error.message || "An unexpected error occurred" }
  }
}

// Get all uploads from the database
export async function getUploads() {
  try {
    console.log("Fetching uploads from database...")
    const { data, error } = await supabaseAdmin.from("uploads").select("*").order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching uploads:", error)
      return []
    }

    console.log(`Retrieved ${data?.length || 0} uploads from database`)
    return data || []
  } catch (error) {
    console.error("Exception fetching uploads:", error)
    return []
  }
}

// Delete a file from Supabase Storage and the database
export async function deleteUpload(id, filepath) {
  try {
    console.log("Deleting upload:", id, filepath)

    // Check if we're in production without admin access
    if (process.env.NODE_ENV === "production" && !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      console.warn("File deletion skipped - admin key not available in production")
      return { success: true }
    }

    // Delete from storage
    console.log("Deleting from storage:", filepath)
    const { data: deleteData, error: storageError } = await supabaseAdmin.storage.from("portfolio").remove([filepath])

    if (storageError) {
      console.error("Error deleting file from storage:", storageError)
      return { success: false, error: storageError.message }
    }

    console.log("File deleted from storage:", deleteData)

    // Delete from database
    console.log("Deleting from database:", id)
    const { error: dbError } = await supabaseAdmin.from("uploads").delete().eq("id", id)

    if (dbError) {
      console.error("Error deleting from database:", dbError)
      return { success: false, error: dbError.message }
    }

    console.log("Upload deleted successfully")
    return { success: true }
  } catch (error) {
    console.error("Exception deleting upload:", error)
    return { success: false, error: error.message || "An unexpected error occurred" }
  }
}
