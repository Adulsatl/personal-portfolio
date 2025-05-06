"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { ExternalLink } from "lucide-react"

type CertificationType = {
  id: string
  name: string
  issuer: string
  date: string
  link?: string
  image?: string
  badgeImage?: string
  category: string
}

type CertificationSectionProps = {
  certifications?: CertificationType[]
}

export default function CertificationSection({ certifications = [] }: CertificationSectionProps) {
  const [displayMode, setDisplayMode] = useState<"badge" | "certificate" | "both">("both")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  if (!certifications || certifications.length === 0) {
    return null
  }

  // Extract unique categories
  const categories = ["all", ...new Set(certifications.map((cert) => cert.category))]

  // Filter certifications by category
  const filteredCertifications =
    selectedCategory === "all" ? certifications : certifications.filter((cert) => cert.category === selectedCategory)

  // Debug log
  console.log("Filtered certifications:", filteredCertifications)
  // Separate certificates and badges
  // A certificate with both image and badgeImage will appear in both sections
  const certificatesWithImages = filteredCertifications.filter((cert) => cert && cert.image && cert.image.trim() !== "")
  const certificatesWithBadges = filteredCertifications.filter(
    (cert) => cert && cert.badgeImage && cert.badgeImage.trim() !== "",
  )
  console.log("Certificates with images:", certificatesWithImages)
  console.log("Certificates with badges:", certificatesWithBadges)

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  return (
    <section id="certifications" className="py-20 px-4 md:px-6 bg-gray-50 dark:bg-gray-900">
      <motion.div
        className="max-w-5xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeIn}
      >
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Certifications
        </motion.h2>

        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-md transition-colors ${
                  selectedCategory === category
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </motion.button>
            ))}
          </div>

          <div className="flex justify-center gap-2 mb-4">
            <motion.button
              onClick={() => setDisplayMode("badge")}
              className={`px-4 py-2 rounded-md transition-colors ${
                displayMode === "badge"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Badges
            </motion.button>
            <motion.button
              onClick={() => setDisplayMode("certificate")}
              className={`px-4 py-2 rounded-md transition-colors ${
                displayMode === "certificate"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Certificates
            </motion.button>
            <motion.button
              onClick={() => setDisplayMode("both")}
              className={`px-4 py-2 rounded-md transition-colors ${
                displayMode === "both"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Both
            </motion.button>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {/* Badge View */}
          {(displayMode === "badge" || displayMode === "both") && (
            <motion.div
              className="mb-12"
              key="badge-view"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-2xl font-semibold mb-6 text-center">Badges</h3>
              {certificatesWithBadges.length > 0 ? (
                <motion.div
                  className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                >
                  {certificatesWithBadges.map((cert) => (
                    <motion.div
                      key={`badge-${cert.id}`}
                      className="flex flex-col items-center"
                      whileHover={{ scale: 1.05, y: -5 }}
                      variants={fadeIn}
                    >
                      <div className="relative w-24 h-24 mb-2 group">
                        <img
                          src={cert.badgeImage || "/placeholder.svg?height=100&width=100&text=Badge"}
                          alt={`${cert.name} Badge`}
                          className="w-full h-full object-contain"
                          onError={(e) => {
                            e.currentTarget.src = "/placeholder.svg?height=100&width=100&text=Badge"
                          }}
                        />
                        <motion.div
                          className="absolute inset-0 bg-blue-600/10 dark:bg-blue-400/10 opacity-0 rounded-full"
                          whileHover={{ opacity: 1 }}
                        />
                      </div>
                      <h4 className="text-sm font-medium text-center">{cert.name}</h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400 text-center">{cert.issuer}</p>
                      {cert.link && (
                        <motion.div whileHover={{ x: 2 }}>
                          <Link
                            href={cert.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-1 text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center"
                          >
                            View <ExternalLink className="ml-1 h-3 w-3" />
                          </Link>
                        </motion.div>
                      )}
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <p className="text-center text-gray-500 dark:text-gray-400">No badges available in this category.</p>
              )}
            </motion.div>
          )}

          {/* Certificate View */}
          {(displayMode === "certificate" || displayMode === "both") && (
            <motion.div
              key="certificate-view"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-2xl font-semibold mb-6 text-center">Certificates</h3>
              {certificatesWithImages.length > 0 ? (
                <motion.div
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                >
                  {certificatesWithImages.map((cert) => (
                    <motion.div
                      key={`cert-${cert.id}`}
                      className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden"
                      whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                      variants={fadeIn}
                    >
                      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                        <div>
                          <h4 className="text-lg font-medium">{cert.name}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{cert.issuer}</p>
                        </div>
                        {cert.link && (
                          <motion.div whileHover={{ scale: 1.1, rotate: 5 }} whileTap={{ scale: 0.9 }}>
                            <Link
                              href={cert.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 dark:text-blue-400 hover:underline flex items-center"
                            >
                              <ExternalLink className="h-4 w-4" />
                            </Link>
                          </motion.div>
                        )}
                      </div>
                      <div className="relative aspect-[16/9] overflow-hidden">
                        <motion.img
                          src={cert.image || "/placeholder.svg?height=200&width=400&text=Certificate"}
                          alt={`${cert.name} Certificate`}
                          className="w-full h-full object-cover"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.3 }}
                          onError={(e) => {
                            console.log("Certificate image failed to load:", cert.image)
                            e.currentTarget.src = "/placeholder.svg?height=200&width=400&text=Certificate"
                          }}
                        />
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0"
                          whileHover={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>
                      <div className="p-4">
                        <p className="text-sm text-gray-600 dark:text-gray-400">Issued: {cert.date}</p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <p className="text-center text-gray-500 dark:text-gray-400">
                  No certificates available in this category.
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  )
}
