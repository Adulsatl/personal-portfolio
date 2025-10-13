"use client"

import { motion } from "framer-motion"

type GallerySectionProps = {
  photos?: string[]
  title?: string
  description?: string
}

export default function GallerySection({
  photos = [],
  title = "Photo Gallery",
  description = "A few professional photos that represent my work and personality.",
}: GallerySectionProps) {
  const hasPhotos = Array.isArray(photos) && photos.length > 0
  const safePhotos = hasPhotos
    ? photos.slice(0, 6)
    : ["/professional-portrait.png", "/working-at-desk.jpg", "/it-administrator-datacenter.jpg"]

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  const staggerContainer = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  }

  return (
    <section
      id="photos"
      className="py-20 px-4 md:px-6 bg-gray-50/80 dark:bg-gray-900/80 backdrop-blur-sm relative overflow-hidden"
      aria-labelledby="photos-heading"
    >
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03]"></div>
        <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-white/50 to-transparent dark:from-gray-900/50"></div>
        <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-white/50 to-transparent dark:from-gray-900/50"></div>
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          className="text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
        >
          <h2
            id="photos-heading"
            className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-400 mb-4"
          >
            {title}
          </h2>
          <motion.div
            className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 mx-auto rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
          />
          {description && <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">{description}</p>}
        </motion.div>

        {/* Gallery grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {safePhotos.map((src, idx) => (
            <motion.figure
              key={`${src}-${idx}`}
              className="group relative overflow-hidden rounded-xl bg-white/90 dark:bg-gray-800/90 border border-gray-100 dark:border-gray-700 shadow-sm"
              variants={fadeInUp}
            >
              <div className="aspect-[4/3] overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src || "/placeholder.svg"}
                  alt={`Gallery photo ${idx + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.src = "/abstract-geometric-shapes.png"
                  }}
                />
              </div>
              {/* Subtle overlay on hover */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.figure>
          ))}
        </motion.div>

        {/* Note for empty state */}
        {!hasPhotos && (
          <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-6">
            Add your photos from the Admin panel to replace these placeholders.
          </p>
        )}
      </div>

      {/* Background decoration blobs */}
      <div className="absolute -top-24 -left-24 w-64 h-64 bg-cyan-100 dark:bg-cyan-900/20 rounded-full opacity-50 blur-3xl"></div>
      <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-blue-100 dark:bg-blue-900/20 rounded-full opacity-50 blur-3xl"></div>
    </section>
  )
}
