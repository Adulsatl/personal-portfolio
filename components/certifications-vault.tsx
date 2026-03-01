"use client"

import { motion } from "framer-motion"
import { Award, ExternalLink } from "lucide-react"
import Link from "next/link"

interface Certification {
  id: string
  name: string
  issuer: string
  date: string
  category: string
  link?: string
  color?: string
  icon?: string
}

interface CertificationsVaultProps {
  certifications?: Certification[]
}

const defaultCertifications: Certification[] = [
  {
    id: "cisco-ccst",
    name: "Cisco CCST",
    issuer: "Cisco",
    date: "2024",
    category: "Networking",
    color: "from-orange-400 to-orange-600",
  },
  {
    id: "microsoft-ito",
    name: "Microsoft IT Operations",
    issuer: "Microsoft",
    date: "2023",
    category: "Infrastructure",
    color: "from-blue-400 to-blue-600",
  },
  {
    id: "google-it-support",
    name: "Google IT Support",
    issuer: "Google",
    date: "2023",
    category: "Support",
    color: "from-red-400 to-red-600",
  },
]

export default function CertificationsVault({ certifications = defaultCertifications }: CertificationsVaultProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
      },
    },
    hover: {
      y: -8,
      transition: { duration: 0.3 },
    },
  }

  return (
    <section className="py-20 px-4 md:px-6 bg-gradient-to-b from-slate-950 to-blue-950">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
              Certifications Vault
            </span>
          </h2>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            Industry-recognized credentials demonstrating expertise in modern IT infrastructure, security, and operations
          </p>
        </motion.div>

        {/* Certifications Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {certifications.map((cert) => (
            <motion.div
              key={cert.id}
              variants={itemVariants}
              whileHover="hover"
              className="group relative"
            >
              {/* Card Background with gradient border effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 group-hover:border-cyan-500/50 rounded-2xl p-8 transition-all duration-300 backdrop-blur-sm">
                {/* Icon/Badge area */}
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${cert.color || "from-cyan-500 to-blue-600"} p-0.5 mb-6`}>
                  <div className="w-full h-full rounded-lg bg-slate-900 flex items-center justify-center">
                    <Award className="w-8 h-8 text-white" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                  {cert.name}
                </h3>

                <p className="text-cyan-400 font-medium mb-1">{cert.issuer}</p>

                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-slate-400">{cert.date}</span>
                  <span className={`text-xs px-3 py-1 rounded-full bg-gradient-to-r ${cert.color || "from-cyan-500 to-blue-600"} text-white font-semibold`}>
                    {cert.category}
                  </span>
                </div>

                {/* Circuit board pattern background */}
                <div className="absolute top-0 right-0 w-20 h-20 opacity-10 pointer-events-none">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <circle cx="10" cy="10" r="2" fill="currentColor" />
                    <line x1="10" y1="10" x2="50" y2="10" stroke="currentColor" strokeWidth="0.5" />
                    <circle cx="50" cy="10" r="2" fill="currentColor" />
                    <line x1="50" y1="10" x2="50" y2="50" stroke="currentColor" strokeWidth="0.5" />
                    <circle cx="50" cy="50" r="2" fill="currentColor" />
                  </svg>
                </div>

                {/* Link if provided */}
                {cert.link && (
                  <Link
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-cyan-400 hover:text-cyan-300 transition-colors mt-4 group/link"
                  >
                    <span className="text-sm font-medium mr-2">View Credential</span>
                    <ExternalLink className="w-4 h-4 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
                  </Link>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Decorative elements */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <p className="text-slate-400 text-sm">
            Continuous learning and professional development drive excellence in IT operations
          </p>
        </motion.div>
      </div>
    </section>
  )
}
