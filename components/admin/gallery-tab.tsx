"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Upload, Trash2, Plus, Edit2 } from "lucide-react"
import { getGalleryPhotos, addGalleryPhoto, deleteGalleryPhoto } from "@/lib/data-service"

export default function GalleryTab() {
  const [photos, setPhotos] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isAdding, setIsAdding] = useState(false)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [category, setCategory] = useState("Professional")
  const [successMessage, setSuccessMessage] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  useEffect(() => {
    fetchPhotos()
  }, [])

  const fetchPhotos = async () => {
    setIsLoading(true)
    const data = await getGalleryPhotos()
    setPhotos(data)
    setIsLoading(false)
  }

  const handleAddPhoto = async (e) => {
    e.preventDefault()
    if (!title || !imageUrl) {
      setErrorMessage("Title and image URL are required")
      return
    }

    setIsAdding(true)
    setErrorMessage("")
    setSuccessMessage("")

    const success = await addGalleryPhoto({
      title,
      description,
      image_url: imageUrl,
      category,
    })

    if (success) {
      setTitle("")
      setDescription("")
      setImageUrl("")
      setCategory("Professional")
      setSuccessMessage("Photo added successfully!")
      fetchPhotos()
    } else {
      setErrorMessage("Failed to add photo")
    }

    setIsAdding(false)
  }

  const handleDeletePhoto = async (photoId) => {
    if (confirm("Are you sure you want to delete this photo?")) {
      const success = await deleteGalleryPhoto(photoId)
      if (success) {
        setSuccessMessage("Photo deleted successfully!")
        fetchPhotos()
      } else {
        setErrorMessage("Failed to delete photo")
      }
    }
  }

  return (
    <div className="space-y-6">
      {/* Add Photo Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-cyan-500/20 rounded-lg p-6"
      >
        <h3 className="text-xl font-semibold text-cyan-300 mb-4 flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Add New Gallery Photo
        </h3>

        <form onSubmit={handleAddPhoto} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Photo Title *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-slate-700/50 border border-cyan-500/30 rounded px-4 py-2 text-white focus:outline-none focus:border-cyan-500 transition-colors"
              placeholder="e.g., Server Room Setup"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Image URL *</label>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full bg-slate-700/50 border border-cyan-500/30 rounded px-4 py-2 text-white focus:outline-none focus:border-cyan-500 transition-colors"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full bg-slate-700/50 border border-cyan-500/30 rounded px-4 py-2 text-white focus:outline-none focus:border-cyan-500 transition-colors resize-none"
              placeholder="Brief description of the photo"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-slate-700/50 border border-cyan-500/30 rounded px-4 py-2 text-white focus:outline-none focus:border-cyan-500 transition-colors"
            >
              <option value="Professional">Professional</option>
              <option value="Infrastructure">Infrastructure</option>
              <option value="Workspace">Workspace</option>
              <option value="Team">Team</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {errorMessage && (
            <div className="bg-red-500/20 border border-red-500/50 text-red-300 px-4 py-2 rounded text-sm">
              {errorMessage}
            </div>
          )}

          {successMessage && (
            <div className="bg-green-500/20 border border-green-500/50 text-green-300 px-4 py-2 rounded text-sm">
              {successMessage}
            </div>
          )}

          <button
            type="submit"
            disabled={isAdding}
            className="w-full bg-cyan-500 hover:bg-cyan-600 disabled:bg-slate-600 text-white font-semibold py-2 rounded transition-colors"
          >
            {isAdding ? "Adding..." : "Add Photo"}
          </button>
        </form>
      </motion.div>

      {/* Photos List */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
        <h3 className="text-xl font-semibold text-cyan-300">Gallery Photos ({photos.length})</h3>

        {isLoading ? (
          <div className="text-center text-slate-400">Loading photos...</div>
        ) : photos.length === 0 ? (
          <div className="text-center text-slate-400">No photos added yet</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {photos.map((photo) => (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-slate-800/50 border border-cyan-500/20 rounded-lg overflow-hidden"
              >
                <div className="aspect-video bg-slate-700 overflow-hidden">
                  <img
                    src={photo.image_url || "/placeholder.svg"}
                    alt={photo.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 space-y-2">
                  <h4 className="font-semibold text-white">{photo.title}</h4>
                  <p className="text-sm text-slate-400">{photo.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs bg-cyan-500/20 text-cyan-300 px-2 py-1 rounded">
                      {photo.category}
                    </span>
                    <button
                      onClick={() => handleDeletePhoto(photo.id)}
                      className="text-red-400 hover:text-red-300 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  )
}
