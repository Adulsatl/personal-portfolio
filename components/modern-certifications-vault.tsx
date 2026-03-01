'use client'

import { motion } from 'framer-motion'
import { Shield, Award, CheckCircle, ExternalLink } from 'lucide-react'

interface Certification {
  id: string
  name: string
  issuer: string
  date?: string
  credentialUrl?: string
  category?: string
}

interface ModernCertificationsVaultProps {
  certifications?: Certification[]
}

const defaultCertifications: Certification[] = [
  {
    id: 'cisco-ccst',
    name: 'Cisco CCST Networking',
    issuer: 'Cisco',
    category: 'Networking',
    credentialUrl: 'https://www.cisco.com',
  },
  {
    id: 'microsoft-iot',
    name: 'Microsoft IT Operations',
    issuer: 'Microsoft',
    category: 'Cloud & Operations',
    credentialUrl: 'https://www.microsoft.com',
  },
  {
    id: 'google-itsupport',
    name: 'Google IT Support Professional',
    issuer: 'Google',
    category: 'IT Support',
    credentialUrl: 'https://www.google.com',
  },
]

const categoryColors: Record<string, { bg: string; border: string; text: string }> = {
  'Networking': { bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-300' },
  'Cloud & Operations': { bg: 'bg-purple-500/10', border: 'border-purple-500/30', text: 'text-purple-300' },
  'IT Support': { bg: 'bg-cyan-500/10', border: 'border-cyan-500/30', text: 'text-cyan-300' },
  'default': { bg: 'bg-slate-500/10', border: 'border-slate-500/30', text: 'text-slate-300' },
}

export default function ModernCertificationsVault({
  certifications = defaultCertifications,
}: ModernCertificationsVaultProps) {
  const displayedCerts = certifications.length > 0 ? certifications : defaultCertifications

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
        type: 'spring',
        stiffness: 100,
        damping: 15,
      },
    },
  }

  return (
    <section className="py-20 px-4 md:px-6 bg-gradient-to-b from-slate-950 to-blue-950/50 border-t border-cyan-500/10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Shield className="w-8 h-8 text-cyan-400" />
            <h2 className="text-4xl sm:text-5xl font-bold">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Certifications Vault
              </span>
            </h2>
          </div>
          <p className="text-slate-400 text-lg">Industry-recognized credentials and professional certifications</p>
        </motion.div>

        {/* Certifications Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {displayedCerts.map((cert, idx) => {
            const colors = categoryColors[cert.category || 'default']

            return (
              <motion.div key={cert.id || idx} variants={itemVariants}>
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  className={`relative h-full p-6 rounded-xl border backdrop-blur-sm ${colors.bg} ${colors.border} overflow-hidden group cursor-pointer transition-all`}
                >
                  {/* Background circuit pattern */}
                  <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-cyan-400 to-transparent rounded-full blur-3xl" />
                    <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-blue-400 to-transparent rounded-full blur-3xl" />
                  </div>

                  <div className="relative z-10 flex flex-col h-full">
                    {/* Icon */}
                    <div className={`w-12 h-12 rounded-lg ${colors.bg} border ${colors.border} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <Award className={`w-6 h-6 ${colors.text}`} />
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-2">{cert.name}</h3>
                      <p className={`text-sm font-medium mb-2 ${colors.text}`}>{cert.issuer}</p>

                      {cert.category && (
                        <div className="flex items-center gap-2 mb-3">
                          <CheckCircle className={`w-4 h-4 ${colors.text}`} />
                          <span className="text-xs text-slate-400">{cert.category}</span>
                        </div>
                      )}

                      {cert.date && <p className="text-xs text-slate-500">Issued: {cert.date}</p>}
                    </div>

                    {/* Link */}
                    {cert.credentialUrl && (
                      <motion.a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ gap: 8 }}
                        className={`inline-flex items-center gap-2 mt-4 ${colors.text} font-semibold text-sm hover:opacity-80 transition-opacity`}
                      >
                        View Credential
                        <ExternalLink className="w-4 h-4" />
                      </motion.a>
                    )}
                  </div>

                  {/* Hover glow effect */}
                  <motion.div
                    className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{
                      background: `radial-gradient(circle at var(--mouse-x), var(--mouse-y), ${colors.text} 0%, transparent 50%)`,
                    }}
                  />
                </motion.div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
