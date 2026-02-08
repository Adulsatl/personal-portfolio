"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Trash2, Plus, Star } from "lucide-react"

export default function TestimonialsTab() {
  const [testimonials, setTestimonials] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isAdding, setIsAdding] = useState(false)
  const [name, setName] = useState("")
  const [title, setTitle] = useState("")
  const [company, setCompany] = useState("")
  const [message, setMessage] = useState("")
  const [rating, setRating] = useState(5)
  const [linkedinUrl, setLinkedinUrl] = useState("")
  const [successMessage, setSuccessMessage] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  useEffect(() => {
    fetchTestimonials()
  }, [])

  const fetchTestimonials = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/testimonials")
      if (!response.ok) throw new Error("Failed to fetch")
      const data = await response.json()
      setTestimonials(data || [])
    } catch (error) {
      console.error("Error fetching testimonials:", error)
      setTestimonials([])
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddTestimonial = async (e) => {
    e.preventDefault()
    if (!name || !message) {
      setErrorMessage("Name and message are required")
      return
    }

    setIsAdding(true)
    setErrorMessage("")
    setSuccessMessage("")

    try {
      const response = await fetch("/api/testimonials/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          title: title || null,
          company: company || null,
          message,
          rating,
          linkedin_url: linkedinUrl || null,
        }),
      })

      if (!response.ok) throw new Error("Failed to add testimonial")

      setName("")
      setTitle("")
      setCompany("")
      setMessage("")
      setRating(5)
      setLinkedinUrl("")
      setSuccessMessage("Testimonial added successfully!")
      fetchTestimonials()
    } catch (error) {
      console.error("Error adding testimonial:", error)
      setErrorMessage("Failed to add testimonial")
    } finally {
      setIsAdding(false)
    }
  }

  const handleDeleteTestimonial = async (testimonialId) => {
    if (confirm("Are you sure you want to delete this testimonial?")) {
      try {
        const response = await fetch("/api/testimonials/delete", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: testimonialId }),
        })

        if (!response.ok) throw new Error("Failed to delete")

        setSuccessMessage("Testimonial deleted successfully!")
        fetchTestimonials()
      } catch (error) {
        console.error("Error deleting testimonial:", error)
        setErrorMessage("Failed to delete testimonial")
      }
    }
  }

  return (
    <div className="space-y-6">
      {/* Add Testimonial Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-cyan-500/20 rounded-lg p-6"
      >
        <h3 className="text-xl font-semibold text-cyan-300 mb-4 flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Add New Testimonial
        </h3>

        <form onSubmit={handleAddTestimonial} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Name *</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-slate-700/50 border border-cyan-500/30 rounded px-4 py-2 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                placeholder="e.g., John Smith"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Title (Optional)</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-slate-700/50 border border-cyan-500/30 rounded px-4 py-2 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                placeholder="e.g., IT Manager"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Company (Optional)</label>
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="w-full bg-slate-700/50 border border-cyan-500/30 rounded px-4 py-2 text-white focus:outline-none focus:border-cyan-500 transition-colors"
              placeholder="e.g., TechCorp UAE"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Testimonial Message *</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              className="w-full bg-slate-700/50 border border-cyan-500/30 rounded px-4 py-2 text-white focus:outline-none focus:border-cyan-500 transition-colors resize-none"
              placeholder="What do you want to say about this person?"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Rating</label>
              <select
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                className="w-full bg-slate-700/50 border border-cyan-500/30 rounded px-4 py-2 text-white focus:outline-none focus:border-cyan-500 transition-colors"
              >
                <option value={5}>⭐⭐⭐⭐⭐ (5 Stars)</option>
                <option value={4}>⭐⭐⭐⭐ (4 Stars)</option>
                <option value={3}>⭐⭐⭐ (3 Stars)</option>
                <option value={2}>⭐⭐ (2 Stars)</option>
                <option value={1}>⭐ (1 Star)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">LinkedIn URL (Optional)</label>
              <input
                type="url"
                value={linkedinUrl}
                onChange={(e) => setLinkedinUrl(e.target.value)}
                className="w-full bg-slate-700/50 border border-cyan-500/30 rounded px-4 py-2 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                placeholder="https://linkedin.com/in/..."
              />
            </div>
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
            {isAdding ? "Adding..." : "Add Testimonial"}
          </button>
        </form>
      </motion.div>

      {/* Testimonials List */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
        <h3 className="text-xl font-semibold text-cyan-300">Testimonials ({testimonials.length})</h3>

        {isLoading ? (
          <div className="text-center text-slate-400">Loading testimonials...</div>
        ) : testimonials.length === 0 ? (
          <div className="text-center text-slate-400">No testimonials added yet</div>
        ) : (
          <div className="space-y-4">
            {testimonials.map((testimonial) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-slate-800/50 border border-cyan-500/20 rounded-lg p-4"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-white">{testimonial.name}</h4>
                    {testimonial.title && <p className="text-sm text-slate-400">{testimonial.title}</p>}
                    {testimonial.company && <p className="text-sm text-cyan-400">{testimonial.company}</p>}
                  </div>
                  <button
                    onClick={() => handleDeleteTestimonial(testimonial.id)}
                    className="text-red-400 hover:text-red-300 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-slate-300 mb-3 italic">"{testimonial.message}"</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  {testimonial.linkedin_url && (
                    <a
                      href={testimonial.linkedin_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-400 hover:text-cyan-300 text-sm transition-colors"
                    >
                      LinkedIn Profile →
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  )
}
