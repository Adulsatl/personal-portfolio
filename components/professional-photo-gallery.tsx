'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { getGalleryPhotos } from '@/lib/data-service'

interface Photo {
  id?: string
  title: string
  description?: string
  image_url: string
  category?: string
}

interface PhotoGalleryProps {
  photos?: (string | Photo)[]
  title?: string
  description?: string
}

export default function ProfessionalPhotoGallery({
  photos: initialPhotos,
  title = 'Professional Gallery',
  description = 'Enterprise IT infrastructure and professional work environment',
}: PhotoGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [galleryPhotos, setGalleryPhotos] = useState<Photo[]>([])
  const [isLoading, setIsLoading] = useState(!initialPhotos)

  // Fetch photos from database on mount
  useEffect(() => {
    if (!initialPhotos) {
      const fetchPhotos = async () => {
        try {
          const data = await getGalleryPhotos()
          if (data && data.length > 0) {
            setGalleryPhotos(data)
          }
        } catch (error) {
          console.error('Error fetching gallery photos:', error)
        } finally {
          setIsLoading(false)
        }
      }
      fetchPhotos()
    } else {
      // Convert string array to Photo objects for consistent handling
      const convertedPhotos = initialPhotos.map((photo, idx) => 
        typeof photo === 'string' 
          ? { title: `Photo ${idx + 1}`, image_url: photo } 
          : photo
      )
      setGalleryPhotos(convertedPhotos as Photo[])
    }
  }, [initialPhotos])

  const validPhotos = galleryPhotos.slice(0, 6)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.85, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.23, 1, 0.32, 1],
      },
    },
  }

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.3,
      },
    },
  }

  return (
    <div className="w-full">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        className="mb-16 text-center"
      >
        <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent mb-4">
          {title}
        </h2>
        {description && (
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="text-slate-300 text-lg max-w-2xl mx-auto"
          >
            {description}
          </motion.p>
        )}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ delay: 0.3, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent mt-6 w-24 mx-auto"
        />
      </motion.div>

      {/* Photo Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
      >
        {validPhotos.map((photo, index) => (
          <motion.div
            key={`${photo.id || photo.image_url}-${index}`}
            variants={itemVariants}
            className="group cursor-pointer"
            onClick={() => setSelectedIndex(index)}
            whileHover={{ y: -8 }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
          >
            {/* Photo Card Container */}
            <div className="relative overflow-hidden rounded-2xl border border-slate-700/50 bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl group-hover:border-cyan-400/50 transition-colors duration-500">
              {/* Image Container */}
              <div className="aspect-[4/3] overflow-hidden bg-slate-950">
                <motion.img
                  src={photo.image_url}
                  alt={photo.title || `Professional gallery photo ${index + 1}`}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                  onError={(e) => {
                    e.currentTarget.src = '/placeholder.svg'
                  }}
                />
              </div>

              {/* Overlay on Hover */}
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex items-end justify-center pb-6"
              >
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileHover={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  className="text-cyan-300 font-semibold text-lg"
                >
                  View
                </motion.div>
              </motion.div>

              {/* Accent Line */}
              <motion.div
                className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
                initial={{ scaleX: 0, opacity: 0 }}
                whileHover={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 0.4 }}
              />

              {/* Index Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 + 0.3, duration: 0.4 }}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-cyan-500/20 backdrop-blur-lg border border-cyan-400/50 flex items-center justify-center text-cyan-300 text-xs font-bold"
              >
                {index + 1}
              </motion.div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Lightbox Modal */}
      {selectedIndex !== null && (
        <motion.div
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedIndex(null)}
        >
          {/* Close Button */}
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setSelectedIndex(null)}
            className="absolute top-6 right-6 p-2 rounded-full bg-slate-800/80 hover:bg-slate-700 transition-colors duration-300 text-cyan-300 z-50"
          >
            <X size={24} />
          </motion.button>

          {/* Main Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl rounded-2xl overflow-hidden border border-cyan-400/30 bg-slate-950"
          >
            <div className="max-h-[70vh] overflow-y-auto">
              <img
                src={validPhotos[selectedIndex]?.image_url || "/placeholder.svg"}
                alt={validPhotos[selectedIndex]?.title || `Gallery photo ${selectedIndex + 1}`}
                className="w-full h-auto object-contain"
                onError={(e) => {
                  e.currentTarget.src = '/placeholder.svg'
                }}
              />
            </div>
            
            {/* Photo Info */}
            {validPhotos[selectedIndex]?.title && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="px-6 py-4 border-t border-slate-700/50 bg-gradient-to-r from-slate-900/90 to-slate-800/90 backdrop-blur"
              >
                <h3 className="text-cyan-300 font-semibold text-lg mb-2">
                  {validPhotos[selectedIndex].title}
                </h3>
                {validPhotos[selectedIndex]?.description && (
                  <p className="text-slate-300 text-sm">
                    {validPhotos[selectedIndex].description}
                  </p>
                )}
                {validPhotos[selectedIndex]?.category && (
                  <span className="inline-block mt-2 px-3 py-1 text-xs bg-cyan-500/20 text-cyan-300 rounded-full border border-cyan-500/30">
                    {validPhotos[selectedIndex].category}
                  </span>
                )}
              </motion.div>
            )}
          </motion.div>

          {/* Navigation Buttons */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.1, x: -4 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.stopPropagation()
              setSelectedIndex((selectedIndex - 1 + validPhotos.length) % validPhotos.length)
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-800/80 hover:bg-slate-700 transition-colors duration-300 text-cyan-300"
          >
            <ChevronLeft size={24} />
          </motion.button>

          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.1, x: 4 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.stopPropagation()
              setSelectedIndex((selectedIndex + 1) % validPhotos.length)
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-800/80 hover:bg-slate-700 transition-colors duration-300 text-cyan-300"
          >
            <ChevronRight size={24} />
          </motion.button>

          {/* Photo Counter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-slate-800/80 backdrop-blur-lg border border-cyan-400/30 text-cyan-300 text-sm font-semibold"
          >
            {selectedIndex + 1} / {validPhotos.length}
          </motion.div>
        </motion.div>
      )}

      {/* Bottom Accent */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ delay: 0.5, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        viewport={{ once: true }}
        className="h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent mt-16 rounded-full"
      />
    </div>
  )
}
