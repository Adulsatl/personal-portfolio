"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Upload, Trash2, FileText, Image, Film, File, Download, ExternalLink } from "lucide-react"
import { getUploads, uploadFile, deleteUpload } from "@/lib/upload-service"
import { supabase } from "@/lib/supabase-client"

// File type icon component
const FileTypeIcon = ({ type }) => {
  if (type.startsWith("image/")) {
    return <Image className="h-5 w-5 text-blue-500" />
  } else if (type.startsWith("video/")) {
    return <Film className="h-5 w-5 text-purple-500" />
  } else if (type.startsWith("text/") || type.includes("document")) {
    return <FileText className="h-5 w-5 text-green-500" />
  } else {
    return <File className="h-5 w-5 text-gray-500" />
  }
}

// Format file size
const formatFileSize = (bytes) => {
  if (bytes < 1024) {
    return bytes + " B"
  } else if (bytes < 1024 * 1024) {
    return (bytes / 1024).toFixed(2) + " KB"
  } else if (bytes < 1024 * 1024 * 1024) {
    return (bytes / (1024 * 1024)).toFixed(2) + " MB"
  } else {
    return (bytes / (1024 * 1024 * 1024)).toFixed(2) + " GB"
  }
}

export default function UploadsTab() {
  const [uploads, setUploads] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadError, setUploadError] = useState(null)
  const [uploadSuccess, setUploadSuccess] = useState(null)

  // Fetch uploads on component mount
  useEffect(() => {
    fetchUploads()
  }, [])

  const fetchUploads = async () => {
    setIsLoading(true)
    const data = await getUploads()
    setUploads(data)
    setIsLoading(false)
  }

  const handleFileUpload = async (event) => {
    const files = event.target.files
    if (!files || files.length === 0) return

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
      const file = files[0]
      const result = await uploadFile(file)

      clearInterval(progressInterval)
      setUploadProgress(100)

      if (result.success) {
        setUploadSuccess(`File uploaded successfully: ${file.name}`)
        fetchUploads() // Refresh the uploads list
      } else {
        setUploadError(`Failed to upload file: ${result.error}`)
      }
    } catch (error) {
      clearInterval(progressInterval)
      setUploadError(`Error uploading file: ${error.message}`)
    } finally {
      setTimeout(() => {
        setIsUploading(false)
        setUploadProgress(0)
      }, 1000)
    }
  }

  const handleDeleteUpload = async (id, filepath) => {
    if (window.confirm("Are you sure you want to delete this file? This action cannot be undone.")) {
      const result = await deleteUpload(id, filepath)

      if (result.success) {
        setUploads(uploads.filter((upload) => upload.id !== id))
      } else {
        alert(`Failed to delete file: ${result.error}`)
      }
    }
  }

  // Get public URL for a file
  const getPublicUrl = (filepath) => {
    const { publicUrl } = supabase.storage.from("portfolio").getPublicUrl(filepath)
    return publicUrl
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">File Uploads</h2>

        <label className="relative cursor-pointer bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-blue-500 dark:to-indigo-600 text-white px-4 py-2 rounded-md shadow-md hover:shadow-lg transition-all">
          <span className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Upload File
          </span>
          <input type="file" className="hidden" onChange={handleFileUpload} disabled={isUploading} />
        </label>
      </div>

      {/* Upload progress and status */}
      {isUploading && (
        <div className="mt-4">
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
            <div
              className="bg-blue-600 dark:bg-blue-500 h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Uploading... {uploadProgress}%</p>
        </div>
      )}

      {uploadError && (
        <div className="mt-4 p-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-md">
          {uploadError}
        </div>
      )}

      {uploadSuccess && (
        <div className="mt-4 p-3 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-md">
          {uploadSuccess}
        </div>
      )}

      {/* Files list */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        {isLoading ? (
          <div className="p-6 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 dark:border-blue-500 mx-auto"></div>
            <p className="mt-2 text-gray-500 dark:text-gray-400">Loading files...</p>
          </div>
        ) : uploads.length === 0 ? (
          <div className="p-6 text-center">
            <p className="text-gray-500 dark:text-gray-400">No files uploaded yet.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-900/50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    File
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Size
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Uploaded
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {uploads.map((upload) => (
                  <motion.tr
                    key={upload.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <FileTypeIcon type={upload.filetype} />
                        <span className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100 truncate max-w-xs">
                          {upload.filename}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {upload.filetype}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {formatFileSize(upload.filesize)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {new Date(upload.created_at).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-3">
                        <a
                          href={getPublicUrl(upload.filepath)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                          title="Open file"
                        >
                          <ExternalLink className="h-5 w-5" />
                        </a>
                        <a
                          href={getPublicUrl(upload.filepath)}
                          download
                          className="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300"
                          title="Download file"
                        >
                          <Download className="h-5 w-5" />
                        </a>
                        <button
                          onClick={() => handleDeleteUpload(upload.id, upload.filepath)}
                          className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300"
                          title="Delete file"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
