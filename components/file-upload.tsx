"use client"

import { useState } from "react"
import { Upload, X, Check, AlertTriangle, Loader2 } from "lucide-react"

export default function FileUpload({
  onUploadComplete,
  folder = "general",
  accept = "*/*",
  maxSize = 10 * 1024 * 1024, // 10MB
  buttonText = "Upload File",
  className = "",
}) {
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadError, setUploadError] = useState(null)
  const [uploadSuccess, setUploadSuccess] = useState(null)
  const [selectedFile, setSelectedFile] = useState(null)

  const handleFileUpload = async (event) => {
    const files = event.target.files
    if (!files || files.length === 0) return

    const file = files[0]
    setSelectedFile(file)

    // Check file size
    if (file.size > maxSize) {
      setUploadError(`File is too large. Maximum size is ${maxSize / (1024 * 1024)}MB.`)
      return
    }

    setIsUploading(true)
    setUploadError(null)
    setUploadSuccess(null)

    // Simulate upload progress
    const progressInterval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 95) {
          clearInterval(progressInterval)
          return prev
        }
        return prev + 5
      })
    }, 100)

    try {
      // Create FormData
      const formData = new FormData()
      formData.append("file", file)
      formData.append("folder", folder)

      // Upload file using API route
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      }).catch((error) => {
        console.error("Network error during upload:", error)
        throw new Error("Network error during upload. Please try again.")
      })

      clearInterval(progressInterval)
      setUploadProgress(100)

      if (!response.ok) {
        let errorMessage = "Failed to upload file"
        try {
          const errorData = await response.json()
          errorMessage = errorData.error || errorMessage
        } catch (e) {
          // If JSON parsing fails, use the status text
          errorMessage = `Error: ${response.status} ${response.statusText}`
        }
        throw new Error(errorMessage)
      }

      let data
      try {
        data = await response.json()
      } catch (e) {
        console.error("Failed to parse upload response:", e)
        throw new Error("Invalid response from server")
      }

      if (!data.success) {
        throw new Error(data.error || "Upload failed")
      }

      // Generate a placeholder URL if the real URL is missing
      const url = data.url || `/placeholder.svg?height=200&width=200&text=${encodeURIComponent(file.name)}`

      setUploadSuccess(`File uploaded successfully`)
      if (onUploadComplete) {
        onUploadComplete(url, file.name, data.path || `${folder}/${file.name}`)
      }
    } catch (error) {
      clearInterval(progressInterval)
      console.error("Exception uploading file:", error)
      setUploadError(`Error uploading file: ${error.message}`)
    } finally {
      setTimeout(() => {
        setIsUploading(false)
        setUploadProgress(0)
        // Clear success message after 3 seconds
        if (uploadSuccess) {
          setTimeout(() => setUploadSuccess(null), 3000)
        }
      }, 1000)
    }

    // Reset the input value so the same file can be uploaded again if needed
    event.target.value = null
  }

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex items-center gap-2">
        <label className="relative cursor-pointer bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-blue-500 dark:to-indigo-600 text-white px-4 py-2 rounded-md shadow-md hover:shadow-lg transition-all inline-flex items-center gap-2">
          <Upload className="h-4 w-4" />
          <span>{buttonText}</span>
          <input type="file" className="hidden" onChange={handleFileUpload} disabled={isUploading} accept={accept} />
        </label>
        {selectedFile && (
          <span className="text-sm text-gray-600 dark:text-gray-400 truncate max-w-xs">{selectedFile.name}</span>
        )}
      </div>

      {/* Upload progress and status */}
      {isUploading && (
        <div className="mt-2">
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className="bg-blue-600 dark:bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 flex items-center">
            <Loader2 className="h-3 w-3 mr-1 animate-spin" />
            Uploading... {uploadProgress}%
          </p>
        </div>
      )}

      {uploadError && (
        <div className="mt-2 p-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-md text-sm flex items-center">
          <AlertTriangle className="h-4 w-4 mr-1 flex-shrink-0" />
          <span>{uploadError}</span>
          <button
            onClick={() => setUploadError(null)}
            className="ml-auto text-red-700 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {uploadSuccess && (
        <div className="mt-2 p-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-md text-sm flex items-center">
          <Check className="h-4 w-4 mr-1 flex-shrink-0" />
          <span>{uploadSuccess}</span>
          <button
            onClick={() => setUploadSuccess(null)}
            className="ml-auto text-green-700 dark:text-green-400 hover:text-green-900 dark:hover:text-green-300"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  )
}
